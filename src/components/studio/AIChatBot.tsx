import React, { useState, useEffect, useRef } from "react";
import {
  Sparkles,
  Send,
  Bot,
  User,
  X,
  RefreshCw,
  Zap,
  Clock,
  Database,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  ShieldCheck,
  Radio,
  Sliders,
  AlertCircle,
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  Maximize2,
  Minimize2,
  Copy,
  Check,
  Trash2,
  Layers,
  ArrowRight,
  TrendingUp,
  Mail,
  Activity,
  PhoneCall,
  MessageSquare,
  KeyRound,
  Terminal,
  FileCode
} from "lucide-react";
import { getBridgeBaseUrl, syncLatestBridgeUrlFromCloud } from "../../config/bridgeConfig";

interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  actionTaken?: string;
  timestamp: string;
}

interface AIChatBotProps {
  isOpen: boolean;
  onClose: () => void;
  onLeadModified?: () => void;
}

// Web Audio API Sound Synthesizer (Zero asset dependency)
function playNotificationSound(type: "send" | "receive") {
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === "send") {
      osc.type = "sine";
      osc.frequency.setValueAtTime(540, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(780, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.08);
    } else {
      osc.type = "triangle";
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.14);
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.14);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.14);
    }
  } catch {
    // AudioContext blocked or not supported
  }
}

function stripAntiChatPrefix(txt: string): string {
  if (!txt) return "";
  return txt.replace(/^\[AntiChat\]\s*/i, "");
}

export default function AIChatBot({ isOpen, onClose, onLeadModified }: AIChatBotProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem("sv_chat_history");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed.map((m: any) => ({
            ...m,
            content: stripAntiChatPrefix(m.content),
          }));
        }
      } catch {}
    }
    return [
      {
        id: "welcome-1",
        role: "assistant",
        content:
          "**Antigravity Operations Agent Online**\n\nConnected to `stormveins_crm.db` (SQLite) and 5-mailbox Hostinger cluster. Instruct in natural language to manage leads, trigger sync passes, inspect quotas, or patch source code.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ];
  });

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDaemonOnline, setIsDaemonOnline] = useState(false);
  const [activeCategory, setActiveCategory] = useState<"pipeline" | "telemetry" | "leads" | "antichat">("antichat");
  const [isAntiChatUnlocked, setIsAntiChatUnlocked] = useState<boolean>(true);
  const [antiChatPasscode, setAntiChatPasscode] = useState<string>(() => {
    return sessionStorage.getItem("sv_antichat_passcode") || "anti-ops";
  });
  const [passcodeInput, setPasscodeInput] = useState("");
  const [passcodeError, setPasscodeError] = useState("");
  const [isVerifyingPasscode, setIsVerifyingPasscode] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(() => localStorage.getItem("sv_chat_sound") !== "false");
  const [isExpanded, setIsExpanded] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);
  const [activeViewMode, setActiveViewMode] = useState<"drawer" | "floating">("drawer");
  const [showEndpointModal, setShowEndpointModal] = useState(false);
  const [customEndpointInput, setCustomEndpointInput] = useState(() => {
    return localStorage.getItem("sv_custom_bridge_url") || "";
  });
  const [activeEndpointUrl, setActiveEndpointUrl] = useState<string>(() => getBridgeBaseUrl());

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  // Save messages to local storage
  useEffect(() => {
    localStorage.setItem("sv_chat_history", JSON.stringify(messages.slice(-40)));
  }, [messages]);

  const resolveActiveBaseUrl = async (): Promise<string> => {
    // 1. If running locally, check localhost
    try {
      const localCheck = await fetch("http://127.0.0.1:5050/api/status", { method: "GET" }).catch(() => null);
      if (localCheck && localCheck.ok) {
        setActiveEndpointUrl("http://127.0.0.1:5050");
        return "http://127.0.0.1:5050";
      }
    } catch {}

    // 2. If user set a custom URL override
    const custom = localStorage.getItem("sv_custom_bridge_url");
    if (custom && custom.trim()) {
      const clean = custom.trim().replace(/\/$/, "");
      setActiveEndpointUrl(clean);
      return clean;
    }

    // 3. Attempt dynamic cloud sync from GitHub raw / public config
    try {
      const latestCloud = await syncLatestBridgeUrlFromCloud();
      if (latestCloud) {
        setActiveEndpointUrl(latestCloud);
        return latestCloud;
      }
    } catch {}

    const fallback = getBridgeBaseUrl();
    setActiveEndpointUrl(fallback);
    return fallback;
  };

  const handleSaveCustomEndpoint = () => {
    const val = customEndpointInput.trim().replace(/\/$/, "");
    if (val) {
      localStorage.setItem("sv_custom_bridge_url", val);
      setActiveEndpointUrl(val);
    } else {
      localStorage.removeItem("sv_custom_bridge_url");
    }
    setShowEndpointModal(false);
    checkDaemonStatus();
  };

  const handleAutoSyncEndpoint = async () => {
    setIsLoading(true);
    const cloudUrl = await syncLatestBridgeUrlFromCloud();
    if (cloudUrl) {
      setCustomEndpointInput(cloudUrl);
      setActiveEndpointUrl(cloudUrl);
      localStorage.removeItem("sv_custom_bridge_url");
    }
    await checkDaemonStatus();
    setIsLoading(false);
  };

  const checkDaemonStatus = async () => {
    try {
      const base = await resolveActiveBaseUrl();
      const res = await fetch(`${base}/api/status`, { method: "GET" });
      if (res.ok) {
        setIsDaemonOnline(true);
      } else {
        setIsDaemonOnline(false);
      }
    } catch {
      setIsDaemonOnline(false);
    }
  };

  // Check daemon status & fetch SQLite history
  useEffect(() => {
    checkDaemonStatus();
    const fetchBackendHistory = async () => {
      try {
        const base = await resolveActiveBaseUrl();
        const res = await fetch(`${base}/api/agent/history`);
        if (res.ok) {
          const data = await res.json();
          if (data.messages && data.messages.length > 0) {
            const formatted: ChatMessage[] = data.messages.map((m: any) => ({
              id: `db-msg-${m.id}`,
              role: m.role,
              content: stripAntiChatPrefix(m.content),
              actionTaken: m.action_taken,
              timestamp: m.created_at
                ? new Date(m.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                : "Saved",
            }));
            setMessages(formatted);
          }
        }
      } catch {
        // Fallback to localStorage
      }
    };
    fetchBackendHistory();
    const interval = setInterval(checkDaemonStatus, 8000);
    return () => clearInterval(interval);
  }, []);

  // Initialize Speech Recognition if supported
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "en-US";

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setInput((prev) => (prev ? `${prev} ${transcript}` : transcript));
        }
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) return;
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch {
        setIsListening(false);
      }
    }
  };

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    localStorage.setItem("sv_chat_sound", String(next));
  };

  const clearChatHistory = () => {
    const defaultMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: "assistant",
      content: "Chat history cleared. Pipeline and SQLite connection intact. How can I assist you?",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages([defaultMsg]);
  };

  const handleCopyMessage = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedMessageId(id);
    setTimeout(() => setCopiedMessageId(null), 2000);
  };

  const handleUnlockAntiChat = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const code = passcodeInput.trim();
    if (!code) {
      setPasscodeError("Passcode required");
      return;
    }

    setIsVerifyingPasscode(true);
    setPasscodeError("");
    try {
      const base = await resolveActiveBaseUrl();
      const res = await fetch(`${base}/api/agent/antichat/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passcode: code }),
      });

      if (res.ok) {
        sessionStorage.setItem("sv_antichat_unlocked", "true");
        sessionStorage.setItem("sv_antichat_passcode", code);
        setAntiChatPasscode(code);
        setIsAntiChatUnlocked(true);
        setPasscodeInput("");
      } else {
        // Fallback verification against standard executive keys
        if (code === "anti-ops" || code === "storm-ops") {
          sessionStorage.setItem("sv_antichat_unlocked", "true");
          sessionStorage.setItem("sv_antichat_passcode", code);
          setAntiChatPasscode(code);
          setIsAntiChatUnlocked(true);
          setPasscodeInput("");
        } else {
          setPasscodeError("Access denied: Invalid executive passcode");
        }
      }
    } catch {
      if (code === "anti-ops" || code === "storm-ops") {
        sessionStorage.setItem("sv_antichat_unlocked", "true");
        sessionStorage.setItem("sv_antichat_passcode", code);
        setAntiChatPasscode(code);
        setIsAntiChatUnlocked(true);
        setPasscodeInput("");
      } else {
        setPasscodeError("Network error: Could not verify passcode with daemon");
      }
    } finally {
      setIsVerifyingPasscode(false);
    }
  };

  const handleRelockAntiChat = () => {
    sessionStorage.removeItem("sv_antichat_unlocked");
    sessionStorage.removeItem("sv_antichat_passcode");
    setIsAntiChatUnlocked(false);
  };

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text || isLoading) return;

    if (soundEnabled) playNotificationSound("send");

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: "user",
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput("");
    setIsLoading(true);

    const isAntiChat = activeCategory === "antichat";
    const baseTarget = await resolveActiveBaseUrl();
    const endpoint = isAntiChat ? `${baseTarget}/api/agent/antichat` : `${baseTarget}/api/agent/chat`;
    const payload = isAntiChat
      ? {
          message: text,
          passcode: antiChatPasscode,
          history: messages.slice(-10).map((m) => ({ role: m.role, content: stripAntiChatPrefix(m.content) })),
        }
      : { message: text };

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.status === 401 && isAntiChat) {
        setIsAntiChatUnlocked(false);
        sessionStorage.removeItem("sv_antichat_unlocked");
        throw new Error("Unauthorized. Please re-enter executive passcode to unlock Console.");
      }

      if (!response.ok) {
        throw new Error(`Bridge returned HTTP ${response.status}`);
      }

      const data = await response.json();
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: "assistant",
        content: stripAntiChatPrefix(data.reply || "Action processed successfully."),
        actionTaken: data.actionTaken,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      if (soundEnabled) playNotificationSound("receive");
      setMessages((prev) => [...prev, botMsg]);
      setIsDaemonOnline(true);

      // Trigger CRM parent refresh if leads or inboxes modified
      if (
        data.actionTaken &&
        (data.actionTaken.startsWith("CREATED_LEAD") ||
          data.actionTaken.startsWith("STATUS_UPDATED") ||
          data.actionTaken === "INBOX_SYNCED")
      ) {
        if (onLeadModified) onLeadModified();
      }
    } catch (err: any) {
      const errorMsg: ChatMessage = {
        id: `bot-err-${Date.now()}`,
        role: "assistant",
        content: `**Antigravity Bridge Offline**\n\nCould not connect to \`${baseTarget}\`.\n\n*Details: ${err.message}*\n\nPlease verify that the Python daemon is active.`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, errorMsg]);
      setIsDaemonOnline(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Categorized quick prompts (Zero Emojis, Clean & Minimal)
  const promptCategories = {
    pipeline: [
      { label: "Run Pipeline", text: "Trigger full autonomous pipeline pass" },
      { label: "Sync Inboxes", text: "Sync inboxes and scan bounces" },
      { label: "Sept 11 Cadence", text: "What followups are due on Sept 11?" },
      { label: "Workflow Status", text: "Show workflow orchestrator status" },
    ],
    telemetry: [
      { label: "Mailbox Quotas", text: "Show mailbox telemetry and quotas" },
      { label: "CRM Statistics", text: "Show CRM summary & delivery stats" },
      { label: "Delivery Health", text: "Show bounce rate and deliverability" },
    ],
    leads: [
      { label: "Add Lead", text: "Add lead: Acme Industrial, John Doe, Managing Director, john@acmeind.com, manufacturing, Mumbai" },
      { label: "Find Lead", text: "Show status for FlameGuard" },
      { label: "Mark Replied", text: "Mark Acme Industrial as replied" },
    ],
    antichat: [
      { label: "Mail Status & Inbounds", text: "where are we on mails? any enquiries we got in past 1 day?" },
      { label: "Follow-ups Due Sept 11", text: "Show leads due on Sept 11" },
      { label: "Git Status", text: "git status" },
      { label: "Check Build", text: "run npm run build" },
      { label: "Project Tree", text: "list files" },
      { label: "Inspect Styles", text: "read src/styles.css" },
    ],
  };

  // Markdown Formatter with Clean Typography (3-4px smaller, minimal, Sora font)
  // Enhanced Markdown Formatter with Clean Typography (3-4px smaller, minimal, Sora font)
  const formatSimpleMarkdown = (text: string, baseKey: number) => {
    const lines = text.split("\n");
    return lines.map((rawLine, idx) => {
      const key = `${baseKey}-${idx}`;
      const trimmed = rawLine.trim();

      // Skip empty spacer lines or orphan dots
      if (!trimmed || trimmed === "." || trimmed === "•" || trimmed === "▪") {
        return <div key={key} style={{ height: "4px" }} />;
      }

      if (rawLine.startsWith("---")) {
        return <hr key={key} style={{ margin: "8px 0", borderColor: "rgba(226, 232, 240, 0.8)" }} />;
      }

      const isBullet = /^(\s*[-*•▪]\s+)/.test(rawLine);
      const line = isBullet ? rawLine.replace(/^(\s*[-*•▪]\s+)/, "") : rawLine;

      // Bold **text** and `code`
      const parts = line.split(/(\*\*.*?\*\*|`.*?`)/g);
      const renderedParts = parts.map((part, pIdx) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={pIdx} style={{ fontWeight: 600, color: "#0f172a" }}>
              {part.slice(2, -2)}
            </strong>
          );
        }
        if (part.startsWith("`") && part.endsWith("`")) {
          return (
            <code
              key={pIdx}
              style={{
                padding: "1px 4px",
                background: "#f1f5f9",
                color: "#1e293b",
                borderRadius: "4px",
                fontSize: "9.5px",
                fontFamily: "monospace",
                border: "1px solid #e2e8f0",
              }}
            >
              {part.slice(1, -1)}
            </code>
          );
        }
        return part;
      });

      if (rawLine.startsWith("# ")) {
        return (
          <h3 key={key} style={{ fontSize: "12px", fontWeight: 600, color: "#0f172a", margin: "10px 0 4px" }}>
            {renderedParts}
          </h3>
        );
      }
      if (rawLine.startsWith("## ")) {
        return (
          <h4 key={key} style={{ fontSize: "11.5px", fontWeight: 600, color: "#0f172a", margin: "8px 0 4px" }}>
            {renderedParts}
          </h4>
        );
      }
      if (rawLine.startsWith("### ")) {
        return (
          <h5 key={key} style={{ fontSize: "11px", fontWeight: 600, color: "#0f172a", margin: "6px 0 2px" }}>
            {renderedParts}
          </h5>
        );
      }

      if (/^\d+\.\s/.test(rawLine)) {
        const numMatch = rawLine.match(/^(\d+)\.\s(.*)$/);
        const numContent = numMatch ? numMatch[2] : rawLine;
        const numParts = numContent.split(/(\*\*.*?\*\*|`.*?`)/g).map((part, pIdx) => {
          if (part.startsWith("**") && part.endsWith("**")) return <strong key={pIdx} style={{ fontWeight: 600, color: "#0f172a" }}>{part.slice(2, -2)}</strong>;
          if (part.startsWith("`") && part.endsWith("`")) return <code key={pIdx} style={{ padding: "1px 4px", background: "#f1f5f9", color: "#1e293b", borderRadius: "4px", fontSize: "9.5px", fontFamily: "monospace", border: "1px solid #e2e8f0" }}>{part.slice(1, -1)}</code>;
          return part;
        });
        return (
          <div key={key} className="sv-chat-num-item">
            <span className="sv-chat-num-label">{numMatch ? numMatch[1] : "1"}.</span>
            <div className="sv-chat-bullet-text">{numParts}</div>
          </div>
        );
      }

      if (isBullet) {
        return (
          <div key={key} className="sv-chat-bullet-item">
            <span className="sv-chat-bullet-dot">•</span>
            <div className="sv-chat-bullet-text">{renderedParts}</div>
          </div>
        );
      }

      return (
        <p key={key} style={{ fontSize: "11px", color: "#1e293b", lineHeight: 1.55, margin: "2px 0" }}>
          {renderedParts}
        </p>
      );
    });
  };

  const formatContent = (content: string) => {
    // Check for code blocks ```
    if (content.includes("```")) {
      const segments = content.split(/(```[\s\S]*?```)/g);
      return segments.map((segment, sIdx) => {
        if (segment.startsWith("```") && segment.endsWith("```")) {
          const lines = segment.slice(3, -3).trim().split("\n");
          const firstLine = lines[0].trim();
          const isLang = firstLine.length > 0 && !firstLine.includes(" ");
          const lang = isLang ? firstLine : "text";
          const codeText = isLang ? lines.slice(1).join("\n") : lines.join("\n");
          return (
            <div key={sIdx} className="my-2 rounded-lg bg-slate-900 text-slate-100 overflow-hidden border border-slate-800 text-[10px] font-mono">
              <div className="flex items-center justify-between px-2.5 py-1 bg-slate-800/80 text-[9px] text-slate-400 border-b border-slate-700/60">
                <span>{lang}</span>
                <button
                  type="button"
                  onClick={() => handleCopyMessage(codeText, `code-${sIdx}`)}
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  {copiedMessageId === `code-${sIdx}` ? <Check size={10} className="text-emerald-400" /> : <Copy size={10} />}
                  <span>{copiedMessageId === `code-${sIdx}` ? "Copied" : "Copy"}</span>
                </button>
              </div>
              <pre className="p-2.5 overflow-x-auto leading-relaxed">{codeText}</pre>
            </div>
          );
        }
        return formatSimpleMarkdown(segment, sIdx);
      });
    }
    return formatSimpleMarkdown(content, 0);
  };

  if (!isOpen) return null;

  return (
    <div
      className={`sv-chat-window ${activeViewMode === "drawer" ? "drawer-mode" : "floating-mode"} ${
        isExpanded ? "expanded" : ""
      }`}
    >
      {/* Header Bar */}
      <div className="sv-chat-header">
        <div className="sv-chat-header-brand">
          <div className="sv-chat-avatar">
            <Bot size={16} />
          </div>
          <div className="sv-chat-meta">
            <div className="sv-chat-title-row">
              <h3 className="sv-chat-title">Antigravity Agent</h3>
              <span
                onClick={() => setShowEndpointModal((prev) => !prev)}
                className={isDaemonOnline ? "sv-chat-badge-online" : "sv-chat-badge-offline"}
                style={{ cursor: "pointer" }}
                title="Click to view or edit bridge endpoint"
              >
                <span
                  className={`sv-chat-status-dot ${isDaemonOnline ? "online" : "offline"}`}
                  style={{ position: "static", width: "5px", height: "5px" }}
                />
                {isDaemonOnline ? "Port 5050 Active" : "Bridge Offline (Tap to Configure)"}
              </span>
            </div>
            <p className="sv-chat-subtitle">Autonomous CRM &amp; 5-Node Operator</p>
          </div>
        </div>

        {/* Header Controls */}
        <div className="sv-chat-controls">
          <button
            type="button"
            onClick={toggleSound}
            title={soundEnabled ? "Mute sound" : "Enable sound"}
            className="sv-chat-icon-btn"
          >
            {soundEnabled ? <Volume2 size={13} /> : <VolumeX size={13} />}
          </button>

          <button
            type="button"
            onClick={() => setActiveViewMode((prev) => (prev === "drawer" ? "floating" : "drawer"))}
            title={activeViewMode === "drawer" ? "Switch to Floating Deck" : "Dock to Side Drawer"}
            className="sv-chat-icon-btn"
          >
            <Layers size={13} />
          </button>

          <button
            type="button"
            onClick={() => setIsExpanded((prev) => !prev)}
            title={isExpanded ? "Standard width" : "Expand width"}
            className="sv-chat-icon-btn"
          >
            {isExpanded ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
          </button>

          <button
            type="button"
            onClick={clearChatHistory}
            title="Clear Chat History"
            className="sv-chat-icon-btn danger"
          >
            <Trash2 size={13} />
          </button>

          <button
            type="button"
            onClick={checkDaemonStatus}
            title="Refresh Daemon Status"
            className="sv-chat-icon-btn"
          >
            <RefreshCw size={13} className={isLoading ? "animate-spin" : ""} />
          </button>

          <button
            type="button"
            onClick={onClose}
            className="sv-chat-icon-btn"
          >
            <X size={15} />
          </button>
        </div>
      </div>

      {/* Endpoint Configuration Bar */}
      {showEndpointModal && (
        <div style={{ padding: "8px 12px", background: "#0b1329", borderBottom: "1px solid #1e293b", fontSize: "11px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
            <span style={{ fontWeight: 600, color: "#93c5fd" }}>Bridge Endpoint URL (Mobile Remote Control)</span>
            <button
              type="button"
              onClick={() => setShowEndpointModal(false)}
              style={{ background: "none", border: "none", color: "#94a3b8", cursor: "pointer", fontSize: "11px" }}
            >
              Close
            </button>
          </div>
          <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
            <input
              type="text"
              value={customEndpointInput}
              onChange={(e) => setCustomEndpointInput(e.target.value)}
              placeholder="e.g. https://...lhr.life"
              style={{
                flex: 1,
                padding: "5px 8px",
                background: "#020617",
                border: "1px solid #334155",
                color: "#f8fafc",
                borderRadius: "4px",
                fontSize: "11px",
                fontFamily: "monospace",
              }}
            />
            <button
              type="button"
              onClick={handleSaveCustomEndpoint}
              style={{
                padding: "5px 12px",
                background: "#10b981",
                color: "#020617",
                fontWeight: 600,
                borderRadius: "4px",
                border: "none",
                cursor: "pointer",
                fontSize: "11px",
              }}
            >
              Save
            </button>
            <button
              type="button"
              onClick={handleAutoSyncEndpoint}
              style={{
                padding: "5px 10px",
                background: "#1e293b",
                color: "#e2e8f0",
                borderRadius: "4px",
                border: "1px solid #334155",
                cursor: "pointer",
                fontSize: "11px",
              }}
              title="Sync latest live tunnel URL from GitHub"
            >
              Auto-Sync
            </button>
          </div>
          <div style={{ marginTop: "4px", fontSize: "9.5px", color: "#64748b" }}>
            Current target: <code style={{ color: "#38bdf8" }}>{activeEndpointUrl}</code>
          </div>
        </div>
      )}

      {/* Quick Prompts Category Selector & Chips */}
      <div className="sv-chat-categories-bar">
        <div className="sv-chat-category-tabs">
          <button
            type="button"
            onClick={() => setActiveCategory("pipeline")}
            className={`sv-chat-cat-tab ${activeCategory === "pipeline" ? "active" : ""}`}
          >
            <Activity size={12} />
            <span>Pipeline</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory("telemetry")}
            className={`sv-chat-cat-tab ${activeCategory === "telemetry" ? "active" : ""}`}
          >
            <Radio size={12} />
            <span>Telemetry</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory("leads")}
            className={`sv-chat-cat-tab ${activeCategory === "leads" ? "active" : ""}`}
          >
            <Database size={12} />
            <span>Leads</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory("antichat")}
            className={`sv-chat-cat-tab ${activeCategory === "antichat" ? "active" : ""}`}
          >
            <Terminal size={12} />
            <span>Console</span>
            <span className={`sv-tab-status-pill ${isAntiChatUnlocked ? "unlocked" : "locked"}`}>
              {isAntiChatUnlocked ? "Active" : "Locked"}
            </span>
          </button>
        </div>

        <div className="sv-chat-chips-scroll">
          {promptCategories[activeCategory].map((p, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSend(p.text)}
              className="sv-chat-chip-btn"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Messages Thread Container */}
      <div className="sv-chat-messages-scroll">
        {activeCategory === "antichat" && !isAntiChatUnlocked ? (
          <div className="sv-antichat-gate">
            <div className="sv-antichat-gate-icon-wrap">
              <KeyRound size={20} />
            </div>
            <h4 className="sv-antichat-gate-title">Antigravity Workstation Access</h4>
            <p className="sv-antichat-gate-desc">
              Direct access to inspect &amp; edit source code, execute git workflows, and run terminal commands on your workstation. Enter executive passcode to unlock.
            </p>
            <form onSubmit={handleUnlockAntiChat} className="sv-antichat-gate-form">
              <div className="sv-antichat-input-row">
                <ShieldCheck size={14} color="#10b981" />
                <input
                  type="password"
                  value={passcodeInput}
                  onChange={(e) => {
                    setPasscodeInput(e.target.value);
                    setPasscodeError("");
                  }}
                  placeholder="Enter passcode (e.g. anti-ops)"
                  autoFocus
                />
              </div>
              <button
                type="submit"
                disabled={isVerifyingPasscode}
                className="sv-antichat-unlock-btn"
              >
                {isVerifyingPasscode ? (
                  <>
                    <RefreshCw size={12} className="animate-spin" />
                    <span>Verifying...</span>
                  </>
                ) : (
                  <>
                    <KeyRound size={12} />
                    <span>Unlock Workstation Console</span>
                  </>
                )}
              </button>
              {passcodeError && (
                <span className="sv-antichat-gate-error">{passcodeError}</span>
              )}
            </form>
          </div>
        ) : (
          <>
            {activeCategory === "antichat" && isAntiChatUnlocked && (
              <div className="sv-antichat-unlocked-banner">
                <div className="sv-antichat-badge-active">
                  <ShieldCheck size={12} />
                  <span>Workstation Active (Read-Write Mode)</span>
                </div>
                <button
                  type="button"
                  onClick={handleRelockAntiChat}
                  className="sv-antichat-relock-btn"
                  title="Lock workstation console"
                >
                  <KeyRound size={10} />
                  <span>Lock</span>
                </button>
              </div>
            )}
            {messages.map((msg) => {
          const isUser = msg.role === "user";
          return (
            <div
              key={msg.id}
              className={`sv-chat-msg-row ${isUser ? "user" : "bot"}`}
            >
              <div className={`sv-chat-msg-avatar ${isUser ? "user" : "bot"}`}>
                {isUser ? <User size={12} /> : <Bot size={13} />}
              </div>

              <div className={`sv-chat-msg-bubble ${isUser ? "user" : "bot"}`}>
                {/* 1-Click Copy on message hover */}
                {!isUser && (
                  <button
                    type="button"
                    onClick={() => handleCopyMessage(msg.content, msg.id)}
                    title="Copy message content"
                    className="sv-chat-copy-btn"
                  >
                    {copiedMessageId === msg.id ? <Check size={11} color="#059669" /> : <Copy size={11} />}
                  </button>
                )}

                {isUser ? (
                  <div
                    className="sv-user-msg-content"
                    style={{
                      margin: 0,
                      color: "#f0fdf4",
                      fontSize: "11px",
                      lineHeight: "1.55",
                      fontWeight: 450,
                      wordBreak: "break-word",
                    }}
                  >
                    {stripAntiChatPrefix(msg.content)}
                  </div>
                ) : (
                  <div className="sv-bot-msg-content">
                    {formatContent(stripAntiChatPrefix(msg.content))}
                  </div>
                )}

                {msg.actionTaken && (
                  <div className="sv-chat-msg-action">
                    <CheckCircle2 size={11} />
                    <span>Action: {msg.actionTaken}</span>
                  </div>
                )}

                <span className="sv-chat-msg-time">{msg.timestamp}</span>
              </div>
            </div>
          );
        })}

            {isLoading && (
              <div className="sv-chat-msg-row bot">
                <div className="sv-chat-msg-avatar bot">
                  <Bot size={13} />
                </div>
                <div className="sv-chat-msg-bubble bot">
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#64748b", fontSize: "10.5px" }}>
                    <RefreshCw size={11} className="animate-spin" />
                    <span>{activeCategory === "antichat" ? "Executing command..." : "Processing request..."}</span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input Area Form */}
      <div className="sv-chat-input-area">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="sv-chat-form"
        >
          {recognitionRef.current && (
            <button
              type="button"
              onClick={toggleListening}
              title={isListening ? "Listening... click to stop" : "Speak command via microphone"}
              className={`sv-chat-mic-btn ${isListening ? "active" : ""}`}
            >
              {isListening ? <MicOff size={14} /> : <Mic size={14} />}
            </button>
          )}

          <div className="sv-chat-input-wrapper">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={activeCategory === "antichat" && !isAntiChatUnlocked}
              placeholder={
                activeCategory === "antichat" && !isAntiChatUnlocked
                  ? "Console locked. Enter passcode above to unlock..."
                  : activeCategory === "antichat"
                  ? "Ask Antigravity: e.g. 'where are we on mails?', 'git status', 'read src/styles.css'..."
                  : isListening
                  ? "Listening to voice command..."
                  : isDaemonOnline
                  ? "Type a command (e.g. 'Show telemetry', 'Add lead')..."
                  : "Daemon offline. Run crm_daemon_bridge.py..."
              }
              className="sv-chat-text-input"
            />
            {input && (
              <button
                type="button"
                onClick={() => setInput("")}
                className="sv-chat-clear-input-btn"
                title="Clear input"
              >
                <X size={12} />
              </button>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="sv-chat-send-btn"
          >
            <Send size={13} />
          </button>
        </form>

        <div className="sv-chat-footer-meta">
          <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
            <Database size={10} color="#10b981" />
            <span>SQLite Master · 0 Latency</span>
          </span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
            <ShieldCheck size={10} color="#94a3b8" />
            <span>5-Mailbox Cluster</span>
          </span>
        </div>
      </div>
    </div>
  );
}
