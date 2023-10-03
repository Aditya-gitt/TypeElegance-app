import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import {
  AUTHENTICATE_WITH_EMAIL,
  AUTHENTICATE_WITH_GOOGLE,
  SIGNUP_WITH_EMAIL,
} from "../../constants/action_type_constants";
import "./Login.scss";
import LoginButton from "../../components/loginButton/LoginButton";
import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router";
import { IoLogIn } from "react-icons/io5";
import { AUTH_ROUTE, SIGN_UP_URL } from "../../constants/routes_url_constants";
import {
  LABLE_DEFAULT_COLOR,
  LABLE_FOCUS_COLOR,
} from "../../constants/css/css_constants";
import Cookies from "js-cookie";

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [lableEmailColor, setLableEmailColor] = useState(LABLE_DEFAULT_COLOR);
  const [lablePasswordColor, setLablePasswordColor] =
    useState(LABLE_DEFAULT_COLOR);
  const navigate = useNavigate();

  const handleGoogleLogin = (e) => {
    e.preventDefault();
    dispatch({ type: AUTHENTICATE_WITH_GOOGLE, payload: { signUp: false } });
  };

  const handleEmailLogin = (e) => {
    e.preventDefault();
    dispatch({ type: SIGNUP_WITH_EMAIL, payload: { email, password } });
  };

  const navigateToSignUp = (e) => {
    e.preventDefault();
    navigate(AUTH_ROUTE + SIGN_UP_URL);
  };

  useEffect(() => {
    Cookies.set("hi", "hmm");
  }, []);

  return (
    <>
      {/* <div onClick={handleGoogleLogin}>Login with google</div> */}
      <div className="login-cover">
        <div className="login-welcome-cover">
          <p className="login-welcome-text">
            Welcome to TypeElegance
            <br />
            &nbsp; &nbsp; &emsp; Login to store happyness
          </p>
        </div>
        <div className="login-email-cover">
          <div className="login-email-body" tabindex="0">
            <div
              className="login-email-text"
              style={{ color: `${lableEmailColor}` }}
            >
              email
            </div>
            <input
              type="email"
              className="login-email-input"
              autocomplete="off"
              onFocus={(e) => {
                e.preventDefault();
                setLableEmailColor(LABLE_FOCUS_COLOR);
              }}
              onBlur={(e) => {
                e.preventDefault();
                setLableEmailColor(LABLE_DEFAULT_COLOR);
              }}
              onChange={(e) => {
                e.preventDefault();
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="login-password-body">
            <div
              className="login-password-text"
              style={{ color: `${lablePasswordColor}` }}
            >
              password
            </div>
            <input
              type="password"
              className="login-password-input"
              autocomplete="off"
              onFocus={(e) => {
                e.preventDefault();
                setLablePasswordColor(LABLE_FOCUS_COLOR);
              }}
              onBlur={(e) => {
                e.preventDefault();
                setLablePasswordColor(LABLE_DEFAULT_COLOR);
              }}
              onChange={(e) => {
                e.preventDefault();
                setPassword(e.target.value);
              }}
            />
          </div>
          <div className="login-button-cover">
            <LoginButton
              text="log in"
              onClick={handleEmailLogin}
              icon2={<IoLogIn />}
            />
          </div>
        </div>
        <p className="login-or-text">or</p>
        <div className="login-google-cover">
          <LoginButton
            text="log in with google"
            icon={<FaGoogle />}
            onClick={handleGoogleLogin}
          />
        </div>
        <div className="login-already-text-cover" onClick={navigateToSignUp}>
          new here? create an account
          <IoLogIn style={{ position: "relative", top: "2px" }} />
        </div>
      </div>
    </>
  );
};

export default Login;
