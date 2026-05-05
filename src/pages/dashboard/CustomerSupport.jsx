import { useState } from "react";
import "../../styles/dashboard/customerSupport.css";

import {
  FaComments,
  FaPhoneAlt,
  FaEnvelope,
  FaPlus,
  FaMinus,
} from "react-icons/fa";

import BookCallModal from "../../components/dashboard/BookCallModal";
import TicketModal from "../../components/dashboard/TicketModal";
import ChatbotSupport from "../../components/dashboard/ChatbotSupport";

export default function CustomerSupport() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [openTicket, setOpenTicket] = useState(false);
  const [openChatbot, setOpenChatbot] = useState(false);


  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "How do I track my application status?",
      answer:
        "You can track your application status directly from your dashboard under the 'My Applications' section.",
    },
    {
      question: "What documents are required for university entry?",
      answer:
        "Typically includes transcripts, SOP, LORs, English proficiency scores, and passport copy.",
    },
    {
      question: "Is there a fee for the initial consultation?",
      answer: "No, the initial consultation is completely free for all users.",
    },
    {
      question: "Can I change my assigned counselor?",
      answer: "Yes, you can request a counselor change by contacting support.",
    },
  ];

  return (
    <div className="rs-dashboard-cs-container">
      {/* HERO */}
      <div className="rs-dashboard-cs-hero">
        <p className="rs-dashboard-cs-subtitle">HELP CENTER</p>

        <h1 className="rs-dashboard-cs-title">
          How can we support your <span>journey</span> today?
        </h1>

        <p className="rs-dashboard-cs-desc">
          Find answers, connect with experts, and manage your educational
          aspirations with the help of our dedicated support team.
        </p>
      </div>

      {/* SUPPORT CARDS */}
      <div className="rs-dashboard-cs-cards">
        {/* LIVE CHAT */}
        <div className="rs-dashboard-cs-card">
          <div className="rs-dashboard-cs-icon">
            <FaComments />
          </div>
          <h3>Live Chat</h3>
          <p>
            Instant connection with our support specialists. Average wait time:
            2 mins.
          </p>
          <button
            className="rs-chatbotsupport-start-btn"
            onClick={() => setOpenChatbot(true)}
          >
            Start Chatting →
          </button>
        </div>

        {/* BOOK CALL */}
        <div className="rs-dashboard-cs-card">
          <div className="rs-dashboard-cs-icon">
            <FaPhoneAlt />
          </div>
          <h3>Book a Call</h3>
          <p>
            Schedule a personalized 15-minute consultation with a senior
            advisor.
          </p>
          <button onClick={() => setOpenModal(true)}>Check Calendar →</button>
        </div>

        {/* EMAIL */}
        <div className="rs-dashboard-cs-card">
          <div className="rs-dashboard-cs-icon">
            <FaEnvelope />
          </div>
          <h3>Email Support</h3>
          <p>
            Send us detailed inquiries. We typically respond within 24 business
            hours.
          </p>
          <button onClick={() => setOpenTicket(true)}>Submit Ticket →</button>
        </div>
      </div>

      {/* FAQ SECTION */}
      <div className="rs-dashboard-cs-faq">
        {/* LEFT */}
        <div className="rs-dashboard-cs-faq-left">
          <h2>Common Questions</h2>
          <p>
            Can't find what you're looking for? Browse our comprehensive
            documentation library.
          </p>
          <button className="rs-dashboard-cs-faq-btn">View All FAQs ↗</button>
        </div>

        {/* RIGHT */}
        <div className="rs-dashboard-cs-faq-right">
          {faqs.map((item, index) => (
            <div
              key={index}
              className={`rs-dashboard-cs-faq-item ${
                activeIndex === index ? "active" : ""
              }`}
            >
              {/* QUESTION */}
              <div
                className="rs-dashboard-cs-faq-question"
                onClick={() => toggleFAQ(index)}
              >
                <span>{item.question}</span>
                {activeIndex === index ? <FaMinus /> : <FaPlus />}
              </div>

              {/* ANSWER WITH SMOOTH ANIMATION */}
              <div
                className={`rs-dashboard-cs-faq-answer ${
                  activeIndex === index ? "open" : ""
                }`}
              >
                <p>{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA SECTION */}
      <div className="rs-dashboard-cs-cta">
        <div>
          <h2>Still need help?</h2>
          <p>Our emergency support is available 24/7 for premium members.</p>
        </div>

        <div className="rs-dashboard-cs-cta-buttons">
          <button
            className="primary"
            onClick={() => (window.location.href = "/contact")}
          >
            Contact Support
          </button>
        </div>
      </div>

      {/* BOOK CALL MODAL */}
      <BookCallModal isOpen={openModal} onClose={() => setOpenModal(false)} />

      {/* TICKET MODAL */}
      <TicketModal isOpen={openTicket} onClose={() => setOpenTicket(false)} />

      {/* CHATBOT SUPPORT MODAL */}
      {openChatbot && (
        <ChatbotSupport onClose={() => setOpenChatbot(false)} />
      )}
    </div>
  );
}
