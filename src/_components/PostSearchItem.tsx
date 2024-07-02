"use client";
import { FC, useState } from "react";
import Button from "@/_components/Button";
import Box from "@/_components/Box";
import Tag from "@/_components/Tag";
import CommentIcon from "@/_components/Icon/CommentIcon";
import SaveIcon from "@/_components/Icon/SaveIcon";
import CommentWidget from "@/_components/CommentWidget";
import { useSession } from "next-auth/react";
import { PostTypeBody, TagType } from "@/typeProp";
import { api } from "@/utils/api";
import { useRouter } from "next/router";
import { timeDifference } from "@/utils";

export interface UserType {
  name: string | null;
  image: string | null;
}

const PostSearchItem: FC<{ postDetail: PostTypeBody; data_tag: TagType[] }> = ({ postDetail, data_tag }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const {
    data: data_user,
    isLoading: isLoading_user,
    error: error_user,
  } = api.user.getUserById.useQuery({ id: postDetail.createdById });

  const author: UserType | null = data_user ?? null;

  const handleChooseTag = (tagId: number) => {
    return data_tag.find((item) => item.id === tagId);
  };

  return (
    <Box classNameProp="!p-0 mb-2 overflow-hidden">
      <div className="p-5 pb-3">
        <div className="mb-[10px] flex h-[32px] items-center">
          <div
            onClick={async () => {
              try {
                await router.push(`/${postDetail.createdById}`);
              } catch (error) {
                console.error("Failed to navigate:", error);
              }
              return null;
            }}
            className="flex items-center"
          >
            <div className="text-[14px] font-medium text-text3 flex">
              By :<div className="text-[14px] ml-2 font-bold text-text3 cursor-pointer">{author?.name && !isLoading_user ? author?.name : ""}</div>
            </div>
            <p className="text-[12px] text-text4 ml-4">{timeDifference(String(postDetail.createdAt))}</p>
          </div>
        </div>
        <div className="ml-[0px]">
          <Button
            type="secondary"
            className=""
            classNameProp="h-max !p-0 hover:!bg-[#ffffff] !text-[#171717] hover:no-underline hover:!text-button4"
            onClick={async () => {
              try {
                await router.push(`/${postDetail.createdById}/${postDetail.id}`);
              } catch (error) {
                console.error("Failed to navigate:", error);
              }
              return null;
            }}
          >
            <h2 className="mb-1 text-[20px] font-bold">{postDetail.title}</h2>
          </Button>
        </div>
      </div>

    </Box>
  );
};

export default PostSearchItem;
