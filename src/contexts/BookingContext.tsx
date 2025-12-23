import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { apiUtils } from '@/lib_api';

// Types
export interface BookingState {
  selectedDate: string | null;
  selectedTime: string | null;
  appointmentReason: string | null;
  customReason: string | null;
  step: 'calendar' | 'time' | 'auth' | 'profile' | 'confirm';
  serverTime: Date;
  user: UserData | null;
}

export interface UserData {
  id?: number;
  email: string;
  firstName: string;
  lastName: string;
  birthDate: { day: number; month: number; year: number } | null;
  phone?: string;
  street?: string;
  houseNumber?: string;
  postalCode?: string;
  city?: string;
  isVerified: boolean;
  profileComplete: boolean;
}

type BookingAction =
  | { type: 'SELECT_DATE'; payload: string }
  | { type: 'SELECT_TIME'; payload: string }
  | { type: 'SET_REASON'; payload: { reason: string; custom?: string } }
  | { type: 'SET_STEP'; payload: BookingState['step'] }
  | { type: 'UPDATE_SERVER_TIME'; payload: Date }
  | { type: 'UPDATE_USER'; payload: Partial<UserData> }
  | { type: 'RESET' }
  | { type: 'GO_BACK' };

const initialState: BookingState = {
  selectedDate: null,
  selectedTime: null,
  appointmentReason: null,
  customReason: null,
  step: 'calendar',
  serverTime: new Date(),
  user: null,
};

// Step Navigation Map
const stepOrder: BookingState['step'][] = ['calendar', 'time', 'auth', 'profile', 'confirm'];

const getPreviousStep = (currentStep: BookingState['step']): BookingState['step'] => {
  const currentIndex = stepOrder.indexOf(currentStep);
  if (currentIndex <= 0) return 'calendar';
  return stepOrder[currentIndex - 1];
};

// Validate restored state - ensures guards are respected
const validateRestoredState = (saved: Partial<BookingState>): Partial<BookingState> | null => {
  try {
    // Check if selectedDate is not in the past
    if (saved.selectedDate) {
      const selectedDate = new Date(saved.selectedDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        console.warn('Restored selectedDate is in the past, discarding');
        return null; // Invalid - date in past
      }
    }

    // Check step guards
    if (saved.step) {
      // time step requires selectedDate
      if (saved.step === 'time' && !saved.selectedDate) {
        console.warn('Restored step=time but no selectedDate, resetting to calendar');
        return { ...saved, step: 'calendar' };
      }

      // auth step requires selectedTime
      if (saved.step === 'auth' && !saved.selectedTime) {
        console.warn('Restored step=auth but no selectedTime, resetting to calendar');
        return { ...saved, step: 'calendar' };
      }

      // profile step requires authentication
      if (saved.step === 'profile' && !apiUtils.isAuthenticated()) {
        console.warn('Restored step=profile but not authenticated, resetting to calendar');
        return { ...saved, step: 'calendar' };
      }

      // confirm step requires authentication and complete profile
      if (saved.step === 'confirm') {
        if (!apiUtils.isAuthenticated()) {
          console.warn('Restored step=confirm but not authenticated, resetting to calendar');
          return { ...saved, step: 'calendar' };
        }
        if (!saved.user || !saved.user.profileComplete) {
          console.warn('Restored step=confirm but profile incomplete, resetting to calendar');
          return { ...saved, step: 'calendar' };
        }
      }
    }

    return saved;
  } catch (error) {
    console.warn('Error validating restored state, discarding:', error);
    return null;
  }
};

// Reducer
function bookingReducer(state: BookingState, action: BookingAction): BookingState {
  switch (action.type) {
    case 'SELECT_DATE':
      if (!action.payload) {
        console.warn('SELECT_DATE: Kein gültiges Datum ausgewählt');
        return state;
      }
      return { ...state, selectedDate: action.payload, step: 'time' };

    case 'SELECT_TIME':
      if (!state.selectedDate) {
        console.warn('SELECT_TIME: Kein Datum ausgewählt - kann nicht zu auth springen');
        return state;
      }
      if (!action.payload) {
        console.warn('SELECT_TIME: Keine gültige Zeit ausgewählt');
        return state;
      }
      return { ...state, selectedTime: action.payload, step: 'auth' };
    
    case 'SET_REASON':
      return { 
        ...state, 
        appointmentReason: action.payload.reason,
        customReason: action.payload.custom || null
      };
    
    case 'SET_STEP':
      // Guards für Schritt-Validierung
      const currentStepIndex = ['calendar', 'time', 'auth', 'profile', 'confirm'].indexOf(state.step);
      const targetStepIndex = ['calendar', 'time', 'auth', 'profile', 'confirm'].indexOf(action.payload);

      // Verhindere ungültige Vorwärts-Sprünge
      if (targetStepIndex > currentStepIndex) {
        // Zu 'time' nur mit selectedDate
        if (action.payload === 'time' && !state.selectedDate) {
          console.warn('SET_STEP guard: Cannot go to time without selectedDate');
          return state;
        }
        // Zu 'auth' nur mit selectedTime
        if (action.payload === 'auth' && !state.selectedTime) {
          console.warn('SET_STEP guard: Cannot go to auth without selectedTime');
          return state;
        }
        // Zu 'profile' nur wenn authenticated
        if (action.payload === 'profile' && !apiUtils.isAuthenticated()) {
          console.warn('SET_STEP guard: Cannot go to profile without authentication');
          return state;
        }
        // Zu 'confirm' nur mit vollständigen User-Daten
        if (action.payload === 'confirm') {
          if (!apiUtils.isAuthenticated()) {
            console.warn('SET_STEP guard: Cannot go to confirm without authentication');
            return state;
          }
          if (!state.user || !state.user.profileComplete) {
            console.warn('SET_STEP guard: Cannot go to confirm without complete user profile');
            return state;
          }
        }
      }

      return { ...state, step: action.payload };
    
    case 'UPDATE_SERVER_TIME':
      return { ...state, serverTime: action.payload };

    case 'UPDATE_USER':
      return {
        ...state,
        user: state.user ? { ...state.user, ...action.payload } : null
      };
    
    case 'GO_BACK':
      return { ...state, step: getPreviousStep(state.step) };
    
    case 'RESET':
      return { ...initialState, serverTime: state.serverTime };
    
    default:
      return state;
  }
}

// Context
interface BookingContextType {
  state: BookingState;
  dispatch: React.Dispatch<BookingAction>;
  // Helper functions
  selectDate: (date: string) => void;
  selectTime: (time: string) => void;
  setReason: (reason: string, custom?: string) => void;
  goBack: () => void;
  reset: () => void;
  updateUser: (data: Partial<UserData>) => void;
  goToStep: (step: BookingState['step']) => void;
}

const BookingContext = createContext<BookingContextType | null>(null);

// Provider
export function BookingProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(bookingReducer, initialState, () => {
    // Load from localStorage on init
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('booking-state');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          const validated = validateRestoredState(parsed);
          if (validated) {
            return { ...initialState, ...validated, serverTime: new Date() };
          } else {
            // Validation failed, remove invalid state
            localStorage.removeItem('booking-state');
          }
        } catch {
          // Parse error, remove corrupted state
          localStorage.removeItem('booking-state');
        }
      }
    }
    return initialState;
  });

  // Persist to localStorage
  useEffect(() => {
    // Only save if we have meaningful state (not just initial state)
    if (state.selectedDate || state.selectedTime || state.appointmentReason || state.step !== 'calendar') {
      const toSave = {
        selectedDate: state.selectedDate,
        selectedTime: state.selectedTime,
        appointmentReason: state.appointmentReason,
        customReason: state.customReason,
        step: state.step,
      };
      localStorage.setItem('booking-state', JSON.stringify(toSave));
    } else {
      // Remove empty state to avoid confusion
      localStorage.removeItem('booking-state');
    }
  }, [state.selectedDate, state.selectedTime, state.appointmentReason, state.customReason, state.step]);

  // BLOCKER 6: Server-Zeit als Master-Zeitquelle - sync every 30 seconds
  useEffect(() => {
    const fetchServerTime = async () => {
      try {
        const response = await fetch('/api/availability/time');
        if (response.ok) {
          const data = await response.json();
          const serverTime = new Date(data.timestamp);
          dispatch({ type: 'UPDATE_SERVER_TIME', payload: serverTime });
        } else {
          // Bei Server-Fehler: Lokale Zeit als Fallback (mit Warnung)
          console.warn('Server-Zeit nicht verfügbar, verwende lokale Zeit als Fallback');
          const fallbackTime = new Date();
          dispatch({ type: 'UPDATE_SERVER_TIME', payload: fallbackTime });
        }
      } catch (error) {
        // Bei Netzwerk-Fehler: Lokale Zeit als Fallback (mit Warnung)
        console.warn('Netzwerk-Fehler bei Server-Zeit-Sync, verwende lokale Zeit als Fallback');
        const fallbackTime = new Date();
        dispatch({ type: 'UPDATE_SERVER_TIME', payload: fallbackTime });
      }
    };

    // Sofort beim Start synchronisieren
    fetchServerTime();

    // Dann alle 30 Sekunden (reduziert von 60 für bessere Sync)
    const interval = setInterval(fetchServerTime, 30000);
    return () => clearInterval(interval);
  }, []);

  // Helper functions
  const selectDate = (date: string) => dispatch({ type: 'SELECT_DATE', payload: date });
  const selectTime = (time: string) => dispatch({ type: 'SELECT_TIME', payload: time });
  const setReason = (reason: string, custom?: string) => dispatch({ type: 'SET_REASON', payload: { reason, custom } });
  const goBack = () => dispatch({ type: 'GO_BACK' });
  const reset = () => dispatch({ type: 'RESET' });
  const updateUser = (data: Partial<UserData>) => dispatch({ type: 'UPDATE_USER', payload: data });
  const goToStep = (step: BookingState['step']) => dispatch({ type: 'SET_STEP', payload: step });

  return (
    <BookingContext.Provider value={{
      state,
      dispatch,
      selectDate,
      selectTime,
      setReason,
      goBack,
      reset,
      updateUser,
      goToStep,
    }}>
      {children}
    </BookingContext.Provider>
  );
}

// Hook
export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
}

export default BookingContext;
