export type ContextProviderProps = {
  children: React.ReactNode;
};

export type Languages = "en" | "es";

export interface LanguageContextValue {
  language: Language;
  setLanguage: React.Dispatch<React.SetStateAction<Language>>;
}

export type theme = "light" | "dark" | "system";
