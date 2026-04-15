import { useEffect, useState } from "react";
import {
  getSavedCollegesApi,
  unsaveCollegeApi,
} from "../../services/collegeService";
import "../../styles/dashboard/savedColleges.css";
import { FaArrowLeft, FaTrash, FaUniversity} from "react-icons/fa";
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
    // 🔥 OPTIMISTIC UPDATE
    setScColleges((prev) =>
      prev.filter((c) => c.collegeId !== collegeId)
    );

    // 🔥 REAL-TIME DASHBOARD UPDATE
    window.dispatchEvent(new Event("savedCollegesUpdated"));

    try {
      await unsaveCollegeApi(collegeId);
    } catch (err) {
      console.log(err);
    }
  };

  /* ================= LOADING ================= */
  if (scLoading) {
    return (
      <div style={{ padding: "20px" }}>
        <p>Loading saved colleges...</p>
      </div>
    );
  }

  return (
    <div className="sc-wrapper">
      {/* HEADER */}
      <div className="sc-header">
        <Link to="/dashboard" className="sc-back-link">
        <span className="sc-back-btn"><FaArrowLeft/>Back</span>
        </Link>
        <h2 > <FaUniversity/> Saved Colleges</h2>
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

              <button
                className="sc-remove-btn"
                onClick={() => handleRemove(college.collegeId)}
              >
               <FaTrash/> Remove
              </button>
            </div>

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
            <div className="sc-reason">
              {college.reason}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}