import { useRouter } from "next/navigation";
import { FC } from "react";

const Footer: FC = () => {
  const router = useRouter();
  return (
    <div className="mt-10 text-[14px] text-text2">
      <p>
        <span
          onClick={() => {
            router.push("/");
            return null;
          }}
          className="inline-block font-medium text-button hover:cursor-pointer hover:underline"
        >
          DEV Community
        </span>{" "}
        A constructive and inclusive social network for software developers.
        With you every step of your journey.
      </p>
      <p className="mt-4">
        Built on{" "}
        <span
          onClick={() => {
            router.push("/forem");
            return null;
          }}
          className="inline-block text-button hover:cursor-pointer hover:underline"
        >
          Forem
        </span>{" "}
        — the{" "}
        <span
          className="inline-block text-button hover:cursor-pointer hover:underline"
          onClick={() => {
            router.push("/");
            return null;
          }}
        >
          open source
        </span>{" "}
        software that powers DEV and other inclusive communities.
      </p>
      <p className="mt-4">
        Made with love and{" "}
        <span
          onClick={() => {
            router.push("/");
            return null;
          }}
          className="inline-block text-button hover:cursor-pointer hover:underline"
        >
          Ruby on Rails
        </span>
        . DEV Community © 2016 - 2024.
      </p>
    </div>
  );
};

export default Footer;
