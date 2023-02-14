// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDzK_rT73XCYPNOw0soKnw5jyEPkCjW2YQ",
  authDomain: "big-eaters.firebaseapp.com",
  projectId: "big-eaters",
  storageBucket: "big-eaters.appspot.com",
  messagingSenderId: "1033729595104",
  appId: "1:1033729595104:web:aa0e61ceb7ae4f909d2285",
  measurementId: "G-K9Q6400LJR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);