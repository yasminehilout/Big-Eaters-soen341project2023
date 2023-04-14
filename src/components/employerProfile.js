import { updateDoc, doc, getDoc } from 'firebase/firestore';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { db, storage } from "../config/firebase";
import { ref, uploadBytes } from 'firebase/storage';
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
    const [newVision, setVision] = useState("")
    const [newIndustry, setIndustry] = useState("")
    const [newWebsite, setWebsite] = useState("")
    const [newLocation, setLocation] = useState("")
    const [newLogo, setLogo] = useState("")
    const [isOpen, setIsOpen] = useState(false)

    const [user] = useAuthState(auth);

    const editProfile = async (user) => {
        const employerprofileDocRef = doc(db, "users", user.uid);
        await updateDoc(employerprofileDocRef, {
            "firstName": newFirstName,
            "lastName": newLastName,
            "organization": newOrganization,
            "website": newWebsite,
            "industry": newIndustry,
            "vision": newVision,
            "location": newLocation,
        });
        const logoRef = ref(storage, `Logos/${user.uid}`) //Can add .pdf as a file type 
        if (newLogo == null) return;
        try{
            await uploadBytes(logoRef, newLogo);
        } catch(err) {
            console.log(err);
        }
    };

    const getProfile = async () => {
        const studentDocRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(studentDocRef);
        if (docSnap.exists()) {
            return (
                setFirstName(docSnap.data().firstName),
                setLastName(docSnap.data().lastName),
                setOrganization(docSnap.data().organization),
                setVision(docSnap.data().vision),
                setIndustry(docSnap.data().industry),
                setWebsite(docSnap.data().website),
                setLocation(docSnap.data().location)
            )
        }
        else {
            console.log("docSnap not found!");
        }
    }


    return (
        <>
            <button className='profileBtn' onClick={() => {setIsOpen(true); getProfile()}}><PersonIcon style={{ fontSize: 'small' }} /></button>
            <Modal className='profile' isOpen={isOpen} onRequestClose={() => setIsOpen(false)} ariaHideApp={false}>

                <div className='modalBackground'>
                    <div className='modalContainer1'>
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
                                 <div className='underline'></div>
                                <input
                                    className='textBox'
                                    type="text"
                                    placeholder="Website"
                                    required
                                    value={newWebsite}
                                    onChange={(e) => setWebsite(e.target.value)}
                                />
                                <div className='underline'></div>
                                <input
                                    className='textBox'
                                    type="text"
                                    maxLength="50"
                                    placeholder="Industry"
                                    required
                                    value={newIndustry}
                                    onChange={(e) => setIndustry(e.target.value)}
                                />
                                <div className='underline'></div>
                                <input
                                    className='textBox'
                                    type="text"
                                    maxLength="150"
                                    placeholder="Company Vision"
                                    required
                                    value={newVision}
                                    onChange={(e) => setVision(e.target.value)}
                                />
                                <div className='underline'></div>
                                <input
                                    className='textBox'
                                    type="text"
                                    maxLength="150"
                                    placeholder="Location"
                                    required
                                    value={newLocation}
                                    onChange={(e) => setLocation(e.target.value)}
                                />
                                <div className='file-upload'>
                                    <label className='logoTitle' htmlFor='logo'>Upload Logo: </label>
                                    <input
                                        type="file"
                                        id="logo"
                                        name="logo"
                                        //accept=".doc,.docx,.pdf"
                                        onChange={(e) => setLogo(e.target.files[0])}
                                    />
                                </div>
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