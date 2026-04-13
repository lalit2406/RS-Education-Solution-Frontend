import { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/dashboard/dashboardHome.css";

import {
  BookOpen,
  CheckCircle,
  PieChart,
  Folder,
  Circle,
} from "lucide-react";

export default function DashboardHome() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    fetchDashboard();

    const refetch = () => fetchDashboard();

    window.addEventListener("tasksUpdated", refetch);

    return () => window.removeEventListener("tasksUpdated", refetch);
  }, []);

  if (loading) return <p>Loading dashboard...</p>;

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
        <div className="rs-dashboard-stat-card">
          <div className="rs-dashboard-stat-icon">
            <BookOpen size={18} />
          </div>
          <div>
            <p>SAVED COLLEGES</p>
            <h2>0</h2>
          </div>
        </div>

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
      <div className="rs-bottom-grid">
        {/* LEFT SIDE */}
        <div className="rs-tasks-section">
          <div className="rs-section-header">
            <h3>Upcoming Tasks</h3>
            <span>View All</span>
          </div>
          {data?.tasks?.length === 0 && <p>No tasks yet</p>}

          {data?.tasks
            ?.filter((task) => task.status === "pending")
            .map((task) => (
              <div
                key={task._id}
                className={`rs-task-card ${
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
          <div className="rs-ai-tools">
            <h3>Quick AI Tools</h3>

            <div className="rs-ai-grid">
              <div className="rs-ai-card">Chatbot</div>
              <div className="rs-ai-card">Recommender</div>
              <div className="rs-ai-card">Predictor</div>
              <div className="rs-ai-card">Planner</div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="rs-recommend-section">
          <div className="rs-section-header">
            <h3>Recommended for You</h3>
          </div>

          <div className="rs-recommend-card">
            <div className="rs-recommend-img"></div>
            <h4>Stanford School of Design</h4>
            <p>Palo Alto, CA • Top 1% in Design</p>
            <button>View Details</button>
          </div>

          <div className="rs-recommend-card">
            <div className="rs-recommend-img alt"></div>
            <h4>MIT Architecture Lab</h4>
            <p>Cambridge, MA • Research Excellence</p>
            <button>View Details</button>
          </div>
        </div>
      </div>
    </div>
  );
}
