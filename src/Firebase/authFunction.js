import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "./firebase";
import { createInitalUser } from "./firebbaseFunctions";

export async function signUp(email, password) {
  try {
    // Create the user with email and password
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    // Get the user ID
    const user = userCredential.user;

    createInitalUser(user);

    console.log("User signed up and profile created");
  } catch (error) {
    console.error("Error signing up:", error.message);
  }
}

export async function signIn(email, password) {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error("Error signing in:", error.message);
  }
}

export async function signOutUser() {
  // const auth = getAuth();
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      console.log("Sign-out successful");
    })
    .catch((error) => {
      // An error happened.
      console.log("Sign-out unsuccessful:", error);
    });
}
