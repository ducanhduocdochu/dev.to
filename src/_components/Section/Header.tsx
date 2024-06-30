// pages/about.tsx

import { FC } from "react";
import Logo from "@/_components/Logo";
import Search from "@/_components/Search";
import RightHeader from "@/_components/RightHeader";
import { useSession } from "next-auth/react";

const Header: FC = () => {
  return (
    <div className="z-50 fixed left-0 right-0 top-0 flex h-header-h justify-center bg-bg1 shadow-custom">
      <div className="flex w-header-w items-center justify-between">
        <div className="flex items-center"> 
          <Logo width="50" height="40"/>
          <Search />
        </div>
        <RightHeader />
      </div>
    </div>
  );
};

export default Header;
