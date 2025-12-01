import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SchemaMarkup from "@/components/SchemaMarkup";

const Impressum = () => {
  return (
    <>
      <SchemaMarkup title="Impressum" description="Impressum Hausarztpraxis Dr. Ismail" />
      <div className="container mx-auto px-4 py-16">
        <h1 className="mb-8 text-4xl font-bold text-primary">Impressum</h1>
        <Card className="shadow-medium mb-6">
          <CardHeader><CardTitle>Angaben gemäß § 5 TMG</CardTitle></CardHeader>
          <CardContent>
            <p className="font-semibold">Hausarztpraxis Dr. Ismail</p>
            <p>Dr. med. Ismail</p>
            <p>Ostmarkstraße 56, 48145 Münster</p>
            <p className="mt-3"><strong>Tel:</strong> 0251 / 246624</p>
            <p><strong>E-Mail:</strong> info@hausarztai.de</p>
          </CardContent>
        </Card>
        <Card className="shadow-medium mb-6">
          <CardHeader><CardTitle>Aufsichtsbehörde</CardTitle></CardHeader>
          <CardContent>
            <p>Ärztekammer Westfalen-Lippe</p>
            <p>Gartenstraße 210-214, 48147 Münster</p>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Impressum;
