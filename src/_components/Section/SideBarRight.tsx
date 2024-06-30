import { FC } from "react";
import Box from "@/_components/Box";
import TabBox from "@/_components/TabBox";
import Tab from "@/_components/Tab";
import { api } from "@/utils/api";
import { PostType } from "@/typeProp";
import SkeletonList from "../SkeletonList";

export type Tab = {
  id: number;
  title: string;
  sub: string;
  isLoading: boolean;
  posts: PostType[];
};

const SideBarRight: FC = () => {
  const {
    data: data_discuss,
    isLoading: isLoading_discuss,
    error: error_discuss,
  } = api.post.getPostsPaginatedForTab.useQuery({ page: 1, pageSize: 5 });
  const {
    data: data_watercooler,
    isLoading: isLoading_watercooler,
    error: error_watercooler,
  } = api.post.getPostsPaginatedForTab.useQuery({ page: 2, pageSize: 5 });
  const {
    data: data_trending,
    isLoading: isLoading_trending,
    error: error_trending,
  } = api.post.getPostsPaginatedForTab.useQuery({ page: 2, pageSize: 20 });
  const {
    data: data_recently,
    isLoading: isLoading_recently,
    error: error_recently,
  } = api.post.getPostsPaginatedForTab.useQuery({ page: 1, pageSize: 20 });

  const tabBoxs: Tab[] = [
    {
      id: 1,
      title: "#discuss",
      sub: "Discussion threads targeting the whole community",
      isLoading: isLoading_discuss,
      posts: data_discuss ? data_discuss.posts : [],
    },
    {
      id: 2,
      title: "#watercooler",
      sub: "Light, and off-topic conversation.",
      isLoading: isLoading_watercooler,
      posts: data_watercooler ? data_watercooler.posts : [],
    },
  ];

  const tabs: Tab[] = [
    {
      id: 1,
      title: "trending guides/resources",
      sub: "trending guides/resources",
      isLoading: isLoading_trending,
      posts: data_trending ? data_trending.posts : [],
    },
    {
      id: 2,
      title: "recently queried",
      sub: "recently queried",
      isLoading: isLoading_recently,
      posts: data_recently ? data_recently.posts : [],
    },
  ];

  return (
    <div className="w-[358.667px]">
      {tabBoxs.map((tabBox) => (
        <div key={tabBox.id}>
          {!tabBox.isLoading ? (
            <TabBox
              title={tabBox.title}
              sub={tabBox.sub}
              posts={tabBox.posts}
            />
          ) : (
            <SkeletonList x={1} width="w-[300px]" height="h-3" />
          )}
        </div>
      ))}
      {tabs.map((tab) => (
        <div key={tab.id}>
          {!tab.isLoading ? (
            <Tab
              title={tab.title}
              sub={tab.sub}
              posts={tab.posts}
            />
          ) : (
            <SkeletonList x={1} width="w-[300px]" height="h-3" />
          )}
        </div>
      ))}
    </div>
  );
};

export default SideBarRight;
