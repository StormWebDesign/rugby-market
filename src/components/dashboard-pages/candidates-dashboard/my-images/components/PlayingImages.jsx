import { useState, useEffect } from "react";
import { db, auth } from "@/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";

const PlayingImages = () => {
    const [images, setImages] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [modalImage, setModalImage] = useState(null);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const fetchUserImages = async () => {
            try {
                const user = auth.currentUser;
                if (!user) return;

                const userDocRef = doc(db, "users", user.uid);
                const userDoc = await getDoc(userDocRef);

                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    setImages(userData.playingImages || []);
                }
            } catch (err) {
                console.error("Error fetching user images:", err);
                setErrorMessage("Failed to load images.");
            }
        };

        fetchUserImages();
    }, []);

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 0) {
            setSelectedFiles(files);
        }
    };

    const handleUpload = async () => {
        if (selectedFiles.length === 0) {
            setErrorMessage("Please select images before uploading.");
            return;
        }

        setLoading(true);
        setErrorMessage("");
        setSuccessMessage("");

        try {
            const uploadPromises = selectedFiles.map(async (file) => {
                const formData = new FormData();
                formData.append("file", file);
                formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

                // Upload the original image
                const response = await fetch(
                    `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
                    {
                        method: "POST",
                        body: formData,
                    }
                );

                const data = await response.json();
                if (!data.secure_url) {
                    throw new Error("Upload failed: " + (data.error?.message || "Unknown error"));
                }

                // ✅ Original full-size image URL
                const originalUrl = data.secure_url;

                // ✅ Thumbnail version (600x600px)
                const thumbnailUrl = originalUrl.replace(
                    "/upload/",
                    `/upload/c_fill,g_auto,w_600,h_600/`
                );

                return { originalUrl, thumbnailUrl };
            });

            const uploadedImages = await Promise.all(uploadPromises);

            const user = auth.currentUser;
            if (!user) {
                setErrorMessage("User not logged in.");
                return;
            }

            const userDocRef = doc(db, "users", user.uid);
            const updatedImages = [...images, ...uploadedImages];

            // Save both thumbnail & original image URLs in Firestore
            await updateDoc(userDocRef, { playingImages: updatedImages });

            setImages(updatedImages);
            setSuccessMessage("Images uploaded successfully!");
        } catch (err) {
            console.error("Error uploading images:", err);
            setErrorMessage("An error occurred while uploading the images.");
        } finally {
            setLoading(false);
            setSelectedFiles([]); // Clear selected files after upload
        }
    };

    const openModal = (imageUrl) => {
        setModalImage(imageUrl);
        setOpen(true);
    };

    const closeModal = () => {
        setOpen(false);
        setModalImage(null);
    };

    const handleDeleteImage = async (imageUrl) => {
        setLoading(true);
        setErrorMessage("");
        setSuccessMessage("");

        try {
            const user = auth.currentUser;
            if (!user) {
                setErrorMessage("User not logged in.");
                return;
            }

            const updatedImages = images.filter((img) => img.originalUrl !== imageUrl);

            const userDocRef = doc(db, "users", user.uid);
            await updateDoc(userDocRef, { playingImages: updatedImages });

            setImages(updatedImages);
            setSuccessMessage("Image deleted successfully!");
        } catch (err) {
            console.error("Error deleting image:", err);
            setErrorMessage("Failed to delete image.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="row">
            <div className="col-12">
                {/* ✅ MUI File Upload Button */}
                <label htmlFor="file-upload">
                    <Input
                        id="file-upload"
                        type="file"
                        inputProps={{ multiple: true }}
                        sx={{ display: "none" }}
                        onChange={handleFileChange}
                    />
                    <Button variant="contained" component="span" sx={{ marginTop: 2 }}>
                        Upload Images
                    </Button>
                </label>
            </div>
            {images.length > 0 ? (
                images.map(({ originalUrl, thumbnailUrl }, index) => (
                    <div key={index} className="col-2">
                        <img
                            src={thumbnailUrl}
                            alt={`Uploaded ${index}`}
                            className="uploaded-thumbnail"
                            onClick={() => openModal(originalUrl)} // ✅ Opens modal with original image
                        />
                        <Button
                            variant="contained"
                            color="error"
                            onClick={() => handleDeleteImage(originalUrl)}
                            disabled={loading}
                            sx={{ marginTop: 1 }}
                        >
                            {loading ? "Deleting..." : "Delete"}
                        </Button>
                    </div>
                ))
            ) : (
                <p>No images uploaded yet.</p>
            )}

            {selectedFiles.length > 0 && (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleUpload}
                    disabled={loading}
                    sx={{ marginTop: 2 }}
                >
                    {loading ? "Uploading..." : `Upload ${selectedFiles.length} Image(s)`}
                </Button>
            )}

            {/* ✅ MUI Modal for full-size image */}
            <Modal open={open} onClose={closeModal} aria-labelledby="image-modal" aria-describedby="image-preview">
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        bgcolor: "white",
                        boxShadow: 24,
                        p: 2,
                        borderRadius: 2,
                        maxWidth: "90%",
                        maxHeight: "90%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    {modalImage && (
                        <img
                            src={modalImage}
                            alt="Full View"
                            style={{ maxWidth: "100%", maxHeight: "80vh", borderRadius: "8px" }}
                        />
                    )}
                    <Button
                        variant="contained"
                        color="error"
                        onClick={closeModal}
                        sx={{ marginTop: 2 }}
                    >
                        Close
                    </Button>
                </Box>
            </Modal>
        </div>
    );
};

export default PlayingImages;
