import { useState, useEffect } from "react";
import { db, auth } from "@/firebase";
import { doc, getDoc, addDoc, collection, Timestamp } from "firebase/firestore";
import Map from "../../../Map";
import Select from "react-select";

// Import data from the data files
import { catPositions } from "@/data/positions";
import { catTypes } from "@/data/rugbyTypes";
import { catGender } from "@/data/genders";
import { rugbyCountries } from "@/data/countries";
import { catRates } from "@/data/rates";
import { localCurrency } from "@/data/currency";

const PostBoxForm = () => {
  const [formData, setFormData] = useState({
    jobTitle: "",
    jobDescription: "",
    jobResponsibilities: "",
    jobExperience: "",
    email: "",
    positions: [],
    rugbyType: [],
    offeredSalary: "",
    rates: [],
    gender: [],
    currency: [],
    applicationDeadlineDate: "",
    city: "",
    country: "",
    fullAddress: "",
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
            positions: userData.positions || [],
            rugbyType: userData.rugbyType || [],
            gender: userData.gender || [],
            rates: userData.rates || [],
            currency: userData.currency || [],
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

  const handleRateChange = (selectedOption) => {
    const newValue = Array.isArray(selectedOption)
      ? selectedOption.map((option) => option.value)
      : [selectedOption.value];
    setFormData((prevData) => ({ ...prevData, rates: newValue }));
  };

  const handleCurrencyChange = (selectedOption) => {
    const newValue = Array.isArray(selectedOption)
      ? selectedOption.map((option) => option.value)
      : [selectedOption.value];
    setFormData((prevData) => ({ ...prevData, currency: newValue }));
  };

  const handleGenderChange = (selectedOption) => {
    const newValue = Array.isArray(selectedOption)
      ? selectedOption.map((option) => option.value)
      : [selectedOption.value];
    setFormData((prevData) => ({ ...prevData, gender: newValue }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.jobTitle ||
      !formData.jobDescription ||
      !formData.jobResponsibilities ||
      !formData.jobExperience ||
      !formData.email ||
      !formData.positions ||
      !formData.country
    ) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const user = auth.currentUser;
      if (!user) {
        setErrorMessage("User is not logged in.");
        return;
      }

      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);
      const userData = userDoc.data();

      const jobData = {
        jobTitle: formData.jobTitle,
        applicationDeadlineDate: formData.applicationDeadlineDate,
        jobDescription: formData.jobDescription,
        jobResponsibilities: formData.jobResponsibilities,
        jobExperience: formData.jobExperience,
        email: formData.email, // Keep for reference but not for linking
        userId: user.uid, // New field for permanent linking
        clubName: userData?.clubName || "Unknown",
        positions: formData.positions,
        rugbyType: formData.rugbyType,
        offeredSalary: formData.offeredSalary,
        rates: formData.rates,
        gender: formData.gender,
        currency: formData.currency,
        city: formData.city,
        country: formData.country,
        fullAddress: formData.fullAddress,
        timestamp: Timestamp.fromDate(new Date()),
      };

      await addDoc(collection(db, "jobs"), jobData);

      setSuccessMessage("The job has been created successfully!");
    } catch (error) {
      console.error("Error creating job:", error);
      setErrorMessage(
        "Error creating job: " + (error.message || "An unknown error occurred.")
      );
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
        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Job Title *</label>
          <input
            type="text"
            name="jobTitle"
            placeholder="Job Title"
            onChange={handleInputChange}
          />
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Application Deadline Date</label><br></br>
          <input
            type="date"
            name="applicationDeadlineDate"
            onChange={handleInputChange}
          />
        </div>

        {/* <!-- Job Description --> */}
        <div className="form-group col-lg-12 col-md-12">
          <label>Job Description</label>
          <textarea
            name="jobDescription"
            placeholder="Add some details about the job..."
            onChange={handleInputChange}
          ></textarea>
        </div>

        {/* <!-- Job Description --> */}
        <div className="form-group col-lg-12 col-md-12">
          <label>Key Responsibilities</label>
          <textarea
            name="jobResponsibilities"
            placeholder="Add some Key Responsibilities for the job..."
            onChange={handleInputChange}
          ></textarea>
        </div>

        {/* <!-- Job Description --> */}
        <div className="form-group col-lg-12 col-md-12">
          <label>Skill & Experience</label>
          <textarea
            name="jobExperience"
            placeholder="Add some details about required skills and experience..."
            onChange={handleInputChange}
          ></textarea>
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Email Address *</label>
          <input
            type="email"
            name="email"
            onChange={handleInputChange}
          />
        </div>

        {/* positions */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Playing Position(s) Wanted</label>
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
        <div className="form-group col-lg-3 col-md-12">
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

        
        {/* Currency */}
        <div className="form-group col-lg-1 col-md-12">
          <label>Currency</label>
          <Select
            value={formData.currency.map((value) =>
              localCurrency.find((option) => option.value === value)
            )}
            name="rates"
            options={localCurrency}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={handleCurrencyChange}
          />
        </div>

        {/* <!-- Offered Salary --> */}
        <div className="form-group col-lg-2 col-md-12">
          <label>Offered Salary</label>
          <input
            type="number"
            name="offeredSalary" // Change from salary to offeredSalary
            placeholder="£20,000.00"
            onChange={handleInputChange}
          />
        </div>

        {/* Rate */}
        <div className="form-group col-lg-3 col-md-12">
          <label>Rate</label>
          <Select
            value={formData.rates.map((value) =>
              catRates.find((option) => option.value === value)
            )}
            name="rates"
            options={catRates}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={handleRateChange}
          />
        </div>

        {/* Gender */}
        <div className="form-group col-lg-3 col-md-12">
          <label>Gender</label>
          <Select
            value={formData.gender.map((value) =>
              catGender.find((option) => option.value === value)
            )}
            isMulti
            name="gender"
            options={catGender}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={handleGenderChange}
          />
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Full Address</label>
          <input
            type="text"
            name="fullAddress"
            onChange={handleInputChange}
            placeholder="Enter the full address of this job"
          />
        </div>

        {/* City Input */}
        <div className="form-group col-lg-3 col-md-12">
          <label>City</label>
          <input
            type="text"
            name="city"
            onChange={handleInputChange}
            placeholder="Enter City"
          />
        </div>

        {/* Country Dropdown */}
        <div className="form-group col-lg-3 col-md-12">
          <label>Country *</label>
          <select
            className="form-select"
            value={formData.selectedCountry}
            onChange={handleInputChange}
          >
            <option value="">Select a Country</option>
            {rugbyCountries.map((country, index) => (
              <option key={index} value={country.code}>
                {country.name}
              </option>
            ))}
          </select>
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

export default PostBoxForm;
