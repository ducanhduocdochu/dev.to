import { FC } from "react";

interface Props {
  size?: number;
}

const FireIcon: FC<Props> = ({ size }) => {
  return (
    <div>
      <img
        src="https://dev.to/assets/fire-f60e7a582391810302117f987b22a8ef04a2fe0df7e3258a5f49332df1cec71e.svg"
        width={size}
        height={size}
      />
    </div>
  );
};

export default FireIcon;
