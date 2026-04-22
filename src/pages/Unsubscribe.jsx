import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "../styles/pages/unsubscribe.css";

export default function Unsubscribe() {
  const [params] = useSearchParams();
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const email = params.get("email");

    if (!email) {
      setStatus("error");
      return;
    }

    fetch(
      `${import.meta.env.VITE_NEWSLETTER_API_URL}/unsubscribe?email=${email}`
    )
      .then((res) => {
        if (res.ok) {
          setStatus("success");
        } else {
          setStatus("error");
        }
      })
      .catch(() => setStatus("error"));
  }, []);

  return (
    <div className="unsubscribe-page">
      <div className="unsubscribe-card">

        {status === "loading" && (
          <>
            <div className="unsubscribe-loader"></div>
            <h2>Processing your request...</h2>
          </>
        )}

        {status === "success" && (
          <>
            <h2>😢 You’re unsubscribed</h2>
            <p>
              You will no longer receive updates from <strong>R.S Education</strong>.
            </p>

            <button
              className="resubscribe-btn"
              onClick={() => (window.location.href = "/")}
            >
              Resubscribe
            </button>
          </>
        )}

        {status === "error" && (
          <>
            <h2>⚠️ Something went wrong</h2>
            <p>Please try again later.</p>
          </>
        )}

      </div>
    </div>
  );
}