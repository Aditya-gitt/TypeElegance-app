import { Route, Routes } from "react-router";
import SignUp from "../pages/signUp/SignUp";
import Login from "../pages/login/Login";
import AuthHeader from "../components/authHeader/AuthHeader";
import { LOGIN_URL, SIGN_UP_URL } from "../constants/routes_url_constants";

const AuthLayout = () => {
  return (
    <>
      <AuthHeader />
      <Routes>
        <Route path={LOGIN_URL} element={<Login />} />
        <Route path={SIGN_UP_URL} element={<SignUp />} />
      </Routes>
    </>
  );
};

export default AuthLayout;
