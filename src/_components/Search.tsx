import { FC, useState } from "react";
import Button from "./Button";
import SearchIcon from "@/_components/Icon/SearchIcon";
import SearchIcon2 from "@/_components/Icon/SearchIcon2";
import { useRouter } from "next/router";

const Search: FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleSearch = async () => {
    if (searchTerm.trim() !== "") {
      await router.push(`search?q=${searchTerm}&filters=class_name:Article`);
    }
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      await handleSearch();
    }
  };

  return (
    <div className="relative flex items-center mx-4 h-[38.778px] w-[680px] rounded-md border-[#d4d4d4] border focus-within:border-button focus-within:shadow-search">
      <input
        id="search-input"
        className="h-[24px] w-full py-[6.5px] pl-[40px] pr-[142px] placeholder-[#444444] focus:outline-none focus:border-transparent"
        type="text"
        name="q"
        placeholder="Search..."
        autoComplete="off"
        aria-label="Search term"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button
        type="button"
        aria-label="Search"
        className="c-btn c-btn--icon-alone absolute inset-px right-auto mt-0 py-0"
        onClick={handleSearch}
      >
        <div className="px-[7.5px]">
          <SearchIcon />
        </div>
      </button>
      <a
        className="flex items-center text-[13px] font-normal text-[#515151] absolute top-[3px] right-[8px] left-[540px] bottom-[8.278px] mt-2 pl-[3px]"
        href="https://www.algolia.com/developers/?utm_source=devto&amp;utm_medium=referral"
        target="_blank"
        rel="noopener noreferrer"
      >
        Powered by 
        <SearchIcon2 />
        Algolia
      </a>
    </div>
  );
};

export default Search;
