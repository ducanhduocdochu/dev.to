import { FC, useState } from "react";
import ReactionIcon from "@/_components/Icon/PostDetailIcon/ReactionIcon";
import CommentIcon from "@/_components/Icon/PostDetailIcon/CommentIcon";
import SaveIcon from "@/_components/Icon/PostDetailIcon/SaveIcon";
import Button from "@/_components/Button";
import ThreeDotIcon from "@/_components/Icon/PostDetailIcon/ThreeDotIcon";
import HeartIcon from "../Icon/PostDetailIcon/HeartIcon";
import UnicornIcon from "../Icon/PostDetailIcon/UnicornIcon";
import ExplodingHeadIcon from "../Icon/PostDetailIcon/ExplodingHeadIcon";
import RaiseHandIcon from "../Icon/PostDetailIcon/RaiseHandIcon";
import FireIcon from "../Icon/PostDetailIcon/FireIcon";

export type detailPostType = {
  quantityComment: number;
  quantitySave: number;
  quantityHeart: number;
  quantityUnicorn: number;
  quantityExploding: number;
  quantityRaiseHand: number;
  quantityFire: number;
};

const Reaction: FC<{detailPost:detailPostType}> = ({detailPost}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [iconColor, setIconColor] = useState("#525252");

  const handleMouseEnter = () => {
    setIconColor("#dc2626");
    setShowMenu(true);
  };

  const handleMouseLeave = () => {
    setIconColor("#525252");
    setShowMenu(false);
  };

  return (
    <div className="flex w-[64px] flex-col items-center mt-[40px]">
      <div
        className="flex flex-col items-center py-[1px] mb-[17px] relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Button
          type="secondary"
          classNameProp="w-10 h-10 items-center justify-center !p-0 hover:!bg-bg2"
          className=""
        >
          <ReactionIcon color={iconColor} />
        </Button>
        <p className="text-[14px]">
          {detailPost.quantityHeart + detailPost.quantityUnicorn + detailPost.quantityExploding + detailPost.quantityRaiseHand + detailPost.quantityFire} 
        </p>
        {showMenu && (
          <div className="absolute bg-bg1 left-9 top-0 shadow-md px-2 py-2 rounded flex w-max rounded-[30px]">
            <Button type="secondary" className="mx-2" classNameProp="flex-col items-center !p-2 h-max !rounded-[30px] hover:!bg-[#00000009]"><HeartIcon size={36}/>{detailPost.quantityHeart}</Button>
            <Button type="secondary" className="mx-2" classNameProp="flex-col items-center !p-2 h-max !rounded-[30px] hover:!bg-[#00000009]"><UnicornIcon size={36}/>{detailPost.quantityUnicorn}</Button>
            <Button type="secondary" className="mx-2" classNameProp="flex-col items-center !p-2 h-max !rounded-[30px] hover:!bg-[#00000009]"><ExplodingHeadIcon size={36}/>{detailPost.quantityExploding}</Button>
            <Button type="secondary" className="mx-2" classNameProp="flex-col items-center !p-2 h-max !rounded-[30px] hover:!bg-[#00000009]"><RaiseHandIcon size={36}/>{detailPost.quantityRaiseHand}</Button>
            <Button type="secondary" className="mx-2" classNameProp="flex-col items-center !p-2 h-max !rounded-[30px] hover:!bg-[#00000009]"><FireIcon size={36}/>{detailPost.quantityFire}</Button>
          </div>
        )}
      </div>
      <div className="flex flex-col items-center mb-[18px]">
        <Button
          type="secondary"
          classNameProp="w-10 h-10 items-center justify-center !p-0 hover:!fill-[#f59b05] hover:!bg-bg2"
          className=""
        >
          <CommentIcon />
        </Button>
        <p className="text-[14px]">{detailPost.quantityComment}</p>
      </div>
      <div className="flex flex-col items-center mb-[17px]">
        <Button
          type="secondary"
          classNameProp="w-10 h-10 items-center justify-center !p-0 hover:!fill-[#4f46e5] hover:!bg-bg2"
          className=""
        >
          <SaveIcon />
        </Button>
        <p className="text-[14px]">{detailPost.quantitySave}</p>
      </div>
      <div className="flex flex-col items-center">
        <Button
          type="secondary"
          classNameProp="w-10 h-10 items-center justify-center !p-0 hover:!bg-[#00000009] !rounded-full"
          className=""
        >
          <ThreeDotIcon />
        </Button>
      </div>
    </div>
  );
};

export default Reaction;
