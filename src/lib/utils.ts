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
