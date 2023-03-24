import { auth, googleProvider, db } from '../config/firebase';
import {query, collection, getDocs, where, setDoc, doc } from "firebase/firestore";
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useState } from 'react';

//REDUX
// import { useDispatch } from 'react-redux';
// import { setUserAuthenticated } from './action';

// Login component
export const LoginMenu = ({setView}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const studentProfileRef = collection(db, "studentprofile");
    // const dispatch = useDispatch();


    const signIn = async () => {
        try{
            await createUserWithEmailAndPassword(auth, email, password);
            window.location.reload();
            // dispatch(setUserAuthenticated(true));
        } catch (err) {
            console.error(err);
        }
        
    };

    const signInWithGoogle = async () => {
        try{

            const res = await signInWithPopup(auth, googleProvider);
            window.location.reload();
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
                // call setView() here and pass it the usertype, will setUserView in app.js and reload page
                // to get rid of buttons in navbar 
            }           
            // dispatch(setUserAuthenticated(true));

        } catch (err) {
            console.error(err);
            alert(err.message);
        }
    };

    return (
        <>
            <input 
                className="b-input"
                placeholder="Email..." 
                onChange={(e) => setEmail(e.target.value)}
            />
            
            <input 
                className="b-input"
                placeholder="Password..."
                type="password"
                onChange={(e) => setPassword(e.target.value)}
            />

            <button className="b-signIn" onClick={signIn}> Sign In</button>

            <button className="b-signIn" onClick={signInWithGoogle}> Sign In With Google</button>

             {/* //added */}

            <label class="userSet">
                Employer
                <input 
                    type="radio"
                    name="userSet"
                    onClick={() => {setView("employer")}}
                />
                <span class="userCheck"></span>
            </label>
           
            <label class="userSet">
                Student
                <input
                    type="radio"
                    name="userSet"
                    onClick={() => {setView("student")}}
                />
                <span class="userCheck"></span>
            </label>
        </>

    );
}