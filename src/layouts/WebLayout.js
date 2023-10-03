import { Routes, Route } from "react-router";
import Home from "../pages/home/Home";
import { HOME_URL } from "../constants/routes_url_constants";

const WebLayout = () => {
  return (
    <>
      This is main header
      <Routes>
        <Route path={HOME_URL} element={<Home />} />
      </Routes>
    </>
  );
};

export default WebLayout;
