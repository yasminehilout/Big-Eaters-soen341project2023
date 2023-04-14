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


    /**
     * The function edits a user's profile information and uploads a new resume to Firebase storage.
     * @param user - The user object contains information about the currently signed-in user, such as
     * their unique ID (uid).
     * @returns If `newResume` is `null`, the function will return without uploading any file to the
     * storage. Otherwise, the function does not have a return statement, so it will implicitly return
     * `undefined`.
     */
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

    /* This is a React component that renders a modal window for editing a student's profile
    information. The modal contains input fields for the student's first name, last name, education
    level, and an option to upload a resume. The component uses state hooks to manage the input
    values and the modal's open/closed state. When the "Save" button is clicked, the component calls
    the `editProfile` function to update the user's profile information and upload the resume file
    to Firebase storage. */
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