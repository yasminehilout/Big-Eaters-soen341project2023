import { db, auth } from "../config/firebase";
import { useEffect, useState } from 'react';
import { getDocs, getDoc, collection, addDoc, setDoc, deleteDoc, updateDoc, doc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import "./css/student-profile.css";
import "./css/browsing.css";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";

export const JobDataGrid = () => {
    const [user] = useAuthState(auth);

    const [jobList, setJobList] = useState([]);
    const jobsCollectionRef = collection(db, "jobs");

    useEffect(() => {
        getJobList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getJobList = async () => {
        try {
            const data = await getDocs(jobsCollectionRef);
            const filteredData = data.docs.map(async (doc) => {
                let applied = false;
                if (auth.currentUser) { applied = await getApplicationStatus(doc.id); }

                return {
                    ...doc.data(),
                    id: doc.id,
                    applied: applied
                }
            });
            const updatedData = await Promise.all(filteredData);
            setJobList(updatedData);
        } catch (err) {
            console.error(err);
        }
    };

    const deleteJob = async (id) => {
        const jobDoc = doc(db, "jobs", id);
        const innerCollectionRef = collection(jobDoc, "applicants");

        // Delete all documents in the inner collection
        const querySnapshot = await getDocs(innerCollectionRef);
        querySnapshot.forEach(async (doc) => {
            await deleteDoc(doc.ref);
        });

        // Delete the job document
        await deleteDoc(jobDoc);

        getJobList();
    };

    const getApplicationStatus = async (jobId) => {
        const user = auth.currentUser;
        const docRef = doc(db, "jobs", jobId, "applicants", user.uid);
        const docSnap = await getDoc(docRef);
        return docSnap.exists();
    }

    const handleDeleteClick = (id) => {
        deleteJob(id)
    }

    // const rows = [
    //     {id: 1, jobtitle: 'Hello', company: 'World!', season: "Fall", year: "2023", coop: "Yes", uid: user.uid, description: "Hello World"}
    // ]

    const rows = jobList.map((job) => ({
        id: job.id,
        jobtitle: job.title,
        // company: job.company,
        season: job.season,
        year: job.yearOfStart,
        coop: job.needCoop,
        uid: job.userId,
        description: job.description,
        //deletejob: <button onClick={() => deleteJob(job.id)}>Delete Job</button>
    }))

    const columns = [
        { field: 'jobtitle', headerName: 'Job Title', width: 150 },
        // {field: 'company', headerName: 'Company', width: 150},
        { field: 'season', headerName: 'Season', width: 90 },
        { field: 'year', headerName: 'Year', width: 90 },
        { field: 'coop', headerName: 'Requires Co-op', width: 130 },
        { field: 'uid', headerName: 'User ID', width: 150 },
        { field: 'description', headerName: 'Description', width: 150 },
        {
            field: 'deletejob', headerName: 'Actions', width: 150, renderCell: (params) => {
                return (
                    <button onClick={() => handleDeleteClick(params.id)}>Delete Job</button>
                )
            }
        }
    ]

    return (
        <div className="data-grid-jobs">
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