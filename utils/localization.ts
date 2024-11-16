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
