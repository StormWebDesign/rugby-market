import { useState, useEffect } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { doc, updateDoc, arrayUnion, arrayRemove, getDoc } from "firebase/firestore";
import { auth, db } from "@/firebase";

const storage = getStorage(); // Initialize Firebase Storage

// Validation function
function checkFileTypes(files) {
    const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    for (let i = 0; i < files.length; i++) {
        if (!allowedTypes.includes(files[i].type)) {
            return false;
        }
    }
    return true;
}

const CvUploader = () => {
    const [files, setFiles] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchFiles = async () => {
            const user = auth.currentUser;
            if (!user) return;

            try {
                const userDocRef = doc(db, "users", user.uid);
                const userDoc = await getDoc(userDocRef);
                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    if (userData.files) {
                        setFiles(userData.files);
                    }
                }
            } catch (err) {
                console.error("Error fetching files:", err);
            }
        };

        fetchFiles();
    }, []);

    const handleFileUpload = async (e) => {
        const selectedFiles = Array.from(e.target.files);
        if (!checkFileTypes(selectedFiles)) {
            setError("Only .doc, .docx, and .pdf files are allowed.");
            return;
        }

        setLoading(true);
        setError("");

        const user = auth.currentUser;
        if (!user) {
            setError("User not logged in.");
            setLoading(false);
            return;
        }

        const userDocRef = doc(db, "users", user.uid);

        for (const file of selectedFiles) {
            try {
                // Upload file to Firebase Storage
                const fileRef = ref(storage, `cv_uploads/${user.uid}/${file.name}`);
                await uploadBytes(fileRef, file);

                // Get the file's download URL
                const fileUrl = await getDownloadURL(fileRef);

                // Update Firestore with the file reference
                await updateDoc(userDocRef, {
                    files: arrayUnion({
                        name: file.name,
                        url: fileUrl,
                        uploadedAt: new Date(),
                    }),
                });

                // Add the file to the state
                setFiles((prev) => [
                    ...prev,
                    { name: file.name, url: fileUrl, uploadedAt: new Date() },
                ]);
            } catch (err) {
                console.error("Error uploading file:", err);
                setError("Error uploading one or more files. Please try again.");
            }
        }

        setLoading(false);
    };

    const handleDeleteFile = async (file) => {
        const user = auth.currentUser;
        if (!user) return;

        const userDocRef = doc(db, "users", user.uid);
        const fileRef = ref(storage, `resumes/${user.uid}/${file.name}`);

        try {
            // Delete the file from Firebase Storage
            await deleteObject(fileRef);

            // Remove the file reference from Firestore
            await updateDoc(userDocRef, {
                files: arrayRemove(file),
            });

            // Update state
            setFiles((prev) => prev.filter((f) => f.name !== file.name));
        } catch (err) {
            console.error("Error deleting file:", err);
            setError("Error deleting the file. Please try again.");
        }
    };

    return (
        <>
            {/* Start Upload resume */}
            <div className="uploading-resume">
                <div className="uploadButton">
                    <input
                        className="uploadButton-input"
                        type="file"
                        name="attachments[]"
                        accept=".doc,.docx,.pdf"
                        id="upload"
                        multiple
                        onChange={handleFileUpload}
                    />
                    <label className="cv-uploadButton" htmlFor="upload">
                        <span className="title">Drop files here to upload</span>
                        <span className="text">
                            Maximum file size is 5MB. Allowed file types: .doc, .docx, .pdf
                        </span>
                        <span className="theme-btn btn-style-one">
                            {loading ? "Uploading..." : "Upload Resume"}
                        </span>
                        {error && <p className="ui-danger mb-0">{error}</p>}
                    </label>
                </div>
            </div>
            {/* End upload-resume */}

            {/* Start resume Preview */}
            <div className="files-outer">
                {files.map((file, i) => (
                    <div key={i} className="file-edit-box">
                        <span className="title">{file.name}</span>
                        <div className="edit-btns">
                            <a href={file.url} target="_blank" rel="noopener noreferrer">
                                <span className="la la-eye"></span>
                            </a>
                            <button onClick={() => handleDeleteFile(file)}>
                                <span className="la la-trash"></span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            {/* End resume Preview */}
        </>
    );
};

export default CvUploader;
