import { auth } from '../config/firebase';
import { useAuthState } from "react-firebase-hooks/auth";
import { LogoutMenu } from "./signout";
import { LoginMenu } from "./signin";
import { StudentProfile } from './studentProfile';
import { EmployerProfile } from './employerProfile';
import { useSelector } from 'react-redux'
import { getRole } from '../features/counter/profileSlice';
import { NotificationsButton } from './notificationsButton';
import "./css/browsing.css";

// Navbar Component
export const Navbar = () => {

    const role = useSelector(getRole);

    const [user] = useAuthState(auth);

    return (
        <div className="auth-div" align='right'>
            {user ? <>
                <LogoutMenu />
                {role==="student" ? <> <NotificationsButton /> <StudentProfile /> </> : <EmployerProfile />}
            </> :
                <>
                    
                    <LoginMenu /></>
            }
        </div>
    )
}