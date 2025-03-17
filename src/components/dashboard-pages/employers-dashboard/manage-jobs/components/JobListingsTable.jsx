import { Link } from "react-router-dom";
import useJobFeatures from "../../../../../data/job-featured.js";
import { format, parse } from "date-fns";
import { useState } from "react";
import { db } from "../../../../../firebase";
import { doc, deleteDoc } from "firebase/firestore";
import DeleteWarning from "./DeleteWarning"; // Import the DeleteWarning modal

const JobListingsTable = () => {
  const { jobFeatures, loading } = useJobFeatures();
  const [jobToDelete, setJobToDelete] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Handle delete click - show confirmation modal
  const handleDeleteClick = (jobId) => {
    setJobToDelete(jobId);
    setShowConfirmModal(true);
  };

  // Handle delete confirmation - delete job and show success modal
  const handleDeleteConfirm = async () => {
    if (!jobToDelete) return;
    try {
      await deleteDoc(doc(db, "jobs", jobToDelete));
      setShowConfirmModal(false);
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  // Handle cancel delete - close modal
  const handleCancelDelete = () => {
    setShowConfirmModal(false);
  };

  // Close success modal
  const handleSuccessClose = () => {
    setShowSuccessModal(false);
    window.location.reload(); // Refresh page to update job list
  };

  if (loading) {
    return <div>Loading job listings...</div>;
  }

  return (
    <div className="tabs-box">
      <div className="widget-title">
        <h4>My Job Listings</h4>
      </div>

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
              {jobFeatures.map((item) => {
                const formattedDeadlineDate = format(new Date(item.applicationDeadlineDate), "dd-MM-yyyy");

                let formattedTimestamp = "No timestamp available";
                if (item.timestamp?.seconds !== undefined) {
                  formattedTimestamp = format(item.timestamp.toDate(), "dd-MM-yyyy");
                }

                const deadlineDate = parse(formattedDeadlineDate, "dd-MM-yyyy", new Date());
                const currentDate = new Date();

                let status = "Active";
                let statusClass = "active";
                if (deadlineDate < currentDate) {
                  status = "Expired";
                  statusClass = "expired";
                }

                return (
                  <tr key={item.id}>
                    <td>
                      <div className="job-block">
                        <div className="inner-box">
                          <h4>
                            <Link to={`/job-listings/${item.id}`}>{item.jobTitle}</Link>
                          </h4>
                        </div>
                      </div>
                    </td>
                    <td className="applied">
                      <a href="#">3+ Applied</a>
                    </td>
                    <td>{formattedTimestamp}</td>
                    <td>{formattedDeadlineDate}</td>
                    <td className={`status ${statusClass}`}>{status}</td>
                    <td>
                      <div className="option-box">
                        <ul className="option-list">
                          <li>
                            <button data-text="View Job">
                              <span className="la la-eye"></span>
                            </button>
                          </li>
                          <li>
                            <Link to={`/employers-dashboard/edit-job/${item.id}`} data-text="Edit Job">
                              <span className="la la-pencil"></span>
                            </Link>
                          </li>
                          <li>
                            <button
                              data-text="Delete Job"
                              onClick={() => handleDeleteClick(item.id)}
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

      {/* Delete Confirmation Modal */}
      {showConfirmModal && (
        <DeleteWarning onDeleteConfirm={handleDeleteConfirm} onCancel={handleCancelDelete} />
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Success</h5>
              </div>
              <div className="modal-body">
                <p>The job was deleted successfully!</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={handleSuccessClose}>
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobListingsTable;
