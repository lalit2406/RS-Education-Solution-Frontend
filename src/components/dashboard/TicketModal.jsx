import { useState, useEffect } from "react";
import "../../styles/dashboard/ticketmodal.css";
import { FaTimes, FaCheck } from "react-icons/fa";
import toast from "react-hot-toast";

export default function TicketModal({ isOpen, onClose }) {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const [username] = useState(user?.name || "");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }

    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [isOpen]);

  if (!user) {
    return null; // or redirect
  }
  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!category || !description) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/tickets/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            category,
            description,
          }),
        },
      );

      if (!res.ok) {
        throw new Error("Failed to submit ticket");
      }

      toast.success("Ticket submitted successfully 🎉");

      setSubmitted(true);

      setTimeout(() => {
        setSubmitted(false);
        setCategory("");
        setDescription("");
        onClose();
      }, 2000);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong ❌");
    }
  };

  return (
    <div className="rs-dashboard-cs-ticket-overlay" onClick={onClose}>
      <div
        className="rs-dashboard-cs-ticket-modal"
        onClick={(e) => e.stopPropagation()}
      >
        {/* CLOSE */}
        <button className="rs-dashboard-cs-ticket-close" onClick={onClose}>
          <FaTimes />
        </button>

        {!submitted ? (
          <>
            {/* HEADER */}
            <div className="rs-dashboard-cs-ticket-header">
              <h2>Submit a Ticket</h2>
              <p>Tell us what issue you're facing</p>
            </div>

            {/* USERNAME */}
            <input
              type="text"
              value={username}
              readOnly
              className="rs-dashboard-cs-ticket-input"
            />

            {/* CATEGORY */}
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="rs-dashboard-cs-ticket-input"
            >
              <option value="">Select Category</option>
              <option>Application Issue</option>
              <option>Document Upload</option>
              <option>Payment / Billing</option>
              <option>Technical Problem</option>
              <option>Other</option>
            </select>

            {/* DESCRIPTION */}
            <textarea
              placeholder="Describe your issue..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="rs-dashboard-cs-ticket-textarea"
            />

            {/* SUBMIT */}
            <button
              className="rs-dashboard-cs-ticket-submit"
              onClick={handleSubmit}
              disabled={!username || !category || !description}
            >
              Submit Ticket →
            </button>
          </>
        ) : (
          <div className="rs-dashboard-cs-ticket-success">
            <FaCheck />
            <h3>Ticket Submitted</h3>
            <p>Your request has been received.</p>
            <span>We’ll get back within 24 hours.</span>
          </div>
        )}
      </div>
    </div>
  );
}
