import Body from "@/_components/Section/Body";
import SideBarLeft from "@/_components/Section/SideBarLeft";
import SideBarRight from "@/_components/Section/SideBarRight";
import HomeLayout from "@/layout/HomeLayout";
import { api } from "@/utils/api";
import Head from "next/head";

const MonthPage: React.FC = () => {
  return (
    <HomeLayout>
        <Body />
    </HomeLayout>
  );
};

export default MonthPage;
