import { auth, googleProvider, db } from '../config/firebase';
import { updateDoc, getDoc, setDoc, doc } from "firebase/firestore";
import { signInWithPopup } from 'firebase/auth';
import { useDispatch } from 'react-redux'
import { setRole } from '../features/counter/profileSlice';

//REDUX
// import { useDispatch } from 'react-redux';
// import { setUserAuthenticated } from './action';

// Login component
export const LoginMenu = () => {
    const dispatch = useDispatch();

    // Student sign-in
    const signInWithGoogleStudent = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            const user = auth.currentUser;
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                if (docSnap.data().isAdmin === true) {
                    await updateDoc(docRef, { role: "admin" })
                    dispatch(setRole({
                        role: "admin"
                    }))
                } else {
                    await updateDoc(docRef, { role: "student" });
                    dispatch(setRole({
                        role: "student"
                    })) 
                }
                //console.log("Document data:", docSnap.data());
            } else {
                await setDoc(doc(db, "users", user.uid), {
                    userId: user.uid,
                    authProvider: "google",
                    role: "student",
                    email: user.email,
                    firstName: "",
                    lastName: "",
                    educationLevel: "",
                    organization: "",
                    isAdmin: false,
                });
                dispatch(setRole({
                    role: "student"
                }))
            }
            // dispatch(setUserAuthenticated(true));

        } catch (err) {
            console.error(err);
            alert(err.message);
        }
    };

    //Employer sign-in
    const signInWithGoogleEmployer = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            const user = auth.currentUser;
            // console.log(user.uid);
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                if (docSnap.data().isAdmin === true) {
                    await updateDoc(docRef, { role: "admin" })
                    dispatch(setRole({
                        role: "admin"
                    }))
                } else {
                    await updateDoc(docRef, { role: "employer" });
                    dispatch(setRole({
                        role: "employer"
                    })) 
                }
                //console.log("Document data:", docSnap.data());
            } else {
                await setDoc(doc(db, "users", user.uid), {
                    userId: user.uid,
                    authProvider: "google",
                    role: "employer",
                    email: user.email,
                    firstName: "",
                    lastName: "",
                    educationLevel: "",
                    organization: "",
                    isAdmin: false,
                });
                dispatch(setRole({
                    role: "employer"
                }))
            }
            // dispatch(setUserAuthenticated(true));

        } catch (err) {
            console.error(err);
            alert(err.message);
        }
    };

    return (
        <>
            <button className="b-signIn" onClick={signInWithGoogleStudent}>Sign in as a Student</button>

            <button className="b-signIn" onClick={signInWithGoogleEmployer}>Sign in as an Employer</button>
        </>

    );
}