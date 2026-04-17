import { useEffect, useState } from "react";
import {
  getSavedCollegesApi,
  unsaveCollegeApi,
} from "../../services/collegeService";
import "../../styles/dashboard/savedColleges.css";
import { FaArrowLeft, FaTrash, FaUniversity } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function SavedColleges() {
  const [scColleges, setScColleges] = useState([]);
  const [scLoading, setScLoading] = useState(true);

  /* ================= FETCH ================= */
  const fetchSavedColleges = async () => {
    try {
      const data = await getSavedCollegesApi();
      setScColleges(data);
    } catch (err) {
      console.log(err);
    } finally {
      setScLoading(false);
    }
  };

  useEffect(() => {
    fetchSavedColleges();
  }, []);

  /* ================= REMOVE ================= */
  const handleRemove = async (collegeId) => {
    setScColleges((prev) => prev.filter((c) => c.collegeId !== collegeId));
   

    try {
      await unsaveCollegeApi(collegeId);

       window.dispatchEvent(new Event("savedCollegesUpdated"));

    } catch (err) {
      console.log(err);
    }
  };
  
  /* ================= LOADING ================= */
  if (scLoading) {
    return (
      <div className="sc-wrapper">
        <div className="sc-header">
          <span className="sc-back-btn">Loading...</span>
          <h2>Saved Colleges</h2>
          <span>...</span>
        </div>

        <div className="sc-grid">
          {[...Array(6)].map((_, index) => (
            <div className="sc-card sc-skeleton-card" key={index}>
              {/* TOP */}
              <div className="sc-card-top">
                <div>
                  <div className="sc-skeleton sc-skel-title"></div>
                  <div className="sc-skeleton sc-skel-sub"></div>
                </div>
                <div className="sc-skeleton sc-skel-btn"></div>
              </div>

              {/* STATS */}
              <div className="sc-stats">
                {[...Array(4)].map((_, i) => (
                  <div key={i}>
                    <div className="sc-skeleton sc-skel-stat"></div>
                  </div>
                ))}
              </div>

              {/* REASON */}
              <div className="sc-skeleton sc-skel-reason"></div>

              {/* BOTTOM */}
              <div className="sc-card-bottom">
                <div className="sc-skeleton sc-skel-exam"></div>
                <div className="sc-skeleton sc-skel-link"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="sc-wrapper">
      {/* HEADER */}
      <div className="sc-header">
        <Link to="/dashboard" className="sc-back-link">
          <span className="sc-back-btn">
            <FaArrowLeft />
            Back
          </span>
        </Link>

        <h2>
          <FaUniversity /> Saved Colleges
        </h2>

        <span>{scColleges.length} Saved</span>
      </div>

      {/* EMPTY */}
      {scColleges.length === 0 && (
        <div className="sc-empty">
          <p>No saved colleges yet</p>
        </div>
      )}

      {/* LIST */}
      <div className="sc-grid">
        {scColleges.map((college, index) => (
          <div className="sc-card" key={index}>
            {/* TOP */}
            <div className="sc-card-top">
              <div>
                <h3>{college.name}</h3>
                <p>
                  {college.city}, {college.state}
                </p>
              </div>

              <span
                className="sc-remove-btn"
                onClick={() => handleRemove(college.collegeId)}
              >
                <FaTrash size={13} />
                Remove
              </span>
            </div>

            {/* CONTENT WRAPPER */}
            <div className="sc-card-content">
              {/* STATS */}
              <div className="sc-stats">
                <div>
                  <span>Fees</span>
                  <p>{college.fees_per_year}</p>
                </div>

                <div>
                  <span>Placement</span>
                  <p>{college.placement_avg_lpa} LPA</p>
                </div>

                <div>
                  <span>NAAC</span>
                  <p>{college.naac_grade}</p>
                </div>

                <div>
                  <span>Type</span>
                  <p>{college.type}</p>
                </div>
              </div>

              {/* REASON */}
              <div className="sc-reason">{college.reason}</div>
            </div>

            {/* BOTTOM */}
            <div className="sc-card-bottom">
              <div className="sc-exams">
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
                  className="sc-visit-link"
                >
                  🌐 Visit Website →
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
