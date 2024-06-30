import Box from "@/_components/Box";
import Body from "@/_components/Section/Body";
import Header from "@/_components/Section/Header";
import PersonInfo from "@/_components/Section/PersonInfo";
import PersonInfoPost from "@/_components/Section/PersonInfoPost";
import PersonPost from "@/_components/Section/PersonPost";
import SideBarLeft from "@/_components/Section/SideBarLeft";
import SideBarRight from "@/_components/Section/SideBarRight";
import HomeLayout from "@/layout/HomeLayout";
import { api } from "@/utils/api";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

const PersonalPage: React.FC = () => {
  const router = useRouter();
  const { user_id } = router.query;
  const userId = String(user_id);

  const {
    data: data_user,
    isLoading: isLoading_user,
    error: error_user,
  } = api.user.getUserById.useQuery({ id: userId });

  const { data: session, status } = useSession();

  useEffect(() => {
    if (!data_user) {
      router.push("/").catch((error) => {
        console.error("Failed to redirect:", error);
      });
    }
  }, [userId, status, router]);

  return (
    <div className="h-[10000px] bg-[#f5f5f5]">
      <Header />
      <Head>
        <title>{data_user?.name} - DEV Community</title>
      </Head>
      <div className="relative mt-[56px]">
        <div className="absolute h-[124px] w-screen bg-[#70a99a] z-0"></div>
        <div className="absolute flex justify-center w-screen top-0 left-0 right-0 z-0">
            <div className="pt-[68px] px-4 pb-4 w-[1024px]">
            <Box classNameProp="h-[263px] h-[100000px] bg-white">
                <PersonInfo />
            </Box>
            <div className="flex justify-between mt-4">
                <Box classNameProp="w-[325.328px] h-max">
                    <PersonInfoPost />
                </Box>
                <div className="w-[650.672px] h-max">
                    <PersonPost/>
                </div>
            </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalPage;
