/* =========================================================
   🔥 BASE URLs (from your .env)
========================================================= */

// Main backend (auth, dashboard, saved colleges)
const MAIN_API = import.meta.env.VITE_API_BASE_URL + "/api";

// Recommender backend (AI college API)
const RECOMMENDER_API =
  import.meta.env.VITE_API_BASE_LOCATION_URL + "/api";

/* =========================================================
   🔹 TOKEN + HEADERS
========================================================= */
const getToken = () => localStorage.getItem("token");

const authHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${getToken()}`,
});

/* =========================================================
   🔹 FETCH METADATA (Dropdowns)
   👉 From recommender backend
========================================================= */
export const fetchMetadata = async () => {
  const res = await fetch(`${RECOMMENDER_API}/metadata`);

  if (!res.ok) {
    throw new Error("Failed to fetch metadata");
  }

  return res.json();
};

/* =========================================================
   🔹 FETCH RECOMMENDATIONS
   👉 From recommender backend
========================================================= */
export const fetchRecommendations = async (payload) => {
  const res = await fetch(`${RECOMMENDER_API}/recommend-college`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch recommendations");
  }

  return res.json();
};

/* =========================================================
   🔹 SAVE COLLEGE
   👉 From your main backend
========================================================= */
export const saveCollegeApi = async (college) => {
  const res = await fetch(`${MAIN_API}/save-college`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({
      name: college.name,
      city: college.city,
      state: college.state,
      type: college.type,
      fees_per_year: college.fees_per_year,
      placement_avg_lpa: college.placement_avg_lpa,
      naac_grade: college.naac_grade,
      reason: college.reason,
      collegeId: college.name, // unique id
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to save college");
  }

  return res.json();
};

/* =========================================================
   🔹 UNSAVE COLLEGE
========================================================= */
export const unsaveCollegeApi = async (collegeId) => {
  const res = await fetch(
    `${MAIN_API}/unsave-college/${collegeId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to remove college");
  }

  return res.json();
};

/* =========================================================
   🔹 GET SAVED COLLEGES
========================================================= */
export const getSavedCollegesApi = async () => {
  const res = await fetch(`${MAIN_API}/saved-colleges`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch saved colleges");
  }

  return res.json();
};