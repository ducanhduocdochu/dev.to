import { FC, useState } from "react";
import { rgbToRgba } from "@/utils/rgbToRgba ";
import { TagType } from "@/typeProp";

const Tag: FC<{ tag: TagType | undefined }> = ({ tag }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("white");
  const [boxShadow, setBoxShadow] = useState("");

  const handleMouseEnter = (color: string) => {
    setBackgroundColor(rgbToRgba(color, 0.1));
    setBoxShadow(`inset 0 0 0 1px ${rgbToRgba(color, 0.1)}, 
    inset 0 0 0 1px ${rgbToRgba(color, 0.1)}, 
    inset 0 0 0 1px ${rgbToRgba(color, 0.1)}`);
    setIsHovered(true);
  };

  const handleMouseLeave = (color: string) => {
    setBackgroundColor("white");
    setBoxShadow("");
    setIsHovered(true);
  };
  return (
    <div
      className="hover:text- flex items-center rounded-md !py-1 px-[7px] hover:no-underline"
      style={{
        backgroundColor,
        boxShadow,
      }}
      onMouseEnter={() => handleMouseEnter(tag?.color || "")}
      onMouseLeave={() => handleMouseLeave(tag?.color || "")}
    >
      <div style={{ color: tag?.color }}>#</div>
      {tag?.name}
    </div>
  );
};

export default Tag;
