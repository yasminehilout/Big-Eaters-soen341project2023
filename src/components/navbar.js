import { auth } from '../config/firebase';
import { useAuthState } from "react-firebase-hooks/auth";
import { LogoutMenu } from "./signout";
import { LoginMenu } from "./signin";
import { StudentProfile } from './student-profile';
import { NotificationsButton } from './notificationsButton';
import "./css/browsing.css";

// Navbar Component
export const Navbar = ({ setView }) => {

    const [user] = useAuthState(auth);

    return (
        <div className="auth-div" align='right'>
            {user ? <>
                <NotificationsButton />
                <LogoutMenu />
                <StudentProfile />
            </> :
                <>
                    
                    <LoginMenu setView={setView} /></>
            }
        </div>
    )
}