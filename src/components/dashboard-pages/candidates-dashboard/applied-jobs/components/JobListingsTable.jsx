import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const JobListingsTable = ({ appliedJobs, loading }) => {
  return (
    <div className="tabs-box">
      <div className="widget-title">
        <h4>My Applied Jobs</h4>
      </div>

      <div className="widget-content">
        <div className="table-outer">
          <table className="default-table manage-job-table">
            <thead>
              <tr>
                <th>Job Title</th>
                <th>Club</th>
                <th>Date Applied</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="4">Loading...</td>
                </tr>
              ) : appliedJobs.length > 0 ? (
                appliedJobs.map((job) => (
                  <tr key={job.id}>
                    <td>
                      <h4>
                        <Link to={`/job-listings/${job.jobId}`}>{job.jobTitle}</Link>
                      </h4>
                    </td>
                    <td>{job.clubName}</td>
                    <td>{new Date(job.timestamp.toDate()).toLocaleDateString()}</td>
                    <td>
                      <button className="theme-btn btn-style-one">
                        <Link to={`/job-listings/${job.jobId}`}>View Job</Link>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">No applied jobs found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

JobListingsTable.propTypes = {
  appliedJobs: PropTypes.array,
  loading: PropTypes.bool,
};

export default JobListingsTable;
