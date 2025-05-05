import { NavLink } from "react-router";

const Layout = () => {
  return (
    <header className="max-h-[150px] min-h-[100px] w-[100dvw] flex items-center justify-evenly font-title">
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
      <div>
        <button>Mode</button>
        <button>ENG/ESP</button>
      </div>
    </header>
  );
};

export default Layout;
