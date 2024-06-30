import { FC } from "react";
import Button from "@/_components/Button";
import { api } from "@/utils/api";
import { TagType } from "@/typeProp";
import { useRouter } from "next/router";
import SkeletonList from "./SkeletonList";

const MenuTag: FC = () => {
  const { data: tags, isLoading, error } = api.tag.getAll.useQuery();
  const router = useRouter();

  return (
    <div className="mb-6">
      <p className="py-2 pl-[16px] font-bold">Popular Tags</p>
      <div className="h-[346.444px] overflow-y-scroll">
        {isLoading ? (
          <SkeletonList x={1} width="w-[200px]" height="h-3" />
        ) : (
          <>
            {tags?.map((tag: TagType) => (
              <Button
                key={tag.id}
                type="secondary"
                className=""
                classNameProp="justify-start items-center"
                onClick={async () => {
                  try {
                    await router.push(`/t/${tag.id}`);
                  } catch (error) {
                    console.error('Failed to navigate:', error);
                  }
                  return null;
                }}
              >
                <p className="ml-2">#{tag.name}</p>
              </Button>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default MenuTag;
