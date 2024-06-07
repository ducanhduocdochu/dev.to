import { FC, useState } from "react";
import Button from "./Button";
import { signOut, useSession } from "next-auth/react";
import NotificationIcon from "@/_components/Icon/NotificationIcon";
import Box from "./Box";
import { useRouter } from "next/router";

const RightHeader: FC = () => {
  const { data: session, status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const handleButtonClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="flex items-center">
      {session ? (
        <>
          <Button
            type="primary"
            className=""
            classNameProp="w-[114.2px] mr-2 items-center justify-center !px-[14px]"
            onClick={() => {
              router.push('/new')
              return null
            }}
          >
            Create Post
          </Button>
          <Button
            type="secondary"
            className="mx-1"
            classNameProp="mr-2 items-center justify-center !p-2"
            onClick={() => {
              router.push('/notifications')
              return null
            }}
          >
            <NotificationIcon />
          </Button>
          <div className="relative">
            <Button
              type="secondary"
              className=""
              classNameProp="!p-0 h-max"
              onClick={handleButtonClick}
            >
              <img
                src={session.user.image || ""}
                style={{ backgroundColor: "#dddddd;" }}
                className="mr-2 h-[32px] w-[32px] rounded-full"
                alt={session.user.name || ""}
              ></img>
            </Button>
            {isMenuOpen && (
              <Box classNameProp="absolute top-[40px] right-[4px] bg-white shadow-md border border-gray-200 rounded-md w-[250px] h-[306px] px-2 py-2">
                <div className="border-b-[rgb(214, 214, 215)] border-b pb-2">
                  <Button
                    type="secondary"
                    className=""
                    classNameProp="flex-col h-[56px] px-4 py-2"
                  >
                    <h1 className="text-[16px] font-medium text-button2">
                      {session.user.name}
                    </h1>
                    <p className="text-[14px] font-normal text-button2">
                      @{session.user.name}
                    </p>
                  </Button>
                </div>
                <div className="border-b-[rgb(214, 214, 215)] border-b py-2">
                  <Button
                    type="secondary"
                    className=""
                    classNameProp="flex-col h-[40px] px-4 py-2"
                  >
                    Dashdoard
                  </Button>
                  <Button
                    type="secondary"
                    className=""
                    classNameProp="flex-col h-[40px] px-4 py-2"
                  >
                    Create Post
                  </Button>
                  <Button
                    type="secondary"
                    className=""
                    classNameProp="flex-col h-[40px] px-4 py-2"
                  >
                    Reading List
                  </Button>
                  <Button
                    type="secondary"
                    className=""
                    classNameProp="flex-col h-[40px] px-4 py-2"
                  >
                    Settings
                  </Button>
                </div>
                <div className="border-b-[rgb(214, 214, 215)] border-b py-2">
                  <Button
                    type="secondary"
                    className=""
                    classNameProp="flex-col h-[40px] px-4 py-2"
                    onClick={signOut}
                  >
                    Sign Out
                  </Button>
                </div>
              </Box>
            )}
          </div>
        </>
      ) : (
        <>
          <Button
            type="secondary"
            className=""
            classNameProp="w-[75.653px] items-center mr-2 justify-center font-normal"
            onClick={() => {
              router.push("/enter")
              return null
            }
            }
          >
            Log in
          </Button>
          <Button
            type="primary"
            className=""
            classNameProp="w-[140px] mr-2 items-center justify-center !px-[14.7px]"
            onClick={() => {
              router.push("/enter?state=new-user")
              return null
            }}
          >
            Create account
          </Button>
        </>
      )}
    </div>
  );
};

export default RightHeader;
