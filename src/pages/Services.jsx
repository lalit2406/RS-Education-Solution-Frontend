import { useEffect, useState } from "react";
import "../../src/styles/pages/services.css";
import Footer from "../../src/components/layout/Footer";
import ServiceDetailModal from "../components/services/ServiceDetailModal";
import BookCallModal from "../components/dashboard/BookCallModal";
import { servicesData } from "../data/servicesData";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import SEO from "../components/seo/SEO";

export default function Services() {
  /* =========================
     LOADING STATE
  ========================= */
  const [rsServicesLoading, setRsServicesLoading] = useState(true);

  /* =========================
     MODAL STATE
  ========================= */
  const [selectedService, setSelectedService] = useState(null);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const navigate = useNavigate();
  const { user } = useUser();

  const handleProtectedAction = (callback) => {
    if (!user) {
      navigate("/login");
      return;
    }

    callback();
  };
  /* =========================
   REAL LOADING (STATIC DATA)
========================= */
  useEffect(() => {
    // simulate loading
    setTimeout(() => {
      setRsServicesLoading(false);
    }, 100);
  }, []);

  /* =========================
     SCROLL ANIMATION
  ========================= */
  useEffect(() => {
    if (rsServicesLoading) return;

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
  }, [rsServicesLoading]);

  return (
    <>
      <SEO
        title="Education Services | RS Education"
        description="Get expert counseling, admission guidance, career planning and educational support services."
        keywords="education counseling, admission guidance, study abroad support"
        url="https://rseducationsolution.in/services"
        image="https://rseducationsolution.in/preview.webp"
      />
      <div className="services-page">
        {/* HERO */}
        <section className="services-hero fade-up">
          <div className="services-hero-content">
            {/* LEFT */}
            <div className="services-hero-left">
              {rsServicesLoading ? (
                <>
                  <div className="rs-services-skeleton-badge"></div>
                  <div className="rs-services-skeleton-title"></div>
                  <div className="rs-services-skeleton-desc"></div>
                </>
              ) : (
                <>
                  <span className="services-badge">✨ Our Expertise</span>

                  <h1 className="services-title">
                    Build Your <span>Future</span> with the Right Guidance
                  </h1>

                  <p className="services-desc">
                    From career clarity to university admissions, we provide
                    structured support at every stage of your academic journey —
                    helping you make confident, future-ready decisions.
                  </p>
                </>
              )}
            </div>

            {/* RIGHT IMAGE */}
            <div className="services-hero-right">
              {rsServicesLoading ? (
                <div className="rs-services-skeleton-hero-img"></div>
              ) : (
                <img
                  src="/images/home/service_right2.webp"
                  alt="Career Services"
                  loading="eager"
                />
              )}
            </div>
          </div>
        </section>
        {/* SERVICES GRID */}
        <section className="services-grid">
          {rsServicesLoading
            ? Array(6)
                .fill(0)
                .map((_, index) => (
                  <div
                    className="service-card rs-services-skeleton-card"
                    key={index}
                  >
                    <div className="rs-services-skeleton-icon"></div>
                    <div className="rs-services-skeleton-card-title"></div>
                    <div className="rs-services-skeleton-card-desc"></div>
                    <div className="rs-services-skeleton-btn"></div>
                  </div>
                ))
            : servicesData.map((service) => (
                <div className="service-card fade-up" key={service.id}>
                  <div className="service-top">
                    <div className="icon">{service.icon}</div>
                    <h3>{service.title}</h3>
                    <p>{service.desc}</p>
                  </div>
                  <button
                    className="primary"
                    onClick={() => {
                      handleProtectedAction(() => {
                        setSelectedService(service);
                        setIsServiceModalOpen(true);
                      });
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
            {/* LEFT */}
            <div className="cta-left">
              <div className="cta-text">
                {rsServicesLoading ? (
                  <>
                    <div className="rs-services-skeleton-cta-title"></div>
                    <div className="rs-services-skeleton-cta-desc"></div>
                    <div className="rs-services-skeleton-cta-buttons"></div>
                  </>
                ) : (
                  <>
                    <h2>Can't find what you're looking for?</h2>
                    <p>
                      Our team is always ready to create a bespoke educational
                      plan tailored to your unique requirements. Let's build
                      your future together.
                    </p>

                    <div className="cta-buttons">
                      <button
                        className="primary"
                        onClick={() => {
                          handleProtectedAction(() => {
                            setSelectedService({
                              title: "General Consultation",
                            });

                            setIsBookingOpen(true);
                          });
                        }}
                      >
                        Schedule a Free Call
                      </button>

                      <button
                        className="secondary"
                        onClick={() => {
                          navigate("/programs");
                          window.scrollTo({
                            top: 0,
                            behavior: "smooth",
                          });
                        }}
                      >
                        Explore Programs
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* RIGHT IMAGE */}
            <div className="cta-right">
              <div className="cta-image">
                {rsServicesLoading ? (
                  <div className="rs-services-skeleton-cta-img"></div>
                ) : (
                  <img
                    src="/images/home/Services_blog.webp"
                    alt="Students discussion"
                    loading="lazy"
                  />
                )}
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* MODALS */}
      <ServiceDetailModal
        isOpen={isServiceModalOpen}
        onClose={() => setIsServiceModalOpen(false)}
        service={selectedService}
        onBookNow={() => {
          setIsServiceModalOpen(false);
          setTimeout(() => setIsBookingOpen(true), 150);
        }}
      />

      <BookCallModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        service={selectedService?.title}
      />

      <Footer />
    </>
  );
}
