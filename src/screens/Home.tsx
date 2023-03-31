import DarkBackgroundWrapper from "../components/DarkBackgroundWrapper";
import Tabs from "../components/InfoTabs";
import WelcomeScreen from "../components/WelcomeScreen";

function Home() {
  return (
    <div className="w-full">
      <WelcomeScreen />
      <DarkBackgroundWrapper>
        <Tabs />
      </DarkBackgroundWrapper>
    </div>
  );
}

export default Home;
