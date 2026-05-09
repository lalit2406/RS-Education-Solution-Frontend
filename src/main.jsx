import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { GoogleOAuthProvider } from "@react-oauth/google";
import App from "./App.jsx";
import { Toaster } from "react-hot-toast";
import "./styles/global.css";
import { UserProvider } from "./context/UserContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <BrowserRouter>
      <HelmetProvider>
        <UserProvider>
          <Toaster
            position="top-center"
            toastOptions={{
              style: {
                background: "#f5dcca",
                color: "#000000",
                borderRadius: "10px",
                padding: "12px 16px",
                fontSize: "13px",
                marginTop: "65px",
                zIndex: 2000000,
              },
            }}
          />

          <App />
        </UserProvider>
      </HelmetProvider>
    </BrowserRouter>
  </GoogleOAuthProvider>,
);
