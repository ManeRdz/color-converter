import React, { useContext, useState } from "react";
import { NavLink } from "react-router";
import { IoIosSunny } from "react-icons/io";
import { IoIosMoon } from "react-icons/io";
import { RiComputerLine } from "react-icons/ri";
import { theme } from "../types";
import { LanguageContext } from "../context/LanguageContext";
import mx from "../assets/mx.svg";
import us from "../assets/us.svg";
import "../languages/i18n";

import { useTranslation } from "react-i18next";

interface LayoutProps {
  setTheme: React.Dispatch<React.SetStateAction<theme>>;
  theme: theme;
}

const Layout: React.FC<LayoutProps> = ({ theme, setTheme }) => {
  const [showThemeSelector, setShowThemeSelector] = useState<boolean>(false);

  const { language, setLanguage } = useContext(LanguageContext);
  const { t, i18n } = useTranslation();

  const selectTheme = (theme: theme) => {
    setTheme(theme);
  };

  const toggleThemeSelector = () => {
    setShowThemeSelector(!showThemeSelector);
  };

  const toggleLanguage = () => {
    const newLang = language === "en" ? "es" : "en";

    setLanguage(newLang);
    i18n.changeLanguage(newLang === "en" ? "en" : "es");
  };

  return (
    <header className="max-h-[150px] min-h-[100px] w-[100dvw] flex items-center justify-evenly font-title bg-background text-text-color">
      <NavLink to="/color-converter" className="">
        LOGO
      </NavLink>
      <ul className="flex items-center justify-center gap-10">
        <li>
          <NavLink to="/color-converter" className="relative w-full group">
            {t("colorConverter")}
            <span className="absolute left-1/2 -bottom-1 h-0.5 w-0 bg-main-coor transition-all duration-300 ease-in-out group-hover:left-0 group-hover:w-full" />
          </NavLink>
        </li>
        <li>
          <NavLink to="/blog" className="relative w-full group">
            Blog
            <span className="absolute left-1/2 -bottom-1 h-0.5 w-0 bg-main-coor transition-all duration-300 ease-in-out group-hover:left-0 group-hover:w-full" />
          </NavLink>
        </li>
      </ul>
      <div className="flex items-center gap-4 justify-center">
        <div className="relative">
          <button
            className="cursor-pointer flex items-center justify-center gap-1 border-1 border-neutral-300 dark:border-neutral-700 p-2 rounded-sm"
            onClick={toggleThemeSelector}
          >
            <span>
              {theme == "light" ? (
                <IoIosSunny />
              ) : theme == "dark" ? (
                <IoIosMoon />
              ) : (
                <RiComputerLine />
              )}
            </span>
            <p className="text-sm">
              {theme == "light" ? "Light" : theme == "dark" ? "Dark" : "System"}
            </p>
          </button>
          {showThemeSelector && (
            <div className="absolute shadow-lg text-sm flex items-start gap-1 p-4 justify-center flex-col w-40 min-h-24 bg-card-color right-0 top-11 rounded-sm">
              <button
                onClick={() => selectTheme("light")}
                className="hover:bg-gray-200 dark:hover:bg-neutral-800 cursor-pointer flex items-center justify-start gap-1 w-full py-1 px-2 rounded-sm"
              >
                <IoIosSunny />
                <span className="inline-block">Light</span>
              </button>
              <button
                onClick={() => selectTheme("dark")}
                className="hover:bg-gray-200 dark:hover:bg-neutral-800 cursor-pointer flex items-center justify-start gap-1 w-full py-1 px-2 rounded-sm"
              >
                <IoIosMoon />
                <span className="inline-block">Dark</span>
              </button>
              <button
                onClick={() => selectTheme("system")}
                className="hover:bg-gray-200 dark:hover:bg-neutral-800 cursor-pointer flex items-center justify-start gap-1 w-full py-1 px-2 rounded-sm"
              >
                <RiComputerLine />
                <span className="inline-block">System</span>
              </button>
            </div>
          )}
        </div>

        <button
          className="flex items-center justify-center gap-1 cursor-pointer"
          onClick={toggleLanguage}
        >
          {language == "es" && (
            <>
              <img src={us} width="20" alt="United States" />
              <p className="text-sm">ENG</p>
            </>
          )}
          {language == "en" && (
            <>
              <img src={mx} width="20" alt="México" />
              <p className="text-sm">SPA</p>
            </>
          )}
        </button>
      </div>
    </header>
  );
};

export default Layout;
