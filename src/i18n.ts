import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import es from "./translation/es";
import en from "./translation/en";

const resources = {
  es,
  en,
};

i18n.use(initReactI18next).init({
  resources,
  lng: "es",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});
