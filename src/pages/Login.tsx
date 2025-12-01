import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogIn, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";
import SchemaMarkup from "@/components/SchemaMarkup";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Login erfolgreich (UI-Demo)", {
      description: "Dies ist eine Demo-Oberfläche. Keine echte Anmeldung findet statt."
    });
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <>
      <SchemaMarkup 
        title="Login"
        description="Melden Sie sich in Ihrem Patientenkonto bei HausarztAI.de an und verwalten Sie Ihre Termine und Gesundheitsdaten."
      />
      
      <div className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-md">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full medical-gradient">
              <LogIn className="h-8 w-8 text-white" />
            </div>
            <h1 className="mb-2 text-3xl font-bold text-primary">Anmelden</h1>
            <p className="text-muted-foreground">
              Melden Sie sich in Ihrem Patientenkonto an
            </p>
          </div>

          <Alert className="mb-6 border-secondary/50 bg-secondary/10">
            <AlertCircle className="h-4 w-4 text-secondary" />
            <AlertDescription>
              <strong>UI-Hinweis:</strong> Dies ist ein UI-Modell. Keine echte Anmeldung findet statt.
              Diese Oberfläche dient nur zur Demonstration.
            </AlertDescription>
          </Alert>

          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle>Willkommen zurück</CardTitle>
              <CardDescription>
                Geben Sie Ihre Anmeldedaten ein
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">E-Mail-Adresse</Label>
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
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Passwort</Label>
                    <Link
                      to="/passwort-vergessen"
                      className="text-sm text-secondary hover:underline"
                    >
                      Passwort vergessen?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Ihr Passwort"
                    value={formData.password}
                    onChange={(e) => handleChange("password", e.target.value)}
                    required
                  />
                </div>

                <Button type="submit" className="w-full medical-gradient" size="lg">
                  <LogIn className="mr-2 h-5 w-5" />
                  Anmelden
                </Button>

                <p className="text-center text-sm text-muted-foreground">
                  Noch kein Konto?{" "}
                  <Link to="/register" className="text-secondary hover:underline font-medium">
                    Jetzt registrieren
                  </Link>
                </p>
              </form>
            </CardContent>
          </Card>

          <Card className="mt-6 border-muted shadow-soft">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground text-center">
                Ihre Daten sind bei uns sicher. Wir verwenden modernste
                Verschlüsselungstechnologien zum Schutz Ihrer Informationen.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Login;
