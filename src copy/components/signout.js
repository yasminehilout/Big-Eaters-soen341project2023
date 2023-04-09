import { auth } from '../config/firebase';
import { signOut } from 'firebase/auth';


// Logout button component
export const LogoutMenu = () => {
    const logout = async () => {
        try{
            await signOut(auth);
            window.location.reload();
        } catch (err) {
            console.error(err);
        }
    };
    return (
        <button className="b-signIn" onClick={logout}> Logout </button>
    );
}