import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { KeyRound, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";
import SchemaMarkup from "@/components/SchemaMarkup";

const PasswortVergessen = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("E-Mail gesendet (UI-Demo)", {
      description: "Dies ist eine Demo-Oberfläche. Keine E-Mail wird tatsächlich versendet."
    });
  };

  return (
    <>
      <SchemaMarkup 
        title="Passwort vergessen"
        description="Setzen Sie Ihr Passwort zurück - wir senden Ihnen einen Link zum Zurücksetzen per E-Mail."
      />
      
      <div className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-md">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent">
              <KeyRound className="h-8 w-8 text-accent-foreground" />
            </div>
            <h1 className="mb-2 text-3xl font-bold text-primary">Passwort vergessen?</h1>
            <p className="text-muted-foreground">
              Geben Sie Ihre E-Mail-Adresse ein, um Ihr Passwort zurückzusetzen
            </p>
          </div>

          <Alert className="mb-6 border-secondary/50 bg-secondary/10">
            <AlertCircle className="h-4 w-4 text-secondary" />
            <AlertDescription>
              <strong>UI-Hinweis:</strong> Dies ist eine Demo-Oberfläche. Kein E-Mail-Versand findet statt.
            </AlertDescription>
          </Alert>

          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle>Passwort zurücksetzen</CardTitle>
              <CardDescription>
                Wir senden Ihnen einen Link zum Zurücksetzen per E-Mail
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <Button type="submit" className="w-full medical-gradient" size="lg">
                  <KeyRound className="mr-2 h-5 w-5" />
                  Link anfordern
                </Button>

                <p className="text-center text-sm text-muted-foreground">
                  Zurück zur{" "}
                  <Link to="/login" className="text-secondary hover:underline font-medium">
                    Anmeldung
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

export default PasswortVergessen;
