import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

// 🔥 GOOGLE AUTH
import { GoogleOAuthProvider } from "@react-oauth/google";

import App from "./App.jsx";

// 🔔 Toast
import { Toaster } from "react-hot-toast";

// 🌍 Global styles
import "./styles/global.css";
import { UserProvider } from "./context/UserContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>

    {/* 🔥 GOOGLE PROVIDER */}
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>

      <BrowserRouter>

      <UserProvider>

        {/* 🔔 Toast Provider */}
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: "#1e293b",
              color: "#fff",
              borderRadius: "10px",
              padding: "12px 16px",
              fontSize: "13px",
              marginTop: "65px",
              zIndex: 2000000,
            },
          }}
        />

        {/* 🔹 Main App */}
        <App />

      </UserProvider>

      </BrowserRouter>

    </GoogleOAuthProvider>

  </React.StrictMode>
);