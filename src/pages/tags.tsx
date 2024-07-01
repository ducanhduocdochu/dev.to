"use client";

import Button from "@/_components/Button";
import Tag from "@/_components/Tag";
import { api } from "@/utils/api";
import Head from "next/head";
import { useRouter } from "next/router";

export default function TagsPage() {
  const router = useRouter();
  const {
    data: data_tag,
    isLoading: isLoading_tag,
    error: error_tag,
  } = api.tag.getAll.useQuery();

  return (
    <div className="flex flex-col h-screen w-screen items-center justify-center bg-bg2">
      <Head>
        <title>Tags - DEV Community</title>
      </Head>
      {data_tag?.map((tag) => (
        <Button
          key={tag.id}
          type="secondary"
          className="tag"
          classNameProp={`h-max !text-[14px] !p-0 hover:no-underline`}
          onClick={async () => {
            try {
              await router.push(`/t/${tag.id}`);
            } catch (error) {
              console.error("Failed to navigate:", error);
            }
            return null;
          }}
        >
          <div className="h-[40px] w-[100px]">
            <Tag tag={tag} />
          </div>
        </Button>
      ))}
    </div>
  );
}
