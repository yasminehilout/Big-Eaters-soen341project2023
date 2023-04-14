import { db } from "../config/firebase";
import { useEffect, useState } from 'react';
import { getDocs, collection, deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import "./css/student-profile.css";
import "./css/browsing.css";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { Stack } from "@mui/system";

export const UserDataGrid = () => {

    const [userList, setUserList] = useState([]);
    const usersCollectionRef = collection(db, "users");

    useEffect(() => {
        getUserList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    /**
     * This function retrieves a list of users from a Firestore collection and sets the filtered data
     * to the user list.
     */
    const getUserList = async () => {
        try {
            const data = await getDocs(usersCollectionRef);
            const filteredData = data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            setUserList(filteredData);
        } catch (err) {
            console.error(err);
        }
    };

    /**
     * This function deletes a user document from a Firestore database and then retrieves an updated
     * list of users.
     * @param id - The `id` parameter is a string representing the unique identifier of the user
     * document that needs to be deleted from the Firestore database.
     */
    const deleteUser = async (id) => {
        const userDoc = doc(db, "users", id);
        await deleteDoc(userDoc);
        getUserList();
    };

    /**
     * The function `handleDeleteClick` calls the `deleteUser` function with a given `id` parameter.
     * @param id - The `id` parameter is a unique identifier for a user that is passed as an argument
     * to the `handleDeleteClick` function. It is used to call the `deleteUser` function and delete the
     * user with the corresponding `id`.
     */
    const handleDeleteClick = (id) => {
        deleteUser(id);
    };

    /**
     * This function toggles the isAdmin status and role of a user in a Firestore database and then
     * updates the user list.
     * @param id - The id parameter is a string representing the unique identifier of a user in a
     * database. It is used to retrieve the user's document from the "users" collection in the database
     * and update its "isAdmin" and "role" fields based on their current values.
     */
    const handleChangeStatusClick = async (id) => {
        const docRef = doc(db, "users", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.data().isAdmin === true) {
            await updateDoc(docRef, { isAdmin: false, role: "" })
        } else {
            await updateDoc(docRef, { isAdmin: true, role: "admin" });
        }
        getUserList();
    };

    const rows = userList.map((user) => ({
        id: user.id,
        fname: user.firstName,
        lname: user.lastName,
        email: user.email,
        uid: user.userId,
        education: user.educationLevel,
        organization: user.organization,
        industry: user.industry,
        location: user.location,
        website: user.website,
        vision: user.vision,
        role: user.role,
        isadmin: user.isAdmin,
    }))

    const columns = [
        { field: 'fname', headerName: 'First Name', width: 100 },
        { field: 'lname', headerName: 'Last Name', width: 100 },
        { field: 'email', headerName: 'Email', width: 130 },
        { field: 'uid', headerName: 'User ID', width: 150 },
        { field: 'education', headerName: 'Education', width: 120 },
        { field: 'organization', headerName: 'Organization', width: 150 },
        { field: 'industry', headerName: 'Industry', width: 150 },
        { field: 'location', headerName: 'Location', width: 150 },
        { field: 'website', headerName: 'Website', width: 150 },
        { field: 'vision', headerName: 'Vision', width: 150 },
        { field: 'role', headerName: 'Role', width: 110 },
        { field: 'isadmin', headerName: 'Has Admin Access', width: 120 },
        {
            field: 'deleteuser', headerName: 'Actions', width: 200, renderCell: (params) => {
                return (
                    <Stack direction="column" justifyContent="center" spacing={.25} width="fit-content">
                        <button className="action-button" onClick={() => handleDeleteClick(params.id)}>Delete User</button>
                        <button className="action-button" onClick={() => handleChangeStatusClick(params.id)}>Change Admin Status</button>
                    </Stack>
                )
            }
        }
    ]

    /**
     * This will return the filled mui data-grid for the job postings.
     */
    return (
        <div className="data-grid-users" style={{display: "flex",justifyContent: "center"}}>
            <Box
                sx={{
                    height: 500,
                    width: '90%',
                    '& .actions': {
                        color: 'text.secondary',
                    },
                    '& .textPrimary': {
                        color: 'text.primary',
                    },
                    border: 4,
                    borderColor: "#4c8bf5",
                }}>
                <DataGrid rows={rows} columns={columns} rowHeight={70} />
            </Box>
        </div>
    )
}