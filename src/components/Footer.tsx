import { t } from "i18next";

function Footer() {
  return (
    <footer className="text-white bg-black py-8">
      <a href="tel:+14086001722" className="text-3xl px-20 py-4">
        {t("QUESTIONS_PHONE")}
      </a>
      <div className="flex">
        <div className="mx-20 my-4">
          <a className="my-4 block">FAQ</a>
          <a className="my-4 block">Privacy</a>
          <a className="my-4 block">Speed Test</a>
        </div>
        <div className="mx-20 my-4">
          <a className="my-4 block">Help Center</a>
          <a className="my-4 block">Jobs</a>
          <a className="my-4 block">Cookie preferences</a>
        </div>
        <div className="mx-20 my-4">
          <a className="my-4 block">Account</a>
          <a className="my-4 block">Ways to watch</a>
          <a className="my-4 block">Corporate Information</a>
        </div>
        <div className="mx-20 my-4">
          <a className="my-4 block">Media Center</a>
          <a className="my-4 block">Terms of Use</a>
          <a className="my-4 block">Contact Us</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
