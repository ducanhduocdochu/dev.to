import { Session } from "next-auth";
import { ChangeEvent, FC, useRef, useState } from "react";
import { ButtonPostType } from "./Section/CreatePost";
import BIcon from "./Icon/PostIcon/BIcon";
import IIcon from "./Icon/PostIcon/IIcon";
import LinkIcon from "./Icon/PostIcon/LinkIcon";
import ListIcon from "./Icon/PostIcon/ListIcon";
import UnorderListIcon from "./Icon/PostIcon/UnorderListIcon";
import HeadingIcon from "./Icon/PostIcon/HeadingIcon";
import QuoteIcon from "./Icon/PostIcon/QuoteIcon";
import CodeIcon from "./Icon/PostIcon/CodeIcon";
import CodeBlockIcon from "./Icon/PostIcon/CodeBlockIcon";
import EmbedIcon from "./Icon/PostIcon/EmbedIcon";
import PictureIcon from "./Icon/PostIcon/PictureIcon";
import { api } from "@/utils/api";
import Button from "./Button";
import ThreeDotIcon from "./Icon/PostDetailIcon/ThreeDotIcon";

const CommentInput: FC<{ session: Session | null | undefined }> = ({
  session,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const contentRef = useRef(null);
  const [content, setContent] = useState<string>("");
  const [heading, setHeading] = useState<number>(0);
  const mutation = api.upload.uploadImage.useMutation();

  const handleFocus = () => {
    setIsFocused(true);
  };

  // Handle decoration text
  const handleInsertText = (increase: number, insertText: string) => {
    const textarea = contentRef.current;
    if (textarea) {
      const startPos = textarea.selectionStart;
      const endPos = textarea.selectionEnd;
      const textBefore = content.substring(0, startPos);
      const textAfter = content.substring(endPos, content.length);

      const newText = textBefore + insertText + textAfter;
      setContent(newText);

      setTimeout(() => {
        textarea.selectionStart = startPos + increase;
        textarea.selectionEnd = startPos + increase;
        textarea.focus();
      }, 0);
    }
  };

  const handleInsertHeading = (increase: number, insertText: string) => {
    const textarea = contentRef.current;
    if (textarea) {
      if (heading == 0) {
        const startPos = textarea.selectionStart;
        const endPos = textarea.selectionEnd;
        const textBefore = content.substring(0, startPos);
        const textAfter = content.substring(endPos, content.length);

        const newText = textBefore + "## " + textAfter;
        setContent(newText);
        setTimeout(() => {
          textarea.selectionStart = startPos + 3;
          textarea.selectionEnd = startPos + 3;
          textarea.focus();
        }, 0);

        setHeading((heading) => (heading + 1) % 3);
      } else if (heading == 1) {
        const startPos = textarea.selectionStart;
        const endPos = textarea.selectionEnd;
        const textBefore = content.substring(0, startPos);
        const textAfter = content.substring(endPos, content.length);

        const newText = textBefore + "### " + textAfter;
        setContent(newText);
        setTimeout(() => {
          textarea.selectionStart = startPos + 4;
          textarea.selectionEnd = startPos + 4;
          textarea.focus();
        }, 0);

        setHeading((heading) => (heading + 1) % 3);
      } else {
        const startPos = textarea.selectionStart;
        const endPos = textarea.selectionEnd;
        const textBefore = content.substring(0, startPos);
        const textAfter = content.substring(endPos, content.length);

        const newText = textBefore + "#### " + textAfter;
        setContent(newText);
        setTimeout(() => {
          textarea.selectionStart = startPos + 5;
          textarea.selectionEnd = startPos + 5;
          textarea.focus();
        }, 0);

        setHeading((heading) => (heading + 1) % 3);
      }
    }
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  // Button decoration
  const buttons: ButtonPostType[] = [
    {
      id: 1,
      icon: BIcon,
      link: "",
      onClick: () => handleInsertText(2, "****"),
    },
    {
      id: 2,
      icon: IIcon,
      link: "",
      onClick: () => handleInsertText(1, "__"),
    },
    {
      id: 3,
      icon: LinkIcon,
      link: "",
      onClick: () => handleInsertText(1, "[](url)"),
    },
    {
      id: 4,
      icon: ListIcon,
      link: "",
      onClick: () => handleInsertText(3, "1. "),
    },
    {
      id: 5,
      icon: UnorderListIcon,
      link: "",
      onClick: () => handleInsertText(1, "-"),
    },
    {
      id: 6,
      icon: HeadingIcon,
      link: "",
      onClick: () => handleInsertHeading(2, "#"),
    },
    {
      id: 7,
      icon: QuoteIcon,
      link: "",
      onClick: () => handleInsertText(2, "> "),
    },
    {
      id: 8,
      icon: CodeIcon,
      link: "",
      onClick: () => handleInsertText(1, "``"),
    },
    {
      id: 9,
      icon: CodeBlockIcon,
      link: "",
      onClick: () => handleInsertText(3, "``````"),
    },
    {
      id: 10,
      icon: EmbedIcon,
      link: "",
      onClick: () => handleInsertText(9, "{% embed  %}"),
    },
    {
      id: 11,
      icon: PictureIcon,
      link: "",
      onClick: () => handleInsertImage(2, "1"),
    },
  ];

  // Handle image content
  const [selectedImageContent, setSelectedImageContent] = useState<
    string | ArrayBuffer | null
  >(null);

  const fileInputContentRef = useRef<HTMLInputElement>(null);

  const handleRemoveImageContent = () => {
    setSelectedImageContent(null);
    if (fileInputContentRef.current) {
      fileInputContentRef.current.value = "";
    }
  };

  const handleImageChangeContent = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = reader.result?.toString().split(",")[1];
        if (base64String) {
          const fileName = file.name;
          const contentType = file.type;
          try {
            const response = await mutation.mutateAsync({
              file: base64String,
              fileName,
              contentType,
            });
            if (response) {
              const url = response.image_url;
              setContent(content + `![Image description](${url})`);
            }
          } catch (error) {
            console.error("Upload failed:", error);
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInsertImage = (increase: number, insertText: string) => {
    fileInputContentRef.current?.click();
    handleRemoveImageContent();
  };

  return (
    <div className="mt-[24px] flex">
      <img
        src={session?.user?.image ?? undefined}
        style={{ backgroundColor: "#dddddd" }}
        className="mr-2 h-[32px] w-[32px] rounded-full focus:border-transparent focus:outline-none"
        alt="User profile"
      />
      <input
        type="file"
        accept="image/*"
        ref={fileInputContentRef}
        onChange={handleImageChangeContent}
        style={{ display: "none" }}
      />
      <div className="flex w-full flex-col">
        <div className="w-full overflow-hidden overflow-hidden rounded-md border border-transparent focus-within:border focus-within:border-button focus-within:shadow-search">
          <textarea
            className={`border-t-[rgb(23, 23, 23)] border-l-[rgb(23, 23, 23)] border-r-[rgb(23, 23, 23)] w-full border-l border-r border-t p-2 focus:border-transparent focus:outline-none ${isFocused ? "h-[128px]" : ""} mb-0`}
            placeholder="Add to the discussion"
            onFocus={handleFocus}
            onChange={handleContentChange}
            ref={contentRef}
            value={content}
          />
          {isFocused && (
            <div className="border-[rgb(23, 23, 23)] flex justify-between border border bg-[#f9f9f9]">
              <div className="flex">
                {buttons.map((item) => (
                  <Button
                    onClick={item.onClick}
                    type="secondary"
                    className=""
                    classNameProp="!p-2 mr-1"
                  >
                    {" "}
                    <item.icon />{" "}
                  </Button>
                ))}
              </div>
              <div>
                <Button type="secondary" className="" classNameProp="!p-2">
                  {" "}
                  <ThreeDotIcon />{" "}
                </Button>
              </div>
            </div>
          )}
        </div>
        {isFocused && (
          <div className="mt-3 flex">
            <Button
              type="primary"
              classNameProp="justify-center bg-[#3b49df] hover:no-underline hover:!bg-button4 text-white"
              className="mr-2"
            >
              Submit
            </Button>
            <Button
              type="primary"
              classNameProp="justify-center !bg-[#d6d6d7] border-none hover:no-underline hover:!bg-[#bdbdbd] text-black hover:!text-black"
              className="mr-2"
            >
              Preview
            </Button>
          </div>
        )}
      </div>

      {/* Commment */}
    </div>
  );
};

export default CommentInput;
