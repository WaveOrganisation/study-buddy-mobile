import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as R from "@/i18n/resources";

const resources = {
  en: {
    translation: {},
    common: R.Common_EN,
    validation: R.Validation_EN,
    pageOnboarding: R.PageOnboarding_EN,
  },
  he: {
    translation: {},
    common: R.Common_HE,
    validation: R.Validation_HE,
    pageOnboarding: R.PageOnboarding_HE,
  },
  ru: {
    translation: {},
    common: R.Common_RU,
    validation: R.Validation_RU,
    pageOnboarding: R.PageOnboarding_RU,
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    // tst
    compatibilityJSON: "v3",
    resources,
    lng: "ru",
    fallbackLng: "en",

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
