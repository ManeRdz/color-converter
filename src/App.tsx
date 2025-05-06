import { BrowserRouter } from "react-router";
import Router from "./router/Router";
import { useEffect, useState } from "react";
import Layout from "./layout/Layout";

function App() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <BrowserRouter>
      <div>
        <Layout setIsDarkMode={setIsDarkMode} isDarkMode={isDarkMode} />
        <Router />
      </div>
    </BrowserRouter>
  );
}

export default App;
