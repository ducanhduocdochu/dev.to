// pages/about.tsx

import { FC, useReducer } from "react";
import Button from "@/_components/Button";
import CodeOfConductIcon from "@/_components/Icon/CodeOfConductIcon";
import PrivacyPolicyIcon from "@/_components/Icon/PrivacyPolicyIcon";
import TermOfUseIcon from "@/_components/Icon/TermOfUseIcon";
import XIcon from "@/_components/Icon/XIcon";
import FacebookIcon from "@/_components/Icon/FacebookIcon";
import DiscordIcon from "@/_components/Icon/DiscordIcon";
import InstargramIcon from "@/_components/Icon/InstargramIcon";
import MastodonIcon from "@/_components/Icon/MastodonIcon";
import TwitchIcon from "@/_components/Icon/TwitchIcon";
import { useRouter } from "next/router";

interface MenuItem {
  text: string;
  link: string;
  icon: FC<{}>;
}

const MenuOtherSideBarLeft: FC = () => {
  const router = useRouter()
  const menu: MenuItem[] = [
    { text: "Code of Conduct", link: "/code-of-conduct", icon: CodeOfConductIcon },
    { text: "Privacy Policy", link: "/privacy", icon: PrivacyPolicyIcon },
    { text: "Terms of use", link: "/terms", icon: TermOfUseIcon },
  ];

  const menuSocial: MenuItem[] = [
    { text: "X", link: "https://x.com/thepracticaldev", icon: XIcon },
    { text: "Facebook", link: "https://www.facebook.com/thepracticaldev", icon: FacebookIcon },
    { text: "Discord", link: "https://github.com/forem", icon: DiscordIcon },
    { text: "Instargram", link: "https://www.instagram.com/thepracticaldev", icon: InstargramIcon },
    { text: "Twitch", link: "https://www.twitch.tv/thepracticaldev", icon: TwitchIcon },
    { text: "Mastodon", link: "https://fosstodon.org/@thepracticaldev", icon: MastodonIcon },
  ];

  return (
    <div className="mb-4">
      <p className="pb-[8px] pt-[10px] pl-[10px] font-bold">Other</p>
      {menu.map((item) => (
        <Button
          key={item.link}
          
          type="secondary"
          className=""
          classNameProp="w-[240px] justify-start !pl-[6px] items-center"
          onClick={() => {
            router.push(item.link)
            return null
          }}
        >
          <item.icon />
          <p className="ml-2">{item.text}</p>
        </Button>
      ))}
      <div className="flex ml-[0px] mt-4">
        {menuSocial.map((item) => (
          <Button
            key={item.link}
            onClick={() => {
              router.push(item.link)
              return null
            }}
            type="secondary"
            className=""
            classNameProp="!px-2 hover:fill-button fill-button2 items-center"
          >
            <item.icon />
          </Button>
        ))}
      </div>
    </div>
  );
};

export default MenuOtherSideBarLeft;
