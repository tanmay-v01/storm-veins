import { useState } from "react";
import { ArrowUpRight, CheckCircle2, ChevronRight, Layers, Sparkles } from "lucide-react";
import { industries } from "../data";
import { Eyebrow, ButtonLink } from "./Site";

export function SectorMatrix() {
  const [activeSectorIndex, setActiveSectorIndex] = useState(0);

  const sector = industries[activeSectorIndex];

  return (
    <section className="section-luxury sector-matrix-section" aria-label="Industries and Sectors We Transform">
      <div className="container">
        <div className="sector-matrix-head text-center">
          <Eyebrow badge>Sector Specialization</Eyebrow>
          <h2 className="sector-matrix-title">
            Tailored architectures for{" "}
            <span className="text-gradient">high-stakes categories.</span>
          </h2>
          <p className="sector-matrix-sub">
            We do not deploy generic playbooks. Each category receives bespoke architectural solutions, strict regulatory compliance, and fine-tuned commercial funnels.
          </p>
        </div>

        {/* Sector Nav Rail (Tab Selector) */}
        <div className="sector-nav-rail" role="tablist" aria-label="Category Selection Rail">
          {industries.map((item, idx) => {
            const isActive = idx === activeSectorIndex;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`sector-tab-pill ${isActive ? "active" : ""}`}
                onClick={() => setActiveSectorIndex(idx)}
              >
                <span className="sector-tab-index">0{idx + 1}</span>
                <span className="sector-tab-name">{item.shortName}</span>
                {isActive && <span className="sector-tab-active-line" />}
              </button>
            );
          })}
        </div>

        {/* Dynamic Sector Content Display */}
        <div className="sector-showcase-grid">
          {/* Left Column: Narrative, Stats & Deliverables */}
          <div className="sector-narrative-column">
            <div className="sector-chip-row">
              <span className="sector-category-indicator">SECTOR ARCHITECTURE</span>
              <span className="sector-cohort-badge">PRODUCTION READY</span>
            </div>

            <h3 className="sector-display-name">{sector.name}</h3>

            <p className="sector-lead-statement">{sector.lead}</p>

            {/* 3 Hard-hitting Stats in Sora */}
            <div className="sector-stats-row">
              {sector.stats.map((stat, i) => (
                <div className="sector-stat-card" key={stat.label}>
                  <div className="sector-stat-number">{stat.value}</div>
                  <div className="sector-stat-label">{stat.label}</div>
                  <p className="sector-stat-desc">{stat.desc}</p>
                </div>
              ))}
            </div>

            {/* Key Deliverables Checkpoints */}
            <div className="sector-capabilities-block">
              <h4 className="sector-capabilities-title">Sector-Engineered Capabilities:</h4>
              <div className="sector-capabilities-grid">
                {sector.capabilities.map((cap) => (
                  <div className="sector-cap-item" key={cap}>
                    <CheckCircle2 size={16} className="text-emerald" />
                    <span>{cap}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="sector-action-footer">
              <ButtonLink to="/contact" variant="emerald" className="sector-inquire-btn">
                Request {sector.shortName} Blueprint <ArrowUpRight size={16} />
              </ButtonLink>
              <ButtonLink to="/work" variant="outline" className="sector-work-btn">
                View Related Case Studies
              </ButtonLink>
            </div>
          </div>

          {/* Right Column: Visual Feature Card */}
          <div className="sector-visual-column">
            <div className="sector-image-frame">
              <img
                src={sector.image}
                alt={sector.name}
                className="sector-hero-image"
                loading="lazy"
              />
              <div className="sector-image-overlay" />
              <div className="sector-glass-plaque">
                <div className="plaque-tag">
                  <Sparkles size={14} className="text-champagne" />
                  <span>SPECIALIZED SECTOR PROTOCOL</span>
                </div>
                <h4 className="plaque-title">{sector.name}</h4>
                <div className="plaque-metric-summary">
                  <span className="plaque-stat-highlight">{sector.stats[0].value}</span>
                  <span className="plaque-stat-note">{sector.stats[0].label}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
