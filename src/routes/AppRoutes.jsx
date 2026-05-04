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
import TaskManager from "../pages/dashboard/TaskManager";
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

// Legal
import Terms from "../pages/legal/Terms";
import Privacy from "../pages/legal/Privacy";
import Disclaimer from "../pages/legal/Disclaimer";

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
      <Route
        path="/services"
        element={
          <ProtectedRoute>
            <Services />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/programs"
        element={
          <ProtectedRoute>
            <Programs />
          </ProtectedRoute>
        }
      />

      <Route
        path="/Ai-tools"
        element={
          <ProtectedRoute>
            <AITools />
          </ProtectedRoute>
        }
      />
      <Route
        path="/tools/career-chatbot"
        element={
          <ProtectedRoute>
            <CareerChatbot />
          </ProtectedRoute>
        }
      />
      <Route
        path="/tools/document-analyzer"
        element={
          <ProtectedRoute>
            <DocumentAnalyzer />
          </ProtectedRoute>
        }
      />
      <Route
        path="/tools/study-planner"
        element={
          <ProtectedRoute>
            <StudyPlanning />
          </ProtectedRoute>
        }
      />
      <Route
        path="/tools/roadmap-generator"
        element={
          <ProtectedRoute>
            <RoadmapGenerator />
          </ProtectedRoute>
        }
      />
      <Route
        path="/tools/scholarship-prediction"
        element={
          <ProtectedRoute>
            <ScholarshipPrediction />
          </ProtectedRoute>
        }
      />
      <Route
        path="/tools/resume-builder"
        element={
          <ProtectedRoute>
            <ResumeBuilder />
          </ProtectedRoute>
        }
      />

      {/* LEGAL */}
      <Route path="/terms" element={<Terms />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/disclaimer" element={<Disclaimer />} />

      <Route path="/contact" element={<Contact />} />

      <Route path="/unsubscribe" element={<Unsubscribe />} />

      <Route
        path="/find-college"
        element={
          <ProtectedRoute>
            <FindCollege />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard/saved-colleges"
        element={
          <ProtectedRoute>
            <SavedColleges />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <DashboardHome />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard/documents"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Documents />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard/task-manager"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <TaskManager />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard/profile"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Profile />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard/customer-support"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <CustomerSupport />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard/college-recommendation"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <CollegeRecommendation />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard/chat-support"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <ChatbotSupport />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
