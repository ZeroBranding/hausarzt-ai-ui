import { useState, useEffect, useMemo, useCallback } from 'react';
import { Clock, ArrowLeft, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useBooking } from '@/contexts/BookingContext';
import { format, parse, getHours, getMinutes, isSameDay } from 'date-fns';
import { de } from 'date-fns/locale';
import { mapAppointmentToUIStatus } from '@/lib/utils';

// API Base URL - bei Vite Proxy leer lassen
const API_BASE = '';
import { requestJson } from '@/lib/utils';

// Praxis-Öffnungszeiten (Minuten seit Mitternacht)
const PRACTICE_HOURS: Record<number, { open: number; close: number } | null> = {
  0: { open: 8 * 60, close: 18 * 60 },  // Montag
  1: { open: 8 * 60, close: 18 * 60 },  // Dienstag
  2: { open: 8 * 60, close: 12 * 60 },  // Mittwoch
  3: { open: 8 * 60, close: 18 * 60 },  // Donnerstag
  4: { open: 8 * 60, close: 18 * 60 },  // Freitag
  5: null,  // Samstag
  6: null,  // Sonntag
};

type SlotStatus = 'available' | 'booked' | 'past';

interface TimeSlot {
  time: string;
  status: SlotStatus;
}

interface TimeSlotPickerProps {
  onSelectTime?: (time: string) => void;
  onBack?: () => void;
}

const TimeSlotPicker = ({ onSelectTime, onBack }: TimeSlotPickerProps) => {
  const { state, selectTime, goBack } = useBooking();
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selectedDate = useMemo(() => {
    if (!state.selectedDate) return null;
    return parse(state.selectedDate, 'yyyy-MM-dd', new Date());
  }, [state.selectedDate]);

  // Lokale Slot-Generierung (deterministisch, keine Zufallswerte)
  const generateLocalSlots = useCallback((date: Date, serverTime: Date): TimeSlot[] => {
    const dayOfWeek = date.getDay();
    const adjustedDay = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    const hours = PRACTICE_HOURS[adjustedDay];
    
    if (!hours) return [];

    const generatedSlots: TimeSlot[] = [];
    let currentMinutes = hours.open;
    const isToday = isSameDay(date, serverTime);
    const serverMinutes = getHours(serverTime) * 60 + getMinutes(serverTime);

    while (currentMinutes < hours.close) {
      const hour = Math.floor(currentMinutes / 60);
      const minute = currentMinutes % 60;
      const timeStr = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
      
      let status: SlotStatus = 'available';
      
      // Vergangene Slots für heute
      if (isToday && currentMinutes <= serverMinutes) {
        status = 'past';
      }

      generatedSlots.push({ time: timeStr, status });
      currentMinutes += 15; // 15-Minuten-Intervalle
    }

    return generatedSlots;
  }, []);

  // Fetch slots from API
  useEffect(() => {
    if (!selectedDate || !state.selectedDate) return;

    const fetchSlots = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const data = await requestJson<any>(`/api/availability/day/${state.selectedDate}`);
        if (data.slots && Array.isArray(data.slots)) {
          setSlots(data.slots);
        } else {
          // Fallback zu lokaler Berechnung
          setSlots(generateLocalSlots(selectedDate, state.serverTime));
        }
      } catch (err) {
        console.error('Slot fetch error:', err);
        // Bei API-Fehler: Lokale Berechnung
        setSlots(generateLocalSlots(selectedDate, state.serverTime));
      }
      
      setIsLoading(false);
    };

    fetchSlots();
  }, [selectedDate, state.selectedDate, state.serverTime, generateLocalSlots]);

  // Live-Update: Slots jede Minute aktualisieren
  useEffect(() => {
    if (!selectedDate) return;

    const interval = setInterval(() => {
      const now = new Date();
      if (isSameDay(selectedDate, now)) {
        const nowMinutes = getHours(now) * 60 + getMinutes(now);
        setSlots(prev => prev.map(slot => {
          const [hours, minutes] = slot.time.split(':').map(Number);
          const slotMinutes = hours * 60 + minutes;
          // Markiere vergangene Slots
          if (slotMinutes <= nowMinutes && slot.status === 'available') {
            return { ...slot, status: 'past' as SlotStatus };
          }
          return slot;
        }));
      }
    }, 60000); // Jede Minute

    return () => clearInterval(interval);
  }, [selectedDate]);

  const handleSlotClick = (slot: TimeSlot) => {
    if (slot.status === 'available') {
      selectTime(slot.time);
      onSelectTime?.(slot.time);
    }
  };

  const handleBack = () => {
    goBack();
    onBack?.();
  };

  const getSlotClassName = (slot: TimeSlot): string => {
    const baseClasses = 'p-3 rounded-lg font-medium transition-all duration-200 text-center';
    const isSelected = state.selectedTime === slot.time;

    if (isSelected) {
      return `${baseClasses} bg-primary text-white ring-2 ring-primary ring-offset-2 shadow-lg`;
    }

    switch (slot.status) {
      case 'available':
        return `${baseClasses} bg-emerald-500 hover:bg-emerald-600 text-white cursor-pointer shadow-sm hover:shadow-md`;
      case 'booked':
        return `${baseClasses} bg-red-500 text-white cursor-not-allowed opacity-80`;
      case 'past':
        return `${baseClasses} bg-gray-300 text-gray-500 cursor-not-allowed`;
      default:
        return `${baseClasses} bg-gray-200 text-gray-400 cursor-not-allowed`;
    }
  };

  // Slots nach Tageszeit gruppieren
  const morningSlots = slots.filter(s => {
    const hour = parseInt(s.time.split(':')[0]);
    return hour < 12;
  });

  const afternoonSlots = slots.filter(s => {
    const hour = parseInt(s.time.split(':')[0]);
    return hour >= 12;
  });

  // Statistiken
  const availableCount = slots.filter(s => s.status === 'available').length;
  const bookedCount = slots.filter(s => s.status === 'booked').length;

  if (!selectedDate) {
    return (
      <Card className="shadow-medium">
        <CardContent className="py-8 text-center text-muted-foreground">
          Bitte wählen Sie zuerst ein Datum aus.
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-medium animate-fade-in">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Clock className="h-5 w-5 text-secondary" />
              Uhrzeit wählen
            </CardTitle>
            <CardDescription className="mt-1">
              {format(selectedDate, "EEEE, d. MMMM yyyy", { locale: de })}
            </CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={handleBack} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Zurück
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        {/* Legende */}
        <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-emerald-500" />
              <span>Frei ({availableCount})</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-red-500" />
              <span>Gebucht ({bookedCount})</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-gray-300" />
              <span>Vergangen</span>
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
            {Array(16).fill(null).map((_, i) => (
              <div key={i} className="h-12 rounded-lg bg-gray-200 animate-pulse" />
            ))}
          </div>
        ) : slots.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            Keine Termine an diesem Tag verfügbar.
          </div>
        ) : (
          <div className="space-y-6">
            {/* Vormittag */}
            {morningSlots.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
                  <span className="text-lg">🌅</span> Vormittag
                </h4>
                <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
                  {morningSlots.map(slot => (
                    <button
                      key={slot.time}
                      onClick={() => handleSlotClick(slot)}
                      disabled={slot.status !== 'available'}
                      className={getSlotClassName(slot)}
                    >
                      {slot.time}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Nachmittag */}
            {afternoonSlots.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
                  <span className="text-lg">☀️</span> Nachmittag
                </h4>
                <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
                  {afternoonSlots.map(slot => (
                    <button
                      key={slot.time}
                      onClick={() => handleSlotClick(slot)}
                      disabled={slot.status !== 'available'}
                      className={getSlotClassName(slot)}
                    >
                      {slot.time}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Ausgewählter Termin */}
        {state.selectedTime && (
          <div className="mt-6 p-4 bg-secondary/10 rounded-lg border border-secondary/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Ausgewählter Termin:</p>
                <p className="font-semibold text-lg">
                  {format(selectedDate, "d. MMMM yyyy", { locale: de })} um {state.selectedTime} Uhr
                </p>
              </div>
              <Button 
                onClick={() => onSelectTime?.(state.selectedTime!)}
                className="medical-gradient"
              >
                Weiter
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TimeSlotPicker;