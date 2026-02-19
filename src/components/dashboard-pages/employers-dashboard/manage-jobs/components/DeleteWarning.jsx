import PropTypes from "prop-types";

const DeleteWarning = ({ onDeleteConfirm, onCancel }) => {
  return (
    <div className="modal fade show d-block" tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Confirm Deletion</h5>
          </div>
          <div className="modal-body">
            <p>Are you sure you want to delete this job?</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              Cancel
            </button>
            <button type="button" className="btn btn-warning" onClick={onDeleteConfirm}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

DeleteWarning.propTypes = {
  onDeleteConfirm: PropTypes.func,
  onCancel: PropTypes.func,
};

export default DeleteWarning;
