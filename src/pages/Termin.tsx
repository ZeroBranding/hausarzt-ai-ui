import { useMemo } from "react";
import { Calendar, Clock, User, FileText, CheckCircle } from "lucide-react";
import SchemaMarkup from "@/components/SchemaMarkup";
import { BookingProvider, useBooking } from "@/contexts/BookingContext";
import BookingCalendar from "@/components/booking/BookingCalendar";
import TimeSlotPicker from "@/components/booking/TimeSlotPicker";
import AuthStep from "@/components/booking/AuthStep";
import ProfileForm from "@/components/booking/ProfileForm";
import BookingConfirmation from "@/components/booking/BookingConfirmation";

// Progress Step Component
const ProgressStep = ({ 
  step, 
  label, 
  icon: Icon, 
  isActive, 
  isCompleted 
}: { 
  step: number; 
  label: string; 
  icon: React.ElementType; 
  isActive: boolean; 
  isCompleted: boolean;
}) => (
  <div className="flex flex-col items-center">
    <div 
      className={`
        w-10 h-10 rounded-full flex items-center justify-center font-medium transition-all duration-300
        ${isCompleted 
          ? 'bg-emerald-500 text-white shadow-md' 
          : isActive 
            ? 'medical-gradient text-white shadow-lg ring-4 ring-primary/20' 
            : 'bg-gray-200 text-gray-500'
        }
      `}
    >
      {isCompleted ? (
        <CheckCircle className="h-5 w-5" />
      ) : (
        <Icon className="h-5 w-5" />
      )}
    </div>
    <span className={`mt-2 text-xs font-medium ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>
      {label}
    </span>
  </div>
);

// Progress Line
const ProgressLine = ({ isCompleted }: { isCompleted: boolean }) => (
  <div className={`flex-1 h-1 mx-2 rounded transition-colors duration-300 ${isCompleted ? 'bg-emerald-500' : 'bg-gray-200'}`} />
);

// Booking Flow Content
const BookingFlowContent = () => {
  const { state } = useBooking();

  const steps = [
    { key: 'calendar', label: 'Datum', icon: Calendar },
    { key: 'time', label: 'Uhrzeit', icon: Clock },
    { key: 'auth', label: 'Anmelden', icon: User },
    { key: 'profile', label: 'Profil', icon: FileText },
    { key: 'confirm', label: 'Bestätigen', icon: CheckCircle },
  ];

  const currentStepIndex = useMemo(() => {
    return steps.findIndex(s => s.key === state.step);
  }, [state.step]);

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-4xl font-bold text-primary md:text-5xl animate-fade-in">
            Termin buchen
          </h1>
          <p className="text-lg text-muted-foreground animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Wählen Sie Ihren Wunschtermin in wenigen Schritten
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-12 hidden sm:block">
          <div className="flex items-center justify-center">
            {steps.map((step, index) => (
              <div key={step.key} className="flex items-center">
                <ProgressStep
                  step={index + 1}
                  label={step.label}
                  icon={step.icon}
                  isActive={currentStepIndex === index}
                  isCompleted={currentStepIndex > index}
                />
                {index < steps.length - 1 && (
                  <ProgressLine isCompleted={currentStepIndex > index} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Progress */}
        <div className="mb-8 sm:hidden">
          <div className="flex items-center justify-between px-4">
            <span className="text-sm font-medium text-primary">
              Schritt {currentStepIndex + 1} von {steps.length}
            </span>
            <span className="text-sm text-muted-foreground">
              {steps[currentStepIndex]?.label}
            </span>
          </div>
          <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full medical-gradient transition-all duration-500"
              style={{ width: `${((currentStepIndex + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Step Content */}
        <div className="transition-all duration-300">
          {state.step === 'calendar' && (
            <BookingCalendar />
          )}
          
          {state.step === 'time' && (
            <TimeSlotPicker />
          )}
          
          {state.step === 'auth' && (
            <AuthStep />
          )}
          
          {state.step === 'profile' && (
            <ProfileForm />
          )}
          
          {state.step === 'confirm' && (
            <BookingConfirmation />
          )}
        </div>

        {/* Info Sidebar - Show on Calendar and Time steps */}
        {(state.step === 'calendar' || state.step === 'time') && (
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="p-6 bg-muted/50 rounded-lg">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Clock className="h-5 w-5 text-secondary" />
                Sprechzeiten
              </h4>
              <div className="text-sm space-y-2 text-muted-foreground">
                <div className="flex justify-between">
                  <span>Mo, Di, Do, Fr:</span>
                  <span className="font-medium text-foreground">08:00 - 18:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Mittwoch:</span>
                  <span className="font-medium text-foreground">08:00 - 12:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Sa, So:</span>
                  <span className="font-medium text-foreground">Geschlossen</span>
                </div>
              </div>
            </div>

            <div className="p-6 bg-secondary/5 rounded-lg border border-secondary/20">
              <h4 className="font-semibold mb-3">Wichtige Hinweise</h4>
              <ul className="text-sm space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-secondary">•</span>
                  Bitte erscheinen Sie 5 Minuten vor Ihrem Termin
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-secondary">•</span>
                  Bringen Sie Ihre Versichertenkarte mit
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-secondary">•</span>
                  Bei Verhinderung: Absage mindestens 24h vorher
                </li>
              </ul>
              <p className="mt-4 text-sm font-medium text-primary">
                Notfälle: 112 oder Bereitschaftsdienst 116 117
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Main Component with Provider
const Termin = () => {
  return (
    <>
      <SchemaMarkup 
        title="Termin buchen"
        description="Buchen Sie Ihren Arzttermin online - einfach, schnell und bequem. Wählen Sie Ihren Wunschtermin aus unserem Kalender."
      />
      
      <BookingProvider>
        <BookingFlowContent />
      </BookingProvider>
    </>
  );
};

export default Termin;