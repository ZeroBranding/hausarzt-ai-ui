import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import logo from "@/assets/gcz-mark.svg";
import { useTenant } from "@/contexts/TenantContext";

const Footer = () => {
  const { tenant, branding, scheduling } = useTenant();

  const openingHoursText = (() => {
    if (!scheduling?.opening_hours) return null;
    // Minimaler, robuster Text (ohne harte Praxis-spezifische Inhalte)
    return "Sprechzeiten: siehe Terminseite";
  })();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img
                src={logo}
                alt={branding?.logo_alt || "GCZ"}
                className="h-10 w-10 rounded-lg bg-white p-1"
              />
              <div className="flex flex-col">
                <span className="font-bold leading-tight">{tenant?.practice_name || "GCZ"}</span>
                {branding?.title ? (
                  <span className="text-sm font-semibold leading-tight">{branding.title}</span>
                ) : null}
              </div>
            </div>
            <p className="text-sm text-primary-foreground/80">
              {branding?.description || "Online-Terminbuchung und digitale Patientenservices."}
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
            <h3 className="font-semibold mb-4">Kontakt</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span className="text-primary-foreground/80">
                  {tenant?.address || "—"}
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 flex-shrink-0" />
                {tenant?.phone ? (
                  <a
                    href={`tel:${tenant.phone.replace(/\s+/g, "")}`}
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-smooth"
                  >
                    {tenant.phone}
                  </a>
                ) : (
                  <span className="text-primary-foreground/80">—</span>
                )}
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 flex-shrink-0" />
                {tenant?.email ? (
                  <a
                    href={`mailto:${tenant.email}`}
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-smooth"
                  >
                    {tenant.email}
                  </a>
                ) : (
                  <span className="text-primary-foreground/80">—</span>
                )}
              </li>
              <li className="flex items-start space-x-2">
                <Clock className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <div className="text-primary-foreground/80">
                  <p className="font-medium">Sprechzeiten:</p>
                  <p className="text-xs">{openingHoursText || "—"}</p>
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
              <span>{branding?.footer_text || "© 2025 GCZ"}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
