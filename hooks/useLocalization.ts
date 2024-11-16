import { useTranslation } from "react-i18next";
import { useMemo } from "react";
import { languages, locales, saveLanguageToStorage } from "@/utils/localization";

/**
 * Custom hook to manage application localization
 * Provides current language and language switching functionality
 */
export default function useLocalization() {
  const { i18n } = useTranslation();

  /**
   * Changes the application language and saves it to storage
   * @param to - Target language code
   */
  const switchLanguage = (to: locales) => {
    void i18n.changeLanguage(to, (error) => {
      if (error) {
        console.error("Failed to change language:", error);
        return;
      }
      saveLanguageToStorage(to);
    });
  };

  /**
   * Memoized current language object
   * Falls back to first language in list if current language is not found
   */
  const currentLanguage = useMemo(() => {
    const foundLanguage = languages.find((language) => language.code === i18n.language);

    if (!foundLanguage) {
      console.warn(`Language ${i18n.language} not found, falling back to ${languages[0].code}`);
      return languages[0];
    }

    return foundLanguage;
  }, [i18n.language]);

  return {
    language: currentLanguage,
    switchLanguage,
  };
}
