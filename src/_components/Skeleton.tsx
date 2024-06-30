import React from 'react';

interface SkeletonProps {
  width?: string;
  height?: string;
  className?: string;
  rounded?: boolean;
}

const Skeleton: React.FC<SkeletonProps> = ({ width = 'w-full', height = 'h-4', className = '', rounded = false }) => {
  const baseClasses = 'bg-gray-400 animate-bounce';
  const roundedClasses = rounded ? 'rounded-full' : 'rounded';

  return (
    <div className={`${baseClasses} ${width} ${height} ${roundedClasses} ${className}`} />
  );
};

export default Skeleton;
