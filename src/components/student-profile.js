import { updateDoc, doc, } from 'firebase/firestore';
import { useState } from 'react';
import { db, storage } from "../config/firebase";
import { getAuth } from "firebase/auth";
import { ref, uploadBytes } from 'firebase/storage';
import React from 'react'

export const StudentProfile = () =>  {
    
    const auth = getAuth();
    //const user = auth.currentUser;

    const [newFirstName, setFirstName] = useState("")
    const [newLastName, setLastName] = useState("")
    const [newEducation, setEducation] = useState("Bachelor")
    const [newResume, setResume] = useState()   

    const editProfile = async () => {
        auth.onAuthStateChanged( async (user) => {
            if(user) {
                console.log("user signed in", user.uid, newFirstName, newLastName, newEducation)
                const studentprofileDocRef = doc(db, "studentprofile", user.uid);
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

    return (
        <div>
            <h1>
                Your Profile:
            </h1>
            <form>
                <input 
                    type="text"
                    maxlength="20"
                    placeholder = "First Name"
                    required
                    value={newFirstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />;
                <input
                    type="text"
                    maxlength="20"
                    placeholder = "Last Name"
                    required
                    value={newLastName}
                    onChange={(e) => setLastName(e.target.value)}
                />;
                <label for="education">Select Education Level</label>
                <select name="education" id="education" required onChange={(e) => setEducation(e.target.value)}> 
                    <option value="Bachelor">Bachelor</option> 
                    <option value="Masters">Masters</option> 
                    <option value="Doctorate">Doctorate</option> 
                    <option value="Associate">Associate</option> 
                </select>
                <input  
                    type="file" 
                    id="resume" 
                    name="resume" 
                    accept=".doc,.docx,.pdf"
                    onChange={(e) => setResume(e.target.files[0])}
                />
                <button type="submit" onClick={() => editProfile()}>Save</button>
            </form>
        </div>
    )
}