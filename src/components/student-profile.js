import { updateDoc, doc } from 'firebase/firestore';
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
        const resumeRef = ref(storage, `Resume/${user.uid}`)
        if (newResume == null) return;
        try{
            await uploadBytes(resumeRef, newResume);
        } catch(err) {
            console.log(err);
        }
    };

    return (
        <>
            <button className="profileBtn student-profile" onClick={() => setIsOpen(true)}><PersonIcon style={{ fontSize: 'small' }} /></button>
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

                                <label className='educationLabel' htmlFor="education">Education Level:</label>
                                <select id="education" name="education" required onChange={(e) => setEducation(e.target.value)}>
                                    <option value="" disabled>Select Education Level</option>
                                    <option value="Bachelor">Bachelor</option>
                                    <option value="Masters">Masters</option>
                                    <option value="Doctorate">Doctorate</option>
                                    <option value="Associate">Associate</option>

                                </select>

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