import { Routes, Route, Navigate } from "react-router";
import ColorConverter from "../pages/ColorConverter";
import ImageColorPicker from "../pages/ImageColorPicker";
const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/color-converter" element={<ColorConverter />} />
        <Route path="/" element={<Navigate to="/color-converter" />} />
        <Route path="/image-color-picker" element={<ImageColorPicker />} />
      </Routes>
    </>
  );
};

export default Router;
