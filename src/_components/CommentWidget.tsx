"use client";
import { FC } from "react";
import Comment from "@/_components/Comment";
import Button from "@/_components/Button";

type CommentType = {
  id: number;
  author_id: number;
  author_name: string;
  author_avatar: string;
  post_id: number;
  content: string;
  created_at: string;
};

const CommentWidget: FC = () => {
  const commentList: CommentType[] = [
    {
      id: 1,
      author_id: 2,
      author_name: "Amin",
      author_avatar: "https://khoinguonsangtao.vn/wp-content/uploads/2022/08/hinh-anh-meo-cute-doi-mat-to-tron-den-lay-de-thuong.jpg",
      post_id: 1,
      content: "And this is open-source, so you can actually take a look at how it is done behind the scenes.",
      created_at: "9 hours",
    },
    {
      id: 2,
      author_id: 2,
      author_name: "Amin",
      author_avatar: "https://khoinguonsangtao.vn/wp-content/uploads/2022/08/hinh-anh-meo-cute-doi-mat-to-tron-den-lay-de-thuong.jpg",
      post_id: 1,
      content: "And this is open-source, so you can actually take a look at how it is done behind the scenes.",
      created_at: "9 hours",
    },
    {
      id: 3,
      author_id: 2,
      author_name: "Amin",
      author_avatar: "https://khoinguonsangtao.vn/wp-content/uploads/2022/08/hinh-anh-meo-cute-doi-mat-to-tron-den-lay-de-thuong.jpg",
      post_id: 1,
      content: "And this is open-source, so you can actually take a look at how it is done behind the scenes.",
      created_at: "9 hours",
    },
    {
      id: 4,
      author_id: 2,
      author_name: "Amin",
      author_avatar: "https://khoinguonsangtao.vn/wp-content/uploads/2022/08/hinh-anh-meo-cute-doi-mat-to-tron-den-lay-de-thuong.jpg",
      post_id: 1,
      content: "And this is open-source, so you can actually take a look at how it is done behind the scenes.",
      created_at: "9 hours",
    },
  ];

  return (
    <div className="px-4 pb-5">
      {commentList.slice(0, 2).map((item) => (
        <Comment key={item.id} comment={item} />
      ))}
      {
        commentList.length > 2 ?
      <Button type="secondary" className="ml-[30px]" classNameProp="h-max w-max !p-0 !text-[14px] hover:no-underline hover:!bg-button6">
        <p className="py-1 px-3 !text-text3 font-semibold hover:!text-[#090909]">See all 19 comments</p>
      </Button> :
      <div></div>
      }
    </div>
  );
};

export default CommentWidget;
