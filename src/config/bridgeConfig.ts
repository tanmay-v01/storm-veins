import bridgeConfigData from "../data/bridgeConfig.json";

export interface BridgeConfig {
  localUrl: string;
  publicUrl: string;
  activeUrl: string;
  updatedAt: string;
  status: string;
  clusterNodes: number;
}

export function getBridgeBaseUrl(): string {
  // 1. Explicit environment variable
  const envUrl = import.meta.env.VITE_CRM_BRIDGE_URL;
  if (envUrl && envUrl.trim() !== "") {
    return envUrl.trim().replace(/\/$/, "");
  }

  // 2. Custom override saved in browser storage (set via UI on mobile/desktop)
  if (typeof window !== "undefined") {
    const custom = localStorage.getItem("sv_custom_bridge_url");
    if (custom && custom.trim() !== "") {
      return custom.trim().replace(/\/$/, "");
    }
  }

  // 3. If running locally on localhost/127.0.0.1
  const isLocalHost =
    typeof window !== "undefined" &&
    (window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1" ||
      window.location.hostname.startsWith("192.168."));

  if (isLocalHost) {
    return "http://127.0.0.1:5050";
  }

  // 4. Dynamic cloud URL discovered from background sync
  if (typeof window !== "undefined") {
    const dynamicUrl = localStorage.getItem("sv_dynamic_bridge_url");
    if (dynamicUrl && dynamicUrl.startsWith("https://")) {
      return dynamicUrl.trim().replace(/\/$/, "");
    }
  }

  // 5. Inlined public tunnel URL from build time
  if (bridgeConfigData.publicUrl && bridgeConfigData.publicUrl.trim() !== "") {
    return bridgeConfigData.publicUrl.replace(/\/$/, "");
  }

  return "http://127.0.0.1:5050";
}

/**
 * Fetches the freshest live tunnel URL from GitHub / cloud without requiring a site rebuild.
 */
export async function syncLatestBridgeUrlFromCloud(): Promise<string | null> {
  const sources = [
    `/bridgeConfig.json?t=${Date.now()}`,
    `https://raw.githubusercontent.com/tanmay-v01/storm-veins/main/public/bridgeConfig.json?t=${Date.now()}`,
  ];

  for (const src of sources) {
    try {
      const res = await fetch(src, { signal: AbortSignal.timeout(3000) });
      if (res.ok) {
        const data = await res.json();
        if (data.publicUrl && data.publicUrl.startsWith("https://")) {
          const clean = data.publicUrl.trim().replace(/\/$/, "");
          localStorage.setItem("sv_dynamic_bridge_url", clean);
          return clean;
        }
      }
    } catch {}
  }
  return null;
}

export async function pingDaemonHealth(): Promise<{ online: boolean; data?: any; error?: string }> {
  const baseUrl = getBridgeBaseUrl();
  try {
    const res = await fetch(`${baseUrl}/api/status`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      signal: AbortSignal.timeout(5000),
    });
    if (res.ok) {
      const data = await res.json();
      return { online: true, data };
    }
    return { online: false, error: `HTTP ${res.status}` };
  } catch (err: any) {
    return { online: false, error: err.message };
  }
}
