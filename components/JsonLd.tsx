import { SITE } from "@/lib/content";

export function JsonLd() {
  const organization = {
    "@context": "https://schema.org",
    "@type": "NGO",
    name: SITE.name,
    url: SITE.url,
    email: SITE.email,
    description: SITE.description,
    nonprofitStatus: "NonprofitType",
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: SITE.url,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  );
}
