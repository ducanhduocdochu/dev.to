// src/components/SkeletonList.tsx
import React from 'react';
import Skeleton from './Skeleton';

interface SkeletonProps {
  width?: string;
  height?: string;
  className?: string;
  rounded?: boolean;
}

interface SkeletonListProps extends SkeletonProps {
  x?: number;
}

const SkeletonList: React.FC<SkeletonListProps> = ({
  width = 'w-full',
  height = 'h-4',
  className = '',
  rounded = false,
  x = 5,
}) => {
  const skeletons = Array.from({ length: x }, (_, index) => (
    <div key={index} className=''>
      <Skeleton width={width} height={height} rounded={rounded} className={"my-2"} />
      <Skeleton width={width} height={height} rounded={rounded} className={"my-2"} />
      <Skeleton width={width} height={height} rounded={rounded} className={"my-2"} />
      <Skeleton width={width} height={height} rounded={rounded} className={"my-2"} />
      <Skeleton width={width} height={height} rounded={rounded} className={"my-2"} />
      <Skeleton width={width} height={height} rounded={rounded} className={"my-2"} />
      <Skeleton width={width} height={height} rounded={rounded} className={"my-2"} />
    </div>
  ));

  return <div className="p-4 space-y-4">{skeletons}</div>;
};

export default SkeletonList;
