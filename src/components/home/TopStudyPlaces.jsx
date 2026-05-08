// src/components/home/TopStudyPlaces.jsx

import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaChevronLeft,
  FaChevronRight,
  FaArrowRight,
} from "react-icons/fa";

import "../../styles/home/topStudyPlaces.css";

const TopStudyPlaces = () => {
  const navigate = useNavigate();
  const sliderRef = useRef(null);

const places = [
  {
    name: "Bihar",
    image: "/images/cities/bihar.webp",
    stateQuery: "bihar",
  },
  {
    id: 1,
    name: "Delhi",
    image: "/images/cities/delhi.webp",
    stateQuery: "Delhi",
  },
  {
    name: "Haryana",
    image: "/images/cities/haryana.webp",
    stateQuery: "haryana",
  },
  {
    name: "Himachal Pradesh",
    image: "/images/cities/himachal.webp",
    stateQuery: "himachal pradesh",
  },
  {
    name: "Karnataka",
    image: "/images/cities/karnataka.webp",
    stateQuery: "karnataka",
  },
  {
    name: "Madhya Pradesh",
    image: "/images/cities/mp.webp",
    stateQuery: "madhya pradesh",
  },
  {
    name: "Maharashtra",
    image: "/images/cities/maharastra.webp",
    stateQuery: "maharashtra",
  },
  {
    name: "Punjab",
    image: "/images/cities/punjab.webp",
    stateQuery: "punjab",
  },
  {
    name: "Rajasthan",
    image: "/images/cities/rajasthan.webp",
    stateQuery: "rajasthan",
  },
  {
    name: "Tamil Nadu",
    image: "/images/cities/tamilnadu.webp",
    stateQuery: "tamil nadu",
  },
  {
    name: "Uttar Pradesh",
    image: "/images/cities/up.webp",
    stateQuery: "uttar pradesh",
  },
  {
    name: "Uttarakhand",
    image: "/images/cities/uttarakhand.webp",
    stateQuery: "uttarakhand",
  },
];

  const handleNavigate = (state) => {
    navigate(
  `/find-college?state=${encodeURIComponent(state)}`,
  {
    state: { fromTopPlaces: true },
  }
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
              key={place.name}
              className="tsp-card"
              onClick={() =>
                handleNavigate(place.stateQuery)
              }
            >
              <div className="tsp-img-wrap">
                <img
                  src={place.image}
                  alt={place.name}
                  className="tsp-img"
                  loading="lazy"
                />
              </div>

              <h3 className="tsp-city">
                {place.name}
              </h3>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopStudyPlaces;