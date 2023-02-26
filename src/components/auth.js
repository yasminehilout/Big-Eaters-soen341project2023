import { auth, googleProvider } from '../config/firebase';
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { useState } from 'react';

export const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signIn = async () => {
        try{
            await createUserWithEmailAndPassword(auth, email, password);
        } catch (err) {
            console.error(err);
        }
    };

    const signInWithGoogle = async () => {
        try{
            await signInWithPopup(auth, googleProvider);
        } catch (err) {
            console.error(err);
        }
    };

    const logout = async () => {
        try{
            await signOut(auth);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div class="auth-div" align="right">
            <input 
                class="b-input"
                placeholder="Email..." 
                onChange={(e) => setEmail(e.target.value)}
            />
            
            <input 
                class="b-input"
                placeholder="Password..."
                type="password"
                onChange={(e) => setPassword(e.target.value)}
            />
            <button class="b-signIn" onClick={signIn}> Sign In</button>

            <button class="b-signIn" onClick={signInWithGoogle}> Sign In With Google</button>
                
            <button class="b-signIn" onClick={logout}> Logout </button>
        </div>
    );
};