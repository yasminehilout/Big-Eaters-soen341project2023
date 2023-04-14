import { db, auth } from "../config/firebase";
import { useEffect, useState } from 'react';
import { getDocs, getDoc, collection, deleteDoc, doc } from "firebase/firestore";
import "./css/student-profile.css";
import "./css/browsing.css";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";

export const JobDataGrid = () => {

    const [jobList, setJobList] = useState([]);
    const jobsCollectionRef = collection(db, "jobs");

    useEffect(() => {
        getJobList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /**
     * This function retrieves job data from a collection, filters and maps the data, checks if the
     * user has applied to each job, and updates the job list with the updated data.
     */
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

    /**
     * This function will remove job postings from the job postings collection
     * @param {*} id 
     */
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

    /**
     * Similar function as the one in browzing, this will fetch the application status
     * @param {*} jobId 
     * @returns 
     */
    const getApplicationStatus = async (jobId) => {
        const user = auth.currentUser;
        const docRef = doc(db, "jobs", jobId, "applicants", user.uid);
        const docSnap = await getDoc(docRef);
        return docSnap.exists();
    }

    /**
     * The function `handleDeleteClick` calls the `deleteJob` function with a given `id` parameter.
     * @param id - The `id` parameter is a unique identifier for a job that needs to be deleted. It is
     * passed as an argument to the `handleDeleteClick` function.
     */
    const handleDeleteClick = (id) => {
        deleteJob(id)
    }

    const columns = [
        { field: 'jobtitle', headerName: 'Job Title', width: 150 },
        { field: 'season', headerName: 'Season', width: 90 },
        { field: 'year', headerName: 'Year', width: 90 },
        { field: 'coop', headerName: 'Requires Co-op', width: 130 },
        { field: 'uid', headerName: 'User ID', width: 150 },
        { field: 'description', headerName: 'Description', width: 150 },
        {
            field: 'deletejob', headerName: 'Actions', width: 150, renderCell: (params) => {
                return (
                    <button className="action-button" onClick={() => handleDeleteClick(params.id)}>Delete Job</button>
                )
            }
        }
    ]

    const rows = jobList.map((job) => ({
        id: job.id,
        jobtitle: job.title,
        season: job.season,
        year: job.yearOfStart,
        coop: job.needCoop,
        uid: job.userId,
        description: job.description,
    }))


    /**
     * This will return the filled mui data-grid for the job postings.
     */
    return (
        <div className="data-grid-jobs" style={{display: "flex",justifyContent: "center"}}>
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