import React from "react";
import "../styles/pages/home.css";
import Footer from "../../src/components/layout/Footer";
import {
  Bot,
  BotMessageSquare,
  Sparkles,
  GraduationCap,
  BadgePercent,
  Headphones,
} from "lucide-react";
import OurPartner from "../components/layout/OurPartner";
import SuccessStories from "../components/layout/SuccessStories";

const Home = () => {
  return (
    <div className="rs-wrapper">
      <main className="rs-main-content">
        {/* Hero Section */}
        <section className="rs-hero container">
          <div className="rs-hero-text">
            <div className="rs-badge">✨ Future-Ready Education</div>
            <h1 className="rs-hero-title">
              Empowering Your Future with{" "}
              <span className="rs-italic">Smart Guidance</span>
            </h1>
            <p className="rs-hero-desc">
              Navigating the global education landscape with AI-powered insights
              and expert human counseling to find your perfect academic path.
            </p>
            <div className="rs-hero-actions">
              <button className="rs-btn-primary">Start AI Analysis</button>
              <button className="rs-btn-secondary">Explore Programs</button>
            </div>
          </div>
          <div className="rs-hero-image-area">
            <div className="rs-clay-card rs-hero-img-card">
              <img src="/src/assets/images/Student.png" alt="Student" />
            </div>
            <div className="rs-floating-card">
              <div>
                <BotMessageSquare size={32} />
                <p className="rs-float-title">AI-Powered</p>
                <p className="rs-float-subtitle">Real-time matching</p>
              </div>
            </div>
          </div>
        </section>

        {/* Highlights Section */}
        <section className="rs-highlights">
          <div className="container ">
            <div className="rs-section-header">
              <h2>Why Choose R. S Education?</h2>
              <p>Our commitment to excellence is reflected in our numbers.</p>
            </div>
            <div className="rs-stats-grid">
              <div className="rs-stat-item">
                <GraduationCap size={22} />
                <h3>200+</h3>
                <p>GLOBAL COLLEGES</p>
              </div>
              <div className="rs-stat-item">
                <BadgePercent size={22} />
                <h3>100%</h3>
                <p>SCHOLARSHIPS</p>
              </div>
              <div className="rs-stat-item">
                <Headphones size={22} />
                <h3>Expert</h3>
                <p>COUNSELING</p>
              </div>
              <div className="rs-stat-item">
                <Sparkles size={22} />
                <h3>AI-Led</h3>
                <p>GUIDANCE</p>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="rs-about rs-container">
          <div className="rs-about-left">
            <div className="rs-about-img-card">
              <img
                src="https://images.unsplash.com/photo-1551836022-d5d88e9218df"
                alt="meeting"
              />
            </div>
          </div>
          <div className="rs-about-right">
            <h2>About R. S Education Solution</h2>

            <p>
              Welcome to <strong>R.S Education Solution</strong>, your trusted
              partner in educational excellence. Founded and led by{" "}
              <strong>Sunil Sharma</strong>, we empower students to achieve
              their academic and career goals with confidence.
            </p>

            <p>
              With years of experience in the education sector, our expert
              counselors provide personalized guidance tailored to each
              student’s journey in today’s competitive environment.
            </p>

            <ul className="rs-about-list">
              <li>✔ Personalized career counseling & mentorship</li>
              <li>✔ Direct admission support in top colleges</li>
              <li>✔ Scholarship & financial assistance guidance</li>
              <li>✔ Competitive exam preparation support</li>
            </ul>

            <p>
              Our commitment to student success has made us a trusted choice for
              thousands of students and parents.
            </p>

            <button className="rs-link-btn">Learn Our Story →</button>
          </div>
        </section>

        <br />

        {/* AI Tools Section */}
        <section className="rs-ai-section">
          {/* HEADING CENTER */}
          <div className="rs-ai-header">
            <Bot size={60} />
            <h2>AI Tools Preview</h2>
            <p>
              Experience the future of college selection with our proprietary
              algorithmic tools designed for students.
            </p>
          </div>

          {/* TOOLS */}
          <div className="rs-ai-tools">
            <div className="rs-tool-card">
              <div className="rs-icon">📄</div>
              <h3>SOP Analyzer</h3>
              <p>
                Get instant feedback on your Statement of Purpose using our NLP
                model trained on successful applications.
              </p>
              <button className="rs-btn-primary">Try Now</button>
            </div>

            <div className="rs-tool-card">
              <div className="rs-icon">📅</div>
              <h3>Timeline Planner</h3>
              <p>
                A dynamic scheduler that adjusts based on your target intake and
                application deadlines.
              </p>
              <button className="rs-btn-primary">Try Now</button>
            </div>
          </div>

          {/* INSIGHTS */}
          <div className="rs-ai-insights">
            <div className="rs-insight-header">
              <h3>Live AI Insights</h3>
              <span className="rs-active">ACTIVE</span>
            </div>

            <div className="rs-insight-grid">
              <div className="rs-recessed">
                <p>Success Rate</p>
                <h4>98%</h4>
              </div>

              <div className="rs-recessed">
                <p>Avg. Saving</p>
                <h4>$12k</h4>
              </div>

              <div className="rs-recessed">
                <p>Processed</p>
                <h4>5k+</h4>
              </div>
            </div>
          </div>
        </section>
        <SuccessStories />
      </main>

      {/* Our Partners */}
      <OurPartner />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
