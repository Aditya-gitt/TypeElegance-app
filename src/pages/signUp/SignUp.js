import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  SIGNUP_WITH_EMAIL,
  SIGNUP_WITH_GOOGLE,
} from "../../constants/action_type_constants";
import "./SignUp.scss";
import LoginButton from "../../components/loginButton/LoginButton";
import { FaGoogle } from "react-icons/fa";
import { BiSolidShow, BiSolidHide } from "react-icons/bi";
import { useNavigate } from "react-router";
import { IoLogIn } from "react-icons/io5";
import {
  LABLE_DEFAULT_COLOR,
  LABLE_FOCUS_COLOR,
} from "../../constants/css/css_constants";
import * as VALIDATION_CONSTANTS from "../../constants/credentials_validation_constants";
import { AUTH_ROUTE, LOGIN_URL } from "./../../constants/routes_url_constants";

const SignUp = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [lableEmailColor, setLableEmailColor] = useState(LABLE_DEFAULT_COLOR);
  const [lablePasswordColor, setLablePasswordColor] =
    useState(LABLE_DEFAULT_COLOR);
  const [lableConfirmPasswordColor, setLableConfirmPasswordColor] =
    useState(LABLE_DEFAULT_COLOR);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] =
    useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleGoogleSignUp = (e) => {
    e.preventDefault();
    dispatch({ type: SIGNUP_WITH_GOOGLE, payload: { signUp: true } });
  };

  const handleEmailSignUp = (e) => {
    e.preventDefault();
    if (validate(VALIDATION_CONSTANTS.VALIDATE_EVERYTHING_INPUT))
      dispatch({ type: SIGNUP_WITH_EMAIL, payload: { email, password } });
  };

  const navigateToLogin = (e) => {
    e.preventDefault();
    navigate(AUTH_ROUTE + LOGIN_URL);
  };

  const validate = (input, inputText) => {
    switch (input) {
      case VALIDATION_CONSTANTS.EMAIL_INPUT: {
        const regex = VALIDATION_CONSTANTS.EAMAIL_VALIDATION_REGEX;
        if (!regex.test(email)) {
          validateEmail(inputText ? inputText : null);
          return false;
        }
        setEmailErrorMessage("");
        return true;
      }
      case VALIDATION_CONSTANTS.PASSWORD_INPUT: {
        const regex = VALIDATION_CONSTANTS.PASSWORD_VALIDATION_REGEX;
        if (!regex.test(password)) {
          validatePassword(inputText ? inputText : null);
          return false;
        }
        setPasswordErrorMessage("");
        return true;
      }
      case VALIDATION_CONSTANTS.CONFIRM_PASSWORD_INPUT: {
        if (inputText ? inputText !== password : confirmPassword !== password) {
          // console.log(inputText + "," + confirmPassword);
          setConfirmPasswordErrorMessage(
            VALIDATION_CONSTANTS.PASSWORD_DOES_NOT_MATCH
          );
          return false;
        }
        setConfirmPasswordErrorMessage("");
        return true;
      }
      case VALIDATION_CONSTANTS.VALIDATE_EVERYTHING_INPUT: {
        if (validate(VALIDATION_CONSTANTS.EMAIL_INPUT)) {
          if (validate(VALIDATION_CONSTANTS.PASSWORD_INPUT)) {
            if (validate(VALIDATION_CONSTANTS.CONFIRM_PASSWORD_INPUT)) {
              return true;
            }
          }
        }
        return false;
      }
      default: {
        alert(VALIDATION_CONSTANTS.VALIDATION_ERROR);
      }
    }
  };

  const validatePassword = (inputText) => {
    if (
      !VALIDATION_CONSTANTS.PASSWORD_LOWER_CASE_REGEX.test(
        inputText ? inputText : password
      )
    ) {
      setPasswordErrorMessage(VALIDATION_CONSTANTS.PASSWORD_MUST_CONTAIN_LOWER);
      return;
    }

    if (
      !VALIDATION_CONSTANTS.PASSWORD_UPPER_CASE_REGEX.test(
        inputText ? inputText : password
      )
    ) {
      setPasswordErrorMessage(VALIDATION_CONSTANTS.PASSWORD_MUST_CONTAIN_UPPER);
      return;
    }

    if (
      !VALIDATION_CONSTANTS.PASSWORD_DIGIT_REGEX.test(
        inputText ? inputText : password
      )
    ) {
      setPasswordErrorMessage(VALIDATION_CONSTANTS.PASSWORD_MUST_CONTAIN_DIGTI);
      return;
    }

    if (
      !VALIDATION_CONSTANTS.PASSWORD_SPECIAL_CHARACTER_REGEX.test(
        inputText ? inputText : password
      )
    ) {
      setPasswordErrorMessage(
        VALIDATION_CONSTANTS.PASSWORD_MUST_CONTAIN_SPECIAL
      );
      return;
    }

    if (
      !VALIDATION_CONSTANTS.PASSWORD_LENGTH_REGEX.test(
        inputText ? inputText : password
      )
    ) {
      setPasswordErrorMessage(VALIDATION_CONSTANTS.PASSWORD_LEAST_LENGTH);
      return;
    }
  };

  const validateEmail = (inputText) => {
    if (
      !VALIDATION_CONSTANTS.EMAIL_AT_SYMBOL_REGEX.test(
        inputText ? inputText : email
      )
    ) {
      setEmailErrorMessage(VALIDATION_CONSTANTS.EMAIL_MISSING_AT_SYMBOL);
    } else {
      if (
        !VALIDATION_CONSTANTS.EMAIL_ALLOWED_CHARACTERS_REGEX.test(
          inputText ? inputText : email
        )
      ) {
        setEmailErrorMessage(
          VALIDATION_CONSTANTS.EMAIL_GENEARAL_INVALID_MESSAGE
        );
      } else {
        if (
          !VALIDATION_CONSTANTS.EMAIL_DOT_REGEX.test(
            inputText ? inputText : email
          )
        ) {
          setEmailErrorMessage(VALIDATION_CONSTANTS.EMAIL_MISSING_DOT_SYMBOL);
        } else {
          if (
            !VALIDATION_CONSTANTS.EMAIL_DOMAIN_NAME_REGEX.test(
              inputText ? inputText : email
            )
          ) {
            setEmailErrorMessage(
              VALIDATION_CONSTANTS.EMAIL_INVALID_DOMAIN_NAME
            );
          } else {
            setEmailErrorMessage(
              VALIDATION_CONSTANTS.EMAIL_GENEARAL_INVALID_MESSAGE
            );
          }
        }
      }
    }
  };

  const handleShowHidePassword = (whichInput) => {
    console.log(`Triggered `);
    if (whichInput === VALIDATION_CONSTANTS.PASSWORD_INPUT) {
      setShowPassword((old) => !old);
    }
    if (whichInput === VALIDATION_CONSTANTS.CONFIRM_PASSWORD_INPUT) {
      setShowConfirmPassword((old) => !old);
    }
  };

  return (
    <>
      <div className="signup-cover">
        <div className="signup-welcome-cover">
          <p className="signup-welcome-text">
            Welcome to TypeElegance
            <br />
            &nbsp; &nbsp; &emsp; Login to store happyness
          </p>
        </div>
        <div className="signup-email-cover">
          {emailErrorMessage ? (
            <div className="signup-error-message">{emailErrorMessage}</div>
          ) : null}
          <div className="signup-email-body">
            <div
              className="signup-email-text"
              style={{ color: `${lableEmailColor}` }}
            >
              email
            </div>
            <input
              type="email"
              className="signup-email-input"
              autocomplete="off"
              value={email}
              onFocus={(e) => {
                e.preventDefault();
                setLableEmailColor(LABLE_FOCUS_COLOR);
              }}
              onBlur={(e) => {
                e.preventDefault();
                setLableEmailColor(LABLE_DEFAULT_COLOR);
                validate(VALIDATION_CONSTANTS.EMAIL_INPUT);
              }}
              onChange={(e) => {
                e.preventDefault();
                setEmail(e.target.value);
                if (emailErrorMessage)
                  validate(VALIDATION_CONSTANTS.EMAIL_INPUT, e.target.value);
              }}
            />
          </div>
          {passwordErrorMessage ? (
            <div className="signup-error-message">{passwordErrorMessage}</div>
          ) : null}
          <div className="signup-password-body">
            <div
              className="signup-password-text"
              style={{ color: `${lablePasswordColor}` }}
            >
              password
            </div>
            <input
              type={showPassword ? "text" : "password"}
              className="signup-password-input"
              value={password}
              onFocus={(e) => {
                e.preventDefault();
                setLablePasswordColor(LABLE_FOCUS_COLOR);
              }}
              onBlur={(e) => {
                e.preventDefault();
                setTimeout(() => {
                  setLablePasswordColor(LABLE_DEFAULT_COLOR);
                  validate(VALIDATION_CONSTANTS.PASSWORD_INPUT);
                }, 100);
              }}
              onChange={(e) => {
                e.preventDefault();
                setPassword(e.target.value);
                if (passwordErrorMessage)
                  validate(VALIDATION_CONSTANTS.PASSWORD_INPUT, e.target.value);
                if (confirmPasswordErrorMessage)
                  validate(VALIDATION_CONSTANTS.CONFIRM_PASSWORD_INPUT);
              }}
            />
            <div
              className="password-show-hide-icon"
              onClick={() =>
                handleShowHidePassword(VALIDATION_CONSTANTS.PASSWORD_INPUT)
              }
            >
              {showPassword ? <BiSolidHide /> : <BiSolidShow />}
            </div>
          </div>
          {confirmPasswordErrorMessage ? (
            <div className="signup-error-message">
              {confirmPasswordErrorMessage}
            </div>
          ) : null}
          <div className="signup-confirm-password-body">
            <div
              className="signup-confirm-password-text"
              style={{ color: `${lableConfirmPasswordColor}` }}
            >
              confirm password
            </div>
            <input
              type={showConfirmPassword ? "text" : "password"}
              className="signup-confirm-password-input"
              value={confirmPassword}
              onFocus={(e) => {
                e.preventDefault();
                setLableConfirmPasswordColor(LABLE_FOCUS_COLOR);
              }}
              onBlur={(e) => {
                e.preventDefault();
                setTimeout(() => {
                  setLableConfirmPasswordColor(LABLE_DEFAULT_COLOR);
                  validate(VALIDATION_CONSTANTS.CONFIRM_PASSWORD_INPUT);
                }, 100);
              }}
              onChange={(e) => {
                e.preventDefault();
                setConfirmPassword(e.target.value);
                if (confirmPasswordErrorMessage)
                  validate(
                    VALIDATION_CONSTANTS.CONFIRM_PASSWORD_INPUT,
                    e.target.value
                  );
              }}
            />
            <div
              className="password-show-hide-icon"
              onClick={() =>
                handleShowHidePassword(
                  VALIDATION_CONSTANTS.CONFIRM_PASSWORD_INPUT
                )
              }
            >
              {showConfirmPassword ? <BiSolidHide /> : <BiSolidShow />}
            </div>
          </div>
          <div className="signup-button-cover">
            <LoginButton
              text="sign up"
              onClick={handleEmailSignUp}
              icon2={<IoLogIn />}
            />
          </div>
        </div>
        <p className="signup-or-text">or</p>
        <div className="signup-google-cover">
          <LoginButton
            text="sign up with google"
            icon={<FaGoogle />}
            onClick={handleGoogleSignUp}
          />
        </div>
        <div className="signup-already-text-cover" onClick={navigateToLogin}>
          already have an account?
          <IoLogIn style={{ position: "relative", top: "2px" }} />
        </div>
      </div>
    </>
  );
};

export default SignUp;
