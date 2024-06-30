import React from 'react';

interface FullScreenLoaderProps {
  loading: boolean;
}

const FullScreenLoader: React.FC<FullScreenLoaderProps> = ({ loading }) => {
  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
    </div>
  );
};

export default FullScreenLoader;
