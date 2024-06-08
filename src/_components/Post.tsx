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

export interface UserType {
  name: string | null;
  image: string | null;
}

const Post: FC<{ postDetail: PostTypeBody; data_tag: TagType[] }> = ({ postDetail, data_tag }) => {
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
      {postDetail.picturePost ? (
        <img
          src={postDetail.picturePost}
          style={{ backgroundColor: "#dddddd;" }}
          className="h-[301.266px] w-[717.328px]"
          alt={postDetail.title}
        />
      ) : (
        <></>
      )}

      <div className="p-5 pb-3">
        <div className="mb-[10px] flex h-[32px] items-center">
          <Button
            onClick={async () => {
              try {
                await router.push(`/${postDetail.createdById}`);
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
                await router.push(`/${postDetail.createdById}`);
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
            <p className="text-[12px] text-text4">{String(postDetail.createdAt)}</p>
          </div>
        </div>
        <div className="ml-[40px]">
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
            <h2 className="mb-1 text-[24px] font-bold leading-[37.5px]">{postDetail.title}</h2>
          </Button>

          <div className="mb-2 flex">
            {postDetail.tags.map((tag) => {
              const chooseTag = handleChooseTag(tag.tagId);
              return (
                <Button
                  key={tag.tagId}
                  type="secondary"
                  className="tag"
                  classNameProp={`h-max !text-[14px] !p-0 hover:no-underline`}
                  onClick={async () => {
                    try {
                      await router.push("/tags");
                    } catch (error) {
                      console.error("Failed to navigate:", error);
                    }
                    return null;
                  }}
                >
                  <Tag tag={chooseTag} />
                </Button>
              );
            })}
          </div>

          <div className="mt-[8px] flex justify-between items-center">
            <div className="flex">
              <Button
                onClick={async () => {
                  try {
                    await router.push(`/${postDetail.createdById}/${postDetail.id}`);
                  } catch (error) {
                    console.error("Failed to navigate:", error);
                  }
                  return null;
                }}
                type="secondary"
                className="group"
                classNameProp="!py-1 !pl-0 !pr-3 h-9 hover:no-underline hover:bg-[#00000009]"
              >
                <div className="flex items-center">
                  <span className="flex flex-row items-center mr-4" dir="rtl">
                    <span className="mr-[-11px] inline-block flex h-[28px] w-[28px] items-center justify-center rounded-2xl border-2 border-[#ffffff] bg-[#f5f5f5]">
                      <img
                        src="https://dev.to/assets/fire-f60e7a582391810302117f987b22a8ef04a2fe0df7e3258a5f49332df1cec71e.svg"
                        width="18"
                        height="18"
                      />
                    </span>
                    <span className="mr-[-11px] inline-block flex h-[28px] w-[28px] items-center justify-center rounded-2xl border-2 border-[#ffffff] bg-[#f5f5f5]">
                      <img
                        src="https://dev.to/assets/raised-hands-74b2099fd66a39f2d7eed9305ee0f4553df0eb7b4f11b01b6b1b499973048fe5.svg"
                        width="18"
                        height="18"
                      />
                    </span>
                    <span className="mr-[-11px] inline-block flex h-[28px] w-[28px] items-center justify-center rounded-2xl border-2 border-[#ffffff] bg-[#f5f5f5]">
                      <img
                        src="https://dev.to/assets/exploding-head-daceb38d627e6ae9b730f36a1e390fca556a4289d5a41abb2c35068ad3e2c4b5.svg"
                        width="18"
                        height="18"
                      />
                    </span>
                    <span className="mr-[-11px] inline-block flex h-[28px] w-[28px] items-center justify-center rounded-2xl border-2 border-[#ffffff] bg-[#f5f5f5]">
                      <img
                        src="https://dev.to/assets/multi-unicorn-b44d6f8c23cdd00964192bedc38af3e82463978aa611b4365bd33a0f1f4f3e97.svg"
                        width="18"
                      />
                    </span>
                    <span className="mr-[-11px] inline-block flex h-[28px] w-[28px] items-center justify-center rounded-2xl border-2 border-[#ffffff] bg-[#f5f5f5]">
                      <img
                        src="https://dev.to/assets/sparkle-heart-5f9bee3767e18deb1bb725290cb151c25234768a0e9a2bd39370c382d02920cf.svg"
                        width="18"
                        height="18"
                      />
                    </span>
                  </span>
                  <span className="text-[14px] !text-text3">
                    {/* {postDetail.quantity_reaction} */}
                    50
                    <span className=""> reactions</span>
                  </span>
                </div>
              </Button>

              <Button
                onClick={async () => {
                  try {
                    await router.push(`/${postDetail.createdById}/${postDetail.id}`);
                  } catch (error) {
                    console.error("Failed to navigate:", error);
                  }
                  return null;
                }}
                type="secondary"
                className=""
                classNameProp="!py-1 !pl-2 !pr-3 h-9 hover:no-underline"
              >
                <div className="flex items-center">
                  <CommentIcon />
                  <span className="text-[14px] !text-text3">
                    {/* {postDetail.quantity_comment} */}
                    50
                    <span className=""> comments</span>
                  </span>
                </div>
              </Button>
            </div>
            <div className="flex">
              <p className="mr-2 text-text4 text-[12px] leading-[15px] self-center">
                {postDetail.readingTime} min read
              </p>
              <Button type="secondary" className="" classNameProp="!p-2">
                <SaveIcon />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {session && <CommentWidget />}
    </Box>
  );
};

export default Post;
