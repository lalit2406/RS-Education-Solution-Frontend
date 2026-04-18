import { useEffect } from "react";
import "../../src/styles/pages/services.css";
import Footer from "../../src/components/layout/Footer";
import { useState } from "react";
import ServiceDetailModal from "../components/services/ServiceDetailModal";
import BookCallModal from "../components/dashboard/BookCallModal";
import { servicesData } from "../data/servicesData";

export default function Services() {
  const [selectedService, setSelectedService] = useState(null);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  // 🔥 SCROLL ANIMATION
  useEffect(() => {
    const elements = document.querySelectorAll(".fade-up");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          }
        });
      },
      { threshold: 0.2 },
    );

    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <>
      <div className="services-page">
        {/* HERO */}
        <section className="services-hero fade-up">
          <p className="tag">OUR EXPERTISE</p>
          <h1>
            Empowering Your <br /> Educational Journey
          </h1>
          <p className="subtitle">
            Comprehensive solutions designed to navigate the complexities of
            modern education, from local excellence to global opportunities.
          </p>
        </section>

        {/* SERVICES GRID */}
        <section className="services-grid">
          {servicesData.map((service) => (
            <div className="service-card fade-up" key={service.id}>
              <div className="icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.desc}</p>

              {/* 🔥 BUTTON (NEW FUNCTIONAL CTA) */}
              <button
                className="primary"
                onClick={() => {
                  setSelectedService(service);
                  setIsServiceModalOpen(true);
                }}
              >
                Learn More →
              </button>
            </div>
          ))}
        </section>

        {/* CTA */}
        <section className="cta-section fade-up">
          <div className="cta-content">
            {/* LEFT TEXT */}
            <div className="cta-left">
              <div className="cta-text">
                <h2>Can't find what you're looking for?</h2>
                <p>
                  Our team is always ready to create a bespoke educational plan
                  tailored to your unique requirements. Let's build your future
                  together.
                </p>

                <div className="cta-buttons">
                  <button className="primary">Schedule a Free Call</button>
                  <button className="secondary">Explore Programs</button>
                </div>
              </div>
            </div>

            <div className="cta-right">
              {/* RIGHT IMAGE */}
              <div className="cta-image">
                <img
                  src="/src/assets/images/Services_blog.png"
                  alt="Students discussion"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* 🔥 SERVICE DETAIL MODAL */}
      <ServiceDetailModal
        isOpen={isServiceModalOpen}
        onClose={() => setIsServiceModalOpen(false)}
        service={selectedService}
        onBookNow={() => {
          setIsServiceModalOpen(false);
          setTimeout(() => setIsBookingOpen(true), 150);
        }}
      />

      {/* 🔥 BOOKING MODAL */}
      <BookCallModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        service={selectedService?.title}
      />
      <Footer />
    </>
  );
}
