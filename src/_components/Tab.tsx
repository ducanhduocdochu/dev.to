import { FC } from "react";
import Button from "@/_components/Button";
import { PostType } from "@/typeProp";
import { useRouter } from "next/router";

interface TabProps {
  title: string;
  sub: string;
  posts: PostType[];
}

const Tab: FC<TabProps> = ({ title, sub, posts }) => {
  const router = useRouter();

  const handleClick = async (postId: string) => {
    try {
      await router.push(`/${postId}`);
    } catch (error) {
      console.error("Error navigating:", error);
    }
  };

  return (
    <div className="mt-8 border-b-[1px] border-b-[#cccccc] pb-[14px] mb-12 px-4">
      <p
        className="pb-2 text-[0.9em] font-bold text-[button2]"
        style={{
          fontFamily:
            "'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace",
        }}
      >
        {title}
      </p>
      <div>
        {posts.map((post) => (
          <Button
            key={post.id}
            className="border-b-border-button border-b-button2"
            classNameProp="hover:text-button hover:no-underline hover:bg-[#ffffff] text-[#404040] hover:text-[button] h-max !p-4 rounded-none"
            type="secondary"
            onClick={() => handleClick(post.createdById + "/" + post.id)}
          >
            <div className="self-start text-[16px]">{post.title}</div>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Tab;
