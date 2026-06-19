import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import Unsubscribe from "../pages/Unsubscribe";

// Auth
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import ForgotPassword from "../pages/auth/ForgotPassword";
import VerifyOtp from "../pages/auth/VerifyOtp";
import ResetPassword from "../pages/auth/ResetPassword";
import SetPassword from "../pages/auth/SetPassword";
import OnlineUniversities from "../pages/OnlineUniversities";

// Protected Route
import ProtectedRoute from "./ProtectedRoute";

const Home = lazy(() => import("../pages/Home"));

const Services = lazy(() => import("../pages/Services"));

const Programs = lazy(() => import("../pages/Programs"));

const AITools = lazy(() =>
  import("../pages/ai-tools/AITools"),
);

const Contact = lazy(() => import("../pages/Contact"));

const FindCollege = lazy(() =>
  import("../pages/FindCollege"),
);

const AdminDashboard = lazy(() =>
  import("../pages/admin/AdminDashboard"),
);

// Dashboard
const DashboardHome = lazy(() =>
  import("../pages/dashboard/DashboardHome"),
);

const Documents = lazy(() =>
  import("../pages/dashboard/Documents"),
);

const TaskManager = lazy(() =>
  import("../pages/dashboard/TaskManager"),
);

const Profile = lazy(() =>
  import("../pages/dashboard/Profile"),
);

const CustomerSupport = lazy(() =>
  import("../pages/dashboard/CustomerSupport"),
);

const SavedColleges = lazy(() =>
  import("../pages/dashboard/SavedColleges"),
);

// Ai tools
const CollegeRecommendation = lazy(() =>
  import("../pages/dashboard/CollegeRecommendation"),
);

const CareerChatbot = lazy(() =>
  import("../pages/ai-tools/CareerChatbot"),
);

const DocumentAnalyzer = lazy(() =>
  import("../pages/ai-tools/DocumentAnalyzer"),
);

const ScholarshipPrediction = lazy(() =>
  import("../pages/ai-tools/ScholarshipPrediction"),
);

const RoadmapGenerator = lazy(() =>
  import("../pages/ai-tools/RoadmapGenerator"),
);

const ResumeBuilder = lazy(() =>
  import("../pages/ai-tools/ResumeBuilder"),
);

const StudyPlanning = lazy(() =>
  import("../pages/ai-tools/StudyPlanner"),
);

// Layout
import DashboardLayout from "../components/layout/DashboardLayout";
import ChatbotSupport from "../components/dashboard/ChatbotSupport";

// Legal
import Terms from "../pages/legal/Terms";
import Privacy from "../pages/legal/Privacy";
import Disclaimer from "../pages/legal/Disclaimer";

export default function AppRoutes() {
 return (
  <Suspense
    fallback={
      <div className="rs-page-loader">
        Loading...
      </div>
    }
  >
    <Routes>
      {/* ================= PUBLIC ROUTES ================= */}

      {/* AUTH */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/verify-otp" element={<VerifyOtp />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/set-password" element={<SetPassword />} />

      {/* Home */}
      <Route path="/" element={<Home />} />
      <Route path="/services" element={<Services />} />
      <Route path="/programs" element={<Programs />} />
      <Route path="/Ai-tools" element={<AITools />} />
      <Route path="/find-college" element={<FindCollege />} />

      {/* LEGAL */}
      <Route path="/terms" element={<Terms />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/disclaimer" element={<Disclaimer />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/unsubscribe" element={<Unsubscribe />} />
      <Route path="/online-universities" element={<OnlineUniversities />} />

      {/* ================= PROTECTED ROUTES ================= */}

      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminDashboard />
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
    </Suspense>
  );
}
