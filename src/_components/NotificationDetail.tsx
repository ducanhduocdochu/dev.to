"use client";
import { FC, useState } from "react";
import Button from "@/_components/Button";
import Box from "@/_components/Box";
import Tag from "@/_components/Tag";
import CommentIcon from "@/_components/Icon/CommentIcon";
import SaveIcon from "@/_components/Icon/SaveIcon";
import CommentWidget from "@/_components/CommentWidget";
import { useSession } from "next-auth/react";
import { NotificationType, PostTypeBody, TagType } from "@/typeProp";
import { api } from "@/utils/api";
import { useRouter } from "next/router";
import { splitStringAtColon, timeDifference } from "@/utils";
import PostDetailView from "./PostDetailView";

export interface UserType {
  name: string | null;
  image: string | null;
}

const NotificationDetail: FC<{ notiDetail: NotificationType }> = ({ notiDetail }) => {
  const router = useRouter();
  const {
    data: data_user,
    isLoading: isLoading_user,
    error: error_user,
  } = api.user.getUserById.useQuery({ id: notiDetail.senderId });

  const author: UserType | null = data_user ?? null;

  return (
    <Box classNameProp={`!p-0 mb-2 overflow-hidden`}>
      <div className="p-5 pb-3">
        <div className="flex justify-between">
        <div className="mb-[10px] flex h-[32px] items-center">
          <Button
            onClick={async () => {
              try {
                await router.push(`/${notiDetail.senderId}`);
              } catch (error) {
                console.error("Failed to navigate:", error);
              }
              return null;
            }}
            type="secondary"
            className=""
            classNameProp="!p-0 h-max"
          >
            <img
              src={author?.image ?? ""}
              style={{ backgroundColor: "#dddddd;" }}
              className="mr-2 h-[32px] w-[32px] rounded-full"
              alt={author?.name ?? ""}
            />
          </Button>
          <div
            onClick={async () => {
              try {
                await router.push(`/${notiDetail.senderId}`);
              } catch (error) {
                console.error("Failed to navigate:", error);
              }
              return null;
            }}
            className=""
          >
            <h2 className="text-[14px] font-medium text-text3 cursor-pointer">
              {author?.name && !isLoading_user ? author?.name : ""}
            </h2>
            {/* <p className="text-[12px] text-text4">{timeDifference(String(postDetail.createdAt))}</p> */}
            <p className="text-[12px] text-text4">-1 minutes</p>
          </div>
        </div>
        {!notiDetail.seen && <div>not seen</div>}
        </div>
        <div className="ml-[40px]">
          <Button
            type="secondary"
            className=""
            classNameProp="h-max !p-0 hover:!bg-[#ffffff] !text-[#171717] hover:no-underline hover:!text-button4 flex flex-col"
            // onClick={async () => {
            //   try {
            //     await router.push(`/${postDetail.createdById}/${postDetail.id}`);
            //   } catch (error) {
            //     console.error("Failed to navigate:", error);
            //   }
            //   return null;
            // }}
          >
            <h2 className="mb-1 text-[24px] font-bold leading-[37.5px]">{splitStringAtColon(notiDetail.message)[0]}</h2>
            <PostDetailView content={splitStringAtColon(notiDetail.message)[1]}/>
          </Button>
        </div>
      </div>

    </Box>
  );
};

export default NotificationDetail;
