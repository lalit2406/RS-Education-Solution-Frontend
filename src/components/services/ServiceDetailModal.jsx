import "../../styles/services/serviceDetailModal.css";
import { FaTimes, FaCheckCircle, FaFire } from "react-icons/fa";
import { useState, useEffect } from "react";
export default function ServiceDetailModal({
  isOpen,
  onClose,
  service,
  onBookNow,
}) {
  const [openIndex, setOpenIndex] = useState(null);
  
  useEffect(() => {
    if (isOpen) {
      setOpenIndex(null);
    }
  }, [isOpen]);

  useEffect(() => {
  if (isOpen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }

  return () => {
    document.body.style.overflow = "auto";
  };
}, [isOpen]);

  if (!isOpen || !service) return null;


  return (
    <div className="rs-services-modal-overlay" onClick={onClose}>
      <div className="rs-services-modal" onClick={(e) => e.stopPropagation()}>
        {/* CLOSE BUTTON */}
        <button className="rs-services-close" onClick={onClose}>
          <FaTimes />
        </button>

        {/* HEADER */}
        <div className="rs-services-header">
          <div className="rs-services-title">
            <div className="rs-services-icon">{service.icon}</div>
            <h2>{service.title}</h2>
          </div>

          {/* 🔥 TOP RIGHT BUTTON */}
          <button className="rs-services-book-btn" onClick={onBookNow}>
            Book Now →
          </button>
        </div>

        {/* CONTENT */}
        <div className="rs-services-content">
          {/* 🔥 HERO INFO */}
          <div className="rs-services-hero">
            <p>{service.desc}</p>

            <div className="rs-services-highlight">
              ⭐ Most students see results within 2–4 weeks
            </div>
          </div>

          {/* 🔥 BENEFITS */}
          <div className="rs-services-section">
            <h3>What you’ll get</h3>

            <div className="rs-services-grid">
              {service.benefits?.map((item, i) => (
                <div key={i} className="rs-services-card">
                  <span className="rs-icon success">
                    <FaCheckCircle />
                  </span>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 🔥 WHY CHOOSE US */}
          <div className="rs-services-section">
            <h3>Why choose us?</h3>

            <div className="rs-services-grid">
              {service.why?.map((item, i) => (
                <div key={i} className="rs-services-card alt">
                  <span className="rs-icon highlight">
                    <FaFire />
                  </span>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>
          {/* 🔥 FAQ SECTION */}
          <div className="rs-services-section">
            <h3>Frequently Asked Questions</h3>

            <div className="rs-faq-container">
              {service.faqs?.map((faq, index) => (
                <div key={index} className="rs-faq-item">
                  <div
                    className="rs-faq-question"
                    onClick={() =>
                      setOpenIndex(openIndex === index ? null : index)
                    }
                  >
                    <span>{faq.q}</span>
                    <span
                      className={`rs-faq-icon ${
                        openIndex === index ? "open" : ""
                      }`}
                    >
                      +
                    </span>
                  </div>

                  <div
                    className={`rs-faq-answer-wrapper ${
                      openIndex === index ? "open" : ""
                    }`}
                  >
                    <p className="rs-faq-answer">{faq.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* 🔥 CTA SECTION */}
        <div className="rs-services-cta">
          <p>Ready to take the next step?</p>

          <button className="rs-services-cta-btn" onClick={onBookNow}>
            📅 Book a Free Consultation
          </button>
        </div>
      </div>
    </div>
  );
}
