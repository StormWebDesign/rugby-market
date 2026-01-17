import { useState, useEffect } from "react";
import { db, auth } from "@/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { Cloudinary } from "@cloudinary/url-gen";
import { crop } from "@cloudinary/url-gen/actions/resize";
import { focusOn } from "@cloudinary/url-gen/qualifiers/gravity";
import { face } from "@cloudinary/url-gen/qualifiers/focusOn";

const LogoUpload = () => {
    const [logImg, setLogoImg] = useState(null);
    const [uploadedImgUrl, setUploadedImgUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

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
                    if (userData.fullImage) {
                        setUploadedImgUrl(userData.fullImage);
                    }
                }
            } catch (err) {
                console.error("Error fetching user data:", err);
                setErrorMessage("Failed to load profile image.");
            }
        };

        fetchUserData();
    }, []);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setLogoImg(file);
        }
    };

    const handleUploadToCloudinary = async () => {
        if (!logImg) {
            setErrorMessage("Please select an image before uploading.");
            return;
        }

        setLoading(true);
        setErrorMessage("");
        setSuccessMessage("");

        try {
            const formData = new FormData();
            formData.append("file", logImg);
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

                // Generate URLs using the SDK
                const fullImage = cloudinary.image(data.public_id).toURL(); // Full Image URL

                const thumbnailImage = cloudinary
                    .image(data.public_id)
                    .resize(
                        crop()
                            .width(250)
                            .height(250)
                            .gravity(focusOn(face()))
                    )
                    .toURL(); // Thumbnail Image URL

                console.log("Full Image URL:", fullImage);
                console.log("Thumbnail Image URL:", thumbnailImage);

                // Save URLs to Firestore
                const userDocRef = doc(db, "users", user.uid);
                await updateDoc(userDocRef, {
                    fullImage,
                    thumbnailImage,
                });

                setUploadedImgUrl(fullImage);
                setSuccessMessage("Profile image uploaded successfully!");
            } else {
                setErrorMessage(`Failed to upload image: ${data.error?.message || "Unknown error"}`);
            }
        } catch (err) {
            console.error("Error uploading to Cloudinary:", err);
            setErrorMessage("An error occurred while uploading the image.");
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteImage = async () => {
        setLoading(true);
        setErrorMessage("");
        setSuccessMessage("");

        try {
            const user = auth.currentUser;
            if (!user) {
                setErrorMessage("User not logged in.");
                return;
            }

            const userDocRef = doc(db, "users", user.uid);
            await updateDoc(userDocRef, {
                fullImage: "",
                thumbnailImage: "",
            });

            setUploadedImgUrl("");
            setSuccessMessage("Profile image removed successfully!");
        } catch (err) {
            console.error("Error removing image:", err);
            setErrorMessage("An error occurred while removing the image.");
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="uploading-outer">
            {uploadedImgUrl && (
                <div className="existing-image">
                    <img
                        src={uploadedImgUrl}
                        alt="Uploaded Profile"
                        className="portrait-circle"
                    />
                    <button
                        className="theme-btn btn btn-style btn-danger"
                        onClick={handleDeleteImage}
                        disabled={loading}
                    >
                        {loading ? "Deleting..." : "Delete Image"}
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
                    {uploadedImgUrl ? "Replace Headshot" : "Upload Headshot"}
                </label>
            </div>


            {logImg && (
                <button
                    className="theme-btn btn-style-one"
                    onClick={handleUploadToCloudinary}
                    disabled={loading}
                >
                    {loading ? "Uploading..." : "Save Image"}
                </button>
            )}

            {successMessage && <p className="success-message">{successMessage}</p>}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
    );
};

export default LogoUpload;
