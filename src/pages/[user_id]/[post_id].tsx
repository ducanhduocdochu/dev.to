import { useEffect, useRef } from "react";
import OtherDetailPost from "@/_components/Section/OtherDetailPost";
import PostDetail from "@/_components/Section/PostDetail";
import Reaction from "@/_components/Section/Reaction";
import MainLayout from "@/layout/MainLayout";
import { api } from "@/utils/api";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import SkeletonList from "@/_components/SkeletonList";
import { useWebSocket } from "@/context/WebSocketContext";

export default function PostPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { sendEvent } = useWebSocket();
  const { user_id, post_id } = router.query;

  const postId = Number(post_id);
  const userId = String(user_id);

  useEffect(() => {
    if (isNaN(postId)) {
      if (status === "authenticated") {
        void router.push("/?sign-in=true");
      } else {
        void router.push("/");
      }
    }
  }, [postId, status, router]);

  useEffect(() => {
    sendEvent({timestamp: new Date() ,postId: postId , type: "view"})
  }, []);

  const {
    data: data_post,
    isLoading: isLoading_post,
    error: error_post,
  } = api.post.getPostById.useQuery({ postId }, { enabled: !isNaN(postId) });

  const {
    data: data_user,
    isLoading: isLoading_user,
    error: error_user,
  } = api.user.getUserById.useQuery({ id: userId });

  if (isNaN(postId)) {
    return null;
  }

  return (
    <MainLayout>
      <Head>
        {!isLoading_post && data_post ? (
          <title>{data_post.post.title} - DEV Community</title>
        ) : (
          <title>... Loading</title>
        )}
      </Head>
      <div className="m-4 mt-0 flex w-header-w justify-between">
        {!isLoading_post && data_post ? (
          <Reaction detailPost={data_post.detailPost} session = {session ?? null} />
        ) : (
          <SkeletonList x={1} width="w-[64px]" height="h-3" />
        )}

        {!isLoading_post && data_post && data_user ? (
          <PostDetail
            detailPost={data_post.detailPost}
            post={data_post.post}
            data_user={data_user}
            session={session ?? null}
          />
        ) : (
          <SkeletonList x={1} width="w-[876.391px]" height="h-3" />
        )}

        {!isLoading_user && data_user && data_post ? (
          <OtherDetailPost
            data_user={data_user}
            id={data_post.post.createdById}
            session={session ?? null}
          />
        ) : (
          <SkeletonList x={1} width="w-[375.594px]" height="h-3" />
        )}
      </div>
    </MainLayout>
  );
}
