"use client";
import { FC } from "react";
import Box from "@/_components/Box";
import Button from "./Button";

type CommentType = {
  id: number;
  author_id: number;
  author_name: string;
  author_avatar: string;
  post_id: number;
  content: string;
  created_at: string;
};

type CommentProps = {
  comment: CommentType;
};

const Comment: FC<CommentProps> = ({ comment }) => {
  return (
    <div className="bg-red flex px-3 mb-3">
      <img
        className="h-6 w-6 rounded-full mr-2"
        src={comment.author_avatar}
        alt={comment.author_name}
      />
      <Box classNameProp="!bg-[#f5f5f5] !p-4 !pb-1 w-full">
        <div className="flex pb-1">
          <Button type="secondary" className="" classNameProp="!p-0 h-max hover:!bg-[#f5f5f5] hover:no-underline">
            <h3 className="!text-text3 !text-[14px] font-medium hover:!text-text3">{comment.author_name}</h3>
          </Button>
          <Button type="secondary" className="" classNameProp="!p-0 h-max hover:!bg-[#f5f5f5]">
            <p className="!text-text4 ml-1 !text-[14px]">9 hours ago</p>
          </Button>
        </div>
        <p className="pb-3 !text-[#171717] text-[14px]">{comment.content}</p>
      </Box>
    </div>
  );
};

export default Comment;
