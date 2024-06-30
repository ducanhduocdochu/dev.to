import { FC } from 'react';
import Bar from '@/_components/Bar';
import PostWidgets from '@/_components/PostWidgets';
import ImpressionWidget from '@/_components/ImpressionWidget';
import { api } from '@/utils/api';
import { PostTypeBody } from '@/typeProp';
import { useRouter } from 'next/router';
import Post from '../Post';

const PersonPost: FC = () => {
  const router = useRouter();
  const { user_id } = router.query;
  const userId = String(user_id);

  const {
    data: data_posts,
    isLoading: isLoading_posts,
    error: error_posts,
  } = api.post.getPostsByUserForBody.useQuery({ page: 1, pageSize: 10, createById: userId });

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
        return <Post key={item.id} postDetail={item} data_tag={data_tag ?? []} isComment = {false} />;
      }) : <div>Loading...</div>}
    </div>
  );
};

export default PersonPost;
