import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { db, auth } from "@/firebase";
import { doc, updateDoc, arrayUnion, arrayRemove, getDoc } from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark as solidBookmark } from "@fortawesome/free-solid-svg-icons";
import { faBookmark as regularBookmark } from "@fortawesome/pro-regular-svg-icons"; // Updated to correct package
import { library } from "@fortawesome/fontawesome-svg-core";
import { onAuthStateChanged } from "firebase/auth";

// Add icons to FontAwesome library
library.add(solidBookmark, regularBookmark);

const BookmarkButton = ({ jobId }) => {
  const [userType, setUserType] = useState(null);
  const [userId, setUserId] = useState(null);
  const [shortlistedJobs, setShortlistedJobs] = useState([]);

  // Fetch the logged-in user data
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserId(user.uid);
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setUserType(userSnap.data().userType);
          setShortlistedJobs(userSnap.data().shortlistedJobs || []);
        }
      }
    });
  }, []);

  // Function to toggle shortlist job
  const toggleShortlistJob = async () => {
    if (!userId) return;

    try {
      const userRef = doc(db, "users", userId);
      if (shortlistedJobs.includes(jobId)) {
        await updateDoc(userRef, {
          shortlistedJobs: arrayRemove(jobId),
        });
        setShortlistedJobs(shortlistedJobs.filter((id) => id !== jobId));
      } else {
        await updateDoc(userRef, {
          shortlistedJobs: arrayUnion(jobId),
        });
        setShortlistedJobs([...shortlistedJobs, jobId]);
      }
    } catch (error) {
      console.error("Error updating shortlist:", error);
    }
  };

  // Show the button only if the user is a Player
  if (userType !== "Player") return null;

  return (
    <button className="bookmark-btn" onClick={toggleShortlistJob}>
      <FontAwesomeIcon
        icon={shortlistedJobs.includes(jobId) ? solidBookmark : regularBookmark}
      />
    </button>
  );
};

BookmarkButton.propTypes = {
  jobId: PropTypes.string,
};

export default BookmarkButton;
