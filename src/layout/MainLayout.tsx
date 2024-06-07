import Header from "@/_components/Section/Header";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex justify-center bg-bg2 pt-header-h">
      <Header />
      <div className="flex justify-center p-4">{children}</div>
    </div>
  );
}
