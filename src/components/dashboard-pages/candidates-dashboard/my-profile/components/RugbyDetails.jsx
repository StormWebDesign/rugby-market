import { useState, useEffect } from "react";
import { db, auth } from "@/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import Select from "react-select";
import Input from '@mui/material/Input';

import { catPositions } from "@/data/positions";
import { catTypes } from "@/data/rugbyTypes";

const RugbyDetails = () => {
  const [formData, setFormData] = useState({
    currentClub: "",
    yearStarted: "",
    positions: [],
    rugbyType: [],
    allowSearch: "Yes",
  });

  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 81 }, (_, i) => currentYear - i);


  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          setErrorMessage("User is not logged in.");
          return;
        }

        // Fetch user data from Firestore
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          setFormData((prevData) => ({
            ...prevData,
            ...userData,
            positions: userData.positions || [], // Ensure positions is an array
            rugbyType: userData.rugbyType || [], // Ensure rugbyType is an array
          }));
        } else {
          console.error("No user data found in Firestore.");
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
        setErrorMessage("Failed to fetch user data.");
      } finally {
        setIsFetching(false);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handlePositionChange = (selectedOptions) => {
    setFormData((prevData) => ({
      ...prevData,
      positions: selectedOptions.map((option) => option.value),
    }));
  };

  const handleTypeChange = (selectedOptions) => {
    setFormData((prevData) => ({
      ...prevData,
      rugbyType: selectedOptions.map((option) => option.value),
    }));
  };

  const handleSubmit = async (e) => {
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
        ...formData,
      });

      setSuccessMessage("Profile updated successfully!");
    } catch (err) {
      console.error("Error updating profile:", err);
      setErrorMessage("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (isFetching) {
    return <p>Loading profile data...</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="default-form">
      <div className="row">

        {/* Current Club */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Current Club</label>
          <input
            type="text"
            name="currentClub"
            placeholder=""
            value={formData.currentClub}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Year Started */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Year Joined</label>
          <select
            name="yearStarted"
            className="form-control"
            value={formData.yearStarted}
            onChange={handleInputChange}
            required
          >
            <option value="">Select year joined</option>
            {yearOptions.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>

        </div>
        {/* positions */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Playing Positions</label>
          <Select
            value={formData.positions.map((value) =>
              catPositions.find((option) => option.value === value)
            )}
            isMulti
            name="positions"
            options={catPositions}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={handlePositionChange}
          />
        </div>

        {/* Rugby Type */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Type of Rugby</label>
          <Select
            value={formData.rugbyType.map((value) =>
              catTypes.find((option) => option.value === value)
            )}
            isMulti
            name="rugbyType"
            options={catTypes}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={handleTypeChange}
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

export default RugbyDetails;
