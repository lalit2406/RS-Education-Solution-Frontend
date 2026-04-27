import React, { useEffect, useRef, useState } from "react";
import "../../styles/findCollege/PhotoGallery.css";
import { fetchGalleryImages } from "../../services/imageService";

const PhotoGallery = () => {
  const [images, setImages] = useState([]);
  const [animate, setAnimate] = useState(false);

  const intervalRef = useRef(null);
  const mountedRef = useRef(true);

  const loadImages = async () => {
    if (!mountedRef.current) return;

    setAnimate(false);

    try {
      const data = await fetchGalleryImages();

      if (!mountedRef.current) return;

      setTimeout(() => {
        if (!mountedRef.current) return;

        if (data.length > 0) {
          setImages(data.slice(0, 6));
        }

        setAnimate(true);
      }, 250);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    mountedRef.current = true;

    const startGallery = () => {
      loadImages();

      intervalRef.current = setInterval(() => {
        loadImages();
      }, 4000);
    };

    const timer = setTimeout(startGallery, 100);

    return () => {
      mountedRef.current = false;
      clearTimeout(timer);
      clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <section className="photo-gallery-section">
      <div className="gallery-header">
        <span className="gallery-tag">GALLERY</span>

        <h2>Our Photo Gallery</h2>

        <p>
          Explore college life, students, campuses, classrooms and
          inspiring academic moments.
        </p>
      </div>

      <div className="gallery-grid">
        {images.map((image, index) => (
          <div
            key={`${image.id}-${index}`}
            className={`gallery-card gallery-card-${index + 1} ${
              animate ? "show" : "hide"
            }`}
          >
            <img src={image.src} alt={image.alt} loading="lazy" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default PhotoGallery;