import { FC } from "react";
import Button from "@/_components/Button";
import HomeIcon from "@/_components/Icon/HomeIcon";
import PodcastsIcon from "@/_components/Icon/PodcastsIcon";
import VideosIcon from "@/_components/Icon/VideosIcon";
import TagsIcon from "@/_components/Icon/TagsIcon";
import DEVHelpIcon from "@/_components/Icon/DEVHelpIcon";
import ForemShop from "@/_components/Icon/ForemShop";
import AdvertiseOnDEVIcon from "@/_components/Icon/AdvertiseOnDEVIcon";
import DEVChallengesIcon from "@/_components/Icon/DEVChallengesIcon";
import DEVShowcaseIcon from "@/_components/Icon/DEVShowcaseIcon";
import AboutIcon from "@/_components/Icon/AboutIcon";
import ContactIcon from "@/_components/Icon/ContactIcon";
import GuidesIcon from "@/_components/Icon/GuidesIcon";
import SoftwareComparisonsIcon from "@/_components/Icon/SoftwareComparisonsIcon";
import { useRouter } from "next/router";

interface MenuItem {
  text: string;
  link: string;
  icon: FC<Record<string, never>>;
}

const MenuSideBarLeft: FC = () => {
  const router = useRouter();
  const menu: MenuItem[] = [
    { text: "Home", link: "/", icon: HomeIcon },
    { text: "Podcasts", link: "/pod", icon: PodcastsIcon },
    { text: "Videos", link: "/videos", icon: VideosIcon },
    { text: "Tags", link: "/tags", icon: TagsIcon },
    { text: "DEV Help", link: "/help", icon: DEVHelpIcon },
    { text: "Forem Shop", link: "/forem", icon: ForemShop },
    { text: "Advertise on DEV", link: "/advertise", icon: AdvertiseOnDEVIcon },
    { text: "DEV Challenges", link: "/challenges", icon: DEVChallengesIcon },
    { text: "DEV Showcase", link: "/showcase", icon: DEVShowcaseIcon },
    { text: "About", link: "/about", icon: AboutIcon },
    { text: "Contact", link: "/contact", icon: ContactIcon },
    { text: "Guides", link: "/guides", icon: GuidesIcon },
    { text: "Software comparisons", link: "/software-comparisons", icon: SoftwareComparisonsIcon },
  ];

  return (
    <div className="mb-4">
      {menu.map(item => (
        <Button 
          onClick={async () => {
            try {
              await router.push(item.link);
            } catch (error) {
              console.error('Failed to navigate:', error);
            }
            return null;
          }} 
          key={item.link} 
          type='secondary' 
          className="" 
          classNameProp="w-[240px] items-center justify-start !pl-2"
        >
          <item.icon />
          <p className="ml-2">{item.text}</p>
        </Button>
      ))}
    </div>
  );
};

export default MenuSideBarLeft;
