import { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/dashboard/taskManager.css";
import StudyTaskModal from "../../components/dashboard/StudyTaskModal";

export default function StudyPlanner() {
  const [tasks, setTasks] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [editTask, setEditTask] = useState(null);

  const [tmLoading, settmLoading] = useState(true); // ✅ ADDED

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        settmLoading(true); // ✅

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
        settmLoading(false); // ✅
      }
    };

    fetchTasks();
  }, []);

  // ✅ LOADING UI
  if (tmLoading) {
    return (
      <div className="tm-container">
        <div className="tm-header">
          <div>
            <div className="tm-skeleton tm-skel-title"></div>
            <div className="tm-skeleton tm-skel-sub"></div>
          </div>

          <div className="tm-skeleton tm-skel-btn"></div>
        </div>

        <div className="tm-progress-card">
          <div className="tm-skeleton tm-skel-big"></div>
        </div>

        <div className="tm-grid">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="tm-skeleton tm-skel-card"></div>
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
            category: task.subtitle.tmlit(" • ")[0],
            dueDate: task.subtitle.tmlit(" • ")[1] || null,
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
            category: task.subtitle.tmlit(" • ")[0],
            dueDate: task.subtitle.tmlit(" • ")[1] || null,
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
      window.ditmatchEvent(new Event("tasksUpdated"));
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
      window.ditmatchEvent(new Event("tasksUpdated"));
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

      window.ditmatchEvent(new Event("tasksUpdated"));
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
    <div className="tm-container">
      {/* HEADER */}
      <div className="tm-header">
        <div>
          <h2>Task Manager</h2>
          <p>Manage your daily learning tasks efficiently</p>
        </div>

        <button className="tm-add-btn" onClick={() => setIsModalOpen(true)}>
          + Add Task
        </button>
      </div>

      {/* PROGRESS */}
      <div className="tm-progress-card">
        <div className="tm-progress-top">
          <div>
            <span className="tm-label">CURRENT OVERVIEW</span>
            <h2>Overall Progress</h2>
          </div>

          <div className="tm-progress-info">
            {completedTasks} of {totalTasks} tasks completed
          </div>
        </div>

        <h1 className="tm-progress-percent">{progress}%</h1>

        <div className="tm-progress-bar">
          <div
            className="tm-progress-fill"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <div className="tm-stats">
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
      <div className="tm-grid">
        <div className="tm-section">
          <h3>Pending Tasks</h3>

          {sortedTasks.filter((t) => t.status === "pending").length === 0 && (
            <p className="tm-empty">No pending tasks</p>
          )}

          {sortedTasks
            .filter((t) => t.status === "pending")
            .map((task) => (
              <div className="tm-card" key={task._id}>
                <div className="tm-card-left">
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

                <div className="tm-actions">
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

        <div className="tm-section">
          <h3>Completed</h3>

          {sortedTasks.filter((t) => t.status === "completed").length === 0 && (
            <p className="tm-empty">No completed tasks yet</p>
          )}

          {sortedTasks
            .filter((t) => t.status === "completed")
            .slice(0, 5)
            .map((task) => (
              <div className="tm-card completed" key={task._id}>
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