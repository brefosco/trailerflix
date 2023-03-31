import { Link } from "react-router-dom";
import DarkBackgroundWrapper from "./DarkBackgroundWrapper";
import Header from "./Header";

function NotFound() {
  // TODO: Add i18n here
  return (
    <DarkBackgroundWrapper>
      <Header />
      <h3 className="text-2xl">Page not found.</h3>
      <Link to="/">Back to home</Link>
    </DarkBackgroundWrapper>
  );
}

export default NotFound;
