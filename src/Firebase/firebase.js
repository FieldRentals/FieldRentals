import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCDxwbqLb8ENI3YrDKh_5HEF9l2M6yLeeE",
  authDomain: "fieldrentals-14e9b.firebaseapp.com",
  projectId: "fieldrentals-14e9b",
  storageBucket: "fieldrentals-14e9b.appspot.com",
  messagingSenderId: "208031245983",
  appId: "1:208031245983:web:a7f6b8e07bdd431ab164aa",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
