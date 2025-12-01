import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { X, Cookie, Settings } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";

const CookieBanner = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true,
    functional: false,
    analytics: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const acceptAll = () => {
    localStorage.setItem("cookieConsent", "all");
    setShowBanner(false);
  };

  const acceptNecessary = () => {
    localStorage.setItem("cookieConsent", "necessary");
    setShowBanner(false);
  };

  const savePreferences = () => {
    localStorage.setItem("cookieConsent", JSON.stringify(preferences));
    setShowSettings(false);
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <>
      <Card className="fixed bottom-4 right-4 left-4 md:left-auto md:max-w-md z-50 p-6 shadow-strong border-2 border-border animate-slide-up">
        <button
          onClick={acceptNecessary}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-smooth"
          aria-label="Banner schließen"
        >
          <X className="h-5 w-5" />
        </button>
        
        <div className="flex items-start space-x-4">
          <div className="p-2 rounded-lg bg-secondary/10">
            <Cookie className="h-6 w-6 text-secondary" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold mb-2">🍪 Cookie-Einstellungen</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Wir verwenden Cookies, um Ihnen die beste Erfahrung auf unserer Website zu bieten. 
              Notwendige Cookies sind für die Funktionalität der Website erforderlich.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-2">
              <Button
                onClick={acceptAll}
                className="flex-1 medical-gradient hover-scale"
                size="sm"
              >
                Alle akzeptieren
              </Button>
              <Button
                onClick={acceptNecessary}
                variant="outline"
                className="flex-1"
                size="sm"
              >
                Nur Notwendige
              </Button>
              <Button
                onClick={() => setShowSettings(true)}
                variant="ghost"
                size="sm"
                className="flex-1"
              >
                <Settings className="mr-2 h-4 w-4" />
                Einstellungen
              </Button>
            </div>
          </div>
        </div>
      </Card>

      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Cookie className="h-5 w-5 text-secondary" />
              <span>Cookie-Einstellungen verwalten</span>
            </DialogTitle>
            <DialogDescription>
              Wählen Sie, welche Cookies Sie zulassen möchten. Notwendige Cookies können nicht deaktiviert werden.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div className="flex items-center justify-between space-x-4 p-4 border border-border rounded-lg">
              <div className="flex-1">
                <Label htmlFor="necessary" className="font-semibold">
                  Notwendige Cookies
                </Label>
                <p className="text-sm text-muted-foreground mt-1">
                  Diese Cookies sind für die Grundfunktionen der Website erforderlich.
                </p>
              </div>
              <Switch
                id="necessary"
                checked={preferences.necessary}
                disabled
              />
            </div>

            <div className="flex items-center justify-between space-x-4 p-4 border border-border rounded-lg">
              <div className="flex-1">
                <Label htmlFor="functional" className="font-semibold">
                  Funktionale Cookies
                </Label>
                <p className="text-sm text-muted-foreground mt-1">
                  Ermöglichen erweiterte Funktionen und Personalisierung.
                </p>
              </div>
              <Switch
                id="functional"
                checked={preferences.functional}
                onCheckedChange={(checked) =>
                  setPreferences({ ...preferences, functional: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between space-x-4 p-4 border border-border rounded-lg">
              <div className="flex-1">
                <Label htmlFor="analytics" className="font-semibold">
                  Analyse-Cookies
                </Label>
                <p className="text-sm text-muted-foreground mt-1">
                  Helfen uns, die Nutzung der Website zu verstehen und zu verbessern.
                </p>
              </div>
              <Switch
                id="analytics"
                checked={preferences.analytics}
                onCheckedChange={(checked) =>
                  setPreferences({ ...preferences, analytics: checked })
                }
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSettings(false)}>
              Abbrechen
            </Button>
            <Button onClick={savePreferences} className="medical-gradient">
              Einstellungen speichern
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CookieBanner;
