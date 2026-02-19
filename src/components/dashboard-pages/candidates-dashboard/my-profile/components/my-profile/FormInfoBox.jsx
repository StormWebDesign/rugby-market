import { useState, useEffect } from "react";
import { db, auth } from "@/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import Select from "react-select";

import { catGender } from "@/data/genders";
import { generateSlug, sanitizeSlug, validateSlug, checkSlugAvailability } from "@/utils/profileSlug";

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
    heightFt: "",
    heightInch: "",
    weight: "",
    education: "",
    gender: [],
    languages: "",
    allowSearch: "Yes",
    description: "",
    profileSlug: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isFetching, setIsFetching] = useState(true);
  const [slugError, setSlugError] = useState("");
  const [slugChecking, setSlugChecking] = useState(false);

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
            gender: userData.gender || [], // Ensure gender is an array
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

  const handleHeightChange = (e) => {
    const { name, value } = e.target;
    let numericValue = parseInt(value, 10) || 0;

    setFormData((prevData) => {
      let updatedData = { ...prevData };

      if (name === "heightInch") {
        if (numericValue >= 12) {
          let newFeet = prevData.heightFt + 1;
          updatedData.heightFt = newFeet > 7 ? 7 : newFeet; // Max 7ft
          updatedData.heightInch = newFeet > 7 ? 11 : 0; // Reset or stop at 11
        } else {
          updatedData.heightInch = numericValue;
        }
      } else if (name === "heightFt") {
        updatedData.heightFt = numericValue > 7 ? 7 : numericValue; // Max 7ft
      }

      return updatedData;
    });
  };


  const handleWeightChange = (e) => {
    let weightValue = parseFloat(e.target.value) || 0;
    setFormData((prevData) => ({ ...prevData, weight: weightValue }));
  };



  const handleGenderChange = (selectedOption) => {
    const value = selectedOption ? [selectedOption.value] : [];  // Handle single select (return an array)
    setFormData((prevData) => ({
      ...prevData,
      gender: value, // Set the value array to gender
    }));
  };

  const handleSlugChange = async (e) => {
    const rawValue = e.target.value;
    const sanitized = sanitizeSlug(rawValue);

    setFormData((prevData) => ({ ...prevData, profileSlug: sanitized }));
    setSlugError("");

    if (!sanitized) return;

    // Validate format
    const validation = validateSlug(sanitized);
    if (!validation.valid) {
      setSlugError(validation.error);
      return;
    }

    // Check availability
    setSlugChecking(true);
    try {
      const user = auth.currentUser;
      const available = await checkSlugAvailability(sanitized, user?.uid);
      if (!available) {
        setSlugError("This URL is already taken. Please choose a different one.");
      }
    } catch (error) {
      console.error("Error checking slug:", error);
    } finally {
      setSlugChecking(false);
    }
  };

  const generateDefaultSlug = () => {
    if (formData.firstName && formData.lastName) {
      const defaultSlug = generateSlug(formData.firstName, formData.lastName);
      setFormData((prevData) => ({ ...prevData, profileSlug: defaultSlug }));
      // Trigger validation
      handleSlugChange({ target: { value: defaultSlug } });
    }
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

      // Validate slug if provided
      if (formData.profileSlug) {
        const validation = validateSlug(formData.profileSlug);
        if (!validation.valid) {
          setErrorMessage(validation.error);
          setLoading(false);
          return;
        }

        const available = await checkSlugAvailability(formData.profileSlug, user.uid);
        if (!available) {
          setErrorMessage("Profile URL is already taken. Please choose a different one.");
          setLoading(false);
          return;
        }
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
        <div className="form-group col-lg-3 col-md-12">
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
        <div className="form-group col-lg-3 col-md-12">
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
        <div className="form-group col-lg-3 col-md-12">
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
        <div className="form-group col-lg-3 col-md-12">
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

        {/* Gender */}
        <div className="form-group col-lg-3 col-md-12">
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

        {/* Height */}
        <div className="form-group col-lg-3 col-md-12">
          <label>Height</label>
          <div className="row">
            <div className="form-group col-lg-4 col-md-6">
              <input
                type="number"
                name="heightFt"
                value={formData.heightFt}
                onChange={handleHeightChange} // Using the new function
                min="0"
                max="7"
                required
              />
            </div>ft
            <div className="form-group col-lg-4 col-md-6">
              <input
                type="number"
                name="heightInch"
                value={formData.heightInch}
                onChange={handleHeightChange} // Using the new function
                min="0"
                max="11"
                required
              />
            </div>inch
          </div>
        </div>


        <div className="form-group col-lg-3 col-md-12">
          <label>Weight (kg)</label>
          <input
            type="number"
            name="weight"
            placeholder="Enter weight in kg"
            value={formData.weight}
            onChange={handleWeightChange} // Using the new function
            min="30"
            max="200"
            step="0.1"
            required
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

        {/* Profile URL */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Public Profile URL</label>
          <div className="input-group">
            <span className="input-group-text" style={{ backgroundColor: '#f5f5f5', border: '1px solid #e0e0e0', borderRight: 'none', fontSize: '14px' }}>
              rugbytransfermarket.com/
            </span>
            <input
              type="text"
              name="profileSlug"
              placeholder="firstname.lastname"
              value={formData.profileSlug}
              onChange={handleSlugChange}
              style={{ borderLeft: 'none' }}
            />
          </div>
          {!formData.profileSlug && formData.firstName && formData.lastName && (
            <button
              type="button"
              className="btn btn-link p-0 mt-1"
              onClick={generateDefaultSlug}
              style={{ fontSize: '13px' }}
            >
              Generate from name
            </button>
          )}
          {slugChecking && <small className="text-muted">Checking availability...</small>}
          {slugError && <small className="text-danger">{slugError}</small>}
          {formData.profileSlug && !slugError && !slugChecking && (
            <small className="text-success">This URL is available</small>
          )}
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
