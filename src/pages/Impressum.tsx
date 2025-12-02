import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SchemaMarkup from "@/components/SchemaMarkup";

const Impressum = () => {
  return (
    <>
      <SchemaMarkup title="Impressum" description="Impressum Hausarztpraxis Dr. Ismail" />
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="mb-8 text-4xl font-bold text-primary animate-fade-in-up">⚖️ Impressum</h1>
        
        <Card className="shadow-medium mb-6 animate-fade-in-up">
          <CardHeader><CardTitle>Angaben gemäß § 5 TMG</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            <p className="font-semibold text-lg">Hausarztpraxis Dr. Ismail</p>
            <p>Dr. med. Ismail</p>
            <p>Ostmarkstraße 56</p>
            <p>48145 Münster</p>
            <p className="mt-4"><strong>Telefon:</strong> 0251 / 246624</p>
            <p><strong>E-Mail:</strong> info@hausarztai.de</p>
          </CardContent>
        </Card>

        <Card className="shadow-medium mb-6 animate-fade-in-up" style={{animationDelay: "0.1s"}}>
          <CardHeader><CardTitle>Berufsbezeichnung und berufsrechtliche Regelungen</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            <p><strong>Berufsbezeichnung:</strong> Arzt/Ärztin (verliehen in Deutschland)</p>
            <p><strong>Zuständige Kammer:</strong> Ärztekammer Westfalen-Lippe</p>
            <p>Gartenstraße 210-214, 48147 Münster</p>
            <p><strong>Website:</strong> <a href="https://www.aekwl.de" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline">www.aekwl.de</a></p>
            <p className="mt-4"><strong>Berufsrechtliche Regelungen:</strong></p>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Berufsordnung für Ärzte in Westfalen-Lippe</li>
              <li>Heilberufsgesetz NRW</li>
              <li>Bundesärzteordnung</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="shadow-medium mb-6 animate-fade-in-up" style={{animationDelay: "0.2s"}}>
          <CardHeader><CardTitle>Aufsichtsbehörde</CardTitle></CardHeader>
          <CardContent>
            <p className="font-semibold">Ärztekammer Westfalen-Lippe</p>
            <p>Gartenstraße 210-214</p>
            <p>48147 Münster</p>
            <p className="mt-3"><strong>Telefon:</strong> 0251 929-0</p>
            <p><strong>Website:</strong> <a href="https://www.aekwl.de" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline">www.aekwl.de</a></p>
          </CardContent>
        </Card>

        <Card className="shadow-medium mb-6 animate-fade-in-up" style={{animationDelay: "0.3s"}}>
          <CardHeader><CardTitle>Gesetzliche Berufsbezeichnung</CardTitle></CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Die gesetzliche Berufsbezeichnung „Arzt/Ärztin" wurde in der Bundesrepublik Deutschland verliehen.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-medium mb-6 animate-fade-in-up" style={{animationDelay: "0.4s"}}>
          <CardHeader><CardTitle>Haftungsausschluss</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Haftung für Inhalte</h3>
              <p className="text-sm text-muted-foreground">
                Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Haftung für Links</h3>
              <p className="text-sm text-muted-foreground">
                Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-medium mb-6 animate-fade-in-up" style={{animationDelay: "0.5s"}}>
          <CardHeader><CardTitle>Urheberrecht</CardTitle></CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-medium animate-fade-in-up" style={{animationDelay: "0.6s"}}>
          <CardHeader><CardTitle>Online-Streitbeilegung (OS)</CardTitle></CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-2">
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:
            </p>
            <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline text-sm">
              https://ec.europa.eu/consumers/odr
            </a>
            <p className="text-sm text-muted-foreground mt-4">
              Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Impressum;
