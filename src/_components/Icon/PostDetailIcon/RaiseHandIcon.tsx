import { FC } from "react";

interface Props {
  size?: number;
}

const RaiseHandIcon: FC<Props> = ({ size }) => {
  return (
    <div>
      <img
        src="https://dev.to/assets/raised-hands-74b2099fd66a39f2d7eed9305ee0f4553df0eb7b4f11b01b6b1b499973048fe5.svg"
        width={size}
        height={size}
      />
    </div>
  );
};

export default RaiseHandIcon;
