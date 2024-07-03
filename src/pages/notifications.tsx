import Button from "@/_components/Button";
import NotificationWidget from "@/_components/NotificationWidget";
import Header from "@/_components/Section/Header";
import { useWebSocket } from "@/context/WebSocketContext";
import { api } from "@/utils/api";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type Element = {
  id: number;
  title: string;
  link: string;
  isChoose: boolean;
};

interface BarProps {
  id: number;
  title: string;
  link: string;
  elements: Element[];
  isChoose: boolean;
}

export default function NotificationsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const mutation = api.notification.seenNotification.useMutation();
  const { setNotificationCount } = useWebSocket();
  const [filterOptions, setFilterOptions] = useState<BarProps[]>([
    {
      id: 1,
      title: "All",
      link: `/`,
      elements: [],
      isChoose: true,
    },
    {
      id: 2,
      title: "Post",
      link: `/`,
      elements: [],
      isChoose: false,
    },
    {
      id: 3,
      title: "Reaction",
      link: `/`,
      elements: [],
      isChoose: false,
    },
    {
      id: 4,
      title: "Comment",
      link: `/`,
      elements: [],
      isChoose: false,
    },
  ]);

  useEffect(() => {
    if (!session && status !== "loading") {
      router.push("/").catch((error) => {
        console.error("Error while navigating:", error);
      });
    }
  }, [session, status, router]);

  useEffect(() => {
    // const markNotificationsAsSeen = async () => {
      // try {
        // const response = await mutation.mutateAsync();
        // if (response) {
        //   setNotificationCount(0);
        // }
      // } catch (error) {
      //   console.error("Error marking notifications as seen:", error);
      // }
    // };
    setNotificationCount(0);
    // markNotificationsAsSeen();
  }, []);

  if (!session) {
    return null;
  }

  const handleFilterClick = (clickedItem: BarProps) => {
    setFilterOptions((prevOptions) =>
      prevOptions.map((item) =>
        item.id === clickedItem.id
          ? { ...item, isChoose: true }
          : { ...item, isChoose: false }
      )
    );
  };

  return (
    <div className="relative flex h-screen w-screen justify-center bg-bg2 pb-10 overflow-scroll">
      <Head>
        <title>Notifications - DEV Community</title>
      </Head>
      <Header />
      <div className="w-[1024px] p-4 mt-[56px]">
        <div className="flex justify-between">
          <h1 className="text-[30px] font-bold">Notifications</h1>
        </div>
        <div className="flex justify-between">
          <div className="w-[240px] mt-[10px]">
            {filterOptions.map((item) => (
              <Button
                type="secondary"
                key={item.id}
                className="w-full text-[text]"
                classNameProp={`hover:no-underline hover:!bg-[#ffffff] text-[16px] leading-[27px] !px-2 !py-2 ${item.isChoose ? "!font-bold !text-black bg-[#ffffff]" : "font-normal !text-[#878787]"}`}
                onClick={() => handleFilterClick(item)}
              >
                {item.title}
              </Button>
            ))}
          </div>

          <div className="w-[736px]">
            <NotificationWidget />
          </div>
        </div>
      </div>
    </div>
  );
}
