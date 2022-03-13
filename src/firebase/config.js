// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getAuth} from "@firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// get auth to authenticate the user

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAJqPG0LpaXNVh163f702xLCCN18D4Id0c",
  authDomain: "pomo-firebase.firebaseapp.com",
  projectId: "pomo-firebase",
  storageBucket: "pomo-firebase.appspot.com",
  messagingSenderId: "996500562067",
  appId: "1:996500562067:web:e52fc1467a150728a3ed66",
  measurementId: "G-LFWVEMSL7W",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();
export { db, auth };
export default app;
