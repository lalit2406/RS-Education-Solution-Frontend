import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Services from "../pages/Services";
import Programs from "../pages/Programs";
import AITools from "../pages/AITools";
import Contact from "../pages/Contact";

// Auth
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import ForgotPassword from "../pages/auth/ForgotPassword";
import VerifyOtp from "../pages/auth/VerifyOtp";
import ResetPassword from "../pages/auth/ResetPassword";
import SetPassword from "../pages/auth/SetPassword";

// Protected Route
import ProtectedRoute from "./ProtectedRoute";

// Layout
import DashboardLayout from "../components/layout/DashboardLayout";

// Dashboard
import DashboardHome from "../pages/dashboard/DashboardHome";
import DashboardAITools from "../pages/dashboard/DashboardAITools";
import Documents from "../pages/dashboard/Documents";
import StudyPlanner from "../pages/dashboard/StudyPlanner";
import Profile from "../pages/dashboard/Profile";
import CustomerSupport from "../pages/dashboard/CustomerSupport";
import SavedColleges from "../pages/dashboard/SavedColleges";

export default function AppRoutes() {
  return (
    <Routes>
      {/* ================= PUBLIC ROUTES ================= */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/" element={<Home />} />
      <Route path="/verify-otp" element={<VerifyOtp />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/set-password" element={<SetPassword />} />

      {/* ================= PROTECTED ROUTES ================= */}
      <Route path="/services" element={<Services />} />

      <Route path="/programs" element={<Programs />} />

      <Route path="/Ai-tools" element={<AITools />} />

      <Route path="/contact" element={<Contact />} />

      <Route
        path="/dashboard"
        element={
          <DashboardLayout>
            <DashboardHome />
          </DashboardLayout>
        }
      />

      <Route
        path="/dashboard/ai-tools"
        element={
          <DashboardLayout>
            <AITools />
          </DashboardLayout>
        }
      />

      <Route
        path="/dashboard/documents"
        element={
          <DashboardLayout>
            <Documents />
          </DashboardLayout>
        }
      />

      <Route
        path="/dashboard/profile"
        element={
          <DashboardLayout>
            <Profile />
          </DashboardLayout>
        }
      />

      <Route
        path="/dashboard/customer-support"
        element={
          <DashboardLayout>
            <CustomerSupport />
          </DashboardLayout>
        }
      />

    

      <Route
        path="/dashboard/saved-colleges"
        element={
          <DashboardLayout>
            <SavedColleges />
          </DashboardLayout>
        }
      />
    </Routes>
  );
}
