import { FC } from "react";
import Post from "@/_components/Post";
import { api } from "@/utils/api";
import { PostTypeBody } from "@/typeProp";
import SkeletonList from "./SkeletonList";

const PostWidgets: FC = () => {
  const {
    data: data_posts,
    isLoading: isLoading_posts,
    error: error_posts,
  } = api.post.getPostsPaginatedForBody.useQuery({ page: 1, pageSize: 10 });

  const posts: PostTypeBody[] = data_posts?.posts ?? [];

  const {
    data: data_tag,
    isLoading: isLoading_tag,
    error: error_tag,
  } = api.tag.getAll.useQuery();

  return (
    <div>
      {posts.length > 0 && !isLoading_posts ? 
      posts.map((item: PostTypeBody) => {
        return <Post key={item.id} postDetail={item} data_tag={data_tag ?? []} isComment={true} />;
      }) : <SkeletonList x={1} width="w-[685.328px]" height="h-3" />}
    </div>
  );
};

export default PostWidgets;
