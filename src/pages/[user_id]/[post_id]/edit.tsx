"use client";
import Head from "next/head";
import Button from "@/_components/Button";
import CloseIcon from "@/_components/Icon/CloseIcon";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import AuthLayout from "@/layout/AuthLayout";
import { useEffect } from "react";
import { api } from "@/utils/api";
import { TagType } from "@/typeProp";
import EditPost from "@/_components/Section/EditPost";

export default function EditPage() {
  const { data: session, status } = useSession();
  const router = useRouter()
  const {
    data: all_tag,
    isLoading: isLoading_tags,
    error: error_tags,
  } = api.tag.getAll.useQuery();

  const { user_id, post_id } = router.query;

  const postId = Number(post_id);
  const userId = String(user_id);

  const data_tags: TagType[] | undefined = all_tag;

  useEffect(() => {
    if (!session && status !== "loading") {
      router.push("/").catch((error) => {
        console.error("Failed to redirect:", error);
      });
    }
    if (isNaN(postId)) {
        if (status === "authenticated") {
          void router.push("/?sign-in=true");
        } else {
          void router.push("/");
        }
      }
    if (session && session.user.id != userId) {
        router.push("/").catch((error) => {
            console.error("Failed to redirect:", error);
          });
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
          <title>Edit Post - DEV Community</title>
        </Head>
        <EditPost data_tags={data_tags} post_id = {Number(post_id)} user_id = {String(user_id)} session = {session} />
      </div>
  );
}
