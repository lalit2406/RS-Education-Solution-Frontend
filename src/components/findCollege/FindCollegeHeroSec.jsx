import { useEffect, useState } from "react";
import "../../styles/findCollege/findCollegeHeroSec.css";

import img1 from "../../assets/images/college11.png";
import img2 from "../../assets/images/college12.png";
import img3 from "../../assets/images/college10.png";
import img4 from "../../assets/images/college13.png";

import {
  FaUniversity,
  FaUsers,
  FaBookOpen,
  FaAward,
} from "react-icons/fa";

const FindCollegeHeroSec = () => {
  const slides = [img1, img2, img3, img4];
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const autoSlide = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(autoSlide);
  }, [slides.length]);

  return (
    <>
    <section className="rs-fc-hero-section">
      {/* Background Slides */}
      {slides.map((image, index) => (
        <div
          key={index}
          className={`rs-fc-slide ${
            index === currentSlide ? "active" : ""
          }`}
          style={{ backgroundImage: `url(${image})` }}
        />
      ))}

      {/* Dark Overlay */}
      <div className="rs-fc-overlay"></div>

      {/* Main Content */}
      <div className="rs-fc-content">
        <p className="rs-fc-mini-title">WELCOME TO</p>

        <h1 className="rs-fc-heading">
          Start Your Beautiful <br />
          And <span>Bright</span> Future
        </h1>

        <p className="rs-fc-description">
          Explore India's best colleges, compare courses,
          placements, fees and choose the right path for
          your career growth.
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