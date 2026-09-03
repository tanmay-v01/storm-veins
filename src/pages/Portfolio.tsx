import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Cpu,
  Layers,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { caseStudies, portfolioProjects, allProjects, clientLogos, stats } from "../data";
import { ButtonLink, CTA, Eyebrow, InteriorHero, PageFrame, WorkCard } from "../components/Site";
import { ExecutiveTestimonials } from "../components/ExecutiveTestimonials";

export function Portfolio() {
  const [selectedDomain, setSelectedDomain] = useState("all");

  const domains = [
    { id: "all", label: "All Specializations", count: allProjects.length },
    { id: "fintech", label: "Fintech & Wealth", count: allProjects.filter((p) => p.domain.toLowerCase().includes("fintech")).length },
    { id: "healthcare", label: "Healthcare & Bio", count: allProjects.filter((p) => p.domain.toLowerCase().includes("health")).length },
    { id: "real estate", label: "Real Estate & Living", count: allProjects.filter((p) => p.domain.toLowerCase().includes("real estate")).length },
    { id: "enterprise saas", label: "Enterprise SaaS & AI", count: allProjects.filter((p) => p.domain.toLowerCase().includes("saas")).length },
    { id: "cleantech & mobility", label: "Mobility & CleanTech", count: allProjects.filter((p) => p.domain.toLowerCase().includes("mobility") || p.domain.toLowerCase().includes("clean")).length },
    { id: "luxury & commerce", label: "Luxury Commerce", count: allProjects.filter((p) => p.domain.toLowerCase().includes("commerce")).length },
  ];

  const filteredProjects =
    selectedDomain === "all"
      ? allProjects
      : allProjects.filter((p) => {
          const d = p.domain.toLowerCase();
          const c = p.category.toLowerCase();
          const q = selectedDomain.toLowerCase();
          return d.includes(q) || c.includes(q);
        });

  return (
    <PageFrame>
      <InteriorHero
        eyebrow="Commercial Architecture &amp; Case Studies / 04"
        title={
          <>
            Engineering compounding velocity across <span className="text-gradient">global industries.</span>
          </>
        }
        copy="A curated repository of verified architectural deployments, sovereign flagships, and high-conversion commercial engines engineered for category-defining enterprises."
        number="04 / 06"
      />

      {/* Trust & Accretion Stats Strip */}
      <section className="portfolio-stats-strip">
        <div className="container">
          <div className="portfolio-stats-grid">
            {stats.map((stat, i) => (
              <div key={i} className="portfolio-stat-box">
                <strong className="stat-value text-gradient">{stat.value}</strong>
                <span className="stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 1: Flagship Case Studies First */}
      <section className="section-luxury portfolio-flagship-section">
        <div className="container">
          <div className="flagship-section-header">
            <div className="flagship-header-copy">
              <Eyebrow badge>Verified Deployments / Priority 01</Eyebrow>
              <h2 className="flagship-section-title">
                Flagship Case Studies &amp; <span className="text-gradient">Deep Systems</span>
              </h2>
              <p className="flagship-section-sub">
                In-depth architectural post-mortems documenting strategic dilemmas, technical decisions, and verifiable financial velocity across Tier-1 enterprise partners.
              </p>
            </div>
            <div className="flagship-assurance-pill">
              <ShieldCheck size={18} className="text-emerald" />
              <span>Full Audit &amp; Attributed ROI</span>
            </div>
          </div>

          <div className="flagship-showcase-grid">
            {caseStudies.map((study, index) => (
              <article key={study.slug} className={`flagship-deep-card card-accent-${study.color}`}>
                <div className="flagship-card-media-col">
                  <div className="flagship-image-frame">
                    <img
                      src={study.image}
                      alt={study.title}
                      className="flagship-img"
                      loading="lazy"
                    />
                    <div className="flagship-image-overlay" />
                    <div className="flagship-domain-tag">
                      <span className="dot" />
                      {study.domain}
                    </div>
                  </div>
                </div>

                <div className="flagship-card-body-col">
                  <div className="flagship-meta-top">
                    <span className="flagship-client-name">{study.client}</span>
                    <span className="flagship-type-badge">{study.type}</span>
                  </div>

                  <h3 className="flagship-title-text">{study.title}</h3>
                  <p className="flagship-summary-text">{study.summary}</p>

                  <div className="flagship-metrics-band">
                    <div className="metric-box primary">
                      <span className="m-label">PRIMARY OUTCOME</span>
                      <strong className="m-val">{study.result}</strong>
                    </div>
                    <div className="metric-box secondary">
                      <span className="m-label">ATTRIBUTED LEVERAGE</span>
                      <strong className="m-val">{study.secondaryMetric}</strong>
                    </div>
                  </div>

                  {study.technologies && study.technologies.length > 0 && (
                    <div className="flagship-tech-stack">
                      <span className="tech-stack-label">Core Architecture:</span>
                      <div className="tech-tags-wrap">
                        {study.technologies.map((tech) => (
                          <span key={tech} className="tech-tag">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flagship-card-action">
                    <Link to={`/work/${study.slug}`} className="flagship-cta-link">
                      <span>Read Full Architectural Case Study</span>
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2: Domain-Specific Interactive Portfolio */}
      <section className="section-luxury portfolio-catalog-section">
        <div className="container">
          <div className="catalog-header-split">
            <div>
              <Eyebrow badge>Domain Directory / Catalog</Eyebrow>
              <h2 className="catalog-section-title">
                Explore Deployments by <span className="text-gradient">Industry Domain</span>
              </h2>
              <p className="catalog-section-sub">
                Select a specialization below to inspect high-velocity interfaces and custom architectures engineered across diverse sectors.
              </p>
            </div>
            <div className="catalog-count-pill">
              <span>Showing {filteredProjects.length} Verified Engagements</span>
            </div>
          </div>

          {/* Interactive Domain Filter Pills */}
          <div className="work-filter-bar">
            <div className="filter-pills-row" role="tablist" aria-label="Filter portfolio by domain">
              {domains.map((dom) => (
                <button
                  key={dom.id}
                  type="button"
                  role="tab"
                  aria-selected={selectedDomain === dom.id}
                  className={`filter-pill ${selectedDomain === dom.id ? "active" : ""}`}
                  onClick={() => setSelectedDomain(dom.id)}
                >
                  <span>{dom.label}</span>
                  <span className="filter-count-chip">{dom.count}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Portfolio Grid */}
          <div className="work-grid-luxury portfolio-grid-spaced">
            {filteredProjects.map((project, index) => (
              <WorkCard key={project.slug} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: Executive Client Testimonials */}
      <ExecutiveTestimonials />

      {/* SECTION 4: Institutional Client Logos Marquee */}
      <section className="client-trust-roster-section">
        <div className="container">
          <div className="roster-header-centered">
            <span className="roster-eyebrow">TRUSTED BY C-SUITE LEADERS &amp; BOARDS ACROSS 11 SOVEREIGN MARKETS</span>
          </div>
          <div className="client-logos-row">
            {clientLogos.map((logo) => (
              <span key={logo} className="client-logo-item">
                {logo}
              </span>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </PageFrame>
  );
}
