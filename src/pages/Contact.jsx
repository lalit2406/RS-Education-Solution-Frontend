import "../../src/styles/pages/contact.css";
import { FaPhoneAlt, FaWhatsapp, FaEnvelope, FaStore } from "react-icons/fa";
import Footer from "/src/components/layout/Footer";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";

export default function Contact() {
  /* =========================
     FORM STATE
  ========================= */
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  /* =========================
     SKELETON LOADING
  ========================= */
  const [rsContactLoading, setRsContactLoading] = useState(true);

  useEffect(() => {
    // No API → load instantly
    setRsContactLoading(false);
  }, []);

  /* =========================
     HANDLERS
  ========================= */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill all required fields");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/contact`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );

      if (!res.ok) throw new Error();

      toast.success("Message sent successfully ✅");

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rs-contact-page">
      {/* HERO */}
      <section className="rs-contact-hero">
        {rsContactLoading ? (
          <>
            <div className="rs-contact-skeleton-title"></div>
            <div className="rs-contact-skeleton-desc"></div>
          </>
        ) : (
          <>
            <h1>Contact Us</h1>
            <p>
              Have questions about studying abroad, admissions, or career
              guidance? Our expert team at RS Education is here to help you at
              every step.
            </p>
          </>
        )}

        <div className="rs-contact-bg">
          <img src="/images/home/contact_bg.webp" alt="background" loading="eager" />
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="rs-contact-container">
        {/* LEFT SIDE */}
        <div className="rs-contact-left">
          {/* CARD 1 */}
          {rsContactLoading ? (
            <div className="rs-contact-card">
              <div className="rs-contact-skeleton-icon"></div>
              <div className="rs-contact-skeleton-card-title"></div>
              <div className="rs-contact-skeleton-card-desc"></div>
            </div>
          ) : (
            <div className="rs-contact-card">
              <FaPhoneAlt className="rs-contact-icon" />
              <h4>Phone</h4>
              <p>+91 7011557354 </p>
            </div>
          )}

          {/* CARD 2 */}
          {rsContactLoading ? (
            <div className="rs-contact-card">
              <div className="rs-contact-skeleton-icon"></div>
              <div className="rs-contact-skeleton-card-title"></div>
              <div className="rs-contact-skeleton-card-desc"></div>
            </div>
          ) : (
            <div className="rs-contact-card">
              <FaWhatsapp className="rs-contact-icon" />
              <h4>Whatsapp</h4>
              <p>7011557354</p>
            </div>
          )}

          {/* CARD 3 */}
          {rsContactLoading ? (
            <div className="rs-contact-card">
              <div className="rs-contact-skeleton-icon"></div>
              <div className="rs-contact-skeleton-card-title"></div>
              <div className="rs-contact-skeleton-card-desc"></div>
            </div>
          ) : (
            <div className="rs-contact-card">
              <FaEnvelope className="rs-contact-icon" />
              <h4>Email</h4>
              <p>support@rseducationsolution.in</p>
            </div>
          )}

          {/* CARD 4 */}
          {rsContactLoading ? (
            <div className="rs-contact-card">
              <div className="rs-contact-skeleton-icon"></div>
              <div className="rs-contact-skeleton-card-title"></div>
              <div className="rs-contact-skeleton-card-desc"></div>
            </div>
          ) : (
            <div className="rs-contact-card">
              <FaStore className="rs-contact-icon" />
              <h4>Our Office</h4>
              <p>Parvatiya Colony, Faridabad, Haryana, India</p>
            </div>
          )}

          {/* MAP */}
          <div className="rs-contact-map">
            {rsContactLoading ? (
              <div className="rs-contact-skeleton-map"></div>
            ) : (
              <iframe
                title="map"
                src="https://maps.google.com/maps?q=Delhi&t=&z=13&ie=UTF8&iwloc=&output=embed"
                style={{
                  border: 0,
                  borderRadius: "16px",
                  width: "100%",
                  height: "300px",
                }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            )}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="rs-contact-right">
          {rsContactLoading ? (
            <>
              <div className="rs-contact-skeleton-form-title"></div>
              <div className="rs-contact-skeleton-form-desc"></div>

              <div className="rs-contact-skeleton-input"></div>
              <div className="rs-contact-skeleton-input"></div>
              <div className="rs-contact-skeleton-input"></div>
              <div className="rs-contact-skeleton-textarea"></div>

              <div className="rs-contact-skeleton-btn"></div>
            </>
          ) : (
            <>
              <h2>Get In Touch</h2>
              <p>
                Fill out the form below and our team will get back to you within
                24 hours. Whether you need help choosing a program, preparing
                for exams, or applying to universities — we’re here for you.
              </p>

              <form className="rs-contact-form" onSubmit={handleSubmit}>
                <div className="rs-contact-input-group">
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="rs-contact-input-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="example@email.com"
                  />
                </div>

                <div className="rs-contact-input-group">
                  <label>Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Title"
                  />
                </div>

                <div className="rs-contact-input-group">
                  <label>Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Type here..."
                    rows="5"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="rs-contact-btn"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send Now"}
                </button>
              </form>
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
