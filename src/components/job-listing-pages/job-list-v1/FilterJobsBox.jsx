import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db, auth } from "@/firebase";
import { collection, getDocs, doc, updateDoc, arrayUnion, arrayRemove, getDoc } from "firebase/firestore";
import { useSelector } from "react-redux";
import { rugbyCountries } from "@/data/countries";
import { onAuthStateChanged } from "firebase/auth";
import BookmarkButton from "@/components/common/BookmarkButton"; // Import new component

const FilterJobsBox = () => {
  const [jobList, setJobList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userType, setUserType] = useState(null);
  const [userId, setUserId] = useState(null);
  const [shortlistedJobs, setShortlistedJobs] = useState([]);

  // Get selected filters from Redux
  const { jobList: selectedFilters } = useSelector((state) => state.filter);
  const { category, tag, gender, keyword, datePosted, location } = selectedFilters;

  // Fetch the logged-in user data
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserId(user.uid);
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setUserType(userSnap.data().userType);
          setShortlistedJobs(userSnap.data().shortlistedJobs || []);
        }
      }
    });
  }, []);

  // Fetch jobs from Firestore and get club logos
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const jobCollection = collection(db, "jobs");
        const jobSnapshot = await getDocs(jobCollection);
        const jobsArray = [];

        for (const jobDoc of jobSnapshot.docs) {
          const jobData = jobDoc.data();
          let clubLogo = "";

          if (jobData.userId) {
            const userRef = doc(db, "users", jobData.userId);
            const userSnap = await getDoc(userRef);
            if (userSnap.exists()) {
              clubLogo = userSnap.data().club_logoImageURL || "";
            }
          }

          jobsArray.push({
            id: jobDoc.id,
            ...jobData,
            clubLogo, // Attach club logo to job object
          });
        }

        setJobList(jobsArray);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Function to toggle shortlist job
  const toggleShortlistJob = async (jobId) => {
    if (!userId) return;

    try {
      const userRef = doc(db, "users", userId);
      if (shortlistedJobs.includes(jobId)) {
        await updateDoc(userRef, {
          shortlistedJobs: arrayRemove(jobId),
        });
        setShortlistedJobs(shortlistedJobs.filter((id) => id !== jobId));
      } else {
        await updateDoc(userRef, {
          shortlistedJobs: arrayUnion(jobId),
        });
        setShortlistedJobs([...shortlistedJobs, jobId]);
      }
    } catch (error) {
      console.error("Error updating shortlist:", error);
    }
  };

  if (loading) {
    return <div>Loading jobs...</div>;
  }

  return (
    <>
      <div className="ls-switcher">
        <div className="show-result">
          <div className="text">
            Showing <strong>{jobList.length}</strong> jobs
          </div>
        </div>
      </div>

      {/* Display Jobs */}
      {jobList.length === 0 ? (
        <p>No jobs found.</p>
      ) : (
        jobList.map((job) => (
          <div className="job-block" key={job.id}>
            <div className="inner-box">
              <div className="content">
                {job.clubLogo && (
                  <span className="company-logo">
                    <img src={job.clubLogo} alt={job.clubName || "Club Logo"} />
                  </span>
                )}

                <h4>
                  <Link to={`/job-listings/${job.id}`}>{job.jobTitle}</Link>
                </h4>

                <ul className="job-info">
                  <li>
                    <span className="icon flaticon-briefcase"></span>
                    {job.clubName || "Unknown Club"}
                  </li>
                  <li>
                    <span className="icon flaticon-map-locator"></span>
                    {job.city}, {job.country}
                  </li>
                </ul>

                {/* Reusable Bookmark Button */}
                <BookmarkButton jobId={job.id} />
              </div>
            </div>
          </div>
        ))
      )}
    </>
  );
};

export default FilterJobsBox;
