import { useState, useEffect } from "react";
import { db, auth } from "@/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const SocialNetworkBox = () => {
  const [facebook, setFacebook] = useState("");
  const [twitter, setTwitter] = useState("");
  const [instagram, setInstagram] = useState("");

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch user data from Firestore and populate fields
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (!user) return;

        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          setFacebook(userData.facebook || "");
          setTwitter(userData.twitter || "");
          setInstagram(userData.instagram || "");
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
        setErrorMessage("Failed to fetch user data.");
      }
    };

    fetchUserData();
  }, []);

  // Save the contact information to Firestore
  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const user = auth.currentUser;
      if (!user) {
        setErrorMessage("User is not logged in.");
        return;
      }

      // Save data to Firestore
      const userDocRef = doc(db, "users", user.uid);
      await updateDoc(userDocRef, {
        facebook,
        twitter,
        instagram,
      });

      setSuccessMessage("Social Media information updated successfully!");
    } catch (err) {
      console.error("Error saving Social Media information:", err);
      setErrorMessage("Failed to save Social Media information. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSave} className="default-form">
      <div className="row">

        {/* Facebook */}
        <div className="form-group col-lg-4 col-md-12">
          <label>Facebook</label>
          <input
            type="text"
            value={facebook}
            onChange={(e) => setFacebook(e.target.value)}
            placeholder="Enter your club Facebook address"
          />
        </div>

        {/* Twitter */}
        <div className="form-group col-lg-4 col-md-12">
          <label>X (Twitter)</label>
          <input
            type="text"
            value={twitter}
            onChange={(e) => setTwitter(e.target.value)}
            placeholder="Enter your club's X account name"
          />
        </div>

        {/* Instagram */}
        <div className="form-group col-lg-4 col-md-12">
          <label>Instagram</label>
          <input
            type="text"
            value={instagram}
            onChange={(e) => setInstagram(e.target.value)}
            placeholder="Enter your club's Instagram name"
          />
        </div>


        {/* Submit Button */}
        <div className="form-group col-lg-6 col-md-12">
          <button type="submit" className="theme-btn btn-style-one" disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>

      {/* Feedback Messages */}
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </form>
  );
};

export default SocialNetworkBox;
