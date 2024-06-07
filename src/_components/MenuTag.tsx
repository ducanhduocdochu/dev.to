import { FC, useEffect } from "react";
import Button from "@/_components/Button";
import { api } from "@/utils/api";
import { TagType } from "@/typeProp";
import { useRouter } from "next/router";

const MenuTag: FC = () => {
  const { data: tags, isLoading, error } = api.tag.getAll.useQuery();
  const router = useRouter()

  return (
    <div className="mb-6">
      <p className="py-2 pl-[16px] font-bold">Popular Tags</p>
      <div className="h-[346.444px] overflow-y-scroll">
        {isLoading ? (
          <div>Loading....</div>
        ) : (
          <>
            {tags?.map((tag: TagType) => (
              <Button
                key={tag.id}
                type="secondary"
                className=""
                classNameProp="justify-start items-center"
                onClick={() => {
                  router.push("/tags")
                  return null
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
