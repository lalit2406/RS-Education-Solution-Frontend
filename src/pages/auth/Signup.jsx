import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/auth/signup.css";
import { GoogleLogin } from "@react-oauth/google";
import { googleAuthUser, signupUser } from "../../services/authService";
import toast from "react-hot-toast";
import { useUser } from "../../context/UserContext";


import {
  FaEye,
  FaEyeSlash,
  FaUser,
  FaPhoneAlt,
  FaEnvelope,
  FaLock,
} from "react-icons/fa";

export default function Signup() {
  const navigate = useNavigate();

  const { loginUserContext } = useUser();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // 🔹 REFS
  const nameRef = useRef();
  const phoneRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  // 🔹 FORM
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  // 🔹 VALIDATION
  const validateField = (name, value) => {
    let error = "";

    if (name === "name") {
      if (!value) error = "Name is required";
    }

    if (name === "phone") {
      if (!value) error = "Phone is required";
      else if (!/^[0-9]{10}$/.test(value))
        error = "Enter valid 10-digit phone";
    }

    if (name === "email") {
      if (!value) error = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(value))
        error = "Enter valid email";
    }

    if (name === "password") {
      if (!value) error = "Password is required";
      else if (value.length < 8)
        error = "Minimum 8 characters required";
      else if (
        !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/.test(value)
      )
        error = "Must include A, a, 1 and @";
    }

    if (name === "confirmPassword") {
      if (!value) error = "Confirm your password";
      else if (value !== formData.password)
        error = "Passwords do not match";
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
    return error;
  };

  // 🔹 CHANGE
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  // 🔹 BLUR
  const handleBlur = (e) => {
    validateField(e.target.name, e.target.value);
  };

  // 🔹 ENTER FLOW
  const handleKeyDown = (e, field) => {
    if (e.key === "Enter") {
      e.preventDefault();

      if (field === "name") phoneRef.current.focus();
      else if (field === "phone") emailRef.current.focus();
      else if (field === "email") passwordRef.current.focus();
      else if (field === "password") confirmPasswordRef.current.focus();
      else handleSubmit(e);
    }
  };

  // 🔹 SUBMIT
  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    let hasError = false;

    Object.keys(formData).forEach((field) => {
      const err = validateField(field, formData[field]);
      if (err) hasError = true;
    });

    if (hasError) {
  const values = Object.values(formData);

  if (values.every((val) => !val)) {
    toast.error("All fields are required");
  } else {
    toast.error("Please fix the highlighted fields");
  }

  return;
}

    setLoading(true);

    try {
      await signupUser(formData);

      navigate("/verify-otp", {
        state: {
          email: formData.email,
          type: "signup",
        },
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rs-signup-container">
      <div className="rs-signup-card">

        {/* LEFT */}
        <div className="rs-signup-left">
          <img src="/images/home/signup_bg.png" alt="bg" loading="eager" />
          <div className="rs-signup-overlay">
            <p className="rs-signup-tagline">
              WELCOME TO THE EDUCATION WORLD
            </p>
            <h2 className="rs-signup-title">
              R. S Education Solution.
            </h2>

            <div className="rs-signup-badges">
              <div className="rs-signup-badge">10k+ Active Scholars</div>
              <div className="rs-signup-badge">ISO Certified Learning</div>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="rs-signup-right">
          <h2 className="rs-signup-heading">Create Account</h2>
          <p className="rs-signup-subtitle">
            Join our community of lifelong learners.
          </p>

          <form className="rs-signup-form" onSubmit={handleSubmit}>

            {/* NAME */}
            <div className="rs-signup-group">
              <label className="rs-signup-label">Full Name</label>
              <div className={`rs-signup-input ${errors.name ? "rs-signup-input-error" : ""}`}>
                <FaUser />
                <input
                  ref={nameRef}
                  name="name"
                  placeholder="Enter your name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onKeyDown={(e) => handleKeyDown(e, "name")}
                />
              </div>
              {errors.name && <span className="rs-signup-error-text">{errors.name}</span>}
            </div>

            {/* PHONE + EMAIL */}
            <div className="rs-signup-row">

              <div className="rs-signup-col">
                <label className="rs-signup-label">Phone Number</label>
                <div className={`rs-signup-input ${errors.phone ? "rs-signup-input-error" : ""}`}>
                  <FaPhoneAlt />
                  <input
                    ref={phoneRef}
                    name="phone"
                    placeholder="+91..."
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onKeyDown={(e) => handleKeyDown(e, "phone")}
                  />
                </div>
                {errors.phone && <span className="rs-signup-error-text">{errors.phone}</span>}
              </div>

              <div className="rs-signup-col">
                <label className="rs-signup-label">Email Address</label>
                <div className={`rs-signup-input ${errors.email ? "rs-signup-input-error" : ""}`}>
                  <FaEnvelope />
                  <input
                    ref={emailRef}
                    name="email"
                    placeholder="name@gmail.com"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onKeyDown={(e) => handleKeyDown(e, "email")}
                  />
                </div>
                {errors.email && <span className="rs-signup-error-text">{errors.email}</span>}
              </div>

            </div>

            {/* PASSWORD */}
            <div className="rs-signup-group">
              <label className="rs-signup-label">Password</label>
              <div className={`rs-signup-input ${errors.password ? "rs-signup-input-error" : ""}`}>
                <FaLock />
                <input
                  ref={passwordRef}
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onKeyDown={(e) => handleKeyDown(e, "password")}
                />
                <button
                  type="button"
                  className="rs-signup-eye-btn"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && <span className="rs-signup-error-text">{errors.password}</span>}
            </div>

            {/* CONFIRM PASSWORD */}
            <div className="rs-signup-group">
              <label className="rs-signup-label">Confirm Password</label>
              <div className={`rs-signup-input ${errors.confirmPassword ? "rs-signup-input-error" : ""}`}>
                <FaLock />
                <input
                  ref={confirmPasswordRef}
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="••••••••"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onKeyDown={(e) => handleKeyDown(e, "confirmPassword")}
                />
                <button
                  type="button"
                  className="rs-signup-eye-btn"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                >
                </button>
              </div>
              {errors.confirmPassword && (
                <span className="rs-signup-error-text">
                  {errors.confirmPassword}
                </span>
              )}
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="rs-signup-btn-primary"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Sign Up →"}
            </button>

            {/* DIVIDER */}
            <div className="rs-signup-divider">
              OR CONTINUE WITH
            </div>

            {/* GOOGLE */}
            <div className="rs-signup-google-wrapper">
              <GoogleLogin
                onSuccess={async (res) => {
                  try {
                    const data = await googleAuthUser({
                      token: res.credential,
                    });

                    if (data.data.isNewUser) {
                      navigate("/verify-otp", {
                        state: {
                          email: data.data.email,
                          type: "signup",
                        },
                      });
                    } else {
                      localStorage.setItem("token", res.data.token);

                      await loginUserContext();

                      navigate("/");
                    }
                  } catch {
                    toast.error("Email Already Exists! Try Logging In.");
                    navigate("/login");
                  }
                }}
                onError={() => toast.error("Google Sign In Failed")}
              />
            </div>

            {/* FOOTER */}
            <p className="rs-signup-footer-text">
              Already have an account? <Link to="/login">Log In</Link>
            </p>

          </form>
        </div>
      </div>
    </div>
  );
}