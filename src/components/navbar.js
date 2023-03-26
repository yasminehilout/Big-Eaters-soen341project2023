import { auth } from '../config/firebase';
import { useAuthState } from "react-firebase-hooks/auth";
import { LogoutMenu } from "./signout";
import { LoginMenu } from "./signin";
import { StudentProfile } from './student-profile';
import { EmployerProfile } from './employer-profile';
import { useSelector } from 'react-redux'
import { getRole } from '../features/counter/profileSlice';

// Navbar Component
export const Navbar = () => {

    const role = useSelector(getRole);

    const [user] = useAuthState(auth);

    return (
        <div className="auth-div" align='right'>
            {user ? <><LogoutMenu />{role==="student" ? <StudentProfile /> : <EmployerProfile />}</> : <LoginMenu />}
        </div>
    )
}