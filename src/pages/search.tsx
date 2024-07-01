"use client";

import Button from "@/_components/Button";
import PostWidgetsSearch from "@/_components/PostWidgetsSearch";
import Header from "@/_components/Section/Header";
import UserWidgetsSearch from "@/_components/UserWidgetsSearch";
import Head from "next/head";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

type Element = {
  id: number;
  title: string;
  link: string;
  isChoose: boolean;
};

interface BarProps {
  id: number;
  title: string;
  link: string;
  elements: Element[];
  isChoose: boolean;
}

type SortDirection = 'asc' | 'desc';

const validateSortDirection = (sortDirection: string): SortDirection => {
  return sortDirection === 'asc' || sortDirection === 'desc' ? sortDirection : 'asc';
};

const updateLink = (
  link: string,
  filterType: string,
  _query: string
) => {
  return link.replace(/class_name:\w+/, `class_name:${filterType}`);
};

const handleSetItem = async (
  link: string,
  id: number,
  items: BarProps[],
  setItems: React.Dispatch<React.SetStateAction<BarProps[]>>,
  router: ReturnType<typeof useRouter>,
) => {
  try {
    await router.push(link);
    setItems((prev) =>
      prev.map((item) => ({
        ...item,
        isChoose: item.id === id,
      }))
    );
  } catch (error) {
    console.error("Navigation error:", error);
  }
};

export default function SearchPage() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") ?? "";
  const filters = searchParams.get("filters") ?? "";
  const sort_by = searchParams.get("sort_by") ?? "";
  const sort_direction = validateSortDirection(searchParams.get("sort_direction") ?? "");

  const router = useRouter();

  const initialSortOptions: BarProps[] = [
    {
      id: 1,
      title: "Most Relevant",
      link: `/search?q=${q}&filters=class_name:Article`,
      elements: [],
      isChoose: true,
    },
    {
      id: 2,
      title: "Newest",
      link: `/search?q=${q}&filters=class_name:Article&sort_by=published_at&sort_direction=desc`,
      elements: [],
      isChoose: false,
    },
    {
      id: 3,
      title: "Oldest",
      link: `/search?q=${q}&filters=class_name:Article&sort_by=published_at&sort_direction=asc`,
      elements: [],
      isChoose: false,
    },
  ];

  const initialFilterOptions: BarProps[] = [
    {
      id: 4,
      title: "Posts",
      link: `/search?q=${q}&filters=class_name:Article`,
      elements: [],
      isChoose: true,
    },
    {
      id: 5,
      title: "People",
      link: `/search?q=${q}&filters=class_name:User`,
      elements: [],
      isChoose: false,
    },
  ];

  const [sortOptions, setSortOptions] = useState<BarProps[]>(initialSortOptions);
  const [filterOptions, setFilterOptions] = useState<BarProps[]>(initialFilterOptions);
  const [currentFilter, setCurrentFilter] = useState("Article");

  useEffect(() => {
    // Update the sort options' links based on the current filter
    setSortOptions((prevSortOptions) =>
      prevSortOptions.map((sortOption) => ({
        ...sortOption,
        link: updateLink(sortOption.link, currentFilter, q),
      }))
    );
  }, [currentFilter, q]);

  const handleSortClick = async (item: BarProps) => {
    await handleSetItem(item.link, item.id, sortOptions, setSortOptions, router);
  };

  const handleFilterClick = async (item: BarProps) => {
    setCurrentFilter(item.title === "Posts" ? "Article" : "User");
    await handleSetItem(item.link, item.id, filterOptions, setFilterOptions, router);
  };

  return (
    <div className="flex justify-center bg-bg2 pt-header-h">
      <Head>
        <title>Search Results for {q} - DEV Community</title>
      </Head>
      <Header />
      <div className="h-[10000px] w-[1024px] p-4">
        <div className="flex justify-between">
          <h1 className="text-[30px] font-bold">Search results for {q}</h1>
          <div className="flex">
            {sortOptions.map((item) => (
              <Button
                type="secondary"
                key={item.id}
                className="w-max text-[text]"
                classNameProp={`hover:no-underline hover:!bg-[#ffffff] text-[16px] leading-[27px] !px-3 !py-2 ${item.isChoose ? "!font-bold !text-black" : "font-normal !text-[#878787]"}`}
                onClick={() => handleSortClick(item)}
              >
                {item.title}
              </Button>
            ))}
          </div>
        </div>
        <div className="flex justify-between">
          <div className="w-[240px] mt-[10px]">
            {filterOptions.map((item) => (
              <Button
                type="secondary"
                key={item.id}
                className="w-full text-[text]"
                classNameProp={`hover:no-underline hover:!bg-[#ffffff] text-[16px] leading-[27px] !px-2 !py-2 ${item.isChoose ? "!font-bold !text-black bg-[#ffffff]" : "font-normal !text-[#878787]"}`}
                onClick={() => handleFilterClick(item)}
              >
                {item.title}
              </Button>
            ))}
          </div>

          <div className="w-[736px]">
            {filters == 'class_name:Article' ? <PostWidgetsSearch q={q} filters={filters} sort_by={sort_by} sort_direction={sort_direction} /> : <UserWidgetsSearch q={q} filters={filters} sort_by={sort_by} sort_direction={sort_direction} />}
          </div>
        </div>
      </div>
    </div>
  );
}
