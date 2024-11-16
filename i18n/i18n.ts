import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as R from "@/i18n/resources";
import { getLocales } from "expo-localization";

import { getLanguageFromStorage } from "@/utils/localization";

const getLanguage = () => {
  const language = getLanguageFromStorage();

  if (language) {
    console.log("language from storage", language);
    return language;
  }

  const locales = ["en", "he", "ru"];
  const deviceLanguages = getLocales();

  for (const userLocale of deviceLanguages) {
    for (const locale of locales) {
      if (userLocale.languageCode === locale) {
        return "he";
      }
    }
  }

  return "he";
};

const resources = {
  en: {
    translation: {},
    common: R.Common_EN,
    validation: R.Validation_EN,
    pageOnboarding: R.PageOnboarding_EN,
    pagePrivacyPolicy: R.PagePrivacyPolicy_EN,
    pageSettings: R.PageSettings_EN,
  },
  he: {
    translation: {},
    common: R.Common_HE,
    validation: R.Validation_HE,
    pageOnboarding: R.PageOnboarding_HE,
    pagePrivacyPolicy: R.PagePrivacyPolicy_HE,
    pageSettings: R.PageSettings_HE,
  },
  ru: {
    translation: {},
    common: R.Common_RU,
    validation: R.Validation_RU,
    pageOnboarding: R.PageOnboarding_RU,
    pagePrivacyPolicy: R.PagePrivacyPolicy_RU,
    pageSettings: R.PageSettings_RU,
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    // tst
    compatibilityJSON: "v3",
    resources,
    lng: getLanguage(),
    fallbackLng: "en",

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
