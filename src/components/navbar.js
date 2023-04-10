import { auth } from '../config/firebase';
import { useAuthState } from "react-firebase-hooks/auth";
import { LogoutMenu } from "./signout";
import { LoginMenu } from "./signin";
import { StudentProfile } from './student-profile';
import { EmployerProfile } from './employer-profile';
import { useSelector } from 'react-redux'
import { getRole } from '../features/counter/profileSlice';
import { NotificationsButton } from './notificationsButton';
import "./css/browsing.css";

// Navbar Component
export const Navbar = () => {

    const role = useSelector(getRole);

    const [user] = useAuthState(auth);

    if (user) {
        if (role === "admin") {
            return (
                <div className="auth-div" align='right'>
                    <LogoutMenu />
                </div>
            )
        } else if (role === "employer") {
            return (
                <div className="auth-div" align='right'>
                    <LogoutMenu /> <EmployerProfile />
                </div>
            )
        } else if(role === "student") {
            return (
                <div className="auth-div" align='right'>
                    <LogoutMenu /> <NotificationsButton /> <StudentProfile />
                </div>
            )
        }
    } else {
        return (
            <div className="auth-div" align='right'>
                <LoginMenu />
            </div>
        )
    }
}