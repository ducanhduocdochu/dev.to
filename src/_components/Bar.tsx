"use client";
import { FC, useEffect, useState } from "react";
import Button from "@/_components/Button";
import { useRouter } from "next/router";

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

const initialList: BarProps[] = [
  {
    id: 1,
    title: "Relevant",
    link: "/",
    elements: [],
    isChoose: false,
  },
  {
    id: 2,
    title: "Latest",
    link: "/latest",
    elements: [],
    isChoose: false,
  },
  {
    id: 3,
    title: "Top",
    link: "/top/week",
    elements: [
      {
        id: 5,
        title: "Week",
        link: "/top/week",
        isChoose: true,
      },
      {
        id: 6,
        title: "Month",
        link: "/top/month",
        isChoose: false,
      },
      {
        id: 7,
        title: "Year",
        link: "/top/year",
        isChoose: false,
      },
      {
        id: 8,
        title: "Infinity",
        link: "/top/infinity",
        isChoose: false,
      },
    ],
    isChoose: true,
  },
];

const handleSetItem = async (
  link: string,
  id: number,
  elementId: number | undefined,
  items: BarProps[],
  setItems: React.Dispatch<React.SetStateAction<BarProps[]>>,
  router: ReturnType<typeof useRouter>
) => {
  try {
    await router.push(link);
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            isChoose: true,
            elements: item.elements.map((element) => {
              if (element.id === elementId) {
                return { ...element, isChoose: true };
              } else {
                return { ...element, isChoose: false };
              }
            }),
          };
        } else {
          return { ...item, isChoose: false };
        }
      })
    );
  } catch (error) {
    console.error('Navigation error:', error);
  }
};

const Bar: FC = () => {
  const router = useRouter();
  const [items, setItems] = useState<BarProps[]>(initialList);

  useEffect(() => {
    const currentPath = router.pathname;
    setItems((prev) =>
      prev.map((item) => {
        if (item.link === currentPath) {
          return { ...item, isChoose: true };
        } else if (item.elements.some((element) => element.link === currentPath)) {
          return {
            ...item,
            isChoose: true,
            elements: item.elements.map((element) =>
              element.link === currentPath
                ? { ...element, isChoose: true }
                : { ...element, isChoose: false }
            ),
          };
        } else {
          return { ...item, isChoose: false };
        }
      })
    );
  }, [router.pathname]);

  return (
    <div className="mb-[11px] flex justify-between">
      <div className="flex">
        {items.map((item) => (
          <Button
            type="secondary"
            key={item.id}
            className="w-max text-[text]"
            classNameProp={`hover:no-underline hover:bg-[#ffffff] text-[18px] leading-[27px] !px-3 !py-2 ${item.isChoose ? "!font-bold !text-black" : "font-normal !text-[#878787]"}`}
            onClick={() => handleSetItem(item.link, item.id, undefined, items, setItems, router)}
          >
            {item.title}
          </Button>
        ))}
      </div>

      <div className="flex">
        {items.map((item) => {
          if (item.isChoose && item.elements.length !== 0) {
            return item.elements.map((element) => (
              <Button
                type="secondary"
                key={element.id}
                className="w-max text-[text]"
                classNameProp={`hover:no-underline hover:bg-[#ffffff] text-[16px] leading-[27px] !px-3 !py-2 ${element.isChoose ? "!font-bold !text-black" : "font-normal !text-[#878787]"}`}
                onClick={() => handleSetItem(element.link, item.id, element.id, items, setItems, router)}
              >
                {element.title}
              </Button>
            ));
          } else return <></>;
        })}
      </div>
    </div>
  );
};

export default Bar;
