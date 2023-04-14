import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
//import firebase from './firebase';

/* `const firebaseConfig` is an object that contains the configuration settings for connecting to a
Firebase project. It includes the API key, authentication domain, project ID, storage bucket,
messaging sender ID, app ID, and measurement ID. These settings are used to initialize the Firebase
app and connect to the associated services such as authentication, Firestore database, and storage. */
const firebaseConfig = {
  //databaseURL:   'https://big-eaters.firebaseio.com',
  apiKey: "AIzaSyDzK_rT73XCYPNOw0soKnw5jyEPkCjW2YQ",
  authDomain: "big-eaters.firebaseapp.com",
  projectId: "big-eaters",
  storageBucket: "big-eaters.appspot.com",
  messagingSenderId: "1033729595104",
  appId: "1:1033729595104:web:aa0e61ceb7ae4f909d2285",
  measurementId: "G-K9Q6400LJR"
};

const app = initializeApp(firebaseConfig);
//firebase.firestore().settings({ experimentalForceLongPolling: true });

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;