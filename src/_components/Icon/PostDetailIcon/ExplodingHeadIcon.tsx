import { FC } from "react";

interface Props {
  size?: number;
}

const ExplodingHeadIcon: FC<Props> = ({ size }) => {
  return (
    <div>
      <img
        src="https://dev.to/assets/exploding-head-daceb38d627e6ae9b730f36a1e390fca556a4289d5a41abb2c35068ad3e2c4b5.svg"
        width={size}
        height={size}
      />
    </div>
  );
};

export default ExplodingHeadIcon;
