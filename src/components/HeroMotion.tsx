import { useState, useEffect, useRef, memo } from "react";
import { TrendingUp, Globe, Activity, Play, Pause, Terminal, Zap, Shield, Sparkles } from "lucide-react";
import { images } from "../data";

/**
 * Background ambient constellation canvas with slow-drifting nodes,
 * connecting webs, and subtle expanding radar ripples.
 */
export const HeroAmbientCanvas = memo(function HeroAmbientCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth * window.devicePixelRatio || 800);
    let height = (canvas.height = canvas.offsetHeight * window.devicePixelRatio || 600);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      height = canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    };

    window.addEventListener("resize", handleResize, { passive: true });

    // Particle nodes
    const NODE_COUNT = window.innerWidth < 768 ? 16 : 28;
    const nodes: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      alpha: number;
    }> = [];

    for (let i = 0; i < NODE_COUNT; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45 * window.devicePixelRatio,
        vy: (Math.random() - 0.5) * 0.45 * window.devicePixelRatio,
        radius: (Math.random() * 1.8 + 1.2) * window.devicePixelRatio,
        alpha: Math.random() * 0.4 + 0.25,
      });
    }

    // Radar pulse state
    let radarRadius = 0;
    const maxRadarRadius = Math.max(width, height) * 0.85;

    let lastTime = performance.now();

    const render = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      ctx.clearRect(0, 0, width, height);

      // Expanding subtle radar wave from right focal point
      const originX = width * 0.75;
      const originY = height * 0.45;

      radarRadius += 35 * window.devicePixelRatio * dt;
      if (radarRadius > maxRadarRadius) {
        radarRadius = 0;
      }

      const radarAlpha = Math.max(0, 1 - radarRadius / maxRadarRadius) * 0.14;
      ctx.beginPath();
      ctx.arc(originX, originY, radarRadius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(10, 107, 78, ${radarAlpha})`;
      ctx.lineWidth = 1.5 * window.devicePixelRatio;
      ctx.stroke();

      // Secondary radar wave
      const secondaryRadius = (radarRadius + maxRadarRadius * 0.5) % maxRadarRadius;
      const secondaryAlpha = Math.max(0, 1 - secondaryRadius / maxRadarRadius) * 0.08;
      ctx.beginPath();
      ctx.arc(originX, originY, secondaryRadius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(16, 185, 129, ${secondaryAlpha})`;
      ctx.lineWidth = 1 * window.devicePixelRatio;
      ctx.stroke();

      // Draw subtle connecting grid lines
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 140 * window.devicePixelRatio) {
            const lineAlpha = (1 - dist / (140 * window.devicePixelRatio)) * 0.16;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(10, 107, 78, ${lineAlpha})`;
            ctx.lineWidth = 0.8 * window.devicePixelRatio;
            ctx.stroke();
          }
        }
      }

      // Update and draw nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx * dt * 60;
        n.y += n.vy * dt * 60;

        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(16, 185, 129, ${n.alpha})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-ambient-canvas" aria-hidden="true" />;
});

interface ArchitecturalHotspot {
  id: string;
  x: string;
  y: string;
  title: string;
  desc: string;
  metric: string;
}

const hotspots: ArchitecturalHotspot[] = [
  {
    id: "atrium",
    x: "48%",
    y: "54%",
    title: "Executive War Room",
    desc: "Strategy Pod & Directional Roadmapping",
    metric: "Live Briefings Active",
  },
  {
    id: "contour",
    x: "66%",
    y: "34%",
    title: "Growth Acceleration Engine",
    desc: "Algorithmic Pipeline & Conversion Architecture",
    metric: "+240% Speed Index",
  },
  {
    id: "reflection",
    x: "34%",
    y: "78%",
    title: "Global Edge Mesh",
    desc: "11 Sovereign Real-time Replicas",
    metric: "Sub-20ms Routing",
  },
];

/**
 * Interactive Hero Visual Media Frame with 3D Tilt Physics,
 * Museum-grade Architectural Centerpiece, Architectural Pins,
 * and 3-Lenses Studio Switcher.
 */
export function HeroVisualFrame() {
  const [mode, setMode] = useState<"visual" | "telemetry" | "deployments">("visual");
  const [activePin, setActivePin] = useState<string | null>("atrium");
  const [timeString, setTimeString] = useState("");
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const frameRef = useRef<HTMLDivElement>(null);

  // Live real-time clock indicator (IST / UTC)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const istHours = String((now.getUTCHours() + 5 + Math.floor((now.getUTCMinutes() + 30) / 60)) % 24).padStart(2, "0");
      const istMinutes = String((now.getUTCMinutes() + 30) % 60).padStart(2, "0");
      const istSeconds = String(now.getUTCSeconds()).padStart(2, "0");
      setTimeString(`${istHours}:${istMinutes}:${istSeconds} IST`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // 3D Parallax Tilt Effect on Mouse Move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!frameRef.current || window.innerWidth < 1024) return;
    const rect = frameRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div className="hero-visual-frame-container">
      {/* Dynamic Ambient Backlight Glow behind frame */}
      <div className="hero-frame-ambient-glow" aria-hidden="true" />

      <div
        ref={frameRef}
        className="hero-visual-frame"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: tilt.x === 0 && tilt.y === 0 ? "transform 0.6s var(--sv-ease)" : "transform 0.1s ease-out",
        }}
      >
        {/* Top Media Bar */}
        <div className="hero-media-top-bar">
          <div className="hero-live-pill">
            <span className="live-pulsing-dot" />
            <span className="live-clock-text">{timeString || "16:50:00 IST"}</span>
            <span className="live-hub-tag">· GLOBAL EDGE ACTIVE</span>
          </div>

          <div className="hero-mode-toggles">
            <button
              type="button"
              className={`mode-toggle-btn ${mode === "visual" ? "active" : ""}`}
              onClick={() => setMode("visual")}
              title="Architecture Centerpiece View"
            >
              <Activity size={12} />
              <span>Architecture</span>
            </button>
            <button
              type="button"
              className={`mode-toggle-btn ${mode === "telemetry" ? "active" : ""}`}
              onClick={() => setMode("telemetry")}
              title="Real-time Operational Telemetry HUD"
            >
              <Terminal size={12} />
              <span>Telemetry</span>
            </button>
            <button
              type="button"
              className={`mode-toggle-btn ${mode === "deployments" ? "active" : ""}`}
              onClick={() => setMode("deployments")}
              title="International Sovereign Hubs"
            >
              <Globe size={12} />
              <span>Hubs</span>
            </button>
          </div>
        </div>

        {/* Main Visual Wrap */}
        <div className="hero-main-photo-wrap">
          {mode === "visual" && (
            <div className="hero-cinematic-scene">
              <img
                src="/assets/hero_flagship.jpg"
                alt="Storm Veins architectural digital flagship headquarters at dusk"
                className="hero-flagship-masterpiece-img"
                loading="eager"
              />
              <div className="hero-photo-vignette" />

              {/* Glowing Neon Emerald Light Sweep */}
              <div className="hero-laser-contour" aria-hidden="true" />

              {/* Interactive Architectural Hotspot Pins */}
              {hotspots.map((pin) => (
                <div
                  key={pin.id}
                  className={`arch-hotspot-pin ${activePin === pin.id ? "is-active" : ""}`}
                  style={{ left: pin.x, top: pin.y }}
                  onMouseEnter={() => setActivePin(pin.id)}
                  onClick={() => setActivePin(pin.id === activePin ? null : pin.id)}
                >
                  <span className="hotspot-pulse-ring" />
                  <span className="hotspot-center-dot" />

                  {/* Hotspot Card Tooltip */}
                  {activePin === pin.id && (
                    <div className="hotspot-tooltip-card">
                      <div className="tooltip-head">
                        <span className="tooltip-dot" />
                        <span className="tooltip-title">{pin.title}</span>
                      </div>
                      <p className="tooltip-desc">{pin.desc}</p>
                      <div className="tooltip-metric-pill">
                        <Zap size={11} className="text-emerald" />
                        <span>{pin.metric}</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* Floating Live Architecture Watermark Badge */}
              <div className="scene-watermark-pill">
                <span className="watermark-dot" />
                <span>STORM VEINS PAVILION · MUMBAI HQ</span>
              </div>
            </div>
          )}

          {mode === "telemetry" && (
            /* Live Telemetry Matrix HUD */
            <div className="hero-telemetry-hud" aria-label="Real-time studio operations telemetry">
              <div className="hud-header">
                <div className="hud-title-row">
                  <Shield size={14} className="text-emerald" />
                  <span className="hud-title">GLOBAL EDGE TELEMETRY · CLUSTER V-4</span>
                </div>
                <span className="hud-status-badge">99.98% UPTIME</span>
              </div>

              <div className="hud-metrics-grid">
                <div className="hud-metric-box">
                  <span className="hud-metric-label">MUMBAI HQ EDGE</span>
                  <strong className="hud-metric-val">24ms</strong>
                  <span className="hud-metric-sub text-emerald">● Optimal Routing</span>
                </div>
                <div className="hud-metric-box">
                  <span className="hud-metric-label">LONDON CLUSTER</span>
                  <strong className="hud-metric-val">46ms</strong>
                  <span className="hud-metric-sub text-emerald">● Synced</span>
                </div>
                <div className="hud-metric-box">
                  <span className="hud-metric-label">SINGAPORE HUB</span>
                  <strong className="hud-metric-val">18ms</strong>
                  <span className="hud-metric-sub text-emerald">● Active</span>
                </div>
                <div className="hud-metric-box">
                  <span className="hud-metric-label">NEW YORK NODE</span>
                  <strong className="hud-metric-val">58ms</strong>
                  <span className="hud-metric-sub text-emerald">● Active</span>
                </div>
              </div>

              <div className="hud-waveform-wrap">
                <div className="hud-waveform-bar" style={{ height: "45%" }} />
                <div className="hud-waveform-bar" style={{ height: "70%" }} />
                <div className="hud-waveform-bar" style={{ height: "60%" }} />
                <div className="hud-waveform-bar" style={{ height: "90%" }} />
                <div className="hud-waveform-bar" style={{ height: "75%" }} />
                <div className="hud-waveform-bar" style={{ height: "100%" }} />
                <div className="hud-waveform-bar" style={{ height: "65%" }} />
                <div className="hud-waveform-bar" style={{ height: "85%" }} />
                <div className="hud-waveform-bar" style={{ height: "95%" }} />
                <div className="hud-waveform-bar" style={{ height: "80%" }} />
                <div className="hud-waveform-bar" style={{ height: "60%" }} />
                <div className="hud-waveform-bar" style={{ height: "70%" }} />
              </div>

              <div className="hud-footer-note">
                <Zap size={13} className="text-emerald" />
                <span>Real-time conversion telemetry across 11 sovereign partner deployments.</span>
              </div>
            </div>
          )}

          {mode === "deployments" && (
            /* International Sovereign Hubs List */
            <div className="hero-hubs-panel" aria-label="International sovereign studio hubs">
              <div className="hud-header">
                <div className="hud-title-row">
                  <Globe size={14} className="text-emerald" />
                  <span className="hud-title">SOVEREIGN STUDIO HUBS & TIMEZONES</span>
                </div>
                <span className="hud-status-badge">4 CITIES ACTIVE</span>
              </div>

              <div className="hubs-list-grid">
                <div className="hub-city-card">
                  <div className="hub-city-top">
                    <span className="hub-tag">PRIMARY HQ</span>
                    <strong className="hub-time">16:50 IST</strong>
                  </div>
                  <h4 className="hub-name">Mumbai</h4>
                  <p className="hub-sub">Nariman Point · Flagship Studio & Growth Command</p>
                </div>

                <div className="hub-city-card">
                  <div className="hub-city-top">
                    <span className="hub-tag">EUROPEAN HUB</span>
                    <strong className="hub-time">12:20 BST</strong>
                  </div>
                  <h4 className="hub-name">London</h4>
                  <p className="hub-sub">Mayfair · Institutional & Sovereign Scale</p>
                </div>

                <div className="hub-city-card">
                  <div className="hub-city-top">
                    <span className="hub-tag">APAC HUB</span>
                    <strong className="hub-time">19:20 SGT</strong>
                  </div>
                  <h4 className="hub-name">Singapore</h4>
                  <p className="hub-sub">Marina Bay · Cross-Border Growth Engine</p>
                </div>

                <div className="hub-city-card">
                  <div className="hub-city-top">
                    <span className="hub-tag">NORTH AMERICA</span>
                    <strong className="hub-time">07:20 EDT</strong>
                  </div>
                  <h4 className="hub-name">New York</h4>
                  <p className="hub-sub">Hudson Yards · Enterprise Strategy & Capital</p>
                </div>
              </div>
            </div>
          )}

          {/* Integrated Live Edge Ticker Bar inside frame */}
          <div className="hero-frame-ticker-bar">
            <span className="ticker-pulse-beacon" />
            <span className="ticker-text">
              MUMBAI 24ms · LONDON 46ms · SINGAPORE 18ms · NYC 58ms // 99.98% CLUSTER UPTIME // 2026 COHORT
            </span>
          </div>

          {/* Ambient Scanline & Light Sweep */}
          <div className="hero-light-sweep" aria-hidden="true" />
        </div>

        {/* Floating Metric 1 (Top Right / Parallax HUD) */}
        <div className="hero-floating-badge badge-top">
          <div className="badge-icon-wrap emerald-icon">
            <TrendingUp size={16} />
          </div>
          <div>
            <span className="badge-meta">PORTFOLIO ACCRETION</span>
            <strong className="badge-val">+240% Pipeline Velocity</strong>
            <span className="badge-sub-detail">$18.4M Value Generated</span>
          </div>
        </div>

        {/* Floating Metric 2 (Bottom Left / Parallax HUD) */}
        <div className="hero-floating-badge badge-bottom">
          <div className="badge-icon-wrap gold-icon">
            <Globe size={16} />
          </div>
          <div>
            <span className="badge-meta">GLOBAL DEPLOYMENT</span>
            <strong className="badge-val">11 Sovereign Markets</strong>
            <span className="badge-sub-detail">Zero-Downtime Migration</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Animated Rotating Category Headline with Smooth Kinetic Slide
 */
export function HeroRotatingWord() {
  const words = [
    "category leaders.",
    "sovereign scale-ups.",
    "global enterprises.",
    "industry visionaries.",
  ];
  const [index, setIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % words.length);
        setIsTransitioning(false);
      }, 350);
    }, 3200);
    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <span className="hero-rotating-word-container">
      <span className={`hero-rotating-word ${isTransitioning ? "slide-out" : "slide-in"}`}>
        {words[index]}
      </span>
    </span>
  );
}
