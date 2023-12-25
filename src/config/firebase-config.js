// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBqopOYRP6tM3xjtmlKURyCmqz95Rjvu8M",
  authDomain: "expenses-53725.firebaseapp.com",
  projectId: "expenses-53725",
  storageBucket: "expenses-53725.appspot.com",
  messagingSenderId: "581356500529",
  appId: "1:581356500529:web:49e3550f9e222eade30710",
  measurementId: "G-XGXKLN7W22",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
