import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Stethoscope, Syringe, Activity, FlaskConical, Users } from "lucide-react";
import SchemaMarkup from "@/components/SchemaMarkup";
import { useTenant } from "@/contexts/TenantContext";

const Leistungen = () => {
  const { tenant } = useTenant();

  const services = [
    {
      icon: Stethoscope,
      title: "Allgemeinmedizin",
      description: "Umfassende hausärztliche Versorgung für alle Altersgruppen. Von der Diagnose bis zur Behandlung stehen wir Ihnen zur Seite."
    },
    {
      icon: Heart,
      title: "Vorsorgeuntersuchungen",
      description: "Regelmäßige Check-ups zur Früherkennung von Erkrankungen. Gesundheit erhalten durch präventive Medizin."
    },
    {
      icon: Syringe,
      title: "Impfungen",
      description: "Alle Standardimpfungen sowie Reiseimpfungen. Schutz für Sie und Ihre Familie nach aktuellen Empfehlungen."
    },
    {
      icon: Activity,
      title: "Chronikerbetreuung",
      description: "Langfristige Begleitung bei chronischen Erkrankungen wie Diabetes, Bluthochdruck oder Asthma."
    },
    {
      icon: FlaskConical,
      title: "Labordiagnostik",
      description: "Moderne Laboruntersuchungen für schnelle und zuverlässige Diagnosen. Auswertung direkt vor Ort."
    },
    {
      icon: Users,
      title: "Hausbesuche",
      description: "Medizinische Versorgung in Ihren eigenen vier Wänden für Patienten mit eingeschränkter Mobilität."
    }
  ];

  return (
    <>
      <SchemaMarkup 
        title="Unsere Leistungen"
        description="Hausärztliche Leistungen: Allgemeinmedizin, Vorsorge, Impfungen, Chronikerbetreuung, Labor und Hausbesuche."
      />
      
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-primary md:text-5xl">
            Unsere Leistungen
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Umfassende hausärztliche Versorgung für Ihre Gesundheit und Ihr Wohlbefinden.
            Wir bieten Ihnen moderne medizinische Betreuung auf höchstem Niveau.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="border-border hover:shadow-medium transition-smooth hover-scale animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl turquoise-gradient shadow-soft">
                  <service.icon className="h-7 w-7 text-white" />
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Information */}
        <div className="mt-16 max-w-4xl mx-auto">
          <Card className="border-border shadow-soft">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Weitere Informationen</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Sprechzeiten</h3>
                <p className="text-muted-foreground">
                  Aktuelle Sprechzeiten und Verfügbarkeit finden Sie in der Online-Terminbuchung.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Notfälle</h3>
                <p className="text-muted-foreground">
                  Bei akuten Notfällen: 112<br />
                  Ärztlicher Bereitschaftsdienst: 116 117
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Kassenleistungen</h3>
                <p className="text-muted-foreground">
                  Kassenarztpraxis - alle gesetzlichen und privaten Krankenkassen.
                  Bitte Versichertenkarte mitbringen.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Leistungen;
