import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "@/firebase";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import BookmarkButton from "@/components/common/BookmarkButton";

const FilterJobsBox = () => {
  const [jobList, setJobList] = useState([]);
  const [loading, setLoading] = useState(true);

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
