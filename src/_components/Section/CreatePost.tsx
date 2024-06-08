import React, {
  ChangeEvent,
  ElementType,
  FC,
  useEffect,
  useRef,
  useState,
} from "react";
import Logo from "@/_components/Logo";
import Button from "@/_components/Button";
import BIcon from "@/_components/Icon/PostIcon/BIcon";
import IIcon from "@/_components/Icon/PostIcon/IIcon";
import ListIcon from "@/_components/Icon/PostIcon/ListIcon";
import LinkIcon from "@/_components/Icon/PostIcon/LinkIcon";
import UnorderListIcon from "@/_components/Icon/PostIcon/UnorderListIcon";
import HeadingIcon from "@/_components/Icon/PostIcon/HeadingIcon";
import QuoteIcon from "@/_components/Icon/PostIcon/QuoteIcon";
import CodeIcon from "@/_components/Icon/PostIcon/CodeIcon";
import CodeBlockIcon from "@/_components/Icon/PostIcon/CodeBlockIcon";
import EmbedIcon from "@/_components/Icon/PostIcon/EmbedIcon";
import PictureIcon from "@/_components/Icon/PostIcon/PictureIcon";
import ThreeDotIcon from "@/_components/Icon/PostIcon/ThreeDotIcon";
import PostDetailView from "@/_components/PostDetailView";
import Box from "../Box";
import CloseIcon from "../Icon/CloseIcon";
import { TagType } from "@/typeProp";
import { api } from "@/utils/api";
import { useRouter } from "next/router";

export type ButtonPostType = {
  id: number;
  icon: ElementType;
  link: string;
  onClick: () => void;
};

const CreatePost: FC<{ data_tags: TagType[] | undefined }> = ({
  data_tags,
}) => {
  const router = useRouter();
  const [title, setTitle] = useState<string>("");
  const [idPicture, setIdPicture] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [tags, setTags] = useState<TagType[]>([]);
  const [tip, setTip] = useState<number>(1);
  const [heading, setHeading] = useState<number>(0);
  const [isEdit, setIsEdit] = useState<boolean>(true);
  const [isOpenTag, setIsOpenTag] = useState<boolean>(false);
  const [isError, setIsError] = useState<string>("");
  const mutation = api.upload.uploadImage.useMutation();
  const mutationd = api.upload.deleteImage.useMutation();
  const mutationp = api.post.createPost.useMutation();

  const contentRef = useRef<HTMLTextAreaElement>(null);

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

  // Handle image cover
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveImage = async () => {
    try {
      const response = await mutationd.mutateAsync({ public_id: idPicture });

      if (response.message === "Image deleted successfully") {
        setSelectedImage(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
          setIdPicture("");
        }
      }
    } catch (error) {
      console.error("Failed to delete image:", error);
    }
  };

  // const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setSelectedImage(reader.result);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
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
              setIdPicture(response.public_id);
              setSelectedImage(response.image_url);
            }
          } catch (error) {
            console.error("Upload failed:", error);
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

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

  // Handle input
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };
  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTags(tags);
  };

  const handleTitleFocus = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTip(1);
  };
  const handleContentFocus = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTip(3);
  };
  const handleTagsFocus = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTip(2);
    setIsOpenTag(true);
  };
  // const handleTagsBlur = (e: any) => {
  //   if (e.relatedTarget) return;
  //   // setIsOpenTag(false)
  // };

  // handle tag
  const handleAddTag = (tag: TagType) => {
    if (tags.includes(tag)) {
      return;
    } else {
      setTags((prev) => [...prev, tag]);
    }
  };

  const handleRemoveTag = (tag: TagType) => {
    setTags((prev) => prev.filter((item) => item != tag));
  };

  // handle submit
  const handleSubmit = async () => {
    if (title == "") {
      setIsError("title: can't be blank");
    } else if (content == "") {
      setIsError("content: can't be blank");
    } else {
      const response = await mutationp.mutateAsync({
        title,
        content,
        tags,
        picturePost: selectedImage,
      });
      if (!response) {
        setIsError("post: can't be create");
      }
      setIsError("");
      router.push(`${response?.createdById}/${response?.id}`).then(() => {
        // Xử lý khi chuyển hướng thành công nếu cần
      }).catch((error) => {
        console.error("Error while navigating:", error);
      });
    }
  };

  return (
    <div className="flex">
      <div>
        <div className="flex h-header-h w-[956.391px] justify-center">
          {/* Header */}
          <div className="flex w-header-w justify-between">
            <div className="flex items-center">
              <Logo width="50" height="40" />
              <h1 className="ml-[15px] font-medium">Create Post</h1>
            </div>
            <div className="flex items-center">
              <Button
                type="secondary"
                className="mr-[10px] mt-[10px]"
                classNameProp="!text-[#171717] font-semibold !p-2 hover:no-underline"
                onClick={() => setIsEdit(true)}
              >
                Edit
              </Button>
              <Button
                type="secondary"
                className="mr-[6px] mt-[10px]"
                classNameProp="!p-2 hover:no-underline"
                onClick={() => setIsEdit(false)}
              >
                Preview
              </Button>
            </div>
          </div>
        </div>

        {isEdit ? (
          // Create
          <>
            <div className="ml-[80px] h-[784px] w-[876.391px] overflow-hidden rounded-md bg-bg1 shadow-create-post">
              {isError.length > 0 && (
                <div className="mb-6 bg-bg-error p-4">
                  <h1 className="mb-2 text-[18px] font-bold text-[#b91c1c]">
                    Whoops, something went wrong:
                  </h1>
                  <p>{isError}</p>
                </div>
              )}
              <div className="px-16 py-8">
                {!selectedImage && (
                  <button
                    onClick={handleButtonClick}
                    className="mb-[14px] rounded-md border-2 border-[#d6d6d7] bg-bg1 px-[14px] py-[6px] font-semibold text-[#3d3d3d]"
                  >
                    Add a cover image
                  </button>
                )}
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputContentRef}
                  onChange={handleImageChangeContent}
                  style={{ display: "none" }}
                />
                {selectedImage && (
                  <div className="mb-3 flex">
                    <div className="mr-4 flex w-[250px] justify-center">
                      <img
                        src={selectedImage}
                        alt="Selected"
                        className="h-[105px]"
                      />
                    </div>
                    <div className="flex items-center">
                      <button
                        onClick={handleButtonClick}
                        className="h-[40px] rounded-md border-2 border-[#d6d6d7] bg-bg1 px-[14px] py-[6px] font-semibold text-[#3d3d3d]"
                      >
                        Change
                      </button>
                      <button
                        onClick={handleRemoveImage}
                        className="ml-[2px] h-[40px] bg-bg1 px-[14px] py-[6px] font-semibold text-[#dc2626]"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                )}

                <input
                  className="placeholder-bold mb-2 w-full rounded-md border border-0 border-gray-300 text-[48px] font-bold placeholder-text4 focus:outline-none"
                  type="text"
                  placeholder="New post title here..."
                  value={title}
                  onChange={handleTitleChange}
                  onFocus={handleTitleFocus}
                />

                {/* Tag List */}
                {tags.length > 0 ? (
                  <div className="flex">
                    <div className="flex">
                      {tags.map((tag) => (
                        <div
                          key={tag.name}
                          className="mr-2 flex items-center rounded-md bg-bg2 px-2"
                        >
                          #{tag.name}
                          <Button
                            type="secondary"
                            className=""
                            classNameProp="!p-0 h-max"
                            onClick={() => handleRemoveTag(tag)}
                          >
                            <CloseIcon />
                          </Button>{" "}
                        </div>
                      ))}
                    </div>
                    <input
                      className="mb-0 ml-3 ml-[2px] mt-[3px] w-full rounded-md border border-0 border-gray-300 focus:outline-none"
                      type="text"
                      placeholder="Add another"
                    />
                  </div>
                ) : (
                  <input
                    className="mb-0 ml-[2px] mt-[3px] w-full rounded-md border border-0 border-gray-300 focus:outline-none"
                    type="text"
                    placeholder="Add up to 4 tags..."
                    value={""}
                    onChange={handleTagsChange}
                    onFocus={handleTagsFocus}
                  />
                )}

                {isOpenTag && (
                  <div id="none-blur">
                    <Box classNameProp="h-[200px] overflow-y-scroll">
                      <h1 className="border-b-[1px] border-b-[#888888] py-2 font-semibold">
                        Top Tags
                      </h1>
                      {data_tags?.map((tag) => {
                        return (
                          <Button
                            key={tag.name}
                            onClick={() => handleAddTag(tag)}
                            type="secondary"
                            className="my-1"
                            classNameProp="!px-0"
                          >
                            #{tag.name}
                          </Button>
                        );
                      })}
                    </Box>
                  </div>
                )}
              </div>

              <div className="mb-[18px] flex justify-between bg-[#f9f9f9] py-2 pl-14 pr-16">
                <div className="flex">
                  {buttons.map((item) => (
                    <Button
                      key={item.id}
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

              <textarea
                className="placeholder-font placeholder-20 placeholder-normal mb-4 h-[489px] w-full rounded-md border border-0 border-gray-300 p-2 px-16 text-[18px] placeholder-[#666666] focus:outline-none"
                placeholder="Write your post content here..."
                value={content}
                ref={contentRef}
                onChange={handleContentChange}
                onFocus={handleContentFocus}
              />
            </div>
            <Button
              type="primary"
              className="ml-[80px]"
              classNameProp="bg-button p-2 text-white w-[84px] hover:no-underline mt-[24px] hover:bg-[#2f3ab2]"
              onClick={handleSubmit}
            >
              Publish
            </Button>
          </>
        ) : (
          // View
          <>
            <div className="ml-[80px] h-[784px] w-[876.391px] overflow-scroll rounded-md bg-bg1 shadow-create-post">
              {/* ---------- */}
              {selectedImage && (
                <div className="mb-8">
                  <img
                    src={selectedImage}
                    alt="Selected"
                    className="w-[876.391px]"
                  />
                </div>
              )}

              {title && (
                <h1 className="mb-2 px-16 text-[48px] font-[900]">{title}</h1>
              )}
              {tags.length > 0 && (
                <div className="flex px-16">
                  {tags.map((item) => (
                    <div key={item.name} className="px-2 py-1">
                      #{item.name}
                    </div>
                  ))}
                </div>
              )}
              <div className="px-16 py-8 text-[20px] text-[#171717]">
                <PostDetailView content={content} />
              </div>
            </div>
            <Button
              type="primary"
              className="ml-[80px]"
              classNameProp="bg-button p-2 text-white w-[84px] hover:no-underline mt-[24px] hover:bg-[#2f3ab2]"
              onClick={handleSubmit}
            >
              Publish
            </Button>
          </>
        )}
      </div>
      {/* Tip */}
      <div className="mx-4 w-[375.594px]">
        {isEdit && (
          <>
            {tip == 1 && <WritingTips />}
            {tip == 2 && <TaggingGuidelines />}
            {tip == 3 && <EditorBasics />}
          </>
        )}
      </div>
    </div>
  );
};

export default CreatePost;

const WritingTips: React.FC = () => {
  return (
    <div className="mt-[148px] rounded-md bg-gray-100">
      <h2 className="mb-2 text-lg font-bold">Writing a Great Post Title</h2>
      <ul className="ml-6 list-inside list-outside list-disc space-y-2 text-text">
        <li>
          Think of your post title as a super short (but compelling!)
          description — like an overview of the actual post in one short
          sentence.
        </li>
        <li>
          Use keywords where appropriate to help ensure people can find your
          post by search.
        </li>
      </ul>
    </div>
  );
};

const TaggingGuidelines: React.FC = () => {
  return (
    <div className="bg-gray-10 mt-[224px] rounded-lg">
      <h2 className="mb-2 text-[18px] font-bold">Tagging Guidelines</h2>
      <ul className="ml-6 list-inside list-outside list-disc space-y-2 text-text">
        <li>
          Tags help people find your post - think of them as the topics or
          categories that best describe your post.
        </li>
        <li>
          Add up to four comma-separated tags per post. Use existing tags
          whenever possible.
        </li>
        <li>
          Some tags have special posting guidelines - double check to make sure
          your post complies with them.
        </li>
      </ul>
    </div>
  );
};

const EditorBasics: React.FC = () => {
  return (
    <div className="mt-[348px] rounded-lg bg-gray-100">
      <h2 className="mb-2 text-[18px] font-bold">Editor Basics</h2>
      <ul className="ml-6 list-outside list-disc text-text">
        <li className="mb-2">
          Use{" "}
          <a href="#" className="text-blue-500 no-underline">
            Markdown
          </a>{" "}
          to write and format posts.
          <details className="">
            <summary className="cursor-pointer text-[14px] no-underline">
              Commonly used syntax
            </summary>
          </details>
        </li>
        <li className="mb-2">
          Embed rich content such as Tweets, YouTube videos, etc. Use the
          complete URL:
          <code className="rounded bg-gray-300 p-1 text-[12px] text-gray-700">
            {""}
            {"{% embed https://... %}"}
          </code>
          .
          <a href="#" className="ml-1 text-blue-500 no-underline">
            See a list of supported embeds
          </a>
          .
        </li>
        <li>
          {"In addition to images for the post's content, you can also drag and drop a cover image."}
        </li>
      </ul>
    </div>
  );
};
