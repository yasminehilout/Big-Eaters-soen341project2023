import { useState } from 'react';
import { storage } from "../config/firebase";
import { ref, uploadBytes } from "firebase/storage";


/**
 * The function allows the user to upload a file to a specified folder in Firebase storage.
 * @returns A functional component called `UploadFile` that renders an input element of type "file" and
 * a button element with the text "Upload File". When a file is selected using the input element, it is
 * stored in the component's state using the `useState` hook. When the "Upload File" button is clicked,
 * the `uploadFile` function is called, which uploads the selected file to a
 */
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