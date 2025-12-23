import { useState, useEffect, useMemo, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Calendar, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useBooking } from '@/contexts/BookingContext';
import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  isSameMonth, 
  isSameDay, 
  addMonths, 
  subMonths,
  isWeekend,
  isBefore,
  startOfDay,
  addYears,
  getDay,
  getHours,
  getMinutes
} from 'date-fns';
import { de } from 'date-fns/locale';

// API Base URL - bei Vite Proxy leer lassen
const API_BASE = '';

// Deutsche Feiertage 2024-2027 (NRW) inkl. Silvester und Praxis-Schließtage
const GERMAN_HOLIDAYS: Record<string, string> = {
  // 2024
  '2024-01-01': 'Neujahr',
  '2024-03-29': 'Karfreitag',
  '2024-04-01': 'Ostermontag',
  '2024-05-01': 'Tag der Arbeit',
  '2024-05-09': 'Christi Himmelfahrt',
  '2024-05-20': 'Pfingstmontag',
  '2024-05-30': 'Fronleichnam',
  '2024-10-03': 'Tag der Deutschen Einheit',
  '2024-11-01': 'Allerheiligen',
  '2024-12-24': 'Heiligabend',
  '2024-12-25': 'Erster Weihnachtstag',
  '2024-12-26': 'Zweiter Weihnachtstag',
  '2024-12-31': 'Silvester',
  // 2025
  '2025-01-01': 'Neujahr',
  '2025-04-18': 'Karfreitag',
  '2025-04-21': 'Ostermontag',
  '2025-05-01': 'Tag der Arbeit',
  '2025-05-29': 'Christi Himmelfahrt',
  '2025-06-09': 'Pfingstmontag',
  '2025-06-19': 'Fronleichnam',
  '2025-10-03': 'Tag der Deutschen Einheit',
  '2025-11-01': 'Allerheiligen',
  '2025-12-24': 'Heiligabend',
  '2025-12-25': 'Erster Weihnachtstag',
  '2025-12-26': 'Zweiter Weihnachtstag',
  '2025-12-31': 'Silvester',
  // 2026
  '2026-01-01': 'Neujahr',
  '2026-04-03': 'Karfreitag',
  '2026-04-06': 'Ostermontag',
  '2026-05-01': 'Tag der Arbeit',
  '2026-05-14': 'Christi Himmelfahrt',
  '2026-05-25': 'Pfingstmontag',
  '2026-06-04': 'Fronleichnam',
  '2026-10-03': 'Tag der Deutschen Einheit',
  '2026-11-01': 'Allerheiligen',
  '2026-12-24': 'Heiligabend',
  '2026-12-25': 'Erster Weihnachtstag',
  '2026-12-26': 'Zweiter Weihnachtstag',
  '2026-12-31': 'Silvester',
  // 2027
  '2027-01-01': 'Neujahr',
  '2027-03-26': 'Karfreitag',
  '2027-03-29': 'Ostermontag',
  '2027-05-01': 'Tag der Arbeit',
  '2027-05-06': 'Christi Himmelfahrt',
  '2027-05-17': 'Pfingstmontag',
  '2027-05-27': 'Fronleichnam',
  '2027-10-03': 'Tag der Deutschen Einheit',
  '2027-11-01': 'Allerheiligen',
  '2027-12-24': 'Heiligabend',
  '2027-12-25': 'Erster Weihnachtstag',
  '2027-12-26': 'Zweiter Weihnachtstag',
  '2027-12-31': 'Silvester',
};

const PRACTICE_HOURS: Record<number, { open: number; close: number } | null> = {
  0: { open: 8 * 60, close: 18 * 60 },
  1: { open: 8 * 60, close: 18 * 60 },
  2: { open: 8 * 60, close: 12 * 60 },
  3: { open: 8 * 60, close: 18 * 60 },
  4: { open: 8 * 60, close: 18 * 60 },
  5: null,
  6: null,
};

type DayStatus = 'available' | 'full' | 'unavailable' | 'today-closed';

interface DayAvailability {
  date: string;
  status: DayStatus;
  availableSlots?: number;
}

interface BookingCalendarProps {
  onSelectDate?: (date: string) => void;
}

const BookingCalendar = ({ onSelectDate }: BookingCalendarProps) => {
  const { state, selectDate } = useBooking();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [availability, setAvailability] = useState<Record<string, DayAvailability>>({});
  const [isLoading, setIsLoading] = useState(false);

  const maxDate = useMemo(() => addYears(new Date(), 2), []);
  const today = useMemo(() => new Date(), []);

  // Deterministische Berechnung des Tagesstatus (keine Zufallswerte!)
  const getDayStatus = useCallback((date: Date, serverTime: Date): DayStatus => {
    const dateStr = format(date, 'yyyy-MM-dd');
    const dayOfWeek = getDay(date);
    const adjustedDay = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    const hours = PRACTICE_HOURS[adjustedDay];
    
    // Wochenende
    if (isWeekend(date)) return 'unavailable';
    
    // Feiertage
    if (GERMAN_HOLIDAYS[dateStr]) return 'unavailable';
    
    // Zu weit in Zukunft (max 2 Jahre)
    if (date > maxDate) return 'unavailable';
    
    // Vergangene Tage
    if (isBefore(startOfDay(date), startOfDay(serverTime))) return 'unavailable';
    
    // Heute: Prüfe ob Praxis noch offen
    if (isSameDay(date, serverTime)) {
      if (!hours) return 'unavailable';
      const currentMinutes = getHours(serverTime) * 60 + getMinutes(serverTime);
      if (currentMinutes >= hours.close) return 'today-closed';
    }
    
    // Praxis geschlossen an diesem Wochentag
    if (!hours) return 'unavailable';
    
    return 'available';
  }, [maxDate]);

  // Lokale Verfügbarkeitsberechnung
  const calculateLocalAvailability = useCallback(() => {
    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);
    const days = eachDayOfInterval({ start, end });
    const localAvail: Record<string, DayAvailability> = {};
    
    days.forEach(day => {
      const dateStr = format(day, 'yyyy-MM-dd');
      const status = getDayStatus(day, state.serverTime);
      localAvail[dateStr] = { 
        date: dateStr, 
        status,
        availableSlots: status === 'available' ? -1 : 0
      };
    });
    setAvailability(localAvail);
  }, [currentMonth, state.serverTime, getDayStatus]);

  // Fetch availability from API
  useEffect(() => {
    const fetchAvailability = async () => {
      setIsLoading(true);
      try {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth() + 1;
        const response = await fetch(`${API_BASE}/api/availability/month?year=${year}&month=${month}`);
        
        if (response.ok) {
          const data = await response.json();
          const availMap: Record<string, DayAvailability> = {};
          if (data.days && Array.isArray(data.days)) {
            data.days.forEach((day: DayAvailability) => {
              availMap[day.date] = day;
            });
            setAvailability(availMap);
          } else {
            calculateLocalAvailability();
          }
        } else {
          calculateLocalAvailability();
        }
      } catch (error) {
        console.error('Availability fetch error:', error);
        calculateLocalAvailability();
      }
      setIsLoading(false);
    };
    
    fetchAvailability();
  }, [currentMonth, calculateLocalAvailability]);

  const calendarDays = useMemo(() => {
    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);
    const days = eachDayOfInterval({ start, end });
    const startDay = getDay(start);
    const adjustedStartDay = startDay === 0 ? 6 : startDay - 1;
    const paddingBefore = Array(adjustedStartDay).fill(null);
    return [...paddingBefore, ...days];
  }, [currentMonth]);

  const goToPreviousMonth = () => {
    const prevMonth = subMonths(currentMonth, 1);
    if (prevMonth >= startOfMonth(today)) {
      setCurrentMonth(prevMonth);
    }
  };

  const goToNextMonth = () => {
    const nextMonth = addMonths(currentMonth, 1);
    if (nextMonth <= addMonths(maxDate, 0)) {
      setCurrentMonth(nextMonth);
    }
  };

  const handleDayClick = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    const dayAvail = availability[dateStr];
    if (dayAvail?.status === 'available') {
      selectDate(dateStr);
      onSelectDate?.(dateStr);
    }
  };

  const getDayClassName = (date: Date | null): string => {
    if (!date) return 'invisible';
    const dateStr = format(date, 'yyyy-MM-dd');
    const dayAvail = availability[dateStr];
    const status = dayAvail?.status || getDayStatus(date, state.serverTime);
    const isSelected = state.selectedDate === dateStr;
    const isToday = isSameDay(date, today);
    const baseClasses = 'w-10 h-10 rounded-lg font-medium transition-all duration-200 flex items-center justify-center text-sm';
    
    if (!isSameMonth(date, currentMonth)) {
      return `${baseClasses} text-gray-300 cursor-default`;
    }
    if (isSelected) {
      return `${baseClasses} bg-primary text-white ring-2 ring-primary ring-offset-2 shadow-lg`;
    }
    switch (status) {
      case 'available':
        return `${baseClasses} bg-emerald-500 hover:bg-emerald-600 text-white cursor-pointer shadow-sm hover:shadow-md ${isToday ? 'ring-2 ring-emerald-300' : ''}`;
      case 'full':
        return `${baseClasses} bg-red-500 text-white cursor-not-allowed ${isToday ? 'ring-2 ring-red-300' : ''}`;
      case 'today-closed':
        return `${baseClasses} bg-gray-400 text-gray-100 cursor-not-allowed ring-2 ring-gray-300`;
      case 'unavailable':
      default:
        return `${baseClasses} bg-gray-300 text-gray-500 cursor-not-allowed`;
    }
  };

  const dayLabels = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];

  return (
    <Card className="shadow-medium animate-fade-in">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-xl">
            <Calendar className="h-5 w-5 text-secondary" />
            Datum wählen
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={goToPreviousMonth} disabled={currentMonth <= startOfMonth(today)} className="h-8 w-8">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="min-w-[140px] text-center font-semibold">
              {format(currentMonth, 'MMMM yyyy', { locale: de })}
            </span>
            <Button variant="outline" size="icon" onClick={goToNextMonth} disabled={currentMonth >= addMonths(maxDate, -1)} className="h-8 w-8">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-4 mb-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-emerald-500" />
            <span>Verfügbar</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-red-500" />
            <span>Ausgebucht</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-gray-300" />
            <span>Nicht verfügbar</span>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-2">
          {dayLabels.map((day, index) => (
            <div key={day} className={`text-center text-sm font-medium py-2 ${index >= 5 ? 'text-gray-400' : 'text-gray-600'}`}>
              {day}
            </div>
          ))}
          {isLoading ? (
            Array(35).fill(null).map((_, i) => (
              <div key={i} className="w-10 h-10 rounded-lg bg-gray-200 animate-pulse mx-auto" />
            ))
          ) : (
            calendarDays.map((date, index) => (
              <div key={index} className="flex justify-center">
                {date ? (
                  <button
                    onClick={() => handleDayClick(date)}
                    disabled={getDayStatus(date, state.serverTime) !== 'available'}
                    className={getDayClassName(date)}
                    title={GERMAN_HOLIDAYS[format(date, 'yyyy-MM-dd')] || undefined}
                  >
                    {format(date, 'd')}
                  </button>
                ) : (
                  <div className="w-10 h-10" />
                )}
              </div>
            ))
          )}
        </div>
        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
          <h4 className="font-medium text-sm mb-2">Sprechzeiten:</h4>
          <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
            <span>Mo, Di, Do, Fr:</span>
            <span>08:00 - 18:00 Uhr</span>
            <span>Mittwoch:</span>
            <span>08:00 - 12:00 Uhr</span>
            <span>Sa, So:</span>
            <span>Geschlossen</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingCalendar;
