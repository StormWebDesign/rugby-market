import { useState, useEffect } from "react";
import { db, auth } from "@/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import Select from "react-select";

// Import data
import { catPositions } from "@/data/positions";
import { catTypes } from "@/data/rugbyTypes";

const PlayingClubHistoryForm = () => {
  const [clubHistory, setClubHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const fetchClubHistory = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          setErrorMessage("User is not logged in.");
          return;
        }

        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          setClubHistory(userData.clubHistory || []);
        }
      } catch (err) {
        console.error("Error fetching club history:", err);
        setErrorMessage("Failed to fetch club history.");
      } finally {
        setIsFetching(false);
      }
    };

    fetchClubHistory();
  }, []);

  const handleInputChange = (index, field, value) => {
    const updatedHistory = [...clubHistory];
    updatedHistory[index][field] = value;
    setClubHistory(updatedHistory);
  };

  const handleRoleChange = (index, selectedOptions) => {
    const updatedHistory = [...clubHistory];
    updatedHistory[index].roles = selectedOptions.map((option) => option.value);
    setClubHistory(updatedHistory);
  };

  const handleTypeChange = (index, selectedOptions) => {
    const updatedHistory = [...clubHistory];
    updatedHistory[index].rugbyTypes = selectedOptions.map((option) => option.value);
    setClubHistory(updatedHistory);
  };

  const handleAddEntry = () => {
    setClubHistory([
      ...clubHistory,
      { clubName: "", roles: [], rugbyTypes: [], yearJoined: "", yearLeft: "", id: Date.now() },
    ]);
  };

  const handleRemoveEntry = (index) => {
    const updatedHistory = [...clubHistory];
    updatedHistory.splice(index, 1);
    setClubHistory(updatedHistory);
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

      console.log("Saving to Firestore:", JSON.stringify(clubHistory, null, 2));

      const userDocRef = doc(db, "users", user.uid);
      await updateDoc(userDocRef, { clubHistory: [...clubHistory] }, { merge: true });

      console.log("Successfully saved!");

      setSuccessMessage("Club history updated successfully!");
    } catch (err) {
      console.error("Error updating club history:", err);
      setErrorMessage("Failed to update club history.");
    } finally {
      setLoading(false);
    }
  };

  if (isFetching) {
    return <p>Loading club history...</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="default-form">
      {clubHistory.map((entry, index) => (
        <div key={entry.id} className="row">
          {/* Club Name */}
          <div className="form-group col-lg-3 col-md-12">
            <label>Club Name</label>
            <input
              type="text"
              value={entry.clubName}
              onChange={(e) => handleInputChange(index, "clubName", e.target.value)}
              required
            />
          </div>

          {/* Roles Played */}
          <div className="form-group col-lg-3 col-md-12">
            <label>Playing Positions</label>
            <Select
              value={entry.roles.map((value) => catPositions.find((option) => option.value === value))}
              isMulti
              options={catPositions}
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={(selectedOptions) => handleRoleChange(index, selectedOptions)}
            />
          </div>

          {/* Rugby Types */}
          <div className="form-group col-lg-3 col-md-12">
            <label>Rugby Types</label>
            <Select
              value={entry.rugbyTypes.map((value) => catTypes.find((option) => option.value === value))}
              isMulti
              options={catTypes}
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={(selectedOptions) => handleTypeChange(index, selectedOptions)}
            />
          </div>

          {/* Year Joined */}
          <div className="form-group col-lg-1 col-md-12">
            <label>Year Joined</label>
            <input
              type="number"
              placeholder="1950"
              min="1950"
              max="2099"
              step="1"
              value={entry.yearJoined}
              onChange={(e) => handleInputChange(index, "yearJoined", e.target.value)}
              required
            />
          </div>

          {/* Year Left */}
          <div className="form-group col-lg-1 col-md-12">
            <label>Year Left</label>
            <input
              type="number"
              placeholder="1950"
              min="1950"
              max="2099"
              step="1"
              value={entry.yearLeft}
              onChange={(e) => handleInputChange(index, "yearLeft", e.target.value)}
              required
            />
          </div>

          {/* Remove Button */}
          <div className="col-lg-1 col-md-12">
            <label></label>
            <button onClick={() => handleRemoveEntry(index)} className="btn btn-danger">
              Remove
            </button>
          </div>
        </div>
      ))}

      <div className="row">
        {/* Add Entry Button */}
        <div className="form-group col-2">
          <button type="button" className="theme-btn btn-style-one" onClick={handleAddEntry}>
            Add Club
          </button>
        </div>

        {/* Save Button */}
        <div className="form-group col-2">
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

export default PlayingClubHistoryForm;
