// src/components/findCollege/CollegeFilters.jsx

import React, { useMemo } from "react";
import { FiSearch, FiRotateCcw } from "react-icons/fi";
import { FaFilter } from "react-icons/fa";

import collegeData from "../../data/colleges.json";
import "../../styles/findCollege/collegeFilters.css";

const CollegeFilters = ({
  filters,
  setFilters,
  sortBy,
  setSortBy,
  resetFilters,
}) => {
  const colleges = useMemo(() => {
  return collegeData.colleges || [];
}, []);

/* =========================
     ALLOWED STATES
  ========================= */

  const allowedStates = [
    "Bihar",
    "Delhi",
    "Haryana",
    "Himachal Pradesh",
    "Karnataka",
    "Madhya Pradesh",
    "Maharashtra",
    "Punjab",
    "Rajasthan",
    "Tamil Nadu",
    "Uttar Pradesh",
    "Uttarakhand",
  ];

  /* =========================
     STATE OPTIONS
  ========================= */

  const states = allowedStates;
 
  /* =========================
     CITY OPTIONS (STATE BASED)
  ========================= */

  const cities = useMemo(() => {
    const filteredCities = colleges
      .filter((item) => {
        if (!filters.state) return true;

        return (
          item.state?.toLowerCase() ===
          filters.state.toLowerCase()
        );
      })
      .map((item) => item.city);

    return [...new Set(filteredCities)]
      .filter(Boolean)
      .sort((a, b) =>
        a.localeCompare(b)
      );
  }, [colleges, filters.state]);

  /* =========================
     OTHER OPTIONS
  ========================= */

  const types = useMemo(() => {
    return [...new Set(colleges.map((i) => i.type))]
      .filter(Boolean)
      .sort();
  }, [colleges]);

  const branches = useMemo(() => {
    return [
      ...new Set(
        colleges.flatMap(
          (i) => i.branches || []
        )
      ),
    ]
      .filter(Boolean)
      .sort();
  }, [colleges]);

  /* =========================
   COURSE OPTIONS
========================= */

const courses = [
  "B.Tech",
  "M.Tech",
  "MBA",
  "BBA",
  "BCA",
  "MCA",
  "B.Com",
  "M.Com",
  "B.Sc",
  "M.Sc",
];

  const placementOptions = [
    "2",
    "4",
    "6",
    "8",
    "10",
    "12",
    "15",
    "20",
  ];

  const feeOptions = [
    "50000",
    "100000",
    "150000",
    "200000",
    "300000",
    "500000",
    "800000",
    "1000000",
  ];

  /* =========================
     UPDATE FILTER
  ========================= */

  const updateFilter = (key, value) => {
    setFilters((prev) => {
      const updated = {
        ...prev,
        [key]: value,
      };

      /* Reset city if state changed */
      if (key === "state") {
        updated.city = "";
      }

      return updated;
    });
  };

  return (
    <section className="cfl-wrap">
      <div className="cfl-card">

        {/* TOP */}
        <div className="cfl-top">
          <div className="cfl-title-wrap">
            <span className="cfl-icon">
              <FaFilter />
            </span>

            <div>
              <h3 className="cfl-title">
                Filter Colleges
              </h3>

              <p className="cfl-sub">
                Find best colleges faster
              </p>
            </div>
          </div>

          <button
            className="cfl-reset-btn"
            onClick={resetFilters}
          >
            <FiRotateCcw />
            Reset
          </button>
        </div>

        {/* GRID */}
        <div className="cfl-grid">

          {/* Search */}
          <div className="cfl-search-box">
            <FiSearch />

            <input
              type="text"
              placeholder="Search..."
              value={filters.search}
              onChange={(e) =>
                updateFilter(
                  "search",
                  e.target.value
                )
              }
            />
          </div>

          {/* City */}
          <select
            value={filters.city}
            onChange={(e) =>
              updateFilter("city", e.target.value)
            }
          >
            <option value="">City</option>
            {cities.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          {/* State */}
          <select
            value={filters.state}
            onChange={(e) =>
              updateFilter("state", e.target.value)
            }
          >
            <option value="">State</option>
            {states.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          {/* Type */}
          <select
            value={filters.type}
            onChange={(e) =>
              updateFilter("type", e.target.value)
            }
          >
            <option value="">
              Type
            </option>
            {types.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          {/* Course Smart Dropdown */}
          <select
            value={filters.course}
            onChange={(e) =>
              updateFilter(
                "course",
                e.target.value
              )
            }
          >
            <option value="">
              Course
            </option>

            {courses.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          {/* Branch */}
          <select
            value={filters.branch}
            onChange={(e) =>
              updateFilter(
                "branch",
                e.target.value
              )
            }
          >
            <option value="">
              Branch
            </option>

            {branches.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          {/* Hostel */}
          <select
            value={filters.hostel}
            onChange={(e) =>
              updateFilter(
                "hostel",
                e.target.value
              )
            }
          >
            <option value="">
              Hostel
            </option>

            <option value="yes">
              Available
            </option>

            <option value="no">
              Not Available
            </option>
          </select>

          {/* Max Fees */}
          <select
            value={filters.maxFees}
            onChange={(e) =>
              updateFilter(
                "maxFees",
                e.target.value
              )
            }
          >
            <option value="">
              Max Fees
            </option>

            {feeOptions.map((item) => (
              <option key={item} value={item}>
                ₹{Number(item).toLocaleString()}
              </option>
            ))}
          </select>

          {/* Placement */}
          <select
            value={filters.minPlacement}
            onChange={(e) =>
              updateFilter(
                "minPlacement",
                e.target.value
              )
            }
          >
            <option value="">
              Placement
            </option>

            {placementOptions.map((item) => (
              <option key={item} value={item}>
                {item}+ LPA
              </option>
            ))}
          </select>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) =>
              setSortBy(e.target.value)
            }
          >
            <option value="">
              Sort
            </option>

            <option value="feesLow">
              Fees Low-High
            </option>

            <option value="feesHigh">
              Fees High-Low
            </option>

            <option value="placementHigh">
              Placement High
            </option>

            <option value="nameAZ">
              Name A-Z
            </option>
          </select>

        </div>
      </div>
    </section>
  );
};

export default CollegeFilters;