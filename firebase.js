// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAvmVWjMYOhW3SgFSRLyI8x5NhS95J2bZE",
  authDomain: "twitterclone-12326.firebaseapp.com",
  projectId: "twitterclone-12326",
  storageBucket: "twitterclone-12326.appspot.com",
  messagingSenderId: "351242993932",
  appId: "1:351242993932:web:e3cd7a6da6f95224a88929",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export default app;
export { db, storage };
