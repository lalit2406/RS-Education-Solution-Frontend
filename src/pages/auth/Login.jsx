import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/auth/login.css";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash, FaEnvelope, FaLock } from "react-icons/fa";
import { GoogleLogin } from "@react-oauth/google";
import { googleAuthUser, loginUser } from "../../services/authService";
import LoginBg from "/src/assets/images/rs_login_bg.png";
import { useUser } from "../../context/UserContext";

export default function Login() {
  const navigate = useNavigate();
  const { loginUserContext } = useUser();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const emailRef = useRef();
  const passwordRef = useRef();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  // ✅ VALIDATION
  const validateField = (name, value) => {
    let error = "";

    if (name === "email") {
      if (!value) error = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(value))
        error = "Enter valid email";
    }

    if (name === "password") {
  if (!value) {
    error = "Password is required";
  } else if (value.length < 8) {
    error = "Minimum 8 characters required";
  } else if (
    !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/.test(value)
  ) {
    error = "Must include A, a, 1 and @";
  }
}

    setErrors((prev) => ({ ...prev, [name]: error }));
    return error;
  };

  // ✅ HANDLE CHANGE
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  // ✅ BLUR
  const handleBlur = (e) => {
    validateField(e.target.name, e.target.value);
  };

  // ✅ ENTER FLOW
  const handleKeyDown = (e, field) => {
    if (e.key === "Enter") {
      e.preventDefault();

      if (field === "email") passwordRef.current.focus();
      else handleSubmit(e);
    }
  };

  // ✅ EMAIL LOGIN
  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    const emailError = validateField("email", formData.email);
    const passwordError = validateField("password", formData.password);

    if (emailError || passwordError) {
      if (!formData.email && !formData.password) {
        toast.error("All fields are required");
      }
      return;
    }

    setLoading(true);

    try {
      const res = await loginUser(formData);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      await loginUserContext(); // 🔥 IMPORTANT

      navigate("/");
    } catch (err) {
      const errorData = err.response?.data;

      if (errorData?.isVerified === false) {
        toast.error(errorData.message);

        navigate("/verify-otp", {
          state: {
            email: formData.email,
            type: "signup",
          },
        });
      } else {
        if (errorData?.message) {
          toast.error(errorData.message);

          // 🔥 AUTO REDIRECT TO SIGNUP
          if (errorData.message.toLowerCase().includes("account does not exist")) {
            setTimeout(() => {
              navigate("/signup");
            }, 1500);
          }

        } else {
          toast.error("Something went wrong. Try again.");
        }
      }
    } finally {
      setLoading(false);
    }
  };

  // ✅ GOOGLE LOGIN
  const handleGoogleLogin = async (credentialResponse) => {
    if (googleLoading) return;

    setGoogleLoading(true);

    try {
      const res = await googleAuthUser({
        token: credentialResponse.credential,
      });

      // 🆕 NEW USER → OTP
      if (res.data.isNewUser) {
        return navigate("/verify-otp", {
          state: { email: res.data.email, type: "signup" },
        });
      }

      // ✅ VERIFIED USER → LOGIN
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));

        await loginUserContext();

        return navigate("/");
      }

      // ❌ fallback
      toast.error("Something went wrong. Try again.");
    } catch (err) {
      const errorData = err.response?.data;

      // ❗ NOT VERIFIED
      if (errorData?.isVerified === false) {
        toast.error("Please verify your email first");

        navigate("/verify-otp", {
          state: { email: errorData.email, type: "signup" },
        });
      } else {
        if (errorData?.message) {
          toast.error(errorData.message);
        } else {
          toast.error("Google login failed");
        }
      }
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="rs-login-container">
      <div className="rs-login-card">

        {/* LEFT */}
        <div className="rs-login-left">
          <img src={LoginBg} alt="background" className="rs-login-bg" />

          <div className="rs-login-overlay">
            <h1 className="rs-login-brand">R. S Education</h1>

            <div className="rs-login-content">
              <h1 className="rs-login-heading">
                Begin your <br />
                journey <br />
                in a <span>tranquil</span> <br />
                learning space.
              </h1>
            </div>

            <div className="rs-login-badge">
              <div className="rs-login-badge-icon">✨</div>
              <div>
                <p>Trusted by 10k+ Learners</p>
                <span>GLOBAL EDUCATION EXCELLENCE</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="rs-login-right">
          <h2>Welcome Back</h2>
          <p className="rs-login-subtext">
            Enter your credentials to access your sanctuary of knowledge.
          </p>

          <form onSubmit={handleSubmit}>

            {/* EMAIL */}
            <div className="rs-login-input-group">
              <label>Email Address</label>

              <div className={`rs-login-input-field ${errors.email ? "error" : ""}`}>
                <FaEnvelope />
                <input
                  ref={emailRef}
                  type="email"
                  name="email"
                  placeholder="name@gmail.com"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onKeyDown={(e) => handleKeyDown(e, "email")}
                />
              </div>

              {errors.email && (
                <span className="rs-login-error">{errors.email}</span>
              )}
            </div>

            {/* PASSWORD */}
            <div className="rs-login-input-group">
              <div className="rs-login-password-header">
                <label>Password</label>
                <Link to="/forgot-password" className="rs-login-forgot">
                  Forgot Password?
                </Link>
              </div>

              <div className={`rs-login-input-field ${errors.password ? "error" : ""}`}>
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
                  className="rs-login-eye-btn"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              {errors.password && (
                <span className="rs-login-error">{errors.password}</span>
              )}
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="rs-login-btn"
              disabled={loading}
            >
              {loading ? "Signing In..." : "Sign In →"}
            </button>
          </form>

          {/* DIVIDER */}
          <div className="rs-login-divider">
            <span></span>
            <p>OR CONTINUE WITH</p>
            <span></span>
          </div>

          {/* GOOGLE */}
          <div className="rs-login-social-login">
            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={() => toast.error("Google login failed")}
            />
          </div>

          <p className="rs-login-footer-text">
            Don’t have an account? <Link to="/signup">Create Account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}