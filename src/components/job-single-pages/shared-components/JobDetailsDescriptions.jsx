const JobDetailsDescriptions = ({ job }) => {
  return (
    <div className="job-detail">
      <h4>Job Description</h4>
      <p>{job?.jobDescription || "No job description provided."}</p>

      <h4>Key Responsibilities</h4>
      <ul className="list-style-three">
        {job?.jobResponsibilities
          ? job.jobResponsibilities.split("\n").map((responsibility, index) => (
              <li key={index}>{responsibility}</li>
            ))
          : <li>No key responsibilities provided.</li>}
      </ul>

      <h4>Skill & Experience</h4>
      <ul className="list-style-three">
        {job?.jobExperience
          ? job.jobExperience.split("\n").map((experience, index) => (
              <li key={index}>{experience}</li>
            ))
          : <li>No skill or experience requirements provided.</li>}
      </ul>
    </div>
  );
};

export default JobDetailsDescriptions;
