import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// BLOCKER 7: Status-System Mapping - Zentrale Konstanten
export const APPOINTMENT_STATUS_PENDING = 'pending' as const;
export const APPOINTMENT_STATUS_CONFIRMED = 'confirmed' as const;
export const APPOINTMENT_STATUS_CANCELLED = 'cancelled' as const;
export const APPOINTMENT_STATUS_COMPLETED = 'completed' as const;

export const UI_STATUS_AVAILABLE = 'available' as const;
export const UI_STATUS_BOOKED = 'booked' as const;
export const UI_STATUS_BOOKED_PENDING = 'booked-pending' as const;
export const UI_STATUS_BOOKED_CONFIRMED = 'booked-confirmed' as const;
export const UI_STATUS_PAST = 'past' as const;
export const UI_STATUS_UNAVAILABLE = 'unavailable' as const;

export type AppointmentStatus = typeof APPOINTMENT_STATUS_PENDING | typeof APPOINTMENT_STATUS_CONFIRMED | typeof APPOINTMENT_STATUS_CANCELLED | typeof APPOINTMENT_STATUS_COMPLETED;
export type UIStatus = typeof UI_STATUS_AVAILABLE | typeof UI_STATUS_BOOKED | typeof UI_STATUS_BOOKED_PENDING | typeof UI_STATUS_BOOKED_CONFIRMED | typeof UI_STATUS_PAST | typeof UI_STATUS_UNAVAILABLE;

/**
 * Mappt Appointment-Status auf UI-Status für konsistente Darstellung
 * BLOCKER 7: Behebt inkonsistente Status-Behandlung
 * Verbesserung: pending vs confirmed jetzt unterscheidbar
 */
export function mapAppointmentToUIStatus(appointmentStatus: AppointmentStatus): UIStatus {
  switch (appointmentStatus) {
    case APPOINTMENT_STATUS_CONFIRMED:
      return UI_STATUS_BOOKED_CONFIRMED; // Bestätigte Termine sind gebucht (grün)
    case APPOINTMENT_STATUS_PENDING:
      return UI_STATUS_BOOKED_PENDING; // Ausstehende Termine sind gebucht (gelb)
    case APPOINTMENT_STATUS_CANCELLED:
      return UI_STATUS_AVAILABLE; // Stornierte Termine werden wieder verfügbar
    case APPOINTMENT_STATUS_COMPLETED:
      return UI_STATUS_PAST; // Abgeschlossene Termine sind vergangen
    default:
      return UI_STATUS_UNAVAILABLE; // Fallback für unbekannte Status
  }
}

/**
 * Umgekehrtes Mapping für UI-Status zu Appointment-Status
 */
export function mapUIStatusToAppointment(uiStatus: UIStatus): AppointmentStatus | null {
  switch (uiStatus) {
    case UI_STATUS_BOOKED_CONFIRMED:
    case UI_STATUS_BOOKED_PENDING:
      return APPOINTMENT_STATUS_CONFIRMED; // Gebuchte Slots werden zu bestätigten Terminen
    case UI_STATUS_AVAILABLE:
      return null; // Verfügbare Slots haben keinen Appointment-Status
    case UI_STATUS_PAST:
      return APPOINTMENT_STATUS_COMPLETED; // Vergangene Slots sind abgeschlossen
    case UI_STATUS_UNAVAILABLE:
    case UI_STATUS_BOOKED:
      return null; // Nicht verfügbare Slots haben keinen Status
    default:
      return null;
  }
}

// ============ API WRAPPER ============

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
