import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./english.json";
import es from "./spanish.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    es: { translation: es },
  },
  fallbackLng: "en",
  interpolation: {
    escapeValue: true,
  },
});

export default i18n;
