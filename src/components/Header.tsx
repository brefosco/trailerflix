import { t } from "i18next";
import { Link } from "react-router-dom";
import Button from "./Button";
import { useAppSelector, useAppDispatch } from "../hooks/redux";
import { logOutSession, selectUser } from "../slices/userSlice";
import AvatarIcon from "../assets/avatar.png";

function Header() {
  const { isLoggedIn, sessionId } = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logOutSession(sessionId));
  };
  return (
    <header className="flex justify-between text-white w-9/12 md:w-full">
      <div data-cy="header-home" className="font-semibold text-3xl my-5 mx-5">
        <Link to="/watch">Home</Link>
      </div>
      <div className="py-4 w-1/4">
        {isLoggedIn ? (
          <div className="flex px-4 py-4">
            <Link to="/profile">
              <img alt="avatar" src={AvatarIcon} className="rounded-full min-w-[30px] w-8" />
            </Link>
            <button
              className="px-4 py-1"
              onClick={() => {
                handleLogout();
              }}
            >
              {t("LOGOUT")}
            </button>
          </div>
        ) : (
          <div className="flex">
            <div className="px-4">
              <a href="https://www.themoviedb.org/signup">{t("REGISTER")}</a>
            </div>
            <Link to="/login">
              <Button data-cy="header-login" className="px-4">
                {t("LOGIN_ACTION")}
              </Button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
