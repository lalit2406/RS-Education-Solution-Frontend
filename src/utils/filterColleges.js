// src/utils/filterColleges.js
/* Final Updated Version */
/* Keeps all previous properties + Smart Course Matching */

const normalize = (value = "") => {
  return value
    .toString()
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, "")
    .trim();
};

/* =========================
   TEXT MATCH
========================= */

const includesText = (value, text) => {
  if (!text) return true;
  if (!value) return false;

  return normalize(value).includes(
    normalize(text)
  );
};

/* =========================
   ARRAY MATCH
========================= */

const includesInArray = (
  arr = [],
  value
) => {
  if (!value) return true;

  return arr.some((item) =>
    normalize(item).includes(
      normalize(value)
    )
  );
};

/* =========================
   SMART COURSE MAP
========================= */

const courseMap = {
  "computer science": [
    "computer science",
    "cse",
    "cs",
    "computer science engineering",
  ],

  "information technology": [
    "information technology",
    "it",
  ],

  mechanical: [
    "mechanical",
    "me",
    "mechanical engineering",
  ],

  civil: [
    "civil",
    "ce",
    "civil engineering",
  ],

  electrical: [
    "electrical",
    "ee",
    "electrical engineering",
  ],

  electronics: [
    "electronics",
    "ece",
    "electronics communication",
    "electronics engineering",
  ],

  mba: ["mba"],
  bba: ["bba"],
  bca: ["bca"],
  mca: ["mca"],
};

/* =========================
   SMART COURSE FILTER
========================= */

const matchSmartCourse = (
  college = {},
  selectedCourse = ""
) => {
  if (!selectedCourse) return true;

  const courseKey =
    normalize(selectedCourse);

  const possibleTerms =
    courseMap[courseKey] || [
      courseKey,
    ];

  const allFields = [
    ...(college.courses || []),
    ...(college.branches || []),
  ];

  return allFields.some((item) => {
    const cleanItem =
      normalize(item);

    return possibleTerms.some(
      (term) =>
        cleanItem.includes(
          normalize(term)
        )
    );
  });
};

/* =========================
   MAIN FILTER
========================= */

const filterColleges = (
  colleges = [],
  filters = {}
) => {
  return colleges.filter(
    (college) => {
      const {
        city = "",
        state = "",
        type = "",
        search = "",
        course = "",
        branch = "",
        hostel = "",
        maxFees = "",
        minPlacement = "",
      } = filters;

      const matchSearch =
        includesText(
          college.name,
          search
        ) ||
        includesText(
          college.city,
          search
        ) ||
        includesText(
          college.state,
          search
        );

      const matchCity =
        !city ||
        normalize(
          college.city
        ).includes(
          normalize(city)
        );

      const matchState =
  !state ||
  normalize(
    college.state
  ).includes(
    normalize(state)
  );

      const matchType =
        !type ||
        college.type === type;

      const matchCourse =
        matchSmartCourse(
          college,
          course
        );

      const matchBranch =
        includesInArray(
          college.branches,
          branch
        );

      const matchHostel =
        hostel === ""
          ? true
          : college.hostel ===
            (hostel === "yes");

      const matchFees =
        !maxFees ||
        college.fees_per_year <=
          Number(maxFees);

      const matchPlacement =
        !minPlacement ||
        college
          .placement_avg_lpa >=
          Number(
            minPlacement
          );

      return (
        matchSearch &&
        matchCity &&
        matchState &&
        matchType &&
        matchCourse &&
        matchBranch &&
        matchHostel &&
        matchFees &&
        matchPlacement
      );
    }
  );
};

export default filterColleges;