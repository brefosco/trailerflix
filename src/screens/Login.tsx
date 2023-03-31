import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useForm, SubmitHandler } from "react-hook-form";
import Button from "../components/Button";
import Header from "../components/Header";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import {
  validateWithLogin,
  logOutSession,
  selectUser,
} from "../slices/userSlice";
import { useNavigate } from "react-router-dom";

interface LoginForm {
  username: string;
  password: string;
}

function Login() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { requestToken, sessionId, isLoggedIn } = useAppSelector(selectUser);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginForm>();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn]);

  const handleLogOut = () => {
    dispatch(logOutSession(sessionId));
  };

  const onSubmit: SubmitHandler<LoginForm> = (data) => {
    dispatch(
      validateWithLogin({
        username: data.username,
        password: data.password,
        requestToken,
      })
    );
  };

  return (
    <div className="bg-[url('../assets/background-home.svg')] min-h-screen text-white text-center ">
      <Header />
      <div className="bg-black block max-w-sm rounded my-8 mx-auto">
        {isLoggedIn ? (
          <div className="flex flex-col mx-4">
            <Button onClick={() => handleLogOut()} className="px-2 py-1 my-4">
              Log out
            </Button>
            <Button className="px-2 py-1 mb-4" onClick={() => navigate("/")}>
              Navigate to home
            </Button>
          </div>
        ) : (
          <div>
            <h2 className="text-4xl py-8">{t("LOGIN")}</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="text-black">
                <input
                  type="text"
                  className="my-4 mx-4 py-2 px-4 rounded w-4/5"
                  placeholder="Nombre de usuario"
                  {...register("username", { required: true })}
                />
                <div className="text-red-600">
                  {errors.username != null ? "Username is required" : null}
                </div>
                <input
                  type="password"
                  className="my-4 mx-4 py-2 px-4 rounded w-4/5"
                  placeholder="Contraseña"
                  {...register("password", { required: true, minLength: 8 })}
                />
                <div className="text-red-600">
                  {errors.password != null ? "Password is required " : null}
                </div>
              </div>
              <div className="my-8 ">
                {requestToken ? (
                  <Button data-cy="login-submit" className="py-2 px-8 w-4/5 ">
                    {t("LOGIN_ACTION")}
                  </Button>
                ) : (
                  <p>{t("LOADING")}</p>
                )}
              </div>
            </form>
            <div className="flex justify-around">
              <div>
                <input name="remember-me" type="checkbox" className="mx-2" />
                <label htmlFor="remember-me">{t("REMEMBER_ME")}</label>
              </div>
              <p>{t("NEED_HELP")}</p>
            </div>

            <a className="block py-4 ">
              {t("FIRST_TIME")}{" "}
              <span className="font-bold">{t("SUBSCRIBE_NOW")}</span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;
