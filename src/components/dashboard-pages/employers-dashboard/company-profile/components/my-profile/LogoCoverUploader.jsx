import { useState, useEffect } from "react";
import { db, auth } from "@/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { Cloudinary } from "@cloudinary/url-gen";
import { crop } from "@cloudinary/url-gen/actions/resize";
import { focusOn } from "@cloudinary/url-gen/qualifiers/gravity";
import { face } from "@cloudinary/url-gen/qualifiers/focusOn";

const LogoCoverUploader = () => {
    const [logoImg, setLogoImg] = useState(null);
    const [logoURL, setLogoURL] = useState("");
    const [uploading, setUploading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const cloudinary = new Cloudinary({
        cloud: {
            cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
        },
    });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const user = auth.currentUser;
                if (!user) return;

                const userDocRef = doc(db, "users", user.uid);
                const userDoc = await getDoc(userDocRef);

                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    if (userData.club_logoImageURL) setLogoURL(userData.club_logoImageURL);
                }
            } catch (err) {
                console.error("Error fetching user data:", err);
                setErrorMessage("Failed to load logo.");
            }
        };

        fetchUserData();
    }, []);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setLogoImg(file);
    };

    const handleUploadToCloudinary = async () => {
        if (!logoImg) {
            setErrorMessage("Please select a logo before uploading.");
            return;
        }

        setUploading(true);
        setErrorMessage("");
        setSuccessMessage("");

        try {
            const formData = new FormData();
            formData.append("file", logoImg);
            formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

            // Upload the image to Cloudinary
            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
                {
                    method: "POST",
                    body: formData,
                }
            );

            const data = await response.json();
            console.log("Cloudinary upload response:", data);

            if (data.public_id) {
                const user = auth.currentUser;
                if (!user) {
                    setErrorMessage("User not logged in.");
                    return;
                }

                // Generate URLs using the Cloudinary SDK
                const fullImageURL = cloudinary.image(data.public_id).toURL(); // Full Image URL

                console.log("Full Image URL:", fullImageURL);

                // Save URLs to Firestore
                const userDocRef = doc(db, "users", user.uid);
                await updateDoc(userDocRef, {
                    club_logoImageURL: fullImageURL,
                });

                // Update state with the uploaded logo URL
                setLogoURL(fullImageURL);

                setSuccessMessage("Logo uploaded successfully!");
            } else {
                setErrorMessage(`Failed to upload logo: ${data.error?.message || "Unknown error"}`);
            }
        } catch (err) {
            console.error("Error uploading to Cloudinary:", err);
            setErrorMessage("An error occurred while uploading the logo.");
        } finally {
            setUploading(false);
        }
    };

    const handleDeleteLogo = async () => {
        if (!logoURL) {
            setErrorMessage("No logo to delete.");
            return;
        }

        setUploading(true);
        setErrorMessage("");
        setSuccessMessage("");

        try {
            const user = auth.currentUser;
            if (!user) {
                setErrorMessage("User not logged in.");
                return;
            }

            const publicId = logoURL.split("/").pop().split(".")[0];
            console.log("Public ID:", publicId);

            const deleteResponse = await fetch(
                `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/destroy`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ public_id: publicId }),
                }
            );

            const deleteData = await deleteResponse.json();
            console.log("Delete Data:", deleteData);

            if (deleteData.result === "ok") {
                const userDocRef = doc(db, "users", user.uid);
                await updateDoc(userDocRef, {
                    club_logoImageURL: "",
                });

                setLogoURL("");
                setSuccessMessage("Logo deleted successfully!");
            } else {
                setErrorMessage("Failed to delete the logo from Cloudinary.");
            }
        } catch (err) {
            console.error("Error deleting logo:", err);
            setErrorMessage("An error occurred while deleting the logo.");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="uploading-outer">
            {logoURL && (
                <div className="existing-image">
                    <img src={logoURL} alt="Uploaded Logo" className="uploaded-image" />
                    <button
                        className="theme-btn btn btn-style btn-danger"
                        onClick={handleDeleteLogo}
                        disabled={uploading}
                    >
                        {uploading ? "Deleting..." : "Delete Logo"}
                    </button>
                </div>
            )}

            <div className="uploadButton">
                <input
                    className="uploadButton-input"
                    type="file"
                    accept="image/*"
                    id="upload"
                    onChange={handleFileChange}
                />
                <label className="uploadButton-button ripple-effect" htmlFor="upload">
                    {logoURL ? "Replace Logo" : "Upload Logo"}
                </label>
            </div>

            {logoImg && (
                <button
                    className="theme-btn btn-style-one"
                    onClick={handleUploadToCloudinary}
                    disabled={uploading}
                >
                    {uploading ? "Uploading..." : "Save Logo"}
                </button>
            )}

            {successMessage && <p className="success-message">{successMessage}</p>}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
    );
};

export default LogoCoverUploader;
