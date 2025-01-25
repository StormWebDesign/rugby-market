import { useState, useEffect } from "react";
import { db, auth } from "@/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import Select from "react-select";

const FormInfoBox = () => {
    const [formData, setFormData] = useState({
        clubName: "",
        email: "",
        phone: "",
        website: "",
        establishedSince: "",
        rugbyType: [],
        allowSearch: "Yes",
        aboutClub: "",
    });

    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isFetching, setIsFetching] = useState(true);

    const catTypes = [
        { value: "Rugby Union", label: "Rugby Union" },
        { value: "Rugby League", label: "Rugby League" },
        { value: "Rugby Sevens", label: "Rugby Sevens" },
    ];

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
                        rugbyType: userData.rugbyType || [],
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
                {/* <!-- Input --> */}
                <div className="form-group col-lg-6 col-md-12">
                    <label>Club Name *</label>
                    <input
                        type="text"
                        name="clubName"
                        value={formData.clubName}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                {/* <!-- Input --> */}
                <div className="form-group col-lg-6 col-md-12">
                    <label>Email address</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="{formData.email}"
                        value={formData.email}
                        onChange={handleInputChange}
                        disabled={true}
                        required
                    />
                </div>

                {/* <!-- Input --> */}
                <div className="form-group col-lg-6 col-md-12">
                    <label>Phone *</label>
                    <input
                        type="text"
                        name="phone"
                        placeholder="0 123 456 7890"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                {/* <!-- Input --> */}
                <div className="form-group col-lg-6 col-md-12">
                    <label>Website *</label>
                    <input
                        type="text"
                        name="website"
                        placeholder="www.yourwebsite.com"
                        value={formData.website}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                {/* <!-- Input --> */}
                <div className="form-group col-lg-6 col-md-12">
                    <label>Est. Since</label><br></br>
                    <input
                        type="date"
                        name="establishedSince"
                        placeholder="01.10.1823"
                        value={formData.establishedSince}
                        onChange={handleInputChange}
                    />
                </div>

                {/* <!-- Search Select --> */}
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

                {/* <!-- Input --> */}
                <div className="form-group col-lg-6 col-md-12">
                    <label>Allow In Search & Listing</label>
                    <select className="chosen-single form-select">
                        <option>Yes</option>
                        <option>No</option>
                    </select>
                </div>

                {/* <!-- About the Club --> */}
                <div className="form-group col-lg-12 col-md-12">
                    <label>About the Club</label>
                    <textarea
                        name="aboutClub"
                        placeholder="Add some details about your Club..."
                        value={formData.aboutClub}
                        onChange={handleInputChange}
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
