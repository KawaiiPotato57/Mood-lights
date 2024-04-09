import { auth, db } from "./firebase-config.js";
import {
    collection,
    addDoc,
    getDocs,
    query,
    where,
    updateDoc,
    Timestamp, // Import Timestamp for Firestore Timestamps
} from 'firebase/firestore';
import { getDatabase, ref, set, update } from 'firebase/database';
import axios from 'axios';

// async function updateOrAddMood(date, mood, moodColor) {
//     try {
//         const user = auth.currentUser;
//         if (user) {
//             const moodsCollection = collection(db, "mood-data");
//             const dateString = date.toDateString();
//             console.log("Date:", dateString);
//             // Convert JavaScript Date object to Firestore Timestamp

//             // Construct a query to find all mood documents for the user and date
//             const q = query(
//                 moodsCollection,
//                 where("userId", "==", user.uid),
//                 where("date", "==", dateString)
//             );

//             const snapshot = await getDocs(q);

//             if (snapshot.empty) {
//                 // No matching documents, create a new one
//                 const docRef = await addDoc(moodsCollection, {
//                     userId: user.uid,
//                     mood: mood,
//                     moodColor: moodColor,
//                     date: dateString,
//                 });
//                 console.log("Document written with ID: ", docRef.id);
//                 return;
//             }

//             // Process all matching documents
//             for (const doc of snapshot.docs) {
//                 // Update existing document with new mood and color
//                 const docRef = doc.ref;
//                 console.log("Updating document:", docRef);
//                 await updateDoc(docRef, { mood: mood, moodColor: moodColor });
//                 console.log("Document updated:", docRef.id);
//             }
//         } else {
//             console.error("No user signed in.");
//         }
//     } catch (error) {
//         console.error("Error updating mood data: ", error);
//     }
// }

async function updateOrAddMood(date, mood, moodColor) {
    try {
        const user = auth.currentUser;
        if (user) {
            const moodsCollection = collection(db, "mood-data");
            const currentDate = new Date();
            const currentDateString = currentDate.toDateString();
            const inputDateString = date.toDateString();
            console.log("Current Date:", currentDateString);
            console.log("Input Date:", inputDateString);

            if (currentDateString === inputDateString) {
                // Update mood data for the current date
                const q = query(
                    moodsCollection,
                    where("userId", "==", user.uid),
                    where("date", "==", currentDateString)
                );
                const snapshot = await getDocs(q);
                if (!snapshot.empty) {
                    // Update existing document with new mood and color
                    const docRef = snapshot.docs[0].ref;
                    console.log("Updating document:", docRef);
                    await updateDoc(docRef, { mood: mood, moodColor: moodColor });
                    console.log("Document updated:", docRef.id);
                    return;
                }
            }

            // Add a new mood document for the input date
            const docRef = await addDoc(moodsCollection, {
                userId: user.uid,
                mood: mood,
                moodColor: moodColor,
                date: inputDateString,
            });
            console.log("Document written with ID:", docRef.id);
        } else {
            console.error("No user signed in.");
        }
    } catch (error) {
        console.error("Error updating mood data:", error);
    }
}

async function getUserData() {
    try {
        const user = auth.currentUser;
        if (!user) {
            throw new Error("No user signed in.");
        }

        const userMoodsRef = collection(db, "mood-data");
        const querySnapshot = await getDocs(query(userMoodsRef, where("userId", "==", user.uid)));

        const userData = [];
        querySnapshot.forEach((doc) => {
            userData.push({ id: doc.id, ...doc.data() });
        });
        const userDataArray = await userData;
        console.log('md-service', userDataArray);
        return userData;
    } catch (error) {
        console.error("Error fetching user data:", error);
        return null;
    }
}



const sendColorRealTime = async (color) => {
    try {
        // Get a reference to the database
        const db = getDatabase();

        // Set the color in the database
        await set(ref(db, 'color'), color);

        console.log('Data successfully sent to the database');
    } catch (error) {
        console.error('Error sending data to the database:', error);
    }
};

const bulbToggleRealtime = async (bool) => {
    try {
        // Get a reference to the database
        const db = getDatabase();
        const user = auth.currentUser;

        // Set the color in the database
        // await set(ref(db, 'bulbToggle'), !bool);
        // console.log('Data successfully ', user);
        let email = user.email;
        let atIndex = email.indexOf('.com');
        let name = email.slice(0, atIndex);

        await set(ref(db, 'users/' + name + '/bulbToggle'), !bool);
        // await db.child('users/' + user.uid).set('bulbToggle', !bool);

        console.log('Bulb toggle success');
    } catch (error) {
        console.error('Error bulb toggle:', error);
    }
};

const sendUserDataRealtime = async (mood, isBulbOn) => {
    try {
        // Get a reference to the database
        const db = getDatabase();
        const user = auth.currentUser;

        // Ensure user is authenticated
        if (!user) {
            console.error('No user authenticated');
            return;
        }

        // Extract user email and name
        const email = user.email;
        const atIndex = email.indexOf('.com');
        const name = email.slice(0, atIndex);
        console.log('mood-service', name, mood, !isBulbOn);
        // Set user data in the database
        await set(ref(db, 'users/' + name), {
            mood: mood,
            isBulbOn: !isBulbOn
        });

        console.log('User data successfully sent to the database');
    } catch (error) {
        console.error('Error sending user data to the database:', error);
    }
};

const updateBulbStateRealtime = async (isBulbOn) => {
    try {
        // Get a reference to the database
        const db = getDatabase();
        const user = auth.currentUser;

        // Ensure user is authenticated
        if (!user) {
            console.error('No user authenticated');
            return;
        }

        // Extract user email and name
        const email = user.email;
        const atIndex = email.indexOf('.com');
        const name = email.slice(0, atIndex);

        // Update the isBulbOn state in the user's record
        await update(ref(db, `users/${name}`), { isBulbOn: isBulbOn.toString() });

        console.log('Bulb state updated successfully');
    } catch (error) {
        console.error('Error updating bulb state:', error);
    }
};
// const sendColorRealTime = async (color) => {
//     try {
//         // Define the URL of your Firebase Realtime Database
//         // const databaseURL = 'https://web-led-control-default-rtdb.firebaseio.com/';

//         // Define the endpoint where you want to send the data (e.g., '/lights')
//         // const endpoint = `color: "${color}"`; // Modify this according to your database structure

//         // Construct the full URL including the endpoint
//         // const url = `${databaseURL}${endpoint}`;
//         let db_ref = db.ref();

//         // Create the data object to send to the database
//         const data = {
//             color: color // Modify this based on your data structure
//         };
//         db_ref.child('color').set(color);

//         // Send a POST request to the Firebase Realtime Database using Axios
//         // const response = await axios.post(url, data, {
//         //     headers: {
//         //         'Content-Type': 'application/json'
//         //     }
//         // });

//         // Data successfully sent to the database
//         console.log('Data successfully sent to the database');
//         console.log('Response:', response.data);
//     } catch (error) {
//         // Handle errors
//         console.error('Error sending data to the database:', error);
//     }
// };

// Example usage:
sendColorRealTime('#ffffc7');


export {
    updateOrAddMood, getUserData, sendColorRealTime, bulbToggleRealtime, sendUserDataRealtime, updateBulbStateRealtime
};
