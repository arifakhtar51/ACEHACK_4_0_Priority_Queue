import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs, doc, setDoc ,updateDoc,deleteDoc} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD4AiBLmazvx1OPvPVZLU8HdYUJewWA24Y",
  authDomain: "sage-ed.firebaseapp.com",
  projectId: "sage-ed",
  storageBucket: "sage-ed.firebasestorage.app",
  messagingSenderId: "361303083868",
  appId: "1:361303083868:web:679a364b1bb113f3d80f99"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);

export { collection, addDoc, getDocs, doc, setDoc,updateDoc,deleteDoc };