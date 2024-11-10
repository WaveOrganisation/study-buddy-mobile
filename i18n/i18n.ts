import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      skibid: {
        "Welcome to React": "Welcome to React and react-i18next",
      },
    },
  },
  he: {
    translation: {
      skibid: {
        "Welcome to React": "Welcome to React and react-i18next",
      },
    },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    compatibilityJSON: "v3",
    resources,
    lng: "he",
    fallbackLng: "en",

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
