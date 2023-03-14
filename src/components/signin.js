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
            // dispatch(setUserAuthenticated(true));
        } catch (err) {
            console.error(err);
        }
        
    };

    const signInWithGoogle = async () => {
        try{
            await signInWithPopup(auth, googleProvider);
            // dispatch(setUserAuthenticated(true));
        } catch (err) {
            console.error(err);
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