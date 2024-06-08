import { FC } from 'react';
import { UserType } from '@/_components/Post';
import Box from '@/_components/Box';
import Button from '../Button';
import { Session } from 'next-auth';
import { api } from '@/utils/api';
import { Tab } from '@/_components/Section/SideBarRight';
import TabBox from '@/_components/TabBox';
import Advertise from '../Advertise';

type OtherDetailPostProps = {
  data_user: UserType;
  id: string;
  session: Session | null | undefined;
};

const OtherDetailPost: FC<OtherDetailPostProps> = ({ data_user, id, session }) => {
  const {
    data: data_postByUser,
    isLoading: isLoading_postByUser,
    error: error_postByUser,
  } = api.post.getPostsPaginatedForTab.useQuery({ page: 1, pageSize: 5 });
  const {
    data: data_trending,
    isLoading: isLoading_trending,
    error,
  } = api.post.getPostsPaginatedForTab.useQuery({ page: 1, pageSize: 5 });

  const tabBoxs: Tab[] = [
    {
      id: 1,
      title: `More from ${data_user.name}`,
      sub: "",
      isLoading: isLoading_postByUser,
      posts: data_postByUser?.posts ?? [],
    },
    {
      id: 2,
      title: "Trending on DEV Community",
      sub: "",
      isLoading: isLoading_trending,
      posts: data_trending?.posts ?? [],
    },
  ];

  return (
    <div className='w-[375.594px] h-[100000px]'>
      <Box classNameProp="border-t-[32px] border-t-[#3c4454] border-t-solid relative">
        <Button
          type="secondary"
          className=""
          classNameProp="!p-0 h-[50px] absolute hover:!bg-transparent hover:no-underline hover:!text-button4 flex items-end w-full top-[-18px] left-[16px]"
        >
          <img
            src={data_user.image ?? ""}
            style={{ backgroundColor: "#dddddd;" }}
            className="mr-2 h-[48px] w-[48px] rounded-full"
            alt={data_user.name ?? "a"}
          />
          <h1 className='text-[20px] font-bold pt-[4px]'>{data_user.name}</h1>
        </Button>
        {session?.user?.id === id ? (
          <Button
            type="primary"
            classNameProp="justify-center bg-[#3b49df] hover:no-underline hover:!bg-button4 text-white"
            className="mt-[34px]"
          >
            Edit profile
          </Button>
        ) : (
          <Button
            type="primary"
            classNameProp="justify-center bg-[#3b49df] hover:no-underline hover:!bg-button4 text-white"
            className="mt-[34px]"
          >
            Follow
          </Button>
        )}
        <p className="text-text mt-4 mb-4">I&apos;m a backend developer</p>
        <div>
          <h1 className='text-[12px] font-bold text-text4'>JOINED</h1>
          <p className="text-text">Jun 6, 2024</p>
        </div>
      </Box>
      <div className='mt-[16px]'>
        {tabBoxs.map((tabBox) =>
          !tabBox.isLoading ? (
            <TabBox
              key={tabBox.id}
              title={tabBox.title}
              sub={tabBox.sub}
              posts={tabBox.posts}
            />
          ) : (
            <div key={tabBox.id}>Loading...</div>
          )
        )}
      </div>

      <Box classNameProp="">
        <Advertise />
      </Box>
    </div>
  );
};

export default OtherDetailPost;
