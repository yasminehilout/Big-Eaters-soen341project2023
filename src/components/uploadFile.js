import { useState } from 'react';
import { storage } from "../config/firebase";
import { ref, uploadBytes } from "firebase/storage";


export const UploadFile = () => {
    const [fileUpload, setFileUpload] = useState(null);

    const uploadFile = async () => {
        if (!fileUpload) return;
        const filesFolderRef = ref(storage, 'projectFiles/fileUpload.name');
        try {
            await uploadBytes(filesFolderRef, fileUpload);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <input
                type="file"
                onChange={(e) => setFileUpload(e.target.files[0])}
            />
            <button className="uploadFileButton" onClick={uploadFile}> Upload File </button>
        </div>
    );

};