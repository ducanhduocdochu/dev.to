import { Session } from "next-auth";
import {FC } from "react";
import Button from "@/_components/Button";
import Box from "./Box";
import CommentIcon from "./Icon/CommentIcon/CommentIcon";
import HeartIcon from "./Icon/CommentIcon/HeartIcon";

const CommentDetail: FC<{ session: Session | null | undefined }> = ({
  session,
}) => {
  return (
    <div className="mt-[36px] flex">
      <img
        src={session?.user?.image ?? undefined}
        style={{ backgroundColor: "#dddddd" }}
        className="mr-2 h-[32px] w-[32px] rounded-full focus:border-transparent focus:outline-none"
        alt="User profile"
      />
      <div>
      <Box classNameProp="flex w-full flex-col !p-[12px]">
        <div className="flex items-center">
          <h1 className="p-1 text-[16px] font-medium">{session?.user?.name}</h1>
          <p className="mr-2 pb-[5px] text-[14px] font-extrabold text-[#bdbdbd]">
            .
          </p>
          <p className="text-[14px] text-[#717171]">Jun 7</p>
        </div>
        <div>
            <p className="p-1">
            Thanks for sharing the list! One more tool to improve the workflow:
            Freeter And a post on how I boosted my productivity with it:
            dev.to/alexk/how-i-boosted-my-prod...
            </p>
        </div>
      </Box>
      <div className="mt-2 flex">
        <Button type="secondary" className="mr-1" classNameProp="w-max !py-1 !px-2 h-max hover:no-underline">
            <CommentIcon/>
            4 likes
        </Button>
        <Button type="secondary" className="" classNameProp="w-max !py-1 !px-2 h-max hover:no-underline">
            <HeartIcon/>
            Reply
        </Button>
      </div>
      </div>
    </div>
  );
};

export default CommentDetail;
