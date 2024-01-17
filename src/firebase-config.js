import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDltevMW-fngCXxf6r5hnSpaduWgE8qVu8",
  authDomain: "girls-day-c87cf.firebaseapp.com",
  projectId: "girls-day-c87cf",
  storageBucket: "girls-day-c87cf.appspot.com",
  messagingSenderId: "768535166728",
  appId: "1:768535166728:web:e2eba4fe79f4332a0d76bd",
  measurementId: "G-ZLLKBSBVW8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const dbCollection = collection;
export const dbDoc = doc;
export const dbSet = setDoc;

