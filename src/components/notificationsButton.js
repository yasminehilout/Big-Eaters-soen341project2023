import { db, auth } from "../config/firebase";
import { useEffect, useState } from 'react';
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import React from 'react'
import Modal from 'react-modal'

//MUI 
import EmailIcon from '@mui/icons-material/Email';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';

import "./css/student-profile.css";

export const NotificationsButton = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [notificationList, setNotificationList] = useState([]);

    /**
     * The function retrieves a list of job notifications from a database and filters them based on the
     * user's acceptance status.
     */
    const getNotificationList = async () => {
        try {
            const jobsCollectionRef = collection(db, "jobs");
            const querySnapshot = await getDocs(jobsCollectionRef);

            const filteredData = querySnapshot.docs.map(async (job) => {
                // Check the applicants subcollection for the current user's application status
                let accepted = await getAcceptanceStatus(job.id);

                if (!accepted) { return null; }

                const title = await getTitle(job.id);
                return {
                    id: job.id,
                    companyName: title
                };
            });

            const updatedData = (await Promise.all(filteredData)).filter(job => job !== null);
            setNotificationList(updatedData);
        } catch (err) {
            console.error(err);
        }
    };
    
    useEffect(() => {
        getNotificationList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /**
     * This function retrieves the acceptance status of a user for a specific job from a Firestore
     * database.
     * @param jobId - The jobId parameter is a string representing the unique identifier of a job in a
     * database.
     * @returns The function `getAcceptanceStatus` returns a boolean value indicating whether the
     * current user has been accepted for the job with the given `jobId`. If the user has not applied
     * for the job or has applied but not been accepted, it returns `false`.
     */
    const getAcceptanceStatus = async (jobId) => {
        const user = auth.currentUser;
        const docRef = doc(db, "jobs", jobId, "applicants", user.uid);
        const docSnap = await getDoc(docRef);
        return docSnap.exists() ? docSnap.get("accepted") : false;
    }

    /**
     * This function retrieves the title of a job from a Firestore database using its ID.
     * @param jobId - The jobId parameter is a string that represents the unique identifier of a job
     * document in a Firestore database.
     * @returns The function `getTitle` returns the title of the job with the specified `jobId` if it
     * exists in the "jobs" collection in the Firestore database. If the job does not exist, it returns
     * `false`.
     */
    const getTitle = async (jobId) => {
        const docRef = doc(db, "jobs", jobId);
        const docSnap = await getDoc(docRef);
        return docSnap.exists() ? docSnap.get("title") : false;
    }

    /* `const StyledBadge` is a styled component created using the `styled` function from MUI. It is
    styling the `Badge` component and setting the position of the badge within it. The `&
    .MuiBadge-badge` selector is targeting the child element of the `Badge` component that displays
    the actual badge count, and setting its position to be 10 pixels from the top and right edges of
    the parent container, with a padding of 0 on the left and right sides. */
    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            right: 10,
            top: 10,
            padding: '0 4px',
        },
    }));

/* The code is defining a React component called `NotificationsButton` that displays a button with an
email icon and a badge indicating the number of job notifications the user has. When the user clicks
on the button, a modal pops up displaying a list of job offers from companies that have accepted the
user's application. The list is retrieved from a Firestore database using the `getNotificationList`
function, which filters the jobs based on the user's acceptance status. The `notificationList` state
variable is used to store the filtered list of job offers, and the `isOpen` state variable is used
to control whether the modal is displayed or not. The `StyledBadge` component is a styled version of
the `Badge` component from MUI that positions the badge in the top-right corner of the button. */
    return (
        <div>
            <><button className="profileBtn" onClick={() => {
                // getNotificationList();
                setIsOpen(true);
            }}>
                <EmailIcon style={{ fontSize: 'small' }} />
            </button>
            {!isOpen && <StyledBadge badgeContent={notificationList.length} color="error" />}</>
            
            <Modal ariaHideApp={false} className='profile' isOpen={isOpen} onRequestClose={() => setIsOpen(false)}>

                <div className='modalBackground'>
                    <div className='modalContainer'>
                        <div className='titleCloseBtn'>
                            <div className='title'>
                                <h1>Company Offers</h1>
                            </div>
                            <button className='xBtn' onClick={() => setIsOpen(false)} > Close </button>
                        </div>
                        <div className="applicantList-body">{notificationList.map((notification) => {
                            return (
                                <div key={notification.id} className="applicant">
                                    <span>{notification.companyName} Offer</span>
                                </div>
                            )
                        })}
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
}   