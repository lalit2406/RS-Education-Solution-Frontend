import { useState } from "react";
import toast from "react-hot-toast";
import "../../styles/common/interestModal.css";

export default function InterestModal({ email, onClose }) {
  const [errors, setErrors] = useState({});
  const [name, setName] = useState("");
  const [interests, setInterests] = useState([]);
  const [marks, setMarks] = useState("");
  const [budget, setBudget] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);

  const options = ["B.Tech", "MBA", "AI", "Study Abroad"];

  const toggleInterest = (item) => {
    setInterests((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item],
    );
  };

  const validateField = (name, value) => {
    let error = "";

    if (name === "name" && !value) {
      error = "Name is required";
    }

    if (name === "location" && !value) {
      error = "Location is required";
    }

    if (name === "marks") {
      if (!value) error = "Marks are required";
      else if (value < 0) error = "Marks cannot be negative";
      else if (value > 100) error = "Marks cannot exceed 100";
    }

    if (name === "budget") {
      if (!value) error = "Budget is required";
      else if (value < 0) error = "Budget cannot be negative";
    }

    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleSubmit = async () => {
    // 🔥 REQUIRED FIELD VALIDATION
    if (!name || !location || !marks || !budget) {
      return toast.error("Please fill all fields");
    }

    if (interests.length === 0) {
      return toast.error("Select at least one interest");
    }

    // 🔥 ADD THESE LIMIT CHECKS HERE 👇
    if (Number(marks) > 100) {
      return toast.error("Marks cannot exceed 100");
    }

    if (Number(marks) < 0) {
      return toast.error("Marks cannot be negative");
    }

    if (Number(budget) < 0) {
      return toast.error("Invalid budget");
    }

    // 👉 AFTER validation, continue API call
    setLoading(true);

    try {
      const res = await fetch(import.meta.env.VITE_NEWSLETTER_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          name,
          interests,
          marks: Number(marks),
          budget: Number(budget),
          location,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Subscribed successfully 🎉");
        setTimeout(() => onClose(), 1200);
      } else {
        toast.error(data.detail || "Something went wrong");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error");
    }

    setLoading(false);
  };

  const isFormValid =
    name &&
    location &&
    marks &&
    budget &&
    interests.length > 0 &&
    Number(marks) >= 0 &&
    Number(marks) <= 100 &&
    Number(budget) >= 0;

  return (
    <div className="interest-overlay" onClick={onClose}>
      <div className="interest-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* ❌ CLOSE BUTTON */}
        <button className="interest-close-btn" onClick={onClose}>
          ×
        </button>

        <h2 className="interest-title">Complete Your Profile 🎯</h2>
        <p className="interest-subtitle">Help us personalize your experience</p>

        {/* INPUTS */}
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            validateField("name", e.target.value);
          }}
          className={`interest-input ${errors.name ? "input-error" : ""}`}
        />
        {errors.name && <p className="error-text">{errors.name}</p>}

        <input
          type="text"
          placeholder="Your location"
          value={location}
          onChange={(e) => {
            setLocation(e.target.value);
            validateField("location", e.target.value);
          }}
          className={`interest-input ${errors.location ? "input-error" : ""}`}
        />
        {errors.location && <p className="error-text">{errors.location}</p>}

        <input
          type="number"
          placeholder="Your marks (%)"
          value={marks}
          onChange={(e) => {
            setMarks(e.target.value);
            validateField("marks", e.target.value);
          }}
          className={`interest-input ${errors.marks ? "input-error" : ""}`}
        />
        {errors.marks && <p className="error-text">{errors.marks}</p>}

        <input
          type="number"
          placeholder="Your budget for colleges (₹)"
          value={budget}
          onChange={(e) => {
            setBudget(e.target.value);
            validateField("budget", e.target.value);
          }}
          className={`interest-input ${errors.budget ? "input-error" : ""}`}
        />
        {errors.budget && <p className="error-text">{errors.budget}</p>}

        {/* INTERESTS */}
        <div className="interest-chip-group">
          {options.map((item) => (
            <button
              key={item}
              className={`interest-chip ${
                interests.includes(item) ? "active" : ""
              }`}
              onClick={() => toggleInterest(item)}
            >
              {item}
            </button>
          ))}
        </div>

        {/* BUTTON */}
        <button
          className={`interest-submit ${
            !isFormValid || loading ? "interest-disabled-btn" : ""
          }`}
          onClick={handleSubmit}
          disabled={!isFormValid || loading}
        >
          {loading ? "Submitting..." : "Subscribe"}
        </button>
      </div>
    </div>
  );
}
