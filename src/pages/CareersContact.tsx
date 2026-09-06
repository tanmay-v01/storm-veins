import { FormEvent, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Compass,
  DollarSign,
  Heart,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { images } from "../data";
import {
  ButtonLink,
  CTA,
  Eyebrow,
  InteriorHero,
  PageFrame,
  SectionHeading,
} from "../components/Site";

export function Careers() {
  const openRoles = [
    {
      title: "Principal Brand Strategist",
      dept: "Strategy & Positioning",
      location: "Mumbai HQ / Hybrid",
      type: "Full-Time",
      comp: "Competitive + Performance Bonus",
    },
    {
      title: "Staff Full-Stack Engineer (React / TypeScript)",
      dept: "Digital Engineering",
      location: "Remote / India / APAC",
      type: "Full-Time",
      comp: "Top of Market + Equity Pool",
    },
    {
      title: "Performance & Attribution Architect",
      dept: "Commercial Systems",
      location: "Mumbai / London / Remote",
      type: "Full-Time",
      comp: "Competitive + Revenue Bonus",
    },
    {
      title: "Executive Client Partner",
      dept: "Client Leadership",
      location: "Mumbai / Hybrid",
      type: "Full-Time",
      comp: "Executive Package",
    },
  ];

  return (
    <PageFrame>
      <InteriorHero
        eyebrow="Careers & Fellowships / 05"
        title={
          <>
            Do the work that defines your <span className="text-gradient">professional career.</span>
          </>
        }
        copy="We maintain an intentionally lean, high-talent density collective of senior strategists, principal software engineers, and growth operators."
        number="05 / 06"
      />

      {/* Perks & Studio Culture */}
      <section className="section-luxury careers-perks-section">
        <div className="container">
          <div className="careers-intro-grid">
            <div className="careers-lead-col">
              <SectionHeading
                eyebrow="The Studio Standard"
                title={
                  <>
                    Autonomous ownership.<br />
                    <span className="text-gradient">Uncompromising standards.</span>
                  </>
                }
                copy="No middle-management layers. No endless alignment meetings. You are given direct context, high-impact problems, and the resources to execute world-class work."
              />
            </div>

            <div className="careers-perks-grid">
              {[
                {
                  title: "Top-Tier Compensation & Equity",
                  desc: "We benchmark at the 90th percentile, paired with direct profit-sharing and equity pools on marquee venture engagements.",
                },
                {
                  title: "Global Mobility & Work Choice",
                  desc: "Work from our Mumbai HQ, our London satellite hubs, or completely distributed with home office setup allowances.",
                },
                {
                  title: "Generous Learning & Tooling Stipend",
                  desc: "Annual budget for research, conferences, specialized hardware (top-spec Apple silicon), and personal development.",
                },
                {
                  title: "Health, Wellness & Rejuvenation",
                  desc: "Comprehensive health insurance for you and your family, mental health support, and mandatory quarterly rejuvenation weeks.",
                },
              ].map((perk) => (
                <div className="perk-card-luxury" key={perk.title}>
                  <CheckCircle2 className="perk-icon text-emerald" size={20} />
                  <div>
                    <h4>{perk.title}</h4>
                    <p>{perk.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Open Roles Listing */}
      <section className="section-luxury open-roles-section">
        <div className="container">
          <div className="split-section-header">
            <SectionHeading
              eyebrow="Current Openings"
              title={
                <>
                  Shape the future with<br />
                  <span className="text-gradient">an exceptional team.</span>
                </>
              }
            />
            <div className="roles-count-pill">
              <span className="live-dot" />
              <span>{openRoles.length} Active Positions Open</span>
            </div>
          </div>

          <div className="roles-list-luxury">
            {openRoles.map((role) => (
              <a
                key={role.title}
                className="role-card-luxury"
                href={`mailto:careers@stormveins.com?subject=Application:%20${encodeURIComponent(
                  role.title
                )}`}
              >
                <div className="role-main-info">
                  <span className="role-dept-badge">{role.dept}</span>
                  <h3 className="role-title-text">{role.title}</h3>
                  <div className="role-meta-row">
                    <span>
                      <MapPin size={13} /> {role.location}
                    </span>
                    <span>
                      <Clock size={13} /> {role.type}
                    </span>
                    <span>
                      <DollarSign size={13} /> {role.comp}
                    </span>
                  </div>
                </div>

                <div className="role-action-wrap">
                  <span className="apply-btn-pill">Apply Now</span>
                  <ArrowUpRight size={18} />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Culture Manifesto Section */}
      <section className="dark-gallery-section culture-manifesto-section">
        <div className="container">
          <div className="culture-grid-luxury">
            <div>
              <Eyebrow light badge>How We Evaluate Talent</Eyebrow>
              <h2>
                We hire for clarity of thought and <span className="text-emerald-glow">depth of craftsmanship.</span>
              </h2>
            </div>
            <div className="culture-copy-col">
              <p>
                We look for individuals who take genuine pride in solving hard, messy problems. When you write to us, skip the templated corporate cover letters.
              </p>
              <p>
                Show us something you’ve built that you’re proud of, a strategic hypothesis you tested, or an analysis of why an established brand is failing to capture attention.
              </p>
              <div className="culture-direct-note">
                <span>Direct partner inbox:</span>
                <strong>careers@stormveins.com</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTA />
    </PageFrame>
  );
}

export function Contact() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    org: "",
    budget: "₹15L – ₹35L ($20k–$45k)",
    service: "Commercial Growth Engines",
    message: "",
  });

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("/api/contact.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
    } catch (err) {
      console.warn("Contact form dispatch notice:", err);
    } finally {
      setLoading(false);
      setSent(true);
    }
  };

  return (
    <PageFrame>
      <InteriorHero
        eyebrow="Executive Inquiries / 06"
        title={
          <>
            Initiate an executive dialogue for <span className="text-gradient">your next move.</span>
          </>
        }
        copy="Whether you have an immediate commercial mandate or seek a long-term strategic growth partner, we invite you to share your vision."
        number="06 / 06"
      />

      <section className="section-luxury contact-section-luxury">
        <div className="container">
          <div className="contact-layout-grid">
            {/* Left Column: Direct Info */}
            <div className="contact-details-col">
              <Eyebrow badge>Direct Channels</Eyebrow>
              <h2>
                Talk directly with our<br />
                <span className="text-gradient">founding partners.</span>
              </h2>
              <p className="contact-intro-copy">
                We review every inquiry within 12 business hours. All shared briefing materials and strategic details remain strictly confidential under mutual NDA upon request.
              </p>

              <div className="contact-channel-list">
                <div className="contact-channel-card">
                  <div className="channel-icon-wrap">
                    <Mail size={18} />
                  </div>
                  <div>
                    <span className="channel-label">EXECUTIVE INBOX</span>
                    <a href="mailto:contact@stormveins.com" className="channel-val">
                      contact@stormveins.com
                    </a>
                  </div>
                </div>

                <div className="contact-channel-card">
                  <div className="channel-icon-wrap">
                    <Phone size={18} />
                  </div>
                  <div>
                    <span className="channel-label">DIRECT STUDIO LINE</span>
                    <a href="tel:+919699831323" className="channel-val">
                      +91 96998 31323
                    </a>
                  </div>
                </div>

                <div className="contact-channel-card">
                  <div className="channel-icon-wrap">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <span className="channel-label">PRESENCE</span>
                    <span className="channel-val">
                      Mumbai & Thane
                    </span>
                  </div>
                </div>
              </div>

              <div className="confidentiality-notice">
                <ShieldCheck size={18} className="text-emerald" />
                <span>Enterprise Grade Security & Non-Disclosure Compliant</span>
              </div>
            </div>

            {/* Right Column: High-End Form */}
            <div className="contact-form-col">
              <div className="contact-form-wrapper">
                {sent ? (
                  <div className="form-success-state" role="status" aria-live="polite">
                    <div className="success-icon-wrap">
                      <CheckCircle2 size={42} className="text-emerald" />
                    </div>
                    <h3>Brief Successfully Received</h3>
                    <p>
                      Thank you, <strong>{formData.name}</strong>. Your inquiry has been routed directly to our Founding Partners. We will review your brief and follow up within 12 hours with next steps.
                    </p>
                    <div className="success-meta-details">
                      <span>Confirmation Sent to: {formData.email}</span>
                      <span>Target Engagement: {formData.service}</span>
                    </div>
                    <button
                      type="button"
                      className="btn-luxury btn-outline"
                      onClick={() => setSent(false)}
                    >
                      <span>Submit Additional Context</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                ) : (
                  <form className="luxury-form" onSubmit={submit}>
                    <div className="form-row-2">
                      <label className="form-field-wrap">
                        <span className="field-label">YOUR FULL NAME *</span>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Eleanor Vance"
                          autoComplete="name"
                        />
                      </label>

                      <label className="form-field-wrap">
                        <span className="field-label">CORPORATE EMAIL *</span>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="eleanor@company.com"
                          autoComplete="email"
                        />
                      </label>
                    </div>

                    <div className="form-row-2">
                      <label className="form-field-wrap">
                        <span className="field-label">ORGANIZATION & WEBSITE *</span>
                        <input
                          type="text"
                          required
                          value={formData.org}
                          onChange={(e) => setFormData({ ...formData, org: e.target.value })}
                          placeholder="Acme Corp / acme.com"
                          autoComplete="organization"
                        />
                      </label>

                      <label className="form-field-wrap">
                        <span className="field-label">PRIMARY OBJECTIVE *</span>
                        <select
                          value={formData.service}
                          onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                          required
                        >
                          <option>Commercial Growth Engines</option>
                          <option>Flagship Digital Products</option>
                          <option>Brand Worlds & Positioning</option>
                          <option>Full Enterprise Re-Architecture</option>
                          <option>Strategic Diagnostic Audit</option>
                        </select>
                      </label>
                    </div>

                    <label className="form-field-wrap">
                      <span className="field-label">ESTIMATED CAPITAL ALLOCATION</span>
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      >
                        <option>₹5L – ₹15L ($6k – $20k)</option>
                        <option>₹15L – ₹35L ($20k – $45k)</option>
                        <option>₹35L – ₹75L ($45k – $90k)</option>
                        <option>₹75L+ / $100k+ (Enterprise Retainer)</option>
                      </select>
                    </label>

                    <label className="form-field-wrap">
                      <span className="field-label">BRIEF CONTEXT & COMMERCIAL GOALS *</span>
                      <textarea
                        required
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us about the opportunity, current bottleneck, timeline expectations, or desired commercial outcome..."
                      />
                    </label>

                    <button type="submit" className="btn-luxury btn-emerald form-submit-btn" disabled={loading}>
                      <span>{loading ? "Transmitting Brief..." : "Initiate Confidential Brief"}</span>
                      <ArrowUpRight size={16} />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Workshop Band */}
      <section className="image-band-luxury">
        <img
          src={images.workshop}
          alt="Storm Veins workshop session"
          loading="lazy"
          decoding="async"
        />
        <div className="image-band-scrim" />
        <div className="container image-band-content">
          <div className="band-badge">
            <span className="band-status-dot" />
            <span>MUMBAI STUDIO HQ</span>
          </div>
          <h3 className="band-quote">
            “The right questions unlock exponential momentum.”
          </h3>
        </div>
      </section>
    </PageFrame>
  );
}
