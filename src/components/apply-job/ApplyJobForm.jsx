const ApplyJobForm = ({ formData, handleInputChange, handleApply, job }) => {
    return (
      <div className="apply-job-container">
        <h2>Apply for {job?.jobTitle}</h2>
        <p>Review your details before submitting your application:</p>
  
        <form>
          <label>Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
          />
  
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
  
          <label>Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
          />
  
          <label>Position</label>
          <input
            type="text"
            name="position"
            value={formData.position}
            onChange={handleInputChange}
          />
  
          <label>Experience</label>
          <textarea
            name="experience"
            value={formData.experience}
            onChange={handleInputChange}
          ></textarea>
  
          <button type="button" className="theme-btn btn-style-one" onClick={handleApply}>
            Submit Application
          </button>
        </form>
      </div>
    );
  };
  
  export default ApplyJobForm;
  