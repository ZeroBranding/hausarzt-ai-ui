// Thin API wrapper used by the app.

export type ApiErrorPayload = {
  detail?: string;
  message?: string;
};

class ApiError extends Error {
  status: number;
  payload?: ApiErrorPayload;

  constructor(status: number, message: string, payload?: ApiErrorPayload) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.payload = payload;
  }
}

const AUTH_TOKEN_KEY = "auth_token";

const normalizeBaseUrl = (base: string) => base.replace(/\/+$/, "");

export const apiUtils = {
  getApiBaseUrl: () => {
    const env = (import.meta as any).env?.VITE_API_URL as string | undefined;
    if (env && env.trim().length > 0) return normalizeBaseUrl(env.trim());
    return "/api";
  },
  setToken: (token: string) => localStorage.setItem(AUTH_TOKEN_KEY, token),
  getToken: () => localStorage.getItem(AUTH_TOKEN_KEY),
  clearToken: () => localStorage.removeItem(AUTH_TOKEN_KEY),
  isAuthenticated: () => !!localStorage.getItem(AUTH_TOKEN_KEY),
};

const buildUrl = (path: string) => {
  const base = normalizeBaseUrl(apiUtils.getApiBaseUrl());
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
};

async function requestJson<T>(path: string, init: RequestInit = {}): Promise<T> {
  const headers = new Headers(init.headers);
  if (!headers.has("Content-Type") && init.body) headers.set("Content-Type", "application/json");

  const token = apiUtils.getToken();
  if (token && !headers.has("Authorization")) headers.set("Authorization", `Bearer ${token}`);

  const res = await fetch(buildUrl(path), { ...init, headers });
  const isJson = (res.headers.get("content-type") || "").includes("application/json");
  const payload = isJson ? ((await res.json().catch(() => undefined)) as ApiErrorPayload | undefined) : undefined;

  if (!res.ok) {
    const msg = payload?.detail || payload?.message || `Request failed (${res.status})`;
    throw new ApiError(res.status, msg, payload);
  }

  if (res.status === 204) return undefined as T;
  return (payload as unknown) as T;
}

export const authAPI = {
  login: async (payload: { email: string; password: string }) => {
    const data = await requestJson<{ access_token?: string; token?: string }>("/auth/login", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    const token = data.access_token || data.token;
    if (token) apiUtils.setToken(token);
    return data;
  },
  register: async (payload: { email: string; password: string; first_name?: string; last_name?: string }) => {
    return requestJson<{ id?: number; message?: string }>("/auth/register", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },
  logout: () => {
    apiUtils.clearToken();
  },
  getProfile: async () => {
    try {
      return await requestJson<any>("/auth/me", { method: "GET" });
    } catch {
      return await requestJson<any>("/auth/profile", { method: "GET" });
    }
  },
};

export const tenantAPI = {
  getTenantInfo: async () => requestJson<any>("/tenant", { method: "GET" }),
  getBrandingInfo: async () => requestJson<any>("/tenant/branding", { method: "GET" }),
  getSchedulingInfo: async () => requestJson<any>("/tenant/scheduling", { method: "GET" }),
};

export const appointmentsAPI = {
  getUserAppointments: async () => requestJson<any>("/appointments", { method: "GET" }),
};

export const messagesAPI = {
  getMessages: async () => requestJson<any>("/messages", { method: "GET" }),
};

