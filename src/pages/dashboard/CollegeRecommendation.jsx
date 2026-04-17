import { useEffect, useState } from "react";
import "../../styles/dashboard/collegeRecommendation.css";
import { FaHeart, FaGraduationCap } from "react-icons/fa";
import toast from "react-hot-toast";

import {
  fetchMetadata,
  fetchRecommendations,
  saveCollegeApi,
  unsaveCollegeApi,
  getSavedCollegesApi,
} from "../../services/collegeService";

export default function CollegeRecommendation() {
  const [crFormData, setCrFormData] = useState({
    marks: "",
    budget: "",
    location: "",
    course: "",
    branch: "",
    category: "general",
  });

  const [crMetadata, setCrMetadata] = useState({
    locations: [],
    courses: [],
    branches: [],
  });

  const [crResults, setCrResults] = useState([]);
  const [crSavedIds, setCrSavedIds] = useState([]);

  const [crLoading, setCrLoading] = useState(false);
  const [crError, setCrError] = useState("");
  const [crSummary, setCrSummary] = useState("");
  const [crSearched, setCrSearched] = useState(false);

  const TOAST_ID = "save-toast";

  /* ================= LOAD METADATA ================= */
  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchMetadata();
        setCrMetadata(data);
      } catch (err) {
        console.log(err);
        setCrError("Failed to load metadata");
      }
    };
    load();
  }, []);

  /* ================= LOAD SAVED ================= */
  useEffect(() => {
    const loadSaved = async () => {
      try {
        const data = await getSavedCollegesApi();
        const ids = data.map((c) => c.collegeId);
        setCrSavedIds(ids);
      } catch (err) {
        console.log(err);
      }
    };
    loadSaved();
  }, []);

  /* ================= INPUT ================= */
  const handleChange = (e) => {
    setCrFormData({
      ...crFormData,
      [e.target.name]: e.target.value,
    });
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    setCrLoading(true);
    setCrError("");
    setCrSearched(true);

    try {
      const payload = {
        ...crFormData,
        marks: parseInt(crFormData.marks),
        budget: parseInt(crFormData.budget),
        branch: crFormData.branch || null,
      };

      const data = await fetchRecommendations(payload);

      console.log("API RESPONSE:", data);

      // ✅ AI FAILURE HANDLING
      if (data?.error || data?.status_code === 503) {
        setCrError("Server error, please try after sometime");
        setCrResults([]);
        return;
      }

      setCrResults(data?.recommendations || []);
      setCrSummary(data?.student_summary || "");
      setCrError("");
    } catch (err) {
      console.log(err);
      setCrError("Server error, please try after sometime");
      setCrResults([]);
      toast.error("Something went wrong", { id: TOAST_ID });
    } finally {
      setCrLoading(false);
    }
  };

  /* ================= SAVE / UNSAVE ================= */
  const handleToggleSave = async (college) => {
    const id = college.name;
    const isSaved = crSavedIds.includes(id);

    if (isSaved) {
      setCrSavedIds((prev) => prev.filter((x) => x !== id));
      toast("Removed ❌", { id: TOAST_ID });
    } else {
      setCrSavedIds((prev) => [...prev, id]);
      toast.success("Saved ❤️", { id: TOAST_ID });
    }

   

    try {
      if (isSaved) {
        await unsaveCollegeApi(id);
      } else {
        await saveCollegeApi({
          ...college,
          collegeId: id,
        });
      }

       window.dispatchEvent(
  new CustomEvent("savedCollegesUpdated", {
    detail: { change: isSaved ? -1 : 1 },
  })
);
       
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong", { id: TOAST_ID });
    }
  };

  /* ================= SKELETON ================= */
  const renderSkeleton = () =>
    Array(3)
      .fill(0)
      .map((_, i) => <div className="cr-skeleton-card" key={i}></div>);

  return (
    <div className="cr-main-wrapper">
      {/* LEFT PANEL */}
      <div className="cr-profile-panel">
        <h2>Your Profile</h2>

        <form onSubmit={handleSubmit}>
          <label>Marks (Percentage)</label>
          <input
            type="number"
            name="marks"
            value={crFormData.marks}
            onChange={handleChange}
            required
          />

          <label>Annual Budget (₹)</label>
          <input
            type="number"
            name="budget"
            value={crFormData.budget}
            onChange={handleChange}
            required
          />

          <label>Preferred Location</label>
          <select
            name="location"
            value={crFormData.location}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            {crMetadata.locations?.map((loc, i) => (
              <option key={i}>{loc}</option>
            ))}
          </select>

          <label>Course</label>
          <select
            name="course"
            value={crFormData.course}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            {crMetadata.courses?.map((c, i) => (
              <option key={i}>{c}</option>
            ))}
          </select>

          <label>Branch (Optional)</label>
          <select
            name="branch"
            value={crFormData.branch}
            onChange={handleChange}
          >
            <option value="">Select</option>
            {crMetadata.branches?.map((b, i) => (
              <option key={i}>{b}</option>
            ))}
          </select>

          <label>Category</label>
          <select
            name="category"
            value={crFormData.category}
            onChange={handleChange}
          >
            <option value="general">General</option>
            <option value="obc">OBC</option>
            <option value="sc">SC</option>
            <option value="st">ST</option>
          </select>

          <button type="submit">
            {crLoading ? "Loading..." : "Get Recommendations"}
          </button>
        </form>
      </div>

      {/* RIGHT PANEL */}
      <div className="cr-results-panel">
        <div className="cr-results-header">
          <h2>
            <FaGraduationCap size={35} />
            College Recommender
          </h2>
          <span>{crResults.length} found</span>
        </div>

        {crSummary && <div className="cr-summary-box">💡 {crSummary}</div>}

        {crResults.length > 0 && (
          <div className="cr-stats-row">
            <div className="cr-stat-card">
              <h3>{crResults.length}</h3>
              <p>Matches</p>
            </div>

            <div className="cr-stat-card">
              <h3>{crResults.length * 3}</h3> {/* temporary logic */}
              <p>Filtered</p>
            </div>

            <div className="cr-stat-card">
              <h3>5.44s</h3> {/* replace later with API time */}
              <p>Time</p>
            </div>
          </div>
        )}

        <div className="cr-scroll-list">
          {crLoading ? (
            renderSkeleton()
          ) : !crSearched ? (
            <>
              <div className="cr-empty-note">
                <h4>✨ Get Smart College Recommendations</h4>
                <p>Fill form and click Get Recommendations.</p>
              </div>

              <div className="cr-empty-wireframes">
                <div className="cr-wire-card"></div>
                <div className="cr-wire-card"></div>
                <div className="cr-wire-card"></div>
              </div>
            </>
          ) : crError ? (
            <div className="cr-empty-note">
              <h4>⚠️ Server Error</h4>
              <p>Please try again after some time.</p>
            </div>
          ) : crResults.length > 0 ? (
            crResults.map((college, i) => (
              <div className="cr-new-card" key={i}>
                <div className="cr-card-top">
                  <h3>
                    {i + 1}. {college.name}
                  </h3>

                  <button
                    className={`cr-heart-btn ${
                      crSavedIds.includes(college.name) ? "active" : ""
                    }`}
                    onClick={() => handleToggleSave(college)}
                  >
                    <FaHeart />
                  </button>
                </div>

                <p className="cr-meta">
                  📍 {college.city}, {college.state} • 💰{" "}
                  {college.fees_per_year} • 📊 {college.placement_avg_lpa} LPA •
                  ⭐ {college.naac_grade}
                </p>

                <div className="cr-tags">
                  {college.branches_available?.slice(0, 4).map((b, idx) => (
                    <span key={idx}>{b}</span>
                  ))}
                </div>

                <div className="cr-reason-box">{college.reason}</div>
                <div className="cr-card-bottom">
                  <div className="cr-exams">
                    📄 {college.entrance_exam?.join(", ")}
                  </div>

                  {college.website && (
                    <a
                      href={
                        college.website.startsWith("http")
                          ? college.website
                          : `https://${college.website}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cr-visit-link"
                    >
                     🌐 Visit Website →
                    </a>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="cr-empty-note">
              <h4>😕 No Results Found</h4>
              <p>Try adjusting your inputs.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
