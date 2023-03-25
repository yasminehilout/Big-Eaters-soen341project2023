import { updateDoc, doc, } from 'firebase/firestore';
import { useState } from 'react';
import { db, storage } from "../config/firebase";
import { getAuth } from "firebase/auth";
import { ref, uploadBytes } from 'firebase/storage';
import React from 'react'
import Modal from 'react-modal'

import "./css/student-profile.css";
<link rel="stylesheet"
  href="https://fonts.googleapis.com/css?family=Sora"></link>
  


export const StudentProfile = () =>  {
    
    const auth = getAuth();
    //const user = auth.currentUser;

    const [newFirstName, setFirstName] = useState("")
    const [newLastName, setLastName] = useState("")
    const [newOrganization, setOrganization] = useState("") 
    const [isOpen, setIsOpen] = useState(false)
    

    const editProfile = async () => {
        auth.onAuthStateChanged( async (user) => {
            if(user) {
                console.log("user signed in", user.uid, newFirstName, newLastName, newOrganization)
                const employerprofileDocRef = doc(db, "users", user.uid);
                await updateDoc(employerprofileDocRef, {
                    "firstName": newFirstName,
                    "lastName": newLastName,
                    "organization": newOrganization,
                });
            } else {
                console.log("user not signed in")
            }
        })
    };
    return(
        <div>
            <button className='profileBtn' onClick={() => setIsOpen(true)}>Edit Profile</button>
            <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)}>

            <div className='modalBackground'>
                <div className='modalContainer'>
                <div className='titleCloseBtn'>
                    <button className='xBtn' onClick={() =>  setIsOpen(false)} > X </button> 
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
                    placeholder = "First Name"
                    required
                    value={newFirstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <div class='underline'></div>
                <input
                className='textBox'
                    type="text"
                    maxLength="20"
                    placeholder = "Last Name"
                    required
                    value={newLastName}
                    onChange={(e) => setLastName(e.target.value)}

                />
                <div class='underline'></div>
                <input
                className='textBox'
                    type="text"
                    maxLength="20"
                    placeholder = "Organization"
                    required
                    value={newOrganization}
                    onChange={(e) => setOrganization(e.target.value)}
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