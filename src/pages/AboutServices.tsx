import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  CheckCircle2,
  Code2,
  Cpu,
  Globe2,
  Palette,
  ShieldCheck,
  Sparkles,
  Workflow,
  Zap,
} from "lucide-react";
import { images, services } from "../data";
import {
  ButtonLink,
  CTA,
  Eyebrow,
  InteriorHero,
  PageFrame,
  Reveal,
  SectionHeading,
} from "../components/Site";

export function About() {
  return (
    <PageFrame>
      <InteriorHero
        eyebrow="Studio Philosophy / 01"
        title={
          <>
            The space between <span className="text-gradient">bold ambition</span> and commercial velocity.
          </>
        }
        copy="Storm Veins is an independent, multidisciplinary growth studio engineered for organizations ready to lead their categories."
        number="01 / 06"
      />

      {/* Manifesto Section */}
      <section className="section-luxury about-manifesto-section">
        <div className="container">
          <div className="about-manifesto-grid">
            <div className="manifesto-lead-col">
              <Eyebrow badge>Founding Thesis</Eyebrow>
              <h2 className="manifesto-headline">
                Founded in Mumbai in 2018 with a singular conviction: the greatest enterprise outcomes occur when the strategists who frame the vision remain in the room with the engineers who build it.
              </h2>
            </div>
            <div className="manifesto-detail-col">
              <p>
                Eight years later, our studio operates as an agile, multidisciplinary collective spanning brand architecture, bespoke software engineering, performance marketing, and attribution analytics.
              </p>
              <p>
                We do not operate as a volume agency with junior handoffs. We partner with a deliberately capped roster of enterprise leaders, deploying dedicated pods that execute with unrelenting craft.
              </p>
              <div className="manifesto-stat-pill">
                <span className="pill-dot" />
                <span>Operating seamlessly across Mumbai, London, Singapore, and New York.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Architectural Image Band */}
      <section className="image-band-luxury">
        <img
          src={images.team}
          alt="Storm Veins leadership and strategic collaborative team"
          loading="lazy"
          decoding="async"
        />
        <div className="image-band-scrim" />
        <div className="container image-band-content">
          <div className="band-badge">
            <span className="band-status-dot" />
            <span>GLOBAL MULTIDISCIPLINARY COLLECTIVE</span>
          </div>
          <h3 className="band-quote">
            “No corporate theater. No vanity metrics. Pure, focused commercial acceleration.”
          </h3>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="section-luxury timeline-section-luxury">
        <div className="container">
          <div className="split-section-header">
            <SectionHeading
              eyebrow="Evolution & Scale"
              title={
                <>
                  Eight years of compounding<br />
                  <span className="text-gradient">craft and global results.</span>
                </>
              }
              copy="Our trajectory has been shaped by disciplined intentionality: expanding our technical depth while preserving intimate executive partnership."
            />
          </div>

          <div className="timeline-cards-grid">
            {[
              {
                year: "2018",
                title: "Inception in Mumbai",
                desc: "Storm Veins commences operations with a core team of senior strategists focusing on venture-backed brand architecture.",
              },
              {
                year: "2021",
                title: "Engineering Expansion",
                desc: "Full-stack digital engineering is unified with performance marketing to create integrated commercial flagships across 3 international markets.",
              },
              {
                year: "2024",
                title: "Global Enterprise Units",
                desc: "Dedicated pods expand to support multi-national enterprise platforms across UK, Europe, APAC, and North America.",
              },
              {
                year: "Present",
                title: "The Compounding Standard",
                desc: "$140M+ in verified client portfolio value generated, operating across 11 sovereign territories with a 99.2% retention record.",
              },
            ].map((milestone, idx) => (
              <div className="timeline-luxury-card" key={milestone.year}>
                <div className="timeline-card-top">
                  <span className="timeline-year">{milestone.year}</span>
                  <span className="timeline-marker">0{idx + 1}</span>
                </div>
                <h4>{milestone.title}</h4>
                <p>{milestone.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Operating Values */}
      <section className="section-luxury values-section-luxury">
        <div className="container">
          <div className="split-section-header">
            <SectionHeading
              eyebrow="Studio Principles"
              title={
                <>
                  Standards that guide every<br />
                  <span className="text-gradient">line of code and strategy.</span>
                </>
              }
              copy="These are not wall slogans; they are the architectural principles our partners rely on day in and day out."
            />
          </div>

          <div className="values-luxury-grid">
            {[
              {
                num: "01",
                title: "Empirical Rigor Over Vanity",
                text: "We evaluate work not by aesthetic trends, but by whether it creates pricing power, lowers acquisition costs, and expands market share.",
              },
              {
                num: "02",
                title: "Single Continuous Pods",
                text: "The founding partners who participate in your initial discovery are the exact minds directing strategy, architecture, and weekly execution.",
              },
              {
                num: "03",
                title: "Respect for System Velocity",
                text: "Software and brand systems must be engineered for extreme responsiveness. Sluggish interfaces and prolonged review cycles destroy commercial value.",
              },
            ].map((val) => (
              <div className="value-card-luxury" key={val.num}>
                <span className="value-num-pill">{val.num}</span>
                <h3>{val.title}</h3>
                <p>{val.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </PageFrame>
  );
}

export function Services() {
  return (
    <PageFrame>
      <InteriorHero
        eyebrow="Full-Stack Capabilities / 02"
        title={
          <>
            Integrated capabilities for <span className="text-gradient">category dominance.</span>
          </>
        }
        copy="A cohesive integration of quantitative commercial systems, high-speed digital products, and enduring brand positioning."
        number="02 / 06"
      />

      {/* Main Capabilities Deep Dive */}
      <section className="section-luxury capabilities-deep-section">
        <div className="container">
          <div className="capabilities-stack">
            {services.map((service, index) => {
              const Icon =
                service.icon === "chart" ? BarChart3 : service.icon === "code" ? Code2 : Palette;
              return (
                <Reveal key={service.number} delay={index * 80}>
                  <div className="capability-row-luxury" id={`capability-${service.number}`}>
                    <div className="cap-meta-col">
                      <span className="cap-number-display">{service.number}</span>
                      <div className="cap-icon-box">
                        <Icon size={26} strokeWidth={1.8} />
                      </div>
                    </div>

                    <div className="cap-main-col">
                      <div className="cap-tag-strip">
                        {service.tags.map((t) => (
                          <span className="cap-pill" key={t}>
                            {t}
                          </span>
                        ))}
                      </div>

                      <h2 className="cap-title">{service.title}</h2>
                      <p className="cap-copy">{service.text}</p>

                      <div className="cap-outputs-box">
                        <span className="outputs-label">CORE ARCHITECTURAL DELIVERABLES:</span>
                        <div className="outputs-grid">
                          {service.deliverables.map((item) => (
                            <div className="output-item" key={item}>
                              <CheckCircle2 size={16} />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="cap-action-col">
                      <ButtonLink to="/contact" variant="outline" className="cap-inquire-btn">
                        Discuss Scope
                      </ButtonLink>
                    </div>
                  </div>
                </Reveal>
              );
            })}

            {/* Modular Extensions */}
            <div className="capability-row-luxury modular-row">
              <div className="cap-meta-col">
                <span className="cap-number-display">04</span>
                <div className="cap-icon-box">
                  <Workflow size={26} strokeWidth={1.8} />
                </div>
              </div>

              <div className="cap-main-col">
                <div className="cap-tag-strip">
                  <span className="cap-pill">Modular Pod</span>
                  <span className="cap-pill">Enterprise Extension</span>
                </div>

                <h2 className="cap-title">Bespoke Enterprise Implementations</h2>
                <p className="cap-copy">
                  Custom AI integration layers, automated internal operating tools, multi-language localization engines, and bespoke data science pipelines tailored to complex enterprise requirements.
                </p>

                <div className="cap-outputs-box">
                  <span className="outputs-label">TYPICAL SPECIALIZED ENGAGEMENTS:</span>
                  <div className="outputs-grid">
                    <div className="output-item">
                      <CheckCircle2 size={16} />
                      <span>Enterprise CRM Migration</span>
                    </div>
                    <div className="output-item">
                      <CheckCircle2 size={16} />
                      <span>Multi-Tenant Architecture</span>
                    </div>
                    <div className="output-item">
                      <CheckCircle2 size={16} />
                      <span>Telemetry & Attribution Pipelines</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="cap-action-col">
                <ButtonLink to="/contact" variant="outline" className="cap-inquire-btn">
                  Custom Brief
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise Tech Stack Banner */}
      <section className="tech-stack-section">
        <div className="container">
          <div className="tech-stack-header">
            <Eyebrow light badge>Enterprise Technology Standards</Eyebrow>
            <h2>Built on modern, resilient architecture.</h2>
            <p>
              We build with modern frameworks that ensure zero-downtime scalability, sub-second load times, and bank-grade data security.
            </p>
          </div>

          <div className="tech-badges-grid">
            {[
              { name: "React & Next.js", desc: "Flagship Web Applications" },
              { name: "TypeScript", desc: "Type-Safe Enterprise Logic" },
              { name: "Node.js & Python", desc: "High-Throughput Backends" },
              { name: "Tailwind & CSS Systems", desc: "Micro-Millimeter UI Craft" },
              { name: "Cloudflare & Edge", desc: "Sub-50ms Global Latency" },
              { name: "PostgreSQL & Supabase", desc: "Relational Data Security" },
              { name: "Stripe & Commerce APIs", desc: "Zero-Friction Monetization" },
              { name: "Segment & BigQuery", desc: "Multi-Touch Data Warehouses" },
            ].map((tech) => (
              <div className="tech-card-luxury" key={tech.name}>
                <div className="tech-card-indicator" />
                <h4>{tech.name}</h4>
                <p>{tech.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Engagement Cadence */}
      <section className="section-luxury engagement-models-section">
        <div className="container">
          <div className="split-section-header">
            <SectionHeading
              eyebrow="Engagement Architecture"
              title={
                <>
                  Structured for clarity,<br />
                  <span className="text-gradient">momentum, and ROI.</span>
                </>
              }
              copy="Transparent engagement models designed to integrate seamlessly with executive stakeholders and internal engineering teams."
            />
          </div>

          <div className="models-grid-luxury">
            <div className="model-card-luxury">
              <span className="model-badge">MODEL 01</span>
              <h3>Dedicated Growth Pod</h3>
              <p>
                An embedded multidisciplinary team (Strategist, Full-Stack Engineers, Growth Architect) dedicated to your roadmap on an ongoing quarterly retainer.
              </p>
              <div className="model-specs">
                <span>Direct Slack / Teams integration</span>
                <span>Weekly sprint deliverables</span>
                <span>Continuous commercial attribution</span>
              </div>
            </div>

            <div className="model-card-luxury featured-model">
              <span className="model-badge badge-featured">MODEL 02 · RECOMMENDED</span>
              <h3>Flagship Sprint (12–16 Wks)</h3>
              <p>
                A high-intensity engagement designed to rebuild your digital platform, reposition the brand world, and launch an end-to-end commercial acquisition engine.
              </p>
              <div className="model-specs">
                <span>Complete brand & UX overhaul</span>
                <span>Turnkey production deployment</span>
                <span>Attribution warehouse setup</span>
              </div>
            </div>

            <div className="model-card-luxury">
              <span className="model-badge">MODEL 03</span>
              <h3>Strategic Architecture Audit</h3>
              <p>
                A focused 3-week diagnostic deep-dive into your unit economics, website conversion leaks, attribution model, and tech stack with an actionable roadmap.
              </p>
              <div className="model-specs">
                <span>Executive briefing document</span>
                <span>Prioritized engineering backlog</span>
                <span>Immediate growth quick-wins</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTA />
    </PageFrame>
  );
}
