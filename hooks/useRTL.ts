import { useMemo, useTransition } from "react";
import { useTranslation } from "react-i18next";

export default function useRTL() {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const rtlLang = ["he", "ar"];

  return useMemo(() => {
    return rtlLang.includes(currentLanguage);
  }, [currentLanguage]);
}
