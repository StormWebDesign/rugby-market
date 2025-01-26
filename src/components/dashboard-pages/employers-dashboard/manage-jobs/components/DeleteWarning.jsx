import React from 'react';

const DeleteWarning = ({ onDeleteConfirm, onCancel }) => {
  return (
    <div className="delete-warning-modal">
      <div className="modal-content">
        <h3>Are you sure you want to delete this job?</h3>
        <div className="modal-buttons">
          <button className="yes-button" onClick={onDeleteConfirm}>
            Yes
          </button>
          <button className="no-button" onClick={onCancel}>
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteWarning;
