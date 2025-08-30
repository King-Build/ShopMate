import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDIxpAfSoFscSC06nf6Dj5sbyMtcol5exQ",
  authDomain: "shopping-309bd.firebaseapp.com",
  projectId: "shopping-309bd",
  storageBucket: "shopping-309bd.firebasestorage.app",
  messagingSenderId: "507492441131",
  appId: "1:507492441131:web:43aab28efa4f95fd725e6e",
  measurementId: "G-LLR46LWK25"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();