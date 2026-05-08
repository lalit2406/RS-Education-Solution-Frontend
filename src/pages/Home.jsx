import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/pages/home.css";
import Footer from "../../src/components/layout/Footer";
import OurPartner from "../components/layout/OurPartner";
import SuccessStories from "../components/layout/SuccessStories";
import TopCollegesSection from "../components/home/TopCollegesSection";
import TopStudyPlaces from "../components/home/TopStudyPlaces";
import collegesData from "../data/colleges.json";
import { FaMoneyBillWave, FaHeadphones, FaStar } from "react-icons/fa6";

import {
  Bot,
  BotMessageSquare,
  FileText,
  GraduationCap,
  Sparkles,
  Search,
  ArrowRight,
  Brain,
  Users,
  ListChecks,
  UserRoundCheck,
  Target,
  CircleDollarSign,
} from "lucide-react";

/* HERO IMAGES */
const rsHeroSlides = [
  "/images/home/college1.webp",
  "/images/home/college2.webp",
  "/images/home/college3.webp",
  "/images/home/college4.webp",
  "/images/home/college5.webp",
];

const rsHeroTitles = [
  {
    line1: "Find the Right College,",
    line2: "Course & Future",
  },
  {
    line1: "Choose the Best University,",
    line2: "Dream & Success",
  },
  {
    line1: "Discover Smart Programs,",
    line2: "Skills & Growth",
  },
  {
    line1: "Build Your Bright Career,",
    line2: "Goals & Future",
  },
];

const Home = () => {
  const featuredPrograms = [
    {
      id: 1,
      category: "Engineering",
      title: "Computer Science",
      desc: "AI, coding and modern software systems.",
      image: "/images/home/Computer_Science.webp",
    },

    {
      id: 2,
      category: "Engineering",
      title: "AI & Machine Learning",
      desc: "Build smart systems using modern AI.",
      image: "/images/home/AI_ML.webp",
    },

    {
      id: 3,
      category: "Engineering",
      title: "Cyber Security",
      desc: "Protect systems from cyber threats.",
      image: "/images/home/Cyber_Security.webp",
    },

    {
      id: 4,
      category: "Engineering",
      title: "Electronics & Communication",
      desc: "Work with embedded and communication systems.",
      image: "/images/home/Electronics_Communication.webp",
    },

    {
      id: 5,
      category: "Management",
      title: "MBA in Finance",
      desc: "Learn investments, banking and finance.",
      image: "/images/home/MBA_Finance.webp",
    },

    {
      id: 6,
      category: "Management",
      title: "MBA in Marketing",
      desc: "Master branding and market strategy.",
      image: "/images/home/MBA_Marketing.webp",
    },

    {
      id: 7,
      category: "Medical",
      title: "MBBS",
      desc: "Become a doctor and healthcare professional.",
      image: "/images/home/medical.webp",
    },

    {
      id: 8,
      category: "Technology",
      title: "Data Science",
      desc: "Analyze data and build predictive systems.",
      image: "/images/home/Data_Science.webp",
    },
  ];

  const [rsCurrentSlide, setRsCurrentSlide] = useState(0);
  const [rsHeroMode, setRsHeroMode] = useState("grid");
  const [rsTitleIndex, setRsTitleIndex] = useState(0);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSuggestion, setActiveSuggestion] = useState(-1);
  const suggestionRefs = useRef([]);
  const suggestions = [
    /* COLLEGE NAMES */
    ...collegesData.colleges.map((college) => college.name),

    /* CITIES */
    ...collegesData.colleges.map((college) => college.city),

    /* STATES */
    ...collegesData.colleges.map((college) => college.state),

    /* COURSES */
    ...collegesData.colleges.flatMap((college) => college.courses || []),

    /* BRANCHES */
    ...collegesData.colleges.flatMap((college) => college.branches || []),
  ];

  const filteredSuggestions = searchQuery.trim()
    ? [
        ...new Set(
          suggestions
            .filter(
              (item) =>
                item && item.toLowerCase().includes(searchQuery.toLowerCase()),
            )

            .sort((a, b) => {
              const aStarts = a
                .toLowerCase()
                .startsWith(searchQuery.toLowerCase());

              const bStarts = b
                .toLowerCase()
                .startsWith(searchQuery.toLowerCase());

              if (aStarts && !bStarts) return -1;

              if (!aStarts && bStarts) return 1;

              return a.length - b.length;
            }),
        ),
      ]
    : [];

  const handleSearch = () => {
    if (!searchQuery.trim()) return;

    navigate(`/find-college?search=${encodeURIComponent(searchQuery)}`);
  };

  useEffect(() => {
    if (activeSuggestion >= 0 && suggestionRefs.current[activeSuggestion]) {
      suggestionRefs.current[activeSuggestion].scrollIntoView({
        block: "nearest",
        behavior: "smooth",
      });
    }
  }, [activeSuggestion]);

  useEffect(() => {
    const titleTimer = setInterval(() => {
      setRsTitleIndex((prev) =>
        prev === rsHeroTitles.length - 1 ? 0 : prev + 1,
      );
    }, 4000);

    return () => clearInterval(titleTimer);
  }, []);

  /* HERO ANIMATION */
  useEffect(() => {
    const firstTimer = setTimeout(() => {
      setRsHeroMode("single");
      setRsCurrentSlide(0);
    }, 4000);

    return () => clearTimeout(firstTimer);
  }, []);

  useEffect(() => {
    if (rsHeroMode !== "single") return;

    const slider = setInterval(() => {
      setRsCurrentSlide((prev) =>
        prev === rsHeroSlides.length - 1 ? 0 : prev + 1,
      );
    }, 4000);

    return () => clearInterval(slider);
  }, [rsHeroMode]);

  return (
    <div className="rs-home-wrapper">
      <main className="rs-home-main-content">
        {/* HERO */}
        <section className="rs-home-hero-banner">
          {/* BACKGROUND */}
          <div className="rs-home-hero-bg-layer">
            {rsHeroMode === "grid" ? (
              <div className="rs-home-hero-grid-view">
                <div
                  className="rs-home-grid-img"
                  style={{
                    backgroundImage: `url(${rsHeroSlides[0]})`,
                  }}
                />
                <div
                  className="rs-home-grid-img"
                  style={{
                    backgroundImage: `url(${rsHeroSlides[1]})`,
                  }}
                />
                <div
                  className="rs-home-grid-img"
                  style={{
                    backgroundImage: `url(${rsHeroSlides[2]})`,
                  }}
                />
                <div
                  className="rs-home-grid-img"
                  style={{
                    backgroundImage: `url(${rsHeroSlides[3]})`,
                  }}
                />
              </div>
            ) : (
              rsHeroSlides.map((img, index) => (
                <div
                  key={index}
                  className={`rs-home-single-slide ${
                    index === rsCurrentSlide ? "rs-home-slide-active" : ""
                  }`}
                  style={{
                    backgroundImage: `url(${img})`,
                  }}
                />
              ))
            )}
          </div>

          {/* DARK OVERLAY */}
          <div className="rs-home-hero-dark-layer"></div>

          {/* CONTENT */}
          <div className="rs-home-hero-overlay">
            <div className="rs-home-badge">✨ Trusted by 5,000+ Students</div>

            <h1
              key={rsTitleIndex}
              className="rs-home-hero-main-title rs-home-title-animate"
            >
              <span className="rs-line-one">
                {rsHeroTitles[rsTitleIndex].line1}
              </span>

              <span className="rs-line-two">
                {rsHeroTitles[rsTitleIndex].line2}
              </span>
            </h1>

            <p className="rs-home-hero-subtitle">
              AI-powered guidance, scholarships, admissions support, and
              personalized career solutions for every student.
            </p>

            <div className="rs-home-search-box">
              <Search size={20} />

              <input
                type="text"
                placeholder="Search colleges, exams, scholarships, programs..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);

                  setActiveSuggestion(-1);
                }}
                onKeyDown={(e) => {
                  /* DOWN */
                  if (e.key === "ArrowDown") {
                    e.preventDefault();

                    setActiveSuggestion((prev) =>
                      prev < filteredSuggestions.length - 1 ? prev + 1 : 0,
                    );
                  } else if (e.key === "ArrowUp") {
                    /* UP */
                    e.preventDefault();

                    setActiveSuggestion((prev) =>
                      prev > 0 ? prev - 1 : filteredSuggestions.length - 1,
                    );
                  } else if (e.key === "Enter") {
                    /* ENTER */
                    /* Select active suggestion */
                    if (
                      activeSuggestion >= 0 &&
                      filteredSuggestions[activeSuggestion]
                    ) {
                      const selected = filteredSuggestions[activeSuggestion];

                      setSearchQuery(selected);

                      navigate(
                        `/find-college?search=${encodeURIComponent(selected)}`,
                      );
                    } else {
                      /* Normal search */
                      handleSearch();
                    }
                  }
                }}
              />

              <button onClick={handleSearch}>Search</button>

              {searchQuery && filteredSuggestions.length > 0 && (
                <div className="rs-home-search-suggestions">
                  {filteredSuggestions.map((item, index) => (
                    <div
                      key={item}
                      ref={(el) => (suggestionRefs.current[index] = el)}
                      className={`rs-home-suggestion-item ${
                        activeSuggestion === index ? "active" : ""
                      }`}
                      onClick={() => {
                        setSearchQuery(item);

                        navigate(
                          `/find-college?search=${encodeURIComponent(item)}`,
                        );
                      }}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="rs-home-hero-mini-stats">
              <div>⭐ 4.9 Rating</div>
              <div>🎓 1500+ Colleges</div>
              <div>💰 1200+ Scholarships</div>
            </div>
          </div>
        </section>

        {/* ================= FEATURED PROGRAMS ================= */}
        <section className="rs-home-program-preview">
          {/* Top Header */}
          <div className="rs-home-program-top">
            <div className="rs-home-program-heading">
              <h2>Featured Programs</h2>
              <p>
                Explore career-focused programs designed for future success.
              </p>
            </div>
            <button
              className="rs-home-program-viewall"
              onClick={() => {
                navigate("/programs");

                setTimeout(() => {
                  const section = document.querySelector(".rs-program-section");
                  if (section) {
                    section.scrollIntoView({ behavior: "smooth" });
                  }
                }, 100);
              }}
            >
              View All Programs
            </button>
          </div>

          {/* Cards */}
          <div className="rs-home-program-slider">
            {featuredPrograms.map((item) => (
              <div className="rs-home-program-preview-card" key={item.id}>
                <div className="rs-home-program-image-wrap">
                  <img src={item.image} alt={item.title} loading="lazy" />
                </div>

                <div className="rs-home-program-content">
                  <span className="rs-home-program-badge">{item.category}</span>

                  <h3>{item.title}</h3>

                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* WHY CHOOSE */}
        <section className="rs-home-highlights">
          <div className="rs-home-container">
            <div className="rs-home-section-header">
              <h2>Why Choose R. S Education?</h2>
              <p>
                Trusted guidance powered by experience, technology, and student
                success.
              </p>
            </div>

            <div className="rs-home-stats-grid">
              <div className="rs-home-stat-item">
                <span className="rs-home-stat-icon">
                  <GraduationCap size={26} />
                </span>
                <h3>2000+</h3>
                <p>GLOBAL COLLEGES</p>
              </div>

              <div className="rs-home-stat-item">
                <span className="rs-home-stat-icon">
                  <FaMoneyBillWave size={24} />
                </span>
                <h3>1200+</h3>
                <p>SCHOLARSHIPS</p>
              </div>

              <div className="rs-home-stat-item">
                <span className="rs-home-stat-icon">
                  <FaHeadphones size={24} />
                </span>
                <h3>24/7</h3>
                <p>COUNSELING</p>
              </div>

              <div className="rs-home-stat-item">
                <span className="rs-home-stat-icon">
                  <Bot size={28} />
                </span>
                <h3>AI</h3>
                <p>GUIDANCE</p>
              </div>
            </div>
          </div>
        </section>

        {/* PARTNERS */}
        <OurPartner />
        <TopCollegesSection />
        <TopStudyPlaces />

        {/* ABOUT */}
        <section className="rs-home-about rs-home-container">
          <div className="rs-home-about-left">
            <div className="rs-home-about-img-card">
              <img
                src="/images/home/college2.webp"
                alt="About"
                loading="lazy"
              />
            </div>
          </div>

          <div className="rs-home-about-right">
            <h2>Redefining Education Consulting for the Digital Age</h2>

            <p>
              Every student deserves a personalized roadmap. We combine
              traditional counseling with AI tools.
            </p>

            <ul className="rs-home-about-list">
              <li>✔ Personalized mentorship</li>
              <li>✔ Global university partnerships</li>
              <li>✔ Visa & document support</li>
            </ul>

            <button className="rs-home-link-btn">
              Learn Our Story
              <ArrowRight size={18} />
            </button>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <SuccessStories />
      </main>

      <Footer />
    </div>
  );
};

export default Home;
