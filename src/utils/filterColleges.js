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
   ARRAY MATCH
========================= */

const includesInArray = (arr = [], value) => {
  if (!value) return true;

  return arr.some((item) => normalize(item).includes(normalize(value)));
};

/* =========================
   SMART COURSE MAP
========================= */

const courseMap = {
  btech: [
    "btech",
    "b tech",
    "b.tech",
    "b.tech",
    "b.tech.",
    "bachelor of technology",
    "engineering",
  ],

  "b.tech": [
    "btech",
    "b tech",
    "b.tech",
    "bachelor of technology",
    "engineering",
  ],

  cse: ["cse", "computer science", "computer science engineering", "cs"],

  "computer science": [
    "computer science",
    "cse",
    "cs",
    "computer science engineering",
  ],

  cs: ["computer science", "cse", "computer science engineering"],

  it: ["information technology", "it"],

  mechanical: ["mechanical", "me", "mechanical engineering"],

  civil: ["civil", "ce", "civil engineering"],

  electrical: ["electrical", "ee", "electrical engineering"],

  electronics: [
    "electronics",
    "ece",
    "electronics communication",
    "electronics engineering",
  ],

  mba: ["mba", "management", "business"],

  bba: ["bba", "business administration"],

  bca: ["bca", "computer application"],

  mca: ["mca", "computer application"],
};
/* =========================
   SMART COURSE FILTER
========================= */

const matchSmartCourse = (college = {}, selectedCourse = "") => {
  if (!selectedCourse) return true;

  const courseKey = normalize(selectedCourse);

  const possibleTerms = courseMap[courseKey] || [courseKey];

  const allFields = [...(college.courses || []), ...(college.branches || [])];

  return allFields.some((item) => {
    const cleanItem = normalize(item);

    return possibleTerms.some((term) => cleanItem.includes(normalize(term)));
  });
};

/* =========================
   MAIN FILTER
========================= */

const filterColleges = (colleges = [], filters = {}) => {
  return colleges.filter((college) => {
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

    const searchWords = normalize(search).split(" ").filter(Boolean);

    const searchableContent = [
      college.name,
      college.city,
      college.state,
      college.type,
      college.description,
      ...(college.courses || []),
      ...(college.branches || []),
    ].join(" ");

    const normalizedSearchableContent = normalize(searchableContent);

    const matchSearch =
      !search ||
      searchWords.some((word) => {
        /* all searchable aliases */
        const relatedTerms = [word, ...(courseMap[word] || [])];

        return relatedTerms.some((term) =>
          normalizedSearchableContent.includes(normalize(term)),
        );
      });

    const matchCity =
      !city || normalize(college.city).includes(normalize(city));

    const matchState =
      !state || normalize(college.state).includes(normalize(state));

    const matchType = !type || college.type === type;

    const matchCourse = matchSmartCourse(college, course);

    const matchBranch = includesInArray(college.branches, branch);

    const matchHostel =
      hostel === "" ? true : college.hostel === (hostel === "yes");

    const matchFees = !maxFees || college.fees_per_year <= Number(maxFees);

    const matchPlacement =
      !minPlacement || college.placement_avg_lpa >= Number(minPlacement);

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
  });
};

export default filterColleges;
