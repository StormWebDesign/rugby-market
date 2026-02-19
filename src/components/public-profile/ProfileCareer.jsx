const ProfileCareer = ({ clubHistory }) => {
  if (!clubHistory || clubHistory.length === 0) {
    return null;
  }

  // Sort by yearJoined descending (most recent first)
  const sortedHistory = [...clubHistory].sort((a, b) => {
    const yearA = parseInt(a.yearJoined) || 0;
    const yearB = parseInt(b.yearJoined) || 0;
    return yearB - yearA;
  });

  return (
    <div className="resume-outer theme-blue mb-5">
      <div className="upper-title">
        <h4>Rugby Career</h4>
      </div>

      {sortedHistory.map((club, index) => (
        <div className="resume-block" key={club.id || index}>
          <div className="inner">
            <span className="name">{club.clubName?.charAt(0) || "C"}</span>
            <div className="title-box">
              <div className="info-box">
                <h3>{club.clubName || "Club"}</h3>
                <span>
                  {club.roles && club.roles.length > 0
                    ? club.roles.join(", ")
                    : "Player"}
                </span>
              </div>
              <div className="edit-box">
                <span className="year">
                  {club.yearJoined || "?"} - {club.yearLeft || "Present"}
                </span>
              </div>
            </div>
            {club.rugbyTypes && club.rugbyTypes.length > 0 && (
              <div className="text">
                <strong>Rugby Type:</strong> {club.rugbyTypes.join(", ")}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProfileCareer;
