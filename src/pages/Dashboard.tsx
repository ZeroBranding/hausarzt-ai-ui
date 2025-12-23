import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, LogOut, Calendar, MessageSquare } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import SchemaMarkup from "@/components/SchemaMarkup";
import { authAPI, apiUtils } from "@/lib/api";

const Dashboard = () => {
  const navigate = useNavigate();
  const isAuthenticated = apiUtils.isAuthenticated();
  const token = apiUtils.getToken();

  const handleLogout = () => {
    authAPI.logout();
    // Auch Booking-State zurücksetzen bei explizitem Logout
    localStorage.removeItem('booking-state');
    navigate('/login');
  };

  return (
    <>
      <SchemaMarkup
        title="Dashboard"
        description="Ihr persönliches Patienten-Dashboard."
      />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">Dashboard</h1>
          <p className="text-muted-foreground">
            Willkommen in Ihrem persönlichen Patientenbereich
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Auth Status */}
          <Card className="col-span-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Authentifizierungsstatus
              </CardTitle>
              <CardDescription>
                Aktueller Anmeldestatus
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span>Authentifiziert:</span>
                  <span className={isAuthenticated ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                    {isAuthenticated ? "Ja" : "Nein"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Token vorhanden:</span>
                  <span className={token ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                    {token ? "Ja" : "Nein"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Termine
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Verwalten Sie Ihre Termine
              </p>
              <Link to="/termin">
                <Button className="w-full">
                  Termin buchen
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Nachrichten
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Kommunizieren Sie mit Ihrem Arzt
              </p>
              <Link to="/patientenbereich">
                <Button variant="outline" className="w-full">
                  Zum Patientenbereich
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LogOut className="h-5 w-5" />
                Abmelden
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Sichere Abmeldung
              </p>
              <Button variant="outline" onClick={handleLogout} className="w-full">
                Abmelden
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
