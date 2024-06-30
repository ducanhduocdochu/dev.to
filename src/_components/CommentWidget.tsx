"use client";
import { FC } from "react";
import Comment from "@/_components/Comment";
import Button from "@/_components/Button";
import { CommentType } from "@/typeProp";
import { useRouter } from "next/router";

const CommentWidget: FC<{ commentDetail: CommentType[]; _count: number; user_id: string }> = ({
  commentDetail,
  _count,
  user_id
}) => {
  const router = useRouter()
  return (
    <div className="px-4 pb-5">
      {commentDetail.map((item) => (
        <Comment key={item.id} comment={item} />
      ))}
      {_count > 2 ? (
        <Button
          onClick={async () => {
            try {
              await router.push(`/${user_id}/${commentDetail[0]?.postId}`);
            } catch (error) {
              console.error("Failed to navigate:", error);
            }
            return null;
          }}
          type="secondary"
          className="ml-[30px]"
          classNameProp="h-max w-max !p-0 !text-[14px] hover:no-underline hover:!bg-button6"
        >
          <p className="px-3 py-1 font-semibold !text-text3 hover:!text-[#090909]">
            See all {_count} comments
          </p>
        </Button>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default CommentWidget;
