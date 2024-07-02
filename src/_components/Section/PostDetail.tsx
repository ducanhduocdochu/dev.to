import { useRouter } from "next/router";
import { FC, useState } from "react";
import Box from "@/_components/Box";
import Button from "../Button";
import Tag from "../Tag";
import HeartIcon from "../Icon/PostDetailIcon/HeartIcon";
import UnicornIcon from "../Icon/PostDetailIcon/UnicornIcon";
import ExplodingHeadIcon from "../Icon/PostDetailIcon/ExplodingHeadIcon";
import RaiseHandIcon from "../Icon/PostDetailIcon/RaiseHandIcon";
import FireIcon from "../Icon/PostDetailIcon/FireIcon";
import ToogleIcon from "../Icon/PostDetailIcon/ToogleIcon";
import { UserType } from "@/_components/Post";
import { Session } from "next-auth";
import { detailPostType } from "@/_components/Section/Reaction";
import PostDetailView from "../PostDetailView";
import CommentInput from "../CommentInput";
import CommentDetailWidget from "../CommentDetailWidget";
import { api } from "@/utils/api";
import { CommentType, PostTypeDetail, TagPostType, TagType } from "@/typeProp";
import { timeDifference } from "@/utils";

type PostDetailProps = {
  detailPost: detailPostType;
  post: PostTypeDetail;
  data_user: UserType;
  session: Session | null | undefined;
};

const PostDetail: FC<PostDetailProps> = ({
  detailPost,
  post,
  data_user,
  session,
}) => {
  const router = useRouter();
  const [comments, setComments] = useState<CommentType[]>(post.comments);

  const handleCommentAdded = (newComment: CommentType) => {
    setComments((prevComments) => [newComment, ...prevComments]);
  };
  const {
    data: data_tag,
    isLoading: isLoading_tag,
    error: error_tag,
  } = api.tag.getAll.useQuery();

  const handleChooseTag = (tagId: number): TagType | undefined => {
    return data_tag?.find((item) => item.id === tagId);
  };

  const handleRouteTag = (tagId: number) => {
    router.push(`/t/${tagId}`).catch((error) => {
      console.error("Failed to redirect:", error);
    });
  };

  const handleRouteEdit = () => {
    router.push(`/${session?.user.id}/${post.id}/edit`).catch((error) => {
      console.error("Failed to redirect:", error);
    });
  };

  return (
    <div className="w-[876.391px]">
      <Box classNameProp="w-[876.391px] !p-0 overflow-hidden mb-4">
        {post.picturePost && <img
          src={post.picturePost ?? ""}
          alt={post.title}
          className="h-[368.078px] w-[876.391px]"
        />}
        <div className="px-16 py-8">
          <div className="mb-[10px] flex h-[32px] justify-between">
            <div className="flex items-center">
              <Button
                type="secondary"
                className=""
                classNameProp="!p-0 h-max"
                onClick={async () => {
                  try {
                    await router.push(`/${post.createdById}`);
                  } catch (error) {
                    console.error("Failed to navigate:", error);
                  }
                  return null;
                }}
              >
                <img
                  src={data_user.image ?? ""}
                  style={{ backgroundColor: "#dddddd;" }}
                  className="mr-2 h-[32px] w-[32px] rounded-full"
                  alt={data_user.name ?? ""}
                />
              </Button>
              <div className="pl-[12px]">
              <Button
                type="secondary"
                className=""
                classNameProp="!p-0 h-max hover:!bg-[#f5f5f5] hover:no-underline"
                onClick={async () => {
                  try {
                    await router.push(`/${post.createdById}`);
                  } catch (error) {
                    console.error("Failed to navigate:", error);
                  }
                  return null;
                }}
              >
                <h2 className="text-[16px] font-medium text-text3">
                  {data_user.name}
                </h2>
                </Button>
                <p className="text-[12px] text-text4">
                  {timeDifference(String(post.createdAt))}
                </p>
              </div>
            </div>
            {session?.user.id == post.createdById &&
            <div className="flex p-1 bg-[#fef5e6] h-max rounded-md">
              <Button
                type="secondary"
                className=""
                classNameProp={`!py-1 !px-2 !text-[16px] flex items-center bg-[#fef5e6] hover:no-underline`}
                onClick={handleRouteEdit}
              >
                Edit
              </Button>

              <Button
                type="secondary"
                className=""
                classNameProp={`!py-1 !px-2 !text-[16px] flex items-center bg-[#fef5e6] hover:no-underline`}
              >
                Manage
              </Button>
              <Button
                type="secondary"
                className=""
                classNameProp={`!py-1 !px-2 !text-[16px] flex items-center bg-[#fef5e6] hover:no-underline`}
              >
                Stats
              </Button>
            </div>}
          </div> 

          <div className="mb-[20px] mt-[33px] flex">
            {1 > 0 && (
              <div className="flex">
                <HeartIcon size={24} />
                <p className="ml-1">{detailPost.quantityHeart}</p>
              </div>
            )}
            {1 > 0 && (
              <div className="ml-10 flex">
                <UnicornIcon size={24} />
                <p className="ml-1">{detailPost.quantityUnicorn}</p>
              </div>
            )}
            {1 > 0 && (
              <div className="ml-10 flex">
                <ExplodingHeadIcon size={24} />
                <p className="ml-1">{detailPost.quantityExploding}</p>
              </div>
            )}
            {1 > 0 && (
              <div className="ml-10 flex">
                <RaiseHandIcon size={24} />
                <p className="ml-1">{detailPost.quantityRaiseHand}</p>
              </div>
            )}
            {1 > 0 && (
              <div className="ml-10 flex">
                <FireIcon size={24} />
                <p className="ml-1">{detailPost.quantityFire}</p>
              </div>
            )}
          </div>

          <h2 className="text-[48px] font-extrabold leading-[37.5px]">
            {post.title}
          </h2>

          <div className="mt-5 flex">
            {post.tags.map((tag: TagPostType) => {
              const chooseTag = handleChooseTag(tag.tagId);
              return (
                <Button
                  key={chooseTag?.id}
                  type="secondary"
                  className="tag"
                  classNameProp={`h-max !text-[16px] !p-0 hover:no-underline`}
                  onClick={() => handleRouteTag(tag.tagId)}
                >
                  <Tag tag={chooseTag} />
                </Button>
              );
            })}
          </div>

          {/* Content */}
          <div className="my-8">
            <PostDetailView content={post.content} />
          </div>
        </div>

        <div className="border-t-[rgb(239, 239, 239)] border-t px-16 py-8">
          {/* Title */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <h1 className="text-[24px] font-bold">
                Top comments ({detailPost.quantityComment})
              </h1>
              <Button
                type="secondary"
                className=""
                classNameProp="items-center !h-[54px] !px-4 !pt-[6px] !pb-[10px]"
              >
                <ToogleIcon />
              </Button>
            </div>
            <Button
              type="secondary"
              className=""
              classNameProp="!text-[#3d3d3d] !font-medium shadow-button-sub !border-2 !border-[rgb(214, 214, 215)] hover:!border-[#a3a3a3] hover:no-underline hover:!bg-bg2"
            >
              Subscribe
            </Button>
          </div>
          {/* Input */}
          <CommentInput session={session} parentId={null} postId={post.id} handleCommentAdd = {handleCommentAdded} />
          <CommentDetailWidget session={session} list_comment={comments}  />
        </div>
      </Box>
    </div>
  );
};

export default PostDetail;
