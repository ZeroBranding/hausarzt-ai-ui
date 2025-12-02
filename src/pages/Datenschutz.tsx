import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SchemaMarkup from "@/components/SchemaMarkup";

const Datenschutz = () => {
  return (
    <>
      <SchemaMarkup title="Datenschutz" description="Datenschutzerklärung Hausarztpraxis Dr. Ismail" />
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="mb-8 text-4xl font-bold text-primary animate-fade-in-up">🔒 Datenschutzerklärung</h1>
        
        <Card className="shadow-medium mb-6 animate-fade-in-up">
          <CardHeader><CardTitle>1. Verantwortlicher für die Datenverarbeitung</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            <p className="font-semibold">Hausarztpraxis Dr. Ismail</p>
            <p>Dr. med. Ismail</p>
            <p>Ostmarkstraße 56, 48145 Münster</p>
            <p className="mt-3"><strong>Telefon:</strong> 0251 / 246624</p>
            <p><strong>E-Mail:</strong> info@hausarztai.de</p>
          </CardContent>
        </Card>

        <Card className="shadow-medium mb-6 animate-fade-in-up" style={{animationDelay: "0.1s"}}>
          <CardHeader><CardTitle>2. Allgemeine Hinweise</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
            </p>
            <p className="text-sm text-muted-foreground">
              Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst und behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-medium mb-6 animate-fade-in-up" style={{animationDelay: "0.2s"}}>
          <CardHeader><CardTitle>3. Datenerfassung auf dieser Website</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Wer ist verantwortlich für die Datenerfassung?</h3>
              <p className="text-sm text-muted-foreground">
                Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Abschnitt „Verantwortlicher" in dieser Datenschutzerklärung entnehmen.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Wie erfassen wir Ihre Daten?</h3>
              <p className="text-sm text-muted-foreground">
                Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z.B. um Daten handeln, die Sie in ein Kontaktformular eingeben.
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Andere Daten werden automatisch beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z.B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs).
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Wofür nutzen wir Ihre Daten?</h3>
              <p className="text-sm text-muted-foreground">
                Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden, sofern Sie dem zugestimmt haben.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-medium mb-6 animate-fade-in-up" style={{animationDelay: "0.3s"}}>
          <CardHeader><CardTitle>4. Hosting und Content Delivery Networks (CDN)</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Diese Website wird bei einem externen Dienstleister gehostet (Hoster). Die personenbezogenen Daten, die auf dieser Website erfasst werden, werden auf den Servern des Hosters gespeichert.
            </p>
            <p className="text-sm text-muted-foreground">
              Der Einsatz des Hosters erfolgt zum Zwecke der Vertragserfüllung gegenüber unseren potenziellen und bestehenden Patienten (Art. 6 Abs. 1 lit. b DSGVO) und im Interesse einer sicheren, schnellen und effizienten Bereitstellung unseres Online-Angebots durch einen professionellen Anbieter (Art. 6 Abs. 1 lit. f DSGVO).
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-medium mb-6 animate-fade-in-up" style={{animationDelay: "0.4s"}}>
          <CardHeader><CardTitle>5. Erhebung personenbezogener Daten</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Server-Log-Dateien</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt:
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Browsertyp und Browserversion</li>
                <li>Verwendetes Betriebssystem</li>
                <li>Referrer URL</li>
                <li>Hostname des zugreifenden Rechners</li>
                <li>Uhrzeit der Serveranfrage</li>
                <li>IP-Adresse</li>
              </ul>
              <p className="text-sm text-muted-foreground mt-2">
                Diese Daten sind nicht bestimmten Personen zuordenbar. Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen. Die Daten werden nach einer statistischen Auswertung gelöscht.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Kontaktformular</h3>
              <p className="text-sm text-muted-foreground">
                Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-medium mb-6 animate-fade-in-up" style={{animationDelay: "0.5s"}}>
          <CardHeader><CardTitle>6. Cookies</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Diese Website verwendet Cookies. Das sind kleine Textdateien, die Ihr Webbrowser auf Ihrem Endgerät speichert. Cookies helfen uns dabei, unser Angebot nutzerfreundlicher, effektiver und sicherer zu machen.
            </p>
            <p className="text-sm text-muted-foreground">
              Einige Cookies sind „Session-Cookies". Solche Cookies werden nach Ende Ihrer Browser-Sitzung von selbst gelöscht. Andere Cookies bleiben auf Ihrem Endgerät gespeichert, bis Sie diese selbst löschen. Solche Cookies helfen uns, Sie bei Rückkehr auf unserer Website wiederzuerkennen.
            </p>
            <p className="text-sm text-muted-foreground">
              Sie können Ihre Cookie-Einstellungen jederzeit über unseren Cookie-Banner verwalten.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-medium mb-6 animate-fade-in-up" style={{animationDelay: "0.6s"}}>
          <CardHeader><CardTitle>7. Analyse-Tools und Werbung</CardTitle></CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Wir setzen Analyse-Tools nur ein, wenn Sie dem ausdrücklich zugestimmt haben. Die Datenverarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO (Einwilligung). Sie können Ihre Einwilligung jederzeit mit Wirkung für die Zukunft widerrufen.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-medium mb-6 animate-fade-in-up" style={{animationDelay: "0.7s"}}>
          <CardHeader><CardTitle>8. Ihre Rechte als betroffene Person</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">Sie haben folgende Rechte:</p>
            <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
              <li><strong>Recht auf Auskunft:</strong> Sie können Auskunft über Ihre von uns verarbeiteten personenbezogenen Daten verlangen.</li>
              <li><strong>Recht auf Berichtigung:</strong> Sie haben das Recht, unverzüglich die Berichtigung Sie betreffender unrichtiger Daten zu verlangen.</li>
              <li><strong>Recht auf Löschung:</strong> Sie können die Löschung Ihrer personenbezogenen Daten verlangen.</li>
              <li><strong>Recht auf Einschränkung:</strong> Sie haben das Recht, die Einschränkung der Verarbeitung Ihrer Daten zu verlangen.</li>
              <li><strong>Recht auf Datenübertragbarkeit:</strong> Sie haben das Recht, Ihre Daten in einem strukturierten Format zu erhalten.</li>
              <li><strong>Widerspruchsrecht:</strong> Sie haben das Recht, der Verarbeitung Ihrer Daten zu widersprechen.</li>
              <li><strong>Beschwerderecht:</strong> Sie haben das Recht, sich bei einer Aufsichtsbehörde zu beschweren.</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="shadow-medium mb-6 animate-fade-in-up" style={{animationDelay: "0.8s"}}>
          <CardHeader><CardTitle>9. Speicherdauer</CardTitle></CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Soweit innerhalb dieser Datenschutzerklärung keine speziellere Speicherdauer genannt wurde, verbleiben Ihre personenbezogenen Daten bei uns, bis der Zweck für die Datenverarbeitung entfällt. Wenn Sie ein berechtigtes Löschersuchen geltend machen oder eine Einwilligung zur Datenverarbeitung widerrufen, werden Ihre Daten gelöscht, sofern wir keine anderen rechtlich zulässigen Gründe für die Speicherung haben.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-medium mb-6 animate-fade-in-up" style={{animationDelay: "0.9s"}}>
          <CardHeader><CardTitle>10. Medizinische Daten und ärztliche Schweigepflicht</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Als medizinische Einrichtung unterliegen wir der ärztlichen Schweigepflicht gemäß § 203 StGB. Alle Gesundheitsdaten werden besonders geschützt und nur im Rahmen der Behandlung und mit Ihrer ausdrücklichen Einwilligung verarbeitet.
            </p>
            <p className="text-sm text-muted-foreground">
              Die Verarbeitung von Gesundheitsdaten erfolgt auf Grundlage von Art. 9 Abs. 2 lit. h DSGVO in Verbindung mit § 22 Abs. 1 Nr. 1 lit. b BDSG.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-medium mb-6 animate-fade-in-up" style={{animationDelay: "1s"}}>
          <CardHeader><CardTitle>11. Sicherheit Ihrer Daten</CardTitle></CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Wir verwenden innerhalb des Website-Besuchs das verbreitete SSL-Verfahren (Secure Socket Layer) in Verbindung mit der jeweils höchsten Verschlüsselungsstufe, die von Ihrem Browser unterstützt wird. Alle medizinischen Daten werden verschlüsselt gespeichert und übertragen.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-medium animate-fade-in-up" style={{animationDelay: "1.1s"}}>
          <CardHeader><CardTitle>12. Kontakt in Datenschutzfragen</CardTitle></CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-3">
              Wenn Sie Fragen zum Datenschutz haben, schreiben Sie uns bitte eine E-Mail oder wenden Sie sich direkt an die verantwortliche Person:
            </p>
            <p className="font-semibold">Dr. med. Ismail</p>
            <p className="text-sm">Hausarztpraxis Dr. Ismail</p>
            <p className="text-sm">Ostmarkstraße 56, 48145 Münster</p>
            <p className="text-sm mt-2"><strong>E-Mail:</strong> info@hausarztai.de</p>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Datenschutz;
