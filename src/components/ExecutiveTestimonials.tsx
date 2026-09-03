import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, CheckCircle2, ShieldCheck, Star } from "lucide-react";
import { testimonials } from "../data";
import { Reveal, Eyebrow } from "./Site";

export function ExecutiveTestimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const current = testimonials[activeIndex];

  // Auto-cycle every 8 seconds unless hovered
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [isPaused]);

  return (
    <section
      className="section-luxury human-testimonials-section"
      aria-label="Executive Client Endorsements and Verified Commercial Outcomes"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="container">
        <div className="testimonials-header-split">
          <div>
            <Eyebrow badge>Human Leadership &amp; Verified Trust</Eyebrow>
            <h2 className="testimonials-section-title">
              What enterprise leaders say about{" "}
              <span className="text-gradient">partnering with us.</span>
            </h2>
            <p className="testimonials-section-sub">
              Direct, unfiltered feedback from Founders, CCOs, and VP Engineers who scaled global categories alongside our dedicated multidisciplinary pods.
            </p>
          </div>

          <div className="testimonials-controls-cluster">
            <div className="testimonials-counter-chip">
              <span className="current-idx">0{activeIndex + 1}</span>
              <span className="counter-slash">/</span>
              <span className="total-idx">0{testimonials.length}</span>
            </div>
            <div className="carousel-nav-buttons">
              <button
                type="button"
                className="carousel-arrow-btn"
                aria-label="Previous Testimonial"
                onClick={() =>
                  setActiveIndex(
                    (prev) => (prev - 1 + testimonials.length) % testimonials.length
                  )
                }
              >
                <ChevronLeft size={20} />
              </button>
              <button
                type="button"
                className="carousel-arrow-btn"
                aria-label="Next Testimonial"
                onClick={() =>
                  setActiveIndex((prev) => (prev + 1) % testimonials.length)
                }
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Featured Testimonial Showcase Card */}
        <div className="testimonial-featured-card">
          <div className="testimonial-top-meta">
            <div className="testimonial-verified-badge">
              <ShieldCheck size={16} className="text-emerald" />
              <span>VERIFIED ENTERPRISE PARTNERSHIP AUDIT</span>
            </div>
            <div className="testimonial-stars-rating" aria-label="5 stars rating">
              {[...Array(current.rating)].map((_, i) => (
                <Star key={i} size={15} className="star-filled" />
              ))}
              <span className="rating-num">5.0 / 5.0</span>
            </div>
          </div>

          <blockquote className="testimonial-main-quote">
            "{current.quote}"
          </blockquote>

          <div className="testimonial-footer-row">
            <div className="testimonial-human-profile">
              <div className="human-avatar-wrapper">
                <img
                  src={current.avatar}
                  alt={current.author}
                  className="human-avatar-img"
                  loading="lazy"
                />
                <span className="avatar-status-pip" />
              </div>
              <div className="human-profile-details">
                <div className="human-name-row">
                  <h3 className="human-author-name">{current.author}</h3>
                  <span className="verified-author-pill">
                    <CheckCircle2 size={13} className="text-emerald" /> Verified Partner
                  </span>
                </div>
                <p className="human-author-role">
                  {current.role} · <strong className="human-company-highlight">{current.company}</strong>
                </p>
                <span className="human-location-stamp">{current.location}</span>
              </div>
            </div>

            {/* Metric Outcome Plaque in Sora */}
            <div className={`testimonial-kpi-pill kpi-accent-${current.badgeColor}`}>
              <div className="kpi-pill-val">{current.metricValue}</div>
              <div className="kpi-pill-lbl">{current.metricLabel}</div>
            </div>
          </div>
        </div>

        {/* Interactive Selector Rail of All 5 Leaders */}
        <div className="testimonials-leader-rail">
          {testimonials.map((item, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={item.id}
                type="button"
                className={`leader-tab-item ${isActive ? "is-active" : ""}`}
                onClick={() => setActiveIndex(idx)}
                aria-label={`View testimonial by ${item.author}, ${item.role}`}
              >
                <div className="leader-tab-avatar-wrap">
                  <img src={item.avatar} alt={item.author} className="leader-tab-avatar" />
                  {isActive && <span className="leader-active-glow" />}
                </div>
                <div className="leader-tab-text">
                  <strong className="leader-tab-name">{item.author}</strong>
                  <span className="leader-tab-company">{item.company.split(" ")[0]}</span>
                </div>
                <div className="leader-tab-metric-chip">{item.metricValue}</div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
