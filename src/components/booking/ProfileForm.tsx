import { useState } from 'react';
import { ArrowLeft, User, CheckCircle, AlertCircle, MapPin, Loader2 } from 'lucide-react';

// API Base URL - bei Vite Proxy leer lassen
const API_BASE = '';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useBooking } from '@/contexts/BookingContext';
import { format, parse } from 'date-fns';
import { de } from 'date-fns/locale';

// Termingrund-Optionen
const APPOINTMENT_REASONS = [
  { value: 'AU', label: 'Arbeitsunfähigkeitsbescheinigung (AU/Krankenschein)' },
  { value: 'Blutabnahme', label: 'Blutabnahme / Laboruntersuchung' },
  { value: 'Rezept', label: 'Rezept / Medikament' },
  { value: 'Impfung', label: 'Impfung' },
  { value: 'Vorsorge', label: 'Vorsorgeuntersuchung' },
  { value: 'Ueberweisung', label: 'Überweisung zum Facharzt' },
  { value: 'Befund', label: 'Befundbesprechung' },
  { value: 'Erstberatung', label: 'Erstberatung / Neuer Patient' },
  { value: 'Akut', label: 'Akute Beschwerden' },
  { value: 'Chronisch', label: 'Chronische Erkrankung' },
  { value: 'Sonstiges', label: 'Sonstiges (bitte beschreiben)' },
];

// Tage für Dropdown
const DAYS = Array.from({ length: 31 }, (_, i) => i + 1);
const MONTHS = [
  { value: 1, label: 'Januar' },
  { value: 2, label: 'Februar' },
  { value: 3, label: 'März' },
  { value: 4, label: 'April' },
  { value: 5, label: 'Mai' },
  { value: 6, label: 'Juni' },
  { value: 7, label: 'Juli' },
  { value: 8, label: 'August' },
  { value: 9, label: 'September' },
  { value: 10, label: 'Oktober' },
  { value: 11, label: 'November' },
  { value: 12, label: 'Dezember' },
];
const YEARS = Array.from({ length: 120 }, (_, i) => new Date().getFullYear() - i);

interface ProfileFormProps {
  onComplete?: () => void;
  onBack?: () => void;
}

interface FormData {
  firstName: string;
  lastName: string;
  birthDay: number | null;
  birthMonth: number | null;
  birthYear: number | null;
  phone: string;
  street: string;
  houseNumber: string;
  postalCode: string;
  city: string;
  appointmentReason: string;
  customReason: string;
}

interface FieldStatus {
  valid: boolean;
  touched: boolean;
}

const ProfileForm = ({ onComplete, onBack }: ProfileFormProps) => {
  const { state, goBack, updateUser, setReason, goToStep } = useBooking();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Address autocomplete
  const [addressSuggestions, setAddressSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    firstName: state.user?.firstName || '',
    lastName: state.user?.lastName || '',
    birthDay: state.user?.birthDate?.day || null,
    birthMonth: state.user?.birthDate?.month || null,
    birthYear: state.user?.birthDate?.year || null,
    phone: state.user?.phone || '',
    street: state.user?.street || '',
    houseNumber: state.user?.houseNumber || '',
    postalCode: state.user?.postalCode || '',
    city: state.user?.city || '',
    appointmentReason: state.appointmentReason || '',
    customReason: state.customReason || '',
  });

  const [fieldStatus, setFieldStatus] = useState<Record<string, FieldStatus>>({});

  const selectedDate = state.selectedDate 
    ? parse(state.selectedDate, 'yyyy-MM-dd', new Date())
    : null;

  // Validate field
  const validateField = (name: string, value: any): boolean => {
    switch (name) {
      case 'firstName':
      case 'lastName':
      case 'street':
      case 'city':
        return typeof value === 'string' && value.length >= 2;
      case 'houseNumber':
        return typeof value === 'string' && value.length >= 1;
      case 'postalCode':
        return typeof value === 'string' && /^\d{5}$/.test(value);
      case 'birthDay':
        return value !== null && value >= 1 && value <= 31;
      case 'birthMonth':
        return value !== null && value >= 1 && value <= 12;
      case 'birthYear':
        return value !== null && value >= 1900 && value <= new Date().getFullYear();
      case 'appointmentReason':
        if (value === 'Sonstiges') {
          return formData.customReason.length >= 2;
        }
        return typeof value === 'string' && value.length > 0;
      case 'customReason':
        if (formData.appointmentReason === 'Sonstiges') {
          return typeof value === 'string' && value.length >= 2;
        }
        return true;
      case 'phone':
        return true; // Optional
      default:
        return true;
    }
  };

  // Update field
  const handleFieldChange = (name: string, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    setFieldStatus(prev => ({
      ...prev,
      [name]: { touched: true, valid: validateField(name, value) }
    }));
  };

  // Get field indicator
  const getFieldIndicator = (name: string, isOptional = false) => {
    const status = fieldStatus[name];
    if (!status?.touched && !isOptional) {
      return <AlertCircle className="h-4 w-4 text-red-500 opacity-50" />;
    }
    if (status?.valid) {
      return <CheckCircle className="h-4 w-4 text-emerald-500" />;
    }
    if (!isOptional) {
      return <AlertCircle className="h-4 w-4 text-red-500" />;
    }
    return null;
  };

  // Address autocomplete using OpenStreetMap Nominatim
  const searchAddress = async (query: string) => {
    if (query.length < 3) {
      setAddressSuggestions([]);
      return;
    }

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&countrycodes=de&addressdetails=1&limit=5`
      );
      if (response.ok) {
        const data = await response.json();
        setAddressSuggestions(data);
        setShowSuggestions(true);
      }
    } catch {
      // Silent fail for address autocomplete
    }
  };

  // Handle address selection
  const handleAddressSelect = (suggestion: any) => {
    const address = suggestion.address;
    setFormData(prev => ({
      ...prev,
      street: address.road || '',
      houseNumber: address.house_number || '',
      postalCode: address.postcode || '',
      city: address.city || address.town || address.village || '',
    }));
    
    // Mark fields as touched and valid
    ['street', 'houseNumber', 'postalCode', 'city'].forEach(field => {
      const value = field === 'street' ? address.road :
                    field === 'houseNumber' ? address.house_number :
                    field === 'postalCode' ? address.postcode :
                    address.city || address.town || address.village;
      setFieldStatus(prev => ({
        ...prev,
        [field]: { touched: true, valid: validateField(field, value || '') }
      }));
    });
    
    setShowSuggestions(false);
  };

  // Check if form is valid
  const isFormValid = (): boolean => {
    const requiredFields = [
      'firstName', 'lastName', 'birthDay', 'birthMonth', 'birthYear',
      'street', 'houseNumber', 'postalCode', 'city', 'appointmentReason'
    ];
    
    for (const field of requiredFields) {
      if (!validateField(field, formData[field as keyof FormData])) {
        return false;
      }
    }
    
    if (formData.appointmentReason === 'Sonstiges' && !validateField('customReason', formData.customReason)) {
      return false;
    }
    
    return true;
  };

  // Handle submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Touch all fields for validation display
    const allFields = ['firstName', 'lastName', 'birthDay', 'birthMonth', 'birthYear', 'street', 'houseNumber', 'postalCode', 'city', 'appointmentReason', 'customReason'];
    const newFieldStatus: Record<string, FieldStatus> = {};
    allFields.forEach(field => {
      newFieldStatus[field] = {
        touched: true,
        valid: validateField(field, formData[field as keyof FormData])
      };
    });
    setFieldStatus(newFieldStatus);
    
    if (!isFormValid()) {
      setError('Bitte füllen Sie alle Pflichtfelder korrekt aus.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Update user profile in backend
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE}/api/patients/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          first_name: formData.firstName,
          last_name: formData.lastName,
          date_of_birth: `${formData.birthYear}-${String(formData.birthMonth).padStart(2, '0')}-${String(formData.birthDay).padStart(2, '0')}`,
        }),
      });

      if (response.ok) {
        // Update local state
        updateUser({
          firstName: formData.firstName,
          lastName: formData.lastName,
          birthDate: {
            day: formData.birthDay!,
            month: formData.birthMonth!,
            year: formData.birthYear!,
          },
          phone: formData.phone,
          street: formData.street,
          houseNumber: formData.houseNumber,
          postalCode: formData.postalCode,
          city: formData.city,
          profileComplete: true,
        });
        
        setReason(formData.appointmentReason, formData.customReason);
        goToStep('confirm');
        onComplete?.();
      } else {
        // Continue anyway for demo
        updateUser({
          firstName: formData.firstName,
          lastName: formData.lastName,
          birthDate: {
            day: formData.birthDay!,
            month: formData.birthMonth!,
            year: formData.birthYear!,
          },
          profileComplete: true,
        });
        setReason(formData.appointmentReason, formData.customReason);
        goToStep('confirm');
        onComplete?.();
      }
    } catch {
      // Continue anyway for demo
      updateUser({
        firstName: formData.firstName,
        lastName: formData.lastName,
        birthDate: {
          day: formData.birthDay!,
          month: formData.birthMonth!,
          year: formData.birthYear!,
        },
        profileComplete: true,
      });
      setReason(formData.appointmentReason, formData.customReason);
      goToStep('confirm');
      onComplete?.();
    }
    setIsLoading(false);
  };

  const handleBack = () => {
    goBack();
    onBack?.();
  };

  return (
    <Card className="shadow-medium animate-fade-in">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-xl">
              <User className="h-5 w-5 text-secondary" />
              Profil vervollständigen
            </CardTitle>
            {selectedDate && state.selectedTime && (
              <CardDescription className="mt-1">
                Termin: {format(selectedDate, "d. MMMM yyyy", { locale: de })} um {state.selectedTime} Uhr
              </CardDescription>
            )}
          </div>
          <Button variant="outline" size="sm" onClick={handleBack} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Zurück
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Data */}
          <div className="space-y-4">
            <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Persönliche Daten</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="flex items-center gap-2">
                  Vorname *
                  {getFieldIndicator('firstName')}
                </Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleFieldChange('firstName', e.target.value)}
                  placeholder="Max"
                  className={fieldStatus.firstName?.touched && !fieldStatus.firstName?.valid ? 'border-red-500' : ''}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName" className="flex items-center gap-2">
                  Nachname *
                  {getFieldIndicator('lastName')}
                </Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleFieldChange('lastName', e.target.value)}
                  placeholder="Mustermann"
                  className={fieldStatus.lastName?.touched && !fieldStatus.lastName?.valid ? 'border-red-500' : ''}
                />
              </div>
            </div>

            {/* Birth Date - German Format */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                Geburtsdatum *
                {fieldStatus.birthDay?.valid && fieldStatus.birthMonth?.valid && fieldStatus.birthYear?.valid 
                  ? <CheckCircle className="h-4 w-4 text-emerald-500" />
                  : <AlertCircle className="h-4 w-4 text-red-500 opacity-50" />
                }
              </Label>
              <div className="grid grid-cols-3 gap-2">
                <Select 
                  value={formData.birthDay?.toString() || ''} 
                  onValueChange={(v) => handleFieldChange('birthDay', parseInt(v))}
                >
                  <SelectTrigger className={fieldStatus.birthDay?.touched && !fieldStatus.birthDay?.valid ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Tag" />
                  </SelectTrigger>
                  <SelectContent>
                    {DAYS.map(day => (
                      <SelectItem key={day} value={day.toString()}>
                        {String(day).padStart(2, '0')}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select 
                  value={formData.birthMonth?.toString() || ''} 
                  onValueChange={(v) => handleFieldChange('birthMonth', parseInt(v))}
                >
                  <SelectTrigger className={fieldStatus.birthMonth?.touched && !fieldStatus.birthMonth?.valid ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Monat" />
                  </SelectTrigger>
                  <SelectContent>
                    {MONTHS.map(month => (
                      <SelectItem key={month.value} value={month.value.toString()}>
                        {month.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select 
                  value={formData.birthYear?.toString() || ''} 
                  onValueChange={(v) => handleFieldChange('birthYear', parseInt(v))}
                >
                  <SelectTrigger className={fieldStatus.birthYear?.touched && !fieldStatus.birthYear?.valid ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Jahr" />
                  </SelectTrigger>
                  <SelectContent>
                    {YEARS.map(year => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2">
                Telefonnummer (optional)
              </Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleFieldChange('phone', e.target.value)}
                placeholder="+49 123 456789"
              />
            </div>
          </div>

          {/* Address */}
          <div className="space-y-4">
            <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wide flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Adresse
            </h3>

            <div className="relative">
              <div className="grid grid-cols-3 gap-2">
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="street" className="flex items-center gap-2">
                    Straße *
                    {getFieldIndicator('street')}
                  </Label>
                  <Input
                    id="street"
                    value={formData.street}
                    onChange={(e) => {
                      handleFieldChange('street', e.target.value);
                      searchAddress(`${e.target.value} ${formData.houseNumber}`);
                    }}
                    onFocus={() => setShowSuggestions(addressSuggestions.length > 0)}
                    placeholder="Musterstraße"
                    className={fieldStatus.street?.touched && !fieldStatus.street?.valid ? 'border-red-500' : ''}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="houseNumber" className="flex items-center gap-2">
                    Nr. *
                    {getFieldIndicator('houseNumber')}
                  </Label>
                  <Input
                    id="houseNumber"
                    value={formData.houseNumber}
                    onChange={(e) => {
                      handleFieldChange('houseNumber', e.target.value);
                      searchAddress(`${formData.street} ${e.target.value}`);
                    }}
                    placeholder="12a"
                    className={fieldStatus.houseNumber?.touched && !fieldStatus.houseNumber?.valid ? 'border-red-500' : ''}
                  />
                </div>
              </div>

              {/* Address Suggestions */}
              {showSuggestions && addressSuggestions.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-48 overflow-y-auto">
                  {addressSuggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleAddressSelect(suggestion)}
                      className="w-full px-4 py-2 text-left hover:bg-muted text-sm"
                    >
                      {suggestion.display_name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div className="space-y-2">
                <Label htmlFor="postalCode" className="flex items-center gap-2">
                  PLZ *
                  {getFieldIndicator('postalCode')}
                </Label>
                <Input
                  id="postalCode"
                  value={formData.postalCode}
                  onChange={(e) => handleFieldChange('postalCode', e.target.value)}
                  placeholder="12345"
                  maxLength={5}
                  className={fieldStatus.postalCode?.touched && !fieldStatus.postalCode?.valid ? 'border-red-500' : ''}
                />
              </div>

              <div className="col-span-2 space-y-2">
                <Label htmlFor="city" className="flex items-center gap-2">
                  Stadt *
                  {getFieldIndicator('city')}
                </Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => handleFieldChange('city', e.target.value)}
                  placeholder="Münster"
                  className={fieldStatus.city?.touched && !fieldStatus.city?.valid ? 'border-red-500' : ''}
                />
              </div>
            </div>
          </div>

          {/* Appointment Reason */}
          <div className="space-y-4">
            <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Termingrund</h3>

            <div className="space-y-2">
              <Label htmlFor="appointmentReason" className="flex items-center gap-2">
                Grund des Termins *
                {getFieldIndicator('appointmentReason')}
              </Label>
              <Select 
                value={formData.appointmentReason} 
                onValueChange={(v) => handleFieldChange('appointmentReason', v)}
              >
                <SelectTrigger className={fieldStatus.appointmentReason?.touched && !fieldStatus.appointmentReason?.valid ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Bitte wählen Sie einen Grund" />
                </SelectTrigger>
                <SelectContent>
                  {APPOINTMENT_REASONS.map(reason => (
                    <SelectItem key={reason.value} value={reason.value}>
                      {reason.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {formData.appointmentReason === 'Sonstiges' && (
              <div className="space-y-2">
                <Label htmlFor="customReason" className="flex items-center gap-2">
                  Beschreiben Sie Ihr Anliegen *
                  {getFieldIndicator('customReason')}
                </Label>
                <Textarea
                  id="customReason"
                  value={formData.customReason}
                  onChange={(e) => handleFieldChange('customReason', e.target.value)}
                  placeholder="Bitte beschreiben Sie kurz Ihr Anliegen (min. 2 Zeichen)..."
                  rows={3}
                  className={fieldStatus.customReason?.touched && !fieldStatus.customReason?.valid ? 'border-red-500' : ''}
                />
              </div>
            )}
          </div>

          {error && (
            <p className="text-red-500 text-sm flex items-center gap-1">
              <AlertCircle className="h-4 w-4" />
              {error}
            </p>
          )}

          <Button 
            type="submit" 
            className="w-full medical-gradient" 
            disabled={isLoading}
            size="lg"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Wird gespeichert...
              </>
            ) : (
              'Weiter zur Bestätigung'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProfileForm;
