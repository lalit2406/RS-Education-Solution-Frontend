import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import AppRoutes from "./routes/AppRoutes";
import { useUser } from "./context/UserContext";
import FloatingChatButton from "./components/common/FloatingChatButton";
import ChatbotSupport from "./components/dashboard/ChatbotSupport";
import RSLeadCapturePopup from "./components/common/RSLeadCapturePopup";

function App() {
  const location = useLocation();

  const { loading, user } = useUser();

  const [showLeadPopup, setShowLeadPopup] = useState(false);

  // ✅ Global chatbot control
  const [showChat, setShowChat] = useState(false);

  const rsLeadBlockedRoutes = [
    "/login",
    "/signup",
    "/forgot-password",
    "/verify-otp",
    "/reset-password",
    "/set-password",
    "/admin",
    "/dashboard",
  ];

  const openRSLeadPopup = () => {
    const alreadyShown = localStorage.getItem("rsLeadPopupShown");

    if (alreadyShown) return;

    setShowLeadPopup(true);
  };

  const closeRSLeadPopup = () => {
    setShowLeadPopup(false);

    // ✅ Store close time
    localStorage.setItem("rsLeadPopupClosedAt", Date.now());
  };

  useEffect(() => {
    // ✅ DO NOT SHOW IF USER LOGGED IN
    if (user) return;

    // ✅ BLOCKED ROUTES
    const isBlockedRoute = rsLeadBlockedRoutes.some((route) =>
      location.pathname.startsWith(route),
    );

    if (isBlockedRoute) return;

    // ✅ NEVER SHOW IF FORM ALREADY SUBMITTED
    const formAlreadySubmitted = localStorage.getItem("rsLeadFormSubmitted");

    if (formAlreadySubmitted) return;

    const popupClosedAt = localStorage.getItem("rsLeadPopupClosedAt");

    if (popupClosedAt) {
      const oneDay = 1 * 24 * 60 * 60 * 1000;

      const now = Date.now();

      const timePassed = now - Number(popupClosedAt);

      // ✅ Still inside 1 day
      if (timePassed < oneDay) {
        return;
      }
    }

    // ===============================
    // 🔥 SCROLL TRIGGER
    // ===============================

    const handleScroll = () => {
      const scrollPercent =
        (window.scrollY /
          (document.documentElement.scrollHeight - window.innerHeight)) *
        100;

      // ✅ SHOW AFTER 35%
      if (scrollPercent > 35) {
        openRSLeadPopup();

        window.removeEventListener("scroll", handleScroll);
      }
    };

    // ===============================
    // 🔥 TIME DELAY TRIGGER
    // ===============================

    const popupTimer = setTimeout(() => {
      openRSLeadPopup();
    }, 10000);

    // ===============================
    // 🔥 EXIT INTENT TRIGGER
    // ===============================

    const handleMouseLeave = (e) => {
      if (window.innerWidth > 768 && e.clientY <= 10) {
        openRSLeadPopup();
      }
    };

    // ===============================
    // 🔥 EVENTS
    // ===============================

    window.addEventListener("scroll", handleScroll);

    document.addEventListener("mouseout", handleMouseLeave);

    // ===============================
    // 🔥 CLEANUP
    // ===============================

    return () => {
      clearTimeout(popupTimer);

      window.removeEventListener("scroll", handleScroll);

      document.removeEventListener("mouseout", handleMouseLeave);
    };
  }, [user, location.pathname]);

  return (
    <>
      {/* 🔥 Navbar always visible */}
      <Navbar />

      {/* 🔥 Loader OR Routes */}
      {loading ? (
        <div className="rs-loader">
          <img
            src="./images/home/logo.webp"
            alt="RS Education"
            className="rs-loader-logo"
          />

          <p>Loading your profile...</p>
        </div>
      ) : (
        <>
          {/* ✅ All routes */}
          <AppRoutes />

          {/* ✅ Floating chatbot button */}
          <FloatingChatButton setShowChat={setShowChat} showChat={showChat} />

          {/* ✅ Chatbot modal */}
          {showChat && (
            <ChatbotSupport onClose={() => setShowChat(false)} mode="widget" />
          )}

          {/* ✅ Lead Popup */}
          <RSLeadCapturePopup
            isOpen={showLeadPopup}
            onClose={closeRSLeadPopup}
          />
        </>
      )}
    </>
  );
}

export default App;
