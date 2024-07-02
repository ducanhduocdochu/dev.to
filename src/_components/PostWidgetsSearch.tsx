import { FC } from "react";
import PostSearch from "@/_components/PostSearch";
import { api } from "@/utils/api";
import { PostTypeBody } from "@/typeProp";
import SkeletonList from "./SkeletonList";

type SortDirection = "asc" | "desc";

const PostWidgetsSearch: FC<{
  q: string;
  filters: string;
  sort_by: string;
  sort_direction: SortDirection;
}> = ({ q, filters, sort_by, sort_direction }) => {
  const {
    data: data_posts,
    isLoading: isLoading_posts,
    error: error_posts,
  } = api.post.searchPosts.useQuery({
    page: 1,
    pageSize: 10,
    sort_direction,
    keyword: q,
  });

  const posts: PostTypeBody[] = data_posts?.posts ?? [];

  const {
    data: data_tag,
    isLoading: isLoading_tag,
    error: error_tag,
  } = api.tag.getAll.useQuery();

  return (
    <div>
      {!isLoading_posts ? (
        <div>
          {posts.length > 0 ? (
            <div>
              {posts.map((item: PostTypeBody) => {
                return (
                  <PostSearch
                    key={item.id}
                    postDetail={item}
                    data_tag={data_tag ?? []}
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

export default PostWidgetsSearch;
