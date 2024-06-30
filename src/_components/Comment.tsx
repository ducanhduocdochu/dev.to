"use client";
import { FC } from "react";
import Box from "@/_components/Box";
import Button from "./Button";
import { CommentType } from "@/typeProp";
import { api } from "@/utils/api";
import { timeDifference } from "@/utils";
import { UserType } from "./Post";
import { useRouter } from "next/router";
import PostDetailView from "./PostDetailView";

const Comment: FC<{ comment: CommentType }> = ({ comment }) => {
  const router = useRouter()
  const {
    data: data_user,
    isLoading: isLoading_user,
    error: error_user,
  } = api.user.getUserById.useQuery({ id: comment.userId });
  const author: UserType | null = data_user ?? null;

  return (
    <>
      {isLoading_user ? (
        <div>Loading ....</div>
      ) : (
        <div className="bg-red mb-3 flex px-3">
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
            classNameProp="!p-0 h-max"
          >
            {" "}
            <img
              className="mr-2 h-6 w-6 rounded-full"
              src={author?.image ?? ""}
              alt={author?.name ?? ""}
            />
          </Button>

          <Box classNameProp="!bg-[#f5f5f5] !p-4 !pb-1 w-full">
            <div className="flex pb-1">
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
                <h3 className="!text-[14px] font-medium !text-text3 hover:!text-text3">
                  {author?.name ?? ""}
                </h3>
              </Button>
              <Button
                type="secondary"
                className=""
                classNameProp="!p-0 h-max hover:!bg-[#f5f5f5]"
              >
                <p className="ml-1 !text-[14px] !text-text4">
                  {timeDifference(String(comment.createdAt))}
                </p>
              </Button>
            </div>
            <p className="pb-3 text-[14px] !text-[#171717]">
              <PostDetailView content = {comment.content}/>
            </p>
          </Box>
        </div>
      )}
    </>
  );
};

export default Comment;
