// src/components/findCollege/CollegeCard.jsx

import React from "react";
import {
  FaMapMarkerAlt,
  FaUniversity,
  FaBed,
  FaBalanceScale,
  FaCheck,
} from "react-icons/fa";

import { MdCurrencyRupee } from "react-icons/md";
import { GiGraduateCap } from "react-icons/gi";

import "../../styles/findcollege/collegeCard.css";
import formatCurrency from "../../utils/formatCurrency";

const CollegeCard = ({
  college,
  compareItems = [],
  toggleCompare,
}) => {
  const isSelected = compareItems.some(
    (item) => item.id === college.id
  );

  return (
    <article className="fcc-card">
      {/* TOP */}
      <div className="fcc-top">
        <div className="fcc-head-row">
          <span className="fcc-badge">
            {college.type}
          </span>

          <button
            className={`fcc-compare-btn ${
              isSelected ? "active" : ""
            }`}
            onClick={() => toggleCompare(college)}
          >
            {isSelected ? (
              <>
                <FaCheck />
                Added
              </>
            ) : (
              <>
                <FaBalanceScale />
                Compare
              </>
            )}
          </button>
        </div>

        <h3 className="fcc-name">
          {college.name}
        </h3>

        <p className="fcc-location">
          <FaMapMarkerAlt />
          <span>
            {college.city}, {college.state}
          </span>
        </p>
      </div>

      {/* STATS */}
      <div className="fcc-stats">
        <div className="fcc-stat-box">
          <MdCurrencyRupee />
          <span>
            {formatCurrency(
              college.fees_per_year
            )}
          </span>
        </div>

        <div className="fcc-stat-box">
          <GiGraduateCap />
          <span>
            {college.placement_avg_lpa} LPA Avg
          </span>
        </div>

        <div className="fcc-stat-box">
          <FaUniversity />
          <span>
            NAAC {college.naac_grade}
          </span>
        </div>

        <div className="fcc-stat-box">
          <FaBed />
          <span>
            {college.hostel
              ? "Hostel Available"
              : "No Hostel"}
          </span>
        </div>
      </div>

      {/* COURSES */}
      <div className="fcc-course-wrap">
        {college.branches
          ?.slice(0, 5)
          .map((item, index) => (
            <span
              key={index}
              className="fcc-chip"
            >
              {item}
            </span>
          ))}
      </div>

      {/* DESC */}
      <p className="fcc-desc">
        {college.description}
      </p>
    </article>
  );
};

export default CollegeCard;