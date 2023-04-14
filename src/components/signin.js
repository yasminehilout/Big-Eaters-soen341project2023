import { auth, googleProvider, db } from '../config/firebase';
import { updateDoc, getDoc, setDoc, doc } from "firebase/firestore";
import { signInWithPopup } from 'firebase/auth';
import { useDispatch } from 'react-redux'
import { setRole } from '../features/counter/profileSlice';

/**
 * The LoginMenu function allows users to sign in with Google as either a student or an employer and
 * updates their role in the database accordingly.
 * @returns A React component that renders two buttons for signing in as a student or an employer using
 * Google authentication. When a user clicks on either button, the corresponding sign-in function is
 * called, which updates the user's role in the database and dispatches an action to update the role in
 * the Redux store. If there is no existing user document in the database, a new one is created with
 * default values for the
 */
export const LoginMenu = () => {
    const dispatch = useDispatch();

    /**
     * The function signs in a user with Google authentication and sets their role as a student in a
     * Firebase database.
     */
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
                    website: "",
                    industry: "",
                    vision: "",
                    location: ""
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

    /**
     * The function signs in a user with their Google account and sets their role as an employer in a
     * Firebase database.
     */
    const signInWithGoogleEmployer = async () => {
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
                    await updateDoc(docRef, { role: "employer" });
                    dispatch(setRole({
                        role: "employer"
                    })) 
                }
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
                    website: "",
                    industry: "",
                    vision: "",
                    location: ""
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

    /* This is the JSX code that is returned by the `LoginMenu` function. It renders two buttons with
    class name "b-signIn" that allow users to sign in as either a student or an employer using
    Google authentication. When a user clicks on either button, the corresponding
    `signInWithGoogleStudent` or `signInWithGoogleEmployer` function is called, which updates the
    user's role in the database and dispatches an action to update the role in the Redux store. */
    return (
        <>
            <button className="b-signIn" onClick={signInWithGoogleStudent}>Sign in as a Student</button>

            <button className="b-signIn" onClick={signInWithGoogleEmployer}>Sign in as an Employer</button>
        </>
    );
}
