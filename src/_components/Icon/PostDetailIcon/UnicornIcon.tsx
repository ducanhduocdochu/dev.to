import { FC } from "react";

interface Props {
  size?: number;
}

const UnicornIcon: FC<Props> = ({ size }) => {
  return (
    <div>
      <img
        src="https://dev.to/assets/multi-unicorn-b44d6f8c23cdd00964192bedc38af3e82463978aa611b4365bd33a0f1f4f3e97.svg"
        width={size}
        height={size}
      />
    </div>
  );
};

export default UnicornIcon;
