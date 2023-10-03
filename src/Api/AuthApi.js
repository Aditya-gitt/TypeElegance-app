import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase";
import axios from "axios";
import { SERVER_BASE_URL } from "../constants/auth_constants";

export const authenticateWithEmail = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signUpWithEmail = async (email, password) => {
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const authenticateWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  return await signInWithPopup(auth, provider);
};

export const logOut = async () => {
  return await signOut(auth);
};
