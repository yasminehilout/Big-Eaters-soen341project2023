import { db, auth } from "../config/firebase";
import { useEffect, useState } from 'react';
import { getDocs, collection, addDoc, deleteDoc, updateDoc, doc } from "firebase/firestore";
// import { ref, uploadBytes } from "firebase/storage";
import { useAuthState } from "react-firebase-hooks/auth";
import "./css/browsing.css";

export const Browsing = () => {

    const [jobList, setJobList] = useState([]);

    // New Job States
    const [newJobTitle, setNewJobTitle] = useState("");
    const [newSeason, setNewSeason] = useState("Fall"); // ["Fall", "Winter", "Summer"] 
    const [newYearOfStart, setNewYearOfStart] = useState(0);
    const [needCoop, setNeedCoop] = useState(false);

    // Update Title State
    const [updatedTitle, setUpdatedTitle] = useState("");

    // Update Season State
    const [updatedSeason, setUpdatedSeason] = useState("");


    const jobsCollectionRef = collection(db, "jobs");

    const getJobList = async () => {
        try {
            const data = await getDocs(jobsCollectionRef);
            const filteredData = data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            setJobList(filteredData);
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
                userId: auth?.currentUser?.uid,
            });
            getJobList();
        } catch (err) {
            console.error(err);
        }
    };

    const deleteJob = async (id) => {
        const jobDoc = doc(db, "jobs", id);
        await deleteDoc(jobDoc);
        getJobList();
    };

    const updateJobTitle = async (id) => {
        const jobDoc = doc(db, "jobs", id);
        await updateDoc(jobDoc, { title: updatedTitle });
        getJobList();
    };

    const updateJobSeason = async (id) => {
        const jobDoc = doc(db, "jobs", id);
        await updateDoc(jobDoc, { season: updatedSeason });
        getJobList();
    };

    // const uploadFile = async () => {
    //     if (!fileUpload) return;
    //     const filesFolderRef = ref(storage, 'projectFiles/fileUpload.name');
    //     try {
    //         await uploadBytes(filesFolderRef, fileUpload);
    //     } catch (err) {
    //         console.error(err);
    //     }
    // };

    const [user] = useAuthState(auth);

    return (
        <div className="browsing-div">
            {user ?
            <div>
                <input 
                    className="j-input"
                    placeholder="Job title..."
                    onChange={(e) => setNewJobTitle(e.target.value)}
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
                        <h1 className="job-header">
                            {job.title}
                        </h1>
                        <p> Workterm: {job.season} {job.yearOfStart} </p>
                        <p> Need Coop: {job.needCoop ? "Yes" : "No"} </p>

                        {user ?
                        <>
                            <button className="update-button" onClick={() => deleteJob(job.id)}> Delete This Job</button>

                            {/* Update Title */}
                            <input
                                className="j-input"
                                placeholder="new title..."
                                onChange={(e) => setUpdatedTitle(e.target.value)}
                            />
                            <button className="update-button" onClick={() => updateJobTitle(job.id)}> Update Title</button>

                            {/* Update Season */}
                            <input
                                className="j-input"
                                placeholder="new season..."
                                onChange={(e) => setUpdatedSeason(e.target.value)}
                            />
                            <button className="update-button" onClick={() => updateJobSeason(job.id)}> Update Season</button>

                            <button className="j-button" onClick={() => {}}>Apply</button>

                            {/* File Upload */}
                            {/* <input
                                type="file"
                                onChange={(e) => setFileUpload(e.target.files[0])} />
                            <button onClick={uploadFile}> Upload File</button> */}
                        </>
                        : <></>}
                    </div>
                ))}
            </div>
        </div>
    );
};