import React from 'react';
import './App.css';

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectiuonData } from 'react-firebase-hooks/firestore';

firebase.initializeApp({
  apiKey: "AIzaSyDzK_rT73XCYPNOw0soKnw5jyEPkCjW2YQ",
  authDomain: "big-eaters.firebaseapp.com",
  projectId: "big-eaters",
  storageBucket: "big-eaters.appspot.com",
  messagingSenderId: "1033729595104",
  appId: "1:1033729595104:web:aa0e61ceb7ae4f909d2285",
  measurementId: "G-K9Q6400LJR"
})

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {

  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Planet Eater</h1>
        <SignOut />
      </header>

      <section>
        {user ? <Postings /> : <SignInButton />}
      </section>
    </div>
  );
}

function Postings() {

}

function SignInButton() {
  const signInWithGoogle = () => {
    const provider =  new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  return(
    <button className="sign-in" onClick={signInWithGoogle}>Sign in with Google</button>
  )
}

function SignOut() {
  return auth.currentUser && (
    <button className="sign-out" onClick={() => auth.signOut()}>Sign Out</button>
  )
}

export default App;
