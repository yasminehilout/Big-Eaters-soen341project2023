import { db, auth } from "../config/firebase";
import { useEffect, useState } from 'react';
import { getDocs, getDoc, collection, addDoc, setDoc, deleteDoc, updateDoc, doc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import "./css/student-profile.css";
import "./css/browsing.css";
import { getRole } from "../features/counter/profileSlice";
import { useSelector } from 'react-redux'
import { DataGrid } from "@mui/x-data-grid";
import { JobDataGrid } from "./data-grid-jobs";

export const AdminPage = () => {

    return (
        <div className="admin-page">
            <JobDataGrid />
        </div>
    )
}