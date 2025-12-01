import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Cookie } from "lucide-react";

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem("cookieConsent", "all");
    setIsVisible(false);
  };

  const handleAcceptNecessary = () => {
    localStorage.setItem("cookieConsent", "necessary");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-card border-t border-border shadow-strong animate-fade-in">
      <div className="container mx-auto max-w-4xl">
        {!showSettings ? (
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start space-x-3 flex-1">
              <Cookie className="h-6 w-6 text-secondary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-1">Cookie-Einstellungen</h3>
                <p className="text-sm text-muted-foreground">
                  Wir verwenden Cookies, um Ihre Erfahrung zu verbessern. Diese Website nutzt nur
                  notwendige Cookies für die Grundfunktionalität. Keine Tracking-Cookies werden gesetzt.
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
              <Button
                variant="outline"
                onClick={() => setShowSettings(true)}
                className="w-full sm:w-auto"
              >
                Einstellungen
              </Button>
              <Button
                variant="outline"
                onClick={handleAcceptNecessary}
                className="w-full sm:w-auto"
              >
                Nur Notwendige
              </Button>
              <Button
                onClick={handleAcceptAll}
                className="w-full sm:w-auto medical-gradient"
              >
                Alle akzeptieren
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <h3 className="font-semibold">Cookie-Einstellungen</h3>
            <div className="space-y-3">
              <div className="flex items-start justify-between p-3 rounded-lg bg-muted">
                <div>
                  <h4 className="font-medium text-sm">Notwendige Cookies</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    Erforderlich für die Grundfunktionalität der Website
                  </p>
                </div>
                <span className="text-xs text-muted-foreground">Immer aktiv</span>
              </div>
              <div className="flex items-start justify-between p-3 rounded-lg bg-muted/50">
                <div>
                  <h4 className="font-medium text-sm">Analytische Cookies</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    Helfen uns, die Nutzung zu verstehen (Derzeit nicht aktiv)
                  </p>
                </div>
                <span className="text-xs text-muted-foreground">Deaktiviert</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button
                variant="outline"
                onClick={() => setShowSettings(false)}
                className="w-full sm:w-auto"
              >
                Zurück
              </Button>
              <Button
                onClick={handleAcceptNecessary}
                className="w-full sm:w-auto medical-gradient"
              >
                Speichern
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CookieBanner;
