import { FaTimes } from "react-icons/fa";
import "../../styles/common/confirmModal.css";

export default function ConfirmModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="confirm-overlay">
      <div className="confirm-modal">
        <button className="close-btn" onClick={onClose}>
          <FaTimes />
        </button>

        <h3>Are you sure?</h3>
        <p>This action cannot be undone.</p>

        <div className="confirm-actions">
          <button className="cancel" onClick={onClose}>
            Cancel
          </button>

          <button className="delete" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}