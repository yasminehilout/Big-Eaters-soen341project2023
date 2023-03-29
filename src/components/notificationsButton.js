import { db, auth } from "../config/firebase";
import { useState } from 'react';
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


    // console.log(auth.currentUser.uid)
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

    const getAcceptanceStatus = async (jobId) => {
        const user = auth.currentUser;
        const docRef = doc(db, "jobs", jobId, "applicants", user.uid);
        const docSnap = await getDoc(docRef);
        return docSnap.exists() ? docSnap.get("accepted") : false;
    }

    const getTitle = async (jobId) => {
        const docRef = doc(db, "jobs", jobId);
        const docSnap = await getDoc(docRef);
        return docSnap.exists() ? docSnap.get("title") : false;
    }

    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
          right: 10,
          top: 30,
          padding: '0 4px',
        },
      }));

    return (
        <div>
            <StyledBadge badgeContent={notificationList.length} color="error">
                <button className="profileBtn" onClick={() => {
                    getNotificationList();
                    setIsOpen(true);
                }}>
                    <EmailIcon style={{ fontSize: 'small' }} />
                </button>
            </StyledBadge>
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