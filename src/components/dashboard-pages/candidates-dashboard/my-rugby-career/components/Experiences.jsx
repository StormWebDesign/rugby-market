import { useState, useEffect } from "react";
import { db, auth } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";

const Experiences = () => {
  const [rugbyExperience, setRugbyExperience] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const fetchRugbyExperience = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          return;
        }

        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          setRugbyExperience(userData.clubHistory || []);
        }
      } catch (err) {
        console.error("Error fetching rugby experience:", err);
      } finally {
        setIsFetching(false);
      }
    };

    fetchRugbyExperience();
  }, []);

  if (isFetching) {
    return <p>Loading rugby experience...</p>;
  }

  return (
    <div className="resume-outer theme-blue">
      <div className="upper-title">
        <h4>Rugby Experience</h4>
        <button className="add-info-btn">
          <span className="icon flaticon-plus"></span> Add Club
        </button>
      </div>

      {rugbyExperience.length > 0 ? (
        rugbyExperience.map((entry, index) => (
          <div key={index} className="resume-block">
            <div className="inner">
              {/* First letter as an icon */}
              <span className="name">{entry.clubName.charAt(0)}</span>

              <div className="title-box">
                <div className="info-box">
                  {/* Rugby Position */}
                  <h3>{entry.roles?.join(", ") || "No position set"}</h3>
                  {/* Club Name */}
                  <span>{entry.clubName || "No club name set"}</span>
                </div>

                <div className="edit-box">
                  {/* Years Played */}
                  <span className="year">{entry.yearsPlayed || "N/A"} - {entry.endYear || "Present"}</span>
                  <div className="edit-btns">
                    <button>
                      <span className="la la-pencil"></span>
                    </button>
                    <button>
                      <span className="la la-trash"></span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="text">
                {entry.description || "No description added."}
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No rugby experience added yet.</p>
      )}
    </div>
  );
};

export default Experiences;
