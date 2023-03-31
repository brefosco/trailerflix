import { useState } from "react";
import MacIcon from "../../assets/mac.svg";
import Button from "../Button";
import PlansTable from "./PlansTable";
import { DollarsIcon, CancelIcon, DevicesIcon } from "../Icons";
import TVIcon from "../../assets/tv.svg";
import TabletIcon from "../../assets/tablet.png";
import { t } from "i18next";
import { useNavigate } from "react-router-dom";

function PriceTitle() {
  return (
    <div className="flex justify-around">
      <div className="">
        <DollarsIcon />
        <p className="my-4">{t("PRICE")}</p>
      </div>
    </div>
  );
}

function PriceContent() {
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex my-28 text-center">
        <div className="w-1/2 text-2xl">
          <p>{t("CHOOSE_PLAN")}</p>
        </div>
        <div className="w-1/2">
          <Button
            onClick={() => {
              navigate("/login");
            }}
            className="py-2 px-4"
          >
            {t("ENJOY_FREE_MONTH")}
          </Button>
        </div>
      </div>
      <PlansTable />
    </div>
  );
}

function CancelTitle() {
  return (
    <div data-testid="cancel-title" className="flex justify-around">
      <div className="">
        <CancelIcon />
        <p className="my-4">{t("CANCEL")}</p>
      </div>
    </div>
  );
}

function CancelContent() {
  const navigate = useNavigate();

  return (
    <div className="flex py-8 justify-center">
      <div className="py-4 px-8 w-1/4">
        {t("NO_COMPROMISES")}
        <Button
          onClick={() => {
            navigate("/login");
          }}
          className="py-2 my-8 px-4"
        >
          {t("ENJOY_FREE_MONTH")}
        </Button>
      </div>
      <div>
        <img src={MacIcon} alt="available for all platforms" />
      </div>
    </div>
  );
}

function DevicesTitle() {
  return (
    <div className="flex justify-around">
      <div className="">
        <DevicesIcon />
        <p className="my-4">{t("DEVICES")}</p>
      </div>
    </div>
  );
}
function DevicesContent() {
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex justify-between text-center my-8 mx-8">
        <p>{t("WATCH_MOVIES_EVERYWHERE")}</p>
        <Button
          onClick={() => {
            navigate("/login");
          }}
          className="py-4 px-4"
        >
          {t("ENJOY_FREE_MONTH")}
        </Button>
      </div>
      <section className="flex text-center">
        <div className="py-6 px-6 w-1/3">
          <div className="flex flex-col items-center">
            <img src={TVIcon} alt="On TV and video-game consoles" />
            <h3 className="text-xl font-bold my-4">{t("WATCH_ON_TV")}.</h3>
            <p>{t("BIG_DEVICES_AVAILABLE")}</p>
          </div>
        </div>
        <div className="py-6 px-6 w-1/3">
          <div className="flex flex-col items-center">
            <img src={TabletIcon} alt="On tablet" />
            <h3 className="text-xl font-bold my-4">{t("WATCH_ON_TABLET")}</h3>
            <p>{t("SMALL_DEVICES_AVAILABLE")}</p>
          </div>
        </div>

        <div className="py-6 px-6 w-1/3">
          <div className="flex flex-col items-center">
            <img src={MacIcon} alt="On computer" />
            <h3 className="text-xl font-bold my-4">{t("WATCH_ON_PC")}</h3>
            <p>{t("PC_DEVICES_AVAILABLE")}</p>
          </div>
        </div>
      </section>
    </div>
  );
}

interface Tab {
  id: string;
  Title: () => JSX.Element;
  Content: () => JSX.Element;
}

const tabs: Tab[] = [
  { id: "0", Title: PriceTitle, Content: PriceContent },
  { id: "1", Title: CancelTitle, Content: CancelContent },
  { id: "2", Title: DevicesTitle, Content: DevicesContent },
];

function Tabs() {
  const [activeTab, setActiveTab] = useState<string>("0");

  return (
    <div>
      <div>
        <div className="flex">
          {tabs.map(({ id, Title }) => (
            <div
              className={`w-1/3 text-2xl bg-[#111111] py-9 ${
                activeTab !== id
                  ? "text-[#595959]"
                  : "border-x-0 border-b-2 border-[#0578FF]"
              }`}
              onClick={() => setActiveTab(id)}
              key={id}
            >
              <Title />
            </div>
          ))}
        </div>
      </div>
      <div className="">
        {tabs.map(({ id, Content }) =>
          activeTab === id ? <Content key={id} /> : ""
        )}
      </div>
    </div>
  );
}

export default Tabs;
