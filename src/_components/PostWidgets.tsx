import { FC, useEffect, useRef, useState, useCallback } from "react";
import Post from "@/_components/Post";
import { api } from "@/utils/api";
import { PostTypeBody } from "@/typeProp";
import SkeletonList from "./SkeletonList";

const PostWidgets: FC = () => {
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState<PostTypeBody[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const { data: data_posts, isLoading: isLoading_posts, isFetched } = api.post.getPostsPaginatedForBody.useQuery(
    { page, pageSize: 10 }
  );

  const { data: data_tag, isLoading: isLoading_tag } = api.tag.getAll.useQuery();

  const lastPostRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoading_posts || !hasMore || !node) return;
      observerRef.current?.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0] && entries[0].isIntersecting) {
          setPage((prevPage) => prevPage + 1);
        }
      }, {
        rootMargin: '20px'
      });

      observerRef.current.observe(node);
    },
    [isLoading_posts, hasMore]
  );

  useEffect(() => {
    if (data_posts && isFetched) {
      setPosts((prevPosts) => [...prevPosts, ...data_posts.posts]);
      setIsLoading(false);
      if (page >= data_posts.totalPages) {
        setHasMore(false);
      }
    }
  }, [data_posts, isFetched, page]);

  useEffect(() => {
    if (!isLoading_posts && !isFetched && page === 1) {
      setIsLoading(true); // Show initial loading state
    }
  }, [isLoading_posts, isFetched, page]);

  return (
    <div className="flex flex-col items-center">
      {posts.length > 0 ? (
        posts.map((item, index) => {
          if (index === posts.length - 1) {
            return (
              <div key={item.id} ref={lastPostRef}>
                <Post postDetail={item} data_tag={data_tag ?? []} isComment={true} />
              </div>
            );
          } else {
            return (
              <Post key={item.id} postDetail={item} data_tag={data_tag ?? []} isComment={true} />
            );
          }
        })
      ) : (
        isLoading ? (
          <SkeletonList x={1} width="w-[685.328px]" height="h-3" />
        ) : (
          <SkeletonList x={1} width="w-[685.328px]" height="h-3" />
        )
      )}
      <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
    </div>
  );
};

export default PostWidgets;
