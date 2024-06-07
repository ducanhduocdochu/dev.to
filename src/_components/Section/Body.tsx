import { FC } from 'react';
import Bar from '@/_components/Bar';
import PostWidgets from '@/_components/PostWidgets';
import ImpressionWidget from '@/_components/ImpressionWidget';

const Body: FC = () => {
  return (
    <div className='w-[717.33px]'>
      <Bar/>
      <ImpressionWidget/>
      <PostWidgets/>
    </div>
  );
};

export default Body;
