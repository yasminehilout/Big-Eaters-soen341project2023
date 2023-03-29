import { updateDoc, doc, } from 'firebase/firestore';
import { useState } from 'react';
import { db } from "../config/firebase";
import { getAuth } from "firebase/auth";
import React from 'react'
import Modal from 'react-modal'
import PersonIcon from "@mui/icons-material/Person";
//Maybe dont need this page

import "./css/student-profile.css";
<link rel="stylesheet"
    href="https://fonts.googleapis.com/css?family=Sora"></link>

export const EmployerProfile = () => {

    const auth = getAuth();
    //const user = auth.currentUser;

    const [newCompanyName, setCompanyName] = useState("")
    const [newYears, setYears] = useState("")
    const [isOpen, setIsOpen] = useState(false)

    const editProfile = async () => {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                console.log("user signed in", user.uid, newCompanyName, newYears)
                const employerprofileDocRef = doc(db, "employerProfile", user.uid);
                await updateDoc(employerprofileDocRef, {
                    "companyName": newCompanyName,
                    "years": newYears,
                });

            } else {
                console.log("user not signed in")
            }
        })
    };

    return (
        <div>
            <button className="profileBtn" onClick={() => setIsOpen(true)}><PersonIcon style={{ fontSize: 'small' }} /></button>
            <Modal className='profile' isOpen={isOpen} onRequestClose={() => setIsOpen(false)}>

                <div className='modalBackground'>
                    <div className='modalContainer'>
                        <div className='titleCloseBtn'>
                            <button className='xBtn' onClick={() => setIsOpen(false)} > X </button>
                        </div>
                        <div className='title'>
                            <h1>Edit Posting</h1>
                        </div>
                        <div className='body'>
                            <form>
                                <input
                                    className='textBox'
                                    type="text"
                                    maxLength="20"
                                    placeholder="Company Name"
                                    required
                                    value={newCompanyName}
                                    onChange={(e) => setCompanyName(e.target.value)}
                                />
                                <div class='underline'></div>

                                <input
                                    className='textBox'
                                    type="checkbox"
                                    placeholder="Company Age"
                                    required
                                    value={newYears}
                                    onChange={(e) => setYears(e.target.value)}
                                />

                                <div className='footer'>
                                    <button className="endBtn" onClick={() => editProfile()}>Save</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>

    );
}