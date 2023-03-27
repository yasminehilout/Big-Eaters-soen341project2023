import { db, auth } from "../config/firebase";
import { useEffect, useState } from 'react';
import { getDocs, getDoc, collection, addDoc, setDoc, deleteDoc, updateDoc, doc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import "./css/browsing.css";
import "./employer-profile.js";



// REDUX
// import { useSelector, useDispatch } from 'react-redux';

export const Browsing = (test) => {

    const [jobList, setJobList] = useState([]);
    const [applicantList, setApplicantList] = useState([]);

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

    const jobsCollectionRef = collection(db, "jobs");
    // not working
    // const applicantCollectionRef = collection(jobsCollectionRef, "aplicants");
    // console.log(applicantCollectionRef);

    const getJobList = async () => {
        try {
            const data = await getDocs(jobsCollectionRef);
            const filteredData = data.docs.map(async (doc) => {
                let applied = false;
                if (auth.currentUser) {
                    applied = await getApplicationStatus(doc.id);
                }
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
    const getApplicantList = async (jobId) => {
        // const applicants = collection(db,"jobs");
        // const data = await getDocs(applicants);
        // console.log(data.docs[0].data);
        const docRef = doc(db, "jobs", jobId, "applicants");
        const docSnap = await getDoc(docRef);

        //const jobDoc = doc(db, "jobs", jobId);
        // const appID = doc(jobDoc, "applicants");

        try {

            // const docRef = doc(db, "jobs", jobId, "applicants");
            // // console.log(docRef);
            // const querySnapshot = await getDoc(docRef);
            // console.log(querySnapshot.ref);

            // access the inner docs example
            // const applicantRef = firebase.firestore().collection("jobs").doc(jobId).collection("applicants").doc(groupID).collection("name");
            // const replies = await applicantRef.where("CV", "==", "1234").get()
            // console.log(replies.docs.map(reply => ({ id: reply.id, ...reply.data() })))

            //setApplicantList(updatedData);
            //console.log("applicantList");

        } catch (err) {
            console.error(err);
        }

    };
    const displayApplicants = () => {
        console.log(applicantList);
        applicantList.map((applicant) => {
            return (<>
                <div>{applicant.CV}</div>
                <div>{applicant.email}</div>
                <div>{applicant.name}</div>

            </>)
        })
    }

    useEffect(() => {
        getJobList();
        getApplicantList();
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

    const getApplicants = async (jobId) => {
        const jobDoc = doc(db, "jobs", jobId);
        const innerCollectionRef = collection(jobDoc, "applicants");
      
        const querySnapshot = await getDocs(innerCollectionRef);
        // For each user print their data.
        querySnapshot.forEach(async (doc) => {
          console.log(doc.data());
        });
    }

    const onApply = async (jobId) => {
        const user = auth.currentUser;
        try {
            await setDoc(doc(db, "jobs", jobId, "applicants", user.uid), {
                CV: "4 years experience, PHD",
                name: user.displayName,
                email: user.email
            });
        } catch (err) {
            console.error(err);
        }
        getJobList();
    }
    // const uploadFile = async () => {
    //     if (!fileUpload) return;
    //     const filesFolderRef = ref(storage, 'projectFiles/fileUpload.name');
    //     try {
    //         await uploadBytes(filesFolderRef, fileUpload);
    //     } catch (err) {
    //         console.error(err);
    //     }
    // };

    const test2 = () => {
        
        if (test.test === "employer") {
            return true;
        }
        else{
            return false;
        }

    }

    const [user] = useAuthState(auth);
    const [toggleApplicantView, setToggleApplicantView] = useState(false);
    return (
        <div className="browsing-div">
            {/* {console.log(test)} */}
          {user || test2() ? 
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
                {jobList.map((job) => (

                    <div key={job.id} className="div-post">

                        {user && test2() && user.id == job.userId ? <>

                            <h1 className="job-header">
                                {job.title}
                            </h1>
                            <h4 className="job-header">
                                {job.description}
                            </h4>
                            <p> Workterm: {job.season} {job.yearOfStart} </p>
                            <p> Need Coop: {job.needCoop ? "Yes" : "No"} </p>

                        </> : <><h1 className="job-header">
                            {job.title}
                        </h1>
                            <h4 className="job-header">
                                {job.description}
                            </h4>
                            <p> Workterm: {job.season} {job.yearOfStart} </p>
                            <p> Need Coop: {job.needCoop ? "Yes" : "No"} </p></>

                        }

                        {!user && !(test2()) ?
                            <>
                                {/* Show different buttons depending on the application status */}
                                {
                                <> {job.applied ? <>
                                    <button className="j-button applied">Applied</button>
                                </> : <>
                                    <button className="j-button apply" onClick={() => onApply(job.id)}>Apply</button>
                                    
                                </>} 
                                <button className="j-button apply" onClick={() => getApplicants(job.id)}>GET APPLICANTS</button>
                                </>
                                }

                            </>
                            :
                            <></>
                        }



                        {user || test2() ?
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
                                <button className="j-button" onClick={() => getApplicantList(job.id)} >get Applicants</button>
                                <button className="j-button" onClick={() => setToggleApplicantView(!toggleApplicantView)} >See Applicants</button>
                                {toggleApplicantView ? <div>
                                    {/* {displayApplicants()} */}
                                </div> : <></>}
                                {/* change setapplicant view button to doc api call to display unique view */}

                                {/* {job.applied ? (
                                    <button className="j-button-applied">Applied</button>
                                ) : (
                                    <button className="j-button" onClick={() => onApply(job.id)}>Apply</button>
                                )} */}

                            </>
                            :
                            <></>}
                    </div>
                ))}
            </div >
        </div >
    );
};
