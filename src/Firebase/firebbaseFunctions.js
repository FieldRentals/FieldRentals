import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  addDoc,
  orderBy,
  Timestamp,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
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

export async function getEquipmentData() {
  const q = query(
    collection(db, "equipments"),
    orderBy("TimeStamp") // Sort by the timestamp field
  );
  const querySnapshot = await getDocs(q);

  const equipmentData = [];
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    // Check if the status is 'Available'
    if (data.Status === "Available") {
      equipmentData.push(data);
    }
  });

  return equipmentData;
}

export async function addEquipmentData(uid, data, image) {
  try {
    // Ensure all required fields are present
    console.log(data.Name, data.Description, data.Location, data.Price);

    if (!data.Name || !data.Description || !data.Location || !data.Price) {
      throw new Error(
        "Name, description, location, and price are required fields."
      );
    }

    // Step 1: Add initial data to Firestore and get the document reference
    const equipmentCollectionRef = collection(db, "equipments");
    const equipmentDocRef = await addDoc(equipmentCollectionRef, {
      Name: data.Name,
      Owner: data.Owner,
      Description: data.Description,
      Location: data.Location,
      Price: data.Price,
      Status: "Available",
      TimeStamp: serverTimestamp(),
      EquipmentId: "", // Placeholder for the ID
    });

    const equipmentId = equipmentDocRef.id; // Get the generated ID

    // Step 2: Update the document with the generated ID
    await setDoc(
      equipmentDocRef,
      { EquipmentId: equipmentId },
      { merge: true }
    );

    // Step 3: Check if the image is provided
    if (image) {
      // Get the file extension
      const fileExtension = image.name.split(".").pop();
      const imageName = `image.${fileExtension}`; // e.g., image.jpg

      // Step 4: Upload the image to Firebase Storage
      const storage = getStorage();
      const imageRef = ref(storage, `${equipmentId}/${imageName}`); // Use the generated ID
      await uploadBytes(imageRef, image); // Upload the image file

      // Step 5: Get the download URL for the uploaded image
      const imageUrl = await getDownloadURL(imageRef);

      // Step 6: Update the Firestore document with the image URL
      await setDoc(equipmentDocRef, { Image: imageUrl }, { merge: true });
    }

    console.log("Equipment added successfully with image URL!");
  } catch (error) {
    console.error("Error updating document:", error);
    throw error; // Propagate error
  }
}

// export async function retrieveAndUpdateEquipment() {
//   try {
//     // Step 1: Reference to the equipments collection
//     const equipmentCollectionRef = collection(db, "equipments");

//     // Step 2: Retrieve all equipment documents
//     const querySnapshot = await getDocs(equipmentCollectionRef);

//     // Step 3: Loop through each document
//     for (const docSnapshot of querySnapshot.docs) {
//       const equipmentId = docSnapshot.id; // Get the document ID

//       // Step 4: Update the document to add the EquipmentId field
//       await setDoc(
//         doc(db, "equipments", equipmentId),
//         { EquipmentId: equipmentId },
//         { merge: true }
//       );

//       console.log(`Equipment ID ${equipmentId} updated successfully!`);
//     }

//     console.log("All equipment updated successfully!");
//   } catch (error) {
//     console.error("Error retrieving or updating equipment:", error);
//     throw error; // Propagate error
//   }
// }

// retrieveAndUpdateEquipment();

export async function bookEquipment(
  userUid,
  equipmentId,
  pickupDate,
  dropOffDate
) {
  const equipmentDocRef = doc(db, "equipments", equipmentId);
  const rentalHistoryDocRef = doc(db, "rentalHistory", userUid);

  try {
    // Check if rental history document exists
    const rentalHistoryDoc = await getDoc(rentalHistoryDocRef);
    const rentalData = rentalHistoryDoc.exists() ? rentalHistoryDoc.data() : {};

    // Determine the next rent number
    let rentNumber = 1;
    while (rentalData[`Rent ${rentNumber}`]) {
      rentNumber++;
    }

    // Create new rent entry
    const rentEntry = {
      EquipmentID: equipmentId,
      PickUpDate: pickupDate,
      DropOffDate: dropOffDate,
    };

    // If the rental history document doesn't exist, create it with the first rent entry
    if (!rentalHistoryDoc.exists()) {
      await setDoc(rentalHistoryDocRef, { [`Rent ${rentNumber}`]: rentEntry });
    } else {
      // Update existing rental history document
      await updateDoc(rentalHistoryDocRef, {
        [`Rent ${rentNumber}`]: rentEntry,
      });
    }

    // Update equipment status
    await updateDoc(equipmentDocRef, {
      Status: "Not Available",
      RentedBy: userUid,
      DropOffDate: dropOffDate,
    });
    console.log("Equipment status updated to Not Available");
  } catch (error) {
    console.error("Error booking equipment:", error);
    throw error; // Propagate error
  }
}

// In your Firebase functions file

export async function getRentalHistory(uid) {
  try {
    const rentalHistoryRef = doc(db, "rentalHistory", uid);
    const rentalHistorySnap = await getDoc(rentalHistoryRef);

    if (rentalHistorySnap.exists()) {
      const rentalData = rentalHistorySnap.data();
      const rentalPromises = [];

      for (const rentKey in rentalData) {
        const rental = rentalData[rentKey];
        const equipmentRef = doc(db, "equipments", rental.EquipmentID);
        rentalPromises.push(
          getDoc(equipmentRef).then((equipmentSnap) => {
            if (equipmentSnap.exists()) {
              return {
                equipmentName: equipmentSnap.data().Name,
                equipmentImage: equipmentSnap.data().Image,
                pickUpDate: rental.PickUpDate,
                dropOffDate: rental.DropOffDate,
              };
            }
            return null;
          })
        );
      }

      const rentalHistoryWithDetails = await Promise.all(rentalPromises);
      return rentalHistoryWithDetails.filter((rental) => rental !== null);
    } else {
      console.log("No rental history found for this user.");
      return [];
    }
  } catch (error) {
    console.error("Error getting rental history: ", error);
    return [];
  }
}

export async function getUserEquipment(uid) {
  try {
    const equipmentQuery = query(
      collection(db, "equipments"),
      where("Owner", "==", uid)
    );

    const querySnapshot = await getDocs(equipmentQuery);
    const equipmentData = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      const equipmentDetails = {
        id: doc.id,
        ...data,
      };

      // If the equipment is not available, add the drop-off date if it exists
      if (data.Status === "Not Available" && data.DropOffDate) {
        equipmentDetails.dropOffDate = data.DropOffDate;
      }

      return equipmentDetails;
    });

    return equipmentData;
  } catch (error) {
    console.error("Error fetching equipment data: ", error);
    return [];
  }
}

// Function to relist equipment
export async function relistEquipment(equipmentId) {
  const equipmentDocRef = doc(db, "equipments", equipmentId);

  try {
    await updateDoc(equipmentDocRef, {
      Status: "Available",
      RentedBy: null, // Clear the renter information
      DropOffDate: null, // Clear the drop-off date
    });
    console.log("Equipment has been relisted successfully.");
  } catch (error) {
    console.error("Error relisting equipment:", error);
    throw error; // Propagate error
  }
}
