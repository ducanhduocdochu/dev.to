import { FC } from "react";
import PostSearch from "@/_components/PostSearch";
import { api } from "@/utils/api";
import { PostTypeBody, UserType } from "@/typeProp";
import UserSearch from "@/_components/UserSearch";
import SkeletonList from "./SkeletonList";

type SortDirection = 'asc' | 'desc';

const UserWidgetsSearch: FC<{
  q: string;
  filters: string;
  sort_by: string;
  sort_direction: SortDirection;
}> = ({ q, filters, sort_by, sort_direction }) => {

  const {
    data: data_users,
    isLoading: isLoading_users,
    error: error_users,
  } = api.user.searchUsers.useQuery({ page: 1, pageSize: 10, sort_direction, keyword: q });

  const users: UserType[] = data_users?.users ?? [];

  return (
    <div>
      {!isLoading_users ? (
        <div>
          {users.length > 0 ? (
            <div>
              {users.map((item: UserType) => {
                return (
                  <UserSearch
                  key={item.id}
                  user={item}
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

export default UserWidgetsSearch;
