import "../../src/styles/pages/contact.css";
import { FaPhoneAlt, FaWhatsapp, FaEnvelope, FaStore } from "react-icons/fa";
import ContactBG from "/src/assets/images/contact_bg.png";
import Footer from "/src/components/layout/Footer";
import toast from "react-hot-toast";
import { useState } from "react";

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill all required fields");
      return;
    }

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
      toast.error("Something went wrong ❌");
    }
  };
  return (
    <div className="rs-contact-page">
      <section className="rs-contact-hero">
        <h1>Contact Us</h1>
        <p>
          Have questions about studying abroad, admissions, or career guidance?
          Our expert team at RS Education is here to help you at every step.
        </p>

        <div className="rs-contact-bg">
          <img src={ContactBG} alt="background" />
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="rs-contact-container">
        {/* LEFT SIDE */}
        <div className="rs-contact-left">
          <div className="rs-contact-card">
            <FaPhoneAlt className="rs-contact-icon" />
            <h4>Phone</h4>
            <p>+91 7011557354 (Mon–Sat, 10AM–7PM)</p>
          </div>

          <div className="rs-contact-card">
            <FaWhatsapp className="rs-contact-icon" />
            <h4>Whatsapp</h4>
            <p>7011557354 </p>
          </div>

          <div className="rs-contact-card">
            <FaEnvelope className="rs-contact-icon" />
            <h4>Email</h4>
            <p>support@rseducationsolution.in</p>
          </div>

          <div className="rs-contact-card">
            <FaStore className="rs-contact-icon" />
            <h4>Our Office</h4>
            <p>Parvatiya Colony, Faridabad, Haryana, India</p>
          </div>

          {/* MAP */}
          <div className="rs-contact-map">
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
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="rs-contact-right">
          <h2>Get In Touch</h2>
          <p>
            Fill out the form below and our team will get back to you within 24
            hours. Whether you need help choosing a program, preparing for
            exams, or applying to universities — we’re here for you.
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

            <button type="submit" className="rs-contact-btn" disabled={loading}>
              {loading ? "Sending..." : "Send Now"}
            </button>
          </form>
        </div>
      </section>
      <Footer />
    </div>
  );
}
