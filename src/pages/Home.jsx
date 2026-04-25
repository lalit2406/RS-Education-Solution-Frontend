import React, { useEffect, useState } from "react";
import "../styles/pages/home.css";
import Footer from "../../src/components/layout/Footer";
import OurPartner from "../components/layout/OurPartner";
import SuccessStories from "../components/layout/SuccessStories";
import TopCollegesSection from "../components/home/TopCollegesSection";
import TopStudyPlaces from "../components/home/TopStudyPlaces";

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
import heroImg1 from "../assets/images/college1.png";
import heroImg2 from "../assets/images/college2.png";
import heroImg3 from "../assets/images/college3.png";
import heroImg4 from "../assets/images/college4.png";
import heroImg5 from "../assets/images/college5.png";

const Home = () => {
  const rsHeroSlides = [heroImg1, heroImg2, heroImg3, heroImg4, heroImg5];

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

  const featuredPrograms = [
    {
      id: 1,
      category: "Engineering",
      title: "Computer Science",
      desc: "AI, coding and modern software systems.",
      image: "/src/assets/images/Computer_Science.png",
    },
    {
      id: 2,
      category: "Engineering",
      title: "Electronics",
      desc: "Embedded systems and smart hardware.",
      image: "/src/assets/images/Electrical.png",
    },
    {
      id: 3,
      category: "Engineering",
      title: "Mechanical",
      desc: "Machines, robotics and innovation.",
      image: "/src/assets/images/Mechanical.png",
    },
    {
      id: 4,
      category: "Business",
      title: "Management",
      desc: "Leadership, finance and growth strategy.",
      image: "/src/assets/images/MBA_BusinessAnalytics.png",
    },
    {
      id: 5,
      category: "Healthcare",
      title: "Medical",
      desc: "Healthcare, patient care and medicine.",
      image: "/src/assets/images/Medical.png",
    },
  ];

  const [rsCurrentSlide, setRsCurrentSlide] = useState(0);
  const [rsHeroMode, setRsHeroMode] = useState("grid");
  const [rsTitleIndex, setRsTitleIndex] = useState(0);

  /* Add inside useEffect section */

  useEffect(() => {
    const titleTimer = setInterval(() => {
      setRsTitleIndex((prev) =>
        prev === rsHeroTitles.length - 1 ? 0 : prev + 1,
      );
    }, 5600);

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
  }, [rsHeroMode, rsHeroSlides.length]);

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
              />

              <button>Search</button>
            </div>

            <div className="rs-home-hero-mini-stats">
              <div>⭐ 4.9 Rating</div>
              <div>🎓 5000+ Students</div>
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

            <button className="rs-home-program-viewall">
              View All Programs <ArrowRight size={18} />
            </button>
          </div>

          {/* Cards */}
          <div className="rs-home-program-slider">
            {featuredPrograms.map((item) => (
              <div className="rs-home-program-preview-card" key={item.id}>
                <div className="rs-home-program-image-wrap">
                  <img src={item.image} alt={item.title} />
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
              <img src={heroImg2} alt="About" />
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
