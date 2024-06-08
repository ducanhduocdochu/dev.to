import { FC } from "react";
import Button from "@/_components/Button";
import { PostType } from "@/typeProp";
import { useRouter } from "next/router";

interface TabBoxProps {
  title: string;
  sub: string;
  posts: PostType[];
}

const TabBox: FC<TabBoxProps> = ({ title, sub, posts }) => {
  const router = useRouter();

  const handleClick = async (postId: string) => {
    try {
      await router.push(`/${postId}`);
    } catch (error) {
      console.error("Error navigating:", error);
    }
  };

  return (
    <div className="bg-bg1 rounded-md shadow-box mb-4">
      <div className="px-4 py-3 border-b-border-button border-b-button2">
        <p className="text-[20px] font-bold text-[#404040]">{title}</p>
        <p className="text-[12px] text-text">{sub}</p>
      </div>
      <div>
        {posts.map((post) => (
          <Button
            key={post.id}
            className="flex items-start p-4 border-b-border-button border-b-button2"
            classNameProp="flex-col items-start !p-0 justify-start hover:!no-underline h-max hover:!bg-[#ffffff] hover:!text-[#2f3ab2]"
            type="secondary"
            onClick={() => handleClick(post.createdById + "/" + post.id)}
          >
            <div className="text-[16px] self-start">{post.title}</div>
            <div className="mt-1 text-[#78350f] bg-[#fcd34d] p-1 rounded-md text-[14px] leading-[14px]">
              New
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default TabBox;
