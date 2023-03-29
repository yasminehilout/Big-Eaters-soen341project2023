import { db } from "../config/firebase";
import { useState } from 'react';
import { getDocs, doc } from "firebase/firestore";
import React from 'react'
import Modal from 'react-modal'
import EmailIcon from '@mui/icons-material/Email';

export const NotificationsButton = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [notificationList, setNotificationList] = useState([]);

   
    const getNotificationList = async () => {
        try {
            const jobsCollectionRef = doc(db, "jobs");
            const data = await getDocs(jobsCollectionRef);
            const filteredData = data.docs.map(async (doc) => {
                let applied = false;
                return {
                    ...doc.data(),
                    id: doc.id,
                    applied: applied
                }
            });
            const updatedData = await Promise.all(filteredData);
            setNotificationList(updatedData);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <button className="profileBtn" onClick={() => {
                getNotificationList();
                setIsOpen(true);}
                }><EmailIcon style={{ fontSize: 'small' }} /></button>
            <Modal ariaHideApp={false} className='profile' isOpen={isOpen} onRequestClose={() => setIsOpen(false)}>
            {notificationList.map((applicant) => {
                                        return (
                                            <div key={applicant.id} className="applicant">
                                                <span>{applicant.name}</span>
                                            </div>
                                        )
                                    })}
            </Modal>
        </div>

    );
}   