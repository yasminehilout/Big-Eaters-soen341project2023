import { updateDoc, doc, getDoc } from 'firebase/firestore';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { db } from "../config/firebase";
import { getAuth } from "firebase/auth";
import React from 'react'
import Modal from 'react-modal'
import PersonIcon from "@mui/icons-material/Person";

import "./css/student-profile.css";
<link rel="stylesheet"
    href="https://fonts.googleapis.com/css?family=Sora"></link>


export const AdminProfile = () => {

    const auth = getAuth();

    const [newFirstName, setFirstName] = useState("")
    const [newLastName, setLastName] = useState("")
    const [isOpen, setIsOpen] = useState(false)

    const [user] = useAuthState(auth);

    /**
     * This function updates the first and last name of a user's profile in a Firestore database.
     * @param user - The user parameter is an object that represents a user in the application. It
     * likely contains properties such as a unique identifier (uid), email address, and other user
     * information.
     */
    const editProfile = async (user) => {
        const adminprofileDocRef = doc(db, "users", user.uid);
        await updateDoc(adminprofileDocRef, {
            "firstName": newFirstName,
            "lastName": newLastName,
        });
    };

    /**
     * This function retrieves a user's first and last name from a Firestore document.
     * @returns The function `getProfile` is returning either the result of calling `setFirstName` and
     * `setLastName` with the corresponding data from the `docSnap` object, or a console log message if
     * `docSnap` does not exist. However, it is important to note that `setFirstName` and `setLastName`
     * are not being returned themselves, as they are likely functions that update state within
     */
    const getProfile = async () => {
        const studentDocRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(studentDocRef);
        if (docSnap.exists()) {
            return (
                setFirstName(docSnap.data().firstName),
                setLastName(docSnap.data().lastName)
            )
        }
        else {
            console.log("docSnap not found!");
        }
    }

    /* This is the JSX code for rendering a modal that allows an admin user to edit their profile
    information. The modal is triggered by clicking on a button with the class name "profileBtn". */
    return (
        <>
            <button className='profileBtn' onClick={() => {setIsOpen(true); getProfile()}}><PersonIcon style={{ fontSize: 'small' }} /></button>
            <Modal className='profile' isOpen={isOpen} onRequestClose={() => setIsOpen(false)} ariaHideApp={false}>

                <div className='modalBackground'>
                    <div className='modalContainer'>
                        <div className='titleCloseBtn'>
                            <button className='xBtn' onClick={() => setIsOpen(false)} > X </button>
                        </div>
                        <div className='title'>
                            <h1>Edit Profile</h1>
                        </div>
                        <div className='body'>
                            <form>
                                <input
                                    className='textBox'
                                    type="text"
                                    maxLength="20"
                                    placeholder="First Name"
                                    required
                                    value={newFirstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                                <div className='underline'></div>
                                <input
                                    className='textBox'
                                    type="text"
                                    maxLength="20"
                                    placeholder="Last Name"
                                    required
                                    value={newLastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </form>
                            <div>
                                <p>As an Admin you have access to lists of all users and job postings. An Admin may delete any user or job posting. For users list, an Admin can grant other users access to Admin role.</p>
                            </div>
                            <div className='footer'>
                                <button className="endBtn" onClick={() => { editProfile(user); setIsOpen(false); }}>Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </>

    );
}   