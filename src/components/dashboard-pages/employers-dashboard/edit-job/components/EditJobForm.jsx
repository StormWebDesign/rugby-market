import { useState, useEffect } from "react";
import { db, auth } from "@/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import Select from "react-select";
import { useNavigate } from "react-router-dom";

// Import data from the data files
import { catPositions } from "@/data/positions";
import { catTypes } from "@/data/rugbyTypes";
import { catGender } from "@/data/genders";
import { rugbyCountries } from "@/data/countries";
import { catRates } from "@/data/rates";
import { localCurrency } from "@/data/currency";

const EditJobForm = ({ jobId }) => {
    const [formData, setFormData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const jobRef = doc(db, "jobs", jobId);
                const jobDoc = await getDoc(jobRef);

                if (jobDoc.exists()) {
                    setFormData(jobDoc.data());
                } else {
                    setMessage("Job not found.");
                }
            } catch (error) {
                console.error("Error fetching job:", error);
                setMessage("Error fetching job data.");
            } finally {
                setLoading(false);
            }
        };

        fetchJob();
    }, [jobId]);

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
    const handleUpdateJob = async (e) => {
        e.preventDefault();
        setMessage("");

        try {
            const jobRef = doc(db, "jobs", jobId);
            await updateDoc(jobRef, formData);
            setMessage("Job updated successfully!");
            setTimeout(() => navigate("/employers-dashboard/manage-jobs"), 2000);
        } catch (error) {
            console.error("Error updating job:", error);
            setMessage("Failed to update job.");
        }
    };

    if (loading) return <p>Loading job data...</p>;

    return (
        <form onSubmit={handleUpdateJob} className="default-form">
            <div className="row">
                <div className="form-group col-lg-6 col-md-12">
                    <label>Job Title *</label>
                    <input
                        type="text"
                        name="jobTitle"
                        value={formData.jobTitle}
                        onChange={handleInputChange}
                    />
                </div>

                {/* <!-- Input --> */}
                <div className="form-group col-lg-6 col-md-12">
                    <label>Application Deadline Date</label><br></br>
                    <input
                        type="date"
                        name="applicationDeadlineDate"
                        value={formData.applicationDeadlineDate}
                        onChange={handleInputChange}
                    />
                </div>

                {/* <!-- Job Description --> */}
                <div className="form-group col-lg-12 col-md-12">
                    <label>Job Description</label>
                    <textarea
                        name="jobDescription"
                        value={formData.jobDescription}
                        onChange={handleInputChange}
                    ></textarea>
                </div>

                {/* <!-- Job Description --> */}
                <div className="form-group col-lg-12 col-md-12">
                    <label>Key Responsibilities</label>
                    <textarea
                        name="jobResponsibilities"
                        value={formData.jobResponsibilities}
                        onChange={handleInputChange}
                    ></textarea>
                </div>

                {/* <!-- Job Description --> */}
                <div className="form-group col-lg-12 col-md-12">
                    <label>Skill & Experience</label>
                    <textarea
                        name="jobExperience"
                        value={formData.jobExperience}
                        onChange={handleInputChange}
                    ></textarea>
                </div>

                {/* <!-- Input --> */}
                <div className="form-group col-lg-6 col-md-12">
                    <label>Email Address *</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
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



                {/* Currency */}
                <div className="form-group col-lg-3 col-md-12">
                    <label>Currency</label>
                    <Select
                        value={(formData.currency || []).map((value) =>
                            localCurrency.find((option) => option.value === value)
                        )}
                        name="currency"
                        options={localCurrency}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        onChange={handleCurrencyChange}
                    />
                </div>

                {/* <!-- Offered Salary --> */}
                <div className="form-group col-lg-6 col-md-12">
                    <label>Offered Salary</label>
                    <input
                        type="number"
                        name="offeredSalary" // Change from salary to offeredSalary
                        placeholder="£20,000.00"
                        onChange={handleInputChange}
                        value={formData.offeredSalary}
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
                <div className="form-group col-lg-4 col-md-12">
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

                {/* City Input */}
                <div className="form-group col-lg-4 col-md-12">
                    <label>City</label>
                    <input
                        type="text"
                        name="city"
                        onChange={handleInputChange}
                        placeholder="Enter City"
                    />
                </div>

                {/* Country Dropdown */}
                <div className="form-group col-lg-4 col-md-12">
                    <label>Country *</label>
                    <select
                        className="form-select"
                        value={formData.country}
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

                {/* <!-- Input --> */}
                <div className="form-group col-lg-12 col-md-12">
                    <label>Full Address</label>
                    <input
                        type="text"
                        name="fullAddress"
                        onChange={handleInputChange}
                        placeholder="Enter the full address of this job"
                    />
                </div>





                <div className="form-group col-lg-12 col-md-12">
                    <button type="submit" className="theme-btn btn-style-one">
                        Update Job
                    </button>
                </div>
            </div>

            {message && <p>{message}</p>}
        </form>
    );
};

export default EditJobForm;
