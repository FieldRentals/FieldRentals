import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

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

export async function addEquipmentData(uid, data, image) {
  try {
    // Ensure all required fields are present
    if (!data.Name || !data.Description || !data.Location || !data.Price) {
      throw new Error("Name, description, and location are required fields.");
    }

    // Step 1: Add initial data to Firestore and get the document reference
    const equipmentRef = doc(db, "equipments", uid);
    await setDoc(equipmentRef, {
      Owner: data.Owner,
      Description: data.Description,
      Location: data.Location,
      Price: data.Price,
    });

    // Step 2: Check if the image is provided
    if (image) {
      // Get the file extension
      const fileExtension = image.name.split(".").pop();
      const imageName = `image.${fileExtension}`; // e.g., image.jpg

      // Step 3: Upload the image to Firebase Storage
      const storage = getStorage();
      const imageRef = ref(storage, `${uid}/${imageName}`); // Include the extension
      await uploadBytes(imageRef, image); // Upload the image file

      // Step 4: Get the download URL for the uploaded image
      const imageUrl = await getDownloadURL(imageRef);

      // Step 5: Update the Firestore document with the image URL
      await setDoc(equipmentRef, { Image: imageUrl }, { merge: true });
    }

    console.log("Equipment added successfully with image URL!");
  } catch (error) {
    console.error("Error updating document:", error);
    throw error; // Propagate error
  }
}
