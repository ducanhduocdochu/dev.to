"use client";

import Head from "next/head";
import { useSearchParams } from "next/navigation";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");

  return (
    <div className="relative flex h-screen w-screen items-center justify-center bg-bg2">
      <Head>
        <title>Search Results for {query} - DEV Community</title>
      </Head>
      Search Page, param: {query}
    </div>
  );
}
