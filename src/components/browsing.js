import { db, auth } from "../config/firebase";
import { useEffect, useState } from 'react';
import { getDocs, getDoc, collection, addDoc, setDoc, deleteDoc, updateDoc, doc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Modal from 'react-modal';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

import "./css/student-profile.css";
import "./css/browsing.css";
import "./employer-profile.js";

const theme = createTheme({
    palette: {
        primary: {
            main: '#4c8bf5',
        },
        secondary: {
            main: '#f50057',
        },
    },
});


// REDUX
// import { useSelector, useDispatch } from 'react-redux';

export const Browsing = (test) => {

    const [jobList, setJobList] = useState([]);

    // New Job States
    const [newJobTitle, setNewJobTitle] = useState("");
    const [newSeason, setNewSeason] = useState("Fall"); // ["Fall", "Winter", "Spring", "Summer"] 
    const [newYearOfStart, setNewYearOfStart] = useState(0);
    const [needCoop, setNeedCoop] = useState(false);
    const [newDescription, setNewDescription] = useState("");

    // Update Title State
    const [updatedTitle, setUpdatedTitle] = useState("");

    // Update Season State
    const [updatedSeason, setUpdatedSeason] = useState("");

    //Update Description State
    const [updatedDescription, setUpdatedDescription] = useState("");

    // Applicant menu
    const [applicantList, setApplicantList] = useState([]);
    const [isApplicantListOpen, setIsApplicantListOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedJob, setSelectedJob] = useState("");

    const jobsCollectionRef = collection(db, "jobs");

    const getJobList = async () => {
        try {
            const data = await getDocs(jobsCollectionRef);
            const filteredData = data.docs.map(async (doc) => {
                let applied = false;
                if (auth.currentUser){applied = await getApplicationStatus(doc.id);}
                
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

    useEffect(() => {
        getJobList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onCreateJob = async () => {
        try {
            await addDoc(jobsCollectionRef, {
                title: newJobTitle,
                season: newSeason,
                yearOfStart: newYearOfStart,
                needCoop: needCoop,
                description: newDescription,
                userId: auth?.currentUser?.uid,
            });
            getJobList();
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

    const updateJobTitle = async (id) => {
        console.log(id);
        const jobDoc = doc(db, "jobs", id);
        await updateDoc(jobDoc, { title: updatedTitle });
        getJobList();
    };

    const updateJobSeason = async (id) => {
        const jobDoc = doc(db, "jobs", id);
        await updateDoc(jobDoc, { season: updatedSeason });
        getJobList();
    };


    const updateJobDescription = async (id) => {
        const jobDoc = doc(db, "jobs", id);
        await updateDoc(jobDoc, { description: updatedDescription });
        getJobList();
    };

    const getApplicationStatus = async (jobId) => {
        const user = auth.currentUser;
        const docRef = doc(db, "jobs", jobId, "applicants", user.uid);
        const docSnap = await getDoc(docRef);
        return docSnap.exists();
    }

    const onApply = async (jobId) => {
        const user = auth.currentUser;
        try {
            await setDoc(doc(db, "jobs", jobId, "applicants", user.uid), {
                accepted: false,
                name: user.displayName,
                email: user.email
            });
        } catch (err) {
            console.error(err);
        }
        getJobList();
    }
    // const getApplicants = async (jobId) => {
    //     const jobDoc = doc(db, "jobs", jobId);
    //     const innerCollectionRef = collection(jobDoc, "applicants");

    //     const querySnapshot = await getDocs(innerCollectionRef);
    //     // For each user print their data.
    //     querySnapshot.forEach(async (doc) => {
    //         console.log(doc.data());
    //     });
    // }


    const getAcceptedStatus = async (jobId, applicantId) => {
        const docRef = doc(db, "jobs", jobId, "applicants", applicantId);
        const docSnap = await getDoc(docRef);
        // console.log(applicantId + " was accepted: " + docSnap.get("accepted"));
        return docSnap.exists() ? docSnap.get("accepted") : false;
    }

    const getApplicantList = async (jobId) => {
        try {
            setIsLoading(true);
            const jobDoc = doc(db, "jobs", jobId);
            const innerCollectionRef = collection(jobDoc, "applicants");

            const querySnapshot = await getDocs(innerCollectionRef);
            const filteredData = querySnapshot.docs.map(async (doc) => {
                let accepted = await getAcceptedStatus(jobId, doc.id);
                return {
                    ...doc.data(),
                    id: doc.id,
                    accepted: accepted
                }
            });
            const updatedData = await Promise.all(filteredData);
            setApplicantList(updatedData);
            setIsLoading(false);
        } catch (err) {
            console.error(err);
        }

    };

    const openApplicantList = async (jobId) => {
        setSelectedJob(jobId);
        getApplicantList(jobId);
        setIsApplicantListOpen(true);
        // console.log(applicantList);
    }

    const onAccept = async (userId) => {
        const docRef = doc(db, "jobs", selectedJob, "applicants", userId);

        await updateDoc(docRef, {
            accepted: true,
        })

        getApplicantList(selectedJob)

    }

    const isEmployer = () => {

        // if (test.test === "employer") {
        //     return true;
        // }
        // else {
        return false;
        // }

    }

    const [user] = useAuthState(auth);

    return (
        <div className="browsing-div">
            {/* {console.log(test)} */}
            {user && isEmployer() ?
                <div>
                    <input
                        className="j-input"
                        placeholder="Job title..."
                        onChange={(e) => setNewJobTitle(e.target.value)}
                    />
                    <input
                        className="j-input"
                        placeholder="Job Description..."
                        onChange={(e) => setNewDescription(e.target.value)}
                    />
                    <label htmlFor="seasons">Choose a work season:</label>
                    <select className="select-jobpost" name="seasons" id="seasons" onChange={(e) => setNewSeason(e.target.value)}>
                        <option value="Fall">Fall</option>
                        <option value="Winter">Winter</option>
                        <option value="Spring">Spring</option>
                        <option value="Summer">Summer</option>
                    </select>

                    <input
                        className="j-input"
                        placeholder="Year Of Start..."
                        type="number"
                        onChange={(e) => setNewYearOfStart(Number(e.target.value))}
                    />

                    <input
                        className="coop-check"
                        type="checkbox"
                        checked={needCoop}
                        onChange={(e) => setNeedCoop(e.target.checked)}
                    />
                    <label> Need Coop </label>

                    <button className="j-button" onClick={onCreateJob}> Create Job</button>
                </div>
                : <></>}

            <div className="div-posts">
                <Modal ariaHideApp={false} className='profile' isOpen={isApplicantListOpen} onRequestClose={() => setIsApplicantListOpen(false)}>
                    <div className='modalBackground'>
                        <div className='modalContainer'>
                            <div className='titleCloseBtn'>
                                <div className='title'>
                                    <h1>Applicant List</h1>
                                </div>
                                <button className='xBtn' onClick={() => setIsApplicantListOpen(false)} > Close </button>
                            </div>
                            <div className='applicantList-body'>
                                {isLoading
                                    ? <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                                        <CircularProgress />
                                    </div> // Show loading icon
                                    : applicantList.map((applicant) => {
                                        return (
                                            <div key={applicant.id} className="applicant">
                                                <span>{applicant.name}</span>
                                                <ThemeProvider theme={theme}>
                                                    {applicant.accepted
                                                        ?
                                                        <Button variant="contained" disabled>
                                                            Accepted
                                                        </Button>
                                                        :
                                                        <Button variant="contained" onClick={() => onAccept(applicant.id)}>
                                                            Accept
                                                        </Button>
                                                    }
                                                </ThemeProvider>
                                            </div>
                                        )
                                    })
                                }
                            </div>

                        </div>
                    </div>

                </Modal>
                {
                    jobList.map((job) => {
                        return (

                            <div key={job.id} className="div-post">

                                {user && isEmployer() && user.id === job.userId ? <>
                                    <h1 className="job-header">
                                        {job.title}
                                    </h1>
                                    <h4 className="job-header">
                                        {job.description}
                                    </h4>
                                    <p> Workterm: {job.season} {job.yearOfStart} </p>
                                    <p> Need Coop: {job.needCoop ? "Yes" : "No"} </p>

                                </> : <>
                                    <h1 className="job-header">
                                        {job.title}
                                    </h1>
                                    <h4 className="job-header">
                                        {job.description}
                                    </h4>
                                    <p> Workterm: {job.season} {job.yearOfStart} </p>
                                    <p> Need Coop: {job.needCoop ? "Yes" : "No"} </p></>

                                }

                                {user && !(isEmployer()) ?
                                    <>
                                        {/* Show different buttons depending on the application status */}
                                        {
                                            <> {job.applied ? <>
                                                <button className="j-button applied">Applied</button>
                                            </> : <>
                                                <button className="j-button apply" onClick={() => onApply(job.id)}>Apply</button>

                                            </>}
                                            </>
                                        }

                                    </>
                                    :
                                    <></>
                                }



                                {user && isEmployer() ?
                                    <>
                                        <button className="update-button" onClick={() => deleteJob(job.id)}> Delete This Job</button>

                                        {/* Update Title */}
                                        <input
                                            className="j-input"
                                            placeholder="new title..."
                                            onChange={(e) => setUpdatedTitle(e.target.value)}
                                        />
                                        <button className="update-button" onClick={() => updateJobTitle(job.id)}> Update Title</button>

                                        {/* Update Description */}
                                        <input
                                            className="j-input"
                                            placeholder="new description..."
                                            onChange={(e) => setUpdatedDescription(e.target.value)}
                                        />
                                        <button className="update-button" onClick={() => updateJobDescription(job.id)}> Update Description</button>

                                        {/* Update Season */}
                                        <input
                                            className="j-input"
                                            placeholder="new season..."
                                            onChange={(e) => setUpdatedSeason(e.target.value)}
                                        />
                                        <button className="update-button" onClick={() => updateJobSeason(job.id)}> Update Season</button>
                                        {/* Show different buttons depending on the application status */}
                                        <button className="j-button" onClick={() => openApplicantList(job.id)}>Applicants</button>

                                    </>
                                    :
                                    <></>}
                            </div>
                        )
                    })
                }

            </div >
        </div >
    );
};
