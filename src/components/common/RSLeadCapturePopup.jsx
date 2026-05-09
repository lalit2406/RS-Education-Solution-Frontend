import React, { useState } from "react";
import "../../styles/common/rsLeadCapturePopup.css";
import { createLeadService } from "../../services/leadService";

const RSLeadCapturePopup = ({ isOpen, onClose }) => {
  const [rsLeadFormData, setRsLeadFormData] = useState({
    studentName: "",
    course: "",
    currentQualification: "",
    contactNo: "",
    email: "",
  });

  const [rsLeadErrors, setRsLeadErrors] = useState({});

  const [rsLeadSubmitting, setRsLeadSubmitting] = useState(false);

  const [rsLeadSuccessMessage, setRsLeadSuccessMessage] = useState("");

  const isRSLeadFormValid =
    rsLeadFormData.studentName.trim() &&
    rsLeadFormData.course &&
    rsLeadFormData.currentQualification &&
    /^[0-9]{10}$/.test(rsLeadFormData.contactNo) &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(rsLeadFormData.email);

  const handleRSLeadInputChange = (e) => {
    const { name, value } = e.target;

    setRsLeadFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // ✅ remove error while typing
    setRsLeadErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validateRSLeadForm = () => {
    const errors = {};

    // Student Name
    if (!rsLeadFormData.studentName.trim()) {
      errors.studentName = "Student name is required";
    }

    // Course
    if (!rsLeadFormData.course) {
      errors.course = "Please select course";
    }

    // Current Qualification
    if (!rsLeadFormData.currentQualification) {
      errors.currentQualification = "Please select qualification";
    }

    // Contact
    if (!rsLeadFormData.contactNo.trim()) {
      errors.contactNo = "Contact number is required";
    } else if (!/^[0-9]{10}$/.test(rsLeadFormData.contactNo)) {
      errors.contactNo = "Enter valid 10 digit mobile number";
    }

    // Email
    if (!rsLeadFormData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(rsLeadFormData.email)) {
      errors.email = "Enter valid email address";
    }

    return errors;
  };

  const handleRSLeadSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateRSLeadForm();

    if (Object.keys(validationErrors).length > 0) {
      setRsLeadErrors(validationErrors);
      return;
    }

    try {
      setRsLeadSubmitting(true);

      await createLeadService(rsLeadFormData);

      setRsLeadSuccessMessage("Thank you! Our team will contact you soon.");

      // ✅ NEVER SHOW POPUP AGAIN
      localStorage.setItem("rsLeadFormSubmitted", "true");

      setRsLeadFormData({
        studentName: "",
        course: "",
        currentQualification: "",
        contactNo: "",
        email: "",
      });

      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      console.error(error);

      setRsLeadErrors({
        apiError: error?.response?.data?.message || "Something went wrong",
      });
    } finally {
      setRsLeadSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="rs-lead-popup-overlay">
      <div className="rs-lead-popup-container">
        <button className="rs-lead-popup-close-btn" onClick={onClose}>
          ×
        </button>

        <h2 className="rs-lead-popup-title">Get Free Career Guidance</h2>

        <p className="rs-lead-popup-subtitle">
          Fill the form and our team will contact you.
        </p>

        <form className="rs-lead-popup-form" onSubmit={handleRSLeadSubmit}>
          <input
            type="text"
            name="studentName"
            placeholder="Student Name"
            className="rs-lead-popup-input"
            value={rsLeadFormData.studentName}
            onChange={handleRSLeadInputChange}
          />

          {rsLeadErrors.studentName && (
            <p className="rs-lead-popup-error">{rsLeadErrors.studentName}</p>
          )}

          <select
            name="course"
            className="rs-lead-popup-input"
            value={rsLeadFormData.course}
            onChange={handleRSLeadInputChange}
          >
            <option value="">Select Course</option>
            <option>B.Tech</option>
            <option>MBA</option>
            <option>MBBS</option>
            <option>BCA</option>
            <option>MCA</option>
          </select>

          {rsLeadErrors.course && (
            <p className="rs-lead-popup-error">{rsLeadErrors.course}</p>
          )}

          <select
            name="currentQualification"
            className="rs-lead-popup-input"
            value={rsLeadFormData.currentQualification}
            onChange={handleRSLeadInputChange}
          >
            <option value="">Current Qualification</option>

            <option value="10th">10th Pass</option>

            <option value="12th">12th Pass</option>

            <option value="Diploma">Diploma</option>

            <option value="Graduation">Graduation</option>

            <option value="Post Graduation">Post Graduation</option>

            <option value="Working Professional">Working Professional</option>
          </select>

          {rsLeadErrors.currentQualification && (
            <p className="rs-lead-popup-error">
              {rsLeadErrors.currentQualification}
            </p>
          )}

          <input
            type="tel"
            name="contactNo"
            placeholder="Contact Number"
            className="rs-lead-popup-input"
            value={rsLeadFormData.contactNo}
            onChange={handleRSLeadInputChange}
          />

          {rsLeadErrors.contactNo && (
            <p className="rs-lead-popup-error">{rsLeadErrors.contactNo}</p>
          )}

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            className="rs-lead-popup-input"
            value={rsLeadFormData.email}
            onChange={handleRSLeadInputChange}
          />

          {rsLeadErrors.email && (
            <p className="rs-lead-popup-error">{rsLeadErrors.email}</p>
          )}

          <button
            type="submit"
            className="rs-lead-popup-submit-btn"
            disabled={rsLeadSubmitting || !isRSLeadFormValid}
          >
            {rsLeadSubmitting ? "Submitting..." : "Submit"}
          </button>
        </form>

        {rsLeadErrors.apiError && (
          <p className="rs-lead-popup-error">{rsLeadErrors.apiError}</p>
        )}

        {rsLeadSuccessMessage && (
          <p className="rs-lead-popup-success">{rsLeadSuccessMessage}</p>
        )}

        <p className="rs-lead-popup-privacy-text">
          We respect your privacy. No spam calls.
        </p>
      </div>
    </div>
  );
};

export default RSLeadCapturePopup;
