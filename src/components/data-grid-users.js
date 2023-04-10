import { db } from "../config/firebase";
import { useEffect, useState } from 'react';
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import "./css/student-profile.css";
import "./css/browsing.css";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";

export const UserDataGrid = () => {

    const [userList, setUserList] = useState([]);
    const usersCollectionRef = collection(db, "users");

    useEffect(() => {
        getUserList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const getUserList = async () => {
        try {
            const data = await getDocs(usersCollectionRef);
            const filteredData = data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            setUserList(filteredData);
            console.log("we good");
        } catch (err) {
            console.error(err);
        }
    };

    const deleteUser = async (id) => {
        const userDoc = doc(db, "users", id);
        await deleteDoc(userDoc);
        getUserList();
    };

    const handleDeleteClick = (id) => {
        deleteUser(id);
    };

    const rows = userList.map((user) => ({
        id: user.id,
        fname: user.firstName,
        lname: user.lastName,
        email: user.email,
        uid: user.userId,
        education: user.educationLevel,
        organization: user.organization,
        role: user.role,
    }))

    const columns = [
        { field: 'fname', headerName: 'First Name', width: 100 },
        { field: 'lname', headerName: 'Last Name', width: 100 },
        { field: 'email', headerName: 'Email', width: 150 },
        { field: 'uid', headerName: 'User ID', width: 150 },
        { field: 'education', headerName: 'Education', width: 120 },
        { field: 'organization', headerName: 'Organization', width: 150 },
        { field: 'role', headerName: 'Role', width: 110 },
        {
            field: 'deleteuser', headerName: 'Actions', width: 150, renderCell: (params) => {
                return (
                    <button onClick={() => handleDeleteClick(params.id)}>Delete User</button>
                )
            }
        }
    ]

    return (
        <div className="data-grid-users">
            <Box
                sx={{
                    height: 500,
                    width: '85%',
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