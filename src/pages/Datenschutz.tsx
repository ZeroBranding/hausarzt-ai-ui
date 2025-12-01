import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield } from "lucide-react";
import SchemaMarkup from "@/components/SchemaMarkup";

const Datenschutz = () => {
  return (
    <>
      <SchemaMarkup 
        title="Datenschutzerklärung"
        description="Datenschutzerklärung von HausarztAI.de - Informationen zum Schutz Ihrer personenbezogenen Daten gemäß DSGVO."
      />
      
      <div className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-4 text-4xl font-bold text-primary">Datenschutzerklärung</h1>
          <p className="mb-8 text-muted-foreground">Stand: Januar 2025</p>

          <Alert className="mb-8 border-secondary/50 bg-secondary/10">
            <Shield className="h-4 w-4 text-secondary" />
            <AlertDescription>
              <strong>Hinweis:</strong> Diese Datenschutzerklärung ist eine generische Struktur
              für Demonstrationszwecke. Für eine rechtssichere Website muss eine individuell
              angepasste Datenschutzerklärung durch einen Rechtsbeistand erstellt werden.
            </AlertDescription>
          </Alert>

          <Card className="shadow-soft mb-6">
            <CardHeader>
              <CardTitle>1. Datenschutz auf einen Blick</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Allgemeine Hinweise</h3>
                <p className="text-sm text-muted-foreground">
                  Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren
                  personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene
                  Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft mb-6">
            <CardHeader>
              <CardTitle>2. Verantwortlicher</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-2">
                Verantwortlich für die Datenverarbeitung auf dieser Website ist:
              </p>
              <div className="text-sm">
                <p>HausarztAI.de</p>
                <p>Musterstraße 123</p>
                <p>12345 Musterstadt</p>
                <p className="mt-2">
                  <strong>Telefon:</strong> +49 (0) 123 456789<br />
                  <strong>E-Mail:</strong> datenschutz@hausarztai.de
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft mb-6">
            <CardHeader>
              <CardTitle>3. Datenerfassung auf dieser Website</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Wie erfassen wir Ihre Daten?</h3>
                <p className="text-sm text-muted-foreground">
                  Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen.
                  Hierbei kann es sich z.B. um Daten handeln, die Sie in ein Kontaktformular eingeben.
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website
                  durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z.B. Internetbrowser,
                  Betriebssystem oder Uhrzeit des Seitenaufrufs).
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Wofür nutzen wir Ihre Daten?</h3>
                <p className="text-sm text-muted-foreground">
                  Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu
                  gewährleisten. Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden,
                  sofern Sie dem zugestimmt haben.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Welche Rechte haben Sie bezüglich Ihrer Daten?</h3>
                <p className="text-sm text-muted-foreground">
                  Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck
                  Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht,
                  die Berichtigung oder Löschung dieser Daten zu verlangen.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft mb-6">
            <CardHeader>
              <CardTitle>4. Hosting</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Diese Website wird bei einem externen Dienstleister gehostet. Die personenbezogenen Daten,
                die auf dieser Website erfasst werden, werden auf den Servern des Hosters gespeichert.
                Hierbei kann es sich um IP-Adressen, Kontaktanfragen, Meta- und Kommunikationsdaten,
                Vertragsdaten, Kontaktdaten, Namen, Websitezugriffe und sonstige Daten handeln.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-soft mb-6">
            <CardHeader>
              <CardTitle>5. Allgemeine Hinweise und Pflichtinformationen</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Datenschutz</h3>
                <p className="text-sm text-muted-foreground">
                  Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst.
                  Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen
                  Datenschutzvorschriften sowie dieser Datenschutzerklärung.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Hinweis zur verantwortlichen Stelle</h3>
                <p className="text-sm text-muted-foreground">
                  Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist im
                  Abschnitt "Verantwortlicher" dieser Datenschutzerklärung aufgeführt.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft mb-6">
            <CardHeader>
              <CardTitle>6. Cookies</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-2">
                Unsere Internetseiten verwenden Cookies. Cookies sind kleine Textdateien, die auf Ihrem
                Endgerät gespeichert werden und die Ihr Browser speichert.
              </p>
              <p className="text-sm text-muted-foreground">
                Diese Website verwendet ausschließlich technisch notwendige Cookies, die für den Betrieb
                der Website erforderlich sind. Es werden keine Tracking- oder Analyse-Cookies eingesetzt.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-soft mb-6">
            <CardHeader>
              <CardTitle>7. Server-Log-Dateien</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-2">
                Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten
                Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind:
              </p>
              <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
                <li>Browsertyp und Browserversion</li>
                <li>verwendetes Betriebssystem</li>
                <li>Referrer URL</li>
                <li>Hostname des zugreifenden Rechners</li>
                <li>Uhrzeit der Serveranfrage</li>
                <li>IP-Adresse</li>
              </ul>
              <p className="text-sm text-muted-foreground mt-2">
                Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-soft mb-6">
            <CardHeader>
              <CardTitle>8. Kontaktformular</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem
                Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung
                der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben
                wir nicht ohne Ihre Einwilligung weiter.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-soft mb-6">
            <CardHeader>
              <CardTitle>9. Ihre Rechte</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Sie haben folgende Rechte:
              </p>
              <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
                <li>Recht auf Auskunft (Art. 15 DSGVO)</li>
                <li>Recht auf Berichtigung (Art. 16 DSGVO)</li>
                <li>Recht auf Löschung (Art. 17 DSGVO)</li>
                <li>Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
                <li>Recht auf Datenübertragbarkeit (Art. 20 DSGVO)</li>
                <li>Widerspruchsrecht (Art. 21 DSGVO)</li>
                <li>Recht auf Beschwerde bei einer Aufsichtsbehörde (Art. 77 DSGVO)</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle>10. Speicherdauer</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Soweit innerhalb dieser Datenschutzerklärung keine speziellere Speicherdauer genannt wurde,
                verbleiben Ihre personenbezogenen Daten bei uns, bis der Zweck für die Datenverarbeitung
                entfällt. Wenn Sie ein berechtigtes Löschersuchen geltend machen oder eine Einwilligung
                zur Datenverarbeitung widerrufen, werden Ihre Daten gelöscht, sofern wir keine anderen
                rechtlich zulässigen Gründe für die Speicherung Ihrer personenbezogenen Daten haben.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Datenschutz;
