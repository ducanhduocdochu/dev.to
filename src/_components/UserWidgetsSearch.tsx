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
    data: data_user,
    isLoading: isLoading_user,
    error: error_user,
  } = api.user.searchUsers.useQuery({ page: 1, pageSize: 10, sort_direction, keyword: q });

  const users: UserType[] = data_user?.users ?? [];

  return (
    <div>
      {users.length > 0 && !isLoading_user ? (
        users.map((item: UserType) => {
          return (
            <UserSearch
              key={item.id}
              user={item}
            />
          );
        })
      ) : (
        <SkeletonList x={1} width="w-[736px]" height="h-3" />
      )}
    </div>
  );
};

export default UserWidgetsSearch;
