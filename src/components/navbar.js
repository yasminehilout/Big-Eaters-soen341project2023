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

/**
 * The `Navbar` function is a React functional component that returns a div element with conditional
 * rendering based on the user's authentication status and role.
 * @returns A functional component called `Navbar` that returns a `div` element with a class name of
 * `auth-div`, aligned to the right, and with a role of "navigation". The content of the `div` element
 * depends on whether the user is logged in or not and their role (student or employer). If the user is
 * logged in, it displays a logout menu, a notifications button (if
 */
export const Navbar = () => {

    const role = useSelector(getRole);

    const [user] = useAuthState(auth);

    /* This code is defining a functional component called `Navbar`. The component returns a `div`
    element with a class name of `auth-div`, aligned to the right, and with a role of "navigation". */
    
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