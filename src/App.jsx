import { useState } from "react";
import Navbar from "./components/layout/Navbar";
import AppRoutes from "./routes/AppRoutes";
import { useUser } from "./context/UserContext";
import FloatingChatButton from "./components/common/FloatingChatButton";
import ChatbotSupport from "./components/dashboard/ChatbotSupport";

function App() {
  const { loading } = useUser();

  // ✅ Global chatbot control
  const [showChat, setShowChat] = useState(false);

  return (
    <>
      {/* 🔥 Navbar always visible */}
      <Navbar />

      {/* 🔥 Loader OR Routes */}
      {loading ? (
        <div className="rs-loader">
          <div className="spinner"></div>
          <p>Loading your profile...</p>
        </div>
      ) : (
        <>
          {/* ✅ All routes */}
          <AppRoutes />

          {/* ✅ Floating chatbot button */}
          <FloatingChatButton 
  setShowChat={setShowChat} 
  showChat={showChat}
/>

          {/* ✅ Chatbot modal */}
          {showChat && (
           <ChatbotSupport 
  onClose={() => setShowChat(false)} 
  mode="widget" 
/>
          )}
        </>
      )}
    </>
  );
}

export default App;