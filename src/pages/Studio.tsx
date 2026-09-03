import { FormEvent, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Bot,
  Building2,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock,
  Compass,
  Copy,
  FileText,
  KeyRound,
  Layers,
  LockKeyhole,
  Mail,
  PenLine,
  Plus,
  Printer,
  ReceiptText,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  Target,
  Trash2,
  TrendingUp,
  UserCheck,
  Users,
  Wand2,
} from "lucide-react";
import { Eyebrow, Logo } from "../components/Site";

type StudioMode = "pipeline" | "outreach" | "invoice" | "letter" | "document";
type InvoiceItem = { id: number; description: string; qty: number; price: number };

export interface CrmDeal {
  id: string;
  company: string;
  contactName: string;
  contactTitle: string;
  email: string;
  domain: string;
  stage: "lead" | "teardown" | "briefing" | "proposal" | "won";
  value: number;
  dealType: string;
  pain: string;
  nextAction: string;
  updatedAt: string;
}

const today = "2026-09-02";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="studio-field-luxury">
      <span className="studio-field-label">{label}</span>
      {children}
    </label>
  );
}

function displayDate(date: string) {
  return date
    ? new Date(`${date}T12:00:00`).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "Not set";
}

function StudioGate({ onUnlock }: { onUnlock: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const expected = import.meta.env.VITE_STUDIO_PASSWORD || "storm-ops";
    if (password === expected) {
      sessionStorage.setItem("sv-studio-unlocked", "true");
      onUnlock();
    } else {
      setError(true);
    }
  };

  return (
    <div className="studio-gate-luxury">
      <div className="gate-card-luxury">
        <div className="gate-brand-row">
          <Logo />
          <span className="gate-badge">SECURE SUITE</span>
        </div>

        <div className="gate-icon-luxury">
          <KeyRound size={22} />
        </div>

        <Eyebrow badge>Private Operational Gateway</Eyebrow>
        <h1>
          Storm Veins <span className="text-gradient">Operations &amp; CRM</span>
        </h1>
        <p className="gate-instructions">
          Enter executive credentials to access pipeline telemetry, commercial outreach sequences, client agreements, and financial ledger.
        </p>

        <form onSubmit={submit} className="gate-form-luxury">
          <label className="sr-only" htmlFor="studio-password">
            Executive Passcode
          </label>
          <div className="gate-input-wrap">
            <input
              id="studio-password"
              type="password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                setError(false);
              }}
              placeholder="Enter passcode (default: storm-ops)"
              autoComplete="current-password"
              autoFocus
              aria-invalid={error}
              aria-describedby={error ? "gate-error" : undefined}
            />
            <button className="btn-luxury btn-emerald gate-submit-btn" type="submit">
              <span>Enter</span>
              <ArrowRight size={14} />
            </button>
          </div>

          {error && (
            <span className="gate-error-message" id="gate-error" role="alert">
              Invalid credentials. Passcode did not match internal registry.
            </span>
          )}
        </form>

        <div className="gate-footer-hint">
          <ShieldCheck size={13} className="text-emerald" />
          <span>Internal operator access only · Non-disclosure protected.</span>
        </div>
      </div>
    </div>
  );
}

export default function Studio() {
  const [unlocked, setUnlocked] = useState(
    () => sessionStorage.getItem("sv-studio-unlocked") === "true"
  );

  return unlocked ? (
    <StudioWorkspace
      onLock={() => {
        sessionStorage.removeItem("sv-studio-unlocked");
        setUnlocked(false);
      }}
    />
  ) : (
    <StudioGate onUnlock={() => setUnlocked(true)} />
  );
}

const defaultDeals: CrmDeal[] = [
  {
    id: "deal-1",
    company: "Lumina Sovereign Wealth",
    contactName: "Sophia Al-Mansoor",
    contactTitle: "Chief Executive Officer",
    email: "sophia@luminawealth.com",
    domain: "Fintech & Wealth",
    stage: "proposal",
    value: 2450000,
    dealType: "Dedicated Pod",
    pain: "Fragmented multi-region onboarding flow & lack of high-net-worth portal",
    nextAction: "Executive Boardroom final contract presentation on Thursday",
    updatedAt: "Today",
  },
  {
    id: "deal-2",
    company: "FlameGuard Fire & Safety",
    contactName: "Rajesh Kulkarni",
    contactTitle: "Chief Operating Officer",
    email: "r.kulkarni@flameguardsafety.in",
    domain: "Industrial Safety",
    stage: "briefing",
    value: 2800000,
    dealType: "Custom Field CRM",
    pain: "Manual paper inspection logs, delayed compliance certs & slow dispatch",
    nextAction: "Demo sub-second offline mobile inspection architecture on Friday",
    updatedAt: "Today",
  },
  {
    id: "deal-3",
    company: "Verve Prime Living",
    contactName: "Julian Thorne",
    contactTitle: "Managing Director",
    email: "j.thorne@verveglobal.com",
    domain: "Real Estate",
    stage: "won",
    value: 3500000,
    dealType: "Commercial Engine",
    pain: "Low international investor visibility & clunky paper-based due diligence",
    nextAction: "Engineering pod sprint kickoff on 15 September",
    updatedAt: "Yesterday",
  },
  {
    id: "deal-4",
    company: "Meridian Clinical Labs",
    contactName: "Devin Chen",
    contactTitle: "Managing Partner",
    email: "d.chen@meridianlabs.com",
    domain: "Healthcare",
    stage: "briefing",
    value: 1850000,
    dealType: "Enterprise CRM",
    pain: "Inconsistent patient records across 14 acquired regional clinics",
    nextAction: "Present 3-point HIPAA data migration architecture blueprint",
    updatedAt: "2 days ago",
  },
  {
    id: "deal-5",
    company: "Cypher Autonomous Defense",
    contactName: "Dr. Aris Thorne",
    contactTitle: "CISO",
    email: "aris@cypherai.io",
    domain: "Enterprise SaaS",
    stage: "teardown",
    value: 2200000,
    dealType: "Growth Architecture",
    pain: "High customer acquisition cost & lack of differentiated positioning",
    nextAction: "Follow up on 2-minute Loom architecture teardown",
    updatedAt: "3 days ago",
  },
];

const industryPresets = [
  {
    id: "fire-safety",
    label: "Fire & Industrial Safety",
    company: "FlameGuard Fire & Safety",
    recipient: "Rajesh Kulkarni",
    title: "Chief Operating Officer",
    email: "r.kulkarni@flameguardsafety.in",
    domain: "Industrial Safety",
    offering: "Custom Field Operations CRM & Compliance Portal",
    pain: "Manual paper-based field inspection logs, delayed compliance certification, and fragmented technician dispatch",
    personaReason: "COOs and Heads of Field Operations bear direct financial responsibility for compliance SLA penalties, technician dispatch efficiency, and field downtime.",
    proofClient: "Meridian Safety Systems",
    proofMetric: "Consolidated 14 regional field inspection networks with 60% faster cert turnaround and zero compliance penalties",
    proofDetail: "Automated mobile inspection CRM with offline sync and 1-click regulatory certificate delivery",
  },
  {
    id: "logistics",
    label: "Fleet & Logistics ERP",
    company: "TransGlobal Freight Logistics",
    recipient: "Vikram Singhania",
    title: "VP of Operations",
    email: "vikram@transglobalfleet.com",
    domain: "Logistics & Fleet",
    offering: "Custom Warehouse & Fleet Telemetry CRM",
    pain: "Delayed consignment tracking telemetry, manual driver manifests, and slow client invoicing",
    personaReason: "VPs of Operations evaluate route efficiency, real-time tracking accuracy, vehicle utilization, and operating margins.",
    proofClient: "Fjord Dynamics Fleet",
    proofMetric: "Real-time asset telemetry across 11 nations with zero downtime and +34% dispatch throughput",
    proofDetail: "Event-driven logistics dashboard with automated billing hooks",
  },
  {
    id: "fintech",
    label: "Fintech & Wealth Management",
    company: "Lumina Sovereign Wealth",
    recipient: "Sophia Al-Mansoor",
    title: "Chief Executive Officer",
    email: "sophia@luminawealth.com",
    domain: "Fintech & Wealth",
    offering: "Institutional Wealth Portal & Onboarding Engine",
    pain: "Fragmented multi-region onboarding flow and lack of high-net-worth mobile client portal",
    personaReason: "CEOs and Managing Partners in wealth management prioritize VIP client onboarding speed, investor trust, and capital deployment velocity.",
    proofClient: "Lumina Wealth Partners",
    proofMetric: "+42% AUM completed onboarding flows within 60 days with zero platform downtime",
    proofDetail: "Sovereign client portal with micro-frontend architecture and biometric compliance",
  },
  {
    id: "healthcare",
    label: "Clinical Healthcare Network",
    company: "CareCore Diagnostics",
    recipient: "Dr. Ananya Roy",
    title: "Director of Clinical Operations",
    email: "ananya.roy@carecoreclinics.com",
    domain: "Healthcare",
    offering: "Unified Patient Intake & Practice CRM",
    pain: "Disparate patient EHR records across 8 acquired clinics and 45-minute reception wait times",
    personaReason: "Clinical Operations Directors are evaluated on patient retention, wait-time SLAs, staff productivity, and regulatory compliance.",
    proofClient: "Meridian Labs",
    proofMetric: "60% reduction in patient wait times and clinical intake friction across 14 clinics",
    proofDetail: "Cloud-native HIPAA/NABH compliant EHR intake platform",
  },
  {
    id: "real-estate",
    label: "Prime Real Estate & PropTech",
    company: "Verve Prime Living",
    recipient: "Julian Thorne",
    title: "Managing Director",
    email: "j.thorne@verveglobal.com",
    domain: "Real Estate",
    offering: "Virtual Due Diligence Vault & Investor Flagship",
    pain: "Slow international buyer due diligence and lack of interactive 3D property visualization",
    personaReason: "Managing Directors and Commercial Principals are incentivized by asset transaction velocity and cross-border buyer conversion.",
    proofClient: "Verve Global Living",
    proofMetric: "$120M+ in cross-border property transactions processed in year one with sub-second virtual vaults",
    proofDetail: "Interactive 3D masterplan viewer with encrypted investor due diligence rooms",
  },
];

function StudioWorkspace({ onLock }: { onLock: () => void }) {
  const [mode, setMode] = useState<StudioMode>("pipeline");
  const [deals, setDeals] = useState<CrmDeal[]>(defaultDeals);
  const [dealFilter, setDealFilter] = useState<string>("all");
  const [domainFilter, setDomainFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showNewDealModal, setShowNewDealModal] = useState(false);

  // Invoicing & Scope states
  const [invoiceNumber, setInvoiceNumber] = useState("SV-INV-2026-084");
  const [invoiceDate, setInvoiceDate] = useState(today);
  const [client, setClient] = useState("FlameGuard Fire & Safety Ltd");
  const [items, setItems] = useState<InvoiceItem[]>([
    { id: 1, description: "Phase 01: Offline Mobile Inspection Architecture & Token System", qty: 1, price: 750000 },
    { id: 2, description: "Phase 02: Full-Stack Dispatch & Compliance CRM Engine Deployment", qty: 1, price: 950000 },
    { id: 3, description: "Monthly Dedicated Pod Architecture Retainer (Sprint 01)", qty: 1, price: 350000 },
  ]);
  const [advance, setAdvance] = useState(600000);
  const [letter, setLetter] = useState({
    recipient: "Board of Directors, FlameGuard Safety Ltd",
    subject: "Executive Scope & Field CRM Architecture Delivery Agreement",
    body: `This executive confirmation formalizes the commercial scope and technical architecture for the new Field Operations & Safety Compliance CRM developed by Storm Veins Studio LLP.\n\nOur multidisciplinary pod will deploy discovery on 15 September 2026, delivering the sub-second offline field inspection app, central regulatory compliance engine, and live telemetry dashboard across pan-India operations.`,
  });
  const [documentTitle, setDocumentTitle] = useState("Field CRM Architecture Blueprint · Q3/Q4");
  const [documentBody, setDocumentBody] = useState(
    `1. EXECUTIVE SUMMARY\nStorm Veins has been retained to construct an enterprise Field Operations CRM and automated compliance audit platform.\n\n2. KEY ARCHITECTURAL MILESTONES\n- Milestone A: Offline-first inspector app with automated compliance checklists.\n- Milestone B: Central dispatch dashboard with automated SLA routing and 1-click certificate generator.\n- Milestone C: Cloud data warehouse with audit trails and automated executive reporting.`
  );

  // AI Commercial Outreach Agent states
  const [prospect, setProspect] = useState({
    company: "FlameGuard Fire & Safety",
    recipient: "Rajesh Kulkarni",
    title: "Chief Operating Officer",
    email: "r.kulkarni@flameguardsafety.in",
    domain: "Industrial Safety",
    offering: "Custom Field Operations CRM & Compliance Portal",
    pain: "Manual paper inspection logs, delayed compliance certs & slow dispatch",
    personaReason: "COOs and Heads of Field Operations bear direct financial responsibility for compliance SLA penalties, technician dispatch efficiency, and field downtime.",
    step: "touch1" as "touch1" | "touch2" | "touch3" | "touch4" | "touch5" | "linkedin" | "whatsapp",
  });
  const [aiCustomPrompt, setAiCustomPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [subjectCopied, setSubjectCopied] = useState(false);

  const applyPreset = (presetId: string) => {
    const p = industryPresets.find((item) => item.id === presetId);
    if (!p) return;
    setIsGenerating(true);
    setTimeout(() => {
      setProspect({
        company: p.company,
        recipient: p.recipient,
        title: p.title,
        email: p.email,
        domain: p.domain,
        offering: p.offering,
        pain: p.pain,
        personaReason: p.personaReason,
        step: "touch1",
      });
      setIsGenerating(false);
    }, 150);
  };

  const handleAiAutoDraft = (e?: FormEvent) => {
    if (e) e.preventDefault();
    setIsGenerating(true);
    setTimeout(() => {
      const lower = (aiCustomPrompt || prospect.company || "").toLowerCase();
      if (lower.includes("fire") || lower.includes("safety") || lower.includes("inspection")) {
        applyPreset("fire-safety");
      } else if (lower.includes("logistics") || lower.includes("fleet") || lower.includes("transport")) {
        applyPreset("logistics");
      } else if (lower.includes("clinic") || lower.includes("health") || lower.includes("hospital")) {
        applyPreset("healthcare");
      } else if (lower.includes("estate") || lower.includes("property") || lower.includes("living")) {
        applyPreset("real-estate");
      } else {
        setProspect((prev) => ({
          ...prev,
          title: "Chief Operating Officer / VP Operations",
          recipient: prev.recipient || "Executive Decision Maker",
          pain: aiCustomPrompt
            ? `Operational latency & lack of integrated mobile telemetry around ${aiCustomPrompt}`
            : prev.pain,
          personaReason: `For enterprise ${prev.domain} workflows, Operations VPs control the deployment budget and technician productivity.`,
        }));
      }
      setIsGenerating(false);
    }, 200);
  };

  // Pipeline calculations
  const totalPipelineValue = deals.reduce((sum, d) => sum + d.value, 0);
  const wonDealsValue = deals.filter((d) => d.stage === "won").reduce((sum, d) => sum + d.value, 0);
  const inFlightDeals = deals.filter((d) => d.stage !== "won");
  const avgDealValue = deals.length > 0 ? Math.round(totalPipelineValue / deals.length) : 0;

  const subtotal = items.reduce(
    (total, item) => total + Math.max(0, item.qty) * Math.max(0, item.price),
    0
  );
  const safeAdvance = Math.min(Math.max(0, advance), subtotal);
  const total = subtotal - safeAdvance;

  const updateItem = (id: number, field: keyof InvoiceItem, value: string) =>
    setItems(
      items.map((item) =>
        item.id === id
          ? {
              ...item,
              [field]: field === "description" ? value : Math.max(0, Number(value)),
            }
          : item
      )
    );

  const loadProspectToOutreach = (deal: CrmDeal) => {
    setProspect({
      company: deal.company,
      recipient: deal.contactName,
      title: deal.contactTitle,
      email: deal.email,
      domain: deal.domain,
      offering: deal.dealType,
      pain: deal.pain,
      personaReason: `Decision maker (${deal.contactTitle}) holds operational budget authority for ${deal.domain} systems.`,
      step: "touch1",
    });
    setMode("outreach");
  };

  const advanceDealStage = (dealId: string) => {
    const stages: CrmDeal["stage"][] = ["lead", "teardown", "briefing", "proposal", "won"];
    setDeals(
      deals.map((d) => {
        if (d.id !== dealId) return d;
        const currentIdx = stages.indexOf(d.stage);
        const nextStage = stages[Math.min(stages.length - 1, currentIdx + 1)];
        return { ...d, stage: nextStage, updatedAt: "Just now" };
      })
    );
  };

  const getDomainProof = () => {
    const d = prospect.domain.toLowerCase();
    if (d.includes("safety") || d.includes("fire") || d.includes("industrial")) {
      return {
        client: "Meridian Safety Systems",
        metric: "60% faster inspection turnaround & zero compliance penalties",
        detail: "Automated mobile inspection CRM with sub-second offline sync",
      };
    }
    if (d.includes("logistics") || d.includes("fleet") || d.includes("supply")) {
      return {
        client: "Fjord Dynamics Fleet",
        metric: "+34% dispatch throughput with zero platform downtime",
        detail: "Unified logistics dispatch dashboard with automated billing hooks",
      };
    }
    if (d.includes("fintech") || d.includes("wealth")) {
      return {
        client: "Lumina Wealth",
        metric: "+42% AUM onboarding completion within 60 days",
        detail: "European sovereign wealth portal managing $12B+ in assets",
      };
    }
    if (d.includes("health") || d.includes("bio")) {
      return {
        client: "Meridian Labs",
        metric: "60% reduction in patient wait times across 14 clinics",
        detail: "Unified cloud intake CRM replacing legacy paper intake",
      };
    }
    return {
      client: "Verve Global Living",
      metric: "$120M+ in cross-border property transactions in year one",
      detail: "Sub-second virtual due diligence document vault",
    };
  };

  const domainProof = getDomainProof();

  const getEmailContent = () => {
    switch (prospect.step) {
      case "touch1":
        return {
          channel: "Touch 01",
          timing: "Day 1 Hook",
          subject: `Quick observation on ${prospect.company}'s operations`,
          body: `Hi ${prospect.recipient},

I was reviewing ${prospect.company}'s operations and noticed a specific bottleneck that might be quietly capping your team's throughput: ${prospect.pain}.

We recently resolved an identical dilemma for ${domainProof.client} (${domainProof.detail}). By deploying our dedicated senior engineering pod, they achieved ${domainProof.metric}.

We prepared a concise 3-point architectural observation detailing how ${prospect.company} can eliminate this friction and deploy a high-velocity ${prospect.offering.toLowerCase()}.

Would you be open to a brief 10-minute briefing next Tuesday at 3:00 PM IST (or 10:30 AM GMT) to walk through the findings?

Respectfully,
Marcus Vance
Managing Partner · Storm Veins Media House
Mumbai & Thane · stormveins.com`,
        };
      case "touch2":
        return {
          channel: "Touch 02",
          timing: "Day 4 Teardown",
          subject: `Re: Quick observation on ${prospect.company}'s operations`,
          body: `Hi ${prospect.recipient},

Following up on my note from Tuesday.

I recorded a quick 2-minute Loom walkthrough showing the exact architectural bottleneck on ${prospect.company}'s current setup, and how our senior engineering pod would deploy a streamlined ${prospect.offering.toLowerCase()}:
https://stormveins.com/portfolio

Unlike traditional software houses with junior handoffs, our founding principals sit directly in your weekly sprints until target commercial metrics are achieved.

If you'd like the technical teardown dossier, let me know and I'll send it directly to your team.

Best regards,
Marcus Vance
Storm Veins Media House · Mumbai & Thane`,
        };
      case "touch3":
        return {
          channel: "Touch 03",
          timing: "Day 8 Proof",
          subject: `Audited operational benchmarks for ${prospect.company}`,
          body: `Hi ${prospect.recipient},

Across 11 sovereign markets and $140M+ in client value accreted, enterprise leaders partner with Storm Veins because of one standard: measurable commercial velocity.

Key verified milestones from recent deployments:
• ${domainProof.client}: ${domainProof.metric}
• Meridian Clinical Labs: Consolidated 14 regional clinics with 60% faster intake
• Fjord Dynamics: Deployed fleet telemetry across 11 nations with zero downtime

Whether you are evaluating a complete platform overhaul or a dedicated ${prospect.offering.toLowerCase()} this quarter, we can provide an accredited benchmark audit to your executive team.

Do you have 10 minutes next Thursday to review the numbers?

Best,
Marcus Vance
Managing Partner · Storm Veins Media House`,
        };
      case "touch4":
        return {
          channel: "Touch 04",
          timing: "Day 11 Roadmap",
          subject: `Execution roadmap for ${prospect.company} (12-Week Sprint)`,
          body: `Hi ${prospect.recipient},

Based on our preliminary operational audit of ${prospect.company}, here is how our dedicated pod would structure an outcome-guaranteed ${prospect.offering.toLowerCase()}:

• Phase 01 (Weeks 1–3): System Architecture & Workflow Mapping (eliminating ${prospect.pain.split(",")[0]})
• Phase 02 (Weeks 4–8): Production React & Cloud deployment with sub-second sync and automated compliance
• Phase 03 (Weeks 9–12): Executive analytics warehouse, integration testing & team rollout

We back this with a 100% on-time milestone guarantee.

Would you be open to an executive briefing with our Principal Systems Architect this Friday?

Best regards,
Marcus Vance
Storm Veins Media House`,
        };
      case "touch5":
        return {
          channel: "Touch 05",
          timing: "Day 14 Breakup",
          subject: `Closing the file on ${prospect.company}?`,
          body: `Hi ${prospect.recipient},

I haven't heard back, so I assume addressing ${prospect.pain.split(",")[0]} isn't an active priority for ${prospect.company} this quarter. Completely understand.

I will close your file on our end so I don't crowd your inbox. If you ever decide to rebuild your internal systems or need a dedicated senior engineering pod, you can explore our portfolio anytime:
https://stormveins.com/portfolio

Wishing you and the operations team continued momentum.

Best regards,
Marcus Vance
Managing Partner · Storm Veins Media House
Mumbai HQ · +91 96998 31323`,
        };
      case "linkedin":
        return {
          channel: "LinkedIn DM",
          timing: "Direct Outreach",
          subject: `Brief note on ${prospect.company}'s operations`,
          body: `Hi ${prospect.recipient} — Impressed by ${prospect.company}'s industry footprint. Noticed a key bottleneck in your current workflow (${prospect.pain.split(",")[0]}) that might be costing your field team billable hours. We recently helped ${domainProof.client} achieve ${domainProof.metric}. Put together a 2-minute architectural teardown for your operations team — open to a quick look?`,
        };
      case "whatsapp":
        return {
          channel: "WhatsApp / SMS",
          timing: "Direct Briefing",
          subject: `Executive Alert for ${prospect.recipient}`,
          body: `Hi ${prospect.recipient}, Marcus Vance here from Storm Veins Media House. We recently completed an operational architecture audit of ${prospect.company} highlighting a key efficiency bottleneck (${prospect.pain.split(",")[0]}). We helped ${domainProof.client} achieve ${domainProof.metric}. Sent a detailed 3-point dossier to your email (${prospect.email}) — would love to connect for 10 mins when convenient. Best, Marcus.`,
        };
    }
  };

  const currentEmail = getEmailContent();

  const filteredDeals = deals.filter((deal) => {
    const matchesStage = dealFilter === "all" || deal.stage === dealFilter;
    const matchesDomain = domainFilter === "all" || deal.domain.includes(domainFilter);
    const matchesSearch =
      deal.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      deal.contactName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      deal.domain.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStage && matchesDomain && matchesSearch;
  });

  return (
    <div className="studio-app-shell">
      {/* Sleek Compact 240px Dark Sidebar */}
      <aside className="studio-app-sidebar">
        <div className="studio-sidebar-top">
          <div className="sidebar-brand-group">
            <span className="brand-logo-txt">STORM VEINS</span>
            <span className="brand-sub-txt">MEDIA HOUSE · EST. 2018</span>
          </div>
          <button
            onClick={onLock}
            className="studio-lock-btn"
            title="Lock Operations Suite"
            aria-label="Lock studio"
          >
            <LockKeyhole size={13} />
          </button>
        </div>

        {/* Compact Metrics Capsule */}
        <div className="studio-metrics-capsule">
          <div className="capsule-row">
            <span className="capsule-lbl">PIPELINE</span>
            <strong className="capsule-val">₹{(totalPipelineValue / 100000).toFixed(1)}L</strong>
          </div>
          <div className="capsule-row">
            <span className="capsule-lbl">IN FLIGHT</span>
            <span className="capsule-sub">{inFlightDeals.length} Accounts</span>
          </div>
          <div className="capsule-progress-bar">
            <div className="capsule-fill" style={{ width: "80%" }} />
          </div>
        </div>

        {/* Categorized CRM Navigation */}
        <nav className="studio-crm-nav" role="tablist" aria-label="Studio tools">
          <div className="nav-category-group">
            <span className="nav-group-title">PIPELINE</span>
            <button
              role="tab"
              aria-selected={mode === "pipeline"}
              className={`studio-tool-tab ${mode === "pipeline" ? "active" : ""}`}
              onClick={() => setMode("pipeline")}
            >
              <BarChart3 size={13} />
              <span>Deals CRM</span>
              <span className="nav-count-badge">{deals.length}</span>
            </button>
          </div>

          <div className="nav-category-group">
            <span className="nav-group-title">GROWTH</span>
            <button
              role="tab"
              aria-selected={mode === "outreach"}
              className={`studio-tool-tab ${mode === "outreach" ? "active" : ""}`}
              onClick={() => setMode("outreach")}
            >
              <Target size={13} />
              <span>Outreach Agent</span>
              <span className="nav-pill-live">AI</span>
            </button>
          </div>

          <div className="nav-category-group">
            <span className="nav-group-title">OPERATIONS</span>
            <button
              role="tab"
              aria-selected={mode === "invoice"}
              className={`studio-tool-tab ${mode === "invoice" ? "active" : ""}`}
              onClick={() => setMode("invoice")}
            >
              <ReceiptText size={13} />
              <span>Invoicing</span>
            </button>
            <button
              role="tab"
              aria-selected={mode === "letter"}
              className={`studio-tool-tab ${mode === "letter" ? "active" : ""}`}
              onClick={() => setMode("letter")}
            >
              <PenLine size={13} />
              <span>Agreements</span>
            </button>
            <button
              role="tab"
              aria-selected={mode === "document"}
              className={`studio-tool-tab ${mode === "document" ? "active" : ""}`}
              onClick={() => setMode("document")}
            >
              <FileText size={13} />
              <span>Scope SOW</span>
            </button>
          </div>
        </nav>

        <div className="studio-sidebar-bottom-meta">
          <ShieldCheck size={12} className="meta-shield" />
          <span>Mumbai HQ · Operator Mode</span>
        </div>
      </aside>

      {/* Main Workspace (Light Themed, Clean, Properly Padded) */}
      <main className="studio-app-main studio-light-theme">
        {/* Crisp Header Toolbar */}
        <div className="studio-main-toolbar">
          <div className="toolbar-title-wrap">
            <span className="toolbar-eyebrow">
              {mode === "pipeline"
                ? "AGENCY PIPELINE"
                : mode === "outreach"
                ? "ACQUISITION ARCHITECTURE"
                : "COMMERCIAL SUITE"}
            </span>
            <h1 className="studio-page-title">
              {mode === "pipeline"
                ? "Enterprise Deals CRM"
                : mode === "outreach"
                ? "Commercial Outreach Agent"
                : mode === "invoice"
                ? "Commercial Invoicing Generator"
                : mode === "letter"
                ? "Client Delivery Agreement"
                : "Scope of Work Blueprint"}
            </h1>
          </div>

          <div className="toolbar-actions-cluster">
            {mode === "pipeline" ? (
              <button
                className="studio-action-btn primary"
                onClick={() => setShowNewDealModal(true)}
              >
                <Plus size={13} />
                <span>Add Deal</span>
              </button>
            ) : mode === "outreach" ? (
              <div className="outreach-top-actions">
                <a
                  href={`mailto:${prospect.email}?subject=${encodeURIComponent(
                    currentEmail.subject
                  )}&body=${encodeURIComponent(currentEmail.body)}`}
                  className="studio-action-btn primary"
                >
                  <Mail size={13} />
                  <span>Send via Mail Client</span>
                  <ArrowUpRight size={12} />
                </a>
              </div>
            ) : (
              <button
                className="studio-action-btn primary"
                onClick={() => window.print()}
              >
                <Printer size={13} />
                <span>Export PDF</span>
                <ArrowUpRight size={12} />
              </button>
            )}
          </div>
        </div>

        {/* MODE 1: DEALS CRM */}
        {mode === "pipeline" && (
          <div className="studio-crm-container">
            {/* Top 4 KPI Metrics Bar */}
            <div className="crm-kpi-strip">
              <div className="crm-kpi-card">
                <span className="kpi-label">TOTAL PIPELINE VALUE</span>
                <strong className="kpi-value">₹{(totalPipelineValue / 100000).toFixed(1)} Lakhs</strong>
                <span className="kpi-sub">{deals.length} Active Opportunities</span>
              </div>
              <div className="crm-kpi-card">
                <span className="kpi-label">CLOSED WON</span>
                <strong className="kpi-value text-emerald">₹{(wonDealsValue / 100000).toFixed(1)} Lakhs</strong>
                <span className="kpi-sub">Sprint Deployed</span>
              </div>
              <div className="crm-kpi-card">
                <span className="kpi-label">AVERAGE CONTRACT</span>
                <strong className="kpi-value">₹{(avgDealValue / 100000).toFixed(1)} Lakhs</strong>
                <span className="kpi-sub">Milestone Scope</span>
              </div>
              <div className="crm-kpi-card">
                <span className="kpi-label">STUDIO CAPACITY</span>
                <strong className="kpi-value">85% Booked</strong>
                <span className="kpi-sub">1 Senior Pod Available</span>
              </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="crm-controls-strip">
              <div className="crm-search-box">
                <Search size={13} className="search-icon" />
                <input
                  type="text"
                  placeholder="Filter by company, decision maker, or domain..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="crm-search-input"
                />
              </div>

              <select
                value={domainFilter}
                onChange={(e) => setDomainFilter(e.target.value)}
                className="crm-domain-select"
              >
                <option value="all">All Sectors</option>
                <option value="Industrial">Industrial &amp; Safety</option>
                <option value="Fintech">Fintech &amp; Wealth</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Real Estate">Real Estate</option>
                <option value="Enterprise SaaS">Enterprise SaaS</option>
              </select>

              <div className="crm-stage-filter-pills">
                {[
                  { id: "all", label: "All", count: deals.length },
                  { id: "lead", label: "Identified", count: deals.filter((d) => d.stage === "lead").length },
                  { id: "teardown", label: "Audit Sent", count: deals.filter((d) => d.stage === "teardown").length },
                  { id: "briefing", label: "Briefing", count: deals.filter((d) => d.stage === "briefing").length },
                  { id: "proposal", label: "In Review", count: deals.filter((d) => d.stage === "proposal").length },
                  { id: "won", label: "Won", count: deals.filter((d) => d.stage === "won").length },
                ].map((st) => (
                  <button
                    key={st.id}
                    type="button"
                    className={`crm-filter-pill ${dealFilter === st.id ? "active" : ""}`}
                    onClick={() => setDealFilter(st.id)}
                  >
                    <span>{st.label}</span>
                    <span className="pill-count">{st.count}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Pipeline Grid */}
            <div className="crm-deals-grid">
              {filteredDeals.map((deal) => (
                <div key={deal.id} className={`crm-deal-card stage-${deal.stage}`}>
                  <div className="deal-card-header">
                    <div className="deal-title-block">
                      <span className="deal-domain-tag">{deal.domain}</span>
                      <h3 className="deal-company-name">{deal.company}</h3>
                    </div>
                    <span className={`deal-stage-pill stage-pill-${deal.stage}`}>
                      {deal.stage.toUpperCase()}
                    </span>
                  </div>

                  <div className="deal-financial-row">
                    <div className="deal-amount">
                      <span className="amt-lbl">CONTRACT VALUE</span>
                      <strong className="amt-val">₹{deal.value.toLocaleString("en-IN")}</strong>
                    </div>
                    <span className="deal-type-badge">{deal.dealType}</span>
                  </div>

                  <div className="deal-contact-info">
                    <span className="contact-person">
                      <strong>{deal.contactName}</strong> · {deal.contactTitle}
                    </span>
                    <span className="contact-email">{deal.email}</span>
                  </div>

                  <div className="deal-pain-box">
                    <span className="pain-lbl">OPERATIONAL FRICTION POINT</span>
                    <p className="pain-desc">{deal.pain}</p>
                  </div>

                  <div className="deal-next-action-strip">
                    <Clock size={11} className="action-icon" />
                    <span className="action-txt"><strong>Next:</strong> {deal.nextAction}</span>
                  </div>

                  <div className="deal-actions-footer">
                    <button
                      type="button"
                      className="deal-pitch-btn"
                      onClick={() => loadProspectToOutreach(deal)}
                      title="Load deal into AI Outreach Agent"
                    >
                      <Target size={12} />
                      <span>Prepare Outreach</span>
                    </button>

                    {deal.stage !== "won" && (
                      <button
                        type="button"
                        className="deal-advance-btn"
                        onClick={() => advanceDealStage(deal.id)}
                        title="Advance pipeline stage"
                      >
                        <span>Advance</span>
                        <ChevronRight size={12} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MODE 2: COMMERCIAL OUTREACH AGENT (REFINED EXECUTIVE LUXURY) */}
        {mode === "outreach" && (
          <div className="studio-outreach-super-container">
            {/* Sleek Command Bar */}
            <div className="executive-command-bar">
              <div className="command-bar-header">
                <div className="command-meta-left">
                  <span className="live-status-dot" />
                  <span className="command-title">COMMERCIAL INTELLIGENCE ENGINE</span>
                  <span className="command-divider">/</span>
                  <span className="command-sub">Autonomous Decision-Maker Sequencing</span>
                </div>
                <span className="command-benchmark-tag">Enterprise Pod Model</span>
              </div>

              {/* Sector Selector Tabs (No Emojis) */}
              <div className="command-sector-tabs">
                <span className="sector-tabs-lbl">SECTOR PRESETS:</span>
                <div className="sector-tabs-list">
                  {industryPresets.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      className={`sector-tab-btn ${prospect.company === p.company ? "selected" : ""}`}
                      onClick={() => applyPreset(p.id)}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Requirement Input */}
              <form onSubmit={handleAiAutoDraft} className="command-prompt-form">
                <div className="command-input-container">
                  <Search size={13} className="command-search-icon" />
                  <input
                    type="text"
                    placeholder="Enter custom requirement (e.g. 'Pitch custom compliance CRM to Fire Safety COO')..."
                    value={aiCustomPrompt}
                    onChange={(e) => setAiCustomPrompt(e.target.value)}
                    className="command-prompt-input"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isGenerating}
                  className="command-run-btn"
                >
                  <Wand2 size={12} />
                  <span>{isGenerating ? "Synthesizing..." : "Generate Cadence"}</span>
                </button>
              </form>
            </div>

            {/* Sleek Step Cadence Bar */}
            <div className="executive-cadence-bar">
              <span className="cadence-strip-lbl">SEQUENCE CADENCE:</span>
              <div className="cadence-steps-row">
                {[
                  { id: "touch1", label: "01 Hook", detail: "Day 1" },
                  { id: "touch2", label: "02 Teardown", detail: "Day 4" },
                  { id: "touch3", label: "03 Proof", detail: "Day 8" },
                  { id: "touch4", label: "04 Roadmap", detail: "Day 11" },
                  { id: "touch5", label: "05 Breakup", detail: "Day 14" },
                  { id: "linkedin", label: "LinkedIn", detail: "InMail" },
                  { id: "whatsapp", label: "WhatsApp", detail: "Direct" },
                ].map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    className={`cadence-step-tab ${prospect.step === s.id ? "active" : ""}`}
                    onClick={() => setProspect({ ...prospect, step: s.id as any })}
                  >
                    <span className="step-num">{s.label}</span>
                    <span className="step-time">{s.detail}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2-Column Workspace Grid */}
            <div className="outreach-workspace-grid">
              {/* Left Column: Intelligence Dossier */}
              <div className="outreach-config-col">
                {/* Decision-Maker Advisory Box (Clean Slate Border, No Neon Green) */}
                <div className="executive-dossier-card">
                  <div className="dossier-header">
                    <UserCheck size={13} className="dossier-icon" />
                    <span className="dossier-eyebrow">DECISION-MAKER TARGETING AUDIT</span>
                  </div>
                  <div className="dossier-target-role">
                    <span className="target-lbl">Recommended Persona:</span>
                    <strong className="target-role-txt">{prospect.title}</strong>
                  </div>
                  <p className="dossier-rationale-txt">{prospect.personaReason}</p>
                </div>

                {/* Account Parameters Panel */}
                <div className="executive-panel-luxury">
                  <div className="panel-luxury-header">
                    <Building2 size={13} className="header-icon" />
                    <strong>Account Parameters</strong>
                  </div>

                  <Field label="ENTERPRISE ACCOUNT">
                    <input
                      value={prospect.company}
                      onChange={(e) => setProspect({ ...prospect, company: e.target.value })}
                      placeholder="e.g. FlameGuard Fire & Safety"
                    />
                  </Field>

                  <div className="grid-two-col">
                    <Field label="DECISION MAKER">
                      <input
                        value={prospect.recipient}
                        onChange={(e) => setProspect({ ...prospect, recipient: e.target.value })}
                        placeholder="e.g. Rajesh Kulkarni"
                      />
                    </Field>
                    <Field label="EXECUTIVE TITLE">
                      <input
                        value={prospect.title}
                        onChange={(e) => setProspect({ ...prospect, title: e.target.value })}
                        placeholder="e.g. Chief Operating Officer"
                      />
                    </Field>
                  </div>

                  <Field label="OFFICIAL EMAIL">
                    <input
                      type="email"
                      value={prospect.email}
                      onChange={(e) => setProspect({ ...prospect, email: e.target.value })}
                      placeholder="e.g. r.kulkarni@flameguardsafety.in"
                    />
                  </Field>

                  <Field label="PROPOSED COMMERCIAL MANDATE">
                    <input
                      value={prospect.offering}
                      onChange={(e) => setProspect({ ...prospect, offering: e.target.value })}
                      placeholder="e.g. Custom Field Operations CRM & Compliance Portal"
                    />
                  </Field>

                  <Field label="IDENTIFIED OPERATIONAL FRICTION">
                    <textarea
                      rows={2}
                      value={prospect.pain}
                      onChange={(e) => setProspect({ ...prospect, pain: e.target.value })}
                      placeholder="e.g. Manual paper inspection logs, delayed compliance certs & slow dispatch"
                    />
                  </Field>

                  <div className="benchmark-matched-strip">
                    <div className="benchmark-lbl-row">
                      <ShieldCheck size={11} className="benchmark-icon" />
                      <span className="benchmark-lbl">MATCHED BENCHMARK PROOF</span>
                    </div>
                    <strong className="benchmark-client">{domainProof.client}</strong>
                    <span className="benchmark-metric">{domainProof.metric}</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Correspondence Terminal */}
              <div className="outreach-compose-col">
                <div className="executive-compose-card">
                  <div className="compose-top-toolbar">
                    <div className="compose-meta-channel">
                      <span className="channel-badge">{currentEmail.channel}</span>
                      <span className="channel-timing">· {currentEmail.timing}</span>
                    </div>

                    <div className="compose-action-buttons">
                      <button
                        type="button"
                        className="compose-act-btn"
                        onClick={() => {
                          navigator.clipboard.writeText(currentEmail.subject);
                          setSubjectCopied(true);
                          setTimeout(() => setSubjectCopied(false), 2000);
                        }}
                      >
                        {subjectCopied ? <Check size={11} /> : <Copy size={11} />}
                        <span>{subjectCopied ? "Subject Copied" : "Copy Subject"}</span>
                      </button>

                      <button
                        type="button"
                        className="compose-act-btn highlight"
                        onClick={() => {
                          navigator.clipboard.writeText(`${currentEmail.subject}\n\n${currentEmail.body}`);
                          setCopied(true);
                          setTimeout(() => setCopied(false), 2500);
                        }}
                      >
                        {copied ? <Check size={11} /> : <Copy size={11} />}
                        <span>{copied ? "Body Copied" : "Copy Full Body"}</span>
                      </button>

                      <a
                        href={`mailto:${prospect.email}?subject=${encodeURIComponent(
                          currentEmail.subject
                        )}&body=${encodeURIComponent(currentEmail.body)}`}
                        className="compose-act-btn primary"
                      >
                        <Mail size={11} />
                        <span>Send via Client</span>
                        <ArrowUpRight size={11} />
                      </a>
                    </div>
                  </div>

                  <div className="compose-fields-block">
                    <div className="compose-row">
                      <span className="row-key">TO:</span>
                      <span className="row-recipient-pill">{prospect.recipient} &lt;{prospect.email}&gt;</span>
                    </div>
                    <div className="compose-row">
                      <span className="row-key">FROM:</span>
                      <span className="row-val">Marcus Vance &lt;contact@stormveins.com&gt;</span>
                    </div>
                    <div className="compose-row subject-row">
                      <span className="row-key">SUBJECT:</span>
                      <strong className="row-subject-txt">{currentEmail.subject}</strong>
                    </div>
                  </div>

                  <div className="compose-body-container">
                    <pre className="compose-body-pre">{currentEmail.body}</pre>
                  </div>

                  <div className="compose-bottom-bar">
                    <ShieldCheck size={12} className="meta-shield" />
                    <span>Calibrated for {prospect.title} decision-making authority · Outcome guaranteed pod model</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MODE 3: INVOICE GENERATOR */}
        {mode === "invoice" && (
          <div className="studio-workspace-grid">
            <div className="studio-form-col">
              <div className="executive-panel-luxury">
                <div className="panel-luxury-header">
                  <ReceiptText size={13} className="header-icon" />
                  <strong>Invoice Details</strong>
                </div>
                <Field label="INVOICE IDENTIFIER">
                  <input
                    value={invoiceNumber}
                    onChange={(e) => setInvoiceNumber(e.target.value)}
                  />
                </Field>
                <Field label="ISSUANCE DATE">
                  <input
                    type="date"
                    value={invoiceDate}
                    onChange={(e) => setInvoiceDate(e.target.value)}
                  />
                </Field>
                <Field label="CLIENT ENTERPRISE">
                  <input value={client} onChange={(e) => setClient(e.target.value)} />
                </Field>
              </div>

              <div className="executive-panel-luxury">
                <div className="panel-luxury-header">
                  <Layers size={13} className="header-icon" />
                  <strong>Deliverable Milestones</strong>
                </div>
                {items.map((item) => (
                  <div className="invoice-item-editor" key={item.id}>
                    <input
                      value={item.description}
                      onChange={(e) => updateItem(item.id, "description", e.target.value)}
                      placeholder="Deliverable title"
                      className="line-desc-input"
                    />
                    <div className="line-item-math">
                      <input
                        type="number"
                        min="1"
                        value={item.qty}
                        onChange={(e) => updateItem(item.id, "qty", e.target.value)}
                        className="line-qty-input"
                      />
                      <span className="math-mult">×</span>
                      <input
                        type="number"
                        min="0"
                        step="10000"
                        value={item.price}
                        onChange={(e) => updateItem(item.id, "price", e.target.value)}
                        className="line-price-input"
                      />
                      <button
                        type="button"
                        onClick={() => setItems(items.filter((i) => i.id !== item.id))}
                        className="line-delete-btn"
                        aria-label="Remove item"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  className="studio-action-btn secondary add-item-btn"
                  onClick={() =>
                    setItems([
                      ...items,
                      {
                        id: Date.now(),
                        description: "New Architectural Deliverable",
                        qty: 1,
                        price: 150000,
                      },
                    ])
                  }
                >
                  <Plus size={12} />
                  <span>Add Deliverable Line</span>
                </button>
              </div>

              <div className="executive-panel-luxury">
                <div className="panel-luxury-header">
                  <ReceiptText size={13} className="header-icon" />
                  <strong>Payments &amp; Deductions</strong>
                </div>
                <Field label={`ADVANCE RETAINER RECEIVED (MAX ₹${subtotal.toLocaleString("en-IN")})`}>
                  <input
                    type="number"
                    min="0"
                    max={subtotal}
                    value={advance}
                    onChange={(e) =>
                      setAdvance(Math.min(subtotal, Math.max(0, Number(e.target.value))))
                    }
                  />
                </Field>
              </div>
            </div>

            <div className="studio-preview-col">
              <div className="preview-top-badge">
                <span>A4 DOCUMENT CANVAS</span>
                <span className="badge-ready">
                  <CheckCircle2 size={12} /> PRINT &amp; PDF READY
                </span>
              </div>

              <div className="a4-document-paper print-preview">
                <div className="a4-brand-header">
                  <Logo inverse />
                  <div className="a4-invoice-meta">
                    <span className="a4-doc-type">COMMERCIAL INVOICE</span>
                    <strong className="a4-doc-number">{invoiceNumber}</strong>
                  </div>
                </div>

                <div className="a4-body-container">
                  <div className="a4-party-grid">
                    <div className="party-billed-to">
                      <span className="party-label">BILLED TO</span>
                      <strong className="party-name">{client}</strong>
                      <span className="party-sub">
                        Enterprise Commercial Agreement<br />
                        Global Operations
                      </span>
                    </div>

                    <div className="party-details-box">
                      <div className="meta-pair">
                        <span className="pair-lbl">DATE ISSUED:</span>
                        <span className="pair-val">{displayDate(invoiceDate)}</span>
                      </div>
                      <div className="meta-pair">
                        <span className="pair-lbl">PAYMENT TERMS:</span>
                        <span className="pair-val">Net 15 Bank Wire</span>
                      </div>
                      <div className="meta-pair">
                        <span className="pair-lbl">CURRENCY:</span>
                        <span className="pair-val">INR (₹) / USD ($)</span>
                      </div>
                    </div>
                  </div>

                  <table className="a4-invoice-table">
                    <thead>
                      <tr>
                        <th>MILESTONE DELIVERABLE</th>
                        <th className="th-qty">QTY</th>
                        <th className="th-rate">RATE (₹)</th>
                        <th className="th-total">AMOUNT (₹)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item) => (
                        <tr key={item.id}>
                          <td>{item.description}</td>
                          <td className="td-qty">{item.qty}</td>
                          <td className="td-rate">{item.price.toLocaleString("en-IN")}</td>
                          <td className="td-total">
                            {(Math.max(0, item.qty) * Math.max(0, item.price)).toLocaleString("en-IN")}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <div className="a4-totals-cluster">
                    <div className="totals-row">
                      <span>Subtotal</span>
                      <strong>₹{subtotal.toLocaleString("en-IN")}</strong>
                    </div>
                    {safeAdvance > 0 && (
                      <div className="totals-row advance-row">
                        <span>Advance Retainer Applied</span>
                        <strong>-₹{safeAdvance.toLocaleString("en-IN")}</strong>
                      </div>
                    )}
                    <div className="totals-row grand-total-row">
                      <span>Balance Due</span>
                      <strong className="text-emerald">₹{total.toLocaleString("en-IN")}</strong>
                    </div>
                  </div>

                  <div className="a4-banking-block">
                    <span className="banking-title">REMITTANCE INSTRUCTIONS</span>
                    <div className="banking-grid">
                      <div>
                        <span className="bank-lbl">BENEFICIARY</span>
                        <strong>Storm Veins Studio LLP</strong>
                      </div>
                      <div>
                        <span className="bank-lbl">BANK NAME</span>
                        <strong>HDFC Bank Ltd, Mumbai Corporate Branch</strong>
                      </div>
                      <div>
                        <span className="bank-lbl">ACCOUNT NO.</span>
                        <strong>50200084920194</strong>
                      </div>
                      <div>
                        <span className="bank-lbl">IFSC / SWIFT</span>
                        <strong>HDFC0000060 · HDFCINBB</strong>
                      </div>
                    </div>
                  </div>

                  <div className="a4-footer-signature">
                    <div className="sig-block">
                      <span className="sig-name">Storm Veins Media House</span>
                      <span className="sig-role">Authorised Partner Signature</span>
                    </div>
                    <div className="sig-meta">
                      <span>contact@stormveins.com · +91 96998 31323</span>
                      <span>Mumbai & Thane</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MODE 4: CLIENT AGREEMENTS */}
        {mode === "letter" && (
          <div className="studio-workspace-grid">
            <div className="studio-form-col">
              <div className="executive-panel-luxury">
                <div className="panel-luxury-header">
                  <PenLine size={13} className="header-icon" />
                  <strong>Letter Details</strong>
                </div>
                <Field label="RECIPIENT & TITLE">
                  <input
                    value={letter.recipient}
                    onChange={(e) => setLetter({ ...letter, recipient: e.target.value })}
                  />
                </Field>
                <Field label="COMMUNICATION SUBJECT">
                  <input
                    value={letter.subject}
                    onChange={(e) => setLetter({ ...letter, subject: e.target.value })}
                  />
                </Field>
                <Field label="MEMORANDUM BODY">
                  <textarea
                    rows={12}
                    value={letter.body}
                    onChange={(e) => setLetter({ ...letter, body: e.target.value })}
                  />
                </Field>
              </div>
            </div>

            <div className="studio-preview-col">
              <div className="preview-top-badge">
                <span>A4 DOCUMENT CANVAS</span>
                <span className="badge-ready">
                  <CheckCircle2 size={12} /> PRINT &amp; PDF READY
                </span>
              </div>

              <div className="a4-document-paper print-preview">
                <div className="a4-brand-header">
                  <Logo inverse />
                  <div className="a4-invoice-meta">
                    <span className="a4-doc-type">FORMAL MEMORANDUM</span>
                    <strong className="a4-doc-number">{displayDate(today)}</strong>
                  </div>
                </div>

                <div className="a4-body-container letter-layout">
                  <div className="letter-addressee">
                    <span className="party-label">ATTENTION:</span>
                    <strong>{letter.recipient}</strong>
                  </div>

                  <h2 className="letter-subject-title">SUBJECT: {letter.subject}</h2>

                  <div className="letter-content-text">{letter.body}</div>

                  <div className="letter-closing">
                    <p>Respectfully submitted on behalf of the studio,</p>
                    <div className="signature-box">
                      <strong>Managing Partners</strong>
                      <span>Storm Veins Studio LLP</span>
                      <small>Executive Brand &amp; Growth Architecture</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MODE 5: SCOPE SOW */}
        {mode === "document" && (
          <div className="studio-workspace-grid">
            <div className="studio-form-col">
              <div className="executive-panel-luxury">
                <div className="panel-luxury-header">
                  <FileText size={13} className="header-icon" />
                  <strong>Scope Document Content</strong>
                </div>
                <Field label="DOCUMENT TITLE">
                  <input
                    value={documentTitle}
                    onChange={(e) => setDocumentTitle(e.target.value)}
                  />
                </Field>
                <Field label="SPECIFICATION BODY">
                  <textarea
                    rows={16}
                    value={documentBody}
                    onChange={(e) => setDocumentBody(e.target.value)}
                  />
                </Field>
              </div>
            </div>

            <div className="studio-preview-col">
              <div className="preview-top-badge">
                <span>A4 DOCUMENT CANVAS</span>
                <span className="badge-ready">
                  <CheckCircle2 size={12} /> PRINT &amp; PDF READY
                </span>
              </div>

              <div className="a4-document-paper print-preview">
                <div className="a4-brand-header">
                  <Logo inverse />
                  <div className="a4-invoice-meta">
                    <span className="a4-doc-type">EXECUTIVE SPECIFICATION</span>
                    <strong className="a4-doc-number">CONFIDENTIAL</strong>
                  </div>
                </div>

                <div className="a4-body-container">
                  <h2 className="doc-main-title">{documentTitle}</h2>
                  <div className="doc-body-text">{documentBody}</div>

                  <div className="doc-checklist-luxury">
                    <div className="check-line">
                      <CheckCircle2 size={13} className="text-emerald" />
                      <span>Commercial Framing and Success Metrics Approved</span>
                    </div>
                    <div className="check-line">
                      <CheckCircle2 size={13} className="text-emerald" />
                      <span>Technical Architecture &amp; Security Scope Compliant</span>
                    </div>
                    <div className="check-line">
                      <CheckCircle2 size={13} className="text-emerald" />
                      <span>Dedicated Pod Execution Calendar Finalized</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Add Deal Modal */}
        {showNewDealModal && (
          <div className="studio-modal-backdrop" onClick={() => setShowNewDealModal(false)}>
            <div className="studio-modal-card" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <div>
                  <span className="modal-eyebrow">NEW OPPORTUNITY</span>
                  <h2>Add Enterprise Deal</h2>
                </div>
                <button
                  type="button"
                  className="modal-close-btn"
                  onClick={() => setShowNewDealModal(false)}
                >
                  ✕
                </button>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const form = e.currentTarget;
                  const data = new FormData(form);
                  const newDeal: CrmDeal = {
                    id: `deal-${Date.now()}`,
                    company: data.get("company") as string,
                    contactName: data.get("contactName") as string,
                    contactTitle: data.get("contactTitle") as string,
                    email: data.get("email") as string,
                    domain: data.get("domain") as string,
                    stage: data.get("stage") as any,
                    value: Number(data.get("value")),
                    dealType: data.get("dealType") as string,
                    pain: data.get("pain") as string,
                    nextAction: data.get("nextAction") as string,
                    updatedAt: "Just now",
                  };
                  setDeals([newDeal, ...deals]);
                  setShowNewDealModal(false);
                }}
                className="deal-modal-form"
              >
                <div className="grid-two-col">
                  <Field label="COMPANY NAME">
                    <input name="company" required placeholder="e.g. FlameGuard Fire & Safety" />
                  </Field>
                  <Field label="ESTIMATED VALUE (₹)">
                    <input name="value" type="number" required defaultValue={2500000} />
                  </Field>
                </div>

                <div className="grid-two-col">
                  <Field label="CONTACT PERSON">
                    <input name="contactName" required placeholder="e.g. Rajesh Kulkarni" />
                  </Field>
                  <Field label="CONTACT TITLE">
                    <input name="contactTitle" required placeholder="e.g. Chief Operating Officer" />
                  </Field>
                </div>

                <div className="grid-two-col">
                  <Field label="CONTACT EMAIL">
                    <input name="email" type="email" required placeholder="e.g. r.kulkarni@flameguardsafety.in" />
                  </Field>
                  <Field label="DOMAIN / SECTOR">
                    <select name="domain" className="studio-select-input" defaultValue="Industrial Safety">
                      <option value="Industrial Safety">Industrial &amp; Safety</option>
                      <option value="Fintech & Wealth">Fintech &amp; Wealth</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Real Estate">Real Estate</option>
                      <option value="Enterprise SaaS">Enterprise SaaS</option>
                    </select>
                  </Field>
                </div>

                <div className="grid-two-col">
                  <Field label="ENGAGEMENT MODEL">
                    <input name="dealType" defaultValue="Custom Field CRM" />
                  </Field>
                  <Field label="PIPELINE STAGE">
                    <select name="stage" className="studio-select-input" defaultValue="lead">
                      <option value="lead">Identified Lead</option>
                      <option value="teardown">Audit Sent</option>
                      <option value="briefing">Briefing Booked</option>
                      <option value="proposal">In Review</option>
                      <option value="won">Won</option>
                    </select>
                  </Field>
                </div>

                <Field label="IDENTIFIED OPERATIONAL FRICTION">
                  <input name="pain" required placeholder="e.g. Manual paper inspection logs & delayed compliance certs" />
                </Field>

                <Field label="IMMEDIATE NEXT ACTION">
                  <input name="nextAction" required placeholder="e.g. Demo sub-second offline mobile inspection app" />
                </Field>

                <div className="modal-actions-bar">
                  <button
                    type="button"
                    className="studio-action-btn secondary"
                    onClick={() => setShowNewDealModal(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="studio-action-btn primary">
                    <span>Create Deal</span>
                    <ArrowRight size={12} />
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
