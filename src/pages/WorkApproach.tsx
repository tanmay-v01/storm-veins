import { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCircle2,
  Clock,
  Compass,
  Cpu,
  Layers,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import { caseStudies, images } from "../data";
import {
  ButtonLink,
  CTA,
  Eyebrow,
  InteriorHero,
  PageFrame,
  Reveal,
  SectionHeading,
  WorkCard,
} from "../components/Site";
import { GlobalFootprintMap } from "../components/GlobalFootprintMap";

export function Work() {
  const [filter, setFilter] = useState("all");

  const filteredProjects =
    filter === "all"
      ? caseStudies
      : caseStudies.filter((p) =>
          filter === "growth"
            ? p.category.toLowerCase().includes("commercial") || p.category.toLowerCase().includes("growth")
            : filter === "digital"
            ? p.category.toLowerCase().includes("platform") || p.category.toLowerCase().includes("crm")
            : p.category.toLowerCase().includes("brand")
        );

  return (
    <PageFrame>
      <InteriorHero
        eyebrow="Portfolio & Outcomes / 03"
        title={
          <>
            Proof engineered through <span className="text-gradient">verified outcomes.</span>
          </>
        }
        copy="Representative engagements across category-defining scale-ups, global mobility platforms, and multi-national enterprise SaaS."
        number="03 / 06"
      />

      {/* Portfolio Filter Strip */}
      <section className="section-luxury work-page-section">
        <div className="container">
          <div className="work-filter-bar">
            <div className="filter-pills-row">
              <button
                type="button"
                className={`filter-pill ${filter === "all" ? "active" : ""}`}
                onClick={() => setFilter("all")}
              >
                All Engagements ({caseStudies.length})
              </button>
              <button
                type="button"
                className={`filter-pill ${filter === "growth" ? "active" : ""}`}
                onClick={() => setFilter("growth")}
              >
                Commercial Engines
              </button>
              <button
                type="button"
                className={`filter-pill ${filter === "digital" ? "active" : ""}`}
                onClick={() => setFilter("digital")}
              >
                Digital Flagships
              </button>
              <button
                type="button"
                className={`filter-pill ${filter === "brand" ? "active" : ""}`}
                onClick={() => setFilter("brand")}
              >
                Brand Architecture
              </button>
            </div>

            <div className="work-stats-badge">
              <span className="badge-dot" />
              <span>Average Portfolio ROI: 4.2× within 6 Months</span>
            </div>
          </div>

          <div className="work-grid-luxury">
            {filteredProjects.map((project, index) => (
              <WorkCard key={project.title} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Global Operating Footprint */}
      <section className="section-luxury global-footprint-section">
        <div className="container">
          <div className="split-section-header">
            <SectionHeading
              eyebrow="International Footprint"
              title={
                <>
                  Local cultural nuance.<br />
                  <span className="text-gradient">Global architectural scale.</span>
                </>
              }
              copy="Our work operates across North America, the European Union, the United Kingdom, Japan, and Southeast Asia from our principal design studios."
            />
          </div>

          <GlobalFootprintMap />
        </div>
      </section>

      <CTA />
    </PageFrame>
  );
}

export function Approach() {
  return (
    <PageFrame>
      <InteriorHero
        eyebrow="Methodology / 04"
        title={
          <>
            Engineering clarity from <span className="text-gradient">system complexity.</span>
          </>
        }
        copy="A disciplined, repeatable methodology that turns ambitious commercial hypotheses into enduring enterprise market advantages."
        number="04 / 06"
      />

      {/* Vision & Mission Cards */}
      <section className="section-luxury mission-section-luxury">
        <div className="container">
          <div className="mission-cards-grid">
            <div className="mission-card-luxury dark-card">
              <Eyebrow light badge>Strategic Purpose</Eyebrow>
              <h2>
                A global marketplace where category-defining ideas <span className="text-emerald-glow">travel without friction.</span>
              </h2>
              <p>
                Where technical craft elevates brand narrative, and where quantitative precision amplifies rather than constrains creative ambition.
              </p>
            </div>

            <div className="mission-card-luxury emerald-card">
              <Eyebrow light badge>Executive Mission</Eyebrow>
              <h2>
                Engineer the commercial, digital, and operational <span className="text-highlight">advantage for our partners.</span>
              </h2>
              <p>
                By connecting senior strategists, principal software engineers, and growth architects directly into your leadership boardroom.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The 5-Phase Operating Rhythm */}
      <section className="section-luxury process-section-luxury">
        <div className="container">
          <div className="split-section-header">
            <SectionHeading
              eyebrow="The 5-Stage Cadence"
              title={
                <>
                  Disciplined structure creates<br />
                  <span className="text-gradient">creative & commercial velocity.</span>
                </>
              }
              copy="Every engagement follows a rigorous architectural rhythm, ensuring complete executive visibility and zero wasted sprint cycles."
            />
          </div>

          <div className="process-timeline-list">
            {[
              {
                idx: "01",
                title: "Discovery & Opportunity Framing",
                detail:
                  "Comprehensive audit of historical cohort retention, customer acquisition channels, unit margins, and competitive market positioning.",
                deliverable: "Executive Diagnostic & Commercial Blueprint",
              },
              {
                idx: "02",
                title: "Architectural Specification",
                detail:
                  "Defining brand design tokens, UX journey flows, database schemas, and attribution instrumentation prior to writing production code.",
                deliverable: "System Architecture Document & Design Tokens",
              },
              {
                idx: "03",
                title: "High-Velocity Build Sprints",
                detail:
                  "Multidisciplinary pods develop brand identities, flagship web applications, and marketing funnels in rapid, test-driven weekly milestones.",
                deliverable: "Production Codebase & Brand Flagship Assets",
              },
              {
                idx: "04",
                title: "Precision Deployment & Telemetry",
                detail:
                  "Staged rollout across global CDN edges with automated error monitoring, synthetic load testing, and multi-touch attribution validation.",
                deliverable: "Turnkey Enterprise Launch & Live Telemetry",
              },
              {
                idx: "05",
                title: "Compounding Growth & Retention",
                detail:
                  "Continuous A/B experimentation, lifecycle journey optimization, and automated retargeting that compound customer lifetime value over time.",
                deliverable: "Weekly Executive Scorecards & Growth Loops",
              },
            ].map((step) => (
              <div className="process-item-luxury" key={step.idx}>
                <span className="step-badge">{step.idx}</span>
                <div className="step-main-content">
                  <h3>{step.title}</h3>
                  <p>{step.detail}</p>
                </div>
                <div className="step-output-col">
                  <span className="output-label">KEY DELIVERABLE</span>
                  <strong className="output-val">{step.deliverable}</strong>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Banner */}
      <section className="quote-section-luxury">
        <div className="container">
          <div className="quote-card-luxury">
            <div className="quote-emblem">“</div>
            <blockquote className="quote-text">
              Clarity is not the absence of complexity; it is the absolute mastery of it. We make the hardest commercial moves feel inevitable.
            </blockquote>
            <div className="quote-author-row">
              <img
                src={images.portrait}
                alt="Storm Veins Studio Principal"
                className="quote-author-img"
              />
              <div className="quote-author-info">
                <strong>Storm Veins Leadership</strong>
                <span>Studio Operating Standard · Since 2018</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTA />
    </PageFrame>
  );
}
