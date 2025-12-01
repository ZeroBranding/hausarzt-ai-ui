import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SchemaMarkup from "@/components/SchemaMarkup";

const Datenschutz = () => {
  return (
    <>
      <SchemaMarkup title="Datenschutz" description="Datenschutzerklärung Hausarztpraxis Dr. Ismail" />
      <div className="container mx-auto px-4 py-16">
        <h1 className="mb-8 text-4xl font-bold text-primary">Datenschutzerklärung 🔒</h1>
        <Card className="shadow-medium mb-6">
          <CardHeader><CardTitle>1. Verantwortlicher</CardTitle></CardHeader>
          <CardContent>
            <p>Hausarztpraxis Dr. Ismail</p>
            <p>Ostmarkstraße 56, 48145 Münster</p>
            <p>Tel: 0251 / 246624</p>
          </CardContent>
        </Card>
        <Card className="shadow-medium mb-6">
          <CardHeader><CardTitle>2. Datenerhebung</CardTitle></CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Wir verarbeiten personenbezogene Daten nur im Rahmen der gesetzlichen Bestimmungen. Ihre Daten werden vertraulich behandelt.</p>
          </CardContent>
        </Card>
        <Card className="shadow-medium">
          <CardHeader><CardTitle>3. Ihre Rechte</CardTitle></CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Sie haben Recht auf Auskunft, Berichtigung, Löschung und Einschränkung der Verarbeitung Ihrer Daten.</p>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Datenschutz;
