import "./AuthHeader.css";
import { useNavigate } from "react-router";
import { IoLogIn } from "react-icons/io5";
import { useEffect, useState } from "react";
import {
  AUTH_ROUTE,
  HOME_URL,
  LOGIN_URL,
  SIGN_UP_URL,
  WEB_ROUTE,
} from "../../constants/routes_url_constants";

const AuthHeader = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState("");

  const navigateToSignUp = (e) => {
    e.preventDefault();
    navigate(AUTH_ROUTE + SIGN_UP_URL);
  };

  const navigateToLogin = (e) => {
    e.preventDefault();
    navigate(AUTH_ROUTE + LOGIN_URL);
  };

  const navigateToHome = (e) => {
    e.preventDefault();
    navigate(WEB_ROUTE + HOME_URL);
  };

  useEffect(() => {
    if (window.location.href.includes("sign-up")) setPage("sign-up");
    else setPage("login");
  }, [window.location.href]);

  return (
    <>
      <div className="auth-header-cover">
        <div className="auth-header-logo-cover"></div>
        <div className="auth-header-name-cover">
          <p className="auth-header-name-text" onClick={navigateToHome}>
            TypeElegance
          </p>
        </div>
        <div className="auth-header-acc-exist">
          {page === "login" ? (
            <p
              className="auth-header-acc-exist-text"
              onClick={navigateToSignUp}
            >
              new here? create an account
              <IoLogIn style={{ position: "relative", top: "2px" }} />
            </p>
          ) : (
            <p className="auth-header-acc-exist-text" onClick={navigateToLogin}>
              already have an account?
              <IoLogIn style={{ position: "relative", top: "2px" }} />
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default AuthHeader;
