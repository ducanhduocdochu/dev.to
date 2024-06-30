import FullScreenLoader from "@/_components/Loading";
import Body from "@/_components/Section/Body";
import SideBarLeft from "@/_components/Section/SideBarLeft";
import SideBarRight from "@/_components/Section/SideBarRight";
import Skeleton from "@/_components/Skeleton";
import SkeletonList from "@/_components/SkeletonList";
import HomeLayout from "@/layout/HomeLayout";
import { api } from "@/utils/api";
import Head from "next/head";

const HomePage: React.FC = () => {
  return (
    <HomeLayout>
        <Body />
    </HomeLayout>
  );
};

export default HomePage;
