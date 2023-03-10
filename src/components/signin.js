import { auth, googleProvider, db } from '../config/firebase';
import {query, collection, getDocs, where, setDoc, doc } from "firebase/firestore";
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useState } from 'react';

// Login component
export const LoginMenu = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const studentProfileRef = collection(db, "studentprofile");

    const signIn = async () => {
        try{
            await createUserWithEmailAndPassword(auth, email, password);
        } catch (err) {
            console.error(err);
        }
    };

    const signInWithGoogle = async () => {
        try{
            const res = await signInWithPopup(auth, googleProvider);
            const user = res.user;
            const q = query(studentProfileRef, where("uid", "==", user.uid));
            const docs = await getDocs(q);
            if (docs.docs.length === 0) {
                await setDoc(doc(db, "studentprofile", user.uid), {
                    uid: user.uid,
                    authProvider: "google",
                    role: "student",
                    email: user.email,
                    firstName:"",
                    lastName:"",
                    educationLevel:"",
                });
            }
        } catch (err) {
            console.error(err);
            alert(err.message);
        }
    };

    return (
        <div>
            <input 
                placeholder="Email..." 
                onChange={(e) => setEmail(e.target.value)}
            />
            <input 
                placeholder="Password..."
                type="password"
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={signIn}> Sign In</button>

            <button onClick={signInWithGoogle}> Sign In With Google</button>
        </div>
    );
}