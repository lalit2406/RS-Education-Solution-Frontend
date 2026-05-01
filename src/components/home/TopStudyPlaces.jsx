// src/components/home/TopStudyPlaces.jsx

import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaChevronLeft,
  FaChevronRight,
  FaArrowRight,
} from "react-icons/fa";

import "../../styles/home/topStudyPlaces.css";

import biharImg from "../../assets/city/bihar.png";
import delhiImg from "../../assets/city/delhi.png";
import haryanaImg from "../../assets/city/haryana.png";
import himachalImg from "../../assets/city/himachal.png";
import karnatakaImg from "../../assets/city/karnataka.png";
import madhyaPradeshImg from "../../assets/city/mp.png";
import maharastraImg from "../../assets/city/maharastra.png";
import punjabImg from "../../assets/city/punjab.png";
import rajasthanImg from "../../assets/city/rajasthan.png";
import tamilNaduImg from "../../assets/city/tamilnadu.png";
import uttarPradeshImg from "../../assets/city/up.png";
import uttarakhandImg from "../../assets/city/uttarakhand.png";

const TopStudyPlaces = () => {
  const navigate = useNavigate();
  const sliderRef = useRef(null);

  const places = [
    {
      name: "Bihar",
      image: biharImg,
      stateQuery: "bihar",
    },
  {
    id: 1,
    name: "Delhi",
    image: delhiImg,
    stateQuery: "Delhi",
  },
  {
    name: "Haryana",
    image: haryanaImg,
    stateQuery: "haryana",
  },
  {
    name: "Himachal Pradesh",
    image: himachalImg,
    stateQuery: "himachal pradesh",
  },
  {
    name: "Karnataka",
    image: karnatakaImg,
    stateQuery: "karnataka",
  },
  {
    name: "Madhya Pradesh",
    image: madhyaPradeshImg,
    stateQuery: "madhya pradesh",
  },
  {
    name: "Maharashtra",
    image: maharastraImg,
   stateQuery: "maharashtra",
  },
  {
    name: "Punjab",
    image: punjabImg,
    stateQuery: "punjab",
  },
  {
    name: "Rajasthan",
    image: rajasthanImg,
    stateQuery: "rajasthan",
  },
  {
    name: "Tamil Nadu",
    image: tamilNaduImg,
    stateQuery: "tamil nadu",
  },
  {
    name: "Uttar Pradesh",
    image: uttarPradeshImg,
    stateQuery: "uttar pradesh",
  },
  {
    name: "Uttarakhand",
    image: uttarakhandImg,
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