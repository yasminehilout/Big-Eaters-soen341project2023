import { getDocs, collection, addDoc, deleteDoc, setDoc, updateDoc, doc, where, query } from 'firebase/firestore';
import { async } from 'q';
import firebase from 'firebase/compat/app';
import { useState, useEffect, useRef } from 'react';
import { db, auth } from "../config/firebase";
import { useAuthState, useAuth } from "react-firebase-hooks/auth";
//import { studentProfileInputs } from "./student-form-source";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import React from 'react'

export const StudentProfile = () =>  {
    
    const [studentProfileList, setStudentProfileList] = useState([]);

    const auth = getAuth();
    const user = auth.currentUser;

    const [newFirstName, setFirstName] = useState("")
    const [newLastName, setLastName] = useState("")
    const [newEducation, setEducation] = useState("Bachelor")
    const [newResume, setResume] = useState()

    const studentProfileRef = collection(db, "studentprofile");   

    const editProfile = async () => {
        auth.onAuthStateChanged( async (user) => {
            if(user) {
                console.log("user signed in", user.uid, newFirstName, newLastName, newEducation)
                //const q = query(collection(db, "studentprofile"), where("uid", "==", user.uid));
                const studentprofileDocRef = doc(db, "studentprofile", user.uid);
                await updateDoc(studentprofileDocRef, {
                    "firstName": newFirstName,
                    "lastName": newLastName,
                    "educationLevel": newEducation,
                });
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
                <input
                    type="text"
                    placeholder = "Email"
                    //defaultValue = {}
                    readOnly
                />;

                <label for="education">Select Education Level</label>
                <select name="education" id="education" required onChange={(e) => setEducation(e.target.value)}> 
                    <option value="Bachelor">Bachelor</option> 
                    <option value="Masters">Masters</option> 
                    <option value="Doctorate">Doctorate</option> 
                    <option value="Associate">Associate</option> 
                </select>
                {/*<input  
                    type="file" 
                    id="resume" 
                    name="resume" 
                    accept="application/pdf"
                />*/}
                

                <button type="submit" onClick={() => editProfile()}>Save</button>
            </form>
        </div>
    )
}