import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { FC } from "react";

interface Props {
  width: string;
  height: string;
}

const Logo: FC<Props> = ({ width, height }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  return (
      <a onClick={async () => {
        try {
          if (session) {
            await router.push(`/?signin=true`);
          } else {
            await router.push(`/`);
          }
        } catch (error) {
          console.error('Failed to navigate:', error);
        }
        return null;
      }}>
        <img
          className={`site-logo__img w-[${width}px] h-[${height}px] cursor-pointer`}
          width={width}
          height={height}
          src="https://dev-to-uploads.s3.amazonaws.com/uploads/logos/resized_logo_UQww2soKuUsjaOGNB38o.png"
          alt="DEV Community"
        ></img>
      </a>
  );
};

export default Logo;
