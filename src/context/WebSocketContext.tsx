import React, { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';
import { useSession } from 'next-auth/react';

type WebSocketContextType = {
  socket: WebSocket | null;
  sendMessage: (message: string) => void;
  lastMessage: string | null;
};

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

export const WebSocketProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { data: session } = useSession();
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [lastMessage, setLastMessage] = useState<string | null>(null);

  const handleMessage = useCallback((event: MessageEvent) => {
    console.log('Message from server: ', event.data);
    setLastMessage(event.data);
  }, []);

  useEffect(() => {
    if (session) {
      const token = session.user.id;
      const ws = new WebSocket(`ws://localhost:3000?token=${token}`);

      ws.onopen = () => {
        console.log('WebSocket is connected');
      };

      ws.onmessage = handleMessage;

      ws.onclose = () => {
        console.log('WebSocket is closed');
      };

      ws.onerror = (error) => {
        console.error('WebSocket error: ', error);
      };

      setSocket(ws);

      return () => {
        ws.close();
      };
    }
  }, [session, handleMessage]);

  const sendMessage = (message: string) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(message);
    } else {
      console.error('WebSocket is not open');
    }
  };

  return (
    <WebSocketContext.Provider value={{ socket, sendMessage, lastMessage }}>
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
