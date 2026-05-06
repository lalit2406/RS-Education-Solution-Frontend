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
    image: "/images/cities/bihar.png",
    stateQuery: "bihar",
  },
  {
    id: 1,
    name: "Delhi",
    image: "/images/cities/delhi.png",
    stateQuery: "Delhi",
  },
  {
    name: "Haryana",
    image: "/images/cities/haryana.png",
    stateQuery: "haryana",
  },
  {
    name: "Himachal Pradesh",
    image: "/images/cities/himachal.png",
    stateQuery: "himachal pradesh",
  },
  {
    name: "Karnataka",
    image: "/images/cities/karnataka.png",
    stateQuery: "karnataka",
  },
  {
    name: "Madhya Pradesh",
    image: "/images/cities/mp.png",
    stateQuery: "madhya pradesh",
  },
  {
    name: "Maharashtra",
    image: "/images/cities/maharastra.png",
    stateQuery: "maharashtra",
  },
  {
    name: "Punjab",
    image: "/images/cities/punjab.png",
    stateQuery: "punjab",
  },
  {
    name: "Rajasthan",
    image: "/images/cities/rajasthan.png",
    stateQuery: "rajasthan",
  },
  {
    name: "Tamil Nadu",
    image: "/images/cities/tamilnadu.png",
    stateQuery: "tamil nadu",
  },
  {
    name: "Uttar Pradesh",
    image: "/images/cities/up.png",
    stateQuery: "uttar pradesh",
  },
  {
    name: "Uttarakhand",
    image: "/images/cities/uttarakhand.png",
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