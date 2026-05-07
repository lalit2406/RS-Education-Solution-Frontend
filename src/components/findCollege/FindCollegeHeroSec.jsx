import { useEffect, useState } from "react";
import "../../styles/findCollege/findCollegeHeroSec.css";

import { FaUniversity, FaUsers, FaBookOpen, FaAward } from "react-icons/fa";

const slides = [
  "/images/home/college11.png",
  "/images/home/college12.png",
  "/images/home/college10.png",
  "/images/home/college13.png",
];
const FindCollegeHeroSec = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const preload = new Image();
    preload.src = slides[0];
  }, []);

  useEffect(() => {
    const autoSlide = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(autoSlide);
  }, []);

  return (
    <>
      <section className="rs-fc-hero-section">
        {/* Background Slides */}
        {slides.map((image, index) => (
          <div
            key={index}
            className={`rs-fc-slide ${index === currentSlide ? "active" : ""}`}
            style={{ backgroundImage: `url(${image})` }}
          />
        ))}

        {/* Dark Overlay */}
        <div className="rs-fc-overlay"></div>

        {/* Main Content */}
        <div className="rs-fc-content">
          <p className="rs-fc-mini-title">WELCOME TO RS EDUCATION</p>

          <h1 className="rs-fc-heading">
            Start Your Beautiful <br />
            And <span>Bright</span> Future
          </h1>

          <p className="rs-fc-description">
            Explore India's best colleges, compare courses, placements, fees and
            choose the right path for your career growth.
          </p>
        </div>

        {/* Bottom Floating Cards */}
      </section>

      <section>
        <div className="rs-fc-info-cards">
          <div className="rs-fc-card">
            <FaUniversity />
            <div>
              <h4>5000+</h4>
              <p>Top Colleges</p>
            </div>
          </div>

          <div className="rs-fc-card">
            <FaUsers />
            <div>
              <h4>10K+</h4>
              <p>Students Guided</p>
            </div>
          </div>

          <div className="rs-fc-card">
            <FaBookOpen />
            <div>
              <h4>250+</h4>
              <p>Courses</p>
            </div>
          </div>

          <div className="rs-fc-card">
            <FaAward />
            <div>
              <h4>99%</h4>
              <p>Success Rate</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FindCollegeHeroSec;
