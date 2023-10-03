import { call, put, takeEvery } from "redux-saga/effects";
import {
  AUTHENTICATE_WITH_EMAIL,
  AUTHENTICATE_WITH_GOOGLE,
  SIGNUP_WITH_EMAIL,
  SIGNUP_WITH_GOOGLE,
} from "../constants/action_type_constants";
import {
  AUTHENTICATION_SUCCESS,
  AUTHENTICATION_FAIL,
} from "../states/authSlice";
import {
  logOut,
  authenticateWithGoogle,
  authenticateWithEmail,
  signUpWithEmail,
} from "../Api/AuthApi";
import { POP_NOW } from "../states/popUpSlice";
import {
  POP_TYPE_ERROR,
  POP_TYPE_SUCCESS,
} from "../constants/popUpConstants/pop_up_type_constants";
import {
  POP_MESSAGE_ACCOUNT_CREATION_SUCCESS,
  POP_MESSAGE_AUTHENTICATED_SUCCESS,
} from "../constants/popUpConstants/pop_up_message_constants";
import {
  EMAIL_PROVIDER_NOT_AVAILABLE,
  FIREBASE_USER_EXISTS_ERROR,
  GOOGLE_PROVIDER_NOT_AVAILABLE,
} from "../constants/firebase_constants";
import Cookies from "js-cookie";
import {
  SERVER_BASE_URL,
  TOKEN_KEY,
  TOKEN_PREFIX,
} from "../constants/auth_constants";

function* AuthenticateWithEmail(action) {
  try {
    const user = yield call(
      authenticateWithEmail,
      action.payload.email,
      action.payload.password
    );
    Cookies.set(TOKEN_KEY, TOKEN_PREFIX + user.accessToken, {
      secure: true,
      sameSite: "strict",
      expires: 7,
    });
    yield put(AUTHENTICATION_SUCCESS({ user }));
    yield put(
      POP_NOW({
        type: POP_TYPE_SUCCESS,
        message: POP_MESSAGE_AUTHENTICATED_SUCCESS,
      })
    );
  } catch (e) {
    console.log(e.message);
    yield put(AUTHENTICATION_FAIL());
    if (e.code === FIREBASE_USER_EXISTS_ERROR)
      yield put(
        POP_NOW({ type: POP_TYPE_ERROR, message: EMAIL_PROVIDER_NOT_AVAILABLE })
      );
    else yield put(POP_NOW({ type: POP_TYPE_ERROR, message: e.code }));
  }
}

function* SignUpWithEmail(action) {
  try {
    const user = yield call(
      signUpWithEmail,
      action.payload.email,
      action.payload.password
    );
    Cookies.set("jwt", "Bearer " + user.accessToken);
    yield put(
      POP_NOW({
        type: POP_TYPE_SUCCESS,
        message: POP_MESSAGE_ACCOUNT_CREATION_SUCCESS,
      })
    );
  } catch (e) {
    if (e.code === FIREBASE_USER_EXISTS_ERROR)
      yield put(
        POP_NOW({ type: POP_TYPE_ERROR, message: EMAIL_PROVIDER_NOT_AVAILABLE })
      );
    else yield put(POP_NOW({ type: POP_TYPE_ERROR, message: e.code }));
  }
}

function* AuthenticateWithGoogle(action) {
  try {
    const result = yield call(authenticateWithGoogle);
    if (action.payload.signUp)
      yield put(
        POP_NOW({
          type: POP_TYPE_SUCCESS,
          message: POP_MESSAGE_ACCOUNT_CREATION_SUCCESS,
        })
      );
    //For signup
    else {
      Cookies.set(TOKEN_KEY, TOKEN_PREFIX + result.user.accessToken, {
        secure: true,
        sameSite: "strict",
        expires: 7,
      });
      yield put(AUTHENTICATION_SUCCESS({ user: result.user }));
      yield put(
        POP_NOW({
          type: POP_TYPE_SUCCESS,
          message: POP_MESSAGE_AUTHENTICATED_SUCCESS,
        })
      );
    } //for login
  } catch (e) {
    console.log(e.message);
    //For signup
    if (action.payload.signUp)
      yield put(POP_NOW({ type: POP_TYPE_ERROR, message: e.message }));
    //For login
    else {
      yield put(AUTHENTICATION_FAIL());
      if (e.message === FIREBASE_USER_EXISTS_ERROR) {
        yield put(
          POP_NOW({
            type: POP_TYPE_ERROR,
            message: GOOGLE_PROVIDER_NOT_AVAILABLE,
          })
        );
      } else
        yield put(
          POP_NOW({
            type: POP_TYPE_ERROR,
            message: e.message,
          })
        );
    }
  }
}

function* AuthenticationSaga() {
  yield takeEvery(SIGNUP_WITH_EMAIL, SignUpWithEmail);
  yield takeEvery(SIGNUP_WITH_GOOGLE, AuthenticateWithGoogle);
  yield takeEvery(AUTHENTICATE_WITH_EMAIL, AuthenticateWithEmail);
  yield takeEvery(AUTHENTICATE_WITH_GOOGLE, AuthenticateWithGoogle);
}

export default AuthenticationSaga;
