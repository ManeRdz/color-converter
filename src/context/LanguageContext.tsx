import { createContext, useEffect, useState } from "react";
import {
  ContextProviderProps,
  Languages,
  LanguageContextValue,
} from "../types";
import "../languages/i18n";
import { useTranslation } from "react-i18next";

export const LanguageContext = createContext<LanguageContextValue>({
  language: "en",
  setLanguage: () => {},
});

export const LanguageContextProvider = ({ children }: ContextProviderProps) => {
  const getInitialLanguage = (): Languages => {
    const saved = localStorage.getItem("language");
    return saved === "en" || saved === "es" ? saved : "en";
  };
  const [language, setLanguage] = useState<Languages>(getInitialLanguage);

  const { t, i18n } = useTranslation();

  useEffect(() => {
    localStorage.setItem("language", language);
    i18n.changeLanguage(language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
