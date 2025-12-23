import { useState } from 'react';
import { ArrowLeft, Mail, Lock, User, Eye, EyeOff, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useBooking } from '@/contexts/BookingContext';
import { format, parse } from 'date-fns';
import { de } from 'date-fns/locale';
import { authAPI } from '@/lib_api';

// API Base URL - bei Proxy leer lassen, sonst volle URL
const API_BASE = '';

interface AuthStepProps {
  onComplete?: () => void;
  onBack?: () => void;
}

// Google Icon Component
const GoogleIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
);

// Apple Icon Component
const AppleIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
  </svg>
);

const AuthStep = ({ onComplete, onBack }: AuthStepProps) => {
  const { state, goBack, goToStep, updateUser } = useBooking();
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register form state
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerPasswordConfirm, setRegisterPasswordConfirm] = useState('');
  
  // Email verification state
  const [showVerification, setShowVerification] = useState(false);
  const [verificationEmail, setVerificationEmail] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300);

  const selectedDate = state.selectedDate 
    ? parse(state.selectedDate, 'yyyy-MM-dd', new Date())
    : null;

  // Handle Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      // Verwende authAPI.login() statt direktem fetch
      await authAPI.login({
        email: loginEmail,
        password: loginPassword,
      });

      // Hole User-Daten mit authAPI
      const userData = await authAPI.getProfile();

      // Setze User-Data in BookingContext
      updateUser({
        id: userData.id,
        email: userData.email,
        firstName: userData.first_name || '',
        lastName: userData.last_name || '',
        birthDate: null,
        isVerified: userData.is_verified || true,
        profileComplete: !!(userData.first_name && userData.last_name),
      });

      onComplete?.();
    } catch (err) {
      console.error('Login error:', err);
      setError('Verbindungsfehler. Bitte versuchen Sie es erneut.');
    }
    setIsLoading(false);
  };

  // Handle Registration
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (registerPassword !== registerPasswordConfirm) {
      setError('Passwörter stimmen nicht überein');
      return;
    }

    if (registerPassword.length < 8) {
      setError('Passwort muss mindestens 8 Zeichen haben');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: registerEmail,
          password: registerPassword,
        }),
      });

      if (response.ok) {
        await fetch(`${API_BASE}/api/auth/send-verification`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: registerEmail }),
        });

        setVerificationEmail(registerEmail);
        setShowVerification(true);
        startVerificationTimer();
      } else {
        const errorData = await response.json();
        setError(errorData.detail || 'Registrierung fehlgeschlagen');
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError('Verbindungsfehler. Bitte versuchen Sie es erneut.');
    }
    setIsLoading(false);
  };

  // Verification timer
  const startVerificationTimer = () => {
    setTimeLeft(300);
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Check verification status
  const checkVerification = async () => {
    setIsVerifying(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE}/api/auth/check-verification?email=${encodeURIComponent(verificationEmail)}`);
      if (response.ok) {
        const data = await response.json();
        if (data.verified) {
          setIsVerified(true);
          handleAutoLogin();
        } else {
          setError('E-Mail noch nicht verifiziert. Bitte klicken Sie auf den Link in der E-Mail.');
        }
      }
    } catch (err) {
      console.error('Verification check error:', err);
      setError('Fehler bei der Überprüfung');
    }
    setIsVerifying(false);
  };

  // Auto-login after verification
  const handleAutoLogin = async () => {
    try {
      // Verwende authAPI.login() für Auto-Login nach Registrierung
      await authAPI.login({
        email: verificationEmail,
        password: registerPassword,
      });

      // Setze minimale User-Data für neuen User
      updateUser({
        email: verificationEmail,
        firstName: '',
        lastName: '',
        birthDate: null,
        isVerified: true,
        profileComplete: false,
      });

      goToStep('profile');
    } catch (err) {
      console.error('Auto-login error:', err);
      setError('Automatische Anmeldung fehlgeschlagen');
    }
  };

  // OAuth handlers - für Login UND Registrierung
  const handleGoogleAuth = async (isRegister: boolean = false) => {
    setError(null);
    setIsLoading(true);
    try {
      const redirectUri = encodeURIComponent(window.location.origin + '/oauth/callback');
      const oauthState = isRegister ? 'register' : 'login';
      const response = await fetch(`${API_BASE}/api/auth/oauth/google?redirect_uri=${redirectUri}&state=${oauthState}`);
      if (response.ok) {
        const data = await response.json();
        // Speichere Termin-Daten in sessionStorage für nach OAuth
        sessionStorage.setItem('booking_state', JSON.stringify({
          selectedDate: state.selectedDate,
          selectedTime: state.selectedTime,
        }));
        window.location.href = data.oauth_url;
      } else {
        setError('Google-Authentifizierung nicht verfügbar. Bitte nutzen Sie E-Mail.');
      }
    } catch (err) {
      console.error('Google OAuth error:', err);
      setError('Google-Authentifizierung nicht verfügbar');
    }
    setIsLoading(false);
  };

  const handleAppleAuth = async (isRegister: boolean = false) => {
    setError(null);
    setIsLoading(true);
    try {
      const redirectUri = encodeURIComponent(window.location.origin + '/oauth/callback');
      const oauthState = isRegister ? 'register' : 'login';
      const response = await fetch(`${API_BASE}/api/auth/oauth/apple?redirect_uri=${redirectUri}&state=${oauthState}`);
      if (response.ok) {
        const data = await response.json();
        sessionStorage.setItem('booking_state', JSON.stringify({
          selectedDate: state.selectedDate,
          selectedTime: state.selectedTime,
        }));
        window.location.href = data.oauth_url;
      } else {
        setError('Apple-Authentifizierung nicht verfügbar. Bitte nutzen Sie E-Mail.');
      }
    } catch (err) {
      console.error('Apple OAuth error:', err);
      setError('Apple-Authentifizierung nicht verfügbar');
    }
    setIsLoading(false);
  };

  const handleBack = () => {
    goBack();
    onBack?.();
  };

  const formatTimeLeft = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes}:${String(seconds).padStart(2, '0')}`;
  };

  // OAuth Buttons Component - wiederverwendbar für Login und Register
  const OAuthButtons = ({ isRegister = false }: { isRegister?: boolean }) => (
    <div className="space-y-3">
      <Button 
        type="button"
        variant="outline" 
        className="w-full h-12 gap-3 hover:bg-gray-50"
        onClick={() => handleGoogleAuth(isRegister)}
        disabled={isLoading}
      >
        <GoogleIcon />
        {isRegister ? 'Mit Google registrieren' : 'Weiter mit Google'}
      </Button>
      
      <Button 
        type="button"
        variant="outline" 
        className="w-full h-12 gap-3 bg-black text-white hover:bg-gray-900"
        onClick={() => handleAppleAuth(isRegister)}
        disabled={isLoading}
      >
        <AppleIcon />
        {isRegister ? 'Mit Apple registrieren' : 'Weiter mit Apple'}
      </Button>
    </div>
  );

  // Divider Component
  const Divider = () => (
    <div className="relative my-4">
      <div className="absolute inset-0 flex items-center">
        <span className="w-full border-t" />
      </div>
      <div className="relative flex justify-center text-xs uppercase">
        <span className="bg-background px-2 text-muted-foreground">oder mit E-Mail</span>
      </div>
    </div>
  );

  return (
    <Card className="shadow-medium animate-fade-in">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-xl">
              <User className="h-5 w-5 text-secondary" />
              Anmelden oder Registrieren
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
        {showVerification ? (
          <div className="space-y-6">
            <div className="text-center">
              {isVerified ? (
                <div className="space-y-4">
                  <div className="w-16 h-16 mx-auto bg-emerald-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-8 w-8 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-emerald-600">E-Mail verifiziert!</h3>
                    <p className="text-muted-foreground">Sie werden weitergeleitet...</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="w-16 h-16 mx-auto bg-secondary/10 rounded-full flex items-center justify-center">
                    <Mail className="h-8 w-8 text-secondary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">E-Mail-Verifizierung</h3>
                    <p className="text-muted-foreground">
                      Wir haben einen Bestätigungslink an<br />
                      <strong>{verificationEmail}</strong> gesendet.
                    </p>
                  </div>
                  
                  <div className="text-sm text-muted-foreground">
                    Link gültig für: <span className="font-mono font-medium">{formatTimeLeft()}</span>
                  </div>

                  {timeLeft === 0 && (
                    <p className="text-red-500 text-sm">Link abgelaufen. Bitte erneut registrieren.</p>
                  )}

                  {error && (
                    <p className="text-red-500 text-sm flex items-center justify-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      {error}
                    </p>
                  )}
                </div>
              )}
            </div>

            {!isVerified && timeLeft > 0 && (
              <Button 
                onClick={checkVerification} 
                disabled={isVerifying}
                className="w-full medical-gradient"
              >
                {isVerifying ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Überprüfe...
                  </>
                ) : (
                  'Ich habe verifiziert'
                )}
              </Button>
            )}
          </div>
        ) : (
          <Tabs value={activeTab} onValueChange={(v) => { setActiveTab(v as 'login' | 'register'); setError(null); }}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Anmelden</TabsTrigger>
              <TabsTrigger value="register">Registrieren</TabsTrigger>
            </TabsList>

            {/* Login Tab */}
            <TabsContent value="login" className="space-y-4 mt-4">
              <OAuthButtons isRegister={false} />
              <Divider />

              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">E-Mail</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="ihre@email.de"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      className="pl-10"
                      required
                      autoComplete="email"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="login-password">Passwort</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="login-password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      className="pl-10 pr-10"
                      required
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {error && activeTab === 'login' && (
                  <p className="text-red-500 text-sm flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {error}
                  </p>
                )}

                <Button type="submit" className="w-full medical-gradient" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Anmeldung...
                    </>
                  ) : (
                    'Anmelden'
                  )}
                </Button>
              </form>
            </TabsContent>

            {/* Register Tab */}
            <TabsContent value="register" className="space-y-4 mt-4">
              {/* OAuth auch bei Registrierung */}
              <OAuthButtons isRegister={true} />
              
              <p className="text-xs text-center text-muted-foreground">
                Bei OAuth-Registrierung wird Ihr Profil automatisch erstellt. 
                Sie müssen danach nur noch Ihre Daten vervollständigen.
              </p>

              <Divider />

              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="register-email">E-Mail *</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="ihre@email.de"
                      value={registerEmail}
                      onChange={(e) => setRegisterEmail(e.target.value)}
                      className="pl-10"
                      required
                      autoComplete="email"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="register-password">Passwort * (min. 8 Zeichen)</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="register-password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={registerPassword}
                      onChange={(e) => setRegisterPassword(e.target.value)}
                      className="pl-10 pr-10"
                      minLength={8}
                      required
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="register-password-confirm">Passwort bestätigen *</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="register-password-confirm"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={registerPasswordConfirm}
                      onChange={(e) => setRegisterPasswordConfirm(e.target.value)}
                      className="pl-10"
                      minLength={8}
                      required
                      autoComplete="new-password"
                    />
                  </div>
                </div>

                {error && activeTab === 'register' && (
                  <p className="text-red-500 text-sm flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {error}
                  </p>
                )}

                <p className="text-xs text-muted-foreground">
                  Nach der Registrierung erhalten Sie eine E-Mail zur Bestätigung. 
                  Danach können Sie Ihr Profil vervollständigen.
                </p>

                <Button type="submit" className="w-full medical-gradient" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Registrierung...
                    </>
                  ) : (
                    'Registrieren'
                  )}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
    </Card>
  );
};

export default AuthStep;