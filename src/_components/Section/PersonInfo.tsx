import { FC } from "react";
import Bar from "@/_components/Bar";
import PostWidgets from "@/_components/PostWidgets";
import ImpressionWidget from "@/_components/ImpressionWidget";
import Button from "../Button";
import { useRouter } from "next/router";
import { api } from "@/utils/api";
import { useSession } from "next-auth/react";

const PersonInfo: FC = () => {
  const router = useRouter();
  const { user_id } = router.query;
  const userId = String(user_id);
  const { data: session, status } = useSession();

  const {
    data: data_user,
    isLoading: isLoading_user,
    error: error_user,
  } = api.user.getUserById.useQuery({ id: userId });

  return (
    <div className="relative h-full w-full">
      {data_user && (
        <div className = "flex justify-center">
          <div className="absolute left-[43%] top-[-36%] rounded-full bg-[#70a99a] !p-2">
            <img
              src={data_user?.image ?? ""}
              style={{ backgroundColor: "#dddddd;" }}
              className="h-[112px] w-[112px] rounded-full"
              alt={data_user?.name ?? ""}
            />
          </div>
          <div className="absolute top-2 right-2">
          {session?.user.id == userId ?
          <Button className="" classNameProp="bg-button p-2 text-white w-[84px] hover:no-underline hover:bg-[#2f3ab2] w-max" type="primary">
            Edit Profile
          </Button>:
          <Button className="" classNameProp="bg-button p-2 text-white w-[84px] hover:no-underline hover:bg-[#2f3ab2] w-max" type="primary">
            Follow
          </Button>}
          </div>
          <div>

          <h1 className="mt-[88px] text-[#090909] text-[30px] font-bold">{data_user.name}</h1>{" "}

          <p className="text-[14px] text-[#717171] mt-[16px]">Joined on Mar 20, 2024</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonInfo;
