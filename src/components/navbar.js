import { auth } from '../config/firebase';
import { useAuthState } from "react-firebase-hooks/auth";
import { LogoutMenu } from "./signout";
import { LoginMenu } from "./signin";
import { StudentProfile } from './studentProfile';
import { EmployerProfile } from './employerProfile';
import { AdminProfile } from './adminProfile';
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
                    <h1 className="admin-title">Admin</h1>
                    <LogoutMenu /> <AdminProfile />
                </div>
            )
        } else if (role === "employer") {
            return (
                <div className="auth-div" align='right'>
                    <LogoutMenu /> <EmployerProfile />
                </div>
            )
        } else if (role === "student") {
            return (
                <div className="auth-div" align='right'>
                    <LogoutMenu /> <NotificationsButton /> <StudentProfile />
                </div>
            )
        } else {
            return (
                <div className="auth-div" align='right'>
                    <LoginMenu />
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