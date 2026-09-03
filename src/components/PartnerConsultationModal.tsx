import { useState } from "react";
import { X, CheckCircle2, Shield, Calendar, Clock, MapPin, Phone, Mail, ArrowRight } from "lucide-react";

interface PartnerConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PartnerConsultationModal({ isOpen, onClose }: PartnerConsultationModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    tier: "enterprise",
    timeframe: "immediate",
    notes: "",
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="partner-modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="partner-modal-card">
        <button
          type="button"
          className="partner-modal-close-btn"
          onClick={onClose}
          aria-label="Close Strategy Session Modal"
        >
          <X size={20} />
        </button>

        {!submitted ? (
          <div className="partner-modal-inner">
            <div className="partner-modal-head">
              <span className="partner-modal-badge">CONFIDENTIAL EXECUTIVE BRIEFING</span>
              <h3 id="modal-title" className="partner-modal-title">
                Schedule a 30-Minute Strategy Session with a Principal
              </h3>
              <p className="partner-modal-sub">
                No junior sales reps. You will speak directly with a Managing Partner or Principal Systems Architect to assess your commercial expansion.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="partner-modal-form">
              <div className="modal-form-row">
                <div className="modal-field">
                  <label htmlFor="modal-name">Your Full Name *</label>
                  <input
                    id="modal-name"
                    required
                    type="text"
                    placeholder="e.g. Marcus Vance"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="modal-field">
                  <label htmlFor="modal-email">Corporate Work Email *</label>
                  <input
                    id="modal-email"
                    required
                    type="email"
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="modal-form-row">
                <div className="modal-field">
                  <label htmlFor="modal-company">Enterprise / Organization *</label>
                  <input
                    id="modal-company"
                    required
                    type="text"
                    placeholder="e.g. Northstar Global"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  />
                </div>
                <div className="modal-field">
                  <label htmlFor="modal-tier">Primary Objective</label>
                  <select
                    id="modal-tier"
                    value={formData.tier}
                    onChange={(e) => setFormData({ ...formData, tier: e.target.value })}
                  >
                    <option value="rebrand">Global Brand & Flagship Platform</option>
                    <option value="growth">Commercial Growth Engine & Acquisition</option>
                    <option value="enterprise">Full Multidisciplinary Pod</option>
                    <option value="diligence">Board-Level Due Diligence</option>
                  </select>
                </div>
              </div>

              <div className="modal-field">
                <label htmlFor="modal-notes">Brief Context / Key Challenge</label>
                <textarea
                  id="modal-notes"
                  rows={2}
                  placeholder="Tell us about your expansion goals, timeline, or current technical bottlenecks..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                />
              </div>

              <div className="modal-assurances-row">
                <div className="assurance-tag">
                  <Shield size={14} className="text-emerald" />
                  <span>Strict NDA Protected</span>
                </div>
                <div className="assurance-tag">
                  <Clock size={14} className="text-champagne" />
                  <span>24-Hour Partner Response</span>
                </div>
                <div className="assurance-tag">
                  <CheckCircle2 size={14} className="text-blue" />
                  <span>Zero Spam Guaranteed</span>
                </div>
              </div>

              <button type="submit" className="modal-submit-btn">
                Confirm Strategy Consultation Request <ArrowRight size={16} />
              </button>
            </form>

            <div className="modal-direct-contacts-strip">
              <div className="direct-contact-item">
                <MapPin size={13} className="text-emerald" />
                <span>Mumbai HQ: +91 22 8490 2100</span>
              </div>
              <div className="direct-contact-item">
                <Mail size={13} className="text-emerald" />
                <span>partners@stormveins.com</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="partner-modal-success">
            <div className="success-icon-wrap">
              <CheckCircle2 size={48} className="text-emerald" />
            </div>
            <h3>Consultation Request Received</h3>
            <p>
              Thank you, <strong>{formData.name}</strong>. A Managing Partner has received your brief and will contact you at <strong>{formData.email}</strong> within 24 business hours to confirm your calendar slot.
            </p>
            <button type="button" className="modal-close-success-btn" onClick={onClose}>
              Return to Website
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
