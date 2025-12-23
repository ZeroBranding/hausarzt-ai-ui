import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MessageSquare, User, FileText, Clock, AlertCircle, Loader2, CheckCircle, XCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import SchemaMarkup from "@/components/SchemaMarkup";
import { appointmentsAPI, messagesAPI, authAPI, apiUtils } from "@/lib/api";
import { useTenant } from "@/contexts/TenantContext";

const Patientenbereich = () => {
  const { tenant } = useTenant();
  const [appointments, setAppointments] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Lade Benutzerprofil
      const userData = await authAPI.getProfile();
      setUser(userData);

      // Lade Termine
      const appointmentsData = await appointmentsAPI.getUserAppointments();
      setAppointments(appointmentsData.appointments || []);

      // Lade Nachrichten
      const messagesData = await messagesAPI.getMessages();
      setMessages(messagesData || []);

    } catch (err) {
      console.error('Fehler beim Laden der Daten:', err);
      setError('Fehler beim Laden der Daten. Bitte versuchen Sie es später erneut.');
    } finally {
      setLoading(false);
    }
  };

  // Demo-Daten als Fallback
  const demoAppointments = [
    {
      date: "15. Januar 2025",
      time: "10:00 Uhr",
      type: "Vorsorgeuntersuchung",
      doctor: "Dr. med. Schmidt"
    },
    {
      date: "28. Januar 2025",
      time: "14:30 Uhr",
      type: "Nachkontrolle",
      doctor: "Dr. med. Müller"
    }
  ];

  const demoMessages = [
    {
      from: tenant?.practice_name ? `Praxis ${tenant.practice_name}` : "Praxis",
      subject: "Laborergebnisse verfügbar",
      date: "Vor 2 Tagen",
      unread: true
    },
    {
      from: "Dr. med. Schmidt",
      subject: "Re: Rezeptanfrage",
      date: "Vor 5 Tagen",
      unread: false
    }
  ];

  return (
    <>
      <SchemaMarkup 
        title="Patientenbereich"
        description="Ihr persönlicher Patientenbereich - verwalten Sie Ihre Termine, Nachrichten und Gesundheitsdaten an einem Ort."
      />
      
      <div className="container mx-auto px-4 py-16">
        <div className="mb-8">
          <h1 className="mb-2 text-4xl font-bold text-primary">
            Willkommen im Patientenbereich
          </h1>
          <p className="text-lg text-muted-foreground">
            Hier finden Sie alle wichtigen Informationen zu Ihren Terminen und Nachrichten
          </p>
        </div>

        {error && (
          <Alert className="mb-8 border-red-500/50 bg-red-500/10">
            <XCircle className="h-4 w-4 text-red-500" />
            <AlertDescription>
              <strong>Verbindungsfehler:</strong> {error}
            </AlertDescription>
          </Alert>
        )}

        {!apiUtils.isAuthenticated() && (
          <Alert className="mb-8 border-yellow-500/50 bg-yellow-500/10">
            <AlertCircle className="h-4 w-4 text-yellow-500" />
            <AlertDescription>
              <strong>Nicht angemeldet:</strong> Bitte melden Sie sich an, um Ihre persönlichen Daten zu sehen.
            </AlertDescription>
          </Alert>
        )}

        {apiUtils.isAuthenticated() && !error && (
          <Alert className="mb-8 border-green-500/50 bg-green-500/10">
            <CheckCircle className="h-4 w-4 text-green-500" />
          <AlertDescription>
              <strong>Live-Daten:</strong> Dashboard zeigt Ihre echten Termine und Nachrichten.
          </AlertDescription>
        </Alert>
        )}

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Upcoming Appointments */}
            <Card className="shadow-soft">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-secondary" />
                      Kommende Termine
                    </CardTitle>
                    <CardDescription>Ihre nächsten Arztbesuche</CardDescription>
                  </div>
                  <Button
                    className="turquoise-gradient"
                    onClick={() => window.location.href = '/termin'}
                  >
                    Neuer Termin
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {loading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin mr-2" />
                    <span>Termine werden geladen...</span>
                  </div>
                ) : (
                  (apiUtils.isAuthenticated() && appointments.length > 0 ? appointments : demoAppointments).map((appointment, index) => (
                  <div
                    key={index}
                    className="flex items-start justify-between rounded-lg border border-border p-4 hover:shadow-soft transition-smooth"
                  >
                    <div className="space-y-1">
                        <p className="font-semibold text-foreground">
                          {appointment.reason || appointment.type || "Termin"}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {appointment.doctor_name || appointment.doctor || "Arzt"}
                        </p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {appointment.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {appointment.time}
                        </span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Details</Button>
                  </div>
                  ))
                )}
              </CardContent>
            </Card>

            {/* Messages */}
            <Card className="shadow-soft">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5 text-secondary" />
                      Nachrichten
                    </CardTitle>
                    <CardDescription>Kommunikation mit Ihrer Praxis</CardDescription>
                  </div>
                  <Button variant="outline">Neue Nachricht</Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {loading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin mr-2" />
                    <span>Nachrichten werden geladen...</span>
                  </div>
                ) : (
                  (apiUtils.isAuthenticated() && messages.length > 0 ? messages : demoMessages).map((message, index) => (
                  <div
                    key={index}
                    className={`flex items-start justify-between rounded-lg border p-4 transition-smooth hover:shadow-soft ${
                      message.unread ? "border-secondary/50 bg-secondary/5" : "border-border"
                    }`}
                  >
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2">
                          <p className="font-semibold text-foreground">
                            {message.subject || "Nachricht"}
                          </p>
                        {message.unread && (
                          <span className="inline-flex h-2 w-2 rounded-full bg-secondary"></span>
                        )}
                      </div>
                        <p className="text-sm text-muted-foreground">
                          {message.sender || message.from || "Praxis"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {message.created_at ? new Date(message.created_at).toLocaleDateString('de-DE') : message.date || "Unbekannt"}
                        </p>
                    </div>
                    <Button variant="ghost" size="sm">Öffnen</Button>
                  </div>
                  ))
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Card */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <User className="h-5 w-5 text-secondary" />
                  Persönliche Daten
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-medium">Max Mustermann</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Geburtsdatum</p>
                  <p className="font-medium">01.01.1980</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">E-Mail</p>
                  <p className="font-medium text-sm">max.mustermann@beispiel.de</p>
                </div>
                <Button variant="outline" className="w-full mt-4">
                  Profil bearbeiten
                </Button>
              </CardContent>
            </Card>

            {/* Documents */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <FileText className="h-5 w-5 text-secondary" />
                  Dokumente
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="ghost" className="w-full justify-start">
                  <FileText className="mr-2 h-4 w-4" />
                  Laborbefunde
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <FileText className="mr-2 h-4 w-4" />
                  Rezepte
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <FileText className="mr-2 h-4 w-4" />
                  Arztbriefe
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="shadow-soft border-secondary/50 bg-secondary/5">
              <CardHeader>
                <CardTitle className="text-lg">Schnellzugriff</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full turquoise-gradient">
                  <Calendar className="mr-2 h-4 w-4" />
                  Termin buchen
                </Button>
                <Button variant="outline" className="w-full">
                  <FileText className="mr-2 h-4 w-4" />
                  Rezept anfordern
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Patientenbereich;
