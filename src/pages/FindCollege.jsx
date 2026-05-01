// src/pages/FindCollege.jsx

import {
  useMemo,
  useState,
  useRef,
  useEffect,
} from "react";
import { useLocation } from "react-router-dom";

import collegeData from "../data/colleges.json";

import FindCollegeHeroSec from "../components/findCollege/FindCollegeHeroSec";
import CollegeFilters from "../components/findCollege/CollegeFilters";
import CollegeGrid from "../components/findCollege/CollegeGrid";
import EmptyState from "../components/findCollege/EmptyState";
import CompareDrawer from "../components/findCollege/CompareDrawer";
import CompareResultSec from "../components/findCollege/CompareResultSec";
import PhotoGallery from "../components/findCollege/PhotoGallery";

import filterColleges from "../utils/filterColleges";
import sortColleges from "../utils/sortColleges";


const FindCollege = () => {
  const location = useLocation();
  
  const resultsRef = useRef(null);

  const params = new URLSearchParams(
    location.search
  );

 const selectedStateRaw = params.get("state") || "";

const selectedState = selectedStateRaw
  .split("-")
  .map(
    (w) =>
      w.charAt(0).toUpperCase() +
      w.slice(1)
  )
  .join(" ");

  const selectedCity =
    params.get("city") || "";


  /* =========================
     FILTERS
  ========================= */

  const [filters, setFilters] =
    useState({
      city: selectedCity,
      state: selectedState,
      type: "",
      search: "",
      course: "",
      branch: "",
      hostel: "",
      maxFees: "",
      minPlacement: "",
    });

  const [sortBy, setSortBy] =
    useState("");

  /* =========================
     COMPARE
  ========================= */

  const [
    compareItems,
    setCompareItems,
  ] = useState([]);

  const [
    showCompareResult,
    setShowCompareResult,
  ] = useState(false);

  /* =========================
     PAGINATION
  ========================= */

  const [
    currentPage,
    setCurrentPage,
  ] = useState(1);

  useEffect(() => {
  if (location.state?.fromTopPlaces) {
    resultsRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    // prevent repeat scroll
    window.history.replaceState({}, document.title);
  } else {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
}, [location]);

  const cardsPerPage = 12;

  /* =========================
     DATA
  ========================= */

  const colleges = useMemo(() => {
    return (
      collegeData.colleges || []
    );
  }, []);

  /* FILTER */
  const filteredColleges =
    useMemo(() => {
      return filterColleges(
        colleges,
        filters
      );
    }, [colleges, filters]);

  /* SORT */
  const finalColleges =
    useMemo(() => {
      return sortColleges(
        filteredColleges,
        sortBy
      );
    }, [
      filteredColleges,
      sortBy,
    ]);

  /* =========================
     TOTAL PAGES
  ========================= */

  const totalPages =
    Math.max(
      1,
      Math.ceil(
        finalColleges.length /
          cardsPerPage
      )
    );

  /* SAFE PAGE VALUE */
  const safeCurrentPage =
    currentPage > totalPages
      ? 1
      : currentPage;

  /* PAGINATED DATA */
  const paginatedColleges =
    finalColleges.slice(
      (safeCurrentPage - 1) *
        cardsPerPage,
      safeCurrentPage *
        cardsPerPage
    );

  /* =========================
     ACTIONS
  ========================= */

  const resetFilters = () => {
    setFilters({
      city: "",
      state: "",
      type: "",
      search: "",
      course: "",
      branch: "",
      hostel: "",
      maxFees: "",
      minPlacement: "",
    });

    setSortBy("");
    setCurrentPage(1);
  };

  const removeCompareItem = (
    id
  ) => {
    setCompareItems((prev) =>
      prev.filter(
        (item) =>
          item.id !== id
      )
    );
  };

  const clearCompare = () => {
    setCompareItems([]);
    setShowCompareResult(
      false
    );
  };

  /* =========================
     UI
  ========================= */

  return (
    <main className="find-college-page">
      <FindCollegeHeroSec />

      <CollegeFilters
        filters={filters}
        setFilters={(value) => {
          setCurrentPage(1);
          setFilters(value);
        }}
        sortBy={sortBy}
        setSortBy={(value) => {
          setCurrentPage(1);
          setSortBy(value);
        }}
        resetFilters={
          resetFilters
        }
      />

      <CompareDrawer
        compareItems={
          compareItems
        }
        removeCompareItem={
          removeCompareItem
        }
        clearCompare={
          clearCompare
        }
        setShowCompareResult={
          setShowCompareResult
        }
      />

      {showCompareResult && (
        <CompareResultSec
          compareItems={
            compareItems
          }
        />
      )}

      {finalColleges.length >
      0 ? (
       <div ref={resultsRef}>
  <CollegeGrid
    colleges={paginatedColleges}
    totalCount={finalColleges.length}
    compareItems={compareItems}
    setCompareItems={setCompareItems}
    currentPage={safeCurrentPage}
    totalPages={totalPages}
    setCurrentPage={setCurrentPage}
  />
</div>
      ) : (
        <EmptyState
          resetFilters={
            resetFilters
          }
        />
      )}
      <PhotoGallery />
    </main>
  );
};

export default FindCollege;