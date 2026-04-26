import { useState } from "react";
import "../../styles/ai-tools/studyPlanner.css";
import { CalendarDays, BookOpen, Timer, Clock, Target } from "lucide-react";

export default function StudyPlanning() {
  const [activeTool, setActiveTool] = useState("study");

  // ================= STATES =================
  const [planForm, setPlanForm] = useState({
    subject: "",
    exam_date: "",
    daily_hours: "",
    difficulty: "medium",
    topics: "",
  });

  const [summaryForm, setSummaryForm] = useState({
    topic: "",
    detail_level: "medium",
  });

  const [pomodoroForm, setPomodoroForm] = useState({
    subject: "",
    hours: "",
  });

  const [planLoading, setPlanLoading] = useState(false);
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [pomodoroLoading, setPomodoroLoading] = useState(false);

  const [planResult, setPlanResult] = useState("");
  const [summaryResult, setSummaryResult] = useState("");
  const [pomodoroResult, setPomodoroResult] = useState("");

  // ================= HANDLERS =================
  const handlePlan = (e) =>
    setPlanForm({ ...planForm, [e.target.name]: e.target.value });

  const handleSummary = (e) =>
    setSummaryForm({ ...summaryForm, [e.target.name]: e.target.value });

  const handlePomodoro = (e) =>
    setPomodoroForm({ ...pomodoroForm, [e.target.name]: e.target.value });

  // ================= API =================
  const generatePlan = async () => {
    setPlanLoading(true);
    setPlanResult("");

    try {
      const res = await fetch(import.meta.env.VITE_STUDY_PLAN_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...planForm,
          daily_hours: Number(planForm.daily_hours),
          goal: "pass the exam",
        }),
      });

      const data = await res.json();
      setPlanResult(data.study_plan);
    } catch (e) {
      console.error(e);
      setPlanResult("Something went wrong");
    } finally {
      setPlanLoading(false);
    }
  };

  const generateSummary = async () => {
    setSummaryLoading(true);
    setSummaryResult("");

    try {
      const res = await fetch(import.meta.env.VITE_SUMMARY_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(summaryForm),
      });

      const data = await res.json();
      setSummaryResult(data.summary);
    } catch (e) {
      console.error(e);
      setSummaryResult("Something went wrong");
    } finally {
      setSummaryLoading(false);
    }
  };

  const generatePomodoro = async () => {
    if (!pomodoroForm.subject || !pomodoroForm.hours) {
      alert("Please fill all fields");
      return;
    }

    setPomodoroLoading(true);
    setPomodoroResult("");

    try {
      const query = new URLSearchParams({
        subject: pomodoroForm.subject,
        total_hours: pomodoroForm.hours,
        session_minutes: 25,
      }).toString();

      const res = await fetch(`${import.meta.env.VITE_POMODORO_API}?${query}`, {
        method: "POST",
      });

      const data = await res.json();
      setPomodoroResult(data.pomodoro_schedule);
    } catch (e) {
      console.error(e);
      setPomodoroResult("Something went wrong");
    } finally {
      setPomodoroLoading(false);
    }
  };

  // ================= PARSER =================
  const parseTable = (text) => {
    if (!text || typeof text !== "string") return null;

    const lines = text
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => l.startsWith("|"));

    if (lines.length < 3) return null;

    const headers = lines[0]
      .split("|")
      .map((h) => h.trim())
      .slice(1, -1);

    const rows = lines.slice(2).map((row) => {
      const cols = row.split("|").map((c) => c.trim());
      return cols.slice(1, -1);
    });

    return { headers, rows };
  };

  // ================= STUDY PLAN RENDER =================
  const renderStudyPlanFull = () => {
    if (!planResult) return null;

    const parts = planResult.split("\n\n");

    const title = parts[0];
    const tableText = parts.find((p) => p.includes("|"));
    const breakdown = parts.find((p) => p.toLowerCase().includes("breakdown"));
    const tips = parts.filter(
      (p) =>
        p.toLowerCase().includes("tip") ||
        p.toLowerCase().includes("practice") ||
        p.toLowerCase().includes("visual"),
    );

    const table = parseTable(tableText || "");

    return (
      <div className="rs-study-plan-full">
        <h3 className="rs-study-plan-title">{title?.replace(/\*\*/g, "")}</h3>

        {table && (
          <div className="rs-study-table-wrapper">
            <table className="rs-study-table">
              <thead>
                <tr>
                  {table.headers.map((h, i) => (
                    <th key={i}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {table.rows.map((row, i) => (
                  <tr key={i}>
                    {row.map((cell, j) => (
                      <td key={j}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {breakdown && (
          <div className="rs-study-breakdown">
            <h4>Study Plan Breakdown (Hours/day)</h4>
            <pre>{breakdown}</pre>
          </div>
        )}

        {tips.length > 0 && (
          <div className="rs-study-tips">
            <h4>Pro Tips</h4>
            {tips.map((tip, i) => (
              <div key={i} className="rs-study-tip-item">
                {tip}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  // ================= POMODORO RENDER =================
  const renderPomodoroTable = () => {
  if (!pomodoroResult) return null;

  const rows = pomodoroResult
    .split("\n")
    .filter((line) => line.startsWith("|") && !line.includes("---"));

  if (rows.length < 3) return <p>{pomodoroResult}</p>;

  const dataRows = rows.slice(2).map((row) =>
    row.split("|").map((c) => c.trim()).slice(1, -1)
  );

  let currentTime = 0;
  let formatted = [];

  const formatTime = (mins) => {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return `${h}:${m.toString().padStart(2, "0")}`;
  };

  for (let i = 0; i < dataRows.length; i++) {
    const row = dataRows[i];

    const type = row.find((c) =>
      c.toLowerCase().includes("work")
    );

    if (type) {
      let breakTime = "";

      const next = dataRows[i + 1];

      if (next) {
        const breakCell = next.find((c) =>
          c.toLowerCase().includes("break")
        );

        if (breakCell) {
          breakTime = breakCell.toLowerCase().includes("long")
            ? "15 min"
            : "5 min";

          i++; // skip break row
        }
      }

      formatted.push({
        time: formatTime(currentTime),
        work: "25 min",
        break: breakTime,
      });

      currentTime += 25 + (breakTime === "15 min" ? 15 : breakTime === "5 min" ? 5 : 0);
    }
  }

  // final row
  formatted.push({
    time: formatTime(currentTime),
    work: "-",
    break: "-",
  });

  return (
    <div>
      <h4 className="rs-study-plan-title">
        {pomodoroForm.hours}-Hour {pomodoroForm.subject} Study Schedule
      </h4>

      <table className="rs-study-table">
        <thead>
          <tr>
            <th>Time</th>
            <th>Work Block</th>
            <th>Break</th>
          </tr>
        </thead>

        <tbody>
          {formatted.map((row, i) => (
            <tr key={i}>
              <td>{row.time}</td>
              <td>{row.work}</td>
              <td>{row.break}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="rs-study-note">
        This Pomodoro study schedule allows you to complete structured work
        sessions with short and long breaks within the selected time frame.
      </p>
    </div>
  );
};

  // ================= UI =================
  return (
    <div className="rs-study-layout">
      {/* SIDEBAR */}
      <div className="rs-study-sidebar">
        <h2 className="rs-study-logo">StudyPlanner</h2>

        <div
          className={`rs-study-sidebar-item ${
            activeTool === "study" ? "active" : ""
          }`}
          onClick={() => setActiveTool("study")}
        >
          <CalendarDays size={18} className="rs-study-icon" />
          Study Plan
        </div>

        <div
          className={`rs-study-sidebar-item ${
            activeTool === "summary" ? "active" : ""
          }`}
          onClick={() => setActiveTool("summary")}
        >
          <BookOpen size={18} className="rs-study-icon" />
          Topic Summary
        </div>

        <div
          className={`rs-study-sidebar-item ${
            activeTool === "pomodoro" ? "active" : ""
          }`}
          onClick={() => setActiveTool("pomodoro")}
        >
          <Timer size={18} className="rs-study-icon" />
          Pomodoro
        </div>
      </div>

      {/* CONTENT */}
      <div className="rs-study-content">
        {/* STUDY PLAN */}
        {activeTool === "study" && (
          <div className="rs-study-section">
            <h2>Generate Your Study Plan</h2>
            <p>Tell us your goal and we’ll map out your journey.</p>

            <div className="rs-study-card">
              <div className="rs-study-row">
                <div className="rs-study-input-group">
                  <BookOpen size={16} className="rs-study-input-icon" />
                  <input
                    name="subject"
                    placeholder="Subject"
                    onChange={handlePlan}
                  />
                </div>
                <div className="rs-study-input-group">
                  <CalendarDays size={16} className="rs-study-input-icon" />
                  <input type="date" name="exam_date" onChange={handlePlan} />
                </div>
              </div>

              <div className="rs-study-row">
                <div className="rs-study-input-group">
                  <Clock size={16} className="rs-study-input-icon" />
                  <input
                    type="number"
                    name="daily_hours"
                    placeholder="Daily Hours"
                    onChange={handlePlan}
                  />
                </div>
                <select name="difficulty" onChange={handlePlan}>
                  <option>Easy</option>
                  <option>Medium</option>
                  <option>Hard</option>
                </select>
              </div>

              <div className="rs-study-input-group textarea">
                <Target size={16} className="rs-study-input-icon" />
                <textarea
                  name="topics"
                  placeholder="Topics..."
                  onChange={handlePlan}
                />
              </div>

              <button className="rs-study-btn" onClick={generatePlan}>
                Generate Plan
              </button>
            </div>

            <div className="rs-study-card">
              {planLoading ? (
                <div className="rs-study-skeleton"></div>
              ) : (
                renderStudyPlanFull()
              )}
            </div>
          </div>
        )}

        {/* SUMMARY */}
        {activeTool === "summary" && (
          <div className="rs-study-section">
            <h2>Topic Summary</h2>
            <p>Get concise notes for quick revision.</p>

            <div className="rs-study-card">
              <div className="rs-study-row">
                <input
                  name="topic"
                  placeholder="Topic"
                  onChange={handleSummary}
                />
                <select name="detail_level" onChange={handleSummary}>
                  <option>Short</option>
                  <option>Medium</option>
                  <option>Detailed</option>
                </select>
              </div>

              <button className="rs-study-btn" onClick={generateSummary}>
                Create Summary
              </button>
            </div>

            <div className="rs-study-card">
              {summaryLoading ? (
                <div className="rs-study-skeleton"></div>
              ) : (
                <div className="rs-study-result">{summaryResult}</div>
              )}
            </div>
          </div>
        )}

        {/* POMODORO */}
        {activeTool === "pomodoro" && (
          <div className="rs-study-section">
            <h2>Pomodoro Schedule</h2>
            <p>Optimize your focus with timed blocks.</p>

            <div className="rs-study-card">
              <div className="rs-study-row">
                <div className="rs-study-input-group">
                  <BookOpen size={16} className="rs-study-input-icon" />
                  <input
                    name="subject"
                    placeholder="Subject"
                    onChange={handlePomodoro}
                  />
                </div>
                <div className="rs-study-input-group">
                  <Clock size={16} className="rs-study-input-icon" />
                  <input
                    type="number"
                    name="hours"
                    placeholder="Total Hours"
                    onChange={handlePomodoro}
                  />
                </div>
              </div>

              <button className="rs-study-btn" onClick={generatePomodoro}>
                Generate Schedule
              </button>
            </div>

            <div className="rs-study-card">
              {pomodoroLoading ? (
                <div className="rs-study-skeleton"></div>
              ) : (
                renderPomodoroTable()
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
