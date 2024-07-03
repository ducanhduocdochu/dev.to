import { FC } from "react";
import PostSearch from "@/_components/PostSearch";
import { api } from "@/utils/api";
import { NotificationType } from "@/typeProp";
import SkeletonList from "./SkeletonList";
import NotificationDetail from "./NotificationDetail";

const NotificationWidget: FC = () => {
  const {
    data: data_notifications,
    isLoading: isLoading_notifications,
    error: error_notifications,
  } = api.notification.getNotificationByUserId.useQuery();

  const notifications: NotificationType[] = data_notifications? data_notifications : []

  return (
    <div>
      {!isLoading_notifications ? (
        <div>
          {notifications.length > 0 ? (
            <div>
              {notifications.map((item: NotificationType) => {
                return (
                  <NotificationDetail
                    key={item.id}
                    notiDetail={item}
                  />
                );
              })}
            </div>
          ) : (
            <div className="text-[20px] ml-10 mt-10">Not found {":("}</div>
          )}
        </div>
      ) : (
        <SkeletonList x={1} width="w-[736px]" height="h-3" />
      )}
    </div>
  );
};

export default NotificationWidget;
