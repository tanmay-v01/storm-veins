import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  CheckCircle2,
  Code2,
  Globe2,
  Instagram,
  Linkedin,
  Menu,
  Palette,
  Sparkles,
  X,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { caseStudies, navItems, services } from "../data";

export function Logo({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link className={`logo ${inverse ? "logo-inverse" : ""}`} to="/" aria-label="Storm Veins Home">
      <span className="logo-symbol" aria-hidden="true">
        <span className="symbol-bar bar-1" />
        <span className="symbol-bar bar-2" />
        <span className="symbol-bar bar-3" />
      </span>
      <span className="logo-text">
        <span className="logo-brand">STORM VEINS</span>
        <span className="logo-sub">MEDIA HOUSE · EST. 2018</span>
      </span>
    </Link>
  );
}

export function ButtonLink({
  to,
  children,
  variant = "dark",
  className = "",
}: {
  to: string;
  children: React.ReactNode;
  variant?: "dark" | "light" | "outline" | "emerald";
  className?: string;
}) {
  return (
    <Link className={`btn-luxury btn-${variant} ${className}`} to={to}>
      <span>{children}</span>
      <span className="btn-icon-wrap" aria-hidden="true">
        <ArrowUpRight size={15} strokeWidth={2.2} />
      </span>
    </Link>
  );
}

export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <div className={`reveal-item ${className}`} style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}>
      {children}
    </div>
  );
}

export function Eyebrow({
  children,
  light = false,
  badge = false,
}: {
  children: React.ReactNode;
  light?: boolean;
  badge?: boolean;
}) {
  return (
    <div className={`eyebrow-luxury ${light ? "eyebrow-light" : ""} ${badge ? "eyebrow-badge" : ""}`}>
      <span className="eyebrow-dot" aria-hidden="true" />
      <span>{children}</span>
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  copy,
  light = false,
  align = "left",
}: {
  eyebrow: string;
  title: React.ReactNode;
  copy?: string;
  light?: boolean;
  align?: "left" | "center";
}) {
  return (
    <div className={`section-heading-luxury ${light ? "heading-light" : ""} heading-align-${align}`}>
      <Eyebrow light={light} badge>{eyebrow}</Eyebrow>
      <h2>{title}</h2>
      {copy && <p>{copy}</p>}
    </div>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, []);

  const isHome = location.pathname === "/";

  return (
    <header
      className={`site-header-luxury ${isHome ? "header-home-transparent" : "header-interior"} ${
        scrolled ? "is-scrolled" : ""
      } ${open ? "menu-open" : ""}`}
    >
      <div className="header-inner">
        <Logo />

        <nav className="desktop-nav" aria-label="Main navigation">
          {navItems.map((item) => {
            const isActive = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`nav-link ${isActive ? "active" : ""}`}
                aria-current={isActive ? "page" : undefined}
              >
                {item.label}
                {isActive && <span className="nav-active-pill" />}
              </Link>
            );
          })}
        </nav>

        <div className="header-actions">
          <ButtonLink to="/contact" variant="dark" className="header-cta-btn desktop-only">
            Initiate Project
          </ButtonLink>
          <button
            ref={menuButtonRef}
            className="menu-toggle-btn"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={open}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      <div className={`mobile-nav-drawer ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <div className="mobile-nav-content">
          <div className="mobile-nav-links">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`mobile-nav-item ${location.pathname === item.to ? "active" : ""}`}
                aria-current={location.pathname === item.to ? "page" : undefined}
              >
                <span>{item.label}</span>
                <ArrowUpRight size={18} />
              </Link>
            ))}
          </div>

          <div className="mobile-nav-footer">
            <Link to="/contact" className="mobile-cta-btn">
              <span>Start an Enterprise Engagement</span>
              <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="site-footer-luxury">
      <div className="footer-container">
        <div className="footer-top-grid">
          <div className="footer-brand-col">
            <Logo inverse />
            <p className="footer-mission">
              Storm Veins is an executive growth studio. We engineer market-defining brand systems, high-velocity digital flagships, and compounding commercial engines for ambitious enterprises worldwide.
            </p>
            <div className="footer-status-pill">
              <span className="live-status-dot" />
              <span>Global Studio Operations Active · Q3/Q4 Briefs</span>
            </div>
          </div>

          <div className="footer-nav-col">
            <span className="footer-col-title">Navigation</span>
            <Link to="/about">About Studio</Link>
            <Link to="/services">Capabilities</Link>
            <Link to="/work">Selected Work</Link>
            <Link to="/approach">Methodology</Link>
            <Link to="/insights">Executive Insights</Link>
            <Link to="/careers">Careers & Fellowships</Link>
          </div>

          <div className="footer-nav-col">
            <span className="footer-col-title">Presence</span>
            <div className="office-item">
              <strong>Mumbai & Thane</strong>
              <span>Maharashtra, India</span>
            </div>
          </div>

          <div className="footer-nav-col">
            <span className="footer-col-title">Direct Inquiries</span>
            <a href="mailto:contact@stormveins.com" className="footer-contact-link">
              contact@stormveins.com
            </a>
            <a href="tel:+919699831323" className="footer-contact-link">
              +91 96998 31323
            </a>
            <Link to="/contact" className="footer-start-link">
              <span>Initiate Executive Brief</span>
              <ArrowUpRight size={14} />
            </Link>
            <div className="footer-social-row">
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="Storm Veins on LinkedIn"
              >
                <Linkedin size={16} />
              </a>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="Storm Veins on Instagram"
              >
                <Instagram size={16} />
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom-bar">
          <div className="footer-legal">
            <span>© {new Date().getFullYear()} Storm Veins Media House. All rights reserved.</span>
            <span>Enterprise Growth & Digital Flagship Architecture.</span>
          </div>
          <div className="footer-specs">
            <span>ISO 27001 Aligned Security</span>
            <span className="bullet-sep">·</span>
            <span>SOC-2 Type II Certified Ops</span>
            <span className="bullet-sep">·</span>
            <Link to="/studio">Internal Suite</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function PageFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="app-viewport">
      <Header />
      <main className="main-content">{children}</main>
      <Footer />
    </div>
  );
}

export function ServiceCard({
  service,
  index,
}: {
  service: (typeof services)[number];
  index: number;
}) {
  const Icon = service.icon === "chart" ? BarChart3 : service.icon === "code" ? Code2 : Palette;

  return (
    <Reveal delay={index * 90}>
      <Link className="service-card-luxury" to="/services">
        <div className="service-card-media">
          <img src={service.image} alt={service.title} loading="lazy" decoding="async" />
          <div className="service-media-overlay" />
          <div className="service-card-badge">
            <span className="service-idx">{service.number}</span>
            <span className="service-category">{service.tags[0]}</span>
          </div>
        </div>

        <div className="service-card-body">
          <div className="service-icon-bubble">
            <Icon size={20} strokeWidth={1.8} />
          </div>

          <h3 className="service-title">{service.title}</h3>
          <p className="service-description">{service.text}</p>

          <div className="service-pill-row">
            {service.tags.map((tag) => (
              <span className="service-pill" key={tag}>
                {tag}
              </span>
            ))}
          </div>

          <div className="service-card-footer">
            <span className="service-learn-more">Explore Capability</span>
            <span className="service-arrow-wrap">
              <ArrowRight size={16} />
            </span>
          </div>
        </div>
      </Link>
    </Reveal>
  );
}

export function WorkCard({
  project,
  index,
}: {
  project: (typeof caseStudies)[number];
  index: number;
}) {
  return (
    <Reveal delay={index * 90}>
      <Link className="work-card-luxury" to={`/work/${project.slug}`}>
        <div className="work-media-container">
          <img src={project.image} alt={project.title} loading="lazy" decoding="async" />
          <div className="work-media-gradient" />

          <div className="work-media-top-bar">
            <span className="work-client-pill">{project.client}</span>
            <div className="work-hover-action" aria-hidden="true">
              <ArrowUpRight size={17} strokeWidth={2.4} />
            </div>
          </div>

          <div className="work-media-bottom-pill">
            <span className="work-live-dot" />
            <strong className="work-result-val">{project.result}</strong>
          </div>
        </div>

        <div className="work-content-container">
          <div className="work-header-meta">
            <span className="work-category-badge">{project.category}</span>
            <span className="work-timeline-meta">
              {project.timeline.split(" ")[0]} {project.timeline.split(" ")[1] || "Weeks"}
            </span>
          </div>

          <h3 className="work-title">{project.title}</h3>
          <p className="work-summary">{project.summary}</p>

          <div className="work-telemetry-grid">
            <div className="telemetry-card">
              <span className="telemetry-label">COMMERCIAL IMPACT</span>
              <strong className="telemetry-val">{project.secondaryMetric || project.result}</strong>
            </div>
            <div className="telemetry-card">
              <span className="telemetry-label">DEPLOYMENT MARKETS</span>
              <strong className="telemetry-val">{project.markets.split("·")[0].trim()}</strong>
            </div>
          </div>

          <div className="work-card-cta-row">
            <span className="cta-explore-text">Review Architecture & Telemetry</span>
            <span className="cta-arrow-slide" aria-hidden="true">
              <ArrowRight size={15} />
            </span>
          </div>
        </div>
      </Link>
    </Reveal>
  );
}

export function CTA() {
  return (
    <section className="cta-section-luxury">
      <div className="cta-ambient-glow" aria-hidden="true" />
      <div className="container cta-inner-wrap">
        <Eyebrow light badge>Enterprise Partnership Inquiry</Eyebrow>
        <h2>
          Ready to construct your<br />
          <span className="cta-highlight">next commercial advantage?</span>
        </h2>
        <p className="cta-subtitle">
          We partner with select category-defining organizations each quarter. Schedule an executive discovery session with our founding partners.
        </p>

        <div className="cta-action-row">
          <ButtonLink to="/contact" variant="emerald" className="cta-primary-btn">
            Initiate Confidential Brief
          </ButtonLink>
          <a href="mailto:contact@stormveins.com" className="btn-luxury btn-outline-white">
            <span>Direct Inquiries</span>
            <ArrowRight size={15} />
          </a>
        </div>

        <div className="cta-meta-info">
          <span>Direct: contact@stormveins.com</span>
          <span className="bullet-sep">·</span>
          <span>+91 96998 31323</span>
          <span className="bullet-sep">·</span>
          <span>Mumbai & Thane</span>
          <span className="bullet-sep">·</span>
          <span>Typical engagement response: &lt; 12 Hours</span>
        </div>
      </div>
    </section>
  );
}

export function InteriorHero({
  eyebrow,
  title,
  copy,
  number,
}: {
  eyebrow: string;
  title: React.ReactNode;
  copy: string;
  number: string;
}) {
  return (
    <section className="interior-hero-luxury">
      <div className="container interior-hero-grid">
        <div className="interior-hero-main">
          <Eyebrow badge>{eyebrow}</Eyebrow>
          <h1>{title}</h1>
        </div>
        <div className="interior-hero-aside">
          <div className="hero-index-chip">
            <span className="index-label">SECTION</span>
            <strong className="index-val">{number}</strong>
          </div>
          <p className="interior-hero-copy">{copy}</p>
        </div>
      </div>
    </section>
  );
}
