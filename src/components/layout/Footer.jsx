import { useState } from "react";
import InterestModal from "../common/InterestModal";
import "../../styles/layout/footer.css";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [showModal, setShowModal] = useState(false);

  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* LEFT */}
        <div className="footer-left">
          <h2>R. S Education</h2>
          <p>
            Redefining academic excellence through personalized counseling and
            cutting-edge educational resources.
          </p>

          <div className="footer-socials">
            <a href="#">
              <FaFacebookF />
            </a>
            <a href="#">
              <FaInstagram />
            </a>
            <a href="#">
              <FaTwitter />
            </a>
            <a href="#">
              <FaWhatsapp />
            </a>
          </div>
        </div>

        {/* CENTER */}
        <div className="footer-center">
          <h3>Quick Links</h3>
          <Link to="/" className="footer-links-to-page">
            Home
          </Link>
          <Link to="/services" className="footer-links-to-page">
            Services
          </Link>
          <Link to="/programs" className="footer-links-to-page">
            Programs
          </Link>
          <Link to="/ai-tools" className="footer-links-to-page">
            AI Tools
          </Link>
        </div>

        {/* RIGHT */}
        <div className="footer-right">
          <h3>Subscribe to Newsletter</h3>
          <p>Get the latest educational insights delivered to your inbox.</p>

          <div className="newsletter">
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button
              onClick={() => {
                if (!email) return alert("Please enter email");
                setShowModal(true); // 👈 OPEN MODAL
              }}
            >
              Join
            </button>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        © {currentYear} R. S Education Solution. All rights reserved.
    
        <Link to="/terms">Terms & Conditions</Link>
        <Link to="/privacy">Privacy Policy</Link>
        <Link to="/disclaimer">Disclaimer</Link>
        <Link to="/contact">Contact & Support</Link>
      </div>
      {showModal && (
        <InterestModal email={email} onClose={() => setShowModal(false)} />
      )}
    </footer>
  );
}
