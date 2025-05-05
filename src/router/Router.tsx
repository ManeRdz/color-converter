import { Routes, Route } from "react-router";
import App from "../App";
import Layout from "../layout/Layout";
const Router = () => {
  return (
    <>
      <Layout />
      <Routes>
        <Route path="/" element={<App />} />
      </Routes>
    </>
  );
};

export default Router;
