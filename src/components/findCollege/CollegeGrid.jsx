// src/components/findCollege/CollegeGrid.jsx

import React from "react";
import CollegeCard from "./CollegeCard";
import "../../styles/findcollege/collegeGrid.css";

const CollegeGrid = ({
  colleges = [],
  totalCount = 0,
  compareItems = [],
  setCompareItems,
  currentPage = 1,
  totalPages = 1,
  setCurrentPage,
}) => {
  /* =========================
     COMPARE TOGGLE
  ========================= */

  const toggleCompare = (college) => {
    const exists = compareItems.some(
      (item) => item.id === college.id
    );

    if (exists) {
      setCompareItems((prev) =>
        prev.filter(
          (item) =>
            item.id !== college.id
        )
      );
      return;
    }

    /* max 3 compare */
    if (compareItems.length >= 3)
      return;

    setCompareItems((prev) => [
      ...prev,
      college,
    ]);
  };

  /* =========================
     SCROLL TO RESULT SECTION
  ========================= */

  const scrollToResults = () => {
    const section =
      document.getElementById(
        "college-results"
      );

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  /* =========================
     PAGINATION
  ========================= */

  const goPrev = () => {
    if (currentPage > 1) {
      setCurrentPage(
        currentPage - 1
      );

      setTimeout(() => {
        scrollToResults();
      }, 100);
    }
  };

  const goNext = () => {
    if (
      currentPage < totalPages
    ) {
      setCurrentPage(
        currentPage + 1
      );

      setTimeout(() => {
        scrollToResults();
      }, 100);
    }
  };

  return (
    <section
      className="fcg-wrap"
      id="college-results"
    >
      {/* TOPBAR */}
      <div className="fcg-topbar">
        <h3 className="fcg-title">
          Colleges Found (
          {totalCount})
        </h3>

        <p className="fcg-subtitle">
          Explore colleges based
          on your selected
          filters and
          preferences
        </p>
      </div>

      {/* GRID */}
      <div className="fcg-grid">
        {colleges.map(
          (college) => (
            <CollegeCard
              key={college.id}
              college={college}
              compareItems={
                compareItems
              }
              toggleCompare={
                toggleCompare
              }
            />
          )
        )}
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="fcg-pagination">
          <button
            className="fcg-page-btn"
            onClick={goPrev}
            disabled={
              currentPage === 1
            }
          >
            Prev
          </button>

          <span className="fcg-page-count">
            {currentPage} /{" "}
            {totalPages}
          </span>

          <button
            className="fcg-page-btn"
            onClick={goNext}
            disabled={
              currentPage ===
              totalPages
            }
          >
            Next
          </button>
        </div>
      )}
    </section>
  );
};

export default CollegeGrid;