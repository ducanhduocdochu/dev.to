import { Session } from "next-auth";
import { FC, useEffect, useState } from "react";
import Button from "@/_components/Button";
import Box from "@/_components/Box";
import CommentIcon from "@/_components/Icon/CommentIcon/CommentIcon";
import HeartIcon from "@/_components/Icon/CommentIcon/HeartIcon";
import { CommentType } from "@/typeProp";
import { timeDifference } from "@/utils";
import PostDetailView from "@/_components/PostDetailView";
import { api } from "@/utils/api";
import CommentInput from "@/_components/CommentInput";
import { useRouter } from "next/router";
import FullScreenLoader from "./Loading";
import { useWebSocket } from "@/context/WebSocketContext";

const CommentDetail: FC<{
  session: Session | null | undefined;
  comment: CommentType;
  level: number;
}> = ({ session, comment, level }) => {
  const { sendEvent, sendNotification } = useWebSocket();
  const router = useRouter();
  const [isOpenInput, setIsOpenInput] = useState<boolean>(false);
  const [isLike, setIsLike] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(comment.reactions.length);
  const mutationM = api.comment.patchLikeComment.useMutation();
  const {
    data: data_user,
    isLoading: isLoading_user,
    error: error_user,
  } = api.user.getUserById.useQuery({ id: comment.userId });

  const {
    data: data_comment,
    isLoading: isLoading_comment,
    error: error_comment,
    refetch: refetchComments,
  } = api.comment.getCommentByParentId.useQuery({ id: comment.id });

  const [commentChildren, setCommentChildren] = useState<CommentType[]>([]);

  useEffect(() => {
    if (data_comment) {
      setCommentChildren(data_comment);
    }
  }, [data_comment]);

  const handleCommentAdded = (newComment: CommentType) => {
    refetchComments();
  };

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLike = async () => {
    if (!session) {
      router.push("/enter").catch((error) => {
        console.error("Error while navigating:", error);
      });
      return;
    }
    setIsLoading(true);
    const response = await mutationM.mutateAsync({
      commentId: comment.id,
    });
    setIsLoading(false);
  
    sendNotification({
      userId: comment.userId,
      message: `Liked your comment: \n${comment.content}`
    });
  
    if (response) {
      setIsLike(response.isCreate);
      setLikeCount((prev) => (response.isCreate ? prev + 1 : prev - 1));
    }
  };
  

  const handleReply = () => {
    if (!session) {
      router.push("/enter").catch((error) => {
        console.error("Error while navigating:", error);
      });
      return;
    }
    setIsOpenInput(!isOpenInput);
  };

  useEffect(() => {
    if (session) {
      const liked = comment.reactions.some(
        (item) => item.userId === session.user.id,
      );
      setIsLike(liked);
    }
  }, []);

  return (
    <div>
      <FullScreenLoader loading={isLoading} />
      <div className="mt-[36px] flex">
        {!isLoading_user && data_user ? (
          <>
            <Button
              onClick={async () => {
                try {
                  await router.push(`/${comment.userId}`);
                } catch (error) {
                  console.error("Failed to navigate:", error);
                }
                return null;
              }}
              type="secondary"
              className=""
              classNameProp="!p-0 h-max mr-2"
            >
              <img
                src={data_user?.image ?? undefined}
                style={{ backgroundColor: "#dddddd" }}
                className="h-[32px] w-[32px] rounded-full focus:border-transparent focus:outline-none"
                alt={data_user?.name ?? "User profile"}
              />
            </Button>
            <div>
              <Box classNameProp="flex w-full flex-col !p-[12px]">
                <div className="flex items-center">
                  <Button
                    type="secondary"
                    className=""
                    classNameProp="!p-0 h-max hover:!bg-[#f5f5f5] hover:no-underline"
                    onClick={async () => {
                      try {
                        await router.push(`/${comment.userId}`);
                      } catch (error) {
                        console.error("Failed to navigate:", error);
                      }
                      return null;
                    }}
                  >
                    <h1 className="p-1 text-[16px] font-medium">
                      {data_user?.name}
                    </h1>
                  </Button>
                  <p className="mr-2 pb-[5px] text-[14px] font-extrabold text-[#bdbdbd]">
                    .
                  </p>
                  <p className="text-[14px] text-[#717171]">
                    {timeDifference(String(comment.createdAt))}
                  </p>
                </div>
                <div>
                  <p className="p-1">
                    <PostDetailView content={comment.content} />
                  </p>
                </div>
              </Box>
              <div className="mt-2 flex">
                <Button
                  type="secondary"
                  className="mr-1"
                  classNameProp={`w-max !py-1 !px-2 h-max hover:no-underline ${isLike ? "!bg-[#dc26261a]" : ""}`}
                  onClick={handleLike}
                >
                  <HeartIcon color={isLike ? "#dc2626" : ""} />
                  {likeCount} likes
                </Button>
                <Button
                  type="secondary"
                  className=""
                  classNameProp="w-max !py-1 !px-2 h-max hover:no-underline"
                  onClick={handleReply}
                >
                  <CommentIcon />
                  Reply
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div>Loading ...</div>
        )}
      </div>
      {isOpenInput && (
        <div>
          <CommentInput
            session={session}
            parentId={comment.id}
            postId={comment.postId}
            handleCommentAdd={handleCommentAdded}
            setIsOpenInput={setIsOpenInput}
            userId={comment.userId}
          />
        </div>
      )}
      {!isLoading_comment && data_comment && data_comment.length > 0 && (
        <div className="ml-10">
          {commentChildren.map((childComment) => (
            <CommentDetail
              key={childComment.id}
              session={session}
              comment={childComment}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentDetail;
