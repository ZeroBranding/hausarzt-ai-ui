import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";
import SchemaMarkup from "@/components/SchemaMarkup";

const Termin = () => {
  const [formData, setFormData] = useState({
    name: "",
    birthdate: "",
    email: "",
    reason: "",
    date: "",
    time: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Terminanfrage gespeichert (UI-Demo)", {
      description: "Dies ist eine Demo-Oberfläche. Keine Daten werden tatsächlich versendet."
    });
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const timeSlots = [
    "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"
  ];

  return (
    <>
      <SchemaMarkup 
        title="Termin buchen"
        description="Buchen Sie Ihren Arzttermin online - einfach, schnell und bequem. Wählen Sie Ihren Wunschtermin aus unserem Kalender."
      />
      
      <div className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="mb-4 text-4xl font-bold text-primary md:text-5xl">
              Termin buchen
            </h1>
            <p className="text-lg text-muted-foreground">
              Vereinbaren Sie einfach und bequem Ihren Wunschtermin
            </p>
          </div>

          {/* Info Alert */}
          <Alert className="mb-8 border-secondary/50 bg-secondary/10">
            <AlertCircle className="h-4 w-4 text-secondary" />
            <AlertDescription>
              <strong>Hinweis:</strong> Diese Eingabe ist eine UI-Vorschau. Keine Daten werden tatsächlich versendet oder gespeichert.
              Dies ist eine reine Demonstrations-Oberfläche ohne Backend-Funktionalität.
            </AlertDescription>
          </Alert>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Booking Form */}
            <Card className="md:col-span-2 shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-secondary" />
                  Terminanfrage
                </CardTitle>
                <CardDescription>
                  Füllen Sie das Formular aus, um einen Termin zu vereinbaren
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Vollständiger Name *</Label>
                    <Input
                      id="name"
                      placeholder="Max Mustermann"
                      value={formData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="birthdate">Geburtsdatum *</Label>
                    <Input
                      id="birthdate"
                      type="date"
                      value={formData.birthdate}
                      onChange={(e) => handleChange("birthdate", e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">E-Mail-Adresse *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="max.mustermann@beispiel.de"
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reason">Grund des Termins *</Label>
                    <Textarea
                      id="reason"
                      placeholder="Beschreiben Sie kurz Ihr Anliegen..."
                      value={formData.reason}
                      onChange={(e) => handleChange("reason", e.target.value)}
                      rows={4}
                      required
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="date">Gewünschtes Datum *</Label>
                      <Input
                        id="date"
                        type="date"
                        value={formData.date}
                        onChange={(e) => handleChange("date", e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="time">Uhrzeit *</Label>
                      <Select value={formData.time} onValueChange={(value) => handleChange("time", value)}>
                        <SelectTrigger id="time">
                          <SelectValue placeholder="Wählen Sie eine Uhrzeit" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeSlots.map((slot) => (
                            <SelectItem key={slot} value={slot}>
                              {slot} Uhr
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button type="submit" className="w-full medical-gradient" size="lg">
                    <Calendar className="mr-2 h-5 w-5" />
                    Termin anfragen
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Info Sidebar */}
            <div className="space-y-6">
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Clock className="h-5 w-5 text-secondary" />
                    Sprechzeiten
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Montag - Freitag:</span>
                    <span className="font-medium">08:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Samstag - Sonntag:</span>
                    <span className="font-medium">Geschlossen</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-soft border-secondary/50 bg-secondary/5">
                <CardHeader>
                  <CardTitle className="text-lg">Wichtige Hinweise</CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-3 text-muted-foreground">
                  <p>
                    • Bitte erscheinen Sie 5 Minuten vor Ihrem Termin
                  </p>
                  <p>
                    • Bringen Sie Ihre Versichertenkarte mit
                  </p>
                  <p>
                    • Bei Verhinderung sagen Sie bitte mindestens 24h vorher ab
                  </p>
                  <p className="font-medium text-foreground">
                    Notfälle: 112 oder Bereitschaftsdienst 116 117
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Termin;
