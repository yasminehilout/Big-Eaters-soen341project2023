import { updateDoc, doc, } from 'firebase/firestore';
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


export const EmployerProfile = () => {

    const auth = getAuth();

    const [newFirstName, setFirstName] = useState("")
    const [newLastName, setLastName] = useState("")
    const [newOrganization, setOrganization] = useState("")
    const [isOpen, setIsOpen] = useState(false)

    const [user] = useAuthState(auth);

    /**
     * The function updates the first name, last name, and organization fields of a user's profile in a
     * Firestore database.
     * @param user - The user parameter is an object that represents the currently signed-in user. It
     * likely contains information such as the user's unique ID (uid), email address, and other user
     * profile data.
     */
    const editProfile = async (user) => {
        //console.log("user signed in", user.uid, newFirstName, newLastName, newOrganization)
        const employerprofileDocRef = doc(db, "users", user.uid);
        await updateDoc(employerprofileDocRef, {
            "firstName": newFirstName,
            "lastName": newLastName,
            "organization": newOrganization,
        });
    };
    /* This is a React component that renders a button with a person icon. When the button is clicked,
    a modal pops up with a form to edit the user's profile information (first name, last name, and
    organization). The modal has a close button and a save button. When the save button is clicked,
    the `editProfile` function is called to update the user's profile information in the Firebase
    database, and the modal is closed. */
    return (
        <>
            <button className='profileBtn employer-profile' onClick={() => setIsOpen(true)}><PersonIcon style={{ fontSize: 'small' }} /></button>
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
                                <div className='underline'></div>
                                <input
                                    className='textBox'
                                    type="text"
                                    maxLength="20"
                                    placeholder="Organization"
                                    required
                                    value={newOrganization}
                                    onChange={(e) => setOrganization(e.target.value)}
                                />
                            </form>
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