// pages/about.tsx

import { FC } from "react";
import Box from "@/_components/Box";
import IntroSide from "@/_components/IntroSide";
import MenuSideBarLeft from "@/_components/MenuSideBarLeft";
import MenuOtherSideBarLeft from "@/_components/MenuOtherSideBarLeft";
import MenuTag from "@/_components/MenuTag";
import Advertise from "@/_components/Advertise";
import Footer from "@/_components/Footer";
import { authOptions } from "@/server/auth";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";

const SideBarLeft: FC = () => {
  const { data: session, status } = useSession();


  return (
    <div className="w-[240px]">
      {!session && (
        <Box classNameProp="mb-4">
          <IntroSide />
        </Box>
      )}
      <MenuSideBarLeft />
      <MenuOtherSideBarLeft />
      <MenuTag />
      <Box classNameProp="">
        <Advertise />
      </Box>
      <Footer />
    </div>
  );
};

export default SideBarLeft;
