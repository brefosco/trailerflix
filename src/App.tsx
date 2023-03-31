import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import Footer from "./components/Footer";
import Home from "./screens/Home";
import Login from "./screens/Login";
import TrailerPlayer from "./screens/TrailerPlayer";
import Watch from "./screens/Watch";
import NotFound from "./components/NotFound";
import PrivateRoute from "./utils/PrivateRoute";
import { store } from "./store";
import Profile from "./screens/Profile";
import { getRequestToken, selectUser } from "./slices/userSlice";
import { useAppDispatch, useAppSelector } from "./hooks/redux";

function AppWrapper() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

function App() {
  const dispatch = useAppDispatch();
  const { requestToken } = useAppSelector(selectUser);

  useEffect(() => {
    if (!requestToken) {
      dispatch(getRequestToken());
    }
  }, []);

  return (
    <div className="w-full overflow-x-hidden">
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Watch />} />
          <Route path="trailer" element={<TrailerPlayer />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="welcome" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default AppWrapper;
