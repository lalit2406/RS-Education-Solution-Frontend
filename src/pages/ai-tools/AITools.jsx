import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/ai-tools/ai-tools.css";
import DocumentAnalyzer from "./DocumentAnalyzer";
import { useUser } from "../../context/UserContext";
import {
  FaRobot,
  FaFileAlt,
  FaDatabase,
  FaMapSigns,
  FaUniversity,
  FaBook,
  FaMoneyBillWave,
  FaSearch,
  FaBell,
} from "react-icons/fa";

const tools = [
  {
    title: "AI Roadmap Generator",
    desc: "Generate personalized career roadmaps with step-by-step guidance, skills, and learning paths powered by AI.",
    rating: 4.9,
    action: "Create Roadmap",
    route: "/tools/roadmap-generator",
    icon: <FaMapSigns />,
    color: "#e6d5c3",
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
    route: "/dashboard/college-recommendation",
    icon: <FaUniversity />,
    color: "#dcd2c8",
  },
  {
    title: "Study Planner",
    desc: "Plan your schedule smartly.",
    rating: 4.7,
    action: "Plan Now",
    route: "/tools/study-planner",
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
  const user = JSON.parse(localStorage.getItem("user"));
  const [rsAiLoading, setRsAiLoading] = useState(true);

  /* =========================
     LOADING STATE (ADDED)
  ========================= */
  useEffect(() => {
    // static tools → no loading needed
    setRsAiLoading(false);
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="ai-tools-page">
      {/* ===== HEADER TOP ===== */}
      <div className="ai-header-top">
        <h2>R. S Education Solution</h2>
      </div>

      {/* ===== MAIN HEADER ===== */}
      <div className="ai-header">
        {rsAiLoading ? (
          <>
            <div className="rs-ai-skeleton-title"></div>
            <div className="rs-ai-skeleton-desc"></div>
          </>
        ) : (
          <>
            <h1>
              {getGreeting()}, {user?.name || "Student"}!
            </h1>
            <p>
              Explore AI tools designed to boost your academic and career
              journey.
            </p>
          </>
        )}
      </div>

      {/* ===== GRID ===== */}
      <div className="ai-grid">
        {rsAiLoading
          ? Array(6)
              .fill(0)
              .map((_, index) => (
                <div key={index} className="ai-card rs-ai-skeleton-card">
                  <div className="rs-ai-skeleton-icon"></div>
                  <div className="rs-ai-skeleton-text-md"></div>
                  <div className="rs-ai-skeleton-text-sm"></div>
                  <div className="rs-ai-skeleton-btn"></div>
                </div>
              ))
          : tools.map((tool, index) => (
              <div key={index} className="ai-card">
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
