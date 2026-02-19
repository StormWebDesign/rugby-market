const ProfileOverview = ({ profile }) => {
  // Calculate age from date of birth
  const calculateAge = (dob) => {
    if (!dob) return null;
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  // Format height
  const formatHeight = () => {
    if (!profile.heightFt && !profile.heightInch) return null;
    const ft = profile.heightFt || 0;
    const inch = profile.heightInch || 0;
    return `${ft}'${inch}"`;
  };

  const age = calculateAge(profile.dateOfBirth);
  const height = formatHeight();

  const overviewItems = [
    {
      icon: "icon-calendar",
      label: "Age",
      value: age ? `${age} Years` : null,
    },
    {
      icon: "icon-user-2",
      label: "Gender",
      value: profile.gender && profile.gender.length > 0 ? profile.gender[0] : null,
    },
    {
      icon: "la la-arrows-alt-v",
      label: "Height",
      value: height,
    },
    {
      icon: "la la-weight",
      label: "Weight",
      value: profile.weight ? `${profile.weight} kg` : null,
    },
    {
      icon: "la la-football-ball",
      label: "Rugby Type",
      value: profile.rugbyType && profile.rugbyType.length > 0
        ? profile.rugbyType.join(", ")
        : null,
    },
    {
      icon: "la la-running",
      label: "Positions",
      value: profile.positions && profile.positions.length > 0
        ? profile.positions.join(", ")
        : null,
    },
    {
      icon: "icon-location",
      label: "Location",
      value: [profile.city, profile.country].filter(Boolean).join(", ") || null,
    },
  ];

  // Filter out items with no value
  const visibleItems = overviewItems.filter((item) => item.value);

  if (visibleItems.length === 0) {
    return <p className="text-muted">No details available</p>;
  }

  return (
    <ul className="job-overview">
      {visibleItems.map((item, index) => (
        <li key={index}>
          <i className={`icon ${item.icon}`}></i>
          <h5>{item.label}:</h5>
          <span>{item.value}</span>
        </li>
      ))}
    </ul>
  );
};

export default ProfileOverview;
