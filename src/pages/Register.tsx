import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { UserPlus, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";
import SchemaMarkup from "@/components/SchemaMarkup";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwörter stimmen nicht überein");
      return;
    }

    if (!formData.acceptTerms) {
      toast.error("Bitte akzeptieren Sie die Datenschutzerklärung");
      return;
    }

    toast.success("Registrierung erfolgreich (UI-Demo)", {
      description: "Dies ist eine Demo-Oberfläche. Keine Daten werden gespeichert."
    });
  };

  const handleChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <>
      <SchemaMarkup 
        title="Registrierung"
        description="Erstellen Sie Ihr persönliches Patientenkonto bei HausarztAI.de - einfach, schnell und sicher."
      />
      
      <div className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-md">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full turquoise-gradient">
              <UserPlus className="h-8 w-8 text-white" />
            </div>
            <h1 className="mb-2 text-3xl font-bold text-primary">Registrierung</h1>
            <p className="text-muted-foreground">
              Erstellen Sie Ihr persönliches Patientenkonto
            </p>
          </div>

          <Alert className="mb-6 border-secondary/50 bg-secondary/10">
            <AlertCircle className="h-4 w-4 text-secondary" />
            <AlertDescription>
              <strong>UI-Hinweis:</strong> Diese Oberfläche ist eine Darstellung ohne Backend.
              Keine Daten werden tatsächlich gespeichert oder versendet.
            </AlertDescription>
          </Alert>

          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle>Neues Konto erstellen</CardTitle>
              <CardDescription>
                Füllen Sie das Formular aus, um sich zu registrieren
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Vorname *</Label>
                    <Input
                      id="firstName"
                      placeholder="Max"
                      value={formData.firstName}
                      onChange={(e) => handleChange("firstName", e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastName">Nachname *</Label>
                    <Input
                      id="lastName"
                      placeholder="Mustermann"
                      value={formData.lastName}
                      onChange={(e) => handleChange("lastName", e.target.value)}
                      required
                    />
                  </div>
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
                  <Label htmlFor="password">Passwort *</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Mindestens 8 Zeichen"
                    value={formData.password}
                    onChange={(e) => handleChange("password", e.target.value)}
                    minLength={8}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Passwort wiederholen *</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Passwort bestätigen"
                    value={formData.confirmPassword}
                    onChange={(e) => handleChange("confirmPassword", e.target.value)}
                    minLength={8}
                    required
                  />
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="terms"
                    checked={formData.acceptTerms}
                    onCheckedChange={(checked) => handleChange("acceptTerms", checked as boolean)}
                    required
                  />
                  <Label htmlFor="terms" className="text-sm leading-relaxed cursor-pointer">
                    Ich akzeptiere die{" "}
                    <Link to="/datenschutz" className="text-secondary hover:underline">
                      Datenschutzerklärung
                    </Link>{" "}
                    und bin mit der Verarbeitung meiner Daten einverstanden.
                  </Label>
                </div>

                <Button type="submit" className="w-full medical-gradient" size="lg">
                  <UserPlus className="mr-2 h-5 w-5" />
                  Registrieren
                </Button>

                <p className="text-center text-sm text-muted-foreground">
                  Bereits registriert?{" "}
                  <Link to="/login" className="text-secondary hover:underline font-medium">
                    Jetzt anmelden
                  </Link>
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Register;
