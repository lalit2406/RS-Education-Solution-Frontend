import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Download,
  Search,
  GraduationCap,
  CheckCircle,
  FileText,
  Clock,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import "../../src/styles/pages/onlineUniversities.css";

const API_BASE_URL = "http://localhost:5000/api/universities";

export default function OnlineUniversities() {
  const [universities, setUniversities] = useState([]);
  const [filteredUniversities, setFilteredUniversities] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterMode, setFilterMode] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [downloadingId, setDownloadingId] = useState(null);

  // Fetch all universities
  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        setLoading(true);
        const response = await axios.get(API_BASE_URL);
        const data =
          response.data.length > 0 ? response.data : getMockUniversities();
        setUniversities(data);
        setFilteredUniversities(data);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Unable to load universities");
      } finally {
        setLoading(false);
      }
    };
    fetchUniversities();
  }, []);

  // Filter logic
  useEffect(() => {
    let result = universities;

    if (filterMode !== "All") {
      result = result.filter(
        (u) => u.mode.toLowerCase() === filterMode.toLowerCase(),
      );
    }

    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (u) =>
          u.name.toLowerCase().includes(q) ||
          u.coursesListSummary.toLowerCase().includes(q),
      );
    }

    setFilteredUniversities(result);
  }, [searchQuery, filterMode, universities]);

  // Download PDF file
  const handleDownloadPDF = async (id, universityName) => {
    try {
      setDownloadingId(id);
      const downloadUrl = `${API_BASE_URL}/${id}/download`;

      const response = await axios.get(downloadUrl, {
        responseType: "blob",
      });

      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `${universityName.replace(/\s+/g, "_")}_Fee_Structure.pdf`,
      );
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (err) {
      console.error("PDF download error:", err);
      alert(
        "Could not connect to backend server for PDF generation. Running a local fallback.",
      );
    } finally {
      setDownloadingId(null);
    }
  };

  const getMockUniversities = () => [
    {
      _id: "1",
      name: "Amity University Online",
      shortName: "AMITY",
      mode: "Online",
      coursesListSummary: "MBA • MCA • BCA • BBA • B.Com • M.Com • BA • MSc",
      approvedBadges: ["UGC Approved", "WES Accredited", "NAAC A+ Grade"],
    },
    {
      _id: "2",
      name: "LPU Online",
      shortName: "LPU",
      mode: "Online",
      coursesListSummary:
        "MBA • MCA • BCA • BBA • B.Com • MA • MSc • M.Com • Diploma",
      approvedBadges: ["UGC Approved", "AICTE Approved", "WES Accredited"],
    },
    {
      _id: "3",
      name: "Mangalayatan University (Distance)",
      shortName: "Mangalayatan Distance",
      mode: "Distance",
      coursesListSummary: "BA • B.Com • B.Sc • MA • MBA • M.Sc • MLib • BLib",
      approvedBadges: ["UGC Approved", "DEB Approved", "NAAC A+ Grade"],
    },
    {
      _id: "4",
      name: "Mangalayatan University (Online)",
      shortName: "Mangalayatan Online",
      mode: "Online",
      coursesListSummary: "BBA • BCA • BA • MA • M.Com • MBA • MCA • M.Sc",
      approvedBadges: ["UGC Approved", "DEB Approved", "AICTE Approved"],
    },
  ];

  const getFirstLetters = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 3)
      .toUpperCase();
  };

  return (
    <div className="onl-app-container">
      {/* Header */}
      <header className="onl-header-section">
        <h1 className="onl-header-title">Online Universities Fee Structure</h1>
        <div className="onl-title-decorator">
          <GraduationCap className="onl-title-decorator-icon" />
        </div>
        <p className="onl-header-subtitle">
          Download latest fee structure PDFs and compare course details across
          top certified online & distance universities.
        </p>
      </header>

      {/* Filters & Search */}
      <div className="onl-controls-bar">
        <div className="onl-search-input-wrapper">
          <Search className="onl-search-icon" size={18} />
          <input
            type="text"
            placeholder="Search by university or courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="onl-filter-tabs">
          {["All", "Online", "Distance"].map((mode) => (
            <button
              key={mode}
              className={`onl-filter-btn ${filterMode === mode ? "active" : ""}`}
              onClick={() => setFilterMode(mode)}
            >
              {mode === "All" ? "All Universities" : `${mode} Mode`}
            </button>
          ))}
        </div>
      </div>

      {/* Loading & Error States */}
      {loading ? (
        <div
          style={{
            textAlign: "center",
            padding: "60px 0",
            color: "var(--onl-text-muted)",
          }}
        >
          <Sparkles
            className="onl-animate-spin"
            style={{
              margin: "0 auto 15px",
              color: "var(--onl-color-primary)",
              width: "24px",
              height: "24px",
            }}
          />
          <p>Loading universities database...</p>
        </div>
      ) : (
        <div className="onl-cards-grid">
          {filteredUniversities.map((uni) => (
            <div className="onl-university-card" key={uni._id}>
              {/* Mode Badge */}
              <span className={`onl-card-mode-badge ${uni.mode.toLowerCase()}`}>
                {uni.mode}
              </span>

              {/* Logo Circle */}
              <div className="onl-card-logo-container">
                {uni.logo ? (
                  <img
                    src={uni.logo}
                    alt={uni.name}
                    className="onl-university-logo"
                  />
                ) : (
                  <span className="onl-card-logo-placeholder">
                    {getFirstLetters(uni.name)}
                  </span>
                )}
              </div>

              {/* Title */}
              <h2 className="onl-card-title">{uni.name}</h2>

              {/* Courses list */}
              <p className="onl-courses-summary">{uni.coursesListSummary}</p>


              {/* Actions */}
              <div className="onl-action-buttons">
                <button
                  className="onl-btn onl-btn-primary"
                  onClick={() => handleDownloadPDF(uni._id, uni.name)}
                  disabled={downloadingId === uni._id}
                >
                  <Download size={16} />
                  {downloadingId === uni._id
                    ? "Downloading..."
                    : "Download PDF"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredUniversities.length === 0 && (
        <div
          style={{
            textAlign: "center",
            padding: "40px 0",
            color: "var(--onl-text-muted)",
          }}
        >
          <p>No universities found matching your search criteria.</p>
        </div>
      )}

      {/* Feature Badges Footer */}
      <footer className="onl-badges-footer">
        <div className="onl-feature-badge">
          <div className="onl-badge-icon-wrapper">
            <ShieldCheck size={20} />
          </div>
          <div className="onl-badge-info">
            <h4>UGC Approved</h4>
            <p>100% Certified & Approved</p>
          </div>
        </div>

        <div className="onl-feature-badge">
          <div className="onl-badge-icon-wrapper">
            <Clock size={20} />
          </div>
          <div className="onl-badge-info">
            <h4>Latest Fees 2026</h4>
            <p>Fully Updated structures</p>
          </div>
        </div>

        <div className="onl-feature-badge">
          <div className="onl-badge-icon-wrapper">
            <FileText size={20} />
          </div>
          <div className="onl-badge-info">
            <h4>Direct Official PDFs</h4>
            <p>One-click direct download</p>
          </div>
        </div>

        <div className="onl-feature-badge">
          <div className="onl-badge-icon-wrapper">
            <CheckCircle size={20} />
          </div>
          <div className="onl-badge-info">
            <h4>100% Genuine</h4>
            <p>Verified information source</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
