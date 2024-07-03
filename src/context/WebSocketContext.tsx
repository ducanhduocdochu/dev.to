import React, { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { api } from '@/utils/api';

type WebSocketContextType = {
  socket: WebSocket | null;
  sendEvent: (message: EventType) => void;
  sendNotification: (message: NotificationType) => void;
  lastMessage: string | null;
  notificationCount: number;
  setNotificationCount: (count: number) => void;
};

type EventType = {
  postId: number;
  type: string;
  timestamp: Date;
};

type NotificationType = {
  userId: string;
  message: string;
};

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

export const WebSocketProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { data: session } = useSession();
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [lastMessage, setLastMessage] = useState<string | null>(null);
  const [notificationCount, setNotificationCount] = useState<number>(0);

  const { data: data_notifications, isLoading: isLoading_notifications } = api.notification.getSeenNotificationByUserId.useQuery();

  const handleMessage = useCallback((event: MessageEvent) => {
    setLastMessage(event.data as string);
    setNotificationCount((prevCount) => prevCount + 1);
  }, []);

  useEffect(() => {
    if (!isLoading_notifications && data_notifications) {
      setNotificationCount(data_notifications.length);
    }
  }, [data_notifications, isLoading_notifications]);

  useEffect(() => {
    if (session) {
      const token = session.user.id;
      const ws = new WebSocket(`ws://localhost:3001?token=${token}`);

      ws.onopen = () => {
        console.log('WebSocket is connected');
      };

      ws.onmessage = handleMessage;

      ws.onclose = () => {
        console.log('WebSocket is closed');
        // Optionally handle reconnection here
      };

      ws.onerror = (error) => {
        console.error('WebSocket error: ', error);
        // Optionally handle reconnection here
      };

      setSocket(ws);

      return () => {
        ws.close();
      };
    }
  }, [session, handleMessage]);

  const sendEvent = (message: EventType) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(message));
    } else {
      console.error('WebSocket is not open');
    }
  };

  const sendNotification = (message: NotificationType) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(message));
    } else {
      console.error('WebSocket is not open');
    }
  };

  return (
    <WebSocketContext.Provider value={{ socket, sendEvent, sendNotification, lastMessage, notificationCount, setNotificationCount }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = (): WebSocketContextType => {
  const context = useContext(WebSocketContext);
  if (context === undefined) {
    throw new Error('useWebSocket must be used within a WebSocketProvider');
  }
  return context;
};
