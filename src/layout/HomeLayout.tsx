import Header from "@/_components/Section/Header";
import SideBarLeft from "@/_components/Section/SideBarLeft";
import SideBarRight from "@/_components/Section/SideBarRight";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex justify-center bg-bg2 pt-header-h">
      <Header />
      <div className="flex justify-center p-4">
        <Head>
          <title>DEV Community</title>
        </Head>
        <div className="m-4 mt-0 flex w-header-w justify-between">
          <SideBarLeft />{children}<SideBarRight />
        </div>
      </div>
    </div>
  );
}
