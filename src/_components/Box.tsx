import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode; 
  classNameProp: string
}

const Box: React.FC<Props> = ({ children, classNameProp }) => {
  return (
    <div className={`p-4 bg-bg1 rounded-md shadow-box ${classNameProp}`}>
      {children}
    </div>
  );
};

export default Box;
