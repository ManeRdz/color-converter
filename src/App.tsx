import { BrowserRouter } from "react-router";
import Router from "./router/Router";
import { useEffect, useState } from "react";
import Layout from "./layout/Layout";
import { LanguageContextProvider } from "./context/LanguageContext";
import { theme } from "./types";

function App() {
  const getInitialTheme = (): theme => {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark" || saved === "system") {
      return saved;
    }
    return "system";
  };

  const [theme, setTheme] = useState<theme>(getInitialTheme);

  useEffect(() => {
    const root = window.document.documentElement;

    const applyTheme = () => {
      const isSystemDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      const isDark = theme === "dark" || (theme === "system" && isSystemDark);

      if (isDark) {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    };

    applyTheme();

    localStorage.setItem("theme", theme);

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    if (theme === "system") {
      mediaQuery.addEventListener("change", applyTheme);
      return () => mediaQuery.removeEventListener("change", applyTheme);
    }
  }, [theme]);

  return (
    <BrowserRouter>
      <LanguageContextProvider>
        <div className="relative">
          <Layout setTheme={setTheme} theme={theme} />
          <Router />
        </div>
      </LanguageContextProvider>
    </BrowserRouter>
  );
}

export default App;
