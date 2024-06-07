"use client";
import { FC, useState } from "react";
import Button from "@/_components/Button";
import Box from "@/_components/Box";

const ImpressionWidget: FC = () => {
  return (
    <Box classNameProp="!p-[20px] mb-2 overflow-hidden">
      <h3 className="text-text4 mb-2 ml-1 text-[14px] leading-[32px]">DEV Community</h3>
        <div className="flex flex-col rounded-md overflow-hidden px-10">
      <img
        src="https://res.cloudinary.com/practicaldev/image/fetch/s---UXjdvws--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_775/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/wixrm7ejmrua4su7agha.jpg"
        alt="DEV"
        width="597"
        height="314"
        loading="lazy"
        className="rounded-md mb-5"
      ></img>

      <h1 className="text-[#171717] font-bold text-[20px] leading-[25px] mb-[10px]">Need to stay up-to-date with the most relevant trends in software, such as generate AI, cloud computing, and all things frontend?</h1>
      <p className="mb-5">Look no further.</p>
      <div className="mb-5">
        <p className="inline">You can do so much more once you</p><p className="inline font-bold"> create your account</p><p className="inline">. Follow the devs and topics you care about, and keep up-to-date.</p>
      </div>
      <Button type='primary' className="" classNameProp="w-[135.94px] justify-center items-center hover:no-underline">Start now</Button>
      </div>
    </Box>
  );
};

export default ImpressionWidget;
