import { Routes, Route } from "react-router";
import ColorConverter from "../pages/ColorConverter";
const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/color-converter" element={<ColorConverter />} />
      </Routes>
    </>
  );
};

export default Router;
