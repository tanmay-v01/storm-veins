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

  // Check daemon status
  useEffect(() => {
    checkDaemonStatus();
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
      className={`fixed z-50 bg-white border border-slate-200 shadow-2xl flex flex-col font-['Sora',sans-serif] transition-all duration-200 ${
        activeViewMode === "drawer"
          ? `inset-y-0 right-0 ${isExpanded ? "w-full sm:w-[580px]" : "w-full sm:w-[420px]"}`
          : `bottom-6 right-6 ${isExpanded ? "w-[560px] h-[720px]" : "w-[420px] h-[600px]"} rounded-2xl`
      }`}
    >
      {/* Header Bar */}
      <div className="p-3.5 border-b border-slate-200 bg-slate-50/90 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-emerald-600 flex items-center justify-center text-white shadow-xs">
            <Bot size={15} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xs font-semibold text-slate-900 tracking-tight">Antigravity Agent</h3>
              <span
                className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9px] font-semibold ${
                  isDaemonOnline
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                    : "bg-amber-50 text-amber-700 border border-amber-200"
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${isDaemonOnline ? "bg-emerald-500 animate-pulse" : "bg-amber-500"}`} />
                {isDaemonOnline ? "Port 5050 Active" : "Bridge Offline"}
              </span>
            </div>
            <p className="text-[10px] text-slate-500">Autonomous CRM & 5-Node Operator</p>
          </div>
        </div>

        {/* Header Controls */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={toggleSound}
            title={soundEnabled ? "Mute sound" : "Enable sound"}
            className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-md transition-colors cursor-pointer"
          >
            {soundEnabled ? <Volume2 size={13} /> : <VolumeX size={13} />}
          </button>

          <button
            type="button"
            onClick={() => setActiveViewMode((prev) => (prev === "drawer" ? "floating" : "drawer"))}
            title={activeViewMode === "drawer" ? "Switch to Floating Deck" : "Dock to Side Drawer"}
            className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-md transition-colors cursor-pointer hidden sm:block"
          >
            <Layers size={13} />
          </button>

          <button
            type="button"
            onClick={() => setIsExpanded((prev) => !prev)}
            title={isExpanded ? "Standard width" : "Expand width"}
            className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-md transition-colors cursor-pointer hidden sm:block"
          >
            {isExpanded ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
          </button>

          <button
            type="button"
            onClick={clearChatHistory}
            title="Clear Chat History"
            className="p-1 text-slate-400 hover:text-rose-600 hover:bg-slate-200/60 rounded-md transition-colors cursor-pointer"
          >
            <Trash2 size={13} />
          </button>

          <button
            type="button"
            onClick={checkDaemonStatus}
            title="Refresh Daemon Status"
            className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-md transition-colors cursor-pointer"
          >
            <RefreshCw size={13} className={isLoading ? "animate-spin" : ""} />
          </button>

          <button
            type="button"
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-800 hover:bg-slate-200/60 rounded-md transition-colors cursor-pointer"
          >
            <X size={15} />
          </button>
        </div>
      </div>

      {/* Quick Prompts Category Selector & Chips */}
      <div className="border-b border-slate-200/80 bg-slate-50/50 shrink-0">
        <div className="px-3 pt-2 flex items-center gap-3 text-[10px] font-semibold text-slate-500 border-b border-slate-200/60">
          <button
            type="button"
            onClick={() => setActiveCategory("pipeline")}
            className={`pb-1.5 transition-colors cursor-pointer ${
              activeCategory === "pipeline"
                ? "text-emerald-700 border-b-2 border-emerald-600"
                : "hover:text-slate-800"
            }`}
          >
            ⚡ Pipeline
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory("telemetry")}
            className={`pb-1.5 transition-colors cursor-pointer ${
              activeCategory === "telemetry"
                ? "text-emerald-700 border-b-2 border-emerald-600"
                : "hover:text-slate-800"
            }`}
          >
            📊 Telemetry
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory("leads")}
            className={`pb-1.5 transition-colors cursor-pointer ${
              activeCategory === "leads"
                ? "text-emerald-700 border-b-2 border-emerald-600"
                : "hover:text-slate-800"
            }`}
          >
            🎯 Lead Ops
          </button>
        </div>

        <div className="px-3 py-1.5 overflow-x-auto no-scrollbar flex items-center gap-1.5 whitespace-nowrap">
          {promptCategories[activeCategory].map((p, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSend(p.text)}
              className="text-[10px] font-medium text-slate-700 hover:text-emerald-800 bg-white hover:bg-emerald-50/80 border border-slate-200 hover:border-emerald-300 rounded-full px-2.5 py-0.5 transition-all shadow-2xs shrink-0 cursor-pointer"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Messages Thread Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/40">
        {messages.map((msg) => {
          const isUser = msg.role === "user";
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-2.5 ${isUser ? "flex-row-reverse" : "flex-row"}`}
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-[10px] font-semibold ${
                  isUser
                    ? "bg-slate-900 text-white shadow-2xs"
                    : "bg-emerald-100 text-emerald-800 border border-emerald-200"
                }`}
              >
                {isUser ? <User size={12} /> : <Bot size={13} />}
              </div>

              <div
                className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 shadow-2xs text-[11px] relative group ${
                  isUser
                    ? "bg-slate-900 text-white rounded-tr-none"
                    : "bg-white text-slate-800 border border-slate-200/90 rounded-tl-none"
                }`}
              >
                {/* 1-Click Copy on message hover */}
                {!isUser && (
                  <button
                    type="button"
                    onClick={() => handleCopyMessage(msg.content, msg.id)}
                    title="Copy message content"
                    className="absolute top-2 right-2 p-1 text-slate-400 hover:text-slate-700 bg-white/80 rounded border border-slate-100 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer shadow-2xs"
                  >
                    {copiedMessageId === msg.id ? <Check size={11} className="text-emerald-600" /> : <Copy size={11} />}
                  </button>
                )}

                {isUser ? (
                  <p className="leading-relaxed">{msg.content}</p>
                ) : (
                  <div>{formatContent(msg.content)}</div>
                )}

                {msg.actionTaken && (
                  <div className="mt-2 pt-1.5 border-t border-slate-100 flex items-center gap-1.5 text-[9.5px] text-emerald-600 font-medium font-mono">
                    <CheckCircle2 size={10} />
                    <span>Action: {msg.actionTaken}</span>
                  </div>
                )}

                <span
                  className={`block text-[9px] mt-1 text-right font-mono ${
                    isUser ? "text-slate-400" : "text-slate-400"
                  }`}
                >
                  {msg.timestamp}
                </span>
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-start gap-2.5">
            <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 border border-emerald-200">
              <Bot size={13} />
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-none px-3.5 py-2.5 shadow-2xs flex items-center gap-2 text-[11px] text-slate-500">
              <RefreshCw size={11} className="animate-spin text-emerald-600" />
              <span>Antigravity reasoning & querying SQLite...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-3 border-t border-slate-200 bg-white shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-1.5"
        >
          {recognitionRef.current && (
            <button
              type="button"
              onClick={toggleListening}
              title={isListening ? "Listening... click to stop" : "Speak command via microphone"}
              className={`p-2 rounded-xl transition-all cursor-pointer ${
                isListening
                  ? "bg-rose-500 text-white animate-pulse"
                  : "bg-slate-100 hover:bg-slate-200 text-slate-600"
              }`}
            >
              {isListening ? <MicOff size={13} /> : <Mic size={13} />}
            </button>
          )}

          <div className="relative flex-1 flex items-center">
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
              className="w-full pl-3 pr-7 py-2 text-[11px] bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-1.5 focus:ring-emerald-500 focus:border-emerald-500 focus:bg-white text-slate-900 placeholder:text-slate-400 transition-all font-['Sora',sans-serif]"
            />
            {input && (
              <button
                type="button"
                onClick={() => setInput("")}
                className="absolute right-2 text-slate-400 hover:text-slate-600 p-0.5 rounded cursor-pointer"
                title="Clear input"
              >
                <X size={12} />
              </button>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="p-2 rounded-xl bg-slate-900 hover:bg-emerald-700 text-white font-medium disabled:opacity-40 transition-colors shadow-2xs cursor-pointer"
          >
            <Send size={13} />
          </button>
        </form>

        <div className="mt-2 flex items-center justify-between text-[9px] text-slate-400 px-1 font-mono">
          <span className="flex items-center gap-1">
            <Database size={9} className="text-emerald-500" />
            <span>SQLite Master · 0 Latency</span>
          </span>
          <span className="flex items-center gap-1">
            <ShieldCheck size={9} className="text-slate-400" />
            <span>5-Mailbox Cluster</span>
          </span>
        </div>
      </div>
    </div>
  );
}
