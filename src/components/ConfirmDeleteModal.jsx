import React from "react";
import "./ConfirmDeleteModal.css"; // Add some basic CSS for styling

const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Delete user?</h3>
        <p>Are you sure you want to delete this user?</p>
        <div className="modal-actions">
          <button onClick={onClose} className="cancel-btn">
            CANCEL
          </button>
          <button onClick={onConfirm} className="delete-btn">
            DELETE
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
