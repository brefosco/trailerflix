import Button from "../components/Button";
import Header from "../components/Header";
import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import AvatarIcon from "../assets/avatar.png";

interface ProfileForm {
  name: string;
  isKid: boolean;
  maturity: string;
  language: string;
}

function Profile() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProfileForm>();
  const navigate = useNavigate();

  const { t, i18n } = useTranslation();

  useEffect(() => {
    const localStorageData = localStorage.getItem("profile-data");
    if (localStorageData) {
      const parsedData: ProfileForm = JSON.parse(localStorageData);
      setValue("name", parsedData.name);
      setValue("isKid", parsedData.isKid);
      setValue("maturity", parsedData.maturity);
      setValue("language", parsedData.language);
    }
  }, []);

  const onSubmit: SubmitHandler<ProfileForm> = (data) => {
    if (data) {
      localStorage.setItem("profile-data", JSON.stringify(data));
    }
    const lan = getLanguage();
    if (lan !== data.language) i18n.changeLanguage(data.language);
    navigate("/");
  };

  const getLanguage = () => i18n.language || window.localStorage.i18nextLng;

  return (
    <div className="bg-[url('../assets/background-home.svg')] min-h-screen">
      <Header />
      <div className="bg-black max-w-screen-md rounded-md my-8 mx-auto text-white">
        <h2 className="text-4xl py-8 px-8">{t("EDIT_PROFILE")}</h2>
        <div className="flex">
          <div className="w-1/4 mx-8 my-8">
            <img className="rounded-full w-32" src={AvatarIcon} alt="avatar" />
          </div>
          <div className="w-3/4">
            <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
              <div className="flex">
                <div className="mx-4">
                  <label className="block" htmlFor="name">
                    {t("FIRST_NAME")}
                  </label>
                  <input
                    className="my-2 py-1 px-2 rounded text-white bg-black border border-blue-500"
                    type="text"
                    placeholder="Name"
                    {...register("name", { required: true })}
                  />
                  <p className="text-red-600">
                    {errors.name && "Invalid first name"}
                  </p>
                </div>
                <div className="mt-10">
                  <input
                    type="checkbox"
                    className="mx-2 w-6 h-6 outline-black accent-black"
                    {...register("isKid")}
                  />
                  <label className="text-lg" htmlFor="isKid">
                    {t("KID")}?
                  </label>
                </div>
              </div>
              <div className="mx-4">
                <label htmlFor="language">{t("LANGUAGE")}</label>
                <select
                  {...register("language")}
                  className="bg-black rounded border border-blue-500 px-1 py-1 my-2 block"
                >
                  <option value="es">{t("SPANISH")}</option>
                  <option value="en">{t("ENGLISH")}</option>
                </select>
              </div>
              <div className="my-4 mx-4">
                <label className="" htmlFor="maturity">
                  {t("ALLOWED_MEDIA")}
                </label>
                <select
                  {...register("maturity")}
                  className="bg-black rounded border border-blue-500 px-1 py-1 my-2 block"
                >
                  <option value="all">{t("ALL_LEVELS")}</option>
                  <option value="child">{t("ONLY_CHILD")}</option>
                </select>
              </div>
              <div className="flex">
                <Button className="px-4 py-2 mx-2 my-8 w-11/12">
                  {t("SAVE")}
                </Button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(-1);
                  }}
                  className="px-4 py-2 mx-2 my-8 w-11/12"
                >
                  {t("CANCEL")}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
