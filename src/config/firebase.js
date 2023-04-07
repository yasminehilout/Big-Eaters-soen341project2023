import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyDzK_rT73XCYPNOw0soKnw5jyEPkCjW2YQ",
  authDomain: "big-eaters.firebaseapp.com",
  projectId: "big-eaters",
  storageBucket: "big-eaters.appspot.com",
  messagingSenderId: "1033729595104",
  appId: "1:1033729595104:web:aa0e61ceb7ae4f909d2285",
  measurementId: "G-K9Q6400LJR"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;