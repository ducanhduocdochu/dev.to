import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function NotificationsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    const handleRedirect = async () => {
      if (!session && status !== "loading") {
        try {
          await router.push("/");
        } catch (error) {
          console.error("Failed to redirect:", error);
        }
      }
    };

    // Chờ đợi cho router.push hoàn thành
    handleRedirect();
  }, [session, status, router]);

  if (!session) {
    return null;
  }

  return (
    <div className="relative flex h-screen w-screen items-center justify-center bg-bg2">
      <Head>
        <title>Notifications - DEV Community</title>
      </Head>
      Notifications Page
    </div>
  );
}
