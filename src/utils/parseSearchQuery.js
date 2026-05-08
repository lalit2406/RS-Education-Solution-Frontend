const parseSearchQuery = (
  query = ""
) => {
  const lower =
    query.toLowerCase();

  const parsed = {
    course: "",
    city: "",
    type: "",
  };

  /* =========================
     COURSE DETECTION
  ========================= */

  if (
    lower.includes("btech") ||
    lower.includes("b.tech")
  ) {
    parsed.course = "";
  }

  else if (
    lower.includes("mba")
  ) {
    parsed.course = "MBA";
  }

  else if (
    lower.includes("bca")
  ) {
    parsed.course = "BCA";
  }

  else if (
    lower.includes("mca")
  ) {
    parsed.course = "MCA";
  }

  /* =========================
     CITY DETECTION
  ========================= */

  if (
    lower.includes("faridabad")
  ) {
    parsed.city = "Faridabad";
  }

  else if (
    lower.includes("delhi")
  ) {
    parsed.city = "New Delhi";
  }

  else if (
    lower.includes("gurugram") ||
    lower.includes("gurgaon")
  ) {
    parsed.city = "Gurugram";
  }

  else if (
    lower.includes("noida")
  ) {
    parsed.city = "Noida";
  }

  /* =========================
     TYPE DETECTION
  ========================= */

  if (
    lower.includes("government")
  ) {
    parsed.type = "Government";
  }

  else if (
    lower.includes("private")
  ) {
    parsed.type = "Private";
  }

  return parsed;
};

export default parseSearchQuery;