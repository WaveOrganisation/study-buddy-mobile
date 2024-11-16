import { useTranslation } from "react-i18next";
import { useMemo } from "react";
import * as SecureStore from "expo-secure-store";

const languageKey = "language";

export const languages = [
  {
    name: "English",
    code: "en",
    localizedName: "English",
  },
  {
    name: "Hebrew",
    code: "he",
    localizedName: "עברית",
  },
  {
    name: "Russian",
    code: "ru",
    localizedName: "Русский",
  },
];
export type locales = (typeof languages)[number]["code"];

export const saveLanguageToStorage = (language: locales) => {
  console.log("saveLanguageToStorage");
  SecureStore.setItem(languageKey, language);
};

export const getLanguageFromStorage = () => {
  console.log("getLanguageFromStorage");
  const language = SecureStore.getItem(languageKey);

  if (language) {
    return language;
  }

  return null;
};

export default function useLocalization() {
  // exposes current language and switch language function

  const { i18n } = useTranslation();
  const switchLanguage = (to: locales) => {
    console.log(to);
    void i18n.changeLanguage(to, (error) => {
      if (error) {
        // TODO: add error handling
        return;
      }
      saveLanguageToStorage(to);
    });
  };

  const currentLanguage = useMemo(() => {
    const foundLanguage = languages.find((language) => language.code === i18n.language);

    if (!foundLanguage) {
      // TODO: add error handling
      return languages[0];
    }

    return foundLanguage;
  }, [languages, i18n.language]);

  return {
    language: currentLanguage,
    switchLanguage,
  };
}
