import React, { useState, useMemo } from "react";
import {
  Mail,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Globe,
  Building2,
  Calendar,
  Sparkles,
  ArrowUpRight,
  Copy,
  Check,
  Send,
  MessageSquare,
  ShieldCheck,
  AlertCircle,
  Inbox,
  User,
  ExternalLink,
  ChevronRight,
  Flame,
  FileText
} from "lucide-react";
import { InboundMessage, inboundMessagesData } from "../../data/inboundMessages";

interface InboundMessagesHubProps {
  theme?: "light" | "dark";
  onSelectLeadInCrm?: (leadId: string) => void;
}

export default function InboundMessagesHub({
  theme = "light",
  onSelectLeadInCrm,
}: InboundMessagesHubProps) {
  // State
  const [selectedMailbox, setSelectedMailbox] = useState<string>("all");
  const [selectedIntent, setSelectedIntent] = useState<string>("all");
  const [selectedScope, setSelectedScope] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeMessageId, setActiveMessageId] = useState<string>(inboundMessagesData[0]?.id || "");
  const [copiedDraftId, setCopiedDraftId] = useState<string | null>(null);
  const [messagesList, setMessagesList] = useState<InboundMessage[]>(inboundMessagesData);

  // Mailboxes list with counts
  const mailboxes = useMemo(() => [
    { id: "all", label: "All Mailboxes (Together)", email: "" },
    { id: "tanmay@stormveins.com", label: "tanmay@stormveins.com", name: "Tanmay V." },
    { id: "sales@stormveins.com", label: "sales@stormveins.com", name: "Enterprise Practice" },
    { id: "solutions@stormveins.com", label: "solutions@stormveins.com", name: "Systems Architecture" },
    { id: "srushti@stormveins.com", label: "srushti@stormveins.com", name: "Executive Outreach" },
    { id: "contact@stormveins.com", label: "contact@stormveins.com", name: "Media House HQ" },
  ], []);

  // Filtered messages
  const filteredMessages = useMemo(() => {
    return messagesList.filter((msg) => {
      // Mailbox filter
      if (selectedMailbox !== "all" && msg.recipientMailbox.toLowerCase() !== selectedMailbox.toLowerCase()) {
        return false;
      }
      // Intent filter
      if (selectedIntent !== "all" && msg.intent !== selectedIntent) {
        return false;
      }
      // Scope filter
      if (selectedScope === "overseas" && !msg.isOverseas) {
        return false;
      }
      if (selectedScope === "domestic" && msg.isOverseas) {
        return false;
      }
      // Status filter
      if (selectedStatus === "unread" && msg.status !== "unread") {
        return false;
      }
      if (selectedStatus === "action" && msg.status !== "action_scheduled") {
        return false;
      }
      if (selectedStatus === "replied" && msg.status !== "replied") {
        return false;
      }

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matches =
          msg.senderName.toLowerCase().includes(q) ||
          msg.senderCompany.toLowerCase().includes(q) ||
          msg.senderEmail.toLowerCase().includes(q) ||
          msg.subject.toLowerCase().includes(q) ||
          msg.snippet.toLowerCase().includes(q) ||
          msg.body.toLowerCase().includes(q);
        if (!matches) return false;
      }

      return true;
    });
  }, [messagesList, selectedMailbox, selectedIntent, selectedScope, selectedStatus, searchQuery]);

  // Currently inspected message
  const activeMessage = useMemo(() => {
    return (
      filteredMessages.find((m) => m.id === activeMessageId) ||
      filteredMessages[0] ||
      null
    );
  }, [filteredMessages, activeMessageId]);

  // Mark as read/unread toggle
  const toggleMessageStatus = (id: string) => {
    setMessagesList((prev) =>
      prev.map((m) => {
        if (m.id === id) {
          const newStatus = m.status === "unread" ? "replied" : "unread";
          return { ...m, status: newStatus };
        }
        return m;
      })
    );
  };

  // Copy reply handler
  const handleCopyDraft = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedDraftId(id);
    setTimeout(() => setCopiedDraftId(null), 2500);
  };

  // Metrics
  const totalCount = messagesList.length;
  const unreadCount = messagesList.filter((m) => m.status === "unread").length;
  const meetingCount = messagesList.filter((m) => m.intent === "meeting_requested").length;
  const overseasCount = messagesList.filter((m) => m.isOverseas).length;

  return (
    <div className={`inbound-hub-container theme-${theme}`}>
      {/* TOP EXECUTIVE TELEMETRY STRIP */}
      <div className="inbound-hero-card">
        <div className="inbound-hero-left">
          <div className="inbound-live-badge">
            <span className="live-pulse-dot" />
            <span>UNIFIED INBOUND FEED &bull; 5-MAILBOX ROTATING HOSTINGER CLUSTER</span>
          </div>
          <h2 className="inbound-hero-title">
            Inbound Communications &amp; <span className="text-gradient">Executive Inquiries</span>
          </h2>
          <p className="inbound-hero-subtitle">
            Centralized stream of verified decision-maker replies, scheduled discovery briefings, and statutory RFP requests arriving across all 5 sender accounts.
          </p>
        </div>

        <div className="inbound-metrics-grid">
          <div className="inbound-stat-box">
            <span className="isb-label">TOTAL INBOUND</span>
            <strong className="isb-val text-gradient">{totalCount}</strong>
            <span className="isb-sub">100% Attributed</span>
          </div>
          <div className="inbound-stat-box highlight">
            <span className="isb-label">MEETING REQUESTS</span>
            <strong className="isb-val text-emerald">{meetingCount}</strong>
            <span className="isb-sub">🔥 High Intent</span>
          </div>
          <div className="inbound-stat-box">
            <span className="isb-label">UNREAD / ACTION</span>
            <strong className="isb-val text-amber">{unreadCount}</strong>
            <span className="isb-sub">Awaiting Handshake</span>
          </div>
          <div className="inbound-stat-box">
            <span className="isb-label">OVERSEAS SHARE</span>
            <strong className="isb-val text-cyan">{overseasCount}</strong>
            <span className="isb-sub">UAE, US, UK, SG</span>
          </div>
        </div>
      </div>

      {/* FILTER & CONTROL BAR (TOGETHER & FILTER-WISE VIEW) */}
      <div className="inbound-filter-bar">
        {/* Search */}
        <div className="inbound-search-wrap">
          <Search size={14} className="inbound-search-icon" />
          <input
            type="text"
            className="inbound-search-input"
            placeholder="Search sender, company, email, or message keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              className="inbound-search-clear"
              onClick={() => setSearchQuery("")}
            >
              Clear
            </button>
          )}
        </div>

        {/* Mailbox Selector (All Together vs Individual Mailbox) */}
        <div className="inbound-filter-group">
          <span className="filter-group-lbl">MAILBOX:</span>
          <select
            className="inbound-select"
            value={selectedMailbox}
            onChange={(e) => setSelectedMailbox(e.target.value)}
          >
            {mailboxes.map((mb) => {
              const count = mb.id === "all"
                ? messagesList.length
                : messagesList.filter((m) => m.recipientMailbox.toLowerCase() === mb.id.toLowerCase()).length;
              return (
                <option key={mb.id} value={mb.id}>
                  {mb.id === "all" ? `📬 ${mb.label} (${count})` : `✉️ ${mb.id.split("@")[0]}@ (${count})`}
                </option>
              );
            })}
          </select>
        </div>

        {/* Intent Selector */}
        <div className="inbound-filter-group">
          <span className="filter-group-lbl">INTENT:</span>
          <select
            className="inbound-select"
            value={selectedIntent}
            onChange={(e) => setSelectedIntent(e.target.value)}
          >
            <option value="all">All Response Intents</option>
            <option value="meeting_requested">🔥 Meeting Requested</option>
            <option value="architecture_review">📐 Tech Spec &amp; Teardown</option>
            <option value="pricing_inquiry">💰 Pricing &amp; Retainer Spec</option>
            <option value="rfp_spec">📋 RFP Spec Issued</option>
          </select>
        </div>

        {/* Scope Selector */}
        <div className="inbound-filter-group">
          <span className="filter-group-lbl">SCOPE:</span>
          <select
            className="inbound-select"
            value={selectedScope}
            onChange={(e) => setSelectedScope(e.target.value)}
          >
            <option value="all">All Geographies</option>
            <option value="overseas">🌐 Overseas Inbound (UAE, UK, US, SG)</option>
            <option value="domestic">📍 Domestic / Regional</option>
          </select>
        </div>

        {/* Status Selector */}
        <div className="inbound-filter-group">
          <span className="filter-group-lbl">STATUS:</span>
          <select
            className="inbound-select"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="unread">Unread Only ({unreadCount})</option>
            <option value="action">Action Scheduled</option>
            <option value="replied">Replied</option>
          </select>
        </div>
      </div>

      {/* DUAL-PANE INBOX / MESSAGES INTERFACE */}
      <div className="inbound-workspace-grid">
        {/* LEFT PANE: THREAD LIST */}
        <div className="inbound-threads-col">
          <div className="threads-col-header">
            <div className="threads-count-info">
              <Inbox size={14} className="text-emerald" />
              <strong>
                {selectedMailbox === "all" ? "Unified Inbound" : selectedMailbox.split("@")[0] + "@"}
              </strong>
              <span className="threads-badge">{filteredMessages.length} Messages</span>
            </div>
            {selectedMailbox !== "all" && (
              <button
                type="button"
                className="btn-view-all-together"
                onClick={() => setSelectedMailbox("all")}
              >
                View All Together
              </button>
            )}
          </div>

          <div className="threads-scroll-container">
            {filteredMessages.length === 0 ? (
              <div className="inbound-empty-state">
                <Mail size={32} className="text-muted mb-2" />
                <h4>No Inbound Messages Match</h4>
                <p>Adjust your mailbox or intent filter to view communications.</p>
                <button
                  type="button"
                  className="btn-reset-filters-mini"
                  onClick={() => {
                    setSelectedMailbox("all");
                    setSelectedIntent("all");
                    setSelectedScope("all");
                    setSelectedStatus("all");
                    setSearchQuery("");
                  }}
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              filteredMessages.map((msg) => {
                const isSelected = activeMessage?.id === msg.id;
                const isUnread = msg.status === "unread";

                return (
                  <div
                    key={msg.id}
                    className={`inbound-thread-card ${isSelected ? "is-selected" : ""} ${isUnread ? "is-unread" : ""}`}
                    onClick={() => setActiveMessageId(msg.id)}
                  >
                    <div className="thread-card-top">
                      <div className="thread-sender-name">
                        {isUnread && <span className="unread-pulse-dot" />}
                        <span className="flag-icon">{msg.countryFlag}</span>
                        <strong className="sender-company">{msg.senderCompany}</strong>
                      </div>
                      <span className="thread-time">{msg.relativeTime}</span>
                    </div>

                    <div className="thread-person-row">
                      <span className="person-name">{msg.senderName}</span>
                      <span className="person-title">&bull; {msg.senderTitle}</span>
                    </div>

                    <div className="thread-subject-row">
                      <span className="thread-subject">{msg.subject}</span>
                    </div>

                    <p className="thread-snippet">{msg.snippet}</p>

                    <div className="thread-footer-tags">
                      <span className="mailbox-pill">
                        to: <strong>{msg.recipientMailbox.split("@")[0]}@</strong>
                      </span>
                      {msg.intent === "meeting_requested" ? (
                        <span className="intent-tag tag-meeting">
                          <Flame size={10} />
                          <span>Meeting</span>
                        </span>
                      ) : msg.intent === "architecture_review" ? (
                        <span className="intent-tag tag-arch">Tech Spec</span>
                      ) : msg.intent === "rfp_spec" ? (
                        <span className="intent-tag tag-rfp">RFP</span>
                      ) : (
                        <span className="intent-tag tag-pricing">Retainer</span>
                      )}
                      {msg.isOverseas && (
                        <span className="geo-tag-mini">Global</span>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* RIGHT PANE: ACTIVE MESSAGE INSPECTION & ACTION WORKSPACE */}
        <div className="inbound-detail-col">
          {activeMessage ? (
            <div className="inbound-message-viewer">
              {/* Viewer Header */}
              <div className="viewer-header-card">
                <div className="viewer-header-top">
                  <div className="viewer-avatar-group">
                    <div className="viewer-avatar-circle">
                      <span>
                        {activeMessage.senderName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .substring(0, 2)
                          .toUpperCase()}
                      </span>
                    </div>
                    <div className="viewer-sender-meta">
                      <div className="sender-title-line">
                        <strong className="sender-headline">{activeMessage.senderName}</strong>
                        <span className="sender-country-tag">
                          {activeMessage.countryFlag} {activeMessage.senderCountry}
                        </span>
                      </div>
                      <div className="sender-org-line">
                        <span>{activeMessage.senderTitle}</span>
                        <span className="divider">&bull;</span>
                        <strong className="company-bold">{activeMessage.senderCompany}</strong>
                      </div>
                      <div className="sender-email-line">
                        <span>From: <code>{activeMessage.senderEmail}</code></span>
                        <span className="divider">&bull;</span>
                        <span>
                          To: <strong className="text-emerald">{activeMessage.recipientMailbox}</strong> ({activeMessage.mailboxOwnerName})
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="viewer-status-badges">
                    <div className="security-verified-tag">
                      <ShieldCheck size={12} className="text-emerald" />
                      <span>SPF &amp; DKIM: PASS (TLS 1.3)</span>
                    </div>
                    <span className={`status-pill ${activeMessage.status === "unread" ? "pill-unread" : "pill-replied"}`}>
                      {activeMessage.status === "unread" ? "ACTION REQUIRED" : "REPLIED / SCHEDULED"}
                    </span>
                  </div>
                </div>

                {/* Subject & Timing Strip */}
                <div className="viewer-subject-strip">
                  <h3 className="email-subject-heading">{activeMessage.subject}</h3>
                  <div className="email-timestamp-row">
                    <Clock size={12} />
                    <span>Received: {activeMessage.receivedTimestamp} IST ({activeMessage.relativeTime})</span>
                  </div>
                </div>

                {/* Quick Action Toolbar */}
                <div className="viewer-action-toolbar">
                  <a
                    href={`mailto:${activeMessage.senderEmail}?subject=${encodeURIComponent(
                      activeMessage.suggestedReplyDraft?.subject || `Re: ${activeMessage.subject}`
                    )}&body=${encodeURIComponent(
                      activeMessage.suggestedReplyDraft?.body || `Dear ${activeMessage.senderName},\n\nThank you for reaching out.\n\nBest regards,\n${activeMessage.mailboxOwnerName}\nStorm Veins Media House`
                    )}`}
                    className="action-btn-primary"
                  >
                    <Send size={13} />
                    <span>Reply via Hostinger Client</span>
                    <ArrowUpRight size={12} />
                  </a>

                  {activeMessage.suggestedReplyDraft && (
                    <button
                      type="button"
                      className="action-btn-secondary"
                      onClick={() =>
                        handleCopyDraft(activeMessage.suggestedReplyDraft!.body, activeMessage.id)
                      }
                    >
                      {copiedDraftId === activeMessage.id ? (
                        <>
                          <Check size={13} className="text-emerald" />
                          <span className="text-emerald">Draft Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy size={13} />
                          <span>Copy Response Blueprint</span>
                        </>
                      )}
                    </button>
                  )}

                  <button
                    type="button"
                    className="action-btn-outline"
                    onClick={() => toggleMessageStatus(activeMessage.id)}
                  >
                    <CheckCircle2 size={13} />
                    <span>
                      {activeMessage.status === "unread" ? "Mark as Handled" : "Mark as Unread"}
                    </span>
                  </button>

                  {activeMessage.leadId && onSelectLeadInCrm && (
                    <button
                      type="button"
                      className="action-btn-outline"
                      onClick={() => onSelectLeadInCrm(activeMessage.leadId!)}
                      title="Inspect this company in CRM Dossier"
                    >
                      <Building2 size={13} />
                      <span>View in CRM</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Message Body Content Card */}
              <div className="viewer-body-card">
                <div className="viewer-body-badge">
                  <Mail size={12} />
                  <span>INCOMING MESSAGE BODY (HOSTINGER IMAP)</span>
                </div>

                <div className="viewer-email-body-text">
                  {activeMessage.body.split("\n\n").map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
              </div>

              {/* Original Outbound Context Thread */}
              {activeMessage.originalOutboundSnippet && (
                <div className="viewer-context-card">
                  <div className="context-card-header">
                    <FileText size={12} className="text-indigo" />
                    <span>ORIGINAL OUTBOUND PITCH &bull; OUR EMAIL THEY REPLIED TO</span>
                  </div>
                  <blockquote className="context-quote">
                    "{activeMessage.originalOutboundSnippet}"
                  </blockquote>
                </div>
              )}

              {/* Quick AI-Synthesized Response Blueprint */}
              {activeMessage.suggestedReplyDraft && (
                <div className="viewer-reply-card">
                  <div className="reply-card-header">
                    <div className="reply-header-left">
                      <Sparkles size={14} className="text-emerald" />
                      <strong>Quick Response Blueprint</strong>
                      <span className="reply-ready-pill">Ready to Dispatch</span>
                    </div>
                    <button
                      type="button"
                      className="btn-copy-draft-mini"
                      onClick={() =>
                        handleCopyDraft(activeMessage.suggestedReplyDraft!.body, activeMessage.id)
                      }
                    >
                      {copiedDraftId === activeMessage.id ? (
                        <>
                          <Check size={12} />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy size={12} />
                          <span>Copy Reply</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="reply-subject-preview">
                    <span className="r-lbl">Subject:</span>
                    <code>{activeMessage.suggestedReplyDraft.subject}</code>
                  </div>

                  <div className="reply-body-preview">
                    {activeMessage.suggestedReplyDraft.body.split("\n\n").map((para: string, idx: number) => (
                      <p key={idx}>{para}</p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="inbound-no-selection">
              <Inbox size={48} className="text-muted mb-3" />
              <h3>Select a Message from the Feed</h3>
              <p>Choose an incoming inquiry on the left to inspect email contents, verify security headers, and dispatch tailored responses.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
