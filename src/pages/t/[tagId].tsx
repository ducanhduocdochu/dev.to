import Box from "@/_components/Box";
import Header from "@/_components/Section/Header";
import Head from "next/head";
import { useRouter } from "next/router";
import { api } from "@/utils/api";
import React from "react";
import TagPost from "@/_components/Section/TagPost";
import Bar from "@/_components/Bar";
import SkeletonList from "@/_components/SkeletonList";

const TagPage: React.FC = () => {
  const router = useRouter();
  const { tagId } = router.query;
  const idTag = Number(tagId);

  const {
    data: data_tag,
    isLoading: isLoading_tag,
    error: error_tag,
  } = api.tag.getTagById.useQuery({ tagId: idTag }); 

  const color = data_tag?.color;

  return (
    <div className="bg-[#f5f5f5] flex flex-col items-center w-screen">
      <Header />
      <Head>
        <title>{!isLoading_tag && data_tag ? data_tag.name : "... Loading"} - DEV Community</title>
      </Head>
      {!isLoading_tag && data_tag ? (
        <>
        <div
          className="mt-[72px] h-[16px] px-2 rounded-t-md"
          style={{ backgroundColor: color }}
        >
          <div className="w-header-w"></div>
        </div>
        <Box classNameProp="bg-white px-2 py-0">
          <div className="w-header-w !p-6 text-[30px] font-bold">{data_tag.name}</div>
        </Box>
        </>
      ) : (
        <div
        >
        Loading...</div>
      )}

      <div className="px-2 mt-4 flex flex-col items-center">
        <div className="my-4 font-bold text-[24px]">List post for tag: </div>
        <TagPost />
      </div>
    </div>
  );
};

export default TagPage;
