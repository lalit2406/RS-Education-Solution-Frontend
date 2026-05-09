import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_BASE_URL;

// ✅ CREATE LEAD
export const createLeadService = async (leadData) => {

  const response = await axios.post(
    `${API_URL}/api/leads/create`,
    leadData
  );

  return response.data;
};