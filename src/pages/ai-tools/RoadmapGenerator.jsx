import React, { useState, useEffect } from "react";
import "../../styles/ai-tools/RoadmapGenerator.css";
import { Tv, BookOpen, GraduationCap } from "lucide-react";

export default function RoadmapGenerator() {
  const [formData, setFormData] = useState({
    career_field: "",
    current_level: "",
    specific_goal: "",
  });

  const [roadmapData, setRoadmapData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [rsRoadmapLoading, setRsRoadmapLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    // no initial API → instant load
    setRsRoadmapLoading(false);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (
      !formData.career_field ||
      !formData.current_level ||
      !formData.specific_goal
    ) {
      alert("Fill all fields");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(import.meta.env.VITE_ROADMAPGENERATOR_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      setRoadmapData(data);
    } catch (err) {
      alert("Error generating roadmap");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setRoadmapData(null);
    setFormData({
      career_field: "",
      current_level: "",
      specific_goal: "",
    });
  };

  return (
    <div className="roadmapGen-container">
      {rsRoadmapLoading ? (
        <div className="roadmapGen-formWrapper">
          <div className="roadmapGen-formCard">
            <div className="rs-rm-skeleton-title"></div>
            <div className="rs-rm-skeleton-desc"></div>

            <div className="rs-rm-skeleton-input"></div>
            <div className="rs-rm-skeleton-input"></div>
            <div className="rs-rm-skeleton-input"></div>

            <div className="rs-rm-skeleton-btn"></div>
          </div>
        </div>
      ) : !roadmapData ? (
        /* ================= FORM ================= */
        <div className="roadmapGen-formWrapper">
          <div className="roadmapGen-formCard">
            <h2 className="roadmapGen-title">Roadmap AI</h2>
            <p className="roadmapGen-sub">Build your career strategy with AI</p>

            <div className="roadmapGen-inputGroup">
              <label>Career Goal</label>
              <input
                name="career_field"
                placeholder="Artificial Intelligence & Data Science"
                value={formData.career_field}
                onChange={handleChange}
              />
            </div>

            <div className="roadmapGen-inputGroup">
              <label>Experience Level</label>
              <input
                name="current_level"
                placeholder="College Student / Beginner"
                value={formData.current_level}
                onChange={handleChange}
              />
            </div>

            <div className="roadmapGen-inputGroup">
              <label>Specific Target</label>
              <input
                name="specific_goal"
                placeholder="TCS / Startup / FAANG"
                value={formData.specific_goal}
                onChange={handleChange}
              />
            </div>

            <button className="roadmapGen-btnPrimary" onClick={handleSubmit}>
              {loading ? "Generating..." : "Generate Strategy"}
            </button>
          </div>
        </div>
      ) : (
        /* ================= RESULT ================= */
        <div className="roadmapGen-resultWrapper">
          {/* TOP */}
          <div className="roadmapGen-topBar">
            <h1>{roadmapData.title}</h1>
            <button className="roadmapGen-newBtn" onClick={resetForm}>
              New Roadmap
            </button>
          </div>

          <p className="roadmapGen-description">{roadmapData.description}</p>

          {/* SALARY CARDS */}
          <div className="roadmapGen-salaryCards">
            <div className="roadmapGen-salaryCard">
              <p>Entry Salary</p>
              <h3>{roadmapData.salary.entry}</h3>
            </div>

            <div className="roadmapGen-salaryCard">
              <p>Mid Salary</p>
              <h3>{roadmapData.salary.mid}</h3>
            </div>

            <div className="roadmapGen-salaryCard">
              <p>Senior Salary</p>
              <h3>{roadmapData.salary.senior}</h3>
            </div>

            <div className="roadmapGen-salaryCard highlight">
              <p>Market Demand</p>
              <h3>{roadmapData.salary.demand}</h3>
            </div>
          </div>

          {/* RECRUITERS */}
          <div className="roadmapGen-section">
            <h3>Top Employers</h3>
            <div className="roadmapGen-tags">
              {roadmapData.top_recruiters.map((r, i) => (
                <span key={i} className="roadmapGen-tag">
                  {r}
                </span>
              ))}
            </div>
          </div>

          {/* TIMELINE */}
          <div className="roadmapGen-timeline">
            {roadmapData.roadmap_steps.map((step, index) => (
              <div key={index} className="roadmapGen-timelineItem">
                <div className="roadmapGen-timelineDot"></div>

                <div className="roadmapGen-stepContent">
                  <div className="roadmapGen-stepHeader">
                    <span>
                      Stage {step.step_number}: {step.stage}
                    </span>
                    <span>{step.duration}</span>
                  </div>

                  <h2>{step.title}</h2>

                  <div className="roadmapGen-stepGrid">
                    {/* LEFT */}
                    <div>
                      <h4>Priority Actions</h4>
                      <ul>
                        {step.actions.map((a, i) => (
                          <li key={i}>✔ {a}</li>
                        ))}
                      </ul>
                    </div>

                    {/* RIGHT */}
                    <div>
                      <h4>Skills & Milestones</h4>

                      {step.key_exams.map((exam, i) => (
                        <div key={i} className="roadmapGen-examBox">
                          <strong>{exam.name}</strong>
                          <p>{exam.note}</p>
                        </div>
                      ))}

                      <div className="roadmapGen-tags">
                        {step.skills_with_duration.map((s, i) => (
                          <span key={i} className="roadmapGen-skillTag">
                            {s.name} ({s.duration})
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* BOTTOM GRID */}
          <div className="roadmapGen-bottomGrid">
            {/* ALTERNATIVE PATHS */}
            <div className="roadmapGen-altCard">
              <div className="roadmapGen-cardHeader">
                <span className="roadmapGen-dot"></span>
                <h3>Alternative Paths</h3>
              </div>

              {roadmapData.alternative_paths.map((alt, i) => (
                <div key={i} className="roadmapGen-listItem">
                  <h4>{alt.title}</h4>
                  <p>{alt.description}</p>
                </div>
              ))}
            </div>

            {/* LEARNING RESOURCES */}
            <div className="roadmapGen-altCard">
              <div className="roadmapGen-cardHeader">
                <span className="roadmapGen-dot"></span>
                <h3>Recommended Learning Stack</h3>
              </div>

              {roadmapData.learning_resources.map((res, i) => (
                <div key={i} className="roadmapGen-resourceItem">
                  <div className="roadmapGen-iconBox">
                    {res.type === "YouTube" && <Tv size={20} />}
                    {res.type === "Book" && <BookOpen size={20} />}
                    {res.type === "Site" && <GraduationCap size={20} />}
                  </div>

                  <div>
                    <h4>
                      {res.title}{" "}
                      <span className="roadmapGen-type">[{res.type}]</span>
                    </h4>
                    <p>{res.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
