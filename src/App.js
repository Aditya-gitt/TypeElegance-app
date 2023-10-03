import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { auth } from "./firebase";
import { useSelector, useDispatch } from "react-redux";
import { CHANGE_USER } from "./states/authSlice";
import { onAuthStateChanged } from "firebase/auth";
import AuthLayout from "./layouts/AuthLayout";
import WebLayout from "./layouts/WebLayout";
import { AUTH_ROUTE, WEB_ROUTE } from "./constants/routes_url_constants";
import PopUp from "./components/popUp/PopUp";

function App() {
  // const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      dispatch(CHANGE_USER(currentUser));
    });
  }, []);

  return (
    <>
      <PopUp />
      <BrowserRouter>
        <Routes>
          <Route path={AUTH_ROUTE + "/*"} element={<AuthLayout />} />
          <Route path={WEB_ROUTE + "/*"} element={<WebLayout />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
