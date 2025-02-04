import { useState, useEffect } from "react";
import { db, auth } from "@/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import Select from "react-select";

import { catPositions } from "@/data/positions";
import { catTypes } from "@/data/rugbyTypes";
import { catGender } from "@/data/genders";
import { catWeight } from "@/data/weight";
import { catHeight } from "@/data/height";

const FormInfoBox = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    website: "",
    currentSalary: "",
    expectedSalary: "",
    experience: "",
    dateOfBirth: "",
    height: [],
    weight: [],
    education: "",
    gender: [],
    languages: "",
    positions: [],
    rugbyType: [],
    allowSearch: "Yes",
    description: "",
  });

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
            gender: userData.gender || [], // Ensure gender is an array
            height: userData.height || [], // Ensure height is an array
            weight: userData.weight || [], // Ensure weight is an array
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

  const handleGenderChange = (selectedOption) => {
    const value = selectedOption ? [selectedOption.value] : [];  // Handle single select (return an array)
    setFormData((prevData) => ({
      ...prevData,
      gender: value, // Set the value array to gender
    }));
  };

  const handleWeightChange = (selectedOption) => {
    const value = selectedOption ? [selectedOption.value] : [];  // Handle single select (return an array)
    setFormData((prevData) => ({
      ...prevData,
      weight: value, // Set the value array to weight
    }));
  };

  const handleHeightChange = (selectedOption) => {
    const value = selectedOption ? [selectedOption.value] : [];  // Handle single select (return an array)
    setFormData((prevData) => ({
      ...prevData,
      height: value, // Set the value array to height
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
        {/* First Name */}
        <div className="form-group col-lg-6 col-md-12">
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            placeholder="Hello"
            value={formData.firstName}
            onChange={handleInputChange}
            required
          />
        </div>
        {/* Last Name */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            placeholder="World"
            value={formData.lastName}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Phone */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Phone</label>
          <input
            type="text"
            name="phone"
            placeholder="0 123 456 7890"
            value={formData.phone}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Email */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Email Address</label>
          <input
            type="email"
            name="email"
            placeholder="{formData.email}"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
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

        {/* Gender */}
        <div className="form-group col-lg-4 col-md-12">
          <label>Gender</label>
          <Select
            value={formData.gender.map((value) =>
              catGender.find((option) => option.value === value)
            )}
            name="gender"
            options={catGender}
            className="chosen-single"
            classNamePrefix="select"
            onChange={handleGenderChange} // Ensure this updates formData correctly
          />
        </div>

        {/* Gender */}
        <div className="form-group col-lg-4 col-md-12">
          <label>Gender</label>
          <Select
            value={formData.gender.map((value) =>
              catGender.find((option) => option.value === value)
            )}
            name="gender"
            options={catGender}
            className="chosen-single"
            classNamePrefix="select"
            onChange={handleGenderChange} // Ensure this updates formData correctly
          />
        </div>

        {/* Gender */}
        <div className="form-group col-lg-4 col-md-12">
          <label>Gender</label>
          <Select
            value={formData.gender.map((value) =>
              catGender.find((option) => option.value === value)
            )}
            name="gender"
            options={catGender}
            className="chosen-single"
            classNamePrefix="select"
            onChange={handleGenderChange} // Ensure this updates formData correctly
          />
        </div>

        {/* Description */}
        <div className="form-group col-lg-12 col-md-12">
          <label>About You</label>
          <textarea
            name="description"
            placeholder="Add some details about yourself..."
            value={formData.description}
            onChange={handleInputChange}
            required
          ></textarea>
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

export default FormInfoBox;
