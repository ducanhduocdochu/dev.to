import { FC } from "react";
import PostSearch from "@/_components/PostSearch";
import { api } from "@/utils/api";
import { PostTypeBody } from "@/typeProp";

type SortDirection = 'asc' | 'desc';

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
  } = api.post.searchPosts.useQuery({ page: 1, pageSize: 10, sort_direction, keyword: q });

  const posts: PostTypeBody[] = data_posts?.posts ?? [];

  const {
    data: data_tag,
    isLoading: isLoading_tag,
    error: error_tag,
  } = api.tag.getAll.useQuery();

  return (
    <div>
      {posts.length > 0 && !isLoading_posts ? (
        posts.map((item: PostTypeBody) => {
          return (
            <PostSearch
              key={item.id}
              postDetail={item}
              data_tag={data_tag ?? []}
            />
          );
        })
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default PostWidgetsSearch;
