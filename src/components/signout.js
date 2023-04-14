import { auth } from '../config/firebase';
import { signOut } from 'firebase/auth';
import { useDispatch } from 'react-redux'
import { logOut } from '../features/counter/userSlice';
import { setRole } from '../features/counter/profileSlice';

/**
 * The function exports a button element with an onClick event listener that calls a logout function
 * when clicked.
 * @returns A button element with the class name "b-signIn" and an onClick event listener that calls
 * the logout function when the button is clicked. The text displayed on the button is "Logout".
 */
export const LogoutMenu = () => {
    const dispatch = useDispatch();
    const logout = async () => {
        try{
            await signOut(auth).then(() => 
            dispatch(logOut())
            );
            dispatch(setRole({
                role: null
            }));
        } catch (err) {
            console.error(err);
        }
    };
    /* This code is returning a button element with the class name "b-signIn" and an onClick event
    listener that calls the logout function when the button is clicked. The text displayed on the
    button is "Logout". */
    return (
        <button className="b-signIn" onClick={logout}> Logout </button>
    );
}