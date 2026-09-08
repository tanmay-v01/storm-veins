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
  MessageSquare
} from "lucide-react";
import { getBridgeBaseUrl } from "../../config/bridgeConfig";

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

export default function AIChatBot({ isOpen, onClose, onLeadModified }: AIChatBotProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem("sv_chat_history");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {}
    }
    return [
      {
        id: "welcome-1",
        role: "assistant",
        content:
          "👋 **Antigravity Operations Agent Online**.\n\nConnected to `stormveins_crm.db` (SQLite) and your 5-mailbox Hostinger cluster. You can instruct me in natural language to manage leads, trigger sync passes, or inspect quotas.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ];
  });

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDaemonOnline, setIsDaemonOnline] = useState(false);
  const [activeCategory, setActiveCategory] = useState<"pipeline" | "telemetry" | "leads">("pipeline");
  const [soundEnabled, setSoundEnabled] = useState(() => localStorage.getItem("sv_chat_sound") !== "false");
  const [isExpanded, setIsExpanded] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);
  const [activeViewMode, setActiveViewMode] = useState<"drawer" | "floating">("drawer");

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  // Save messages to local storage
  useEffect(() => {
    localStorage.setItem("sv_chat_history", JSON.stringify(messages.slice(-40)));
  }, [messages]);

  // Check daemon status & fetch SQLite history
  useEffect(() => {
    checkDaemonStatus();
    const fetchBackendHistory = async () => {
      try {
        const res = await fetch(`${getBridgeBaseUrl()}/api/agent/history`);
        if (res.ok) {
          const data = await res.json();
          if (data.messages && data.messages.length > 0) {
            const formatted: ChatMessage[] = data.messages.map((m: any) => ({
              id: `db-msg-${m.id}`,
              role: m.role,
              content: m.content,
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
    const interval = setInterval(checkDaemonStatus, 12000);
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

  const checkDaemonStatus = async () => {
    try {
      const res = await fetch(`${getBridgeBaseUrl()}/api/status`, { method: "GET" });
      if (res.ok) {
        setIsDaemonOnline(true);
      } else {
        setIsDaemonOnline(false);
      }
    } catch {
      setIsDaemonOnline(false);
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
      content: "🧹 **Chat history cleared**. Pipeline and SQLite connection intact. How can I assist you?",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages([defaultMsg]);
  };

  const handleCopyMessage = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedMessageId(id);
    setTimeout(() => setCopiedMessageId(null), 2000);
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

    try {
      const response = await fetch(`${getBridgeBaseUrl()}/api/agent/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      if (!response.ok) {
        throw new Error(`Bridge returned HTTP ${response.status}`);
      }

      const data = await response.json();
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: "assistant",
        content: data.reply || "Action processed successfully.",
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
        content: `⚠️ **Antigravity Daemon Bridge Offline**\n\nCould not connect to \`${getBridgeBaseUrl()}\`.\n\n*Error details: ${err.message}*\n\nPlease verify that \`outreach/crm_daemon_bridge.py\` is running in the background.`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, errorMsg]);
      setIsDaemonOnline(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Categorized quick prompts
  const promptCategories = {
    pipeline: [
      { label: "⚡ Run Pipeline Pass", text: "Trigger full autonomous pipeline pass" },
      { label: "🔄 Sync IMAP & Bounces", text: "Sync inboxes and scan bounces" },
      { label: "📅 Sept 11 Cadence", text: "What followups are due on Sept 11?" },
      { label: "⚙️ Workflow Status", text: "Show workflow orchestrator status" },
    ],
    telemetry: [
      { label: "📊 Mailbox Quotas", text: "Show mailbox telemetry and quotas" },
      { label: "📈 Master CRM Stats", text: "Show CRM summary & delivery stats" },
      { label: "🛡️ Delivery Health", text: "Show bounce rate and deliverability" },
    ],
    leads: [
      { label: "➕ Add Lead Template", text: "Add lead: Acme Industrial, John Doe, Managing Director, john@acmeind.com, manufacturing, Mumbai" },
      { label: "🔍 Search Lead", text: "Show status for FlameGuard" },
      { label: "✅ Mark Replied", text: "Mark Acme Industrial as replied" },
    ],
  };

  // Markdown Formatter with Clean Typography (3-4px smaller, minimal, Sora font)
  // Enhanced Markdown Formatter with Clean Typography (3-4px smaller, minimal, Sora font)
  const formatSimpleMarkdown = (text: string, baseKey: number) => {
    const lines = text.split("\n");
    return lines.map((line, idx) => {
      const key = `${baseKey}-${idx}`;
      // Bold **text** and `code`
      const parts = line.split(/(\*\*.*?\*\*|`.*?`)/g);
      const renderedParts = parts.map((part, pIdx) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={pIdx} className="font-semibold text-slate-900">
              {part.slice(2, -2)}
            </strong>
          );
        }
        if (part.startsWith("`") && part.endsWith("`")) {
          return (
            <code
              key={pIdx}
              className="px-1 py-0.5 bg-slate-100 text-slate-800 rounded text-[9.5px] font-mono border border-slate-200"
            >
              {part.slice(1, -1)}
            </code>
          );
        }
        return part;
      });

      if (line.startsWith("# ")) {
        return (
          <h3 key={key} className="font-semibold text-slate-900 text-xs mt-2.5 mb-1 tracking-tight">
            {renderedParts}
          </h3>
        );
      }
      if (line.startsWith("## ")) {
        return (
          <h4 key={key} className="font-semibold text-slate-900 text-[11.5px] mt-2 mb-1 tracking-tight">
            {renderedParts}
          </h4>
        );
      }
      if (line.startsWith("### ")) {
        return (
          <h5 key={key} className="font-semibold text-slate-900 text-[11px] mt-1.5 mb-0.5 tracking-tight">
            {renderedParts}
          </h5>
        );
      }
      if (line.startsWith("---")) {
        return <hr key={key} className="my-2 border-slate-200/80" />;
      }
      if (/^\d+\.\s/.test(line)) {
        const numMatch = line.match(/^(\d+)\.\s(.*)$/);
        return (
          <div key={key} className="flex items-start gap-1.5 ml-1 my-0.5 text-[11px] text-slate-700">
            <span className="font-mono text-[10px] text-emerald-600 font-semibold">{numMatch ? numMatch[1] : "1"}.</span>
            <div className="leading-relaxed">{renderedParts}</div>
          </div>
        );
      }
      if (line.startsWith("- ") || line.startsWith("* ")) {
        return (
          <div key={key} className="flex items-start gap-1.5 ml-1 my-0.5 text-[11px] text-slate-700">
            <span className="text-emerald-500 font-bold leading-tight">•</span>
            <div className="leading-relaxed">{renderedParts}</div>
          </div>
        );
      }
      if (!line.trim()) {
        return <div key={key} className="h-1.5" />;
      }
      return (
        <p key={key} className="text-[11px] text-slate-700 leading-relaxed my-0.5">
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
              <span className={isDaemonOnline ? "sv-chat-badge-online" : "sv-chat-badge-offline"}>
                <span
                  className={`sv-chat-status-dot ${isDaemonOnline ? "online" : "offline"}`}
                  style={{ position: "static", width: "5px", height: "5px" }}
                />
                {isDaemonOnline ? "Port 5050 Active" : "Bridge Offline"}
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

      {/* Quick Prompts Category Selector & Chips */}
      <div className="sv-chat-categories-bar">
        <div className="sv-chat-category-tabs">
          <button
            type="button"
            onClick={() => setActiveCategory("pipeline")}
            className={`sv-chat-cat-tab ${activeCategory === "pipeline" ? "active" : ""}`}
          >
            ⚡ Pipeline
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory("telemetry")}
            className={`sv-chat-cat-tab ${activeCategory === "telemetry" ? "active" : ""}`}
          >
            📊 Telemetry
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory("leads")}
            className={`sv-chat-cat-tab ${activeCategory === "leads" ? "active" : ""}`}
          >
            🎯 Lead Ops
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
                  <p style={{ margin: 0 }}>{msg.content}</p>
                ) : (
                  <div>{formatContent(msg.content)}</div>
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
            <div
              className="sv-chat-msg-bubble bot"
              style={{ display: "flex", alignItems: "center", gap: "8px", color: "#64748b" }}
            >
              <RefreshCw size={12} className="animate-spin" color="#059669" />
              <span>Antigravity reasoning &amp; querying SQLite...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
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
              placeholder={
                isListening
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
