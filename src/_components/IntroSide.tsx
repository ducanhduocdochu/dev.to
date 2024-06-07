// pages/about.tsx

import { FC } from "react";
import Button from "./Button";
import { useRouter } from "next/router";

const IntroSide: FC = () => {
  const router = useRouter()
  return (
    <div>
      <h1 className="text-[20px] font-bold text-[rgb(36, 36, 36)] leading-[25px] pb-4">DEV Community is a community of 1,485,153 amazing developers</h1>
      <p className="pb-4 text-[#575757]">We're a place where coders share, stay up-to-date and grow their careers.</p>
      <Button onClick={() => {
              router.push("/enter?state=new-user")
              return null
            }} type='primary' className="mb-1" classNameProp="w-[208px] justify-center items-center">Create account</Button>
      <Button onClick={() => {
              router.push("/enter")
              return null
            }}  type='secondary' className="" classNameProp="w-[208px] justify-center items-center">Log in</Button>
    </div>
  );
};

export default IntroSide;
