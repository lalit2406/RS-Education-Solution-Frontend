// src/components/home/TopCollegesSection.jsx

import React, { useMemo, useState } from "react";
import "../../styles/home/topCollegesSection.css";
import collegesData from "../../data/indian_colleges.json";

import {
  FaStar,
  FaGraduationCap,
  FaMapMarkerAlt,
  FaRupeeSign,
  FaUniversity,
} from "react-icons/fa";

const TopCollegesSection = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = [
    "All",
    "Engineering",
    "Medical",
    "MBA",
    "Law",
    "Commerce",
    "Arts",
    "Science",
  ];

  const filteredColleges = useMemo(() => {
    const colleges = collegesData.colleges || [];

    const hasCourse = (courses = [], keywords = []) => {
      const text = courses.join(" ").toLowerCase();

      return keywords.some((item) =>
        text.includes(item.toLowerCase())
      );
    };

    const matchCategory = (courses = [], category) => {
      switch (category) {
        case "Engineering":
          return hasCourse(courses, ["btech", "mtech", "be"]);

        case "Medical":
          return hasCourse(courses, [
            "mbbs",
            "md",
            "ms",
            "bsc nursing",
          ]);

        case "MBA":
          return hasCourse(courses, [
            "mba",
            "pgp",
            "pgdm",
            "pgpm",
          ]);

        case "Law":
          return hasCourse(courses, [
            "llb",
            "llm",
            "ba llb",
          ]);

        case "Commerce":
          return hasCourse(courses, [
            "bcom",
            "economics",
          ]);

        case "Arts":
          return hasCourse(courses, ["ba", "ma"]);

        case "Science":
          return hasCourse(courses, [
            "bsc",
            "msc",
            "phd",
          ]);

        default:
          return true;
      }
    };

    let result = colleges;

    if (activeFilter !== "All") {
      result = colleges.filter((college) =>
        matchCategory(
          college.course,
          activeFilter
        )
      );
    }

    return [...result]
      .sort(
        (a, b) =>
          a.ranking.national_rank -
          b.ranking.national_rank
      )
      .slice(0, 10);
  }, [activeFilter]);

  const formatFee = (fee) =>
    `₹${fee.toLocaleString("en-IN")}`;

  return (
    <section className="top-colleges-section">
      <div className="top-colleges-header">
        <div>
          <span className="top-colleges-badge">
            <FaGraduationCap />
            Explore Best Institutes
          </span>

          <h2>Top 10 Colleges in India</h2>

          <p>
            Discover highly ranked colleges
            with fees, ratings, cutoffs and
            institution type.
          </p>
        </div>
      </div>

      <div className="top-colleges-filters">
        {filters.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() =>
              setActiveFilter(item)
            }
            className={`college-chip ${
              activeFilter === item
                ? "active"
                : ""
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="top-colleges-table-wrap">
        <table className="top-colleges-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>College</th>
              <th>Rating</th>
              <th>Cutoff</th>
              <th>Type</th>
              <th>Fees</th>
            </tr>
          </thead>

          <tbody>
            {filteredColleges.map(
              (college) => (
                <tr key={college.id}>
                  <td>
                    <span className="rank-pill">
                      #
                      {
                        college.ranking
                          .national_rank
                      }
                    </span>
                  </td>

                  <td>
                    <div className="college-info no-logo">
                      <div className="college-details">
                        <h4>
                          {
                            college.short_name
                          }
                        </h4>

                        <p>
                          {college.name}
                        </p>

                        <span>
                          <FaMapMarkerAlt />
                          {college.city},{" "}
                          {college.state}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td>
                    <span className="rating-box">
                      <FaStar />
                      {college.rating}
                    </span>
                  </td>

                  <td>
                    <div className="mini-box">
                      <strong>
                        {
                          college.cutoff
                            .exam
                        }
                      </strong>

                      <span>
                        {
                          college.cutoff
                            .score
                        }
                      </span>
                    </div>
                  </td>

                  <td>
                    <div className="mini-box">
                      <strong>
                        <FaUniversity />
                      </strong>

                      <span>
                        {college.type}
                      </span>
                    </div>
                  </td>

                  <td>
                    <div className="mini-box">
                      <strong>
                        <FaRupeeSign />
                      </strong>

                      <span>
                        {formatFee(
                          college.fees
                            .amount
                        )}
                      </span>
                    </div>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default TopCollegesSection;