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
  ExternalLink,
  ShieldCheck,
  Radio,
  Sliders,
  AlertCircle
} from "lucide-react";

interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  actionTaken?: string;
  timestamp: string;
}

import { getBridgeBaseUrl } from "../../config/bridgeConfig";

interface AIChatBotProps {
  isOpen: boolean;
  onClose: () => void;
  onLeadModified?: () => void;
}

export default function AIChatBot({ isOpen, onClose, onLeadModified }: AIChatBotProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome-1",
      role: "assistant",
      content:
        "👋 **Antigravity Operations Agent Online**.\n\nConnected to `stormveins_crm.db` (SQLite) and your 5-mailbox cluster. How can I assist your pipeline today?",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDaemonOnline, setIsDaemonOnline] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    { label: "⚡ Sync Inboxes & Bounces", text: "Sync inboxes and scan bounces" },
    { label: "📅 Show Sept 11 Follow-Ups", text: "What followups are due on Sept 11?" },
    { label: "📊 Mailbox Telemetry", text: "Show mailbox telemetry and quotas" },
    { label: "📈 CRM Overview & Stats", text: "Show CRM summary & delivery stats" },
    { label: "➕ Add Fast Lead", text: "Add lead: Apex Digital, Sarah Jenkins, Chief Growth Officer, sarah@apexdigital.co, enterprise, London" },
  ];

  // Check daemon status on mount
  useEffect(() => {
    checkDaemonStatus();
    const interval = setInterval(checkDaemonStatus, 15000);
    return () => clearInterval(interval);
  }, []);

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

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text || isLoading) return;

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

      setMessages((prev) => [...prev, botMsg]);
      setIsDaemonOnline(true);

      // If an action was taken that modifies leads, trigger parent refresh
      if (data.actionTaken && data.actionTaken.startsWith("CREATED_LEAD") || data.actionTaken.startsWith("STATUS_UPDATED") || data.actionTaken === "INBOX_SYNCED") {
        if (onLeadModified) onLeadModified();
      }
    } catch (err: any) {
      const errorMsg: ChatMessage = {
        id: `bot-err-${Date.now()}`,
        role: "assistant",
        content: `⚠️ **Antigravity Daemon Offline or Unreachable**\n\nCould not connect to \`http://localhost:5050\`. Please ensure the bridge daemon is running via \`python outreach/crm_daemon_bridge.py\` or \`outreach/run_crm_bridge.bat\`.\n\n*Error details: ${err.message}*`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, errorMsg]);
      setIsDaemonOnline(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Helper to render basic markdown bold and bullet points
  const formatContent = (content: string) => {
    const lines = content.split("\n");
    return lines.map((line, idx) => {
      let formattedLine = line;

      // Handle bold **text**
      const parts = formattedLine.split(/(\*\*.*?\*\*)/g);
      const renderedParts = parts.map((part, pIdx) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return <strong key={pIdx} className="font-semibold text-slate-900">{part.slice(2, -2)}</strong>;
        }
        if (part.startsWith("`") && part.endsWith("`")) {
          return (
            <code key={pIdx} className="px-1 py-0.5 bg-slate-100 text-slate-800 rounded text-[11px] font-mono border border-slate-200">
              {part.slice(1, -1)}
            </code>
          );
        }
        return part;
      });

      if (line.startsWith("### ")) {
        return (
          <h4 key={idx} className="font-semibold text-slate-900 text-sm mt-2 mb-1">
            {renderedParts}
          </h4>
        );
      }
      if (line.startsWith("- ")) {
        return (
          <div key={idx} className="flex items-start gap-1.5 ml-1 my-0.5 text-xs text-slate-700">
            <span className="text-emerald-500 font-bold">•</span>
            <div>{renderedParts}</div>
          </div>
        );
      }
      return (
        <p key={idx} className="text-xs text-slate-700 leading-relaxed my-1">
          {renderedParts}
        </p>
      );
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[440px] bg-white border-l border-slate-200 shadow-2xl flex flex-col font-['Sora',sans-serif] animate-in slide-in-from-right duration-200">
      {/* Drawer Header */}
      <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white shadow-sm">
            <Bot size={18} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold text-slate-900 tracking-tight">Antigravity AI Agent</h3>
              <span
                className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-medium ${
                  isDaemonOnline ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-amber-50 text-amber-700 border border-amber-200"
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${isDaemonOnline ? "bg-emerald-500 animate-pulse" : "bg-amber-500"}`} />
                {isDaemonOnline ? "Port 5050 Active" : "Bridge Offline"}
              </span>
            </div>
            <p className="text-[11px] text-slate-500">Autonomous CRM & Cluster Operator</p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={checkDaemonStatus}
            title="Refresh Daemon Status"
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-200/50 rounded-lg transition-colors"
          >
            <RefreshCw size={14} className={isLoading ? "animate-spin" : ""} />
          </button>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-200/50 rounded-lg transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Quick Prompts Carousel / Pills */}
      <div className="px-3 py-2 bg-slate-100/70 border-b border-slate-200/80 overflow-x-auto no-scrollbar flex items-center gap-1.5 whitespace-nowrap">
        {quickPrompts.map((p, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(p.text)}
            className="text-[11px] font-medium text-slate-700 hover:text-emerald-700 bg-white hover:bg-emerald-50/70 border border-slate-200 hover:border-emerald-300 rounded-full px-2.5 py-1 transition-all shadow-xs shrink-0"
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Messages Thread */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/40">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
          >
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-[11px] font-semibold ${
                msg.role === "user"
                  ? "bg-slate-900 text-white shadow-xs"
                  : "bg-emerald-100 text-emerald-800 border border-emerald-200"
              }`}
            >
              {msg.role === "user" ? <User size={13} /> : <Bot size={14} />}
            </div>

            <div
              className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 shadow-xs text-xs ${
                msg.role === "user"
                  ? "bg-slate-900 text-white rounded-tr-none"
                  : "bg-white text-slate-800 border border-slate-200/90 rounded-tl-none"
              }`}
            >
              {msg.role === "user" ? (
                <p className="leading-relaxed">{msg.content}</p>
              ) : (
                <div>{formatContent(msg.content)}</div>
              )}

              {msg.actionTaken && (
                <div className="mt-2 pt-2 border-t border-slate-100 flex items-center gap-1.5 text-[10px] text-emerald-600 font-medium font-mono">
                  <CheckCircle2 size={11} />
                  <span>Action: {msg.actionTaken}</span>
                </div>
              )}

              <span
                className={`block text-[9px] mt-1 text-right ${
                  msg.role === "user" ? "text-slate-400" : "text-slate-400"
                }`}
              >
                {msg.timestamp}
              </span>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-start gap-2.5">
            <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 border border-emerald-200">
              <Bot size={14} />
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-none px-4 py-3 shadow-xs flex items-center gap-2 text-xs text-slate-500">
              <RefreshCw size={12} className="animate-spin text-emerald-600" />
              <span>Antigravity reasoning & querying SQLite...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-3 border-t border-slate-200 bg-white">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              isDaemonOnline
                ? "Ask agent or command pipeline (e.g. 'Show telemetry')..."
                : "Daemon offline. Run crm_daemon_bridge.py..."
            }
            className="flex-1 px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-1.5 focus:ring-emerald-500 focus:border-emerald-500 focus:bg-white text-slate-900 placeholder:text-slate-400 transition-all"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium disabled:opacity-40 transition-colors shadow-xs"
          >
            <Send size={14} />
          </button>
        </form>

        <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400 px-1">
          <span className="flex items-center gap-1">
            <Database size={10} className="text-emerald-500" />
            <span>SQLite Local DB · Zero Latency</span>
          </span>
          <span className="flex items-center gap-1">
            <ShieldCheck size={10} className="text-slate-400" />
            <span>Hostinger 5-Mailbox Cluster</span>
          </span>
        </div>
      </div>
    </div>
  );
}
