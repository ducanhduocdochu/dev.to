import { useRouter } from "next/router";
import { FC } from "react";
import Box from "@/_components/Box";
import SaveIcon from "../Icon/SaveIcon";
import Button from "../Button";
import CommentIcon from "../Icon/CommentIcon";
import Tag from "../Tag";
import HeartIcon from "../Icon/PostDetailIcon/HeartIcon";
import UnicornIcon from "../Icon/PostDetailIcon/UnicornIcon";
import ExplodingHeadIcon from "../Icon/PostDetailIcon/ExplodingHeadIcon";
import RaiseHandIcon from "../Icon/PostDetailIcon/RaiseHandIcon";
import FireIcon from "../Icon/PostDetailIcon/FireIcon";
import ToogleIcon from "../Icon/PostDetailIcon/ToogleIcon";
import { PostType } from "@/typeProp";

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

type PostDetailProps = {
  post: PostType;
};

const PostDetail: FC<PostDetailProps> = ({ post }) => {
  const router = useRouter();
  const { user_id, post_title } = router.query;

  const author_name = "hudy9x";
  const author_avatar =
    "https://khoinguonsangtao.vn/wp-content/uploads/2022/08/hinh-anh-meo-cute-doi-mat-to-tron-den-lay-de-thuong.jpg";

  return (
    <Box classNameProp="w-[876.391px] !p-0 overflow-hidden">
      <img src={post.picture_post} alt={post.title} className="w-[876.391px]" />
      <div className="px-16 py-8">
        <div className="mb-[10px] flex h-[32px] items-center">
          <Button type="secondary" className="" classNameProp="!p-0 h-max">
            <img
              src={author_avatar}
              style={{ backgroundColor: "#dddddd;" }}
              className="mr-2 h-[32px] w-[32px] rounded-full"
              alt={author_name}
            />
          </Button>
          <div className="pl-[12px]">
            <h2 className="text-[16px] font-medium text-text3">
              {author_name}
            </h2>
            <p className="text-[12px] text-text4">{post.created_at}</p>
          </div>
        </div>

        <div className="mb-[20px] mt-[33px] flex">
          {post.heart_reaction > 0 && (
            <div className="flex">
              <HeartIcon size={24} />
              <p className="ml-1">{post.heart_reaction}</p>
            </div>
          )}
          {post.heart_reaction > 0 && (
            <div className="ml-10 flex">
              <UnicornIcon size={24} />
              <p className="ml-1">{post.unicorn_reaction}</p>
            </div>
          )}
          {post.heart_reaction > 0 && (
            <div className="ml-10 flex">
              <ExplodingHeadIcon size={24} />
              <p className="ml-1">{post.exploding_reaction}</p>
            </div>
          )}
          {post.heart_reaction > 0 && (
            <div className="ml-10 flex">
              <RaiseHandIcon size={24} />
              <p className="ml-1">{post.raisehand_reaction}</p>
            </div>
          )}
          {post.heart_reaction > 0 && (
            <div className="ml-10 flex">
              <FireIcon size={24} />
              <p className="ml-1">{post.fire_reaction}</p>
            </div>
          )}
        </div>

        <h2 className="text-[48px] font-extrabold leading-[37.5px]">
          {post.title}
        </h2>

        <div className="mt-5 flex">
          {post.tags.map((item) => {
            return (
              <Button
                type="secondary"
                className="tag"
                classNameProp={`h-max !text-[16px] !p-0 hover:no-underline`}
              >
                <Tag tag={item} />
              </Button>
            );
          })}
        </div>

        {/* Content */}
        <div className="my-8">ducanh</div>
      </div>
      {/* Comment */}
      <div className="py-8 px-16 border-t border-t-[rgb(239, 239, 239)]">
        {/* Title */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-[24px] font-bold">Top comments ({post.quantity_comment})</h1>
            <Button type='secondary' className="" classNameProp="items-center !h-[54px] !px-4 !pt-[6px] !pb-[10px]"><ToogleIcon/></Button>
          </div>
          <Button type='secondary' className="" classNameProp="!text-[#3d3d3d] !font-medium shadow-button-sub !border-2 !border-[rgb(214, 214, 215)] hover:!border-[#a3a3a3] hover:no-underline hover:!bg-bg2">Subscribe</Button>
        </div>
        {/* Input */}
        {/* <div>
        <img
              src={author_avatar}
              style={{ backgroundColor: "#dddddd;" }}
              className="mr-2 h-[32px] w-[32px] rounded-full"
              alt={author_name}
            />
            <textarea
                className="placeholder-font placeholder-20 placeholder-normal mb-4 h-[489px] w-full rounded-md border border-0 border-gray-300 p-2 px-16 text-[18px] placeholder-[#666666] focus:outline-none"
                placeholder="Write your post content here..."
                value={content}
                ref={contentRef}
                onChange={handleContentChange}
                onFocus={handleContentFocus}
              />
        </div> */}
      </div>
    </Box>
  );
};

export default PostDetail;
