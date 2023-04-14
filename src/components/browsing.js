import { db, auth } from "../config/firebase";
import { useEffect, useState } from 'react';
import { getDocs, getDoc, collection, addDoc, setDoc, deleteDoc, updateDoc, doc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Modal from 'react-modal';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import { AdminPage } from "./admin";
import "./css/student-profile.css";
import "./css/browsing.css";
import { getRole } from "../features/counter/profileSlice";
import { useSelector } from 'react-redux'

/* The above code is creating a theme object in JavaScript using the `createTheme` function. The theme
object has a `palette` property which contains two color properties: `primary` and `secondary`. The
`primary` color is set to `#4c8bf5` and the `secondary` color is set to `#f50057`. This theme object
can be used to style a user interface in a consistent way. */
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


export const Browsing = (test) => {

    const [jobList, setJobList] = useState([]);

    // Redux role
    const role = useSelector(getRole);

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

    const [searchKeyword, setSearchKeyword] = useState("");
    // Modal
    const jobsCollectionRef = collection(db, "jobs");

    const [user] = useAuthState(auth);

    /**
     * This function retrieves job data from a collection, filters and maps the data, and updates the
     * job list with additional information.
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

    useEffect(() => {
        getJobList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /**
     * This function creates a new job document in a Firestore collection and retrieves the updated job
     * list.
     */
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

    /**
     * This function deletes a job document and all documents in its inner collection of applicants.
     * @param id - The id parameter is the unique identifier of the job document that needs to be
     * deleted.
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
     * This function updates the title of a job document in a database and then retrieves the updated
     * list of jobs.
     * @param id - The `id` parameter is a string representing the unique identifier of a job document
     * in a Firestore database. It is used to retrieve the specific job document and update its `title`
     * field with a new value.
     */
    const updateJobTitle = async (id) => {
        const jobDoc = doc(db, "jobs", id);
        await updateDoc(jobDoc, { title: updatedTitle });
        getJobList();
    };

    /**
     * This function updates the season property of a job document in a Firestore database and then
     * retrieves the updated job list.
     * @param id - The `id` parameter is a string representing the unique identifier of a job document
     * in the "jobs" collection in Firestore. It is used to retrieve the specific document and update
     * its "season" field with the value of `updatedSeason`. The `getJobList()` function is then called
     * to update
     */
    const updateJobSeason = async (id) => {
        const jobDoc = doc(db, "jobs", id);
        await updateDoc(jobDoc, { season: updatedSeason });
        getJobList();
    };


    /**
     * This function updates the description of a job document in a database and then retrieves the
     * updated list of jobs.
     * @param id - The `id` parameter is a string representing the unique identifier of a job document
     * in the "jobs" collection of a Firestore database.
     */
    const updateJobDescription = async (id) => {
        const jobDoc = doc(db, "jobs", id);
        await updateDoc(jobDoc, { description: updatedDescription });
        getJobList();
    };

    /**
     * This function checks if a user has applied for a specific job.
     * @param jobId - The jobId parameter is a string representing the unique identifier of a job in a
     * database.
     * @returns The function `getApplicationStatus` returns a boolean value indicating whether the
     * current user (authenticated user) has applied for the job with the given `jobId`. If the user
     * has applied, it returns `true`, otherwise it returns `false`.
     */
    const getApplicationStatus = async (jobId) => {
        const user = auth.currentUser;
        const docRef = doc(db, "jobs", jobId, "applicants", user.uid);
        const docSnap = await getDoc(docRef);
        return docSnap.exists();
    }

    /**
     * The function adds a user as an applicant to a job in a Firestore database and then retrieves the
     * updated job list.
     * @param jobId - jobId is a string parameter representing the unique identifier of a job in the
     * "jobs" collection in Firestore. It is used to specify the document to which the applicant's
     * information will be added in the "applicants" subcollection.
     */
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

    /**
     * This function retrieves the accepted status of an applicant for a specific job.
     * @param jobId - The ID of the job for which you want to check the accepted status of an
     * applicant.
     * @param applicantId - The ID of the applicant whose accepted status is being retrieved.
     * @returns The function `getAcceptedStatus` returns a boolean value indicating whether the
     * applicant with the given `applicantId` has been accepted for the job with the given `jobId`. If
     * the document for the applicant exists in the database and has a field `accepted` with a truthy
     * value, the function returns `true`. Otherwise, it returns `false`.
     */
    const getAcceptedStatus = async (jobId, applicantId) => {
        const docRef = doc(db, "jobs", jobId, "applicants", applicantId);
        const docSnap = await getDoc(docRef);
        return docSnap.exists() ? docSnap.get("accepted") : false;
    }

    /**
     * This function retrieves a list of applicants for a specific job and includes their acceptance
     * status.
     * @param jobId - The jobId parameter is a string representing the ID of a job document in a
     * Firestore database.
     */
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

    /**
     * This function opens a list of applicants for a specific job.
     * @param jobId - The jobId parameter is a unique identifier for a job. It is used to retrieve the
     * list of applicants who have applied for that particular job.
     */
    const openApplicantList = async (jobId) => {
        setSelectedJob(jobId);
        getApplicantList(jobId);
        setIsApplicantListOpen(true);
    }

    /**
     * The function updates the "accepted" field of an applicant in a job's "applicants" collection and
     * retrieves the updated list of applicants for the selected job.
     * @param userId - The `userId` parameter is a string that represents the unique identifier of a
     * user who has applied for a job. This parameter is used to update the `accepted` field of the
     * applicant's document in the Firestore database.
     */
    const onAccept = async (userId) => {
        const docRef = doc(db, "jobs", selectedJob, "applicants", userId);

        await updateDoc(docRef, {
            accepted: true,
        })

        getApplicantList(selectedJob)

    }

    /**
     * This function sets the search keyword based on the value of the search bar input.
     * @param event - The `event` parameter is an object that contains information about the event that
     * triggered the function. In this case, it is likely an event object that is generated when the
     * user types something into a search bar. The object contains information such as the target
     * element (the search bar), the type of event
     */
    const handleSearchBarChange = (event) => {
        setSearchKeyword(event.target.value);
    };

    // To fix key issue related to false condition when checking search bar
    var counter = 0;

    /* The above code is rendering a job posting website with different functionalities for employers
    and students. Employers can create job postings, update job details, and view a list of
    applicants for their job postings. Students can view job postings, apply for jobs, and see their
    application status. The code is also implementing a search bar to filter job postings based on
    keywords. The code is written in React and uses various components such as Modal, TextField, and
    Button from Material-UI library. */
    return (
        <>
            {role === "admin" ?
                <div role="main"><AdminPage /></div>
                :
                <div role="main" className="browsing-div">
                    {role === "employer" ?
                        <div className="create-job-div">
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

                        <TextField
                            placeholder="Search…"
                            value={searchKeyword}
                            onChange={handleSearchBarChange}
                            className="search-bar"
                        />

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
                            </div >

                        </Modal >

                        {role === "employer" ?
                            // Employer Job Postings
                            jobList.filter((job) => job.userId === user.uid).map((job) => {
                                return (job.title.toLowerCase().includes(searchKeyword.toLowerCase())) ? (
                                    <div key={job.id} className="div-post">
                                        <h1 className="job-header">
                                            {job.title}
                                        </h1>
                                        <h4 className="job-header">
                                            {job.description}
                                        </h4>
                                        <p> Workterm: {job.season} {job.yearOfStart} </p>
                                        <p> Need Coop: {job.needCoop ? "Yes" : "No"} </p>

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
                                    </div >
                                )
                                    //Implemented to avoid getting unique key error
                                    : <div key={counter++}></div>
                            }
                            )
                            :
                            // Student + Unauthorized User Job Postings
                            jobList.map((job) => {
                                return (job.title.toLowerCase().includes(searchKeyword.toLowerCase())) ? (
                                    <div key={job.id} className="div-post">
                                        <h1 className="job-header">
                                            {job.title}
                                        </h1>
                                        <h4 className="job-header">
                                            {job.description}
                                        </h4>
                                        <p> Workterm: {job.season} {job.yearOfStart} </p>
                                        <p> Need Coop: {job.needCoop ? "Yes" : "No"} </p>

                                        {role === "student" ?
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
                                    </div >
                                )
                                    //Implemented to avoid getting unique key error
                                    : <div key={counter++}></div>
                            }
                            )
                        }
                    </div>
                </div >
            }
        </>
    );
};