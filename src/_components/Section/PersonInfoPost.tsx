import { FC } from 'react';
import Bar from '@/_components/Bar';
import PostWidgets from '@/_components/PostWidgets';
import ImpressionWidget from '@/_components/ImpressionWidget';
import { api } from '@/utils/api';
import { useRouter } from 'next/router';
import PostIcon from '../Icon/PersonalIcon/PostIcon';
import CommentIcon from '../Icon/PersonalIcon/CommentIcon';
import TagIcon from '../Icon/PersonalIcon/TagIcon';

const PersonInfoPost: FC = () => {
  const router = useRouter();
  const { user_id } = router.query;
  const userId = String(user_id);

  return (
    <div>
      <div className='flex mb-4'><PostIcon /> <p className='text-[16px] text-[#404040]'>1 post published</p></div>
      <div className='flex mb-4'><CommentIcon /> <p className='text-[16px] text-[#404040]'>1 comment written</p></div>
      <div className='flex'><TagIcon /> <p className='text-[16px] text-[#404040]'>0 tags followed</p></div>
    </div>
  );
};

export default PersonInfoPost;
