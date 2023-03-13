import { auth } from '../config/firebase';
import { signOut } from 'firebase/auth';


// Logout button component
export const LogoutMenu = () => {
    const logout = async () => {
        try{
            await signOut(auth);
        } catch (err) {
            console.error(err);
        }
    };
    return (
        <button onClick={logout}> Logout </button>
    );
}