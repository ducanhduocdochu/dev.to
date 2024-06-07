import { FC } from "react";
import Button from "@/_components/Button";
import { PostTypeTab } from "@/typeProp";
import { useRouter } from "next/router";

interface TabProps {
  title: string;
  sub: string;
  posts: PostTypeTab[];
}

const Tab: FC<TabProps> = ({ title, sub, posts }) => {
  const router = useRouter()
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
            onClick={() => {
              router.push(`/${post.createdById}/${post.id}`)
              return null
            }}
          >
            <div className="self-start text-[16px]">
              {post.title}
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Tab;
