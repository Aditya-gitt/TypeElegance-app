import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "@redux-saga/core";
import authReducer from "./states/authSlice";
import popUpReducer from "./states/popUpSlice";
import AuthenticationSaga from "./sagas/AuthenticationSaga";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    auth: authReducer,
    popUp: popUpReducer,
  },
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(AuthenticationSaga);
