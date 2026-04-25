import { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Link } from "react-router-dom";
import {
  FaArrowLeft,
  FaAward,
  FaCheckCircle,
  FaDownload,
  FaExclamationCircle,
  FaGraduationCap,
  FaHandHoldingUsd,
  FaIdCard,
  FaLightbulb,
  FaPercentage,
  FaSpinner,
  FaStar,
} from "react-icons/fa";
import "../../styles/ai-tools/scholarshipPrediction.css";

export default function ScholarshipPrediction() {
  const reportRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [apiData, setApiData] = useState(null);
  const [error, setError] = useState("");
  const [rsSchLoading, setRsSchLoading] = useState(true);

  const [formData, setFormData] = useState({
    marks: "",
    category: "",
    income: "",
    state: "",
    course: "",
    gender: "",
    disability: false,
  });

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    setRsSchLoading(false);
  }, []);

  const states = [
    "Delhi",
    "Haryana",
    "Punjab",
    "UP",
    "Rajasthan",
    "Bihar",
    "Maharashtra",
    "Karnataka",
    "Tamil Nadu",
    "Gujarat",
  ];

  const estimateChance = useMemo(() => {
    let score = 15;

    if (formData.marks) score += Number(formData.marks) * 0.55;

    if (formData.income) {
      if (Number(formData.income) <= 250000) score += 18;
      else if (Number(formData.income) <= 500000) score += 10;
      else score += 4;
    }

    if (["OBC", "SC", "ST", "EWS"].includes(formData.category)) score += 12;

    if (formData.course) score += 6;

    if (formData.disability) score += 12;

    if (score > 100) score = 100;

    return Math.round(score);
  }, [formData]);

  const chanceLevel =
    estimateChance >= 80 ? "High" : estimateChance >= 55 ? "Medium" : "Low";

  const chanceColor =
    estimateChance >= 80
      ? "#27a95c"
      : estimateChance >= 55
        ? "#d59014"
        : "#d55252";

  const tips = [
    formData.marks && Number(formData.marks) < 85
      ? "Marks above 85% unlock more merit scholarships."
      : "Strong academics increase scholarship visibility.",

    formData.income && Number(formData.income) > 300000
      ? "Need-based scholarships may reduce at higher income."
      : "Current income range supports many need-based schemes.",

    formData.disability
      ? "Extra support scholarships may apply."
      : "Enable disability option if applicable.",
  ];

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setApiData(null);
    setError("");

    try {
      const payload = {
        marks: parseInt(formData.marks),
        category: formData.category.trim(),
        income: parseInt(formData.income),
        state: formData.state.trim(),
        course: formData.course.trim(),
        gender: formData.gender.trim().toLowerCase(),
        disability: formData.disability,
      };

      if (
        !payload.marks ||
        !payload.category ||
        !payload.income ||
        !payload.state ||
        !payload.course ||
        !payload.gender
      ) {
        setError("Please complete all fields correctly.");
        setLoading(false);
        return;
      }

      const res = await axios.post(
        import.meta.env.VITE_SCHOLARSHIP_API,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      setApiData(res.data);
    } catch (err) {
      console.log("Backend Error:", err.response?.data || err);

      setError(
        err.response?.data?.detail?.[0]?.msg ||
          err.response?.data?.message ||
          "Unable to fetch prediction. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = async () => {
    if (!reportRef.current) return;

    const canvas = await html2canvas(reportRef.current, {
      scale: 2,
      useCORS: true,
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");

    const width = 210;
    const height = (canvas.height * width) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, width, height);
    pdf.save("Scholarship-Report.pdf");
  };

  const isFormValid =
    formData.marks &&
    formData.category &&
    formData.income &&
    formData.state &&
    formData.course &&
    formData.gender;

  return (
    <div className="schp-page">
      <div className="schp-topbar">
        <Link to="/ai-tools" className="schp-back-btn">
          <FaArrowLeft /> Back to AI Tools
        </Link>

        <div className="schp-top-pill">AI Powered Prediction</div>
      </div>

      <section className="schp-hero-box">
        {rsSchLoading ? (
          <>
            <div className="rs-sch-skeleton-pill"></div>
            <div className="rs-sch-skeleton-title"></div>
            <div className="rs-sch-skeleton-desc"></div>
          </>
        ) : (
          <>
            <span className="schp-mini-pill">Smart Eligibility Check</span>
            <h1 className="schp-hero-title">Scholarship Prediction</h1>
            <p className="schp-hero-sub">
              Discover matching scholarships, estimate your success chance and
              download a personalized report in seconds.
            </p>
          </>
        )}
      </section>

      <section className="schp-layout-grid">
        {/* LEFT */}
        <div className="schp-left-zone">
          {rsSchLoading ? (
            <div className="schp-clay-card">
              <div className="rs-sch-skeleton-form"></div>
              <div className="rs-sch-skeleton-form"></div>
              <div className="rs-sch-skeleton-form"></div>
              <div className="rs-sch-skeleton-btn"></div>
            </div>
          ) : (
            <div className="schp-clay-card">
              <div className="schp-card-head">
                <div>
                  <h3>Student Details</h3>
                  <p>Fill accurate details for best recommendations.</p>
                </div>

                <span className="schp-head-badge">Live Analysis</span>
              </div>

              <form onSubmit={handleSubmit} className="schp-form-wrap">
                <div className="schp-two-grid">
                  <div className="schp-field-box">
                    <label>Marks %</label>
                    <input
                      type="number"
                      name="marks"
                      placeholder="Enter marks"
                      value={formData.marks}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="schp-field-box">
                    <label>Category</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                    >
                      <option value="">Select Category</option>
                      <option value="General">General</option>
                      <option value="OBC">OBC</option>
                      <option value="SC">SC</option>
                      <option value="ST">ST</option>
                      <option value="EWS">EWS</option>
                    </select>
                  </div>
                </div>

                <div className="schp-two-grid">
                  <div className="schp-field-box">
                    <label>Family Income</label>
                    <input
                      type="number"
                      name="income"
                      placeholder="Enter annual income"
                      value={formData.income}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="schp-field-box">
                    <label>State</label>
                    <select
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                    >
                      <option value="">Select State</option>
                      {states.map((item) => (
                        <option key={item}>{item}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="schp-two-grid">
                  <div className="schp-field-box">
                    <label>Course</label>
                    <input
                      type="text"
                      name="course"
                      placeholder="Eg. B.tech"
                      value={formData.course}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="schp-field-box">
                    <label>Gender</label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <label className="schp-check-row">
                  <input
                    type="checkbox"
                    name="disability"
                    checked={formData.disability}
                    onChange={handleChange}
                  />
                  Disability Applicable
                </label>

                <button
                  className="schp-submit-btn"
                  disabled={loading || !isFormValid}
                >
                  {loading ? (
                    <>
                      <FaSpinner className="schp-spin" />
                      Checking...
                    </>
                  ) : isFormValid ? (
                    "Check Now"
                  ) : (
                    "Complete All Fields"
                  )}
                </button>
              </form>
            </div>
          )}

          {/* Insight Card */}
          <div className="schp-clay-card">
            <div className="schp-insight-row">
              <div
                className="schp-ring"
                style={{
                  background: `conic-gradient(${chanceColor} ${
                    estimateChance * 3.6
                  }deg,#eadfd5 0deg)`,
                }}
              >
                <div className="schp-ring-inner">
                  <strong>{estimateChance}%</strong>
                </div>
              </div>

              <div className="schp-insight-content">
                <h3>Live Eligibility Insights</h3>
                <p>
                  Your estimated scholarship chance is <b>{chanceLevel}</b>
                </p>

                <span
                  className="schp-level-pill"
                  style={{ background: chanceColor }}
                >
                  {chanceLevel}
                </span>
              </div>
            </div>

            <div className="schp-tip-list">
              {tips.map((tip, i) => (
                <div className="schp-tip-card" key={i}>
                  <FaLightbulb />
                  {tip}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="schp-right-zone">
          {loading && (
            <div className="schp-clay-card">
              <div className="schp-skeleton schp-sk-big"></div>
              <div className="schp-skeleton"></div>
              <div className="schp-skeleton"></div>
              <div className="schp-skeleton"></div>
              <div className="schp-skeleton"></div>
            </div>
          )}

          {!loading && !apiData && !error && (
            <div className="schp-clay-card schp-empty-box">
              <FaGraduationCap />
              <h3>No Prediction Yet</h3>
              <p>
                Fill your profile and click Check Now to discover matching
                scholarships.
              </p>
            </div>
          )}

          {error && (
            <div className="schp-clay-card schp-error-box">
              <FaExclamationCircle />
              <p>{error}</p>
            </div>
          )}

          {apiData && (
            <div ref={reportRef}>
              <div className="schp-clay-card">
                <div className="schp-result-head">
                  <div>
                    <h2>Prediction Result</h2>
                    <p>{apiData.timestamp}</p>
                  </div>

                  <button className="schp-download-btn" onClick={downloadPDF}>
                    <FaDownload /> PDF Report
                  </button>
                </div>

                <div className="schp-stats-grid">
                  <div className="schp-stat-card">
                    <FaPercentage />
                    <span>Probability</span>
                    <strong>{apiData.data.probability}%</strong>
                  </div>

                  <div className="schp-stat-card">
                    <FaAward />
                    <span>Recommendation</span>
                    <strong>{apiData.data.recommendation}</strong>
                  </div>

                  <div className="schp-stat-card">
                    <FaCheckCircle />
                    <span>Status</span>
                    <strong>{apiData.status}</strong>
                  </div>
                </div>
              </div>

              <div className="schp-clay-card">
                <h3 className="schp-section-title">AI Summary</h3>
                <p className="schp-summary-text">{apiData.data.summary}</p>
              </div>

              {/* Replace ONLY the scholarship mapping section inside apiData block */}

              <div className="schp-scroll-results">
                {apiData.data.scholarships.map((item, index) => (
                  <div className="schp-clay-card schp-scholar-box" key={index}>
                    <div className="schp-scholar-top">
                      <h3>{item.title}</h3>

                      <span className="schp-match-pill">
                        {item.match_score}% Match
                      </span>
                    </div>

                    <div className="schp-tag-row">
                      <span>
                        <FaIdCard /> {item.provider}
                      </span>

                      <span>
                        <FaHandHoldingUsd /> {item.benefit_amount}
                      </span>

                      <span>
                        <FaStar /> Recommended
                      </span>
                    </div>

                    <p>
                      <b>Eligibility:</b> {item.eligibility}
                    </p>

                    <p>
                      <b>Why You Qualify:</b> {item.why_you_qualify}
                    </p>

                    <p>
                      <b>Deadline:</b> {item.deadline}
                    </p>

                    <a
                      href={item.website}
                      target="_blank"
                      rel="noreferrer"
                      className="schp-visit-btn"
                    >
                      Visit Website
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
