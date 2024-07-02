import { FC, useEffect, useState } from "react";
import Button from "./Button";
import SearchIcon from "@/_components/Icon/SearchIcon";
import SearchIcon2 from "@/_components/Icon/SearchIcon2";
import { useRouter } from "next/router";
import { api } from "@/utils/api";
import Box from "./Box";
import SkeletonList from "./SkeletonList";
import { PostTypeBody, UserType } from "@/typeProp";
import UserSearch from "./UserSearch";
import PostSearch from "./PostSearch";
import PostSearchItem from "./PostSearchItem";
import useDebounce from "@/hooks/useDebounce";

const Search: FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [posts, setPosts] = useState<PostTypeBody[]>([]);
  const [users, setUsers] = useState<UserType[]>([]);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const {
    data: data_posts,
    isLoading: isLoading_posts,
    error: error_posts,
    refetch: refetch_posts
  } = api.post.searchPosts.useQuery({ page: 1, pageSize: 3, sort_direction: 'desc', keyword: debouncedSearchTerm });

  const {
    data: data_users,
    isLoading: isLoading_users,
    error: error_users,
    refetch: refetch_users
  } = api.user.searchUsers.useQuery({ page: 1, pageSize: 3, sort_direction: 'desc', keyword: debouncedSearchTerm });

  useEffect(() => {
    setUsers(data_users?.users ?? [])
    setPosts(data_posts?.posts ?? [])
  }, [data_posts, data_users]);

  const router = useRouter();

  const handleSearch = async () => {
    if (debouncedSearchTerm.trim() !== "") {
      await router.push(`search?q=${debouncedSearchTerm}&filters=class_name:Article`);
    }
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      await handleSearch();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    if (debouncedSearchTerm) {
      refetch_posts();
      refetch_users();
    }
  }, [debouncedSearchTerm, refetch_posts, refetch_users]);

  const {
    data: data_tag,
    isLoading: isLoading_tag,
    error: error_tag,
  } = api.tag.getAll.useQuery();

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
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      {debouncedSearchTerm.length > 0 ? 
      <Box classNameProp="absolute top-10 shadow-md w-[679.328px]">
        <h1 className="text-[18px] font-bold">Posts: </h1>
        {!isLoading_posts ? <>
          {posts && posts.length > 0 ? 
            <div>
              {posts.map((item: PostTypeBody) => (
                <PostSearchItem
                  key={item.id}
                  postDetail={item}
                  data_tag={data_tag ?? []}
                />
              ))}
            </div>
          : <div className="text-[20px]">Not found {':('}</div>}
        </> : <SkeletonList x={1} width="w-[619.328px]" height="h-3" />}
        <h1 className="text-[18px] font-bold">Users: </h1>
        {!isLoading_users ? <>
          {users && users.length > 0 ? 
            <div>
              {users.map((item: UserType) => (
                <UserSearch
                  key={item.id}
                  user={item}
                />
              ))}
            </div>
          : <div className="text-[20px]">Not found {':('}</div>}
        </> : <SkeletonList x={1} width="w-[619.328px]" height="h-3" />}
      </Box> : <></>}
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
