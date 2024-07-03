import Body from "@/_components/Section/Body";
import HomeLayout from "@/layout/HomeLayout";

const HomePage: React.FC = () => {
  // const { sendEvent } = useWebSocket();
  // sendEvent({timestamp: new Date() ,postId: 1 , type: "view"})
  return (
    <HomeLayout>
        <Body />
    </HomeLayout>
  );
};

export default HomePage;
