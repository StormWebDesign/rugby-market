import { useState, useEffect } from "react";
import { db, auth } from "@/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

import { Cloudinary } from "@cloudinary/url-gen";
import { fill } from "@cloudinary/url-gen/actions/resize";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";

/* ---------------------------------------
   Cloudinary setup
--------------------------------------- */
const cld = new Cloudinary({
  cloud: {
    cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
  },
});

const PlayingImages = () => {
  const [images, setImages] = useState([]); // [{ publicId }]
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [modalImage, setModalImage] = useState(null);
  const [open, setOpen] = useState(false);

  /* ---------------------------------------
     Fetch images from Firestore
  --------------------------------------- */
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
        console.error("Error fetching images:", err);
        setErrorMessage("Failed to load images.");
      }
    };

    fetchUserImages();
  }, []);

  /* ---------------------------------------
     File select
  --------------------------------------- */
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length) {
      setSelectedFiles(files);
    }
  };

  /* ---------------------------------------
     Upload to Cloudinary
  --------------------------------------- */
  const handleUpload = async () => {
    if (!selectedFiles.length) {
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
        formData.append(
          "upload_preset",
          import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
        );

        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await response.json();

        if (!data.public_id) {
          throw new Error(data.error?.message || "Upload failed");
        }

        return { publicId: data.public_id };
      });

      const uploadedImages = await Promise.all(uploadPromises);

      const user = auth.currentUser;
      if (!user) return;

      const userDocRef = doc(db, "users", user.uid);
      const updatedImages = [...images, ...uploadedImages];

      await updateDoc(userDocRef, {
        playingImages: updatedImages,
      });

      setImages(updatedImages);
      setSuccessMessage("Images uploaded successfully!");
      setSelectedFiles([]);
    } catch (err) {
      console.error("Upload error:", err);
      setErrorMessage("An error occurred while uploading images.");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------------------------------
     Modal handlers
  --------------------------------------- */
  const openModal = (imageUrl) => {
    setModalImage(imageUrl);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    setModalImage(null);
  };

  /* ---------------------------------------
     Delete image (Firestore only – MVP)
  --------------------------------------- */
  const handleDeleteImage = async (publicId) => {
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const user = auth.currentUser;
      if (!user) return;

      const updatedImages = images.filter(
        (img) => img.publicId !== publicId
      );

      const userDocRef = doc(db, "users", user.uid);
      await updateDoc(userDocRef, {
        playingImages: updatedImages,
      });

      setImages(updatedImages);
      setSuccessMessage("Image deleted successfully!");
    } catch (err) {
      console.error("Delete error:", err);
      setErrorMessage("Failed to delete image.");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------------------------------
     Render
  --------------------------------------- */
  return (
    <div className="row">
      <div className="col-12">
        <label htmlFor="file-upload">
          <Input
            id="file-upload"
            type="file"
            inputProps={{ multiple: true }}
            sx={{ display: "none" }}
            onChange={handleFileChange}
          />
          <Button variant="contained" component="span" sx={{ mt: 2 }}>
            Upload Images
          </Button>
        </label>
      </div>

      {images.length ? (
        images.map(({ publicId }, index) => {
          const thumbnailUrl = cld
            .image(publicId)
            .resize(fill().width(250).height(250))
            .toURL();

          const originalUrl = cld.image(publicId).toURL();

          return (
            <div key={index} className="col-2 text-center">
              <img
                src={thumbnailUrl}
                alt="Thumbnail"
                className="uploaded-thumbnail"
                onClick={() => openModal(originalUrl)}
                style={{ cursor: "pointer", borderRadius: "8px" }}
              />

              <Button
                variant="contained"
                color="error"
                size="small"
                sx={{ mt: 1 }}
                onClick={() => handleDeleteImage(publicId)}
                disabled={loading}
              >
                Delete
              </Button>
            </div>
          );
        })
      ) : (
        <p className="mt-3">No images uploaded yet.</p>
      )}

      {selectedFiles.length > 0 && (
        <div className="col-12">
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={handleUpload}
            disabled={loading}
          >
            {loading
              ? "Uploading..."
              : `Upload ${selectedFiles.length} Image(s)`}
          </Button>
        </div>
      )}

      {/* Full image modal */}
      <Modal open={open} onClose={closeModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "white",
            p: 2,
            borderRadius: 2,
            maxWidth: "90%",
            maxHeight: "90%",
          }}
        >
          {modalImage && (
            <img
              src={modalImage}
              alt="Full size"
              style={{ maxWidth: "100%", maxHeight: "80vh" }}
            />
          )}

          <Button
            variant="contained"
            color="error"
            onClick={closeModal}
            sx={{ mt: 2 }}
          >
            Close
          </Button>
        </Box>
      </Modal>

      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default PlayingImages;
