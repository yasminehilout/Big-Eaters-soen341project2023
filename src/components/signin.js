import { auth, googleProvider } from '../config/firebase';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useState } from 'react';

//REDUX
// import { useDispatch } from 'react-redux';
// import { setUserAuthenticated } from './action';

// Login component
export const LoginMenu = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

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
            await signInWithPopup(auth, googleProvider);
            window.location.reload();

            // dispatch(setUserAuthenticated(true));
        } catch (err) {
            console.error(err);
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
        </>

    );
}