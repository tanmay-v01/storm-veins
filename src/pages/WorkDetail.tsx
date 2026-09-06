import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Calendar,
  CheckCircle2,
  Clock,
  Compass,
  Globe2,
  Share2,
  ShieldCheck,
  Sparkles,
  Star,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { allProjects, testimonials, insights } from "../data";
import {
  ButtonLink,
  CTA,
  Eyebrow,
  InteriorHero,
  PageFrame,
  SectionHeading,
} from "../components/Site";

export default function WorkDetail() {
  const { slug } = useParams();
  
  const project = allProjects.find((entry) => entry.slug === slug) || allProjects[0];

  const nextProjectIndex = (allProjects.findIndex((entry) => entry.slug === project.slug) + 1) % allProjects.length;
  const nextProject = allProjects[nextProjectIndex];

  // Find matching client testimonial
  const matchedTestimonial = testimonials.find(
    (t) =>
      t.id === project.testimonialId ||
      t.company.toLowerCase().includes(project.client.toLowerCase()) ||
      project.client.toLowerCase().includes(t.company.toLowerCase())
  ) || testimonials[0];

  return (
    <PageFrame>
      {/* Case Study Hero */}
      <section className="case-hero-luxury">
        <div className="container">
          <div className="case-hero-nav">
            <div className="case-nav-breadcrumbs">
              <Link className="back-link-luxury" to="/work">
                <ArrowLeft size={16} />
                <span>Work</span>
              </Link>
            </div>
            <div className="case-hero-tag">
              <span className="hero-pill-dot" />
              <span>{project.domain || project.type}</span>
            </div>
          </div>

          <div className="case-hero-grid-luxury">
            <div className="case-hero-copy">
              <span className="case-client-badge">{project.client}</span>
              <h1 className="case-main-title">{project.title}</h1>
              <p className="case-main-summary">{project.summary}</p>

              <div className="case-metrics-headline-card">
                <div className="metric-primary-box">
                  <span className="metric-label">PRIMARY OUTCOME</span>
                  <strong className="metric-headline">{project.result}</strong>
                </div>
                <div className="metric-secondary-box">
                  <span className="metric-label">COMMERCIAL IMPACT</span>
                  <strong className="metric-subheadline">
                    {project.secondaryMetric || project.outcome}
                  </strong>
                </div>
              </div>

              {project.technologies && project.technologies.length > 0 && (
                <div className="case-tech-stack-row">
                  <span className="tech-stack-title">ENGINEERED WITH:</span>
                  <div className="tech-chips-list">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="tech-chip-item">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="case-hero-visual-frame">
              <img
                src={project.image}
                alt={project.title}
                className="case-hero-img"
              />
              <div className="case-hero-vignette" />
            </div>
          </div>
        </div>
      </section>

      {/* Case Study Meta & Facts Strip */}
      <section className="case-facts-strip-luxury">
        <div className="container">
          <div className="facts-grid-luxury">
            <div className="fact-item-luxury">
              <span className="fact-label">ENTERPRISE PARTNER</span>
              <strong className="fact-val">{project.client}</strong>
            </div>
            <div className="fact-item-luxury">
              <span className="fact-label">MARKETS DEPLOYED</span>
              <strong className="fact-val">{project.markets}</strong>
            </div>
            <div className="fact-item-luxury">
              <span className="fact-label">EXECUTION TIMELINE</span>
              <strong className="fact-val">{project.timeline}</strong>
            </div>
            <div className="fact-item-luxury">
              <span className="fact-label">CORE DOMAIN</span>
              <strong className="fact-val">{project.domain || project.category}</strong>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Narrative Section */}
      <section className="section-luxury case-narrative-section">
        <div className="container">
          <div className="narrative-grid-luxury">
            <div className="narrative-sticky-col">
              <Eyebrow badge>The Commercial Brief</Eyebrow>
              <h2>The Strategic Dilemma</h2>
              <p className="narrative-challenge-text">{project.challenge}</p>

              <div className="deliverables-checklist-card">
                <span className="checklist-title">SYSTEMS DELIVERED:</span>
                <div className="checklist-items">
                  {project.deliverables.map((item) => (
                    <div className="check-item" key={item}>
                      <CheckCircle2 size={16} className="text-emerald" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="narrative-content-col">
              <div className="narrative-story-block">
                <span className="block-num">01 / ARCHITECTURAL DECISION</span>
                <h3>Reframing the System</h3>
                <p>{project.decision}</p>
              </div>

              <div className="narrative-story-block">
                <span className="block-num">02 / MEASURED OUTCOME</span>
                <h3>The Commercial Reality</h3>
                <p>{project.outcome}</p>
              </div>

              <div className="narrative-story-block highlight-learning">
                <span className="block-num">03 / EXECUTIVE TAKEAWAY</span>
                <h3>The Compounding Lesson</h3>
                <blockquote>“{project.learning}”</blockquote>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Verified Client Testimonial Endorsement */}
      {matchedTestimonial && (
        <section className="section-luxury case-detail-testimonial-section">
          <div className="container">
            <div className="case-detail-testimonial-card">
              <div className="testimonial-top-meta">
                <div className="testimonial-verified-badge">
                  <ShieldCheck size={16} className="text-emerald" />
                  <span>VERIFIED EXECUTIVE PARTNER ENDORSEMENT</span>
                </div>
                <div className="testimonial-stars-rating" aria-label="5 stars rating">
                  {[...Array(matchedTestimonial.rating || 5)].map((_, i) => (
                    <Star key={i} size={15} className="star-filled" />
                  ))}
                  <span className="rating-num">5.0 / 5.0</span>
                </div>
              </div>

              <blockquote className="detail-testimonial-quote">
                "{matchedTestimonial.quote}"
              </blockquote>

              <div className="testimonial-footer-row">
                <div className="testimonial-human-profile">
                  <div className="human-avatar-wrapper">
                    <img
                      src={matchedTestimonial.avatar}
                      alt={matchedTestimonial.author}
                      className="human-avatar-img"
                      loading="lazy"
                    />
                  </div>
                  <div className="human-identity-block">
                    <strong className="human-name">{matchedTestimonial.author}</strong>
                    <span className="human-title">{matchedTestimonial.role}</span>
                    <span className="human-org">{matchedTestimonial.company} · {matchedTestimonial.location}</span>
                  </div>
                </div>

                <div className={`testimonial-kpi-pill kpi-accent-${matchedTestimonial.badgeColor}`}>
                  <span className="kpi-num">{matchedTestimonial.metricValue}</span>
                  <span className="kpi-txt">{matchedTestimonial.metricLabel}</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Next Project Footer Bar */}
      <section className="next-project-banner">
        <div className="container">
          <div className="next-project-inner">
            <div>
              <span className="next-label">NEXT SELECTED CASE STUDY</span>
              <h3 className="next-title">{nextProject.title}</h3>
              <span className="next-client">
                {nextProject.client} · {nextProject.result}
              </span>
            </div>
            <ButtonLink
              to={`/work/${nextProject.slug}`}
              variant="emerald"
              className="next-btn"
            >
              Explore Case Study
            </ButtonLink>
          </div>
        </div>
      </section>

      <CTA />
    </PageFrame>
  );
}

export function Insights() {
  return (
    <PageFrame>
      <InteriorHero
        eyebrow="Executive Insights / 07"
        title={
          <>
            Perspectives on <span className="text-gradient">commercial velocity.</span>
          </>
        }
        copy="Observations on brand architecture, attribution modeling, and digital product design from the studio partners."
        number="07 / 07"
      />

      <section className="section-luxury insights-listing-section">
        <div className="container">
          <div className="split-section-header">
            <SectionHeading
              eyebrow="Studio Notes"
              title={
                <>
                  Perspectives worth<br />
                  <span className="text-gradient">commercial consideration.</span>
                </>
              }
              copy="Curated essays and field observations on what separates market leaders from also-rans."
            />
            <div className="insights-count-badge">
              <span className="live-dot" />
              <span>{insights.length} Published Papers</span>
            </div>
          </div>

          <div className="insights-grid-luxury">
            {insights.map((note, index) => (
              <article className="insight-card-luxury" key={note.title}>
                <div className="insight-card-top">
                  <span className="insight-category-badge">{note.category}</span>
                  <span className="insight-read-time">
                    <Clock size={12} /> {note.readTime}
                  </span>
                </div>

                <h3 className="insight-card-title">{note.title}</h3>

                <div className="insight-card-footer">
                  <span className="insight-date">{note.date}</span>
                  <span className="insight-read-link">
                    <span>Read Executive Note</span>
                    <ArrowUpRight size={15} />
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </PageFrame>
  );
}

export function NotFound() {
  return (
    <PageFrame>
      <section className="not-found-section-luxury">
        <div className="container not-found-inner">
          <Eyebrow badge>404 / Document Not Found</Eyebrow>
          <h1 className="not-found-title">
            This route is not in <span className="text-gradient">our architecture.</span>
          </h1>
          <p className="not-found-desc">
            The page you requested does not exist or has been relocated to our updated studio directory.
          </p>
          <div className="not-found-action">
            <ButtonLink to="/" variant="emerald">
              Return to Studio Homepage
            </ButtonLink>
            <ButtonLink to="/work" variant="outline">
              Explore Selected Work
            </ButtonLink>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
