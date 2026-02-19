const ProfileHeader = ({ profile, profileUrl }) => {
  const fullName = `${profile.firstName || ""} ${profile.lastName || ""}`.trim();

  // Format location
  const locationParts = [profile.city, profile.country].filter(Boolean);
  const location = locationParts.join(", ");

  // Get positions as comma-separated string
  const positions = profile.positions?.join(", ") || "";

  return (
    <div className="candidate-block-six">
      <div className="inner-box">
        <figure className="image">
          <img
            src={profile.fullImage || profile.thumbnailImage || "/images/default-avatar.png"}
            alt={fullName}
            style={{ width: "150px", height: "150px", objectFit: "cover", borderRadius: "50%" }}
          />
        </figure>

        <h4 className="name">{fullName}</h4>

        {profile.currentClub && (
          <span className="designation">{profile.currentClub}</span>
        )}

        <div className="content">
          {/* Position Tags */}
          {profile.positions && profile.positions.length > 0 && (
            <ul className="post-tags">
              {profile.positions.map((position, i) => (
                <li key={i}>{position}</li>
              ))}
            </ul>
          )}

          {/* Player Info */}
          <ul className="candidate-info">
            {location && (
              <li>
                <span className="icon flaticon-map-locator"></span>
                {location}
              </li>
            )}
            {profile.rugbyType && profile.rugbyType.length > 0 && (
              <li>
                <span className="icon flaticon-briefcase"></span>
                {profile.rugbyType.join(", ")}
              </li>
            )}
            {profile.yearStarted && profile.currentClub && (
              <li>
                <span className="icon flaticon-clock"></span>
                At {profile.currentClub} since {profile.yearStarted}
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
