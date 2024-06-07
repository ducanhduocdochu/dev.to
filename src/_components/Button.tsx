import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  type: string; 
  className: string; 
  classNameProp: string;
  onClick?: () => void;
}

const Button: React.FC<Props> = ({ children, type, className, classNameProp, onClick }) => {
  return (
    <div className={className} onClick={onClick}>
      {type === 'primary' ? (
        <div className={`flex text-button border-border-button border-button rounded-md py-[7px] px-[15px] leading-[24px] font-medium text-[16px] hover:underline hover:text-bg1 hover:bg-button hover:cursor-pointer ${classNameProp}`}>
          {children}
        </div>
      ) : (
        <div className={`flex h-[40px] text-button2 rounded-md py-[7px] px-[15px] leading-[24px] font-normal text-[16px] hover:underline hover:text-button hover:bg-button3 hover:cursor-pointer ${classNameProp}`}>
          {children}
        </div>
      )}
    </div>
  );
};

export default Button;
