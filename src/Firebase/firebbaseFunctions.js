import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase";

export async function createInitalUser(user) {
  const userProfile = {
    email: user.email,
  };

  const userDocRef = doc(db, "users", user.uid);
  await setDoc(userDocRef, userProfile);
}

export async function getUserData(uid) {
  try {
    const userDocRef = doc(db, "users", uid);
    const docSnapshot = await getDoc(userDocRef);

    if (docSnapshot.exists()) {
      return docSnapshot.data();
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error getting document:", error);
    return null;
  }
}

export async function updateUserData(uid, data) {
  try {
    const userDocRef = doc(db, "users", uid);
    await setDoc(userDocRef, data);
  } catch (error) {
    console.error("Error updating document:", error);
  }
}
