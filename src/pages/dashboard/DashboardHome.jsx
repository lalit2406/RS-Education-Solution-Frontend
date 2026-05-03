import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom"; // ✅ added
import "../../styles/dashboard/dashboardHome.css";

import { BookOpen, CheckCircle, PieChart, Folder, Circle } from "lucide-react";

export default function DashboardHome() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate(); // ✅ added
  const location = useLocation();

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/dashboard`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );

        setData(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();

    const refetchTasks = () => fetchDashboard();

    const refetchSaved = (e) => {
      const change = e.detail?.change || 0;

      setData((prev) => ({
        ...prev,
        savedColleges: (prev?.savedColleges || 0) + change,
      }));

      fetchDashboard();
    };

    window.addEventListener("tasksUpdated", refetchTasks);
    window.addEventListener("savedCollegesUpdated", refetchSaved);

    return () => {
      window.removeEventListener("tasksUpdated", refetchTasks);
      window.removeEventListener("savedCollegesUpdated", refetchSaved);
    };
  }, [location.pathname]);

  if (loading) {
    return (
      <div className="rs-dashboard-home">
        {/* HEADER */}
        <div className="rs-dashboard-header">
          <div>
            <div className="rs-dashboard-skeleton-title"></div>
            <div className="rs-dashboard-skeleton-subtitle"></div>
          </div>
        </div>

        {/* STATS */}
        <div className="rs-dashboard-stats">
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <div
                className="rs-dashboard-stat-card rs-dashboard-skeleton-card"
                key={i}
              >
                <div className="rs-dashboard-skeleton-icon"></div>
                <div>
                  <div className="rs-dashboard-skeleton-text-sm"></div>
                  <div className="rs-dashboard-skeleton-text-lg"></div>
                </div>
              </div>
            ))}
        </div>

        {/* BOTTOM GRID */}
        <div className="rs-dashboard-bottom-grid">
          {/* LEFT */}
          <div className="rs-dashboard-tasks-section">
            <div className="rs-dashboard-section-header"></div>
            <div className="rs-dashboard-skeleton-text-md"></div>
          </div>

          {Array(3)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="rs-dashboard-task-card rs-dashboard-skeleton-task"
              >
                <div className="rs-dashboard-skeleton-circle"></div>
                <div>
                  <div className="rs-dashboard-skeleton-text-sm"></div>
                  <div className="rs-dashboard-skeleton-text-xs"></div>
                </div>
              </div>
            ))}

          {/* AI TOOLS */}
          <div className="rs-dashboard-ai-tools">
            <div className="rs-dashboard-skeleton-text-md"></div>

            <div className="rs-dashboard-ai-grid">
              {Array(4)
                .fill(0)
                .map((_, i) => (
                  <div
                    key={i}
                    className="rs-dashboard-ai-card rs-dashboard-skeleton-ai"
                  ></div>
                ))}
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="rs-dashboard-recommend-section">
          <div className="rs-dashboard-skeleton-text-md"></div>

          {Array(2)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="rs-dashboard-recommend-card rs-dashboard-skeleton-rec"
              >
                <div className="rs-dashboard-skeleton-img"></div>
                <div className="rs-dashboard-skeleton-text-sm"></div>
                <div className="rs-dashboard-skeleton-text-xs"></div>
                <div className="rs-dashboard-skeleton-btn"></div>
              </div>
            ))}
        </div>
      </div>
    );
  }

  return (
    <div className="rs-dashboard-home">
      {/* HEADER */}
      <div className="rs-dashboard-header">
        <div>
          <h1>Welcome back, {data?.user?.name || "User"}!</h1>
          <p>Track your tasks and documents in one place.</p>
        </div>
      </div>

      {/* STATS */}
      <div className="rs-dashboard-stats">
        {/* ✅ UPDATED SAVED COLLEGES CARD ONLY */}
        <div
          className="rs-dashboard-stat-card rs-clickable"
          onClick={() => navigate("/dashboard/saved-colleges")}
        >
          <div className="rs-dashboard-stat-icon">
            <BookOpen size={18} />
          </div>
          <div>
            <p>SAVED COLLEGES</p>
            <h2>{data?.savedColleges || 0}</h2>
          </div>
        </div>

        {/* REST SAME */}
        <div className="rs-dashboard-stat-card">
          <div className="rs-dashboard-stat-icon">
            <CheckCircle size={18} />
          </div>
          <div>
            <p>ACTIVE TASKS</p>
            <h2>{data?.stats?.tasks || 0}</h2>
          </div>
        </div>

        <div className="rs-dashboard-stat-card">
          <div className="rs-dashboard-stat-icon">
            <PieChart size={18} />
          </div>
          <div>
            <p>COMPLETION %</p>
            <h2>{data?.stats?.progress || 0}%</h2>
          </div>
        </div>

        <div className="rs-dashboard-stat-card">
          <div className="rs-dashboard-stat-icon">
            <Folder size={18} />
          </div>
          <div>
            <p>DOCUMENTS</p>
            <h2>{data?.stats?.documents || 0}</h2>
          </div>
        </div>
      </div>

      {/* NEW SECTION */}
      <div className="rs-dashboard-bottom-grid">
        {/* LEFT SIDE */}
        <div className="rs-dashboard-tasks-section">
          <div className="rs-dashboard-uct-header">
            <h3>Upcoming Tasks</h3>
            <span>View All</span>
          </div>
          {data?.tasks?.length === 0 && <p>No tasks yet</p>}

          {data?.tasks
            ?.filter((task) => task.status === "pending")
            .map((task) => (
              <div
                key={task._id}
                className={`rs-dashboard-task-card ${
                  task.status === "completed" ? "completed" : ""
                }`}
              >
                <Circle size={16} />
                <div>
                  <h4>{task.title}</h4>
                  <p>
                    {task.category} •{" "}
                    {task.dueDate
                      ? new Date(task.dueDate).toLocaleDateString()
                      : "No deadline"}
                  </p>
                </div>
              </div>
            ))}

          {/* AI TOOLS */}
          <div className="rs-dashboard-ai-tools">
            <h3>Quick AI Tools</h3>

            <div className="rs-dashboard-ai-grid">
              <div
                className="rs-dashboard-ai-card"
                onClick={() => navigate("/tools/career-chatbot")}
              >
                Career Chatbot
              </div>
              <div
                className="rs-dashboard-ai-card"
                onClick={() => navigate("/tools/resume-builder")}
              >
                AI Resume Maker
              </div>
              <div
                className="rs-dashboard-ai-card"
                onClick={() => navigate("/tools/scholarship-prediction")}
              >
                Scholarship Predictor
              </div>
              <div
                className="rs-dashboard-ai-card"
                onClick={() => navigate("/tools/study-planner")}
              >
                StudyPlanner
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="rs-dashboard-recommend-section">
          <h3>Recommended for You</h3>
          <div className="rs-dashboard-section-header">
            <div className="rs-dashboard-recommend-card">
              <div className="rs-dashboard-recommend-img"></div>
              <h4>Stanford School of Design</h4>
              <p>Palo Alto, CA • Top 1% in Design</p>
              <button>View Details</button>
            </div>

            <div className="rs-dashboard-recommend-card">
              <div className="rs-dashboard-recommend-img alt"></div>
              <h4>MIT Architecture Lab</h4>
              <p>Cambridge, MA • Research Excellence</p>
              <button>View Details</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
