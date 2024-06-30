"use client";
import { FC, useState } from "react";
import Button from "@/_components/Button";
import Box from "@/_components/Box";
import Tag from "@/_components/Tag";
import CommentIcon from "@/_components/Icon/CommentIcon";
import SaveIcon from "@/_components/Icon/SaveIcon";
import CommentWidget from "@/_components/CommentWidget";
import { useSession } from "next-auth/react";
import { PostTypeBody, TagType, UserType } from "@/typeProp";
import { api } from "@/utils/api";
import { useRouter } from "next/router";

// export interface UserType {
//   name: string | null;
//   image: string | null;
// }

const UserSearch: FC<{ user: UserType }> = ({ user }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  return (
    <Box classNameProp="!p-0 mb-2 overflow-hidden">
      <div className="p-5 pb-3">
        <div className="mb-[10px] flex h-[32px] items-center">
          <Button
            onClick={async () => {
              try {
                await router.push(`/${user.id}`);
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
              src={user?.image ?? ""}
              style={{ backgroundColor: "#dddddd;" }}
              className="mr-2 h-[32px] w-[32px] rounded-full"
              alt={user?.name ?? ""}
            />
          </Button>
          <div
            onClick={async () => {
              try {
                await router.push(`/${user.id}`);
              } catch (error) {
                console.error("Failed to navigate:", error);
              }
              return null;
            }}
            className=""
          >
            <h2 className="text-[14px] font-medium text-text3 cursor-pointer">
              {user?.name ? user?.name : ""}
            </h2>
          </div>
        </div>
        <></>
      </div>

    </Box>
  );
};

export default UserSearch;
