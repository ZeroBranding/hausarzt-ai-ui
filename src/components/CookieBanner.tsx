import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Cookie, Settings } from "lucide-react";
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
  const [isBlocking, setIsBlocking] = useState(true);
  const [preferences, setPreferences] = useState({
    necessary: true,
    functional: false,
    analytics: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setShowBanner(true);
      setIsBlocking(true);
      // Block all interactions
      document.body.style.overflow = "hidden";
    } else {
      setIsBlocking(false);
      document.body.style.overflow = "";
    }
  }, []);

  const acceptAll = () => {
    localStorage.setItem("cookieConsent", "all");
    setShowBanner(false);
    setIsBlocking(false);
    document.body.style.overflow = "";
  };

  const acceptNecessary = () => {
    localStorage.setItem("cookieConsent", "necessary");
    setShowBanner(false);
    setIsBlocking(false);
    document.body.style.overflow = "";
  };

  const savePreferences = () => {
    localStorage.setItem("cookieConsent", JSON.stringify(preferences));
    setShowSettings(false);
    setShowBanner(false);
    setIsBlocking(false);
    document.body.style.overflow = "";
  };

  if (!showBanner) return null;

  return (
    <>
      {/* Blocking overlay */}
      {isBlocking && (
        <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-40" />
      )}
      
      <Card className="fixed bottom-4 right-4 left-4 md:left-auto md:max-w-lg z-50 p-6 shadow-strong border-2 border-primary/20 animate-slide-up">
        <div className="flex items-start space-x-4">
          <div className="p-3 rounded-xl bg-gradient-to-br from-secondary/20 to-primary/10 animate-pulse">
            <Cookie className="h-7 w-7 text-secondary" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-lg mb-2 text-primary">🍪 Cookie-Einstellungen erforderlich</h3>
            <p className="text-sm text-muted-foreground mb-1">
              Um diese Website nutzen zu können, müssen Sie eine Cookie-Auswahl treffen.
            </p>
            <p className="text-sm text-muted-foreground mb-4">
              Notwendige Cookies sind für die Grundfunktionalität der Website erforderlich. Sie können auch zusätzliche Cookies aktivieren.
            </p>
            <div className="flex flex-col gap-3">
              <Button
                onClick={acceptAll}
                className="w-full medical-gradient hover-scale text-white font-semibold"
                size="lg"
              >
                ✅ Alle Cookies akzeptieren
              </Button>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button
                  onClick={acceptNecessary}
                  variant="outline"
                  className="flex-1 border-2 border-primary/30 hover:bg-primary/10 font-semibold"
                  size="default"
                >
                  ⚡ Nur Notwendige
                </Button>
                <Button
                  onClick={() => setShowSettings(true)}
                  variant="outline"
                  size="default"
                  className="flex-1 border-2 border-secondary/30 hover:bg-secondary/10"
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Einstellungen
                </Button>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-3 text-center">
              Weitere Informationen finden Sie in unserer <a href="/datenschutz" className="text-secondary hover:underline">Datenschutzerklärung</a>
            </p>
          </div>
        </div>
      </Card>

      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2 text-xl">
              <Cookie className="h-6 w-6 text-secondary" />
              <span>Cookie-Einstellungen verwalten</span>
            </DialogTitle>
            <DialogDescription className="text-base">
              Wählen Sie, welche Cookies Sie zulassen möchten. Notwendige Cookies sind für die Grundfunktionalität erforderlich und können nicht deaktiviert werden.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="flex items-start justify-between space-x-4 p-5 border-2 border-primary/20 rounded-xl bg-primary/5">
              <div className="flex-1">
                <Label htmlFor="necessary" className="font-bold text-base flex items-center gap-2">
                  ⚡ Notwendige Cookies <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full">Erforderlich</span>
                </Label>
                <p className="text-sm text-muted-foreground mt-2">
                  Diese Cookies sind für die Grundfunktionen der Website unerlässlich. Sie ermöglichen Navigation, Sicherheitsfunktionen und den Zugriff auf geschützte Bereiche.
                </p>
                <p className="text-xs text-muted-foreground mt-2 italic">
                  Beispiele: Session-Cookies, Cookie-Consent-Status
                </p>
              </div>
              <Switch
                id="necessary"
                checked={preferences.necessary}
                disabled
                className="mt-1"
              />
            </div>

            <div className="flex items-start justify-between space-x-4 p-5 border-2 border-border rounded-xl hover:border-secondary/50 transition-smooth">
              <div className="flex-1">
                <Label htmlFor="functional" className="font-bold text-base flex items-center gap-2">
                  🎨 Funktionale Cookies
                </Label>
                <p className="text-sm text-muted-foreground mt-2">
                  Ermöglichen erweiterte Funktionen wie personalisierte Einstellungen, Sprachauswahl und verbesserte Benutzererfahrung.
                </p>
                <p className="text-xs text-muted-foreground mt-2 italic">
                  Beispiele: Theme-Präferenzen (Dark/Light Mode), Spracheinstellungen
                </p>
              </div>
              <Switch
                id="functional"
                checked={preferences.functional}
                onCheckedChange={(checked) =>
                  setPreferences({ ...preferences, functional: checked })
                }
                className="mt-1"
              />
            </div>

            <div className="flex items-start justify-between space-x-4 p-5 border-2 border-border rounded-xl hover:border-secondary/50 transition-smooth">
              <div className="flex-1">
                <Label htmlFor="analytics" className="font-bold text-base flex items-center gap-2">
                  📊 Analyse-Cookies
                </Label>
                <p className="text-sm text-muted-foreground mt-2">
                  Helfen uns zu verstehen, wie Besucher die Website nutzen. Diese Informationen werden verwendet, um die Website zu verbessern und Inhalte zu optimieren.
                </p>
                <p className="text-xs text-muted-foreground mt-2 italic">
                  Beispiele: Seitenaufrufe, Verweildauer, Klickverhalten (anonymisiert)
                </p>
              </div>
              <Switch
                id="analytics"
                checked={preferences.analytics}
                onCheckedChange={(checked) =>
                  setPreferences({ ...preferences, analytics: checked })
                }
                className="mt-1"
              />
            </div>
          </div>

          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button 
              variant="outline" 
              onClick={() => setShowSettings(false)}
              className="w-full sm:w-auto"
            >
              Abbrechen
            </Button>
            <Button 
              onClick={savePreferences} 
              className="medical-gradient hover-scale w-full sm:w-auto font-semibold"
            >
              ✅ Einstellungen speichern
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CookieBanner;
