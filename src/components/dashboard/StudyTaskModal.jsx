import { useState, useCallback } from "react";
import "../../styles/dashboard/studytaskmodal.css";

export default function StudyTaskModal({
  isOpen,
  onClose,
  onAddTask,
  editTask,
}) {

  const getInitialForm = useCallback(() => {
    if (editTask) {
      return {
        subject: editTask.title || "",
        topic: editTask.category || "",
        date: editTask.dueDate ? editTask.dueDate.split("T")[0] : "",
        focus: "Deep Work",
      };
    }

    return {
      subject: "",
      topic: "",
      date: "",
      focus: "Deep Work",
    };
  }, [editTask]);

  const [form, setForm] = useState(getInitialForm);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTask = {
      id: editTask ? editTask._id : Date.now(),
      title: form.subject,
      subtitle: `${form.topic}${form.date ? " • " + form.date : ""}`,
      status: "pending",
    };

    onAddTask(newTask);

    // RESET AFTER SUBMIT
    setForm({
      subject: "",
      topic: "",
      date: "",
      focus: "Deep Work",
    });

    onClose();
  };

  const handleClose = () => {
    setForm({
      subject: "",
      topic: "",
      date: "",
      focus: "Deep Work",
    });
    onClose();
  };

  return (
    <div className="spm-overlay">
      <div key={editTask?._id || "new"} className="spm-modal">
        {/* CLOSE BUTTON */}
        <button className="spm-close" onClick={handleClose}>
          ×
        </button>

        {/* HEADER */}
        <h2 className="spm-title">
          {editTask ? "Edit Task" : "Add New Study Task"}
        </h2>

        <p className="spm-subtitle">
          Define your next milestone in the academic journey.
        </p>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="spm-form">
          {/* SUBJECT */}
          <label className="spm-label">SUBJECT</label>
          <input
            type="text"
            name="subject"
            placeholder="e.g. Advanced Macroeconomics"
            value={form.subject}
            required
            onChange={handleChange}
          />

          {/* TOPIC */}
          <label className="spm-label">TOPIC / CHAPTER</label>
          <input
            type="text"
            name="topic"
            placeholder="e.g. Keynesian Multiplier Models"
            value={form.topic}
            required
            onChange={handleChange}
          />

          {/* ROW */}
          <div className="spm-row">
            {/* DATE */}
            <div className="spm-field">
              <label className="spm-label">SCHEDULED DATE</label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
              />
            </div>

            {/* FOCUS MODE */}
            <div className="spm-field">
              <label className="spm-label">FOCUS MODE</label>

              <div className="spm-focus">
                <button
                  type="button"
                  className={
                    form.focus === "Deep Work"
                      ? "spm-focus-btn active"
                      : "spm-focus-btn"
                  }
                  onClick={() => setForm({ ...form, focus: "Deep Work" })}
                >
                  Deep Work
                </button>

                <button
                  type="button"
                  className={
                    form.focus === "Review"
                      ? "spm-focus-btn active"
                      : "spm-focus-btn"
                  }
                  onClick={() => setForm({ ...form, focus: "Review" })}
                >
                  Review
                </button>
              </div>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="spm-actions">
            <button type="button" className="spm-cancel" onClick={handleClose}>
              Cancel
            </button>

            <button type="submit" className="spm-submit">
              {editTask ? "Update Task" : "Add Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
