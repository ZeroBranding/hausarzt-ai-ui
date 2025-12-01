import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white">
                <span className="text-xl font-bold text-primary">H</span>
              </div>
              <span className="text-xl font-bold">HausarztAI.de</span>
            </div>
            <p className="text-sm text-primary-foreground/80">
              Ihre moderne digitale Hausarztpraxis für zeitgemäße medizinische Betreuung.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Schnellzugriff</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Startseite
                </Link>
              </li>
              <li>
                <Link to="/leistungen" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Leistungen
                </Link>
              </li>
              <li>
                <Link to="/termin" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Termin buchen
                </Link>
              </li>
              <li>
                <Link to="/kontakt" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
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
                <Link to="/login" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Registrierung
                </Link>
              </li>
              <li>
                <Link to="/patientenbereich" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Mein Bereich
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4">Kontakt</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span className="text-primary-foreground/80">
                  Musterstraße 123<br />
                  12345 Musterstadt
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span className="text-primary-foreground/80">+49 (0) 123 456789</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span className="text-primary-foreground/80">info@hausarztai.de</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/20">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-primary-foreground/80">
              <Link to="/impressum" className="hover:text-primary-foreground transition-colors">
                Impressum
              </Link>
              <Link to="/datenschutz" className="hover:text-primary-foreground transition-colors">
                Datenschutz
              </Link>
              <span>© 2025 HausarztAI.de</span>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
