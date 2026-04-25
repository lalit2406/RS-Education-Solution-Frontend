// src/components/findCollege/EmptyState.jsx

import React from "react";
import { FaSearch, FaRedoAlt } from "react-icons/fa";
import "../../styles/findcollege/emptyState.css";

const EmptyState = ({ resetFilters }) => {
  return (
    <section className="fce-wrap">
      <div className="fce-card">
        <div className="fce-icon">
          <FaSearch />
        </div>

        <h3 className="fce-title">
          No Colleges Found
        </h3>

        <p className="fce-text">
          We couldn’t find colleges matching your
          current filters. Try changing your search
          criteria or reset all filters.
        </p>

        <button
          className="fce-btn"
          onClick={resetFilters}
        >
          <FaRedoAlt />
          <span>Reset Filters</span>
        </button>
      </div>
    </section>
  );
};

export default EmptyState;