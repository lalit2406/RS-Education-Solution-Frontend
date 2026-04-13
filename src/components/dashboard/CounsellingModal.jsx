import { useState } from "react";
import "../../styles/dashboard/counsellingmodal.css";

export default function CounsellingModal({ isOpen, onClose, program }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    qualification: "",
    stream: "",
    goal: "",
    contactMethod: "Call",
    timeSlot: "Morning",
  });

  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    // simulate API delay
    setTimeout(() => {
      console.log("Counselling Request:", {
        ...formData,
        program,
      });

      setLoading(false);
      setIsSubmitted(true);
    }, 1200);
  };

  const handleClose = () => {
    setIsSubmitted(false);
    setLoading(false);
    onClose();
  };

  return (
    <div className="cm-overlay">
      <div className="cm-modal">

        <button className="cm-close" onClick={handleClose}>×</button>

        {/* SUCCESS UI */}
        {isSubmitted ? (
          <div className="cm-success">
            <h2>✅ Request Submitted</h2>
            <p>
              Our expert will contact you within 24 hours regarding{" "}
              <strong>{program}</strong>.
            </p>

            <button className="cm-submit" onClick={handleClose}>
              Continue Browsing
            </button>
          </div>
        ) : (
          <>
            {/* HEADER */}
            <div className="cm-header">
              <h2>Get Expert Guidance</h2>
              <p>{program}</p>
            </div>

            {/* FORM */}
           <form onSubmit={handleSubmit} className="cm-form">

  {/* FULL NAME */}
  <input
    type="text"
    name="name"
    placeholder="Full Name"
    required
    onChange={handleChange}
  />

  {/* PHONE + EMAIL */}
  <div className="cm-row">
    <input
      type="tel"
      name="phone"
      placeholder="Phone Number"
      required
      onChange={handleChange}
    />

    <input
      type="email"
      name="email"
      placeholder="Email Address"
      required
      onChange={handleChange}
    />
  </div>

  {/* QUALIFICATION + STREAM */}
  <div className="cm-row">
    <select name="qualification" required onChange={handleChange}>
      <option value="">Qualification</option>
      <option>10th</option>
      <option>12th</option>
      <option>Graduate</option>
    </select>

    <select name="stream" onChange={handleChange}>
      <option value="">Stream</option>
      <option>Science</option>
      <option>Commerce</option>
      <option>Arts</option>
    </select>
  </div>

  {/* GOAL */}
  <textarea
    name="goal"
    placeholder="What guidance are you looking for?"
    required
    onChange={handleChange}
  />

  {/* CONTACT METHOD + TIME */}
  <div className="cm-row">
    <select name="contactMethod" onChange={handleChange}>
      <option>Call</option>
      <option>Email</option>
    </select>

    <select name="timeSlot" onChange={handleChange}>
      <option>Morning</option>
      <option>Afternoon</option>
      <option>Evening</option>
    </select>
  </div>

  {/* BUTTON */}
  <button type="submit" className="cm-submit" disabled={loading}>
    {loading ? "Submitting..." : "Request Counselling"}
  </button>

</form>
          </>
        )}
      </div>
    </div>
  );
}