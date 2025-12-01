import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, MessageSquare, Shield, Video, CheckCircle } from "lucide-react";
import SchemaMarkup from "@/components/SchemaMarkup";

const Home = () => {
  const features = [
    {
      icon: Calendar,
      title: "Online-Terminbuchung",
      description: "Buchen Sie Ihren Termin bequem online – rund um die Uhr verfügbar."
    },
    {
      icon: Clock,
      title: "Schnelle Antworten",
      description: "Erhalten Sie zeitnahe Antworten auf Ihre medizinischen Anfragen."
    },
    {
      icon: Video,
      title: "Videosprechstunde",
      description: "Konsultationen von zu Hause aus – sicher und komfortabel."
    },
    {
      icon: MessageSquare,
      title: "Digitale Kommunikation",
      description: "Sichere Nachrichtenübermittlung zwischen Arzt und Patient."
    },
    {
      icon: Shield,
      title: "Datenschutz",
      description: "Ihre Gesundheitsdaten sind bei uns sicher und geschützt."
    },
    {
      icon: CheckCircle,
      title: "Moderne Medizin",
      description: "Zeitgemäße medizinische Betreuung auf höchstem Niveau."
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Registrieren",
      description: "Erstellen Sie Ihr persönliches Patientenkonto in wenigen Minuten."
    },
    {
      number: "02",
      title: "Termin buchen",
      description: "Wählen Sie einen passenden Termin aus unserem Kalender."
    },
    {
      number: "03",
      title: "Beratung erhalten",
      description: "Erhalten Sie professionelle medizinische Betreuung."
    }
  ];

  return (
    <>
      <SchemaMarkup 
        title="Digitale Hausarztpraxis & Terminportal"
        description="Moderne digitale Hausarztpraxis mit Online-Terminbuchung, Videosprechstunde und digitaler Patientenbetreuung. Ihre Gesundheit, digital und sicher."
      />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32 hero-gradient">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20"></div>
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold text-white md:text-6xl animate-fade-in">
              HausarztAI.de
            </h1>
            <p className="mb-4 text-xl text-white/90 md:text-2xl animate-fade-in" style={{ animationDelay: "0.1s" }}>
              Ihre digitale Hausarztpraxis
            </p>
            <p className="mb-8 text-lg text-white/80 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Moderne Terminplanung. Digitale Kommunikation. Medizinische Betreuung.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <Link to="/termin">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-strong">
                  <Calendar className="mr-2 h-5 w-5" />
                  Termin vereinbaren
                </Button>
              </Link>
              <Link to="/register">
                <Button size="lg" variant="outline" className="bg-white/10 text-white border-white hover:bg-white/20 backdrop-blur-sm">
                  Jetzt registrieren
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-primary md:text-4xl">
              Ihre Vorteile
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Moderne medizinische Versorgung – digital, sicher und patientenorientiert
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <Card key={index} className="border-border hover:shadow-medium transition-smooth hover-scale">
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg turquoise-gradient">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-primary md:text-4xl">
              Wie funktioniert es?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              In nur drei einfachen Schritten zu Ihrer medizinischen Betreuung
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full medical-gradient text-2xl font-bold text-white shadow-medium">
                    {step.number}
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-secondary to-transparent"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 medical-gradient">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
            Bereit für moderne Medizin?
          </h2>
          <p className="mb-8 text-lg text-white/90 max-w-2xl mx-auto">
            Registrieren Sie sich jetzt und erleben Sie medizinische Betreuung im digitalen Zeitalter.
          </p>
          <Link to="/register">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-strong">
              Kostenlos registrieren
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
};

export default Home;
