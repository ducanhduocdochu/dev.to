import { FC } from "react";
import Button from "@/_components/Button";
import { PostTypeTab } from "@/typeProp";
import { useRouter } from "next/router";

interface TabBoxProps {
  title: string;
  sub: string;
  posts: PostTypeTab[];
}

const TabBox: FC<TabBoxProps> = ({ title, sub, posts }) => {
  const router = useRouter()
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
            type = "secondary"
            onClick={() => {
              router.push(`/${post.createdById}/${post.id}`)
              return null
            }}
          >
            <div className="text-[16px] self-start">{post.title}</div>
            {/* {post.quantityComment > 0 ? ( */}
              {/* <div className="mt-1 text-button5 text-[14px]">
                {post.quantityComment} comments
              </div>
            ) : ( */}
              <div className="mt-1 text-[#78350f] bg-[#fcd34d] p-1 rounded-md text-[14px] leading-[14px]">
                New
              </div>
            {/* )} */}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default TabBox;
