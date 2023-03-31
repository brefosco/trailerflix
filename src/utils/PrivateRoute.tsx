import { Outlet, Navigate } from "react-router-dom";
import { useAppSelector } from "../hooks/redux";
import { selectUser } from "../slices/userSlice";

function PrivateRoute() {
  const { isLoggedIn } = useAppSelector(selectUser);

  return isLoggedIn ? <Outlet /> : <Navigate to="/welcome" />;
}

export default PrivateRoute;
