import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Filter,
  Download,
  ExternalLink,
  Mail,
  Copy,
  Check,
  Calendar,
  Building2,
  Clock,
  ShieldCheck,
  AlertTriangle,
  Globe,
  LayoutGrid,
  List,
  Sparkles,
  ArrowUpDown,
  X,
  Send,
  RefreshCw,
  Eye,
  CheckCircle2,
  MapPin,
  Briefcase,
  Layers,
  ChevronRight,
} from "lucide-react";
import { crmLeadsData, CRMLead } from "../data/crmLeads";
import { PageFrame, Logo, Eyebrow } from "../components/Site";

export default function CRM() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSector, setSelectedSector] = useState("all");
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedCadence, setSelectedCadence] = useState("all");
  const [sortBy, setSortBy] = useState<"company" | "status" | "followUpDate" | "region">("company");
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");
  const [activeModalLead, setActiveModalLead] = useState<CRMLead | null>(null);
  const [modalTab, setModalTab] = useState<"dossier" | "email">("dossier");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Sector Definitions
  const sectors = [
    { id: "all", label: "All Sectors", icon: Layers },
    { id: "real_estate", label: "Real Estate & Living", icon: Building2 },
    { id: "healthcare", label: "Healthcare & Hospitals", icon: ShieldCheck },
    { id: "pharma", label: "Pharmaceuticals & Bio", icon: Sparkles },
    { id: "manufacturing", label: "Industrial & Manufacturing", icon: Briefcase },
    { id: "safety_audits", label: "Fire Safety & Audits", icon: AlertTriangle },
    { id: "logistics", label: "Logistics & Cold Chain", icon: Globe },
  ];

  // Region Definitions
  const regions = [
    { id: "all", label: "Worldwide & Pan-India" },
    { id: "Thane", label: "Thane (East & West)" },
    { id: "MMR", label: "MMR (Kalyan, Vashi, Navi Mumbai, Kurla)" },
    { id: "Kalyan-Dombivli", label: "Kalyan & Dombivli" },
    { id: "Navi Mumbai", label: "Navi Mumbai & TTC" },
    { id: "Kurla-Ghatkopar", label: "Ghatkopar & Kurla Corridor" },
    { id: "South India", label: "Karnataka & Telangana (Bengaluru/Hyd)" },
    { id: "North India", label: "Delhi NCR & Noida" },
    { id: "West India", label: "Gujarat (Ahmedabad)" },
    { id: "Middle East", label: "Dubai & UAE" },
    { id: "Southeast Asia", label: "Singapore" },
    { id: "Europe", label: "London, United Kingdom" },
    { id: "North America", label: "United States" },
  ];

  // KPI Calculations
  const stats = useMemo(() => {
    const total = crmLeadsData.length;
    const sent = crmLeadsData.filter((l) => l.status === "SENT").length;
    const queued = crmLeadsData.filter((l) => l.status === "QUEUED").length;
    const bounced = crmLeadsData.filter((l) => l.status === "BOUNCED").length;
    const due11th = crmLeadsData.filter((l) => l.followUpDate === "2026-09-11" && l.status === "SENT").length;
    const deliveryRate = total > 0 ? Math.round((sent / (sent + bounced)) * 100) : 100;
    return { total, sent, queued, bounced, due11th, deliveryRate };
  }, []);

  // Filtered & Sorted Leads
  const filteredLeads = useMemo(() => {
    return crmLeadsData
      .filter((lead) => {
        // Sector Filter
        if (selectedSector !== "all" && lead.sector !== selectedSector) return false;
        // Region Filter
        if (selectedRegion !== "all" && lead.region !== selectedRegion) return false;
        // Status Filter
        if (selectedStatus !== "all" && lead.status !== selectedStatus) return false;
        // Cadence Filter
        if (selectedCadence === "due_11th" && lead.followUpDate !== "2026-09-11") return false;
        if (selectedCadence === "due_15th" && lead.followUpDate !== "2026-09-15") return false;
        if (selectedCadence === "bounced" && lead.status !== "BOUNCED") return false;

        // Search Query
        if (searchQuery.trim() !== "") {
          const q = searchQuery.toLowerCase();
          const match =
            lead.company.toLowerCase().includes(q) ||
            lead.recipientName.toLowerCase().includes(q) ||
            lead.email.toLowerCase().includes(q) ||
            lead.locality.toLowerCase().includes(q) ||
            lead.country.toLowerCase().includes(q) ||
            lead.industry.toLowerCase().includes(q);
          if (!match) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "company") return a.company.localeCompare(b.company);
        if (sortBy === "status") return a.status.localeCompare(b.status);
        if (sortBy === "region") return a.region.localeCompare(b.region);
        if (sortBy === "followUpDate") return a.followUpDate.localeCompare(b.followUpDate);
        return 0;
      });
  }, [searchQuery, selectedSector, selectedRegion, selectedStatus, selectedCadence, sortBy]);

  // Copy Email Handler
  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // CSV Export Handler
  const handleExportCSV = () => {
    const headers = [
      "Company",
      "Recipient",
      "Title",
      "Email",
      "Sector",
      "Region",
      "Locality",
      "Country",
      "Status",
      "Sent_Timestamp",
      "Follow_Up_Date",
      "Notes",
    ];

    const rows = filteredLeads.map((l) => [
      `"${l.company}"`,
      `"${l.recipientName}"`,
      `"${l.title}"`,
      `"${l.email}"`,
      `"${l.sector}"`,
      `"${l.region}"`,
      `"${l.locality}"`,
      `"${l.country}"`,
      `"${l.status}"`,
      `"${l.sentTimestamp}"`,
      `"${l.followUpDate}"`,
      `"${l.notes.replace(/"/g, '""')}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `storm_veins_crm_export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Reset Filters
  const resetFilters = () => {
    setSearchQuery("");
    setSelectedSector("all");
    setSelectedRegion("all");
    setSelectedStatus("all");
    setSelectedCadence("all");
    setSortBy("company");
  };

  const hasActiveFilters =
    searchQuery !== "" ||
    selectedSector !== "all" ||
    selectedRegion !== "all" ||
    selectedStatus !== "all" ||
    selectedCadence !== "all";

  return (
    <PageFrame>
      <div className="crm-master-root">
        {/* TOP COMMAND HERO */}
        <section className="crm-header-hero">
          <div className="container">
            <div className="crm-hero-top-row">
              <div className="crm-badge-strip">
                <span className="live-pulse-dot" />
                <span className="crm-badge-text">24/7 AUTONOMOUS PIPELINE COMMAND &bull; EST. 2018</span>
              </div>
              <div className="crm-engine-status-tag">
                <Clock size={13} className="text-emerald" />
                <span>Paced Hourly Dispatch: <strong>8 Targets / 24 Envelopes/hr</strong></span>
              </div>
            </div>

            <div className="crm-hero-main">
              <h1 className="crm-title">
                Global Enterprise Operations <span className="text-gradient">&amp; Outreach CRM</span>
              </h1>
              <p className="crm-subtitle">
                Centralized telemetry command for multi-state and international enterprise client pipelines, rate-limited hourly dispatch queues, and automated 4-day follow-up cadences.
              </p>
            </div>

            {/* KPI METRIC STRIP */}
            <div className="crm-kpi-grid">
              <div className="crm-kpi-card">
                <div className="crm-kpi-icon-wrap bg-emerald-glow">
                  <Globe size={18} className="text-emerald" />
                </div>
                <div className="crm-kpi-content">
                  <div className="crm-kpi-val text-gradient">{stats.total}</div>
                  <div className="crm-kpi-label">Worldwide Targets In Pool</div>
                  <div className="crm-kpi-sub">India (6 States) &bull; UAE &bull; SG &bull; UK &bull; US</div>
                </div>
              </div>

              <div className="crm-kpi-card highlight-card">
                <div className="crm-kpi-icon-wrap bg-emerald-glow">
                  <CheckCircle2 size={18} className="text-emerald" />
                </div>
                <div className="crm-kpi-content">
                  <div className="crm-kpi-val text-emerald">{stats.sent}</div>
                  <div className="crm-kpi-label">Active Delivered Inboxes</div>
                  <div className="crm-kpi-sub">{stats.deliveryRate}% Delivery Rate (Zero PDF)</div>
                </div>
              </div>

              <div className="crm-kpi-card">
                <div className="crm-kpi-icon-wrap bg-blue-glow">
                  <Calendar size={18} className="text-blue" />
                </div>
                <div className="crm-kpi-content">
                  <div className="crm-kpi-val text-blue">11 Sept</div>
                  <div className="crm-kpi-label">Next 4-Day Update Round</div>
                  <div className="crm-kpi-sub">{stats.due11th} Active Leads Scheduled (Day 5)</div>
                </div>
              </div>

              <div className="crm-kpi-card">
                <div className="crm-kpi-icon-wrap bg-amber-glow">
                  <Clock size={18} className="text-amber" />
                </div>
                <div className="crm-kpi-content">
                  <div className="crm-kpi-val text-amber">{stats.queued}</div>
                  <div className="crm-kpi-label">Hourly Queue Remaining</div>
                  <div className="crm-kpi-sub">Dispatching 8/hr to protect host limits</div>
                </div>
              </div>

              <div className="crm-kpi-card">
                <div className="crm-kpi-icon-wrap bg-purple-glow">
                  <ShieldCheck size={18} className="text-purple" />
                </div>
                <div className="crm-kpi-content">
                  <div className="crm-kpi-val text-purple">{stats.bounced}</div>
                  <div className="crm-kpi-label">Shielded / Bounces Flagged</div>
                  <div className="crm-kpi-sub">Permanent spam exclusion active</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* MAIN PIPELINE CONTROLS & VIEWER */}
        <section className="crm-viewer-section">
          <div className="container">
            
            {/* SECTOR PILLS BAR */}
            <div className="crm-sector-tabs-wrap">
              <div className="crm-sector-tabs-rail">
                {sectors.map((sec) => {
                  const Icon = sec.icon;
                  const count =
                    sec.id === "all"
                      ? crmLeadsData.length
                      : crmLeadsData.filter((l) => l.sector === sec.id).length;
                  const isActive = selectedSector === sec.id;
                  return (
                    <button
                      key={sec.id}
                      onClick={() => setSelectedSector(sec.id)}
                      className={`crm-sector-tab ${isActive ? "active" : ""}`}
                    >
                      <Icon size={14} className="sector-icon" />
                      <span>{sec.label}</span>
                      <span className="sector-count-pill">{count}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ADVANCED FILTER COMMAND BAR */}
            <div className="crm-filter-bar">
              <div className="crm-search-box">
                <Search size={16} className="search-icon" />
                <input
                  type="text"
                  placeholder="Search company, contact person, city, state, or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="crm-search-input"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery("")} className="clear-search-btn">
                    <X size={14} />
                  </button>
                )}
              </div>

              <div className="crm-filter-dropdowns">
                {/* Region Selector */}
                <div className="crm-select-wrap">
                  <Globe size={13} className="select-icon" />
                  <select
                    value={selectedRegion}
                    onChange={(e) => setSelectedRegion(e.target.value)}
                    className="crm-select"
                  >
                    {regions.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Delivery Status Selector */}
                <div className="crm-select-wrap">
                  <Filter size={13} className="select-icon" />
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="crm-select"
                  >
                    <option value="all">All Delivery Statuses</option>
                    <option value="SENT">Delivered (Active Cadence)</option>
                    <option value="QUEUED">Queued for Hourly Dispatch</option>
                    <option value="FAILED">Throttled (Auto-Retry)</option>
                    <option value="BOUNCED">Bounced &amp; Shielded</option>
                  </select>
                </div>

                {/* Cadence Selector */}
                <div className="crm-select-wrap">
                  <Calendar size={13} className="select-icon" />
                  <select
                    value={selectedCadence}
                    onChange={(e) => setSelectedCadence(e.target.value)}
                    className="crm-select"
                  >
                    <option value="all">All Follow-Up Dates</option>
                    <option value="due_11th">Due on 11th Sept (Round 1)</option>
                    <option value="due_15th">Due on 15th Sept (Round 2)</option>
                    <option value="bounced">Excluded (Bounced)</option>
                  </select>
                </div>

                {/* Sort Order */}
                <div className="crm-select-wrap">
                  <ArrowUpDown size={13} className="select-icon" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="crm-select"
                  >
                    <option value="company">Sort by Company (A-Z)</option>
                    <option value="status">Sort by Status</option>
                    <option value="region">Sort by Region</option>
                    <option value="followUpDate">Sort by Follow-Up Date</option>
                  </select>
                </div>

                {/* View Mode Toggle */}
                <div className="crm-view-mode-toggle">
                  <button
                    onClick={() => setViewMode("table")}
                    className={`toggle-btn ${viewMode === "table" ? "active" : ""}`}
                    title="Table View"
                  >
                    <List size={15} />
                  </button>
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`toggle-btn ${viewMode === "grid" ? "active" : ""}`}
                    title="Card Grid View"
                  >
                    <LayoutGrid size={15} />
                  </button>
                </div>

                {/* Export Button */}
                <button onClick={handleExportCSV} className="crm-export-btn" title="Export Filtered Results to CSV">
                  <Download size={14} />
                  <span>Export CSV</span>
                </button>

                {/* Reset Filters */}
                {hasActiveFilters && (
                  <button onClick={resetFilters} className="crm-reset-filters-btn">
                    <X size={13} />
                    <span>Reset</span>
                  </button>
                )}
              </div>
            </div>

            {/* RESULTS COUNT STRIP */}
            <div className="crm-results-summary-strip">
              <span className="results-count">
                Showing <strong>{filteredLeads.length}</strong> of <strong>{crmLeadsData.length}</strong> enterprise targets
              </span>
              <div className="active-filters-badges">
                {selectedSector !== "all" && (
                  <span className="filter-pill">
                    Sector: {sectors.find((s) => s.id === selectedSector)?.label}
                    <X size={11} onClick={() => setSelectedSector("all")} />
                  </span>
                )}
                {selectedRegion !== "all" && (
                  <span className="filter-pill">
                    Region: {regions.find((r) => r.id === selectedRegion)?.label}
                    <X size={11} onClick={() => setSelectedRegion("all")} />
                  </span>
                )}
                {selectedStatus !== "all" && (
                  <span className="filter-pill">
                    Status: {selectedStatus}
                    <X size={11} onClick={() => setSelectedStatus("all")} />
                  </span>
                )}
                {selectedCadence !== "all" && (
                  <span className="filter-pill">
                    Cadence: {selectedCadence}
                    <X size={11} onClick={() => setSelectedCadence("all")} />
                  </span>
                )}
              </div>
            </div>

            {/* DATA VIEW: TABLE OR GRID */}
            {filteredLeads.length === 0 ? (
              <div className="crm-empty-state">
                <AlertTriangle size={32} className="text-amber" />
                <h3>No enterprise leads match your criteria</h3>
                <p>Try clearing your search terms or relaxing the regional and category filters.</p>
                <button onClick={resetFilters} className="btn-luxury btn-emerald mt-4">
                  <span>Reset All Filters</span>
                </button>
              </div>
            ) : viewMode === "table" ? (
              <div className="crm-table-container">
                <table className="crm-table">
                  <thead>
                    <tr>
                      <th>Company &amp; Region</th>
                      <th>Primary Decision Maker</th>
                      <th>Sector &amp; Specialization</th>
                      <th>Delivery Status</th>
                      <th>Next 4-Day Update</th>
                      <th>Dual BCC Audit</th>
                      <th className="text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLeads.map((lead) => {
                      const isDelivered = lead.status === "SENT";
                      const isBounced = lead.status === "BOUNCED";
                      const isQueued = lead.status === "QUEUED";
                      const isFailed = lead.status === "FAILED";

                      return (
                        <tr key={lead.id} className={`crm-table-row ${isBounced ? "row-bounced" : ""}`}>
                          {/* Company & Region */}
                          <td className="cell-company">
                            <div className="company-name">{lead.company}</div>
                            <div className="company-sub">
                              <MapPin size={11} className="inline-icon" />
                              <span>{lead.locality}</span>
                              <span className="sep">&bull;</span>
                              <span className="country-tag">{lead.country}</span>
                            </div>
                          </td>

                          {/* Primary Contact */}
                          <td className="cell-contact">
                            <div className="contact-name">{lead.recipientName}</div>
                            <div className="contact-title">{lead.title}</div>
                            <div className="contact-email">
                              <a href={`mailto:${lead.email}`}>{lead.email}</a>
                              <button
                                onClick={() => handleCopy(lead.email, lead.id)}
                                className="copy-icon-btn"
                                title="Copy Email"
                              >
                                {copiedId === lead.id ? <Check size={11} className="text-emerald" /> : <Copy size={11} />}
                              </button>
                            </div>
                          </td>

                          {/* Sector */}
                          <td className="cell-sector">
                            <span className={`sector-badge sector-${lead.sector}`}>
                              {lead.sector.replace("_", " ").toUpperCase()}
                            </span>
                            <div className="industry-desc">{lead.industry}</div>
                          </td>

                          {/* Status */}
                          <td className="cell-status">
                            {isDelivered && (
                              <span className="status-pill status-sent">
                                <span className="status-dot green" />
                                Delivered (Active)
                              </span>
                            )}
                            {isQueued && (
                              <span className="status-pill status-queued">
                                <span className="status-dot blue" />
                                Hourly Queue
                              </span>
                            )}
                            {isFailed && (
                              <span className="status-pill status-failed">
                                <span className="status-dot amber" />
                                Rate Throttled (Retry)
                              </span>
                            )}
                            {isBounced && (
                              <span className="status-pill status-bounced">
                                <span className="status-dot red" />
                                Bounced / Shielded
                              </span>
                            )}
                          </td>

                          {/* Next Update */}
                          <td className="cell-cadence">
                            {lead.followUpDate === "N/A" ? (
                              <span className="text-muted text-xs">Exempt (Bounced)</span>
                            ) : (
                              <div className="cadence-pill">
                                <Calendar size={12} className="text-emerald" />
                                <span>{lead.followUpDate}</span>
                              </div>
                            )}
                            <div className="cadence-sub">
                              {lead.followUpCount > 0 ? `Touchpoint #${lead.followUpCount}` : "Round 1 Pending"}
                            </div>
                          </td>

                          {/* Dual BCC */}
                          <td className="cell-bcc">
                            <div className="bcc-tag">tanmayv86@gmail.com</div>
                            <div className="bcc-tag">shrushvaity@gmail.com</div>
                          </td>

                          {/* Actions */}
                          <td className="cell-actions text-right">
                            <button
                              onClick={() => {
                                setActiveModalLead(lead);
                                setModalTab("dossier");
                              }}
                              className="inspect-btn"
                            >
                              <span>Inspect</span>
                              <ChevronRight size={13} />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              /* GRID CARDS VIEW */
              <div className="crm-grid-container">
                {filteredLeads.map((lead) => {
                  const isDelivered = lead.status === "SENT";
                  const isBounced = lead.status === "BOUNCED";
                  const isQueued = lead.status === "QUEUED";

                  return (
                    <article key={lead.id} className="crm-lead-card">
                      <div className="crm-lead-card-header">
                        <span className={`sector-badge sector-${lead.sector}`}>
                          {lead.sector.replace("_", " ").toUpperCase()}
                        </span>
                        {isDelivered && <span className="status-badge-dot green" title="Delivered & In Active Cadence" />}
                        {isQueued && <span className="status-badge-dot blue" title="Queued in Hourly Scheduler" />}
                        {isBounced && <span className="status-badge-dot red" title="Bounced" />}
                      </div>

                      <h3 className="card-company-title">{lead.company}</h3>
                      <div className="card-location">
                        <MapPin size={12} className="text-emerald" />
                        <span>{lead.locality} ({lead.country})</span>
                      </div>

                      <div className="card-contact-box">
                        <div className="card-contact-name">{lead.recipientName}</div>
                        <div className="card-contact-title">{lead.title}</div>
                        <div className="card-contact-email">
                          <a href={`mailto:${lead.email}`}>{lead.email}</a>
                        </div>
                      </div>

                      <div className="card-focus-box">
                        <div className="focus-label">Operational Blueprint:</div>
                        <p className="focus-text">{lead.operationalFocus}</p>
                      </div>

                      <div className="card-footer-strip">
                        <div className="cadence-info">
                          <span className="lbl">Next Update:</span>
                          <strong>{lead.followUpDate}</strong>
                        </div>
                        <button
                          onClick={() => {
                            setActiveModalLead(lead);
                            setModalTab("email");
                          }}
                          className="card-preview-btn"
                        >
                          <Eye size={13} />
                          <span>View Email</span>
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* AUTOMATION & SCHEDULER TELEMETRY STRIP */}
        <section className="crm-telemetry-section">
          <div className="container">
            <div className="crm-telemetry-panel">
              <div className="telemetry-col-info">
                <div className="telemetry-badge">
                  <span className="live-pulse-dot" />
                  <span>WINDOWS TASK SCHEDULER &bull; ACTIVE 24/7</span>
                </div>
                <h3 className="telemetry-title">Autonomous Hourly Outreach Engine</h3>
                <p className="telemetry-sub">
                  Triggering every 60 minutes via <code>StormVeins_Hourly_Outreach_Engine</code>. Pre-flight probes ensure Hostinger rate limits (60 envelopes/hr) are mathematically respected, guaranteeing 100% domain reputation integrity.
                </p>
              </div>

              <div className="telemetry-col-metrics">
                <div className="telemetry-stat">
                  <span className="label">Hourly Target Quota</span>
                  <strong className="val text-emerald">8 Companies / Run</strong>
                </div>
                <div className="telemetry-stat">
                  <span className="label">Daily Scaled Capacity</span>
                  <strong className="val text-gradient">192 Inboxes / Day</strong>
                </div>
                <div className="telemetry-stat">
                  <span className="label">Daily IDE Auto-Launch</span>
                  <strong className="val text-emerald">11:30 AM Daily</strong>
                </div>
                <div className="telemetry-stat">
                  <span className="label">Follow-Up Cadence</span>
                  <strong className="val text-blue">Every 4th Day (1st, 5th, 9th)</strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* DETAILED COMPANY INSPECTION & LIVE EMAIL PREVIEW MODAL */}
        {activeModalLead && (
          <div className="crm-modal-backdrop" onClick={() => setActiveModalLead(null)}>
            <div className="crm-modal-window" onClick={(e) => e.stopPropagation()}>
              <div className="crm-modal-header">
                <div>
                  <div className="modal-eyebrow">
                    <span className={`sector-badge sector-${activeModalLead.sector}`}>
                      {activeModalLead.sector.replace("_", " ").toUpperCase()}
                    </span>
                    <span className="sep">&bull;</span>
                    <span>{activeModalLead.country}</span>
                  </div>
                  <h2 className="modal-title">{activeModalLead.company}</h2>
                </div>

                <div className="modal-controls">
                  <div className="modal-tabs">
                    <button
                      onClick={() => setModalTab("dossier")}
                      className={`tab-btn ${modalTab === "dossier" ? "active" : ""}`}
                    >
                      <span>Enterprise Dossier</span>
                    </button>
                    <button
                      onClick={() => setModalTab("email")}
                      className={`tab-btn ${modalTab === "email" ? "active" : ""}`}
                    >
                      <Eye size={13} />
                      <span>Email Blueprint (No PDF)</span>
                    </button>
                  </div>
                  <button onClick={() => setActiveModalLead(null)} className="close-modal-btn">
                    <X size={18} />
                  </button>
                </div>
              </div>

              <div className="crm-modal-body">
                {modalTab === "dossier" ? (
                  <div className="modal-dossier-view">
                    <div className="dossier-grid">
                      <div className="dossier-card">
                        <h4>Decision Maker Profile</h4>
                        <div className="profile-row">
                          <span className="p-lbl">Name:</span>
                          <strong>{activeModalLead.recipientName}</strong>
                        </div>
                        <div className="profile-row">
                          <span className="p-lbl">Executive Role:</span>
                          <span>{activeModalLead.title}</span>
                        </div>
                        <div className="profile-row">
                          <span className="p-lbl">Primary Email:</span>
                          <span className="email-link">
                            <a href={`mailto:${activeModalLead.email}`}>{activeModalLead.email}</a>
                            <button
                              onClick={() => handleCopy(activeModalLead.email, "modal-copy")}
                              className="copy-btn-inline"
                            >
                              {copiedId === "modal-copy" ? <Check size={12} className="text-emerald" /> : <Copy size={12} />}
                            </button>
                          </span>
                        </div>
                        {activeModalLead.cc.length > 0 && (
                          <div className="profile-row">
                            <span className="p-lbl">CC:</span>
                            <span>{activeModalLead.cc.join(", ")}</span>
                          </div>
                        )}
                        <div className="profile-row">
                          <span className="p-lbl">Dual BCC:</span>
                          <span className="text-xs text-muted">tanmayv86@gmail.com, shrushvaity@gmail.com</span>
                        </div>
                      </div>

                      <div className="dossier-card">
                        <h4>Territory &amp; Sector Blueprint</h4>
                        <div className="profile-row">
                          <span className="p-lbl">Locality / Hub:</span>
                          <span>{activeModalLead.locality}</span>
                        </div>
                        <div className="profile-row">
                          <span className="p-lbl">Jurisdiction:</span>
                          <span>{activeModalLead.region} &bull; {activeModalLead.country}</span>
                        </div>
                        <div className="profile-row">
                          <span className="p-lbl">Industry Domain:</span>
                          <span>{activeModalLead.industry}</span>
                        </div>
                        <div className="profile-row">
                          <span className="p-lbl">Delivery Status:</span>
                          <strong className={activeModalLead.status === "SENT" ? "text-emerald" : "text-amber"}>
                            {activeModalLead.status}
                          </strong>
                        </div>
                        <div className="profile-row">
                          <span className="p-lbl">Next Update Date:</span>
                          <strong className="text-blue">{activeModalLead.followUpDate}</strong>
                        </div>
                      </div>
                    </div>

                    <div className="dossier-full-card">
                      <h4>Custom Operating Focus Codification</h4>
                      <p>{activeModalLead.operationalFocus}</p>
                    </div>

                    <div className="dossier-timeline-card">
                      <h4>Automated 4-Day Cadence Lifecycle</h4>
                      <div className="cadence-steps">
                        <div className={`step-item ${activeModalLead.status === "SENT" ? "completed" : "pending"}`}>
                          <div className="step-badge">Day 1</div>
                          <div className="step-body">
                            <strong>Initial Outreach Dispatched</strong>
                            <span>{activeModalLead.sentTimestamp || "September 7, 2026"} &bull; Tailored Executive Angle (No PDF)</span>
                          </div>
                        </div>

                        <div className="step-item scheduled">
                          <div className="step-badge">Day 5</div>
                          <div className="step-body">
                            <strong>Update Check #1 (Executive Walkthrough Ingestion)</strong>
                            <span>Scheduled for <strong>September 11, 2026</strong> at 11:30 AM</span>
                          </div>
                        </div>

                        <div className="step-item queued">
                          <div className="step-badge">Day 9</div>
                          <div className="step-body">
                            <strong>Update Check #2 (Architecture Blueprint Follow-Up)</strong>
                            <span>Scheduled for <strong>September 15, 2026</strong></span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* LIVE EMAIL PREVIEW */
                  <div className="modal-email-preview">
                    <div className="email-meta-bar">
                      <div><strong>From:</strong> Storm Veins Media House &lt;contact@stormveins.com&gt;</div>
                      <div><strong>To:</strong> {activeModalLead.recipientName} &lt;{activeModalLead.email}&gt;</div>
                      <div><strong>BCC:</strong> tanmayv86@gmail.com, shrushvaity@gmail.com</div>
                      <div><strong>Subject:</strong> Private Operating Systems &amp; Dedicated Digital Infrastructure - {activeModalLead.company}</div>
                    </div>

                    <div className="email-mockup-frame">
                      {/* EMAIL BRAND HEADER */}
                      <div className="mock-email-header">
                        <div className="mock-logo">
                          <div className="mock-bars">
                            <span />
                            <span />
                            <span />
                          </div>
                          <div>
                            <div className="mock-brand">STORM VEINS</div>
                            <div className="mock-sub">MEDIA HOUSE &bull; EST. 2018</div>
                          </div>
                        </div>
                      </div>

                      {/* EMAIL BODY */}
                      <div className="mock-email-body">
                        <p className="mock-salutation">{activeModalLead.salutation}</p>
                        
                        <p>
                          I am reaching out from <strong>Storm Veins Media House</strong>. We engineer custom enterprise operating systems, private CRMs, and dedicated digital infrastructure for ambitious industry leaders across <strong>{activeModalLead.locality}</strong>.
                        </p>

                        <p>
                          Most executives in <strong>{activeModalLead.industry}</strong> navigate a persistent operational dilemma: off-the-shelf software (Salesforce, Zoho, SAP) forces teams into rigid, generic templates while accumulating compounding per-user licensing overhead, while fragmented spreadsheets and decentralized communication lead to administrative lag and operational leakage.
                        </p>

                        <p><strong>We design purpose-built operating systems that resolve this:</strong></p>

                        <ul className="mock-bullets">
                          <li>
                            <strong>100% Source Code Ownership &amp; Zero SaaS Seat-Tax:</strong> Deployed exclusively inside your dedicated AWS/GCP cloud tenant under your domain and branding, with full intellectual property ownership and zero recurring user licensing penalties.
                          </li>
                          <li>
                            <strong>Engineered for Your Exact Operating Model:</strong> {activeModalLead.operationalFocus} — codifying your native business workflows rather than forcing you into a standard generic box.
                          </li>
                          <li>
                            <strong>End-to-End Engineering &amp; Complete IP Handover:</strong> Built with modern high-velocity web and mobile architectures, complete with automated quotation engines, role-based RBAC security, and real-time executive telemetry.
                          </li>
                          <li>
                            <strong>Full Enterprise Integrations:</strong> Direct bi-directional integration with your existing ERP/accounting software, automated notification webhooks, cloud storage, and client self-service portals.
                          </li>
                        </ul>

                        <div className="mock-callout-box">
                          <strong>Live Systems Architecture:</strong> You can explore our engineering architecture and past client deployments directly at <a href="https://stormveins.com" target="_blank" rel="noreferrer">stormveins.com</a>.
                        </div>

                        <p>
                          Would you be open to an introductory executive briefing next week to explore an architectural blueprint tailored for <strong>{activeModalLead.company}</strong>?
                        </p>

                        <p>Respectfully,</p>

                        <div className="mock-signature">
                          <div className="sig-name">Storm Veins Media House</div>
                          <div className="sig-title">Systems Architecture &amp; Enterprise Practice</div>
                          <div className="sig-loc">Mumbai &amp; Thane, Maharashtra (Deploying Globally)</div>
                          <div className="sig-contact">
                            <strong>Direct Line:</strong> +91 96998 31323 &nbsp;|&nbsp; 
                            <strong>Email:</strong> contact@stormveins.com &nbsp;|&nbsp; 
                            <strong>Web:</strong> stormveins.com
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="crm-modal-footer">
                <div className="footer-left-info">
                  <ShieldCheck size={15} className="text-emerald" />
                  <span>Dual BCC Confirmed &bull; Zero Attachment Overhead &bull; Verified MX</span>
                </div>
                <div className="footer-action-buttons">
                  <a href={`mailto:${activeModalLead.email}`} className="btn-luxury btn-emerald">
                    <Mail size={14} />
                    <span>Send Direct Email</span>
                  </a>
                  <button onClick={() => setActiveModalLead(null)} className="btn-luxury btn-outline">
                    <span>Close Inspection</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </PageFrame>
  );
}
