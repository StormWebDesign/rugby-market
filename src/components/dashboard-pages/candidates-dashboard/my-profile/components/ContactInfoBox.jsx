import { useState, useEffect } from "react";
import { db, auth } from "@/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

import { rugbyCountries } from "@/data/countries";

const ContactInfoBox = () => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [stateOrCounty, setStateOrCounty] = useState("");
  const [city, setCity] = useState("");
  const [postcode, setPostcode] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [address, setAddress] = useState("");

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
          setSelectedCountry(userData.country || "");
          setStateOrCounty(userData.stateOrCounty || "");
          setCity(userData.city || "");
          setPostcode(userData.postcode || "");
          setLatitude(userData.latitude || "");
          setLongitude(userData.longitude || "");
          setAddress(userData.address || "");
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
        country: selectedCountry,
        stateOrCounty,
        city,
        postcode,
        latitude,
        longitude,
        address,
      });

      setSuccessMessage("Contact information updated successfully!");
    } catch (err) {
      console.error("Error saving contact information:", err);
      setErrorMessage("Failed to save contact information. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSave} className="default-form">
      <div className="row">

        {/* Complete Address */}
        <div className="form-group col-lg-12 col-md-12">
          <label>Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter your address"
          />
        </div>

        {/* City Input */}
        <div className="form-group col-lg-6 col-md-12">
          <label>City</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter City"
            required
          />
        </div>

        {/* State/County Input */}
        <div className="form-group col-lg-6 col-md-12">
          <label>{selectedCountry === "GB-ENG" || selectedCountry === "GB-SCT" || selectedCountry === "GB-WLS" || selectedCountry === "IE" ? "County" : "State"}</label>
          <input
            type="text"
            value={stateOrCounty}
            onChange={(e) => setStateOrCounty(e.target.value)}
            placeholder="Enter State or County"
            required
          />
        </div>

        {/* Country Dropdown */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Country</label>
          <select
            className="form-select"
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            required
          >
            <option value="">Select a Country</option>
            {rugbyCountries.map((country, index) => (
              <option key={index} value={country.code}>
                {country.name}
              </option>
            ))}
          </select>
        </div>

        {/* Postcode Input */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Postcode</label>
          <input
            type="text"
            value={postcode}
            onChange={(e) => setPostcode(e.target.value)}
            placeholder="Enter Postcode"
            required
          />
        </div>

        {/* Save Button */}
        <div className="form-group col-lg-12 col-md-12">
          <button type="submit" className="theme-btn btn-style-one" disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>

      {/* Success and Error Messages */}
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </form>
  );
};

export default ContactInfoBox;