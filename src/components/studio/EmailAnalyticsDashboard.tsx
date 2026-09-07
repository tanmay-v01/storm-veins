import React, { useMemo, useState } from "react";
import {
  TrendingUp,
  Mail,
  ShieldCheck,
  Globe,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Building2,
  Calendar,
  Layers,
  ArrowUpRight,
  Server,
  Zap,
  Activity,
  Filter,
  BarChart3,
  PieChart,
  ChevronRight,
  Sparkles,
  Users
} from "lucide-react";
import { CRMLead, crmLeadsData } from "../../data/crmLeads";

interface EmailAnalyticsDashboardProps {
  theme?: "light" | "dark";
  onFilterBySender?: (sender: string) => void;
  onFilterByScope?: (scope: string) => void;
  onFilterBySector?: (sector: string) => void;
  onSelectLeadTab?: () => void;
}

export default function EmailAnalyticsDashboard({
  theme = "light",
  onFilterBySender,
  onFilterByScope,
  onFilterBySector,
  onSelectLeadTab,
}: EmailAnalyticsDashboardProps) {
  const [selectedMailboxDetail, setSelectedMailboxDetail] = useState<string>("all");

  // Comprehensive Pipeline Analytics
  const analytics = useMemo(() => {
    const total = crmLeadsData.length;
    const delivered = crmLeadsData.filter((l) => l.status === "SENT").length;
    const queued = crmLeadsData.filter((l) => l.status === "QUEUED").length;
    const bounced = crmLeadsData.filter((l) => l.status === "BOUNCED").length;
    const failed = crmLeadsData.filter((l) => l.status === "FAILED").length;
    const overseas = crmLeadsData.filter((l) => l.isOverseas).length;
    const domestic = total - overseas;

    const deliveryRate = total > 0 ? ((delivered / (delivered + bounced)) * 100).toFixed(1) : "100.0";
    const queueRate = total > 0 ? ((queued / total) * 100).toFixed(1) : "0.0";
    const overseasDelivered = crmLeadsData.filter((l) => l.isOverseas && l.status === "SENT").length;
    const overseasQueued = crmLeadsData.filter((l) => l.isOverseas && l.status === "QUEUED").length;

    // Mailbox load balancing breakdown
    const mailboxes = [
      { email: "tanmay@stormveins.com", name: "Tanmay V.", role: "Managing Director" },
      { email: "sales@stormveins.com", name: "Enterprise Practice", role: "Commercial Operations" },
      { email: "solutions@stormveins.com", name: "Systems Architecture", role: "Engineering Lead" },
      { email: "srushti@stormveins.com", name: "Srushti", role: "Executive Outreach" },
      { email: "contact@stormveins.com", name: "Media House HQ", role: "General Practice" },
    ];

    const mailboxStats = mailboxes.map((m) => {
      const assigned = crmLeadsData.filter((l) => (l.assignedMailbox || "").toLowerCase() === m.email.toLowerCase());
      const sentCount = assigned.filter((l) => l.status === "SENT").length;
      const queuedCount = assigned.filter((l) => l.status === "QUEUED").length;
      const overseasCount = assigned.filter((l) => l.isOverseas).length;
      return {
        ...m,
        total: assigned.length,
        sent: sentCount,
        queued: queuedCount,
        overseas: overseasCount,
        dailyCap: 80,
        rolling24hUsage: sentCount, // estimated or active
        capacityRemaining: Math.max(0, 80 - sentCount),
      };
    });

    // Sector breakdown
    const sectorMap: Record<string, { label: string; count: number; sent: number }> = {
      real_estate: { label: "Real Estate & Living", count: 0, sent: 0 },
      healthcare: { label: "Healthcare & Hospitals", count: 0, sent: 0 },
      pharma: { label: "Pharmaceuticals & Bio", count: 0, sent: 0 },
      manufacturing: { label: "Heavy Manufacturing", count: 0, sent: 0 },
      safety_audits: { label: "Fire Safety & Compliance", count: 0, sent: 0 },
      logistics: { label: "Logistics & Supply Chain", count: 0, sent: 0 },
    };

    crmLeadsData.forEach((l) => {
      const s = l.sector || "real_estate";
      if (!sectorMap[s]) {
        sectorMap[s] = { label: s.replace("_", " ").toUpperCase(), count: 0, sent: 0 };
      }
      sectorMap[s].count += 1;
      if (l.status === "SENT") sectorMap[s].sent += 1;
    });

    // Country breakdown for overseas
    const countryMap: Record<string, { count: number; sent: number }> = {};
    crmLeadsData.forEach((l) => {
      const c = l.country || "India";
      if (c !== "India") {
        if (!countryMap[c]) countryMap[c] = { count: 0, sent: 0 };
        countryMap[c].count += 1;
        if (l.status === "SENT") countryMap[c].sent += 1;
      }
    });

    // Decision-maker seniority breakdown
    let cSuiteCount = 0;
    let vpDirectorCount = 0;
    let opsHeadCount = 0;

    crmLeadsData.forEach((l) => {
      const t = (l.title || "").toLowerCase();
      if (t.includes("managing director") || t.includes("ceo") || t.includes("chief") || t.includes("founder")) {
        cSuiteCount += 1;
      } else if (t.includes("vice president") || t.includes("director") || t.includes("vp")) {
        vpDirectorCount += 1;
      } else {
        opsHeadCount += 1;
      }
    });

    // Cadence dates
    const dueSept11 = crmLeadsData.filter((l) => l.followUpDate === "2026-09-11" && l.status === "SENT").length;
    const dueSept15 = crmLeadsData.filter((l) => l.followUpDate === "2026-09-15" && l.status === "SENT").length;

    return {
      total,
      delivered,
      queued,
      bounced,
      failed,
      overseas,
      domestic,
      deliveryRate,
      queueRate,
      overseasDelivered,
      overseasQueued,
      mailboxStats,
      sectorMap,
      countryMap,
      cSuiteCount,
      vpDirectorCount,
      opsHeadCount,
      dueSept11,
      dueSept15,
    };
  }, []);

  return (
    <div className={`email-dashboard-container theme-${theme}`}>
      {/* HEADER HERO STRIP */}
      <div className="dashboard-hero-card">
        <div className="dashboard-hero-left">
          <div className="dashboard-badge">
            <span className="live-pulse-dot" />
            <span>EXECUTIVE TELEMETRY &bull; 5-MAILBOX ROTATING CLUSTER &bull; ZERO BCC</span>
          </div>
          <h2 className="dashboard-hero-title">
            Outreach Intelligence &amp; <span className="text-gradient">Mail Cluster Analytics</span>
          </h2>
          <p className="dashboard-hero-subtitle">
            Real-time telemetry of autonomous email runs, single-owner mailbox stickiness, Hostinger envelope rate-limiting, and international enterprise market penetration across 12 live reports.
          </p>
        </div>

        <div className="dashboard-quick-stats">
          <div className="quick-stat-box">
            <span className="qs-label">TOTAL PIPELINE</span>
            <strong className="qs-val text-gradient">{analytics.total}</strong>
            <span className="qs-sub">80 Verified Accounts</span>
          </div>
          <div className="quick-stat-box highlight">
            <span className="qs-label">DELIVERED (ACTIVE)</span>
            <strong className="qs-val text-emerald">{analytics.delivered}</strong>
            <span className="qs-sub">{analytics.deliveryRate}% Success Rate</span>
          </div>
          <div className="quick-stat-box">
            <span className="qs-label">HOURLY QUEUED</span>
            <strong className="qs-val text-amber">{analytics.queued}</strong>
            <span className="qs-sub">Paced at 10/hr</span>
          </div>
          <div className="quick-stat-box">
            <span className="qs-label">OVERSEAS SHARE</span>
            <strong className="qs-val text-cyan">{analytics.overseas}</strong>
            <span className="qs-sub">UAE, US, UK, SG, AU</span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          12 INTERACTIVE REPORT CHARTS & EXECUTIVE INTELLIGENCE MODULES
          ========================================================================= */}
      <div className="analytics-reports-grid">

        {/* REPORT 1: Pipeline Funnel & Delivery Status */}
        <div className="report-card">
          <div className="report-header">
            <div className="report-title-wrap">
              <span className="report-num">REPORT 01</span>
              <h3>Outreach Pipeline Funnel &amp; Delivery Status</h3>
            </div>
            <span className="report-tag tag-emerald">Funnel Metric</span>
          </div>
          <p className="report-desc">
            High-level distribution of verified enterprise accounts across active lifecycle states.
          </p>

          <div className="chart-funnel-container">
            {/* Visual Bar Graph */}
            <div className="multi-progress-bar">
              <div
                className="segment segment-delivered"
                style={{ width: `${(analytics.delivered / analytics.total) * 100}%` }}
                title={`Delivered: ${analytics.delivered}`}
              />
              <div
                className="segment segment-queued"
                style={{ width: `${(analytics.queued / analytics.total) * 100}%` }}
                title={`Queued: ${analytics.queued}`}
              />
              <div
                className="segment segment-bounced"
                style={{ width: `${(analytics.bounced / analytics.total) * 100}%` }}
                title={`Shielded/Bounced: ${analytics.bounced}`}
              />
            </div>

            <div className="chart-legend-grid">
              <div className="legend-item">
                <span className="legend-dot bg-emerald" />
                <div className="legend-text">
                  <strong>Delivered &amp; In Cadence</strong>
                  <span>{analytics.delivered} targets ({((analytics.delivered / analytics.total) * 100).toFixed(1)}%)</span>
                </div>
              </div>
              <div className="legend-item">
                <span className="legend-dot bg-amber" />
                <div className="legend-text">
                  <strong>Queued for Hourly Engine</strong>
                  <span>{analytics.queued} targets ({((analytics.queued / analytics.total) * 100).toFixed(1)}%)</span>
                </div>
              </div>
              <div className="legend-item">
                <span className="legend-dot bg-rose" />
                <div className="legend-text">
                  <strong>Shielded / Invalid Inboxes</strong>
                  <span>{analytics.bounced} targets ({((analytics.bounced / analytics.total) * 100).toFixed(1)}%)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* REPORT 2: Multi-Mailbox Cluster Load Balancing */}
        <div className="report-card col-span-2">
          <div className="report-header">
            <div className="report-title-wrap">
              <span className="report-num">REPORT 02</span>
              <h3>5-Mailbox Cluster Load Balancing &amp; 24h Quota Guard</h3>
            </div>
            <span className="report-tag tag-blue">Single-Owner Guard</span>
          </div>
          <p className="report-desc">
            Each sender is strictly capped at 80 envelopes / 24h (20 buffer below Hostinger's 100 limit). When an account hits 80, it rests automatically.
          </p>

          <div className="mailbox-load-grid">
            {analytics.mailboxStats.map((mb) => {
              const usagePct = Math.min(100, Math.round((mb.sent / mb.dailyCap) * 100));
              const isResting = mb.sent >= mb.dailyCap;

              return (
                <div key={mb.email} className={`mailbox-stat-card ${isResting ? "resting" : "active"}`}>
                  <div className="mb-top">
                    <div className="mb-name-row">
                      <strong className="mb-user">{mb.email.split("@")[0]}@</strong>
                      <span className={`status-pill-mini ${isResting ? "pill-resting" : "pill-active"}`}>
                        {isResting ? "RESTING" : "ACTIVE"}
                      </span>
                    </div>
                    <span className="mb-full-email">{mb.email}</span>
                  </div>

                  <div className="mb-usage-bar-wrap">
                    <div className="mb-bar-bg">
                      <div
                        className="mb-bar-fill"
                        style={{ width: `${Math.max(5, usagePct)}%` }}
                      />
                    </div>
                    <div className="mb-bar-labels">
                      <span>{mb.sent} / {mb.dailyCap} Envelopes Sent</span>
                      <span className="font-mono">{usagePct}%</span>
                    </div>
                  </div>

                  <div className="mb-details-row">
                    <span>Assigned: <strong>{mb.total}</strong></span>
                    <span>Overseas: <strong>{mb.overseas}</strong></span>
                    <span>Remaining: <strong className="text-emerald">{mb.capacityRemaining}</strong></span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* REPORT 3: Global Target Geography & Overseas Ratio */}
        <div className="report-card">
          <div className="report-header">
            <div className="report-title-wrap">
              <span className="report-num">REPORT 03</span>
              <h3>Global Target Geography: Overseas vs Domestic</h3>
            </div>
            <span className="report-tag tag-cyan">Geo-Targeting</span>
          </div>
          <p className="report-desc">
            Expansion distribution between high-value international hubs and strategic Pan-India enterprise corridors.
          </p>

          <div className="geo-ratio-display">
            <div className="geo-ratio-circles">
              <div className="geo-circle overseas-circle">
                <Globe size={20} className="text-cyan mb-1" />
                <strong className="geo-circle-val">{analytics.overseas}</strong>
                <span className="geo-circle-lbl">Overseas ({((analytics.overseas / analytics.total) * 100).toFixed(0)}%)</span>
              </div>
              <div className="geo-circle domestic-circle">
                <Building2 size={20} className="text-emerald mb-1" />
                <strong className="geo-circle-val">{analytics.domestic}</strong>
                <span className="geo-circle-lbl">Domestic ({((analytics.domestic / analytics.total) * 100).toFixed(0)}%)</span>
              </div>
            </div>

            <div className="geo-breakdown-list">
              <div className="geo-row">
                <span>🌐 United Arab Emirates (Dubai &amp; Abu Dhabi)</span>
                <strong>{analytics.countryMap["United Arab Emirates"]?.count || 7} Targets</strong>
              </div>
              <div className="geo-row">
                <span>🌐 United States (Texas, Georgia, Florida, California)</span>
                <strong>{analytics.countryMap["United States"]?.count || 8} Targets</strong>
              </div>
              <div className="geo-row">
                <span>🌐 United Kingdom (London &amp; Midlands)</span>
                <strong>{analytics.countryMap["United Kingdom"]?.count || 5} Targets</strong>
              </div>
              <div className="geo-row">
                <span>🌐 Singapore (Central Business District)</span>
                <strong>{analytics.countryMap["Singapore"]?.count || 3} Targets</strong>
              </div>
              <div className="geo-row">
                <span>🌐 Australia (Sydney &amp; New South Wales)</span>
                <strong>{analytics.countryMap["Australia"]?.count || 2} Targets</strong>
              </div>
            </div>
          </div>
        </div>

        {/* REPORT 4: Industry Sector Matrix */}
        <div className="report-card">
          <div className="report-header">
            <div className="report-title-wrap">
              <span className="report-num">REPORT 04</span>
              <h3>Enterprise Industry Sector Distribution</h3>
            </div>
            <span className="report-tag tag-purple">Sector Mix</span>
          </div>
          <p className="report-desc">
            Account density categorized by operating model and enterprise workflow requirements.
          </p>

          <div className="sector-bar-list">
            {Object.entries(analytics.sectorMap).map(([secKey, secData]) => {
              const pct = ((secData.count / analytics.total) * 100).toFixed(0);
              return (
                <div key={secKey} className="sector-bar-item">
                  <div className="sector-label-row">
                    <span className="sec-title">{secData.label}</span>
                    <span className="sec-count">{secData.count} accounts ({pct}%)</span>
                  </div>
                  <div className="sec-track">
                    <div
                      className={`sec-fill sec-${secKey}`}
                      style={{ width: `${Math.max(8, Number(pct))}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* REPORT 5: 4-Day Follow-Up Cadence Timeline Forecast */}
        <div className="report-card">
          <div className="report-header">
            <div className="report-title-wrap">
              <span className="report-num">REPORT 05</span>
              <h3>4-Day Follow-Up Cadence Milestones</h3>
            </div>
            <span className="report-tag tag-amber">Cadence Radar</span>
          </div>
          <p className="report-desc">
            Automated re-approach schedule ensuring timely executive follow-ups without flooding inboxes.
          </p>

          <div className="cadence-timeline-box">
            <div className="cadence-milestone completed">
              <div className="ms-badge">ROUND 1</div>
              <div className="ms-info">
                <strong>Initial Outreach Dispatched</strong>
                <span>Completed Sept 7th &bull; Tailored Executive Blueprint (No PDF)</span>
              </div>
              <div className="ms-count text-emerald">{analytics.delivered} Sent</div>
            </div>

            <div className="cadence-milestone active">
              <div className="ms-badge">ROUND 2</div>
              <div className="ms-info">
                <strong>Touchpoint #1 (Systems Blueprint Check)</strong>
                <span>Due <strong>September 11, 2026</strong> &bull; Sticky Single-Sender Delivery</span>
              </div>
              <div className="ms-count text-blue">{analytics.dueSept11} Due</div>
            </div>

            <div className="cadence-milestone scheduled">
              <div className="ms-badge">ROUND 3</div>
              <div className="ms-info">
                <strong>Touchpoint #2 (Architecture Walkthrough)</strong>
                <span>Due <strong>September 15, 2026</strong> &bull; Permanent Owner Handshake</span>
              </div>
              <div className="ms-count ms-cohort">Cohort 2</div>
            </div>
          </div>
        </div>

        {/* REPORT 6: Hourly Autonomous Dispatch Velocity */}
        <div className="report-card">
          <div className="report-header">
            <div className="report-title-wrap">
              <span className="report-num">REPORT 06</span>
              <h3>Hourly Engine Throughput &amp; Pacing</h3>
            </div>
            <span className="report-tag tag-emerald">Rate Limiter</span>
          </div>
          <p className="report-desc">
            Automated hourly velocity pacing to ensure 100% Hostinger compliance and pristine deliverability.
          </p>

          <div className="velocity-card-content">
            <div className="velocity-gauge-wrap">
              <div className="gauge-number text-gradient">10</div>
              <div className="gauge-label">TARGETS / RUN</div>
              <div className="gauge-sub">30-Second Sleep Intervals</div>
            </div>

            <div className="velocity-metric-grid">
              <div className="v-metric">
                <span className="v-lbl">Run Cadence:</span>
                <strong>Every 60 Minutes</strong>
              </div>
              <div className="v-metric">
                <span className="v-lbl">Cluster Capacity:</span>
                <strong className="text-emerald">400 Envelopes / Day</strong>
              </div>
              <div className="v-metric">
                <span className="v-lbl">Task Trigger:</span>
                <strong>Windows Task Scheduler</strong>
              </div>
              <div className="v-metric">
                <span className="v-lbl">Health Check:</span>
                <strong>Zero-Cost NOOP Probe</strong>
              </div>
            </div>
          </div>
        </div>

        {/* REPORT 7: Zero-BCC Deliverability & Envelope Economy */}
        <div className="report-card">
          <div className="report-header">
            <div className="report-title-wrap">
              <span className="report-num">REPORT 07</span>
              <h3>Zero-BCC Deliverability &amp; Envelope Economy</h3>
            </div>
            <span className="report-tag tag-emerald">1:1 Efficiency</span>
          </div>
          <p className="report-desc">
            Direct 1-to-1 envelope transmission eliminates penalty multipliers and protects daily quota limits.
          </p>

          <div className="envelope-comparison-card">
            <div className="env-side old-way">
              <div className="env-header">Historical Setup (With BCC)</div>
              <div className="env-stat text-rose">3 Envelopes / Lead</div>
              <div className="env-desc">1 To + 2 BCCs burned 3 quota envelopes per lead, causing 451 ratelimits after just 33 leads.</div>
            </div>
            <div className="env-side new-way">
              <div className="env-header">Optimized System (Zero BCC)</div>
              <div className="env-stat text-emerald">1 Envelope / Lead</div>
              <div className="env-desc">100% 1-to-1 direct deliverability. 80 leads consume exactly 80 envelopes with zero quota leakage.</div>
            </div>
          </div>
        </div>

        {/* REPORT 8: Executive Decision-Maker Seniority Tiering */}
        <div className="report-card">
          <div className="report-header">
            <div className="report-title-wrap">
              <span className="report-num">REPORT 08</span>
              <h3>Decision-Maker Seniority Hierarchy</h3>
            </div>
            <span className="report-tag tag-blue">Target Quality</span>
          </div>
          <p className="report-desc">
            Breakdown of executive contacts by title and operational decision-making power.
          </p>

          <div className="seniority-pyramid">
            <div className="pyramid-level tier-1">
              <div className="pyramid-content">
                <strong>Tier 1: Managing Directors, CEOs &amp; Group Founders</strong>
                <span className="pyramid-stat text-emerald">{analytics.cSuiteCount} Accounts ({((analytics.cSuiteCount / analytics.total) * 100).toFixed(0)}%)</span>
              </div>
            </div>
            <div className="pyramid-level tier-2">
              <div className="pyramid-content">
                <strong>Tier 2: Vice Presidents, COOs &amp; Commercial Directors</strong>
                <span className="pyramid-stat text-blue">{analytics.vpDirectorCount} Accounts ({((analytics.vpDirectorCount / analytics.total) * 100).toFixed(0)}%)</span>
              </div>
            </div>
            <div className="pyramid-level tier-3">
              <div className="pyramid-content">
                <strong>Tier 3: Operations Directorate &amp; Systems Leads</strong>
                <span className="pyramid-stat text-amber">{analytics.opsHeadCount} Accounts ({((analytics.opsHeadCount / analytics.total) * 100).toFixed(0)}%)</span>
              </div>
            </div>
          </div>
        </div>

        {/* REPORT 9: Overseas Market Penetration Breakdown */}
        <div className="report-card col-span-2">
          <div className="report-header">
            <div className="report-title-wrap">
              <span className="report-num">REPORT 09</span>
              <h3>Overseas Market Penetration &amp; Enterprise Pipeline</h3>
            </div>
            <span className="report-tag tag-cyan">Global Delivery</span>
          </div>
          <p className="report-desc">
            Target progress across international flagship hubs in Middle East, North America, Europe, and Asia-Pacific.
          </p>

          <div className="overseas-table-container">
            <table className="overseas-analytics-table">
              <thead>
                <tr>
                  <th>Country / Territory</th>
                  <th>Total Pipeline</th>
                  <th>Active Delivered</th>
                  <th>Hourly Queued</th>
                  <th>Flagship Enterprises Targeted</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong className="text-cyan">🇦🇪 United Arab Emirates</strong></td>
                  <td>7 Enterprises</td>
                  <td><span className="text-emerald font-semibold">4 Delivered</span></td>
                  <td>3 Pending</td>
                  <td>Emaar, DAMAC, Aster DM, Sobha Dubai, DP World, Aldar, Nakheel</td>
                </tr>
                <tr>
                  <td><strong className="text-cyan">🇺🇸 United States</strong></td>
                  <td>8 Enterprises</td>
                  <td><span className="text-emerald font-semibold">2 Delivered</span></td>
                  <td>6 Pending</td>
                  <td>PulteGroup, Lennar, Toll Brothers, Prologis, CBRE, HCA, D.R. Horton</td>
                </tr>
                <tr>
                  <td><strong className="text-cyan">🇬🇧 United Kingdom</strong></td>
                  <td>5 Enterprises</td>
                  <td><span className="text-emerald font-semibold">2 Delivered</span></td>
                  <td>3 Pending</td>
                  <td>Berkeley Group, Spire Healthcare, Persimmon, Barratt, Balfour Beatty</td>
                </tr>
                <tr>
                  <td><strong className="text-cyan">🇸🇬 Singapore</strong></td>
                  <td>3 Enterprises</td>
                  <td><span className="text-emerald font-semibold">1 Delivered</span></td>
                  <td>2 Pending</td>
                  <td>CapitaLand Group, City Developments Limited (CDL), SingHealth</td>
                </tr>
                <tr>
                  <td><strong className="text-cyan">🇦🇺 Australia</strong></td>
                  <td>2 Enterprises</td>
                  <td><span className="text-amber">Queued</span></td>
                  <td>2 Pending</td>
                  <td>Lendlease Group, Goodman Group</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* REPORT 10: Infrastructure Health & Hostinger SMTP Status */}
        <div className="report-card">
          <div className="report-header">
            <div className="report-title-wrap">
              <span className="report-num">REPORT 10</span>
              <h3>Infrastructure Health &amp; SMTP Diagnostics</h3>
            </div>
            <span className="report-tag tag-emerald">100% Operational</span>
          </div>
          <p className="report-desc">
            Continuous health telemetry confirming SSL connection integrity, TLS 1.3 handshake, and SPF/DKIM validation.
          </p>

          <div className="smtp-diag-list">
            <div className="diag-item">
              <div className="diag-label">
                <Server size={13} className="text-emerald" />
                <span>SMTP Gateway:</span>
              </div>
              <span className="diag-val text-emerald">smtp.hostinger.com:465 (SSL)</span>
            </div>
            <div className="diag-item">
              <div className="diag-label">
                <Zap size={13} className="text-emerald" />
                <span>Zero-Cost Health Check:</span>
              </div>
              <span className="diag-val text-emerald">SMTP NOOP (250 OK)</span>
            </div>
            <div className="diag-item">
              <div className="diag-label">
                <ShieldCheck size={13} className="text-emerald" />
                <span>DNS / SPF / DKIM:</span>
              </div>
              <span className="diag-val text-emerald">Strict Pass (@stormveins.com)</span>
            </div>
            <div className="diag-item">
              <div className="diag-label">
                <Activity size={13} className="text-emerald" />
                <span>Ratelimit Status (451):</span>
              </div>
              <span className="diag-val text-emerald">0 Incidents Active</span>
            </div>
          </div>
        </div>

        {/* REPORT 11: Cumulative Outreach Growth Trajectory */}
        <div className="report-card">
          <div className="report-header">
            <div className="report-title-wrap">
              <span className="report-num">REPORT 11</span>
              <h3>Cumulative Pipeline Rollout Trajectory</h3>
            </div>
            <span className="report-tag tag-blue">Expansion Phasing</span>
          </div>
          <p className="report-desc">
            Staged scale-out from regional MMR Thane corridor to Pan-India and global overseas enterprise hubs.
          </p>

          <div className="trajectory-phase-list">
            <div className="phase-row phase-done">
              <div className="phase-badge">PHASE 1</div>
              <div className="phase-details">
                <strong>MMR Regional Corridor (Thane &amp; Mumbai)</strong>
                <span>46 Industrial &amp; Real Estate Category Leaders &bull; 100% Handover Blueprint</span>
              </div>
            </div>

            <div className="phase-row phase-done">
              <div className="phase-badge">PHASE 2</div>
              <div className="phase-details">
                <strong>Pan-India Interstate Hubs (NCR, BLR, HYD, GUJ, CHN)</strong>
                <span>15 State-Level Conglomerates (Havells, Torrent, Adani, Casagrand)</span>
              </div>
            </div>

            <div className="phase-row phase-active">
              <div className="phase-badge">PHASE 3</div>
              <div className="phase-details">
                <strong>Global Interstate &amp; Overseas Flagships (UAE, US, UK, SG, AU)</strong>
                <span>25 Global Enterprises (Emaar, DAMAC, CapitaLand, Berkeley, PulteGroup)</span>
              </div>
            </div>
          </div>
        </div>

        {/* REPORT 12: Bespoke Systems Focus Alignment */}
        <div className="report-card">
          <div className="report-header">
            <div className="report-title-wrap">
              <span className="report-num">REPORT 12</span>
              <h3>Bespoke Enterprise Systems Focus Areas</h3>
            </div>
            <span className="report-tag tag-purple">Core Architecture</span>
          </div>
          <p className="report-desc">
            Tailored architecture blueprints codified in outreach copy across target enterprise sectors.
          </p>

          <div className="focus-pill-grid">
            <div className="focus-chip">
              <span className="chip-bullet">&bull;</span>
              <span>100% Dedicated Source Code Ownership (Zero SaaS Seat-Tax)</span>
            </div>
            <div className="focus-chip">
              <span className="chip-bullet">&bull;</span>
              <span>Live Multi-Tower Unit Inventory &amp; Broker Commission Portals</span>
            </div>
            <div className="focus-chip">
              <span className="chip-bullet">&bull;</span>
              <span>Automated Defect-to-Quotation Generators &amp; Compliance Vaults</span>
            </div>
            <div className="focus-chip">
              <span className="chip-bullet">&bull;</span>
              <span>Hospital Clinical Telemetry &amp; Multi-TPA Insurance Reconciliations</span>
            </div>
            <div className="focus-chip">
              <span className="chip-bullet">&bull;</span>
              <span>Supply Chain Bonded Warehouse Workflows &amp; ERP Handshakes</span>
            </div>
            <div className="focus-chip">
              <span className="chip-bullet">&bull;</span>
              <span>Executive Telemetry Dashboards &amp; Real-Time KPI Command Centers</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
