import { Routes, Route } from "react-router";
import ColorConverter from "../pages/ColorConverter";
import ImageColorPicker from "../pages/ImageColorPicker";
const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/color-converter" element={<ColorConverter />} />
        <Route path="/image-color-picker" element={<ImageColorPicker />} />
      </Routes>
    </>
  );
};

export default Router;
