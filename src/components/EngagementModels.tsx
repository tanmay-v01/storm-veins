import { Clock, ShieldCheck, Zap } from "lucide-react";
import { engagementModels } from "../data";
import { Eyebrow, ButtonLink } from "./Site";

export function EngagementModels() {
  return (
    <section className="section-luxury engagement-models-section" aria-label="Flexible Executive Engagement Models">
      <div className="container">
        <div className="engagement-head text-center">
          <Eyebrow badge>Ways of Partnering</Eyebrow>
          <h2 className="engagement-title">
            Flexible engagement architectures designed for{" "}
            <span className="text-gradient">executive momentum.</span>
          </h2>
          <p className="engagement-sub">
            Whether you need a full multidisciplinary squad embedded in your sprints or a fixed-scope platform launch, we eliminate agency friction and align incentives around commercial results.
          </p>
        </div>

        <div className="engagement-cards-grid">
          {engagementModels.map((model) => (
            <div className={`engagement-card engagement-accent-${model.accent}`} key={model.id}>
              <div className="engagement-card-top">
                <span className="engagement-badge-chip">{model.badge}</span>
                <span className="engagement-id-label">MODEL 0{engagementModels.indexOf(model) + 1}</span>
              </div>

              <h3 className="engagement-card-title">{model.title}</h3>
              <p className="engagement-card-subtitle">{model.subtitle}</p>

              <p className="engagement-card-desc">{model.description}</p>

              <div className="engagement-spec-list">
                <div className="spec-row">
                  <span className="spec-label">IDEAL FOR:</span>
                  <p className="spec-val">{model.idealFor}</p>
                </div>
                <div className="spec-row">
                  <span className="spec-label">POD COMPOSITION:</span>
                  <p className="spec-val text-emerald-tint">{model.composition}</p>
                </div>
                <div className="spec-row">
                  <span className="spec-label">OPERATIONAL CADENCE:</span>
                  <p className="spec-val">{model.cadence}</p>
                </div>
              </div>

              <div className="engagement-card-cta">
                <ButtonLink to="/contact" variant="outline" className="engagement-inquire-link">
                  Discuss {model.title}
                </ButtonLink>
              </div>
            </div>
          ))}
        </div>

        {/* Human Assurance Banner */}
        <div className="engagement-human-assurance">
          <div className="assurance-item">
            <ShieldCheck size={20} className="text-emerald" />
            <div>
              <strong>Zero Junior Handoffs</strong>
              <p>Every pod is directed by a named principal who sits in your executive meetings.</p>
            </div>
          </div>
          <div className="assurance-item">
            <Clock size={20} className="text-champagne" />
            <div>
              <strong>Guaranteed 24h Response</strong>
              <p>Direct communication via dedicated Slack/Teams without gatekeepers.</p>
            </div>
          </div>
          <div className="assurance-item">
            <Zap size={20} className="text-blue" />
            <div>
              <strong>100% On-Time Delivery SLA</strong>
              <p>Rigorous sprint milestones with audited telemetry and transparent reporting.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
