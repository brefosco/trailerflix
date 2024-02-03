import Button from "./Button";
import Header from "./Header";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

function WelcomeScreen() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div
      role="welcome-screen"
      className="bg-[url('../assets/background-home.svg')] min-h-screen text-white text-center w-full"
    >
      <Header />
      <div className="flex ">
        <div className="w-full">
          <div className="text-8xl place-content-center pt-56">
            <p>{t("BEST_ONLINE_CINEMA")}</p>
          </div>
          <p className="text-2xl py-6">{t("ENJOY_EVERYWHERE")}</p>
          <div className="py-20">
            <Button
              onClick={() => {
                navigate("/watch");
              }}
              className="py-2 px-4"
            >
              {t("TRY_NOW")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WelcomeScreen;
