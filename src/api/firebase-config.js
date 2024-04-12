import {
    getAuth,
    signInWithEmailAndPassword,
    setPersistence,
    browserSessionPersistence,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";


const firebaseConfig = {
    apiKey: "AIzaSyAohm0HB8VcaN8zqyW9KzKSZX4zS8sXBs4",
    authDomain: "web-led-control.firebaseapp.com",
    projectId: "web-led-control",
    storageBucket: "web-led-control.appspot.com",
    messagingSenderId: "1041220023125",
    appId: "1:1041220023125:web:79b166eb10a2db1782b5dc",
    measurementId: "G-BBTE6H2H3L",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { db, auth, signInWithEmailAndPassword, setPersistence, browserSessionPersistence };