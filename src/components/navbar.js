import { auth } from '../config/firebase';
import { useAuthState } from "react-firebase-hooks/auth";
import { LogoutMenu } from "./signout";
import { LoginMenu } from "./signin";
import { ProfileMenu } from './profile';

// Navbar Component
export const Navbar = () => {

    const [user] = useAuthState(auth);

    return (
        <div className="navbar">
            {user ? <><ProfileMenu /><LogoutMenu /></> : <LoginMenu />}
        </div>
    )
}