import React from "react";
import { NavLink } from "react-router";

const Layout: React.FC<{
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  isDarkMode: boolean;
}> = ({ setIsDarkMode, isDarkMode }) => {
  const toggle_theme = () => {
    setIsDarkMode((prev) => {
      console.log(prev);
      return !prev;
    });
  };

  return (
    <header className="max-h-[150px] min-h-[100px] w-[100dvw] flex items-center justify-evenly font-title bg-background text-text-color">
      <NavLink to="/" className="">
        LOGO
      </NavLink>
      <ul className="flex items-center justify-center gap-10">
        <li>
          <NavLink to="/" className="relative w-full group">
            Color converter
            <span className="absolute left-1/2 -bottom-1 h-0.5 w-0 bg-red-500 transition-all duration-300 ease-in-out group-hover:left-0 group-hover:w-full" />
          </NavLink>
        </li>
        <li>
          <NavLink to="/" className="relative w-full group">
            Forum
            <span className="absolute left-1/2 -bottom-1 h-0.5 w-0 bg-red-500 transition-all duration-300 ease-in-out group-hover:left-0 group-hover:w-full" />
          </NavLink>
        </li>
      </ul>
      <div className="flex items-center gap-4 justify-center">
        <button className="cursor-pointer" onClick={toggle_theme}>
          {isDarkMode ? "Light" : "Dark"}
        </button>
        <button>ENG/ESP</button>
      </div>
    </header>
  );
};

export default Layout;
