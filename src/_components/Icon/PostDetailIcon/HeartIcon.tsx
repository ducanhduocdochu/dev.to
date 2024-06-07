import { FC } from "react";

interface Props {
  size?: number;
}

const HeartIcon: FC<Props> = ({ size }) => {
  return (
    <div>
      <img
        src="https://dev.to/assets/sparkle-heart-5f9bee3767e18deb1bb725290cb151c25234768a0e9a2bd39370c382d02920cf.svg"
        width={size}
        height={size}
      />
    </div>
  );
};

export default HeartIcon;
