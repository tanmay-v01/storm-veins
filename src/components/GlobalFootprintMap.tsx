import { useState, useEffect, memo } from "react";
import { Clock, MapPin, Radio, Zap } from "lucide-react";
import { WORLD_MAP_PATH } from "./worldMapPath";

interface Hub {
  id: string;
  code: string;
  city: string;
  role: string;
  tz: string;
  tzOffsetLabel: string;
  x: number;
  y: number;
  labelOffsetX: number;
  labelOffsetY: number;
  activeSprints: number;
  latency: string;
  focus: string;
  principals: string;
}

const HUBS: Hub[] = [
  {
    id: "mumbai",
    code: "BOM",
    city: "Mumbai Global HQ",
    role: "Global Command & Principal Architecture",
    tz: "Asia/Kolkata",
    tzOffsetLabel: "IST (UTC+5:30)",
    x: 702.4,
    y: 253.5,
    labelOffsetX: 14,
    labelOffsetY: -12,
    activeSprints: 8,
    latency: "14ms",
    focus: "Principal Architecture, High-Velocity Engineering & Design Tokens",
    principals: "Managing Partners & Systems Directors",
  },
  {
    id: "london",
    code: "LON",
    city: "London Studio",
    role: "European Strategy & Brand World Direction",
    tz: "Europe/London",
    tzOffsetLabel: "GMT (UTC+0)",
    x: 499.6,
    y: 148.8,
    labelOffsetX: 14,
    labelOffsetY: -14,
    activeSprints: 5,
    latency: "22ms",
    focus: "Category Positioning, Sovereign Brand Worlds & Creative Direction",
    principals: "Strategy Directors & Creative Leads",
  },
  {
    id: "singapore",
    code: "SIN",
    city: "Singapore Pavilion",
    role: "APAC Edge Telemetry & Platform Ops",
    tz: "Asia/Singapore",
    tzOffsetLabel: "SGT (UTC+8)",
    x: 788.4,
    y: 303.9,
    labelOffsetX: 14,
    labelOffsetY: 12,
    activeSprints: 6,
    latency: "26ms",
    focus: "Low-Latency Edge Deployments & Cross-Border Sovereign Scaling",
    principals: "Performance Architects & Infrastructure Leads",
  },
  {
    id: "newyork",
    code: "NYC",
    city: "New York Flagship",
    role: "Americas Commercial Growth & Enterprise Pod",
    tz: "America/New_York",
    tzOffsetLabel: "EST (UTC-5)",
    x: 294.4,
    y: 186.8,
    labelOffsetX: 14,
    labelOffsetY: -14,
    activeSprints: 7,
    latency: "32ms",
    focus: "Commercial Acquisition Engines & Enterprise Growth Pods",
    principals: "Commercial Principals & Growth Architects",
  },
];

export const GlobalFootprintMap = memo(function GlobalFootprintMap() {
  const [activeHubId, setActiveHubId] = useState<string>("mumbai");
  const [times, setTimes] = useState<Record<string, string>>({});

  // Live real-time ticking clock for all 4 time zones
  useEffect(() => {
    const updateClocks = () => {
      const now = new Date();
      const updated: Record<string, string> = {};
      HUBS.forEach((hub) => {
        try {
          const formatter = new Intl.DateTimeFormat("en-US", {
            timeZone: hub.tz,
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
          });
          updated[hub.id] = formatter.format(now);
        } catch {
          updated[hub.id] = "--:--:--";
        }
      });
      setTimes(updated);
    };

    updateClocks();
    const interval = setInterval(updateClocks, 1000);
    return () => clearInterval(interval);
  }, []);

  const activeHub = HUBS.find((h) => h.id === activeHubId) || HUBS[0];

  return (
    <div className="global-map-card-luxury" role="region" aria-label="Interactive Global Infrastructure Map">
      {/* Top Telemetry Strip */}
      <div className="map-meta-strip">
        {HUBS.map((hub) => {
          const isActive = hub.id === activeHubId;
          return (
            <button
              key={hub.id}
              type="button"
              className={`map-city-chip ${isActive ? "active" : ""}`}
              onClick={() => setActiveHubId(hub.id)}
              aria-pressed={isActive}
            >
              <div className="chip-indicator">
                <span className={`chip-dot ${isActive ? "pulse" : ""}`} />
                <MapPin size={13} className="chip-pin-icon" />
              </div>
              <div className="chip-info">
                <div className="chip-header-line">
                  <span className="chip-code">{hub.code}</span>
                  <strong>{hub.city.replace(" Global HQ", "").replace(" Studio", "").replace(" Pavilion", "").replace(" Flagship", "")}</strong>
                </div>
                <div className="chip-time-line">
                  <span className="chip-live-clock">{times[hub.id] || "12:00:00"}</span>
                  <span className="chip-tz">{hub.tzOffsetLabel}</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Desktop Cartography & Telemetry View */}
      <div className="desktop-footprint-view">
        {/* Main Interactive Cartography Mesh */}
        <div className="map-visual-centerpiece">
          {/* SVG World Map & Telemetry Canvas */}
          <svg
            className="world-map-svg"
            viewBox="0 0 1000 500"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden="true"
          >
            <defs>
              {/* Emerald glow filter for nodes & active routes */}
              <filter id="emeraldGlow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Gradient for Telemetry Circuit */}
              <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#34d399" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0.8" />
              </linearGradient>

              <pattern id="gridPattern" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(14, 21, 19, 0.04)" strokeWidth="1" />
              </pattern>
            </defs>

            {/* Precision Coordinate Background Grid */}
            <rect width="1000" height="500" fill="url(#gridPattern)" />

            {/* Latitude & Longitude Coordinate Guidelines */}
            <line x1="0" y1="160" x2="1000" y2="160" stroke="rgba(16, 185, 129, 0.08)" strokeDasharray="3 6" />
            <line x1="0" y1="250" x2="1000" y2="250" stroke="rgba(16, 185, 129, 0.12)" strokeDasharray="4 6" />
            <line x1="0" y1="340" x2="1000" y2="340" stroke="rgba(16, 185, 129, 0.08)" strokeDasharray="3 6" />

            <line x1="294" y1="0" x2="294" y2="500" stroke="rgba(16, 185, 129, 0.06)" strokeDasharray="3 6" />
            <line x1="500" y1="0" x2="500" y2="500" stroke="rgba(16, 185, 129, 0.06)" strokeDasharray="3 6" />
            <line x1="702" y1="0" x2="702" y2="500" stroke="rgba(16, 185, 129, 0.06)" strokeDasharray="3 6" />
            <line x1="788" y1="0" x2="788" y2="500" stroke="rgba(16, 185, 129, 0.06)" strokeDasharray="3 6" />

            {/* Authentic Real World Continents (Natural Earth Cartography) */}
            <path
              d={WORLD_MAP_PATH}
              className="world-real-continents"
            />

            {/* Active Global Telemetry Routes (Curved Beziers Connecting Hubs) */}
            <g className="telemetry-routes">
              {/* Route 1: New York <-> London */}
              <path
                d="M 294.4,186.8 Q 397,112 499.6,148.8"
                fill="none"
                stroke="rgba(10, 107, 78, 0.22)"
                strokeWidth="2"
                strokeDasharray="4 4"
              />
              <path
                d="M 294.4,186.8 Q 397,112 499.6,148.8"
                fill="none"
                stroke="url(#routeGradient)"
                strokeWidth="2.5"
                strokeDasharray="18 180"
                className="animated-circuit-packet-1"
              />

              {/* Route 2: London <-> Mumbai HQ */}
              <path
                d="M 499.6,148.8 Q 601,168 702.4,253.5"
                fill="none"
                stroke="rgba(10, 107, 78, 0.25)"
                strokeWidth="2"
                strokeDasharray="4 4"
              />
              <path
                d="M 499.6,148.8 Q 601,168 702.4,253.5"
                fill="none"
                stroke="url(#routeGradient)"
                strokeWidth="3"
                strokeDasharray="24 160"
                className="animated-circuit-packet-2"
              />

              {/* Route 3: Mumbai HQ <-> Singapore */}
              <path
                d="M 702.4,253.5 Q 745,278 788.4,303.9"
                fill="none"
                stroke="rgba(10, 107, 78, 0.22)"
                strokeWidth="2"
                strokeDasharray="4 4"
              />
              <path
                d="M 702.4,253.5 Q 745,278 788.4,303.9"
                fill="none"
                stroke="url(#routeGradient)"
                strokeWidth="2.5"
                strokeDasharray="16 120"
                className="animated-circuit-packet-3"
              />

              {/* Route 4: Singapore <-> Global Trans-Pacific Edge to NYC */}
              <path
                d="M 788.4,303.9 Q 895,325 1000,318"
                fill="none"
                stroke="rgba(10, 107, 78, 0.18)"
                strokeWidth="1.5"
                strokeDasharray="3 5"
              />
              <path
                d="M 0,225 Q 145,210 294.4,186.8"
                fill="none"
                stroke="rgba(10, 107, 78, 0.18)"
                strokeWidth="1.5"
                strokeDasharray="3 5"
              />
            </g>

            {/* Expanding Radar Rings from Active Hub */}
            <g className="radar-waves">
              <circle
                cx={activeHub.x}
                cy={activeHub.y}
                r="24"
                fill="none"
                stroke="rgba(16, 185, 129, 0.45)"
                strokeWidth="1.5"
                className="radar-circle-1"
              />
              <circle
                cx={activeHub.x}
                cy={activeHub.y}
                r="48"
                fill="none"
                stroke="rgba(16, 185, 129, 0.25)"
                strokeWidth="1.2"
                className="radar-circle-2"
              />
              <circle
                cx={activeHub.x}
                cy={activeHub.y}
                r="76"
                fill="none"
                stroke="rgba(16, 185, 129, 0.12)"
                strokeWidth="1"
                className="radar-circle-3"
              />
            </g>

            {/* Hub Pins on SVG Canvas */}
            {HUBS.map((hub) => {
              const isSel = hub.id === activeHubId;
              return (
                <g
                  key={hub.id}
                  className={`svg-hub-group ${isSel ? "is-selected" : ""}`}
                  onClick={() => setActiveHubId(hub.id)}
                  style={{ cursor: "pointer" }}
                >
                  {/* Outer Glow Halo */}
                  <circle
                    cx={hub.x}
                    cy={hub.y}
                    r={isSel ? 16 : 10}
                    fill={isSel ? "rgba(16, 185, 129, 0.22)" : "rgba(10, 107, 78, 0.1)"}
                    filter="url(#emeraldGlow)"
                  />

                  {/* Core Node Circle */}
                  <circle
                    cx={hub.x}
                    cy={hub.y}
                    r={isSel ? 7 : 5}
                    fill={isSel ? "#10b981" : "#0a6b4e"}
                    stroke="#ffffff"
                    strokeWidth={isSel ? 2.5 : 1.8}
                  />

                  {/* City Callout Pill */}
                  <g transform={`translate(${hub.x + hub.labelOffsetX}, ${hub.y + hub.labelOffsetY})`}>
                    <rect
                      x="0"
                      y="-12"
                      width={isSel ? 115 : 92}
                      height="24"
                      rx="12"
                      fill={isSel ? "#0e1513" : "rgba(255, 255, 255, 0.94)"}
                      stroke={isSel ? "#10b981" : "rgba(14, 21, 19, 0.14)"}
                      strokeWidth={isSel ? 1.5 : 1}
                      filter="drop-shadow(0 4px 10px rgba(0,0,0,0.08))"
                    />
                    <text
                      x="12"
                      y="4"
                      fontFamily="Plus Jakarta Sans, sans-serif"
                      fontSize={isSel ? "11" : "10"}
                      fontWeight="700"
                      fill={isSel ? "#ffffff" : "#0e1513"}
                    >
                      {hub.code} · {hub.city.split(" ")[0]}
                    </text>
                  </g>
                </g>
              );
            })}
          </svg>

          {/* Floating Active Hub Inspection Dossier */}
          <div className="active-hub-dossier" aria-live="polite">
            <div className="dossier-top">
              <span className="dossier-badge">
                <Radio size={12} className="pulse-icon" />
                {activeHub.id === "mumbai" ? "GLOBAL COMMAND HUB" : "ACTIVE SPRINT POD"}
              </span>
              <span className="dossier-latency">
                <Zap size={12} /> {activeHub.latency} EDGE
              </span>
            </div>

            <div className="dossier-body">
              <h4 className="dossier-title">{activeHub.city}</h4>
              <p className="dossier-role">{activeHub.role}</p>
              <p className="dossier-focus">{activeHub.focus}</p>
            </div>

            <div className="dossier-stats-row">
              <div className="dossier-stat">
                <span className="stat-label">LOCAL CLOCK</span>
                <strong className="stat-value">{times[activeHub.id] || "12:00:00"}</strong>
              </div>
              <div className="dossier-stat">
                <span className="stat-label">LIVE SPRINTS</span>
                <strong className="stat-value text-emerald">{activeHub.activeSprints} Pods</strong>
              </div>
              <div className="dossier-stat">
                <span className="stat-label">ACCOUNTABILITY</span>
                <strong className="stat-value">{activeHub.principals.split(" ")[0]} Direct</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dedicated Mobile-Optimized Footprint View */}
      <div className="mobile-footprint-view">
        {/* Mobile Hub Selector Pill Strip */}
        <div className="mobile-hub-tabs" role="tablist" aria-label="Select Studio Location">
          {HUBS.map((hub) => {
            const isCurrent = hub.id === activeHubId;
            return (
              <button
                key={hub.id}
                type="button"
                role="tab"
                aria-selected={isCurrent}
                className={`mobile-hub-tab ${isCurrent ? "active" : ""}`}
                onClick={() => setActiveHubId(hub.id)}
              >
                <span className={`tab-dot ${isCurrent ? "pulse" : ""}`} />
                <span className="tab-code">{hub.code}</span>
                <span className="tab-name">{hub.city.split(" ")[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Hub Card (Mobile Executive Display) */}
        <div className="mobile-selected-hub-card">
          <div className="mobile-hub-header">
            <div className="mobile-hub-badge">
              <Radio size={12} className="pulse-icon" />
              <span>{activeHub.id === "mumbai" ? "GLOBAL HQ" : "REGIONAL POD"}</span>
            </div>
            <div className="mobile-hub-clock">
              <span className="clock-digits">{times[activeHub.id] || "12:00:00"}</span>
              <span className="clock-tz">{activeHub.tzOffsetLabel.split(" ")[0]}</span>
            </div>
          </div>

          <h3 className="mobile-hub-title">{activeHub.city}</h3>
          <p className="mobile-hub-role">{activeHub.role}</p>
          <p className="mobile-hub-focus">{activeHub.focus}</p>

          <div className="mobile-hub-metrics">
            <div className="mobile-metric-pill">
              <Zap size={13} className="text-emerald" />
              <span>{activeHub.latency} Edge Ping</span>
            </div>
            <div className="mobile-metric-pill">
              <span className="dot-green" />
              <span>{activeHub.activeSprints} Sprints Live</span>
            </div>
            <div className="mobile-metric-pill">
              <span>{activeHub.tzOffsetLabel}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Performance Metrics Strip */}
      <div className="map-footer-stats">
        <div className="footer-stat-card">
          <strong>11</strong>
          <span className="stat-title">Sovereign Nations</span>
          <span className="stat-sub">Active in NA, EU, UK, JP & SEA</span>
        </div>
        <div className="footer-stat-card">
          <strong>&lt; 45ms</strong>
          <span className="stat-title">Global Edge Telemetry</span>
          <span className="stat-sub">Multi-region routing & zero drift</span>
        </div>
        <div className="footer-stat-card">
          <strong>24/7</strong>
          <span className="stat-title">Follow-The-Sun Cadence</span>
          <span className="stat-sub">Continuous delivery across 4 zones</span>
        </div>
        <div className="footer-stat-card">
          <strong>100%</strong>
          <span className="stat-title">Partner Accountability</span>
          <span className="stat-sub">Named principals on every briefing</span>
        </div>
      </div>
    </div>
  );
});
