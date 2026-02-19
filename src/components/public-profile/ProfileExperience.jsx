const ProfileExperience = ({ experience }) => {
  if (!experience || experience.length === 0) {
    return null;
  }

  // Sort by startYear descending (most recent first)
  const sortedExperience = [...experience].sort((a, b) => {
    const yearA = parseInt(a.startYear) || 0;
    const yearB = parseInt(b.startYear) || 0;
    return yearB - yearA;
  });

  return (
    <div className="resume-outer mb-5">
      <div className="upper-title">
        <h4>Work Experience</h4>
      </div>

      {sortedExperience.map((exp, index) => (
        <div className="resume-block" key={exp.id || index}>
          <div className="inner">
            <span className="name">{exp.title?.charAt(0) || "W"}</span>
            <div className="title-box">
              <div className="info-box">
                <h3>{exp.title || "Position"}</h3>
                <span>{exp.company || "Company"}</span>
              </div>
              <div className="edit-box">
                <span className="year">
                  {exp.startYear || "?"} - {exp.endYear || "Present"}
                </span>
              </div>
            </div>
            {exp.description && (
              <div className="text">{exp.description}</div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProfileExperience;
