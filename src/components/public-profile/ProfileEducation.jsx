const ProfileEducation = ({ education }) => {
  if (!education || education.length === 0) {
    return null;
  }

  // Sort by startYear descending (most recent first)
  const sortedEducation = [...education].sort((a, b) => {
    const yearA = parseInt(a.startYear) || 0;
    const yearB = parseInt(b.startYear) || 0;
    return yearB - yearA;
  });

  return (
    <div className="resume-outer theme-yellow mb-5">
      <div className="upper-title">
        <h4>Education</h4>
      </div>

      {sortedEducation.map((edu, index) => (
        <div className="resume-block" key={edu.id || index}>
          <div className="inner">
            <span className="name">{edu.degree?.charAt(0) || "E"}</span>
            <div className="title-box">
              <div className="info-box">
                <h3>{edu.degree || "Qualification"}</h3>
                <span>{edu.school || "Institution"}</span>
              </div>
              <div className="edit-box">
                <span className="year">
                  {edu.startYear || "?"} - {edu.endYear || "Present"}
                </span>
              </div>
            </div>
            {edu.description && (
              <div className="text">{edu.description}</div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProfileEducation;
