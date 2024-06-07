import OtherDetailPost from "@/_components/Section/OtherDetailPost";
import PostDetail from "@/_components/Section/PostDetail";
import Reaction from "@/_components/Section/Reaction";
import MainLayout from "@/layout/MainLayout";
import { PostType } from "@/typeProp";
import Head from "next/head";
import { useRouter } from "next/router";

enum ReadingTimeType {
  Minute = "min",
  Hour = "hour",
  Day = "day",
  Week = "week",
  Month = "month",
  Year = "Year",
}

enum TagType {
  Webdev = "webdev",
  Javascript = "javascript",
  Beginners = "beginners",
  Programming = "programming",
  Tutorial = "tutorial",
  React = "react",
  Python = "python",
  Ai = "ai",
}

const TagColors: { [key in TagType]: string } = {
  webdev: "rgb(86, 39, 101)",
  javascript: "rgb(247, 223, 30)",
  beginners: "rgb(0, 131, 53)",
  programming: "rgb(137, 6, 6)",
  tutorial: "rgb(254, 255, 165)",
  react: "rgb(34, 34, 34)",
  python: "rgb(30, 56, 187)",
  ai: "rgb(45, 42, 42)",
};

export default function PostPage() {
  const router = useRouter();
  const { user_id, post_title } = router.query;

  const post: PostType = {
    id: 1,
    author_id: 1,
    title: "Day 2: LINUX FUNDAMENTALS",
    tags: [TagType.Javascript, TagType.Webdev, TagType.Beginners],
    content: "",
    heart_reaction: 5,
    unicorn_reaction: 6,
    exploding_reaction: 7,
    raisehand_reaction: 8,
    fire_reaction: 9,
    quantity_comment: 10,
    quantity_save: 10,
    reading_time: 2,
    reading_time_type: ReadingTimeType.Minute,
    picture_post:
      "https://khoinguonsangtao.vn/wp-content/uploads/2022/08/hinh-anh-meo-cute-doi-mat-to-tron-den-lay-de-thuong.jpg",
    created_at: "aaa",
  };

  return (
    <MainLayout>
      <Head>
        <title>{post_title}</title>
      </Head>
      <div className="m-4 mt-0 flex w-header-w justify-between">
        <Reaction
          heart_reaction={post.heart_reaction}
          unicorn_reaction={post.unicorn_reaction}
          exploding_reaction={post.exploding_reaction}
          raisehand_reaction={post.raisehand_reaction}
          fire_reaction={post.fire_reaction}
          quantity_comment={post.quantity_comment}
          quantity_save={post.quantity_save}
        />
        <PostDetail 
          post = {post}
        />
        <OtherDetailPost />
      </div>
    </MainLayout>
  );
}
