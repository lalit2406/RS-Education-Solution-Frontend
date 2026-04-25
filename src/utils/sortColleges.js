// src/utils/sortColleges.js

const naacScore = {
  "A++": 6,
  "A+": 5,
  A: 4,
  "B++": 3,
  "B+": 2,
  B: 1,
};

const sortColleges = (colleges = [], sortBy = "") => {
  const data = [...colleges];

  switch (sortBy) {
    case "placementHigh":
      return data.sort(
        (a, b) =>
          b.placement_avg_lpa - a.placement_avg_lpa
      );

    case "feesLow":
      return data.sort(
        (a, b) => a.fees_per_year - b.fees_per_year
      );

    case "feesHigh":
      return data.sort(
        (a, b) => b.fees_per_year - a.fees_per_year
      );

    case "nameAZ":
      return data.sort((a, b) =>
        a.name.localeCompare(b.name)
      );

    case "nameZA":
      return data.sort((a, b) =>
        b.name.localeCompare(a.name)
      );

    case "naacHigh":
      return data.sort(
        (a, b) =>
          (naacScore[b.naac_grade] || 0) -
          (naacScore[a.naac_grade] || 0)
      );

    default:
      return data;
  }
};

export default sortColleges;