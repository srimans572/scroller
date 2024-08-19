// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCXQcGsRZUBvbnlAKRfmw1WFeaLy2byEfQ",
  authDomain: "scholar-285bd.firebaseapp.com",
  projectId: "scholar-285bd",
  storageBucket: "scholar-285bd.appspot.com",
  messagingSenderId: "882990801711",
  appId: "1:882990801711:web:1e8dab4b943f31b4c377da",
  measurementId: "G-SPHNWES1LV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const analytics = getAnalytics(app);
export const db = getFirestore(app);