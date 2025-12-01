import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface SchemaMarkupProps {
  title: string;
  description: string;
}

const SchemaMarkup = ({ title, description }: SchemaMarkupProps) => {
  const location = useLocation();

  useEffect(() => {
    // Update page title
    document.title = `${title} - HausarztAI.de`;

    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute("content", description);

    // Create breadcrumb list
    const pathSegments = location.pathname.split("/").filter(Boolean);
    const breadcrumbList = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Startseite",
          "item": "https://www.hausarztai.de"
        },
        ...pathSegments.map((segment, index) => ({
          "@type": "ListItem",
          "position": index + 2,
          "name": segment.charAt(0).toUpperCase() + segment.slice(1),
          "item": `https://www.hausarztai.de/${pathSegments.slice(0, index + 1).join("/")}`
        }))
      ]
    };

    // Organization schema
    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "MedicalOrganization",
      "name": "HausarztAI.de",
      "url": "https://www.hausarztai.de",
      "logo": "https://www.hausarztai.de/logo.png",
      "description": "Moderne digitale Hausarztpraxis mit Online-Terminbuchung und digitaler Patientenbetreuung",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Musterstraße 123",
        "addressLocality": "Musterstadt",
        "postalCode": "12345",
        "addressCountry": "DE"
      },
      "telephone": "+49-123-456789",
      "email": "info@hausarztai.de",
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "08:00",
          "closes": "18:00"
        }
      ],
      "sameAs": []
    };

    // Website schema
    const websiteSchema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "HausarztAI.de",
      "url": "https://www.hausarztai.de",
      "description": description,
      "publisher": {
        "@type": "Organization",
        "name": "HausarztAI.de"
      }
    };

    // Remove existing schema scripts
    const existingSchemas = document.querySelectorAll('script[type="application/ld+json"]');
    existingSchemas.forEach(schema => schema.remove());

    // Add new schemas
    [organizationSchema, websiteSchema, breadcrumbList].forEach(schema => {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.text = JSON.stringify(schema);
      document.head.appendChild(script);
    });

    // Cleanup function
    return () => {
      const schemas = document.querySelectorAll('script[type="application/ld+json"]');
      schemas.forEach(schema => schema.remove());
    };
  }, [title, description, location]);

  return null;
};

export default SchemaMarkup;
