"use client";
import Head from "next/head";
import CreatePost from "@/_components/Section/CreatePost";
import Button from "@/_components/Button";
import CloseIcon from "@/_components/Icon/CloseIcon";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import AuthLayout from "@/layout/AuthLayout";
import { useEffect } from "react";
import { api } from "@/utils/api";
import { TagType } from "@/typeProp";

export default function NewPage() {
  const { data: session, status } = useSession();
  const {
    data: all_tag,
    isLoading: isLoading_tags,
    error: error_tags,
  } = api.tag.getAll.useQuery();

  const data_tags: TagType[] | undefined = all_tag
  const router = useRouter();

  useEffect(() => {
    if (!session && status !== "loading") {
      router.push("/");
    }
  }, [session, status, router]);

  if (!session) {
    return null;
  }
  
  return (
      <div className="relative flex w-screen items-center justify-center bg-bg2">
        <div className="absolute right-[27px] top-[8px]">
          <Button type="secondary" className="" classNameProp="!p-2">
            <CloseIcon />
          </Button>
        </div>
        <Head>
          <title>New Post - DEV Community</title>
        </Head>
        <CreatePost data_tags={data_tags} />
      </div>
  );
}
