import { db, auth } from "../config/firebase";
import { useEffect, useState } from 'react';
import { getDocs, getDoc, collection, addDoc, setDoc, deleteDoc, updateDoc, doc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import "./css/student-profile.css";
import "./css/browsing.css";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";

export const UserDataGrid = () => {
    const [user] = useAuthState(auth);

    const rows = [
        {id: 1, fname: 'Louis'}
    ]

    // const rows = jobList.map((job) => ({
    //     id: user.uid
    // }))

    const columns = [
        { field: 'fname', headerName: 'First Name', width: 150 },
    ]

    return (
        <div className="data-grid-users">
            <Box
                sx={{
                    height: 500,
                    width: '80%',
                    '& .actions': {
                        color: 'text.secondary',
                    },
                    '& .textPrimary': {
                        color: 'text.primary',
                    },
                    border: 2,
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                <DataGrid rows={rows} columns={columns} />
            </Box>
        </div>
    )
}