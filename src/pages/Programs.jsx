import { useState } from "react";
import "../../src/styles/pages/programs.css";
import Footer from "../components/layout/Footer";
import CounsellingModal from "../components/dashboard/CounsellingModal";

export default function Program() {
  // ✅ STATE
  const [activeCategory, setActiveCategory] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState("");

  // ✅ PROGRAM DATA (moved from static JSX → dynamic)
  const programs = [
    {
      id: 1,
      category: "Engineering",
      image: "/src/assets/images/engineering.png",
      title: "Advanced Robotics & AI",
      duration: "4 Years (8 Semesters)",
      eligibility: "10+2 with Physics & Math",
      career: "AI Engineer, Robotics Expert",
    },
    {
      id: 2,
      category: "Medical",
      image: "/src/assets/images/medical.png",
      title: "Pre-Medical Excellence",
      duration: "2 Years Intensive",
      eligibility: "10+2 with Biology",
      career: "NEET Preparation & Beyond",
    },
    {
      id: 3,
      category: "Management",
      image: "/src/assets/images/management.png",
      title: "Global Business Strategy",
      duration: "2 Years (4 Semesters)",
      eligibility: "Graduation in any stream",
      career: "Manager, Consultant",
    },
    {
      id: 4,
      category: "Arts & Commerce",
      image: "/src/assets/images/arts.png",
      title: "Digital Media & Arts",
      duration: "3 Years",
      eligibility: "10+2 (Any Stream)",
      career: "UI/UX Designer",
    },
    {
      id: 5,
      category: "Govt Exam Prep",
      image: "/src/assets/images/govt.png",
      title: "Civil Services Mastery",
      duration: "1 Year",
      eligibility: "Graduates",
      career: "IAS, IPS",
    },
    {
      id: 6,
      category: "Online Courses",
      image: "/src/assets/images/online.png",
      title: "Data Science Specialization",
      duration: "6 Months",
      eligibility: "Basic Statistics",
      career: "Data Analyst",
    },
  ];

  // ✅ FILTER LOGIC
  const filteredPrograms =
    activeCategory === "All"
      ? programs
      : programs.filter((p) => p.category === activeCategory);

  return (
    <>
      <div className="program-page">
        {/* HERO SECTION */}
        <section className="program-hero">
          <div className="program-hero-left">
            <span className="program-badge">✨ Curated Excellence</span>

            <h1 className="program-title">
              Shape Your <span>Future</span> Path.
            </h1>

            <p className="program-desc">
              Navigate through a sanctuary of educational opportunities. We
              connect ambitious students with premier institutions across
              Engineering, Medicine, and Management.
            </p>

            <div className="program-hero-buttons">
              <button className="program-btn primary">View All Courses</button>
              <button className="program-btn secondary">
                Speak to Counselor
              </button>
            </div>
          </div>

          <div className="program-hero-right">
            <img
              src="/src/assets/images/student-success.png"
              alt="student success"
            />
          </div>
        </section>

        {/* CATEGORY FILTER */}
        <section className="program-categories">
          <button
            className={activeCategory === "All" ? "active" : ""}
            onClick={() => setActiveCategory("All")}
          >
            All Categories
          </button>

          <button
            className={activeCategory === "Engineering" ? "active" : ""}
            onClick={() => setActiveCategory("Engineering")}
          >
            Engineering
          </button>

          <button
            className={activeCategory === "Medical" ? "active" : ""}
            onClick={() => setActiveCategory("Medical")}
          >
            Medical
          </button>

          <button
            className={activeCategory === "Management" ? "active" : ""}
            onClick={() => setActiveCategory("Management")}
          >
            Management
          </button>

          <button
            className={activeCategory === "Arts & Commerce" ? "active" : ""}
            onClick={() => setActiveCategory("Arts & Commerce")}
          >
            Arts & Commerce
          </button>

          <button
            className={activeCategory === "Govt Exam Prep" ? "active" : ""}
            onClick={() => setActiveCategory("Govt Exam Prep")}
          >
            Govt Exam Prep
          </button>

          <button
            className={activeCategory === "Online Courses" ? "active" : ""}
            onClick={() => setActiveCategory("Online Courses")}
          >
            Online Courses
          </button>
        </section>

        {/* COURSES GRID */}
        <section className="program-courses">
          {filteredPrograms.map((program) => (
            <div className="program-card" key={program.id}>
              <img src={program.image} alt="" />
              <div className="program-card-content">
                <span className="program-tag">{program.category}</span>
                <h3>{program.title}</h3>

                <p>
                  <strong>Duration:</strong> {program.duration}
                </p>
                <p>
                  <strong>Eligibility:</strong> {program.eligibility}
                </p>
                <p>
                  <strong>Career Opportunities:</strong> {program.career}
                </p>

                <button
                  onClick={() => {
                    setSelectedProgram(program.title);
                    setIsModalOpen(true);
                  }}
                >
                  Get Guidance
                </button>
              </div>
            </div>
          ))}
        </section>

        {/* PHILOSOPHY SECTION */}
        <section className="program-philosophy">
          <div className="program-philo-image">
            <img src="/src/assets/images/office.png" alt="" />
          </div>

          <div className="program-philo-content">
            <h2>
              Our Philosophy of <span>Precision.</span>
            </h2>

            <p>
              We don't just provide admissions; we curate journeys. Each student
              is matched with a program through a rigorous evaluation of
              aptitude, ambition, and institutional culture.
            </p>

            <div className="program-stats">
              <div>
                <h3>500+</h3>
                <span>Global Partners</span>
              </div>
              <div>
                <h3>12k+</h3>
                <span>Successful Alumni</span>
              </div>
            </div>
          </div>
        </section>

        <CounsellingModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          program={selectedProgram}
        />
      </div>
      <Footer />
    </>
  );
}
