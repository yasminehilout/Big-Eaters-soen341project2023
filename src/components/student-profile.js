import { updateDoc, doc, } from 'firebase/firestore';
import { useState } from 'react';
import { db, storage } from "../config/firebase";
import { getAuth } from "firebase/auth";
import { ref, uploadBytes } from 'firebase/storage';
import React from 'react'
import Modal from 'react-modal'
import PersonIcon from "@mui/icons-material/Person";

import "./css/student-profile.css";
<link rel="stylesheet"
  href="https://fonts.googleapis.com/css?family=Sora"></link>
  


export const StudentProfile = () =>  {
    
    const auth = getAuth();
    //const user = auth.currentUser;

    const [newFirstName, setFirstName] = useState("")
    const [newLastName, setLastName] = useState("")
    const [newEducation, setEducation] = useState("Bachelor")
    const [newResume, setResume] = useState() 
    const [isOpen, setIsOpen] = useState(false)
    

    const editProfile = async () => {
        auth.onAuthStateChanged( async (user) => {
            if(user) {
                console.log("user signed in", user.uid, newFirstName, newLastName, newEducation)
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
            } else {
                console.log("user not signed in")
            }
        })
    };

        return(
            <div>  
                <button className="profileBtn" onClick={() => setIsOpen(true)}><PersonIcon style={{fontSize:'small'}}/></button>
            <Modal className='profile' isOpen={isOpen} onRequestClose={() => setIsOpen(false)}>

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

                <label className='educationLabel' for="education">Education Level:</label>
                <select id="education" name="education" required onChange={(e) => setEducation(e.target.value)}>
                    <option value="" disabled selected>Select Education Level</option>
                    <option value="Bachelor">Bachelor</option>
                    <option value="Masters">Masters</option>
                    <option value="Doctorate">Doctorate</option>
                    <option value="Associate">Associate</option>

                </select>

            <div class='file-upload'>
                <label className='resumeTitle' for='resume'>Upload Resume: </label>
                <input  
                    type="file" 
                    id="resume" 
                    name="resume" 
                    accept=".doc,.docx,.pdf"
                    onChange={(e) => setResume(e.target.files[0])}
                />
                </div>
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