import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SchemaMarkup from "@/components/SchemaMarkup";

const Impressum = () => {
  return (
    <>
      <SchemaMarkup 
        title="Impressum"
        description="Impressum und rechtliche Angaben zu HausarztAI.de"
      />
      
      <div className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-8 text-4xl font-bold text-primary">Impressum</h1>

          <Card className="shadow-soft mb-6">
            <CardHeader>
              <CardTitle>Angaben gemäß § 5 TMG</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="font-medium">HausarztAI.de</p>
              <p>Musterstraße 123</p>
              <p>12345 Musterstadt</p>
              <p>Deutschland</p>
            </CardContent>
          </Card>

          <Card className="shadow-soft mb-6">
            <CardHeader>
              <CardTitle>Vertreten durch</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Dr. med. Max Mustermann</p>
            </CardContent>
          </Card>

          <Card className="shadow-soft mb-6">
            <CardHeader>
              <CardTitle>Kontakt</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p><strong>Telefon:</strong> +49 (0) 123 456789</p>
              <p><strong>E-Mail:</strong> info@hausarztai.de</p>
            </CardContent>
          </Card>

          <Card className="shadow-soft mb-6">
            <CardHeader>
              <CardTitle>Berufsbezeichnung und berufsrechtliche Regelungen</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p><strong>Berufsbezeichnung:</strong> Arzt/Ärztin (verliehen in Deutschland)</p>
              <p><strong>Zuständige Kammer:</strong> Ärztekammer [Bundesland]</p>
              <p><strong>Verliehen durch:</strong> Bundesrepublik Deutschland</p>
              <p>
                <strong>Es gelten folgende berufsrechtliche Regelungen:</strong><br />
                Berufsordnung für Ärzte
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-soft mb-6">
            <CardHeader>
              <CardTitle>Redaktionell verantwortlich</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Dr. med. Max Mustermann</p>
              <p>Musterstraße 123, 12345 Musterstadt</p>
            </CardContent>
          </Card>

          <Card className="shadow-soft mb-6">
            <CardHeader>
              <CardTitle>EU-Streitschlichtung</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:
                <a
                  href="https://ec.europa.eu/consumers/odr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary hover:underline ml-1"
                >
                  https://ec.europa.eu/consumers/odr/
                </a>
              </p>
              <p className="mt-2">Unsere E-Mail-Adresse finden Sie oben im Impressum.</p>
            </CardContent>
          </Card>

          <Card className="shadow-soft mb-6">
            <CardHeader>
              <CardTitle>Verbraucherstreitbeilegung / Universalschlichtungsstelle</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
                Verbraucherschlichtungsstelle teilzunehmen.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle>Haftungsausschluss</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Haftung für Inhalte</h3>
                <p className="text-sm text-muted-foreground">
                  Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten
                  nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als
                  Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde
                  Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige
                  Tätigkeit hinweisen.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Haftung für Links</h3>
                <p className="text-sm text-muted-foreground">
                  Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen
                  Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen.
                  Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber
                  der Seiten verantwortlich.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Urheberrecht</h3>
                <p className="text-sm text-muted-foreground">
                  Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen
                  dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art
                  der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen
                  Zustimmung des jeweiligen Autors bzw. Erstellers.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Impressum;
