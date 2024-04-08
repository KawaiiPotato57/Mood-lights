import { auth, db } from "./script.js";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  updateDoc,
  Timestamp, // Import Timestamp for Firestore Timestamps
} from 'firebase/firestore';


async function updateOrAddMood(date, mood, moodColor) {
  try {
    const user = auth.currentUser;
    if (user) {
      const moodsCollection = collection(db, "mood-data");
      const dateString = date.toDateString();
      console.log("Date:", dateString);
      // Convert JavaScript Date object to Firestore Timestamp

      // Construct a query to find all mood documents for the user and date
      const q = query(
        moodsCollection,
        where("userId", "==", user.uid),
        where("date", "==", dateString)
      );

      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        // No matching documents, create a new one
        const docRef = await addDoc(moodsCollection, {
          userId: user.uid,
          mood: mood,
          moodColor: moodColor,
          date: dateString,
        });
        console.log("Document written with ID: ", docRef.id);
        return;
      }

      // Process all matching documents
      for (const doc of snapshot.docs) {
        // Update existing document with new mood and color
        const docRef = doc.ref;
        console.log("Updating document:", docRef);
        await updateDoc(docRef, { mood: mood, moodColor: moodColor });
        console.log("Document updated:", docRef.id);
      }
    } else {
      console.error("No user signed in.");
    }
  } catch (error) {
    console.error("Error updating mood data: ", error);
  }
}

export { updateOrAddMood };
