import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/ai-tools/ai-tools.css";
import DocumentAnalyzer from "./DocumentAnalyzer";
import {
  FaRobot,
  FaFileAlt,
  FaDatabase,
  FaUserTie,
  FaUniversity,
  FaBook,
  FaMoneyBillWave,
  FaSearch,
  FaBell,
} from "react-icons/fa";

const tools = [
  {
    title: "Mock Interview",
    desc: "AI-powered practice sessions tailored to your target company and role specifications.",
    rating: 4.8,
    action: "Launch Studio",
    icon: <FaUserTie />,
    color: "#f3d5c0",
  },
  {
    title: "AI Resume Maker",
    desc: "Generate professional, ATS-friendly CVs that highlight your unique academic strengths.",
    rating: 4.9,
    action: "Create Resume",
    route: "/tools/resume-builder",
    icon: <FaFileAlt />,
    color: "#d8d3c4",
  },
  {
    title: "Smart Doc Analyzer",
    desc: "Instant document data extraction and summarization for complex research papers.",
    rating: 4.7,
    action: "Upload Docs",
    route: "/tools/document-analyzer",
    icon: <FaDatabase />,
    color: "#eac8a6",
  },
  {
    title: "Career Chatbot",
    desc: "Get personalized career guidance and roadmap.",
    rating: 4.8,
    action: "Start Chat",
    icon: <FaRobot />,
    color: "#e8d8c4",
    route: "/tools/career-chatbot",
  },
  {
    title: "College Recommender",
    desc: "Find best-fit colleges based on your profile.",
    rating: 4.6,
    action: "Explore",
    icon: <FaUniversity />,
    color: "#dcd2c8",
  },
  {
    title: "Study Planner",
    desc: "Plan your schedule smartly.",
    rating: 4.7,
    action: "Plan Now",
    icon: <FaBook />,
    color: "#f0dcc7",
  },
  {
    title: "Scholarship Predictor",
    desc: "Predict scholarship chances.",
    rating: 4.5,
    action: "Check Now",
     route: "/tools/scholarship-prediction",
    icon: <FaMoneyBillWave />,
    color: "#e6d5c3",
  },
];

export default function AITools() {
  const navigate = useNavigate();
  return (
    <div className="ai-tools-page">
      {/* ===== HEADER TOP ===== */}
      <div className="ai-header-top">
        <h2>R. S Education Solution</h2>

        {/* SEARCH BAR MOVED HERE */}
        <div className="ai-search">
          <FaSearch />
          <input placeholder="Search tools, docs, prep..." />
        </div>
      </div>

      {/* ===== MAIN HEADER ===== */}
      <div className="ai-header">
        <h1>Good morning, Student!</h1>
        <p>
          Explore AI tools designed to boost your academic and career journey.
        </p>
      </div>

      {/* ===== GRID ===== */}
      <div className="ai-grid">
        {tools.map((tool, index) => (
          <div key={index} className="ai-card">
            {/* TOP ROW (ICON + RATING) */}
            <div className="ai-card-header">
              <div className="ai-icon" style={{ background: tool.color }}>
                {tool.icon}
              </div>

              <span className="rating">⭐ {tool.rating}</span>
            </div>

            <h3>{tool.title}</h3>
            <p>{tool.desc}</p>

            <button
              className="ai-btn"
              onClick={() => tool.route && navigate(tool.route)}
            >
              {tool.action} →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
