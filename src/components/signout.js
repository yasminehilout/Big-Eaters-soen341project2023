import { auth } from '../config/firebase';
import { signOut } from 'firebase/auth';
import { useDispatch } from 'react-redux'
import { logOut } from '../features/counter/userSlice';
import { setRole } from '../features/counter/profileSlice';


// Logout button component
export const LogoutMenu = () => {
    //console.log("logout menu");
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
    return (
        <button className="b-signIn" onClick={logout}> Logout </button>
    );
}