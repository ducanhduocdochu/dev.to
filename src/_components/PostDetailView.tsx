import { FC } from "react";

interface PostDetailViewProps {
  content: string;
}

const PostDetailView: FC<PostDetailViewProps> = ({ content }) => {
  const replaceText = (input: string): string => {
    const links: string[] = [];

    const contentWithPlaceholders = input.replace(
      /!\[(.*?)\]\((https:\/\/res\.cloudinary\.com\/.*)\)/g,
      (match, alt, url) => {
        links.push(
          `<div class="flex justify-center"><img class="my-4" alt="${alt}" src="${url}" /></div>`
        );
        return `LINKPLACEHOLDER${links.length - 1}`;
      }
    );

    const replacedText = contentWithPlaceholders
      .replace(/^#### (.*)$/gm, '<h4 class="text-[20px] my-[10px] font-bold">$1</h4>')
      .replace(/^### (.*)$/gm, '<h3 class="text-[25px] my-[10px] font-bold">$1</h3>')
      .replace(/^## (.*)$/gm, '<h2 class="text-[30px] my-[10px] font-bold">$1</h2>')
      .replace(
        /^> (.*)$/gm,
        '<blockquote class="border-l-4 border-solid border-[rgb(229, 231, 235)] pl-5">$1</blockquote>'
      )
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/_(.*?)_/g, "<em>$1</em>")
      .replace(/_(.```?)_/g, "<div class='bg-black text-white'>$1<div>")
      .replace(/\n/g, "<br />");

    const finalText = replacedText.replace(/LINKPLACEHOLDER(\d+)/g, (match, index) => {
      const linkIndex = Number(index);
      return links[linkIndex] ?? match;
    });

    return finalText;
  };

  const replacedContent: string = replaceText(content);

  return <div dangerouslySetInnerHTML={{ __html: replacedContent }} />;
};

export default PostDetailView;
