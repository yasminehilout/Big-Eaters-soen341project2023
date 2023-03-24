import { auth } from '../config/firebase';
import { useAuthState } from "react-firebase-hooks/auth";
import { LogoutMenu } from "./signout";
import { LoginMenu } from "./signin";
import { ProfileMenu } from './profile';
import { StudentProfile } from './student-profile';

// Navbar Component
export const Navbar = ({setView}) => {

    const [user] = useAuthState(auth);

    return (
        <div className="auth-div" align="right">
            {user ? <><StudentProfile /><LogoutMenu /><ProfileMenu /></> : <LoginMenu setView = {setView}/>}
        </div>
    )
}