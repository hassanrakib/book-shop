import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebase.config";

export default function initializeFirebaseApp() {
  return initializeApp(firebaseConfig);
};
