import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Clock, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";
import SchemaMarkup from "@/components/SchemaMarkup";

const Kontakt = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Nachricht gesendet (UI-Demo)", {
      description: "Dies ist eine Demo-Oberfläche. Keine Nachricht wird tatsächlich versendet."
    });
  };

  return (
    <>
      <SchemaMarkup 
        title="Kontakt"
        description="Kontaktieren Sie HausarztAI.de - Wir sind für Sie da. Telefon, E-Mail oder persönlich vor Ort."
      />
      
      <div className="container mx-auto px-4 py-16">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-primary md:text-5xl">
            Kontakt
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Haben Sie Fragen? Wir sind für Sie da und helfen Ihnen gerne weiter.
          </p>
        </div>

        <Alert className="mb-8 max-w-4xl mx-auto border-secondary/50 bg-secondary/10">
          <AlertCircle className="h-4 w-4 text-secondary" />
          <AlertDescription>
            <strong>UI-Hinweis:</strong> Das Kontaktformular ist eine reine UI-Darstellung.
            Keine Nachrichten werden tatsächlich versendet.
          </AlertDescription>
        </Alert>

        <div className="grid gap-8 lg:grid-cols-3 max-w-6xl mx-auto">
          {/* Contact Form */}
          <Card className="lg:col-span-2 shadow-soft">
            <CardHeader>
              <CardTitle>Kontaktformular</CardTitle>
              <CardDescription>
                Senden Sie uns Ihre Nachricht und wir melden uns schnellstmöglich bei Ihnen
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Vorname *</Label>
                    <Input id="firstName" placeholder="Max" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Nachname *</Label>
                    <Input id="lastName" placeholder="Mustermann" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">E-Mail-Adresse *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="max.mustermann@beispiel.de"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Telefonnummer (optional)</Label>
                  <Input id="phone" type="tel" placeholder="+49 123 456789" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Betreff *</Label>
                  <Input id="subject" placeholder="Ihr Anliegen" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Nachricht *</Label>
                  <Textarea
                    id="message"
                    placeholder="Beschreiben Sie Ihr Anliegen..."
                    rows={6}
                    required
                  />
                </div>

                <Button type="submit" className="w-full medical-gradient" size="lg">
                  <Mail className="mr-2 h-5 w-5" />
                  Nachricht senden
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="text-lg">Kontaktinformationen</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Praxisadresse</p>
                    <p className="text-sm text-muted-foreground">
                      Musterstraße 123<br />
                      12345 Musterstadt<br />
                      Deutschland
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Phone className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Telefon</p>
                    <p className="text-sm text-muted-foreground">
                      +49 (0) 123 456789
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Mail className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">E-Mail</p>
                    <p className="text-sm text-muted-foreground">
                      info@hausarztai.de
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Sprechzeiten</p>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p>Mo - Fr: 08:00 - 18:00 Uhr</p>
                      <p>Sa - So: Geschlossen</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-soft border-secondary/50 bg-secondary/5">
              <CardHeader>
                <CardTitle className="text-lg">Anfahrt</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video rounded-lg bg-muted flex items-center justify-center border border-border">
                  <p className="text-sm text-muted-foreground">Karte (UI-Platzhalter)</p>
                </div>
                <p className="mt-4 text-sm text-muted-foreground">
                  Unsere Praxis befindet sich im Herzen von Musterstadt,
                  nur wenige Gehminuten vom Hauptbahnhof entfernt.
                  Parkplätze sind direkt vor der Praxis vorhanden.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Kontakt;
