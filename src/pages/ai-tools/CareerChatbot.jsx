import React, { useState, useEffect, useRef } from "react";
import "../../styles/ai-tools/CareerChatbot.css";
import {
  GraduationCap,
  Building2,
  Calendar,
  Monitor,
  User,
  IndianRupee,
  TrendingUp,
  Link,
  Send,
  Landmark,
  ChevronLeft,
  ChevronRight,
  Mic,
} from "lucide-react";

const API = import.meta.env.VITE_API_CAREERCHATBOT_URL;

export default function CareerChatbot() {
  const inputRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [rsChatLoading, setRsChatLoading] = useState(true);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [filterLoading, setFilterLoading] = useState(false);
  const [sessionId, setSessionId] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [filters, setFilters] = useState({
    state: "",
    budget: "",
    course: "",
  });
  const [showRightPanel, setShowRightPanel] = useState(true);
  const [listening, setListening] = useState(false);

  const [stats, setStats] = useState({
    highest: "-",
    lowestFees: "-",
    avgPlacement: "-",
  });
  const [exams, setExams] = useState([]);
  const [aid, setAid] = useState({ central_schemes: [] });
  const [selectedCollege, setSelectedCollege] = useState(null);
  const [activeTab, setActiveTab] = useState("stats");

  const chatEndRef = useRef(null);

  useEffect(() => {
    const init = async () => {
      try {
        await Promise.all([
          fetch(`${API}/colleges/exams`)
            .then((res) => res.json())
            .then((data) => {
              const examArray = Object.entries(data).map(([name, value]) => ({
                name,
                ...value,
              }));
              setExams(examArray);
            })
            .catch(() => setExams([])),

          fetch(`${API}/colleges/scholarships`)
            .then((res) => res.json())
            .then((data) => setAid(data))
            .catch(() => setAid({ central_schemes: [], state_schemes: {} })),
        ]);
      } catch (err) {
        console.log(err);
      } finally {
        setRsChatLoading(false);
      }
    };

    init();
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  // session
  useEffect(() => {
    setSessionId("sess_" + Math.random().toString(36).substr(2, 9));
  }, []);

  useEffect(() => {
    inputRef.current?.focus();
  }, [messages]);

  // scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // send message
  const sendMessage = async (override) => {
    const text = override || input;
    if (!text.trim() || loading) return;

    const userMsg = {
      text,
      sender: "user",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMsg]);

    setInput("");
    setLoading(true);

    try {
      const res = await fetch(`${API}/chat/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: text,
          session_id: sessionId,
        }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          text: data.reply,
          sender: "bot",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);

      setSuggestions(data.suggestions || []);
      setSessionId(data.session_id);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          text: "⚠️ Cannot connect to server",
          sender: "bot",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    }

    setLoading(false);
  };

  const applyFilters = async () => {
    if (filterLoading) return;

    setFilterLoading(true);
    try {
      const cleanFilters = Object.fromEntries(
        Object.entries(filters).filter(([_, v]) => v && v !== ""),
      );

      if (!cleanFilters.budget) {
        cleanFilters.budget = 400000;
      }

      delete cleanFilters.course;

      const query = new URLSearchParams(cleanFilters).toString();

      const res = await fetch(`${API}/colleges/?${query}`);
      const data = await res.json();

      setMessages((prev) => {
        const newMessages = [
          ...prev,
          { text: "Applied filters", sender: "user" },
          { text: "Showing filtered colleges...", sender: "bot" },
        ];

        if (!data.colleges || data.colleges.length === 0) {
          newMessages.push({
            text: "⚠️ No colleges found. Try changing filters.",
            sender: "bot",
          });
        } else {
          newMessages.push({
            type: "cards",
            data: data.colleges,
          });
        }

        return newMessages;
      });

      if (data.colleges?.length > 0) {
        const highest = Math.max(
          ...data.colleges.map((c) => c.placement_highest_lpa || 0),
        );
        const lowest = Math.min(
          ...data.colleges.map((c) => c.fees_per_year || 999999),
        );
        const avg = (
          data.colleges.reduce(
            (sum, c) => sum + (c.placement_avg_lpa || 0),
            0,
          ) / data.colleges.length
        ).toFixed(1);

        setStats({
          highest: highest + " LPA",
          lowestFees: "₹" + lowest,
          avgPlacement: avg + " LPA",
        });
      }
    } catch (err) {
      console.error("Filter error:", err);
    }

    setFilterLoading(false);
  };

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition not supported");
      return;
    }

    if (listening) return;

    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";

    recognition.start();
    setListening(true);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
    };

    recognition.onend = () => {
      setListening(false);
    };
  };

  // clear chat
  const clearChat = async () => {
    try {
      await fetch(`${API}/chat/session/${sessionId}`, {
        method: "DELETE",
      });
    } catch {}

    setMessages([]);
    setSuggestions([]);
    setSelectedCollege(null);
  };

  // format text
  const formatMessage = (text) => {
    if (!text) return "";

    return (
      text
        // bold
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")

        // HEADINGS FIX (IMPORTANT)
        .replace(
          /(Degree Courses:|Other Options:)/g,
          '<div class="chat-section-heading">$1</div>',
        )

        // double line break
        .replace(/\n\n/g, "<br/><br/>")

        // numbered list
        .replace(
          /(\d+\.\s.*?)(?=\n|$)/g,
          '<div class="chat-list-item">$1</div>',
        )

        // single line break
        .replace(/\n/g, "<br/>")
    );
  };

  const courseMap = {
    CS: "Computer Science",
    IT: "IT",
    ECE: "Electronics",
    ME: "Mechanical",
    CE: "Civil",
    "AI/ML": "AI & ML",
    DS: "Data Science",
  };

  return (
    <div className={`chat-layout ${!showRightPanel ? "full" : ""}`}>
      {/* ===== SIDEBAR ===== */}
      <div className="chat-sidebar">
        <h4>AI COUNSELLOR</h4>
        <p className="sub">Refine your search parameters</p>

        {/* SEARCH */}
        <input
          className="chat-filter-search"
          placeholder="🔍 Search parameters..."
        />

        {/* STATE */}
        <label>STATE</label>
        <select
          value={filters.state}
          onChange={(e) => setFilters({ ...filters, state: e.target.value })}
        >
          <option value="">All States</option>
          <option value="Delhi">Delhi</option>
          <option value="Haryana">Haryana</option>
          <option value="UP">UP</option>
        </select>

        {/* BRANCH CHIPS */}
        <label>BRANCH</label>
        <div className="chat-chips">
          {["CS", "IT", "ECE", "ME", "CE", "AI/ML", "DS"].map((b) => (
            <button
              key={b}
              className={filters.course === courseMap[b] ? "active" : ""}
              onClick={() => setFilters({ ...filters, course: courseMap[b] })}
            >
              {b}
            </button>
          ))}
        </div>

        {/* EXAMS */}
        <label>ENTRANCE EXAM</label>
        <select>
          <option>All Exams</option>
          <option>JEE</option>
          <option>CUET</option>
        </select>

        {/* FEES SLIDER */}
        <label>MAX FEES</label>

        <div className="chat-fee-wrapper">
          <div
            className="chat-fee-bubble"
            style={{
              left: `${((filters.budget || 400000) / 400000) * 100}%`,
            }}
          >
            ₹{((filters.budget || 400000) / 100000).toFixed(1)}L
          </div>

          <input
            type="range"
            min="0"
            max="400000"
            value={filters.budget || 400000}
            onChange={(e) =>
              setFilters({
                ...filters,
                budget: parseInt(e.target.value, 10) || 400000,
              })
            }
            className="chat-range"
          />

          <div className="chat-fee-labels">
            <span>₹0</span>
            <span>₹4L</span>
          </div>
        </div>

        <button
          className="chat-apply-btn"
          onClick={applyFilters}
          disabled={filterLoading}
        >
          {filterLoading ? "Applying..." : "Apply Filters"}
        </button>
      </div>

      {/* ===== MAIN CHAT ===== */}
      <div className="chat-main">
        {/* ===== HERO MODE (NO CHAT YET) ===== */}
        {rsChatLoading ? (
          <div className="chat-hero-section">
            <div className="rs-chat-skeleton-logo"></div>
            <div className="rs-chat-skeleton-title"></div>
            <div className="rs-chat-skeleton-desc"></div>

            <div className="rs-chat-skeleton-suggestions">
              <div></div>
              <div></div>
              <div></div>
            </div>

            <div className="rs-chat-skeleton-input"></div>
          </div>
        ) : messages.length === 0 ? (
          <div className="chat-hero-section">
            <div className="chat-hero-logo">
              <GraduationCap size={40} />
            </div>

            <h1>Welcome to R.S Education</h1>
            <p>
              Your personal AI counselor for discovering the best opportunities.
            </p>

            <div className="chat-hero-suggestions">
              <button onClick={() => sendMessage("JEE rank 25000")}>
                JEE rank 25000
              </button>
              <button onClick={() => sendMessage("Best B.Tech in Haryana")}>
                Best B.Tech in Haryana
              </button>
              <button onClick={() => sendMessage("Compare DTU vs NSUT")}>
                Compare DTU vs NSUT
              </button>
            </div>

            <div className="chat-hero-input">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask AI Mentor anything..."
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
              <button
                onClick={startListening}
                className={`chat-mic-btn ${listening ? "active" : ""}`}
              >
                <Mic size={24} />
              </button>
              <button
                onClick={() => sendMessage()}
                disabled={!input.trim() || loading}
              >
                {loading ? "..." : <Send size={16} />}
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* ===== NORMAL CHAT ===== */}
            <div className="chat-header">
              <h2>AI Career Counsellor</h2>
              <button onClick={clearChat}>Clear</button>
            </div>

            <div
              className="chat-toggle-btn"
              onClick={() => setShowRightPanel(!showRightPanel)}
            >
              {showRightPanel ? <ChevronRight /> : <ChevronLeft />}
            </div>

            <div className="chat-box">
              {messages.map((msg, i) => {
                if (msg.type === "cards") {
                  return (
                    <div key={i} className="chat-college-cards">
                      {msg.data.map((c, index) => (
                        <div
                          key={c.id}
                          className="chat-college-list-card"
                          onClick={() => setSelectedCollege(c)}
                        >
                          <div className="chat-rank">{index + 1}</div>

                          <div className="chat-college-info">
                            <h3>{c.name}</h3>

                            <div className="chat-tags">
                              <span>{c.city}</span>
                              <span>{c.type}</span>
                              <span>NAAC {c.naac_grade}</span>
                            </div>
                          </div>

                          <div className="chat-college-stats">
                            <p>₹{c.fees_per_year}/yr</p>
                            <p>{c.placement_avg_lpa} LPA avg</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                }

                return (
                  <div key={i} className={`chat-msg ${msg.sender}`}>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: formatMessage(msg.text),
                      }}
                    />
                    <span className="chat-msg-time">{msg.time}</span>
                  </div>
                );
              })}

              {loading && (
                <div className="chat-msg bot typing">
                  <div className="chat-typing-bubble">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              )}

              <div ref={chatEndRef}></div>
            </div>

            {/* INPUT */}
            <div className="chat-input">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask AI anything..."
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
              <button
                onClick={startListening}
                className={`chat-mic-btn ${listening ? "active" : ""}`}
              >
                <Mic size={20} />
              </button>
              <button
                onClick={() => sendMessage()}
                disabled={!input.trim() || loading}
              >
                {loading ? "..." : <Send size={18} />}
              </button>
            </div>
          </>
        )}
      </div>

      {/* ===== RIGHT PANEL ===== */}
      <div className="chat-right-panel">
        {/* ===== TABS ===== */}
        <div className="chat-right-tabs">
          <button
            className={activeTab === "stats" ? "active" : ""}
            onClick={() => setActiveTab("stats")}
          >
            Stats
          </button>

          <button
            className={activeTab === "exams" ? "active" : ""}
            onClick={() => setActiveTab("exams")}
          >
            Exams
          </button>

          <button
            className={activeTab === "aid" ? "active" : ""}
            onClick={() => setActiveTab("aid")}
          >
            Aid
          </button>
        </div>

        {/* ===== CONTENT ===== */}
        <div className="chat-right-content">
          {rsChatLoading ? (
            <>
              <div className="rs-chat-skeleton-card"></div>
              <div className="rs-chat-skeleton-card"></div>
              <div className="rs-chat-skeleton-card"></div>
            </>
          ) : (
            <>
              {activeTab === "stats" && (
                <>
                  <div className="chat-stat-card">
                    <h4>SUCCESS</h4>
                    <h2>{stats.highest}</h2>
                    <p>Highest Package</p>
                  </div>

                  <div className="chat-stat-card">
                    <h4>EFFICIENCY</h4>
                    <h2>{stats.lowestFees}</h2>
                    <p>Lowest Fees</p>
                  </div>

                  <div className="chat-stat-card">
                    <h4>QUALITY SCORE</h4>
                    <h2>{stats.avgPlacement}</h2>
                    <p>Best Avg Placement</p>
                  </div>
                </>
              )}

              {activeTab === "exams" && (
                <div className="chat-exam-list">
                  {exams.map((e, i) => (
                    <div key={i} className="chat-exam-card">
                      <h3 className="chat-exam-title">{e.name}</h3>

                      <div className="chat-exam-row">
                        <Building2 size={20} />
                        <div>
                          <p className="chat-exam-label">Conducting Body</p>
                          <p>{e.conducting_body}</p>
                        </div>
                      </div>

                      <div className="chat-exam-row">
                        <Calendar size={18} />
                        <div>
                          <p className="chat-exam-label">Frequency</p>
                          <p>{e.frequency}</p>
                        </div>
                      </div>

                      <div className="chat-exam-row">
                        <Monitor size={18} />
                        <div>
                          <p className="chat-exam-label">Mode</p>
                          <p>{e.mode}</p>
                        </div>
                      </div>

                      <div className="chat-exam-row">
                        <GraduationCap size={20} />
                        <div>
                          <p className="chat-exam-label">Eligibility</p>
                          <p>{e.eligibility}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "aid" && (
                <div className="chat-aid-container">
                  {/* CENTRAL */}
                  <h3 className="chat-aid-heading">Central Schemes</h3>

                  <div className="chat-aid-list">
                    {aid.central_schemes.map((s) => (
                      <div key={s.name} className="chat-aid-card premium">
                        <div className="chat-aid-title">
                          <h4>{s.name}</h4>
                          <IndianRupee size={18} className="chat-icon" />
                        </div>

                        <div className="chat-aid-row">
                          <TrendingUp size={18} className="chat-row-icon" />
                          <div>
                            <p className="chat-aid-label">BENEFIT</p>
                            <p>{s.amount}</p>
                          </div>
                        </div>

                        <div className="chat-aid-row">
                          <User size={18} className="chat-row-icon" />
                          <div>
                            <p className="chat-aid-label">ELIGIBILITY</p>
                            <p>{s.eligibility}</p>
                          </div>
                        </div>

                        <div className="chat-aid-row">
                          <Link size={18} className="chat-row-icon" />
                          <div>
                            <p className="chat-aid-label">APPLY VIA</p>
                            <p>scholarships.gov.in</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* STATE */}
                  <h3 className="chat-aid-heading">State Schemes</h3>

                  <div className="chat-aid-list state-aid">
                    {Object.entries(aid.state_schemes || {}).map(
                      ([state, desc]) => (
                        <div key={state} className="chat-state-card">
                          <div className="chat-state-title">
                            <Landmark size={20} className="chat-state-icon" />
                            <h4>{state}</h4>
                          </div>

                          <p className="chat-state-desc">{desc}</p>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
