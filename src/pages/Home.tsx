import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  BarChart2,
  CheckCircle2,
  ChevronRight,
  Compass,
  Cpu,
  Globe,
  Layers,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Zap,
} from "lucide-react";
import { caseStudies, clientLogos, images, services, stats, insights } from "../data";
import {
  ButtonLink,
  CTA,
  Eyebrow,
  PageFrame,
  Reveal,
  SectionHeading,
  ServiceCard,
  WorkCard,
} from "../components/Site";
import {
  HeroAmbientCanvas,
  HeroRotatingWord,
} from "../components/HeroMotion";
import { ExecutiveTestimonials } from "../components/ExecutiveTestimonials";
import { SectorMatrix } from "../components/SectorMatrix";
import { EngagementModels } from "../components/EngagementModels";
import { PartnerConsultationModal } from "../components/PartnerConsultationModal";

function ClientMarquee() {
  return (
    <div className="client-marquee-container" aria-label="Partner organizations and enterprise clients">
      <div className="container">
        <p className="marquee-preface">
          TRUSTED BY CATEGORY LEADERS, VENTURE-BACKED OPERATORS, AND GLOBAL ENTERPRISES
        </p>
      </div>
      <div className="marquee-outer-wrap">
        <div className="marquee-inner-track">
          {clientLogos.concat(clientLogos).map((logo, idx) => (
            <div className="marquee-client-item" key={`${logo}-${idx}`}>
              <span className="marquee-bullet">◆</span>
              <span className="marquee-brand-text">{logo}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatStrip() {
  return (
    <section className="stats-strip-luxury" aria-label="Executive Performance Metrics">
      <div className="container">
        <div className="stats-grid-luxury">
          {stats.map((stat, i) => (
            <div className="stat-card-luxury" key={stat.label}>
              <div className="stat-card-top">
                <span className="stat-number">{stat.value}</span>
                <span className="stat-pill-idx">0{i + 1}</span>
              </div>
              <p className="stat-caption">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const [budget, setBudget] = useState(1500000);
  const [focusTier, setFocusTier] = useState<"scaleup" | "enterprise" | "global">("enterprise");
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  // Auto-loop between both human trust scenes every 6.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev === 0 ? 1 : 0));
    }, 6500);
    return () => clearInterval(interval);
  }, []);

  // Dynamic calculations for the executive simulator
  const simulation = useMemo(() => {
    const multiplier = focusTier === "scaleup" ? 3.4 : focusTier === "enterprise" ? 4.8 : 5.6;
    const leadsRate = focusTier === "scaleup" ? 0.08 : focusTier === "enterprise" ? 0.12 : 0.15;
    const avgCpc = focusTier === "scaleup" ? 18 : focusTier === "enterprise" ? 32 : 45;

    const estimatedClicks = Math.round(budget / avgCpc);
    const qualifiedLeads = Math.round(estimatedClicks * leadsRate);
    const projectedPipeline = Math.round(budget * multiplier);

    const pod =
      focusTier === "scaleup"
        ? "1 Lead Strategist · 1 Senior Product Engineer · 1 Growth Operator"
        : focusTier === "enterprise"
        ? "1 Partner Director · 2 Full-Stack Engineers · 1 Analytics Architect · 1 Creative Lead"
        : "Dedicated Global Unit: 4 Engineers · 2 Commercial Strategists · 24/7 Operations Hub";

    return {
      clicks: estimatedClicks,
      leads: qualifiedLeads,
      pipeline: projectedPipeline,
      pod,
    };
  }, [budget, focusTier]);

  return (
    <PageFrame>
      {/* Hero Section — Left-Aligned with Looping Human Trust Background & Black Shadow Overlay */}
      <section className="hero-luxury hero-cinematic-loop hero-align-left">
        {/* Looping Human Background Scenes */}
        <div className="hero-background-slides" aria-hidden="true">
          <div
            className={`hero-bg-slide ${activeSlide === 0 ? "active" : ""}`}
            style={{ backgroundImage: `url(${images.hero})` }}
          />
          <div
            className={`hero-bg-slide ${activeSlide === 1 ? "active" : ""}`}
            style={{ backgroundImage: `url(${images.heroBoardroom})` }}
          />
        </div>

        {/* Black directional shadow on image (left-to-right feathering) */}
        <div className="hero-shadow-overlay" aria-hidden="true" />
        <HeroAmbientCanvas />

        <div className="container hero-container-relative">
          <div className="hero-text-wrapper">
            <Reveal className="hero-text-column">
              <h1 className="hero-headline">
                Architecting category authority for{" "}
                <HeroRotatingWord />
              </h1>

              <p className="hero-lead-paragraph">
                Storm Veins unifies strategic brand positioning, high-velocity digital flagships, and compounding commercial engines into one continuous standard of enterprise excellence.
              </p>

              {/* Human Trust Seal — Named Principals */}
              <div className="hero-human-trust-seal">
                <div className="trust-seal-avatars">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
                    alt="Marcus Vance, Managing Partner"
                    className="trust-avatar"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80"
                    alt="Elena Rostova, Principal Systems Architect"
                    className="trust-avatar"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80"
                    alt="Devin Chen, Managing Partner"
                    className="trust-avatar"
                  />
                </div>
                <div className="trust-seal-meta">
                  <span className="trust-seal-title">
                    <strong>Senior Managing Principals</strong> Embedded In Every Pod
                  </span>
                  <span className="trust-seal-sub">Direct Partner Accountability · Zero Junior Handoffs</span>
                </div>
              </div>

              <div className="hero-cta-group">
                <ButtonLink to="/work" variant="emerald" className="hero-btn-primary">
                  Explore Enterprise Work
                </ButtonLink>
                <button
                  type="button"
                  className="btn-luxury btn-outline hero-btn-secondary"
                  onClick={() => setIsConsultationOpen(true)}
                >
                  <span>Initiate Strategy Call</span>
                  <ArrowRight size={15} />
                </button>
              </div>

              <div className="hero-trust-guarantees" aria-label="Executive Partnership Standards">
                <span className="trust-item">
                  <ShieldCheck size={14} className="text-emerald" /> Strict NDA Protocol
                </span>
                <span className="trust-bullet">·</span>
                <span className="trust-item">
                  <Sparkles size={14} className="text-emerald" /> Direct Partner Access
                </span>
                <span className="trust-bullet">·</span>
                <span className="trust-item">
                  <Zap size={14} className="text-emerald" /> Response in &lt;12 Hours
                </span>
              </div>

              <div className="hero-executive-ribbon">
                <div className="ribbon-metric-item">
                  <strong className="ribbon-val">$140M+</strong>
                  <span className="ribbon-lbl">Portfolio Accretion</span>
                </div>
                <div className="ribbon-divider" />
                <div className="ribbon-metric-item">
                  <strong className="ribbon-val">2.4×</strong>
                  <span className="ribbon-lbl">Pipeline Velocity</span>
                </div>
                <div className="ribbon-divider" />
                <div className="ribbon-metric-item">
                  <strong className="ribbon-val">11</strong>
                  <span className="ribbon-lbl">Sovereign Markets</span>
                </div>
                <div className="ribbon-divider" />
                <div className="ribbon-metric-item">
                  <strong className="ribbon-val">99.2%</strong>
                  <span className="ribbon-lbl">Partner Retention</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Prestige Client Marquee */}
      <ClientMarquee />

      {/* Key Numbers */}
      <StatStrip />

      {/* The Strategic Value Index */}
      <section className="section-luxury index-section">
        <div className="container">
          <div className="split-section-header">
            <SectionHeading
              eyebrow="The Storm Veins Architecture"
              title={
                <>
                  Built for organizations with<br />
                  <span className="text-gradient">somewhere meaningful to go.</span>
                </>
              }
              copy="Too many brands fragment their momentum between disconnected branding agencies, web development boutiques, and media buyers. We unite all three into a single, cohesive line of sight."
            />
            <div className="header-stat-callout">
              <span className="callout-num">01 — 03</span>
              <span className="callout-desc">Core Disciplines</span>
            </div>
          </div>

          <div className="index-features-grid">
            <div className="index-card-luxury">
              <div className="index-card-header">
                <div className="index-icon-box">
                  <Compass size={22} strokeWidth={1.8} />
                </div>
                <span className="index-num">Pillar 01</span>
              </div>
              <h3>Strategic Precision</h3>
              <p>
                We strip away vanity positioning to unearth the undeniable commercial truth that commands category leadership and pricing resilience.
              </p>
              <ul className="index-points">
                <li>
                  <CheckCircle2 size={15} /> Category Framing & Moats
                </li>
                <li>
                  <CheckCircle2 size={15} /> Commercial Unit Economics
                </li>
                <li>
                  <CheckCircle2 size={15} /> Multi-Touch Attribution
                </li>
              </ul>
            </div>

            <div className="index-card-luxury">
              <div className="index-card-header">
                <div className="index-icon-box">
                  <Cpu size={22} strokeWidth={1.8} />
                </div>
                <span className="index-num">Pillar 02</span>
              </div>
              <h3>Flagship Engineering</h3>
              <p>
                Modern digital flagships engineered with obsessive speed, micro-interactions, responsive design systems, and robust enterprise integrations.
              </p>
              <ul className="index-points">
                <li>
                  <CheckCircle2 size={15} /> High-Speed Web Applications
                </li>
                <li>
                  <CheckCircle2 size={15} /> Clean Design Token Systems
                </li>
                <li>
                  <CheckCircle2 size={15} /> Frictionless CRM & Automation
                </li>
              </ul>
            </div>

            <div className="index-card-luxury">
              <div className="index-card-header">
                <div className="index-icon-box">
                  <Zap size={22} strokeWidth={1.8} />
                </div>
                <span className="index-num">Pillar 03</span>
              </div>
              <h3>Compounding Velocity</h3>
              <p>
                Growth engines engineered to generate sustainable, predictable customer acquisition without diluting brand equity or inflating blended CAC.
              </p>
              <ul className="index-points">
                <li>
                  <CheckCircle2 size={15} /> High-Intent Paid Acquisition
                </li>
                <li>
                  <CheckCircle2 size={15} /> Lifecycle Retention Funnels
                </li>
                <li>
                  <CheckCircle2 size={15} /> Executive Analytics Dashboards
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Sector Matrix (Category Lens inspired by Vervali) */}
      <SectorMatrix />

      {/* Capabilities / Services */}
      <section className="section-luxury services-showcase-section">
        <div className="container">
          <div className="split-section-header">
            <SectionHeading
              eyebrow="Capabilities & Deliverables"
              title={
                <>
                  Disciplines engineered to<br />
                  <span className="text-gradient">reinforce each other.</span>
                </>
              }
              copy="Every capability operates under a unified architectural standard. No misaligned incentives. Zero handoff friction."
            />
            <ButtonLink to="/services" variant="outline">
              Explore All Capabilities
            </ButtonLink>
          </div>

          <div className="services-grid-luxury">
            {services.map((service, index) => (
              <ServiceCard key={service.number} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Selected Work (Dark Gallery) */}
      <section className="dark-gallery-section">
        <div className="container">
          <div className="dark-gallery-header">
            <SectionHeading
              light
              eyebrow="Verified Case Studies"
              title={
                <>
                  Outcomes that leave a<br />
                  <span className="text-emerald-glow">lasting commercial mark.</span>
                </>
              }
              copy="A curated selection of our work spanning venture-backed scale-ups, global mobility platforms, and complex enterprise B2B ecosystems."
            />
            <ButtonLink to="/work" variant="light">
              View All Case Studies
            </ButtonLink>
          </div>

          <div className="work-grid-luxury">
            {caseStudies.map((project, index) => (
              <WorkCard key={project.title} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Flexible Engagement Architectures (Inspired by Vervali) */}
      <EngagementModels />

      {/* Executive Growth Simulator */}
      <section className="section-luxury simulator-section">
        <div className="container">
          <div className="simulator-grid-luxury">
            <div className="simulator-copy-side">
              <Eyebrow badge>Interactive Performance Modeler</Eyebrow>
              <h2>
                Model your potential<br />
                <span className="text-gradient">commercial trajectory.</span>
              </h2>
              <p>
                Estimate the direct high-intent audience reach, qualified pipeline generation, and dedicated pod architecture required to scale your enterprise.
              </p>

              <div className="simulator-tier-selector">
                <span className="tier-label">SELECT OPERATIONAL TIER:</span>
                <div className="tier-buttons">
                  <button
                    type="button"
                    className={`tier-btn ${focusTier === "scaleup" ? "active" : ""}`}
                    onClick={() => setFocusTier("scaleup")}
                  >
                    Scale-Up Growth
                  </button>
                  <button
                    type="button"
                    className={`tier-btn ${focusTier === "enterprise" ? "active" : ""}`}
                    onClick={() => setFocusTier("enterprise")}
                  >
                    Enterprise Market Leader
                  </button>
                  <button
                    type="button"
                    className={`tier-btn ${focusTier === "global" ? "active" : ""}`}
                    onClick={() => setFocusTier("global")}
                  >
                    Global Multinational
                  </button>
                </div>
              </div>

              <div className="simulator-assumptions">
                <div className="assumption-item">
                  <ShieldCheck size={16} />
                  <span>Audited against historical cohort conversion metrics</span>
                </div>
                <div className="assumption-item">
                  <BarChart2 size={16} />
                  <span>Directional baseline tailored to competitive category CAC</span>
                </div>
              </div>

              <button
                type="button"
                className="btn-luxury btn-emerald simulator-cta"
                onClick={() => setIsConsultationOpen(true)}
              >
                <span>Request Audited Strategy Plan</span>
                <ArrowRight size={15} />
              </button>
            </div>

            <div className="simulator-card-luxury">
              <div className="simulator-card-head">
                <div>
                  <span className="sim-head-tag">MONTHLY GROWTH CAPITAL</span>
                  <strong className="sim-budget-display">
                    ₹{budget.toLocaleString("en-IN")}
                    <span className="sim-usd-approx">
                      (~${Math.round(budget / 84).toLocaleString("en-US")})
                    </span>
                  </strong>
                </div>
                <span className="sim-badge-active">REAL-TIME SIMULATION</span>
              </div>

              {/* Slider */}
              <div className="slider-wrapper">
                <input
                  aria-label="Monthly Growth Capital"
                  type="range"
                  min={300000}
                  max={5000000}
                  step={100000}
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  className="range-input-luxury"
                />
                <div className="slider-notches">
                  <button type="button" onClick={() => setBudget(500000)}>₹5L</button>
                  <button type="button" onClick={() => setBudget(1500000)}>₹15L</button>
                  <button type="button" onClick={() => setBudget(3000000)}>₹30L</button>
                  <button type="button" onClick={() => setBudget(5000000)}>₹50L+</button>
                </div>
              </div>

              {/* Calculated Outputs */}
              <div className="sim-kpis-grid">
                <div className="sim-kpi-item">
                  <span className="kpi-label">ESTIMATED QUALIFIED REACH</span>
                  <strong className="kpi-val">{simulation.clicks.toLocaleString("en-IN")}</strong>
                  <span className="kpi-sub">High-intent visits / mo</span>
                </div>

                <div className="sim-kpi-item highlight-item">
                  <span className="kpi-label">PROJECTED QUALIFIED LEADS</span>
                  <strong className="kpi-val text-emerald">
                    {simulation.leads.toLocaleString("en-IN")}
                  </strong>
                  <span className="kpi-sub">Validated decision-makers</span>
                </div>

                <div className="sim-kpi-item wide-item">
                  <span className="kpi-label">ESTIMATED PIPELINE ACCRETION</span>
                  <strong className="kpi-val">
                    ₹{simulation.pipeline.toLocaleString("en-IN")}
                  </strong>
                  <span className="kpi-sub">
                    ~${Math.round(simulation.pipeline / 84).toLocaleString("en-US")} ARR opportunity
                  </span>
                </div>
              </div>

              <div className="sim-pod-breakdown">
                <span className="pod-title">RECOMMENDED STUDIO POD ALLOCATION:</span>
                <p className="pod-detail">{simulation.pod}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Methodology Overview */}
      <section className="section-luxury operating-rhythm-section">
        <div className="container">
          <div className="split-section-header">
            <SectionHeading
              eyebrow="Operating Architecture"
              title={
                <>
                  How we partner with<br />
                  <span className="text-gradient">executive leadership.</span>
                </>
              }
              copy="We embed as high-caliber operators alongside your executive team. Transparent cadences, direct communication, and zero corporate bureaucracy."
            />
          </div>

          <div className="operating-steps-grid">
            {[
              {
                step: "01",
                title: "Discovery & Opportunity Framing",
                desc: "We analyze your unit economics, competitive landscape, and audience tensions to establish an indisputable strategic hypothesis.",
              },
              {
                step: "02",
                title: "System Architecture & Build",
                desc: "Brand world, high-performance web platform, and conversion engines are engineered in tandem by a dedicated multidisciplinary pod.",
              },
              {
                step: "03",
                title: "Velocity & Continuous Optimization",
                desc: "We launch with extreme precision, monitor telemetry signals, and iterate aggressively to maximize qualified commercial pipeline.",
              },
            ].map((phase) => (
              <div className="step-card-luxury" key={phase.step}>
                <span className="step-num-pill">{phase.step}</span>
                <h3 className="step-title">{phase.title}</h3>
                <p className="step-desc">{phase.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Executive Testimonials (Human-Touching Proof from Real Leaders) */}
      <ExecutiveTestimonials />

      {/* Human-Authored Executive Insights & Dispatches */}
      <section className="section-luxury homepage-insights-section">
        <div className="container">
          <div className="split-section-header">
            <SectionHeading
              eyebrow="Executive Insights &amp; Briefs"
              title={
                <>
                  Thought leadership written by<br />
                  <span className="text-gradient">practicing studio principals.</span>
                </>
              }
              copy="Actionable briefs on commercial architecture, high-velocity engineering, and brand positioning without fluff."
            />
            <ButtonLink to="/insights" variant="outline">
              Read All Dispatches
            </ButtonLink>
          </div>

          <div className="homepage-insights-grid">
            {insights.slice(0, 3).map((item, idx) => (
              <div className="insight-card-luxury" key={item.title}>
                {(item as any).coverImage && (
                  <div className="insight-card-cover">
                    <img
                      src={(item as any).coverImage}
                      alt={item.title}
                      className="insight-cover-img"
                      loading="lazy"
                    />
                  </div>
                )}
                <div className="insight-card-top-row">
                  <span className="insight-category-chip">{item.category}</span>
                  <span className="insight-read-time">{item.readTime}</span>
                </div>
                <h3 className="insight-card-title">{item.title}</h3>

                <div className="insight-author-block">
                  <img
                    src={item.authorAvatar}
                    alt={item.author}
                    className="insight-author-avatar"
                    loading="lazy"
                  />
                  <div className="insight-author-details">
                    <strong className="insight-author-name">{item.author}</strong>
                    <span className="insight-author-role">{item.authorRole}</span>
                  </div>
                </div>

                <div className="insight-card-footer">
                  <ButtonLink to="/insights" variant="outline" className="insight-read-link">
                    Read Executive Brief <ArrowUpRight size={14} />
                  </ButtonLink>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Human Consultation Concierge Banner */}
      <section className="concierge-cta-strip">
        <div className="container">
          <div className="concierge-box">
            <div className="concierge-text">
              <span className="concierge-pill">DIRECT PARTNER ACCESS</span>
              <h3>Need an architectural assessment of your enterprise stack?</h3>
              <p>
                Connect directly with a managing partner. We review your current conversion funnels, brand architecture, and tech performance under strict NDA.
              </p>
            </div>
            <div className="concierge-action">
              <button
                type="button"
                className="btn-luxury btn-emerald"
                onClick={() => setIsConsultationOpen(true)}
              >
                <span>Schedule Executive Call</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise Closing Call to Action */}
      <CTA />

      {/* Modal Dialog */}
      <PartnerConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
      />
    </PageFrame>
  );
}
