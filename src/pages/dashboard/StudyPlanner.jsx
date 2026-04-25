import { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/dashboard/studyplanner.css";
import StudyTaskModal from "../../components/dashboard/StudyTaskModal";

export default function StudyPlanner() {
  const [tasks, setTasks] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [editTask, setEditTask] = useState(null);

  const [spLoading, setSpLoading] = useState(true); // ✅ ADDED

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setSpLoading(true); // ✅

        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/tasks`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setTasks(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setSpLoading(false); // ✅
      }
    };

    fetchTasks();
  }, []);

  // ✅ LOADING UI
  if (spLoading) {
    return (
      <div className="sp-container">
        <div className="sp-header">
          <div>
            <div className="sp-skeleton sp-skel-title"></div>
            <div className="sp-skeleton sp-skel-sub"></div>
          </div>

          <div className="sp-skeleton sp-skel-btn"></div>
        </div>

        <div className="sp-progress-card">
          <div className="sp-skeleton sp-skel-big"></div>
        </div>

        <div className="sp-grid">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="sp-skeleton sp-skel-card"></div>
          ))}
        </div>
      </div>
    );
  }

  // ✅ ADD / UPDATE TASK
  const handleAddTask = async (task) => {
    const token = localStorage.getItem("token");

    try {
      if (editTask) {
        await axios.put(
          `${import.meta.env.VITE_API_BASE_URL}/api/tasks/${editTask._id}`,
          {
            title: task.title,
            category: task.subtitle.split(" • ")[0],
            dueDate: task.subtitle.split(" • ")[1] || null,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      } else {
        await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/api/tasks`,
          {
            title: task.title,
            category: task.subtitle.split(" • ")[0],
            dueDate: task.subtitle.split(" • ")[1] || null,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      }

      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/tasks`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setTasks(res.data);
      setEditTask(null);
      window.dispatchEvent(new Event("tasksUpdated"));
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ DELETE
  const handleDeleteTask = async (id) => {
    const token = localStorage.getItem("token");

    try {
      await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/api/tasks/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setTasks((prev) => prev.filter((t) => t._id !== id));
      window.dispatchEvent(new Event("tasksUpdated"));
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ TOGGLE
  const handleToggleComplete = async (id, currentStatus) => {
    const token = localStorage.getItem("token");

    try {
      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/tasks/${id}`,
        {
          status: currentStatus === "pending" ? "completed" : "pending",
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setTasks((prev) =>
        prev.map((t) =>
          t._id === id
            ? {
                ...t,
                status: t.status === "pending" ? "completed" : "pending",
              }
            : t
        )
      );

      window.dispatchEvent(new Event("tasksUpdated"));
    } catch (err) {
      console.log(err);
    }
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    if (!a.dueDate) return 1;
    if (!b.dueDate) return -1;
    return new Date(a.dueDate) - new Date(b.dueDate);
  });

  const totalTasks = sortedTasks.length;
  const completedTasks = sortedTasks.filter(
    (t) => t.status === "completed"
  ).length;

  const progress =
    totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  return (
    <div className="sp-container">
      {/* HEADER */}
      <div className="sp-header">
        <div>
          <h2>Study Planner</h2>
          <p>Manage your daily learning tasks efficiently</p>
        </div>

        <button className="sp-add-btn" onClick={() => setIsModalOpen(true)}>
          + Add Task
        </button>
      </div>

      {/* PROGRESS */}
      <div className="sp-progress-card">
        <div className="sp-progress-top">
          <div>
            <span className="sp-label">CURRENT OVERVIEW</span>
            <h2>Overall Progress</h2>
          </div>

          <div className="sp-progress-info">
            {completedTasks} of {totalTasks} tasks completed
          </div>
        </div>

        <h1 className="sp-progress-percent">{progress}%</h1>

        <div className="sp-progress-bar">
          <div
            className="sp-progress-fill"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <div className="sp-stats">
          <div>
            <span>Pending</span>
            <h3>{totalTasks - completedTasks}</h3>
          </div>

          <div>
            <span>Completed</span>
            <h3>{completedTasks}</h3>
          </div>

          <div>
            <span>Total Tasks</span>
            <h3>{totalTasks}</h3>
          </div>
        </div>
      </div>

      {/* GRID */}
      <div className="sp-grid">
        <div className="sp-section">
          <h3>Pending Tasks</h3>

          {sortedTasks.filter((t) => t.status === "pending").length === 0 && (
            <p className="sp-empty">No pending tasks</p>
          )}

          {sortedTasks
            .filter((t) => t.status === "pending")
            .map((task) => (
              <div className="sp-card" key={task._id}>
                <div className="sp-card-left">
                  <span
                    onClick={() => handleToggleComplete(task._id, task.status)}
                    style={{ cursor: "pointer", marginRight: "10px" }}
                  >
                    {task.status === "completed" ? "✔" : "○"}
                  </span>
                  <h4>{task.title}</h4>
                  <p>
                    {task.category} •{" "}
                    {task.dueDate
                      ? new Date(task.dueDate).toLocaleDateString()
                      : "No deadline"}
                  </p>
                </div>

                <div className="sp-actions">
                  <button
                    className="edit"
                    onClick={() => {
                      setEditTask(task);
                      setIsModalOpen(true);
                    }}
                  >
                    Edit
                  </button>

                  <button
                    className="delete"
                    onClick={() => setConfirmDeleteId(task._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
        </div>

        <div className="sp-section">
          <h3>Completed</h3>

          {sortedTasks.filter((t) => t.status === "completed").length === 0 && (
            <p className="sp-empty">No completed tasks yet</p>
          )}

          {sortedTasks
            .filter((t) => t.status === "completed")
            .slice(0, 5)
            .map((task) => (
              <div className="sp-card completed" key={task._id}>
                <h4>{task.title}</h4>
                <p>
                  {task.category} •{" "}
                  {task.dueDate
                    ? new Date(task.dueDate).toLocaleDateString()
                    : "No deadline"}
                </p>
              </div>
            ))}
        </div>
      </div>

      {/* MODAL */}
      <StudyTaskModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditTask(null);
        }}
        onAddTask={handleAddTask}
        editTask={editTask}
      />
    </div>
  );
}