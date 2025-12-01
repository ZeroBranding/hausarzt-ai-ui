import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img src={logo} alt="Hausarztpraxis Dr. Ismail Logo" className="h-10 w-10 rounded-lg bg-white p-1" />
              <div className="flex flex-col">
                <span className="font-bold leading-tight">Hausarztpraxis</span>
                <span className="text-sm font-semibold leading-tight">Dr. Ismail</span>
              </div>
            </div>
            <p className="text-sm text-primary-foreground/80">
              Ihre moderne Hausarztpraxis in Münster für zeitgemäße medizinische Betreuung. 🏥💙
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Schnellzugriff</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-primary-foreground/80 hover:text-primary-foreground transition-smooth">
                  Startseite
                </Link>
              </li>
              <li>
                <Link to="/leistungen" className="text-primary-foreground/80 hover:text-primary-foreground transition-smooth">
                  Leistungen
                </Link>
              </li>
              <li>
                <Link to="/termin" className="text-primary-foreground/80 hover:text-primary-foreground transition-smooth">
                  Termin buchen
                </Link>
              </li>
              <li>
                <Link to="/kontakt" className="text-primary-foreground/80 hover:text-primary-foreground transition-smooth">
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>

          {/* Patient Area */}
          <div>
            <h3 className="font-semibold mb-4">Patientenbereich</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/login" className="text-primary-foreground/80 hover:text-primary-foreground transition-smooth">
                  Anmelden
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-primary-foreground/80 hover:text-primary-foreground transition-smooth">
                  Registrierung
                </Link>
              </li>
              <li>
                <Link to="/patientenbereich" className="text-primary-foreground/80 hover:text-primary-foreground transition-smooth">
                  Mein Bereich
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4">Kontakt 📞</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span className="text-primary-foreground/80">
                  Ostmarkstraße 56<br />
                  48145 Münster
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <a href="tel:+492512466 24" className="text-primary-foreground/80 hover:text-primary-foreground transition-smooth">
                  0251 / 246624
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <a href="mailto:info@hausarztai.de" className="text-primary-foreground/80 hover:text-primary-foreground transition-smooth">
                  info@hausarztai.de
                </a>
              </li>
              <li className="flex items-start space-x-2">
                <Clock className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <div className="text-primary-foreground/80">
                  <p className="font-medium">Sprechzeiten:</p>
                  <p className="text-xs">Mo-Di, Do-Fr: 08-12 & 15-18 Uhr</p>
                  <p className="text-xs">Mi: 08-12 Uhr</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/20">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-primary-foreground/80">
              <Link to="/impressum" className="hover:text-primary-foreground transition-smooth">
                Impressum
              </Link>
              <Link to="/datenschutz" className="hover:text-primary-foreground transition-smooth">
                Datenschutz
              </Link>
              <span>© 2025 Hausarztpraxis Dr. Ismail</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
