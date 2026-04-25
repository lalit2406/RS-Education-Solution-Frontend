// src/components/findCollege/CompareResultSec.jsx

import React from "react";
import {
  FaUniversity,
  FaMapMarkerAlt,
  FaBed,
  FaStar,
} from "react-icons/fa";

import { MdCurrencyRupee } from "react-icons/md";
import { GiGraduateCap } from "react-icons/gi";

import "../../styles/findcollege/compareResultSec.css";
import formatCurrency from "../../utils/formatCurrency";

const CompareResultSec = ({
  compareItems = [],
}) => {
  if (compareItems.length < 2) return null;

  return (
    <section className="crs-wrap">
      {/* TOP */}
      <div className="crs-top">
        <div>
          <p className="crs-tag">
            Side by Side Comparison
          </p>

          <h2 className="crs-title">
            Compare Selected Colleges
          </h2>
        </div>
      </div>

      {/* GRID */}
      <div
        className={`crs-grid cols-${compareItems.length}`}
      >
        {compareItems.map((college) => (
          <div
            key={college.id}
            className="crs-card"
          >
            {/* HEAD */}
            <div className="crs-head">
              <span className="crs-type">
                {college.type}
              </span>

              <h3 className="crs-name">
                {college.name}
              </h3>

              <p className="crs-location">
                <FaMapMarkerAlt />
                {college.city}, {college.state}
              </p>
            </div>

            {/* STATS */}
            <div className="crs-stats">
              <div className="crs-row">
                <MdCurrencyRupee />
                <span>Fees / Year</span>
                <strong>
                  {formatCurrency(
                    college.fees_per_year
                  )}
                </strong>
              </div>

              <div className="crs-row">
                <GiGraduateCap />
                <span>Avg Placement</span>
                <strong>
                  {college.placement_avg_lpa} LPA
                </strong>
              </div>

              <div className="crs-row">
                <FaUniversity />
                <span>NAAC Grade</span>
                <strong>
                  {college.naac_grade}
                </strong>
              </div>

              <div className="crs-row">
                <FaBed />
                <span>Hostel</span>
                <strong>
                  {college.hostel
                    ? "Available"
                    : "No"}
                </strong>
              </div>

              <div className="crs-row">
                <FaStar />
                <span>Branches</span>
                <strong>
                  {college.branches?.length || 0}
                </strong>
              </div>
            </div>

            {/* BRANCHES */}
            <div className="crs-course-wrap">
              {college.branches
                ?.slice(0, 6)
                .map((item, index) => (
                  <span
                    key={index}
                    className="crs-chip"
                  >
                    {item}
                  </span>
                ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CompareResultSec;