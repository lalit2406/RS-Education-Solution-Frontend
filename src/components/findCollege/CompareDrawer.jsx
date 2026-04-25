// src/components/findCollege/CompareDrawer.jsx

import React from "react";
import {
  FaBalanceScale,
  FaTimes,
  FaArrowRight,
} from "react-icons/fa";

import "../../styles/findcollege/compareDrawer.css";

const CompareDrawer = ({
  compareItems = [],
  removeCompareItem,
  clearCompare,
  setShowCompareResult,
}) => {
  if (compareItems.length === 0) return null;

  const canCompare = compareItems.length >= 2;

  const handleCompare = () => {
    if (!canCompare) return;

    if (setShowCompareResult) {
      setShowCompareResult(true);

      setTimeout(() => {
        const section =
          document.querySelector(".crs-wrap");

        if (section) {
          section.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 120);
    }
  };

  return (
    <section className="fcd-wrap">
      <div className="fcd-inner">

        {/* LEFT INFO */}
        <div className="fcd-left">
          <div className="fcd-icon">
            <FaBalanceScale />
          </div>

          <div className="fcd-content">
            <h4 className="fcd-title">
              Compare Colleges
            </h4>

            <p className="fcd-subtitle">
              {compareItems.length} selected
              {compareItems.length < 2 &&
                " • Select at least 2"}
            </p>
          </div>
        </div>

        {/* CHIPS */}
        <div className="fcd-chip-wrap">
          {compareItems.map((item) => (
            <div
              key={item.id}
              className="fcd-chip"
            >
              <span className="fcd-chip-text">
                {item.name}
              </span>

              <button
                className="fcd-chip-remove"
                onClick={() =>
                  removeCompareItem(item.id)
                }
                aria-label="Remove item"
              >
                <FaTimes />
              </button>
            </div>
          ))}
        </div>

        {/* ACTIONS */}
        <div className="fcd-actions">
          <button
            className="fcd-clear-btn"
            onClick={clearCompare}
          >
            Clear
          </button>

          <button
            className={`fcd-compare-btn ${
              !canCompare ? "disabled" : ""
            }`}
            onClick={handleCompare}
            disabled={!canCompare}
          >
            Compare Now
            <FaArrowRight />
          </button>
        </div>

      </div>
    </section>
  );
};

export default CompareDrawer;