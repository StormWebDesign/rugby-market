import { Link } from "react-router-dom";
import useJobFeatures from "../../../../../data/job-featured.js";
import { format, parse } from "date-fns";
import { useState } from "react";
import { db } from "../../../../../firebase"; // Make sure to import the Firestore instance
import DeleteWarning from "./DeleteWarning"; // Import the DeleteWarning modal

const JobListingsTable = () => {
  const { jobFeatures, loading } = useJobFeatures(); // Fetch dynamic job data
  const [showDeleteWarning, setShowDeleteWarning] = useState(false); // State to control the modal
  const [jobToDelete, setJobToDelete] = useState(null); // Store the job to delete
  const [loadingDelete, setLoadingDelete] = useState(false); // State to show loading state for delete action

  const handleDeleteClick = (jobId) => {
    setJobToDelete(jobId); // Set the job to delete
    setShowDeleteWarning(true); // Show the delete warning modal
  };

  const handleDeleteConfirm = async () => {
    setLoadingDelete(true); // Set loading to true while deleting
    try {
      // Delete job from Firestore
      await db.collection("jobs").doc(jobToDelete).delete();
      setLoadingDelete(false);
      setShowDeleteWarning(false); // Close the modal
      alert("Job deleted successfully!"); // You can show a success message or redirect here
    } catch (error) {
      console.error("Error deleting job:", error);
      setLoadingDelete(false);
      alert("There was an error deleting the job. Please try again.");
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteWarning(false); // Close the delete warning modal
  };

  if (loading) {
    return <div>Loading job listings...</div>; // Loading state while fetching
  }

  return (
    <div className="tabs-box">
      <div className="widget-title">
        <h4>My Job Listings</h4>

        <div className="chosen-outer">
          {/* <!--Tabs Box--> */}
          <select className="chosen-single form-select">
            <option>Last 6 Months</option>
            <option>Last 12 Months</option>
            <option>Last 16 Months</option>
            <option>Last 24 Months</option>
            <option>Last 5 years</option>
          </select>
        </div>
      </div>
      {/* End filter top bar */}

      {/* Start table widget content */}
      <div className="widget-content">
        <div className="table-outer">
          <table className="default-table manage-job-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Applications</th>
                <th>Created Date</th>
                <th>Expiry Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {jobFeatures.slice(0, 4).map((item) => {
                // Format the applicationDeadlineDate as dd-MM-yyyy
                const formattedDeadlineDate = format(new Date(item.applicationDeadlineDate), 'dd-MM-yyyy');

                // Handle the timestamp and format it
                let formattedTimestamp = '';
                if (item.timestamp) {
                  // Check if the timestamp is a Firestore Timestamp (seconds and nanoseconds)
                  if (item.timestamp.seconds !== undefined) {
                    // Convert Firestore Timestamp to JavaScript Date and format it
                    formattedTimestamp = format(item.timestamp.toDate(), 'dd-MM-yyyy');
                  } else {
                    // Parse and format the string timestamp
                    const timestampPattern = "dd MMMM yyyy 'at' HH:mm:ss 'UTC'"; 
                    const parsedTimestamp = parse(item.timestamp, timestampPattern, new Date());
                    formattedTimestamp = format(parsedTimestamp, 'dd-MM-yyyy');
                  }
                } else {
                  formattedTimestamp = 'No timestamp available';
                }

                // Check if the formattedDeadlineDate is in the past or future
                const deadlineDate = parse(formattedDeadlineDate, 'dd-MM-yyyy', new Date());
                const currentDate = new Date();

                // Determine the status and class
                let status = "Active";
                let statusClass = "active";

                if (deadlineDate < currentDate) {
                  status = "Expired";
                  statusClass = "expired";
                }

                return (
                  <tr key={item.id}>
                    <td>
                      {/* <!-- Job Block --> */}
                      <div className="job-block">
                        <div className="inner-box">
                          <h4>
                            <Link to={`/job-single-v3/${item.id}`}>
                              {item.jobTitle}
                            </Link>
                          </h4>
                        </div>
                      </div>
                    </td>
                    <td className="applied">
                      <a href="#">3+ Applied</a>
                    </td>
                    <td>
                      {formattedTimestamp || 'Invalid timestamp'} {/* Display formatted timestamp */}
                    </td>
                    <td>
                      {formattedDeadlineDate}
                    </td>
                    <td className={`status ${statusClass}`}>{status}</td> {/* Display status with the appropriate class */}
                    <td>
                      <div className="option-box">
                        <ul className="option-list">
                          <li>
                            <button data-text="View Application">
                              <span className="la la-eye"></span>
                            </button>
                          </li>
                          <li>
                            <button data-text="Reject Application">
                              <span className="la la-pencil"></span>
                            </button>
                          </li>
                          <li>
                            <button
                              data-text="Delete Application"
                              onClick={() => handleDeleteClick(item.id)} // Show the delete warning modal
                            >
                              <span className="la la-trash"></span>
                            </button>
                          </li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      {/* End table widget content */}
      
      {showDeleteWarning && (
        <DeleteWarning
          onDeleteConfirm={handleDeleteConfirm}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
};

export default JobListingsTable;
