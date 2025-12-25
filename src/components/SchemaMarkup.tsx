import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useTenant } from "@/contexts/TenantContext";

interface SchemaMarkupProps {
  title: string;
  description: string;
}

const SchemaMarkup = ({ title, description }: SchemaMarkupProps) => {
  const location = useLocation();
  const { tenant, branding } = useTenant();

  useEffect(() => {
    const siteUrl = window.location.origin;
    const orgName = tenant?.practice_name || title || "GCZ";
    const pageTitle = branding?.schema_title || title || "GCZ";

    // Update page title
    document.title = pageTitle;

    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute("content", branding?.description || description);

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
          "item": siteUrl
        },
        ...pathSegments.map((segment, index) => ({
          "@type": "ListItem",
          "position": index + 2,
          "name": segment.charAt(0).toUpperCase() + segment.slice(1),
          "item": `${siteUrl}/${pathSegments.slice(0, index + 1).join("/")}`
        }))
      ]
    };

    // Organization schema
    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "MedicalOrganization",
      "name": orgName,
      "url": siteUrl,
      "logo": `${siteUrl}/favicon.svg`,
      "description": branding?.description || description,
      "address": tenant?.address
        ? {
            "@type": "PostalAddress",
            "streetAddress": tenant.address,
            "addressCountry": "DE"
          }
        : undefined,
      "telephone": tenant?.phone || undefined,
      "email": tenant?.email || undefined,
      "sameAs": []
    };

    // Website schema
    const websiteSchema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": orgName,
      "url": siteUrl,
      "description": branding?.description || description,
      "publisher": {
        "@type": "Organization",
        "name": orgName
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
  }, [title, description, location, tenant, branding]);

  return null;
};

export default SchemaMarkup;
