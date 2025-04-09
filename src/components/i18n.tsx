import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import translationEn from "../translation/en.json";
import translationAr from "../translation/ar.json";

const resources = {
  en: {
    translation: translationEn,
  },
  ar: {
    translation: translationAr,
  },
};
i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: "ar",
    fallbackLng: "ar",
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });
export default i18next;
