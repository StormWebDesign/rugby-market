import { useState } from "react";
import PropTypes from "prop-types";

const AddEntryForm = ({ onSave, placeholderTitle, placeholderSubtitle }) => {
  const [entries, setEntries] = useState([]);

  const handleAddEntry = () => {
    setEntries([
      ...entries,
      { title: "", subtitle: "", year: "", id: Date.now() },
    ]);
  };

  const handleChange = (id, field, value) => {
    setEntries(entries.map((entry) => (entry.id === id ? { ...entry, [field]: value } : entry)));
  };

  const handleRemoveEntry = (id) => {
    setEntries(entries.filter((entry) => entry.id !== id));
  };

  return (
    <div className="resume-outer">
      <div className="upper-title">
        <h4>{placeholderTitle}</h4>
        <button className="add-info-btn" onClick={handleAddEntry}>
          <span className="icon flaticon-plus"></span> Add {placeholderTitle}
        </button>
      </div>

      {entries.map((entry) => (
        <div className="resume-block" key={entry.id}>
          <div className="inner">
            <input
              type="text"
              placeholder={placeholderTitle}
              value={entry.title}
              onChange={(e) => handleChange(entry.id, "title", e.target.value)}
            />
            <input
              type="text"
              placeholder={placeholderSubtitle}
              value={entry.subtitle}
              onChange={(e) => handleChange(entry.id, "subtitle", e.target.value)}
            />
            <input
              type="text"
              placeholder="Year"
              value={entry.year}
              onChange={(e) => handleChange(entry.id, "year", e.target.value)}
            />
            <button onClick={() => handleRemoveEntry(entry.id)}>
              <span className="la la-trash"></span>
            </button>
          </div>
        </div>
      ))}

      <button className="theme-btn btn-style-one" onClick={() => onSave(entries)}>
        Save
      </button>
    </div>
  );
};

AddEntryForm.propTypes = {
  onSave: PropTypes.func,
  placeholderTitle: PropTypes.string,
  placeholderSubtitle: PropTypes.string,
};

export default AddEntryForm;
