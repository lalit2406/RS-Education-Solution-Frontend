import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/auth`,
});

console.log(import.meta.env.VITE_API_URL);

// 🔥 AUTO ATTACH TOKEN
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    // ❗ TOKEN INVALID / EXPIRED
    if (error.response?.status === 401) {
      localStorage.removeItem("token");

      // optional: redirect
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);


// ===============================
// 🔹 AUTH APIs
// ===============================

// ✅ SIGNUP + OTP
export const signupUser = (data) => API.post("/signup", data);
export const verifyOtp = (data) => API.post("/verify-otp", data);
export const resendOtp = (data) => API.post("/resend-otp", data);

// ✅ LOGIN
export const loginUser = (data) => API.post("/login", data);

// ✅ FORGOT PASSWORD (OTP FLOW)
export const forgotPasswordUser = (data) =>
  API.post("/forgot-password", data);

export const verifyForgotOtp = (data) =>
  API.post("/verify-forgot-otp", data);

export const resetPasswordUser = (data) =>
  API.post("/reset-password", data);

export const setPasswordUser = (data) =>
  API.post("/set-password", data);

// ✅ GOOGLE AUTH
export const googleAuthUser = (data) => API.post("/google-auth", data);

// ✅ USER
export const getMeUser = () => API.get("/me");

// ✅ UPDATE PROFILE
export const updateProfileUser = (data) =>
  API.put("/update-profile", data);