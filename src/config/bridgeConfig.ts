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
  // 1. If explicitly configured via environment variable
  const envUrl = import.meta.env.VITE_CRM_BRIDGE_URL;
  if (envUrl && envUrl.trim() !== "") {
    return envUrl.trim().replace(/\/$/, "");
  }

  // 2. If running locally on localhost/127.0.0.1
  const isLocalHost =
    typeof window !== "undefined" &&
    (window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1" ||
      window.location.hostname.startsWith("192.168."));

  if (isLocalHost) {
    return bridgeConfigData.localUrl || "http://localhost:5050";
  }

  // 3. If accessed remotely from phone or secondary device, use public tunnel URL if present
  if (bridgeConfigData.publicUrl && bridgeConfigData.publicUrl.trim() !== "") {
    return bridgeConfigData.publicUrl.replace(/\/$/, "");
  }

  // 4. Default fallback
  return bridgeConfigData.localUrl || "http://localhost:5050";
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
