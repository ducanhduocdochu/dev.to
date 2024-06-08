import { useRouter } from "next/router";
import { FC } from "react";

const Advertise: FC = () => {
  const router = useRouter();
  
  const handleClick = async () => {
    try {
      await router.push('https://docs.google.com/forms/d/e/1FAIpQLSfrhAb82gHqbmf4jWhay0MrkAZe7ZX092Sp7Doz0MQt1ic79w/viewform');
    } catch (error) {
      console.error('Navigation error:', error);
    }
  };

  return (
    <div>
      <h1 className="pb-4 text-[14px] font-normal leading-[25px] text-[#525252]">
        DEV Community
      </h1>
      <img
        src="https://res.cloudinary.com/practicaldev/image/fetch/s--tUXa-lQ2--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_350/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/l0et407b181thswgfd71.jpg"
        alt="Become a Moderator"
        width="3000"
        height="3000"
        loading="lazy"
        className="mb-5"
      />

      <div className="inline-block text-[rgb(64, 64, 64)] mt-6 font-bold">
        <div
          onClick={handleClick}
          className="inline-block text-button hover:text-button4 underline hover:cursor-pointer"
        >
          Fill out this survey
        </div>
        {" "}
        and help us moderate our community by becoming a tag moderator here at
        DEV.
      </div>
    </div>
  );
};

export default Advertise;
