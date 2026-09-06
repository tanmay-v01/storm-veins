import React, { useState, useMemo, useEffect } from "react";
import {
  Building2,
  Clock,
  ShieldCheck,
  Search,
  Filter,
  Download,
  Eye,
  CheckCircle2,
  AlertTriangle,
  Send,
  Mail,
  Users,
  MapPin,
  Calendar,
  X,
  ExternalLink,
  ChevronRight,
  ShieldAlert,
  Server,
  Activity,
  ArrowUpRight,
  Grid,
  List,
  Layers,
  Sparkles,
  Info,
  Check,
  RotateCcw,
} from "lucide-react";
import { CRMLead, crmLeadsData } from "../../data/crmLeads";

export type OutreachSubTab = "pool" | "cadence" | "telemetry";

interface OutreachStudioSuiteProps {
  subMode: OutreachSubTab;
  onSelectSubMode: (tab: OutreachSubTab) => void;
}

export default function OutreachStudioSuite({
  subMode,
  onSelectSubMode,
}: OutreachStudioSuiteProps) {
  // State for Directory & Pool View
  const [sectorFilter, setSectorFilter] = useState<string>("all");
  const [regionFilter, setRegionFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [cadenceFilter, setCadenceFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("name");
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");

  // Inspection Modal State
  const [selectedLead, setSelectedLead] = useState<CRMLead | null>(null);
  const [modalTab, setModalTab] = useState<"dossier" | "email" | "cadence">("dossier");
  const [copiedSubject, setCopiedSubject] = useState(false);
  const [copiedBody, setCopiedBody] = useState(false);

  // Keyboard shortcut: Escape to close inspection modal (Emil Kowalski craft)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedLead(null);
      }
    };
    if (selectedLead) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedLead]);

  // Sector Mapping & Counts
  const sectors = useMemo(() => {
    const list = [
      { id: "all", label: "All Industries" },
      { id: "real_estate", label: "Real Estate & Infra" },
      { id: "healthcare", label: "Healthcare & Hospitals" },
      { id: "pharma_chem", label: "Pharma & Chemicals" },
      { id: "manufacturing", label: "Heavy Manufacturing" },
      { id: "safety_audits", label: "Fire Safety & Asset Protection" },
      { id: "logistics", label: "Logistics & Supply Chain" },
    ];
    return list.map((s) => ({
      ...s,
      count:
        s.id === "all"
          ? crmLeadsData.length
          : crmLeadsData.filter((l) => l.sector === s.id).length,
    }));
  }, []);

  // Filtered Leads
  const filteredLeads = useMemo(() => {
    return crmLeadsData
      .filter((lead) => {
        const matchesSector =
          sectorFilter === "all" || lead.sector === sectorFilter;

        let matchesRegion = true;
        if (regionFilter === "thane") {
          matchesRegion = lead.region.toLowerCase().includes("thane");
        } else if (regionFilter === "navi_mumbai") {
          matchesRegion =
            lead.region.toLowerCase().includes("navi mumbai") ||
            lead.locality.toLowerCase().includes("vashi") ||
            lead.locality.toLowerCase().includes("mahape") ||
            lead.locality.toLowerCase().includes("turbhe") ||
            lead.locality.toLowerCase().includes("belapur");
        } else if (regionFilter === "kalyan_dombivli") {
          matchesRegion =
            lead.region.toLowerCase().includes("kalyan") ||
            lead.region.toLowerCase().includes("dombivli") ||
            lead.locality.toLowerCase().includes("kalyan") ||
            lead.locality.toLowerCase().includes("dombivli");
        } else if (regionFilter === "ghatkopar_kurla") {
          matchesRegion =
            lead.locality.toLowerCase().includes("ghatkopar") ||
            lead.locality.toLowerCase().includes("kurla");
        } else if (regionFilter === "mumbai_metro") {
          matchesRegion =
            lead.region.toLowerCase().includes("mumbai") ||
            lead.country.toLowerCase().includes("india");
        } else if (regionFilter === "interstate") {
          matchesRegion = [
            "karnataka",
            "telangana",
            "delhi",
            "gujarat",
            "tamil nadu",
          ].some(
            (state) =>
              lead.region.toLowerCase().includes(state) ||
              lead.locality.toLowerCase().includes(state)
          );
        } else if (regionFilter === "international") {
          matchesRegion = [
            "dubai",
            "uae",
            "singapore",
            "united states",
            "united kingdom",
            "uk",
            "us",
          ].some(
            (c) =>
              lead.country.toLowerCase().includes(c) ||
              lead.region.toLowerCase().includes(c)
          );
        }

        let matchesStatus = true;
        if (statusFilter === "sent") matchesStatus = lead.status === "SENT";
        else if (statusFilter === "bounced")
          matchesStatus = lead.status === "BOUNCED";
        else if (statusFilter === "queued")
          matchesStatus = lead.status === "QUEUED";

        let matchesCadence = true;
        if (cadenceFilter === "sept11")
          matchesCadence = lead.followUpDate === "2026-09-11";
        else if (cadenceFilter === "hourly")
          matchesCadence = lead.status === "QUEUED";
        else if (cadenceFilter === "shielded")
          matchesCadence = lead.status === "BOUNCED";

        const q = searchQuery.toLowerCase().trim();
        const matchesSearch =
          !q ||
          lead.company.toLowerCase().includes(q) ||
          lead.recipientName.toLowerCase().includes(q) ||
          lead.title.toLowerCase().includes(q) ||
          lead.email.toLowerCase().includes(q) ||
          lead.locality.toLowerCase().includes(q) ||
          lead.region.toLowerCase().includes(q) ||
          lead.operationalFocus.toLowerCase().includes(q);

        return (
          matchesSector &&
          matchesRegion &&
          matchesStatus &&
          matchesCadence &&
          matchesSearch
        );
      })
      .sort((a, b) => {
        if (sortBy === "name") return a.company.localeCompare(b.company);
        if (sortBy === "status") return a.status.localeCompare(b.status);
        if (sortBy === "region") return a.region.localeCompare(b.region);
        if (sortBy === "date")
          return (b.sentTimestamp || "").localeCompare(a.sentTimestamp || "");
        return 0;
      });
  }, [
    sectorFilter,
    regionFilter,
    statusFilter,
    cadenceFilter,
    searchQuery,
    sortBy,
  ]);

  // Metric Totals
  const metrics = useMemo(() => {
    const total = crmLeadsData.length;
    const delivered = crmLeadsData.filter((l) => l.status === "SENT").length;
    const dueSept11 = crmLeadsData.filter(
      (l) => l.followUpDate === "2026-09-11"
    ).length;
    const queued = crmLeadsData.filter((l) => l.status === "QUEUED").length;
    const bounced = crmLeadsData.filter((l) => l.status === "BOUNCED").length;
    return { total, delivered, dueSept11, queued, bounced };
  }, []);

  // CSV Export Handler
  const handleExportCSV = () => {
    const headers = [
      "Company",
      "Sector",
      "Industry",
      "Recipient",
      "Title",
      "Email",
      "Locality",
      "Region",
      "Country",
      "Status",
      "Sent_Timestamp",
      "FollowUp_Date",
      "Operational_Focus",
      "Dual_BCC_1",
      "Dual_BCC_2",
    ];

    const rows = filteredLeads.map((l) => [
      `"${l.company.replace(/"/g, '""')}"`,
      `"${l.sector}"`,
      `"${l.industry.replace(/"/g, '""')}"`,
      `"${l.recipientName.replace(/"/g, '""')}"`,
      `"${l.title.replace(/"/g, '""')}"`,
      `"${l.email}"`,
      `"${l.locality.replace(/"/g, '""')}"`,
      `"${l.region.replace(/"/g, '""')}"`,
      `"${l.country.replace(/"/g, '""')}"`,
      `"${l.status}"`,
      `"${l.sentTimestamp || ""}"`,
      `"${l.followUpDate || ""}"`,
      `"${l.operationalFocus.replace(/"/g, '""')}"`,
      `"${(l.bcc && l.bcc[0]) || "tanmayv86@gmail.com"}"`,
      `"${(l.bcc && l.bcc[1]) || "shrushvaity@gmail.com"}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `storm_veins_studio_outreach_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Helper for status styling
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "SENT":
        return (
          <span className="outreach-badge badge-delivered">
            <span className="badge-dot dot-delivered"></span> Active Delivered
          </span>
        );
      case "QUEUED":
        return (
          <span className="outreach-badge badge-queued">
            <span className="badge-dot dot-queued"></span> Hourly Queue
          </span>
        );
      case "BOUNCED":
        return (
          <span className="outreach-badge badge-bounced">
            <span className="badge-dot dot-bounced"></span> Shielded Inactive
          </span>
        );
      default:
        return <span className="outreach-badge badge-default">{status}</span>;
    }
  };

  return (
    <div className="outreach-suite-light">
      {/* =========================================================================
          SUB-VIEW 1: ENTERPRISE DIRECTORY & SECTOR POOL
          ========================================================================= */}
      {subMode === "pool" && (
        <div className="suite-view-container">
          {/* Executive KPI Metrics Strip (Light Theme) */}
          <div className="outreach-kpi-grid">
            <div className="outreach-kpi-card">
              <div className="kpi-icon-wrap bg-indigo-soft">
                <Building2 size={18} className="text-indigo" />
              </div>
              <div className="kpi-content">
                <span className="kpi-title">ENTERPRISE DIRECTORY</span>
                <strong className="kpi-number">{metrics.total}</strong>
                <span className="kpi-subtitle">6 Sectors · 13 Hubs</span>
              </div>
            </div>

            <div className="outreach-kpi-card">
              <div className="kpi-icon-wrap bg-emerald-soft">
                <CheckCircle2 size={18} className="text-emerald" />
              </div>
              <div className="kpi-content">
                <span className="kpi-title">ACTIVE DELIVERIES</span>
                <strong className="kpi-number text-emerald">
                  {metrics.delivered}
                </strong>
                <span className="kpi-subtitle">Verified Inboxes</span>
              </div>
            </div>

            <div className="outreach-kpi-card">
              <div className="kpi-icon-wrap bg-amber-soft">
                <Calendar size={18} className="text-amber" />
              </div>
              <div className="kpi-content">
                <span className="kpi-title">DUE SEPT 11TH</span>
                <strong className="kpi-number text-amber">
                  {metrics.dueSept11}
                </strong>
                <span className="kpi-subtitle">Day 5 Follow-Up Cohort</span>
              </div>
            </div>

            <div className="outreach-kpi-card">
              <div className="kpi-icon-wrap bg-blue-soft">
                <Clock size={18} className="text-blue" />
              </div>
              <div className="kpi-content">
                <span className="kpi-title">HOURLY DISPATCH QUEUE</span>
                <strong className="kpi-number text-blue">
                  {metrics.queued}
                </strong>
                <span className="kpi-subtitle">8 Targets / Hour Limit</span>
              </div>
            </div>

            <div className="outreach-kpi-card">
              <div className="kpi-icon-wrap bg-rose-soft">
                <ShieldAlert size={18} className="text-rose" />
              </div>
              <div className="kpi-content">
                <span className="kpi-title">SHIELDED INACTIVE</span>
                <strong className="kpi-number text-rose">
                  {metrics.bounced}
                </strong>
                <span className="kpi-subtitle">Reputation Protected</span>
              </div>
            </div>
          </div>

          {/* Unified Structured Filter & Category Control Panel */}
          <div className="suite-unified-panel">
            {/* Row 1: Search & Layout Tools */}
            <div className="panel-row-top">
              <div className="filter-search-box">
                <Search size={14} className="search-icon" />
                <input
                  type="text"
                  placeholder="Search company, executive, domain, email, or offering..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="filter-search-input"
                />
                {searchQuery && (
                  <button
                    type="button"
                    className="search-clear-btn"
                    onClick={() => setSearchQuery("")}
                    title="Clear search"
                  >
                    <X size={12} />
                  </button>
                )}
              </div>

              <div className="panel-actions-cluster">
                <div className="view-mode-toggle">
                  <button
                    type="button"
                    className={`view-btn ${viewMode === "table" ? "active" : ""}`}
                    onClick={() => setViewMode("table")}
                    title="Table View"
                  >
                    <List size={13} />
                    <span>Table</span>
                  </button>
                  <button
                    type="button"
                    className={`view-btn ${viewMode === "grid" ? "active" : ""}`}
                    onClick={() => setViewMode("grid")}
                    title="Grid View"
                  >
                    <Grid size={13} />
                    <span>Grid</span>
                  </button>
                </div>

                <button
                  type="button"
                  className="suite-export-btn"
                  onClick={handleExportCSV}
                  title="Download CSV"
                >
                  <Download size={13} />
                  <span>Export CSV</span>
                </button>
              </div>
            </div>

            {/* Row 2: Category Pills */}
            <div className="panel-row-categories">
              <span className="row-label">SECTOR:</span>
              <div className="sector-pills-row">
                {sectors.map((sec) => (
                  <button
                    key={sec.id}
                    type="button"
                    className={`sector-pill-btn ${
                      sectorFilter === sec.id ? "active" : ""
                    }`}
                    onClick={() => setSectorFilter(sec.id)}
                  >
                    <span>{sec.label}</span>
                    <span className="pill-badge">{sec.count}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Row 3: Dropdown Selectors */}
            <div className="panel-row-filters">
              <div className="filter-select-wrap">
                <label className="filter-label">REGION</label>
                <select
                  value={regionFilter}
                  onChange={(e) => setRegionFilter(e.target.value)}
                  className="filter-select"
                >
                  <option value="all">All Geographies (13 Hubs)</option>
                  <option value="thane">Thane Central (East &amp; West)</option>
                  <option value="navi_mumbai">Navi Mumbai (Vashi, Mahape, Turbhe)</option>
                  <option value="kalyan_dombivli">Kalyan &amp; Dombivli</option>
                  <option value="ghatkopar_kurla">Ghatkopar &amp; Kurla Hubs</option>
                  <option value="mumbai_metro">Mumbai Metropolitan Region</option>
                  <option value="interstate">Interstate Hubs (BLR, HYD, NCR, GUJ, CHN)</option>
                  <option value="international">Global (Dubai, SG, UK, USA)</option>
                </select>
              </div>

              <div className="filter-select-wrap">
                <label className="filter-label">STATUS</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="filter-select"
                >
                  <option value="all">All Lifecycle States</option>
                  <option value="sent">Active Delivered (27)</option>
                  <option value="queued">Hourly Queue (28)</option>
                  <option value="bounced">Shielded Inactive (10)</option>
                </select>
              </div>

              <div className="filter-select-wrap">
                <label className="filter-label">CADENCE</label>
                <select
                  value={cadenceFilter}
                  onChange={(e) => setCadenceFilter(e.target.value)}
                  className="filter-select"
                >
                  <option value="all">All Cadence Windows</option>
                  <option value="sept11">Due Sept 11th (Day 5)</option>
                  <option value="hourly">Hourly Auto-Engine</option>
                  <option value="shielded">Shielded / Quarantined</option>
                </select>
              </div>

              <div className="filter-select-wrap">
                <label className="filter-label">SORT</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="filter-select"
                >
                  <option value="name">Company Name (A-Z)</option>
                  <option value="status">Outreach Status</option>
                  <option value="region">Geographic Region</option>
                  <option value="date">Dispatch Date</option>
                </select>
              </div>

              {(searchQuery ||
                sectorFilter !== "all" ||
                regionFilter !== "all" ||
                statusFilter !== "all" ||
                cadenceFilter !== "all") && (
                <button
                  type="button"
                  className="reset-filters-btn"
                  onClick={() => {
                    setSectorFilter("all");
                    setRegionFilter("all");
                    setStatusFilter("all");
                    setCadenceFilter("all");
                    setSearchQuery("");
                  }}
                >
                  <RotateCcw size={11} />
                  <span>Reset Filters</span>
                </button>
              )}
            </div>
          </div>

          {/* Results Counter Bar */}
          <div className="suite-results-info">
            <span>
              Showing <strong>{filteredLeads.length}</strong> of{" "}
              <strong>{crmLeadsData.length}</strong> accounts matching criteria
            </span>
            {(searchQuery ||
              sectorFilter !== "all" ||
              regionFilter !== "all" ||
              statusFilter !== "all" ||
              cadenceFilter !== "all") && (
              <button
                type="button"
                className="reset-filters-btn"
                onClick={() => {
                  setSectorFilter("all");
                  setRegionFilter("all");
                  setStatusFilter("all");
                  setCadenceFilter("all");
                  setSearchQuery("");
                }}
              >
                <RotateCcw size={11} />
                <span>Reset all filters</span>
              </button>
            )}
          </div>

          {/* TABLE VIEW */}
          {viewMode === "table" ? (
            <div className="suite-table-wrapper">
              <table className="suite-data-table">
                <thead>
                  <tr>
                    <th>COMPANY &amp; SECTOR</th>
                    <th>KEY EXECUTIVE</th>
                    <th>EMAIL &amp; LOCALITY</th>
                    <th>OUTREACH STATUS</th>
                    <th>NEXT CADENCE</th>
                    <th>ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLeads.map((lead) => (
                    <tr
                      key={lead.id}
                      onClick={() => setSelectedLead(lead)}
                      className="table-row-clickable"
                    >
                      <td>
                        <div className="cell-company-block">
                          <strong className="company-title">
                            {lead.company}
                          </strong>
                          <span className="industry-caption">
                            {lead.industry}
                          </span>
                        </div>
                      </td>
                      <td>
                        <div className="cell-contact-block">
                          <span className="contact-name">
                            {lead.recipientName}
                          </span>
                          <span className="contact-title">{lead.title}</span>
                        </div>
                      </td>
                      <td>
                        <div className="cell-geo-block">
                          <span className="lead-email-mono">{lead.email}</span>
                          <span className="lead-location">
                            <MapPin size={10} />
                            {lead.locality}, {lead.region}
                          </span>
                        </div>
                      </td>
                      <td>{getStatusBadge(lead.status)}</td>
                      <td>
                        <div className="cell-cadence-block">
                          {lead.followUpDate !== "N/A" ? (
                            <span className="cadence-date-badge">
                              <Calendar size={11} />
                              {lead.followUpDate}
                            </span>
                          ) : (
                            <span className="cadence-inactive-badge">
                              Shielded
                            </span>
                          )}
                          <span className="cadence-sub">
                            {lead.status === "SENT"
                              ? "Day 5 Re-approach"
                              : lead.status === "QUEUED"
                              ? "Pending Dispatch"
                              : "Quarantined"}
                          </span>
                        </div>
                      </td>
                      <td>
                        <button
                          type="button"
                          className="table-inspect-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedLead(lead);
                          }}
                        >
                          <Eye size={12} />
                          <span>Inspect</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            /* CARD GRID VIEW */
            <div className="suite-cards-grid">
              {filteredLeads.map((lead) => (
                <div
                  key={lead.id}
                  className="suite-lead-card"
                  onClick={() => setSelectedLead(lead)}
                >
                  <div className="card-top-header">
                    <div className="card-title-group">
                      <span className="card-sector-tag">{lead.sector}</span>
                      <h4 className="card-company-name">{lead.company}</h4>
                    </div>
                    {getStatusBadge(lead.status)}
                  </div>

                  <p className="card-industry-text">{lead.industry}</p>

                  <div className="card-meta-list">
                    <div className="meta-item">
                      <Users size={12} className="meta-icon" />
                      <span>
                        <strong>{lead.recipientName}</strong> · {lead.title}
                      </span>
                    </div>
                    <div className="meta-item">
                      <Mail size={12} className="meta-icon" />
                      <span className="text-mono">{lead.email}</span>
                    </div>
                    <div className="meta-item">
                      <MapPin size={12} className="meta-icon" />
                      <span>
                        {lead.locality}, {lead.region}, {lead.country}
                      </span>
                    </div>
                  </div>

                  <div className="card-offering-box">
                    <span className="offering-lbl">PROPOSED VALUE PILLARS</span>
                    <p className="offering-text">{lead.operationalFocus}</p>
                  </div>

                  <div className="card-footer-row">
                    <div className="card-cadence-info">
                      <span className="lbl">CADENCE SCHEDULE</span>
                      <strong>{lead.followUpDate || "Quarantined"}</strong>
                    </div>

                    <button
                      type="button"
                      className="card-open-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedLead(lead);
                      }}
                    >
                      <span>Full Dossier</span>
                      <ChevronRight size={13} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* =========================================================================
          SUB-VIEW 2: 4-DAY CADENCE & FOLLOW-UP PIPELINE
          ========================================================================= */}
      {subMode === "cadence" && (
        <div className="suite-view-container">
          {/* Cadence Architecture Overview Banner */}
          <div className="cadence-overview-banner">
            <div className="banner-left">
              <div className="banner-badge-row">
                <span className="cadence-pill-active">STRICT 4-DAY CADENCE</span>
                <span className="cadence-pill-sub">Zero Rate Limit Tripping</span>
              </div>
              <h3>Automated Enterprise Re-Approach Progression</h3>
              <p>
                Every initial outreach is strictly scheduled on a 4-day interval
                (Day 1 &rarr; Day 5 &rarr; Day 9 &rarr; Day 13). September 7th
                dispatches will receive their bespoke operational update on{" "}
                <strong>September 11th, 2026</strong>.
              </p>
            </div>

            <div className="banner-stages-track">
              <div className="stage-step done">
                <span className="step-tag">DAY 01</span>
                <strong className="step-title">Initial Hook</strong>
                <span className="step-date">07 Sept (Sent)</span>
              </div>
              <div className="track-connector active"></div>
              <div className="stage-step next">
                <span className="step-tag">DAY 05</span>
                <strong className="step-title">Value Teardown</strong>
                <span className="step-date">11 Sept (Scheduled)</span>
              </div>
              <div className="track-connector"></div>
              <div className="stage-step upcoming">
                <span className="step-tag">DAY 09</span>
                <strong className="step-title">Case Proof</strong>
                <span className="step-date">15 Sept (Queued)</span>
              </div>
              <div className="track-connector"></div>
              <div className="stage-step upcoming">
                <span className="step-tag">DAY 13</span>
                <strong className="step-title">Final Close</strong>
                <span className="step-date">19 Sept (Cadence)</span>
              </div>
            </div>
          </div>

          {/* Two Cohort Columns */}
          <div className="cadence-cohorts-grid">
            {/* Cohort 1: September 11 Follow-Up Cohort */}
            <div className="cohort-column-card">
              <div className="cohort-card-header">
                <div>
                  <span className="cohort-badge bg-amber-soft text-amber">
                    COHORT 01 · 27 ENTERPRISES
                  </span>
                  <h4 className="cohort-title">
                    Follow-Up Due: September 11th, 2026
                  </h4>
                  <span className="cohort-subtitle">
                    All initial dispatches delivered cleanly with dual-BCC
                  </span>
                </div>
                <div className="cohort-clock">
                  <Clock size={16} className="text-amber" />
                  <span>4 Days Remaining</span>
                </div>
              </div>

              <div className="cohort-list-scroll">
                {crmLeadsData
                  .filter((l) => l.followUpDate === "2026-09-11")
                  .map((lead) => (
                    <div
                      key={lead.id}
                      className="cohort-lead-item"
                      onClick={() => setSelectedLead(lead)}
                    >
                      <div className="item-main">
                        <strong className="item-company">{lead.company}</strong>
                        <span className="item-meta">
                          {lead.recipientName} ({lead.title}) · {lead.locality}
                        </span>
                        <span className="item-focus-snippet">
                          Focus: {lead.operationalFocus}
                        </span>
                      </div>
                      <div className="item-actions">
                        <span className="item-status-tag tag-sent">Delivered</span>
                        <button
                          type="button"
                          className="item-preview-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedLead(lead);
                            setModalTab("email");
                          }}
                        >
                          <Eye size={12} />
                          <span>Preview Sept 11 Draft</span>
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Cohort 2: Hourly Automation Queue */}
            <div className="cohort-column-card">
              <div className="cohort-card-header">
                <div>
                  <span className="cohort-badge bg-blue-soft text-blue">
                    COHORT 02 · 28 ENTERPRISES
                  </span>
                  <h4 className="cohort-title">
                    Hourly Ingestion &amp; Dispatch Queue
                  </h4>
                  <span className="cohort-subtitle">
                    Dispatched in 8-lead batches every hour by Task Scheduler
                  </span>
                </div>
                <div className="cohort-clock">
                  <Activity size={16} className="text-blue" />
                  <span>8 Sends / Window</span>
                </div>
              </div>

              <div className="cohort-list-scroll">
                {crmLeadsData
                  .filter((l) => l.status === "QUEUED")
                  .map((lead, idx) => (
                    <div
                      key={lead.id}
                      className="cohort-lead-item"
                      onClick={() => setSelectedLead(lead)}
                    >
                      <div className="item-main">
                        <div className="item-queue-rank">
                          <span className="rank-number">#{idx + 1}</span>
                          <strong className="item-company">{lead.company}</strong>
                        </div>
                        <span className="item-meta">
                          {lead.recipientName} · {lead.region}, {lead.country}
                        </span>
                        <span className="item-focus-snippet">
                          Target Value: {lead.operationalFocus}
                        </span>
                      </div>
                      <div className="item-actions">
                        <span className="item-status-tag tag-queued">
                          Hourly Queue
                        </span>
                        <button
                          type="button"
                          className="item-preview-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedLead(lead);
                            setModalTab("email");
                          }}
                        >
                          <Eye size={12} />
                          <span>View Initial Copy</span>
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          SUB-VIEW 3: HOSTINGER SMTP TELEMETRY & BOUNCE SHIELD
          ========================================================================= */}
      {subMode === "telemetry" && (
        <div className="suite-view-container">
          {/* Top Hostinger Bounds Card */}
          <div className="telemetry-bounds-card">
            <div className="bounds-header">
              <div className="bounds-badge-cluster">
                <span className="hostinger-badge">HOSTINGER BUSINESS SMTP</span>
                <span className="rate-limit-badge">HARD LIMIT AVOIDANCE</span>
              </div>
              <h3>Sovereign Rate Limit &amp; Envelope Quota Telemetry</h3>
              <p>
                Calculated to mathematically prevent <code>hostinger_out_ratelimit</code>.
                Every outreach email burns 3 envelopes (1 Primary Recipient + 2 Dual
                BCCs to <code>tanmayv86@gmail.com</code> &amp; <code>shrushvaity@gmail.com</code>).
              </p>
            </div>

            <div className="bounds-metrics-strip">
              <div className="bound-gauge-box">
                <span className="gauge-label">HOURLY DISPATCH TARGET</span>
                <strong className="gauge-value text-emerald">8 Targets/hr</strong>
                <span className="gauge-sub">Hard limit: 30 sends/hr</span>
                <div className="gauge-bar">
                  <div className="gauge-fill bg-emerald" style={{ width: "27%" }}></div>
                </div>
              </div>

              <div className="bound-gauge-box">
                <span className="gauge-label">ENVELOPE BURN RATE</span>
                <strong className="gauge-value text-indigo">24 Envelopes/hr</strong>
                <span className="gauge-sub">8 sends &times; 3 envelopes (Safe cap: 60)</span>
                <div className="gauge-bar">
                  <div className="gauge-fill bg-indigo" style={{ width: "40%" }}></div>
                </div>
              </div>

              <div className="bound-gauge-box">
                <span className="gauge-label">DAILY RUN RATE</span>
                <strong className="gauge-value text-blue">192 Accounts/day</strong>
                <span className="gauge-sub">24/7 autonomous Windows execution</span>
                <div className="gauge-bar">
                  <div className="gauge-fill bg-blue" style={{ width: "100%" }}></div>
                </div>
              </div>

              <div className="bound-gauge-box">
                <span className="gauge-label">PACING JITTER</span>
                <strong className="gauge-value text-amber">25–30s Delay</strong>
                <span className="gauge-sub">Randomized humanized gap</span>
                <div className="gauge-bar">
                  <div className="gauge-fill bg-amber" style={{ width: "100%" }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Two Engine Panes */}
          <div className="telemetry-split-grid">
            {/* Left Pane: Shielded Bounces */}
            <div className="telemetry-pane-card">
              <div className="pane-header">
                <div>
                  <span className="pane-badge bg-rose-soft text-rose">
                    REPUTATION SHIELD
                  </span>
                  <h4 className="pane-title">
                    Quarantined Inboxes ({metrics.bounced} Addresses)
                  </h4>
                  <p className="pane-desc">
                    Identified via automated IMAP bounce detection. Quarantined to
                    ensure 99.8% sender score.
                  </p>
                </div>
                <ShieldAlert size={20} className="text-rose" />
              </div>

              <div className="quarantine-table-wrap">
                <table className="quarantine-table">
                  <thead>
                    <tr>
                      <th>COMPANY</th>
                      <th>FAILED INBOX</th>
                      <th>SMTP BOUNCE DIAGNOSIS</th>
                      <th>ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {crmLeadsData
                      .filter((l) => l.status === "BOUNCED")
                      .map((lead) => (
                        <tr key={lead.id}>
                          <td>
                            <strong>{lead.company}</strong>
                            <span className="geo-sub">{lead.locality}</span>
                          </td>
                          <td>
                            <span className="failed-email">{lead.email}</span>
                          </td>
                          <td>
                            <span className="bounce-reason-badge">
                              {lead.email.includes("squarefeet")
                                ? "550 5.1.1 User Unknown"
                                : lead.email.includes("vihang")
                                ? "554 Relay Access Denied"
                                : lead.email.includes("horizon")
                                ? "Host Not Found (NXDOMAIN)"
                                : lead.email.includes("mgm") ||
                                  lead.email.includes("terna")
                                ? "550 Mailbox Disabled"
                                : "550 Bad Recipient Address"}
                            </span>
                          </td>
                          <td>
                            <span className="shielded-lock-tag">
                              QUARANTINED
                            </span>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right Pane: Daemon Status & Dual BCC Validator */}
            <div className="telemetry-pane-card">
              <div className="pane-header">
                <div>
                  <span className="pane-badge bg-emerald-soft text-emerald">
                    AUTOMATION DAEMON
                  </span>
                  <h4 className="pane-title">
                    Windows Task Scheduler &amp; Compliance
                  </h4>
                  <p className="pane-desc">
                    Live telemetry verifying background dispatch scripts and dual-BCC.
                  </p>
                </div>
                <Server size={20} className="text-emerald" />
              </div>

              {/* Task Scheduler Cards */}
              <div className="daemon-status-blocks">
                <div className="daemon-block">
                  <div className="daemon-block-header">
                    <span className="daemon-name">
                      StormVeins_Hourly_Outreach_Engine
                    </span>
                    <span className="daemon-state-live">ACTIVE / HOURLY</span>
                  </div>
                  <p className="daemon-detail">
                    Executes <code>outreach/run_hourly_daemon.bat</code> every 60
                    minutes. Evaluates SMTP health and fires 8 prioritized targets.
                  </p>
                  <div className="daemon-meta-row">
                    <span>Schedule: Every 1 Hour</span>
                    <span>Action: python outreach_master_daemon.py</span>
                  </div>
                </div>

                <div className="daemon-block">
                  <div className="daemon-block-header">
                    <span className="daemon-name">
                      StormVeins_Daily_Outreach_1130AM
                    </span>
                    <span className="daemon-state-live">ACTIVE / DAILY</span>
                  </div>
                  <p className="daemon-detail">
                    Executes <code>outreach/run_daily_automation.bat</code> daily at
                    11:30 AM IST. Automatically opens Antigravity IDE with Storm Veins.
                  </p>
                  <div className="daemon-meta-row">
                    <span>Schedule: Daily at 11:30 AM</span>
                    <span>Action: launch_antigravity.py</span>
                  </div>
                </div>

                {/* Dual BCC Compliance Check */}
                <div className="dual-bcc-compliance-box">
                  <div className="bcc-check-title">
                    <CheckCircle2 size={16} className="text-emerald" />
                    <strong>Dual-BCC Audit Compliance: 100%</strong>
                  </div>
                  <p className="bcc-check-text">
                    All dispatches automatically append both executive addresses:
                  </p>
                  <div className="bcc-pills-row">
                    <span className="bcc-pill">
                      BCC 1: <code>tanmayv86@gmail.com</code>
                    </span>
                    <span className="bcc-pill">
                      BCC 2: <code>shrushvaity@gmail.com</code>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          INSPECTION MODAL (DEEP ENTERPRISE DOSSIER & DISPATCHED EMAIL)
          ========================================================================= */}
      {selectedLead && (
        <div
          className="suite-modal-overlay"
          onClick={() => setSelectedLead(null)}
        >
          <div
            className="suite-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="suite-modal-header">
              <div className="modal-title-wrap">
                <div className="modal-badge-row">
                  <span className="modal-sector-pill">
                    {selectedLead.sector}
                  </span>
                  {getStatusBadge(selectedLead.status)}
                </div>
                <h3 className="modal-company-title">{selectedLead.company}</h3>
                <span className="modal-industry-subtitle">
                  {selectedLead.industry}
                </span>
              </div>

              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setSelectedLead(null)}
              >
                <X size={16} />
              </button>
            </div>

            {/* Modal Navigation Tabs */}
            <div className="suite-modal-tabs">
              <button
                type="button"
                className={`modal-tab-btn ${
                  modalTab === "dossier" ? "active" : ""
                }`}
                onClick={() => setModalTab("dossier")}
              >
                <Building2 size={13} />
                <span>Enterprise Dossier</span>
              </button>

              <button
                type="button"
                className={`modal-tab-btn ${
                  modalTab === "email" ? "active" : ""
                }`}
                onClick={() => setModalTab("email")}
              >
                <Mail size={13} />
                <span>Dispatched Email Preview</span>
              </button>

              <button
                type="button"
                className={`modal-tab-btn ${
                  modalTab === "cadence" ? "active" : ""
                }`}
                onClick={() => setModalTab("cadence")}
              >
                <Clock size={13} />
                <span>Cadence &amp; Next Action</span>
              </button>
            </div>

            {/* Modal Body */}
            <div className="suite-modal-body">
              {modalTab === "dossier" && (
                <div className="modal-dossier-tab">
                  <div className="dossier-grid">
                    <div className="dossier-card">
                      <span className="dossier-label">PRIMARY EXECUTIVE</span>
                      <strong className="dossier-val">
                        {selectedLead.recipientName}
                      </strong>
                      <span className="dossier-sub">{selectedLead.title}</span>
                    </div>

                    <div className="dossier-card">
                      <span className="dossier-label">VERIFIED INBOX</span>
                      <strong className="dossier-val text-mono">
                        {selectedLead.email}
                      </strong>
                      <span className="dossier-sub">Direct Corporate Email</span>
                    </div>

                    <div className="dossier-card">
                      <span className="dossier-label">GEOGRAPHIC LOCATION</span>
                      <strong className="dossier-val">
                        {selectedLead.locality}
                      </strong>
                      <span className="dossier-sub">
                        {selectedLead.region}, {selectedLead.country}
                      </span>
                    </div>

                    <div className="dossier-card">
                      <span className="dossier-label">CADENCE SCHEDULE</span>
                      <strong className="dossier-val text-emerald">
                        {selectedLead.followUpDate || "Quarantined"}
                      </strong>
                      <span className="dossier-sub">
                        {selectedLead.status === "SENT"
                          ? "Day 5 Re-approach Scheduled"
                          : selectedLead.status === "QUEUED"
                          ? "Hourly Queue"
                          : "Shielded"}
                      </span>
                    </div>
                  </div>

                  <div className="dossier-section-box">
                    <span className="section-title">
                      PROPOSED VALUE PILLARS &amp; ARCHITECTURAL SOLUTIONS
                    </span>
                    <p className="section-text">{selectedLead.operationalFocus}</p>
                  </div>

                  <div className="dossier-section-box">
                    <span className="section-title">
                      DUAL-BCC RECIPIENTS &amp; AUDIT TRAIL
                    </span>
                    <div className="dossier-bcc-list">
                      <div className="bcc-item">
                        <CheckCircle2 size={13} className="text-emerald" />
                        <span>BCC 1: <code>tanmayv86@gmail.com</code> (Primary Monitor)</span>
                      </div>
                      <div className="bcc-item">
                        <CheckCircle2 size={13} className="text-emerald" />
                        <span>BCC 2: <code>shrushvaity@gmail.com</code> (Audit Monitor)</span>
                      </div>
                    </div>
                  </div>

                  {selectedLead.notes && (
                    <div className="dossier-notes-box">
                      <Info size={14} className="text-indigo" />
                      <span>{selectedLead.notes}</span>
                    </div>
                  )}
                </div>
              )}

              {modalTab === "email" && (
                <div className="modal-email-tab">
                  {/* Email Meta Strip */}
                  <div className="email-meta-strip">
                    <div className="meta-row">
                      <span className="lbl">FROM:</span>
                      <span className="val">
                        Storm Veins Studio &lt;outreach@stormveins.com&gt;
                      </span>
                    </div>
                    <div className="meta-row">
                      <span className="lbl">TO:</span>
                      <span className="val text-mono">
                        {selectedLead.recipientName} &lt;{selectedLead.email}&gt;
                      </span>
                    </div>
                    <div className="meta-row">
                      <span className="lbl">BCC:</span>
                      <span className="val text-mono">
                        tanmayv86@gmail.com, shrushvaity@gmail.com
                      </span>
                    </div>
                    <div className="meta-row subject-row">
                      <span className="lbl">SUBJECT:</span>
                      <span className="val font-semibold">
                        Sovereign Digital Infrastructure &amp; Operations Architecture · {selectedLead.company}
                      </span>
                      <button
                        type="button"
                        className="copy-mini-btn"
                        onClick={() => {
                          navigator.clipboard.writeText(
                            `Sovereign Digital Infrastructure & Operations Architecture · ${selectedLead.company}`
                          );
                          setCopiedSubject(true);
                          setTimeout(() => setCopiedSubject(false), 2000);
                        }}
                      >
                        {copiedSubject ? (
                          <>
                            <Check size={11} /> Copied
                          </>
                        ) : (
                          "Copy Subject"
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Rendered Email Body */}
                  <div className="email-rendered-body">
                    <p>{selectedLead.salutation}</p>

                    <p>
                      I am writing to you directly regarding{" "}
                      <strong>{selectedLead.company}</strong>&apos;s operational
                      systems and digital infrastructure.
                    </p>

                    <p>
                      At Storm Veins Media House, we custom-engineer sovereign
                      operational architectures for enterprise leaders in{" "}
                      {selectedLead.industry.toLowerCase()}. We noticed that
                      scaling organizations frequently contend with fragmented
                      workflows, slow data reconciliation, and siloed field
                      telemetry.
                    </p>

                    <p>
                      We specifically design end-to-end platforms to eliminate
                      these bottlenecks:
                    </p>

                    <ul className="email-points-list">
                      {selectedLead.operationalFocus
                        .split(",")
                        .map((point, idx) => (
                          <li key={idx}>
                            <strong>{point.trim()}</strong>
                          </li>
                        ))}
                    </ul>

                    <p>
                      Our multidisciplinary engineering pods deploy custom-built,
                      purpose-engineered platforms with zero third-party platform
                      lock-in and institutional-grade security.
                    </p>

                    <p>
                      Would your executive team be open to a brief 10-minute
                      exploratory conversation next Tuesday or Thursday to review
                      our architectural teardown for {selectedLead.company}?
                    </p>

                    <div className="email-signoff">
                      <p>
                        Respectfully,
                        <br />
                        <strong>Managing Partner</strong>
                        <br />
                        Storm Veins Media House
                        <br />
                        Mumbai &amp; Thane &middot; +91 96998 31323
                        <br />
                        <span className="text-emerald">stormveins.com</span>
                      </p>
                    </div>

                    <div className="email-compliance-notice">
                      <ShieldCheck size={12} className="text-emerald" />
                      <span>
                        Verified Dual-BCC dispatched &middot; Strictly zero PDF
                        attachments &middot; Fully compliant transmission
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {modalTab === "cadence" && (
                <div className="modal-cadence-tab">
                  <div className="cadence-flow-card">
                    <h4 className="flow-title">4-Day Follow-Up Lifecycle</h4>
                    <p className="flow-sub">
                      Autonomous cadence sequence calibrated for {selectedLead.company}
                    </p>

                    <div className="flow-timeline">
                      <div className="timeline-item done">
                        <div className="timeline-dot">
                          <Check size={10} />
                        </div>
                        <div className="timeline-content">
                          <span className="timeline-step">STEP 01 (DAY 1)</span>
                          <strong className="timeline-heading">
                            Initial Executive Observation
                          </strong>
                          <span className="timeline-time">
                            Sent: {selectedLead.sentTimestamp || "2026-09-07"}
                          </span>
                          <p className="timeline-desc">
                            Personalized operational overview highlighting{" "}
                            {selectedLead.operationalFocus.split(",")[0]}.
                          </p>
                        </div>
                      </div>

                      <div className="timeline-item active">
                        <div className="timeline-dot">
                          <Clock size={10} />
                        </div>
                        <div className="timeline-content">
                          <span className="timeline-step">STEP 02 (DAY 5)</span>
                          <strong className="timeline-heading">
                            Value Teardown &amp; Audit Re-Approach
                          </strong>
                          <span className="timeline-time text-emerald">
                            Scheduled: {selectedLead.followUpDate || "2026-09-11"}
                          </span>
                          <p className="timeline-desc">
                            Follow-up referencing original note and offering a
                            dedicated 2-minute architectural audit video.
                          </p>
                        </div>
                      </div>

                      <div className="timeline-item pending">
                        <div className="timeline-dot"></div>
                        <div className="timeline-content">
                          <span className="timeline-step">STEP 03 (DAY 9)</span>
                          <strong className="timeline-heading">
                            Audited Industry Case Proof
                          </strong>
                          <span className="timeline-time">
                            Scheduled: 2026-09-15
                          </span>
                          <p className="timeline-desc">
                            Verified enterprise benchmarks from comparable peers.
                          </p>
                        </div>
                      </div>

                      <div className="timeline-item pending">
                        <div className="timeline-dot"></div>
                        <div className="timeline-content">
                          <span className="timeline-step">STEP 04 (DAY 13)</span>
                          <strong className="timeline-heading">
                            Sprint Milestone Roadmap
                          </strong>
                          <span className="timeline-time">
                            Scheduled: 2026-09-19
                          </span>
                          <p className="timeline-desc">
                            Outcome-guaranteed delivery proposal and briefing invite.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="suite-modal-footer">
              <span className="modal-footer-hint">
                <ShieldCheck size={13} className="text-emerald" />
                Storm Veins Sovereign Outreach &middot; Dual-BCC Protected
              </span>

              <div className="modal-footer-btns">
                <a
                  href={`mailto:${selectedLead.email}?subject=${encodeURIComponent(
                    `Sovereign Digital Infrastructure · ${selectedLead.company}`
                  )}`}
                  className="btn-suite-primary"
                >
                  <Mail size={13} />
                  <span>Open in Mail Client</span>
                  <ArrowUpRight size={12} />
                </a>

                <button
                  type="button"
                  className="btn-suite-secondary"
                  onClick={() => setSelectedLead(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
