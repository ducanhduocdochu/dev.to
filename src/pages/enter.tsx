"use client";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Logo from "@/_components/Logo";
import AuthLayout from "@/layout/AuthLayout";
import { useSearchParams } from "next/navigation";
import { ElementType } from "react";
import GoogleIcon from "@/_components/Icon/AuthIcon/Google";
import Button from "@/_components/Button";
import Head from "next/head";
import AppleIcon from "@/_components/Icon/AuthIcon/Apple";
import FacebookIcon from "@/_components/Icon/FacebookIcon";
import ForemIcon from "@/_components/Icon/AuthIcon/Forem";
import GithubIcon from "@/_components/Icon/AuthIcon/Github";
import TwitterIcon from "@/_components/Icon/AuthIcon/Twitter";
import EmailIcon from "@/_components/Icon/AuthIcon/Email";

type AuthButtonType = {
  id: number;
  title: string;
  icon: ElementType;
};

export default function EnterPage() {
  const searchParams = useSearchParams();
  const state = searchParams.get("state");
  const router = useRouter();

  const { data: session, status } = useSession();

  if (session) {
    router.push("/?signin=true");
    return null; 
  }

  const authButton: AuthButtonType[] = [
    {
      id: 1,
      title: "with Apple",
      icon: AppleIcon,
    },
    {
      id: 2,
      title: "with Facebook",
      icon: FacebookIcon,
    },
    {
      id: 3,
      title: "with Forem",
      icon: ForemIcon,
    },
    {
      id: 4,
      title: "with GitHub",
      icon: GithubIcon,
    },
    {
      id: 5,
      title: "with Google",
      icon: GoogleIcon,
    },
    {
      id: 6,
      title: "with Twitter (X)",
      icon: TwitterIcon,
    },
    {
      id: 7,
      title: "with Email",
      icon: EmailIcon,
    },
  ];

  return (
    <AuthLayout>
      <Head>
        <title>Welcome! DEV Community</title>
      </Head>
      <div className="flex flex-col items-center p-12 pt-6">
        <div className="">
          <Logo width="60" height="48" />
        </div>
        <h1 className="mt-[18px] text-[30px] font-bold text-[#171717]">
          Join the DEV Community
        </h1>
        <p className="mb-[24px] mt-[1px] text-[#404040]">
          DEV Community is a community of 1,538,057 amazing developers
        </p>
        <div className="pb-4">
          {authButton.map((item) => (
            <Button
              key={item.id}
              type="secondary"
              className=""
              classNameProp="w-[544px] h-[50px] !p-3 mb-3 !text-[14px] !font-medium !text-[#171717] !border-[rgb(212, 212, 212)] !border hover:no-underline hover:!bg-[rgb(245,245,245)]"
              onClick={() => void signIn(item.title.toLowerCase())}
            >
              <item.icon />
              <p className="flex w-[495px] justify-center">
                {state === "new-user" ? "Sign up" : "Continue"} {item.title}
              </p>
            </Button>
          ))}
        </div>
        <div className="w-[544px] px-[64px] text-center text-[14px] italic text-text2">
          By signing up, you are agreeing to our
          <a onClick={() => {
            router.push("/privacy")
            return null

            }} className="inline cursor-pointer text-[#3b49df]"> privacy policy</a>,{" "}
          <a onClick={() => {router.push("/terms");return null}} className="inline cursor-pointer text-[#3b49df]">terms of use</a> and{" "}
          <a onClick={() => {router.push("/code-of-conduct");return null}} className="inline cursor-pointer text-[#3b49df]">code of conduct</a>.
        </div>
        {state === "new-user" ? (
          <div className="mt-12 text-center">
            Already have an account?{" "}
            <a onClick={() => {router.push("/enter");return null}} className="cursor-pointer text-[#3b49df]">
              Log in
            </a>.
          </div>
        ) : (
          <div className="mt-12 text-center">
            New to DEV Community?{" "}
            <a onClick={() => {router.push("/enter?state=new-user");return null}} className="cursor-pointer text-[#3b49df]">
              Create account
            </a>.
          </div>
        )}
      </div>
    </AuthLayout>
  );
}
