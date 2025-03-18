import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db, auth } from "@/firebase";
import { doc, getDoc, collection, getDocs, updateDoc, arrayRemove } from "firebase/firestore";

const JobFavouriteTable = () => {
  const [shortlistedJobs, setShortlistedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  // Fetch the user's shortlisted jobs
  useEffect(() => {
    const fetchShortlistedJobs = async () => {
      try {
        const user = auth.currentUser;
        if (!user) return;

        setUserId(user.uid);
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        
        if (userSnap.exists() && userSnap.data().shortlistedJobs) {
          const jobIds = userSnap.data().shortlistedJobs;

          // Fetch job details
          const jobCollection = collection(db, "jobs");
          const jobSnapshot = await getDocs(jobCollection);
          const jobsArray = jobSnapshot.docs
            .map((doc) => ({ id: doc.id, ...doc.data() }))
            .filter((job) => jobIds.includes(job.id));

          setShortlistedJobs(jobsArray);
        }
      } catch (error) {
        console.error("Error fetching shortlisted jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchShortlistedJobs();
  }, []);

  // Remove job from shortlist
  const removeShortlistedJob = async (jobId) => {
    if (!userId) return;

    try {
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, {
        shortlistedJobs: arrayRemove(jobId),
      });

      // Remove from state
      setShortlistedJobs(shortlistedJobs.filter((job) => job.id !== jobId));
    } catch (error) {
      console.error("Error removing shortlisted job:", error);
    }
  };

  if (loading) {
    return <div>Loading shortlisted jobs...</div>;
  }

  return (
    <div className="tabs-box">
      <div className="widget-title">
        <h4>My Shortlisted Jobs</h4>
      </div>

      <div className="widget-content">
        <table className="default-table manage-job-table">
          <thead>
            <tr>
              <th>Job Title</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {shortlistedJobs.map((job) => (
              <tr key={job.id}>
                <td>
                  <h4>
                    <Link to={`/job-listings/${job.id}`}>{job.jobTitle}</Link>
                  </h4>
                </td>
                <td>
                  <button className="btn btn-danger" onClick={() => removeShortlistedJob(job.id)}>
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default JobFavouriteTable;
