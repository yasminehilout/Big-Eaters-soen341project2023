import { updateDoc, doc, getDoc } from 'firebase/firestore';
import { useState } from 'react';
import { db, storage } from "../config/firebase";
import { getAuth } from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth';
import { ref, uploadBytes } from 'firebase/storage';
import React from 'react'
import Modal from 'react-modal'
import PersonIcon from "@mui/icons-material/Person";

import "./css/student-profile.css";
<link rel="stylesheet"
    href="https://fonts.googleapis.com/css?family=Sora"></link>



export const StudentProfile = () => {

    const auth = getAuth();
    //const user = auth.currentUser;

    const [newFirstName, setFirstName] = useState("")
    const [newLastName, setLastName] = useState("")
    const [newEducation, setEducation] = useState("Bachelor")
    const [newResume, setResume] = useState()
    const [isOpen, setIsOpen] = useState(false)

    const [user] = useAuthState(auth);


    const editProfile = async (user) => {
        //console.log("user signed in", user.uid, newFirstName, newLastName, newEducation)
        const studentprofileDocRef = doc(db, "users", user.uid);
        await updateDoc(studentprofileDocRef, {
            "firstName": newFirstName,
            "lastName": newLastName,
            "educationLevel": newEducation,
        });
        const resumeRef = ref(storage, `Resume/${user.uid}`) //Can add .pdf as a file type 
        if (newResume == null) return;
        try{
            await uploadBytes(resumeRef, newResume);
        } catch(err) {
            console.log(err);
        }
    };

    const getProfile = async () => {
        const studentDocRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(studentDocRef);
        console.log(docSnap.data());
        console.log(docSnap.data().firstName, "and ", docSnap.data().lastName, "and ", docSnap.data().educationLevel);
        if (docSnap.exists()) {
            return (
                setFirstName(docSnap.data().firstName),
                setLastName(docSnap.data().lastName),
                setEducation(docSnap.data().educationLevel)
            )
        }
        else {
            console.log("docSnap not found!");
        }
    }

    return (
        <>
            <button className="profileBtn" onClick={() => {setIsOpen(true); getProfile()}}><PersonIcon style={{ fontSize: 'small' }} /></button>
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
                                    placeholder="Education"
                                    required
                                    value={newEducation}
                                    onChange={(e) => setEducation(e.target.value)}

                                />

                                <div className='file-upload'>
                                    <label className='resumeTitle' htmlFor='resume'>Upload Resume: </label>
                                    <input
                                        type="file"
                                        id="resume"
                                        name="resume"
                                        accept=".doc,.docx,.pdf"
                                        onChange={(e) => setResume(e.target.files[0])}
                                    />
                                </div>
                            </form>
                            <div className='footer'>
                                <button className="endBtn" onClick={() => {editProfile(user); setIsOpen(false);}}>Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </>

    );
}   