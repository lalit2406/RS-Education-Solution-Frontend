import { useRef, useState, useEffect } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import programsData from "../data/programsData";
import ProgramGuidanceModal from "../components/programs/ProgramGuidanceModal";
import Footer from "../components/layout/Footer";
import "../../src/styles/pages/programs.css";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import SEO from "../components/seo/SEO";

export default function Program() {
  const navigate = useNavigate();
  const { user } = useUser();
  /* =====================================
     LOADING STATE
  ===================================== */
  const [rsProgramLoading, setRsProgramLoading] = useState(true);

  /* =====================================
     MODAL STATE
  ===================================== */
  const [rsProgramModalOpen, setRsProgramModalOpen] = useState(false);
  // const [images, setImages] = useState({});
  const [rsProgramSelectedCourse, setRsProgramSelectedCourse] = useState("");

  /* =====================================
   STATIC DATA LOADING (NO DELAY)
===================================== */
  useEffect(() => {
    requestAnimationFrame(() => {
      setRsProgramLoading(false);
    });
  }, []);

  const handleProtectedAction = (callback) => {
    if (!user) {
      navigate("/login");
      return;
    }

    callback();
  };

  /* =====================================
     REFS
  ===================================== */
  const rsProgramEngineeringRef = useRef(null);
  const rsProgramMedicalRef = useRef(null);
  const rsProgramOthersRef = useRef(null);

  /* =====================================
     DATA GROUPING
  ===================================== */
  const rsProgramEngineering = programsData.filter(
    (item) => item.category === "Engineering",
  );

  const rsProgramMedical = programsData.filter(
    (item) => item.category === "Medical",
  );

  const rsProgramOthers = programsData.filter(
    (item) => item.category === "Others",
  );

  /* =====================================
     OPEN / CLOSE MODAL
  ===================================== */
  const rsProgramOpenModal = (course) => {
    setRsProgramSelectedCourse(course);
    setRsProgramModalOpen(true);
  };

  const rsProgramCloseModal = () => {
    setRsProgramModalOpen(false);
    setRsProgramSelectedCourse("");
  };

  /* =====================================
     SCROLL
  ===================================== */
  const rsProgramScroll = (ref, direction) => {
    const amount = 340;

    if (ref.current) {
      ref.current.scrollBy({
        left: direction === "left" ? -amount : amount,
        behavior: "smooth",
      });
    }
  };

  /* =====================================
     TEXT HIGHLIGHT
  ===================================== */
  const rsProgramHighlightText = (text) => {
    const keywords = [
      "software",
      "AI",
      "data",
      "doctor",
      "healthcare",
      "finance",
      "design",
      "business",
      "research",
      "technology",
      "security",
      "cloud",
      "coding",
    ];

    const regex = new RegExp(`(${keywords.join("|")})`, "gi");

    return text.split(regex).map((part, index) =>
      keywords.some((word) => word.toLowerCase() === part.toLowerCase()) ? (
        <span key={index} className="rs-program-highlight">
          {part}
        </span>
      ) : (
        part
      ),
    );
  };

  /* =====================================
     CARD SECTION
  ===================================== */
  const rsProgramRenderSection = (title, data, ref) => (
    <section className="rs-program-section">
      <div className="rs-program-section-header">
        <h2 className="rs-program-section-title">{title}</h2>
      </div>

      <div className="rs-program-scroll-wrapper">
        {/* LEFT */}
        <button
          className="rs-program-arrow rs-program-arrow-left"
          onClick={() => rsProgramScroll(ref, "left")}
        >
          <FiChevronLeft />
        </button>

        {/* CARDS */}
        <div className="rs-program-scroll-container" ref={ref}>
          {rsProgramLoading
            ? Array(5)
                .fill(0)
                .map((_, index) => (
                  <div
                    className="rs-program-card rs-program-skeleton-card"
                    key={index}
                  >
                    <div className="rs-program-skeleton-img"></div>

                    <div className="rs-program-card-content">
                      <div className="rs-program-skeleton-tag"></div>
                      <div className="rs-program-skeleton-title"></div>
                      <div className="rs-program-skeleton-desc"></div>
                      <div className="rs-program-skeleton-btn"></div>
                    </div>
                  </div>
                ))
            : data.map((program) => (
                <div className="rs-program-card" key={program.id}>
                  <img src={program.image} alt={program.title} loading="lazy" />

                  <div className="rs-program-card-content">
                    <span className="rs-program-tag">{program.category}</span>

                    <h3 className="rs-program-card-title">{program.title}</h3>

                    <p className="rs-program-card-desc">
                      {program.description?.split("\n").map((line, index) => (
                        <span key={index}>
                          {rsProgramHighlightText(line)}
                          <br />
                        </span>
                      ))}
                    </p>

                    <button
                      className="rs-program-card-btn"
                      onClick={() => {
                        handleProtectedAction(() => {
                          rsProgramOpenModal(program.title);
                        });
                      }}
                    >
                      Get Guidance
                    </button>
                  </div>
                </div>
              ))}
        </div>

        {/* RIGHT */}
        <button
          className="rs-program-arrow rs-program-arrow-right"
          onClick={() => rsProgramScroll(ref, "right")}
        >
          <FiChevronRight />
        </button>
      </div>
    </section>
  );

  /* =====================================
     JSX
  ===================================== */
  return (
    <>
      <SEO
        title="Programs | RS Education"
        description="Explore Engineering, Medical, Management, Design and Technology programs with expert career guidance."
        keywords="engineering programs, medical courses, MBA programs, career guidance"
        url="https://rseducationsolution.in/programs"
        image="https://rseducationsolution.in/preview.webp"
      />
      <div className="rs-program-page">
        {/* HERO */}
        <section className="rs-program-hero">
          <div className="rs-program-hero-left">
            {rsProgramLoading ? (
              <>
                <div className="rs-program-skeleton-badge"></div>
                <div className="rs-program-skeleton-title-lg"></div>
                <div className="rs-program-skeleton-desc-lg"></div>
                <div className="rs-program-skeleton-btn-group"></div>
              </>
            ) : (
              <>
                <span className="rs-program-badge">✨ Curated Excellence</span>

                <h1 className="rs-program-title">
                  Shape Your <span>Future</span> Path.
                </h1>

                <p className="rs-program-desc">
                  Explore top programs across Engineering, Medical, Management,
                  Design, Law, Commerce and more. Get expert counselling to
                  choose the right career path with confidence.
                </p>

                <div className="rs-program-hero-buttons">
                  <button
                    className="rs-program-btn rs-program-btn-primary"
                    onClick={() =>
                      document
                        .getElementById("rs-program-sections")
                        .scrollIntoView({ behavior: "smooth" })
                    }
                  >
                    Explore Programs
                  </button>

                  <button
                    className="rs-program-btn rs-program-btn-secondary"
                    onClick={() => {
                      handleProtectedAction(() => {
                        rsProgramOpenModal("General Career Guidance");
                      });
                    }}
                  >
                    Speak to Counselor
                  </button>
                </div>
              </>
            )}
          </div>

          <div className="rs-program-hero-right">
            {rsProgramLoading ? (
              <div className="rs-program-skeleton-hero-img"></div>
            ) : (
              <img
                src="/images/home/student-success.webp"
                alt="Student"
                loading="eager"
              />
            )}
          </div>
        </section>

        {/* PROGRAM SECTIONS */}
        <div id="rs-program-sections">
          {rsProgramRenderSection(
            "Engineering Programs",
            rsProgramEngineering,
            rsProgramEngineeringRef,
          )}

          {rsProgramRenderSection(
            "Medical Programs",
            rsProgramMedical,
            rsProgramMedicalRef,
          )}

          {rsProgramRenderSection(
            "Other Programs",
            rsProgramOthers,
            rsProgramOthersRef,
          )}
        </div>

        {/* PHILOSOPHY (optional skeleton later) */}
        <section className="rs-program-philosophy">
          {rsProgramLoading ? (
            <>
              {/* IMAGE SKELETON */}
              <div className="rs-program-philo-image">
                <div className="rs-program-skeleton-philo-img"></div>
              </div>

              {/* CONTENT SKELETON */}
              <div className="rs-program-philo-content">
                <div className="rs-program-skeleton-philo-title"></div>
                <div className="rs-program-skeleton-philo-desc"></div>

                <div className="rs-program-skeleton-stats">
                  <div className="rs-program-skeleton-stat-box"></div>
                  <div className="rs-program-skeleton-stat-box"></div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="rs-program-philo-image">
                <img
                  src="/images/home/office.webp"
                  alt="Office"
                  loading="lazy"
                />
              </div>

              <div className="rs-program-philo-content">
                <h2>
                  Our Philosophy of <span>Precision.</span>
                </h2>

                <p>
                  We guide students toward the right career path through
                  structured counselling, practical advice, and deep
                  understanding of their goals.
                </p>

                <div className="rs-program-stats">
                  <div>
                    <h3>500+</h3>
                    <span>Partner Colleges</span>
                  </div>

                  <div>
                    <h3>12k+</h3>
                    <span>Students Guided</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </section>
      </div>

      {/* MODAL */}
      <ProgramGuidanceModal
        isOpen={rsProgramModalOpen}
        onClose={rsProgramCloseModal}
        selectedCourse={rsProgramSelectedCourse}
      />

      <Footer />
    </>
  );
}
