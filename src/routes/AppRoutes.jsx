import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Services from "../pages/Services";
import Programs from "../pages/Programs";
import AITools from "../pages/ai-tools/AITools";
import Contact from "../pages/Contact";
import Unsubscribe from "../pages/Unsubscribe";
import FindCollege from "../pages/FindCollege";

// Auth
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import ForgotPassword from "../pages/auth/ForgotPassword";
import VerifyOtp from "../pages/auth/VerifyOtp";
import ResetPassword from "../pages/auth/ResetPassword";
import SetPassword from "../pages/auth/SetPassword";

// Protected Route
import ProtectedRoute from "./ProtectedRoute";
import AdminDashboard from "../pages/admin/AdminDashboard";
// Layout
import DashboardLayout from "../components/layout/DashboardLayout";

// Dashboard
import DashboardHome from "../pages/dashboard/DashboardHome";
import Documents from "../pages/dashboard/Documents";
import StudyPlanner from "../pages/dashboard/StudyPlanner";
import Profile from "../pages/dashboard/Profile";
import CustomerSupport from "../pages/dashboard/CustomerSupport";
import SavedColleges from "../pages/dashboard/SavedColleges";
import CollegeRecommendation from "../pages/dashboard/CollegeRecommendation";
import ChatbotSupport from "../components/dashboard/ChatbotSupport";

// AI TOOLS
import CareerChatbot from "../pages/ai-tools/CareerChatbot";
import DocumentAnalyzer from "../pages/ai-tools/DocumentAnalyzer";
import ScholarshipPrediction from "../pages/ai-tools/ScholarshipPrediction";
import RoadmapGenerator from "../pages/ai-tools/RoadmapGenerator";
import ResumeBuilder from "../pages/ai-tools/ResumeBuilder";
import StudyPlanning from "../pages/ai-tools/StudyPlanner";

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

      <Route path="/admin" element={<AdminDashboard />} />

      <Route path="/programs" element={<Programs />} />

      <Route path="/Ai-tools" element={<AITools />} />
      <Route path="/tools/career-chatbot" element={<CareerChatbot />} />
      <Route path="/tools/document-analyzer" element={<DocumentAnalyzer />} />
      <Route
        path="/tools/study-planner"
        element={<StudyPlanning />}
      />
      <Route path="/tools/roadmap-generator" element={<RoadmapGenerator />} />
      <Route path="/tools/scholarship-prediction" element={<ScholarshipPrediction />} />
      <Route path="/tools/resume-builder" element={<ResumeBuilder />} />

      

      <Route path="/contact" element={<Contact />} />

      <Route path="/unsubscribe" element={<Unsubscribe />} />

      <Route path="/find-college" element={<FindCollege />} />

      <Route path="/dashboard/saved-colleges" element={<SavedColleges />} />

      <Route
        path="/dashboard"
        element={
          <DashboardLayout>
            <DashboardHome />
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
        path="/dashboard/task-manager"
        element={
          <DashboardLayout>
            <StudyPlanner />
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
        path="/dashboard/college-recommendation"
        element={
          <DashboardLayout>
            <CollegeRecommendation />
          </DashboardLayout>
        }
      />

      <Route
        path="/dashboard/chat-support"
        element={
          <DashboardLayout>
            <ChatbotSupport />
          </DashboardLayout>
        }
      />
    </Routes>
  );
}
