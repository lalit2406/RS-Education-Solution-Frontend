// src/components/home/TopStudyPlaces.jsx

import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaChevronLeft,
  FaChevronRight,
  FaArrowRight,
} from "react-icons/fa";

import "../../styles/home/topStudyPlaces.css";

import delhiImg from "../../assets/city/delhi.png";
import bangaloreImg from "../../assets/city/bangalore.png";
import lucknowImg from "../../assets/city/lucknow.png";
import puneImg from "../../assets/city/pune.png";
import hyderabadImg from "../../assets/city/hyderabad.png";
import mumbaiImg from "../../assets/city/mumbai.png";

const TopStudyPlaces = () => {
  const navigate = useNavigate();
  const sliderRef = useRef(null);

  const places = [
    {
      id: 1,
      name: "Delhi",
      cityQuery: "New Delhi",
      image: delhiImg,
    },
    {
      id: 2,
      name: "Bangalore",
      cityQuery: "Bangalore",
      image: bangaloreImg,
    },
    {
      id: 3,
      name: "Lucknow",
      cityQuery: "Lucknow",
      image: lucknowImg,
    },
    {
      id: 4,
      name: "Pune",
      cityQuery: "Pune",
      image: puneImg,
    },
    {
      id: 5,
      name: "Hyderabad",
      cityQuery: "Hyderabad",
      image: hyderabadImg,
    },
    {
      id: 6,
      name: "Mumbai",
      cityQuery: "Mumbai",
      image: mumbaiImg,
    },
  ];

  const handleNavigate = (city) => {
    navigate(
      `/find-college?city=${encodeURIComponent(city)}`
    );
  };

  const slideLeft = () => {
    sliderRef.current?.scrollBy({
      left: -320,
      behavior: "smooth",
    });
  };

  const slideRight = () => {
    sliderRef.current?.scrollBy({
      left: 320,
      behavior: "smooth",
    });
  };

  return (
    <section className="tsp-wrap">
      <div className="tsp-container">
        <div className="tsp-head">
          <div>
            <h2 className="tsp-title">
              Top Study Places For BE/B.Tech
            </h2>

            <p className="tsp-subtitle">
              Explore top cities and discover the
              right college for your future.
            </p>
          </div>

          <div className="tsp-nav">
            <button
              className="tsp-nav-btn"
              onClick={slideLeft}
              aria-label="Scroll left"
            >
              <FaChevronLeft />
            </button>

            <button
              className="tsp-nav-btn"
              onClick={slideRight}
              aria-label="Scroll right"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>

        <div
          className="tsp-slider"
          ref={sliderRef}
        >
          {places.map((place) => (
            <button
              key={place.id}
              className="tsp-card"
              onClick={() =>
                handleNavigate(place.cityQuery)
              }
            >
              <div className="tsp-img-wrap">
                <img
                  src={place.image}
                  alt={place.name}
                  className="tsp-img"
                />
              </div>

              <h3 className="tsp-city">
                {place.name}
              </h3>

              <span className="tsp-link">
                Explore
                <FaArrowRight />
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopStudyPlaces;