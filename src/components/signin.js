import { auth, googleProvider, db } from '../config/firebase';
import { getDoc, setDoc, doc } from "firebase/firestore";
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useState } from 'react';

//REDUX
// import { useDispatch } from 'react-redux';
// import { setUserAuthenticated } from './action';

// Login component
export const LoginMenu = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const profileRef = collection(db, "users");
    // const dispatch = useDispatch();

    const signIn = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            window.location.reload();
        } catch (err) {
            console.error(err);
        }

    };

    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            const user = auth.currentUser;
            console.log(user.uid);
            const docRef = doc(db, "studentprofile", user.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());
            } else {
                await setDoc(doc(db, "studentprofile", user.uid), {
                    userId: user.uid,
                    authProvider: "google",
                    role: "student",
                    email: user.email,
                    firstName: "",
                    lastName: "",
                    educationLevel: ""
                });
            }
            // dispatch(setUserAuthenticated(true));

        } catch (err) {
            console.error(err);
            alert(err.message);
        }
    };

    const signInWithGoogleEmployer = async () => {
        try{

            const res = await signInWithPopup(auth, googleProvider);
            //window.location.reload();
            const user = res.user;
            const q = query(profileRef, where("uid", "==", user.uid));
            const docs = await getDocs(q);
            if (docs.docs.length === 0) {
                await setDoc(doc(db, "users", user.uid), {
                    uid: user.uid,
                    authProvider: "google",
                    role: "employer",
                    email: user.email,
                    firstName:"",
                    lastName:"",
                    organization:""
                });
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

            <button className="b-signIn" onClick={signInWithGoogleStudent}>Sign in as a Student</button>

            <button className="b-signIn" onClick={signInWithGoogleEmployer}>Sign in as an Employer</button>
        </>

    );
}