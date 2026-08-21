import type { Metadata } from "next";
import { Inter, Lexend } from "next/font/google";
import { GoogleTagManager } from "@next/third-parties/google";
import "./globals.css";

const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

const lexend = Lexend({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

/* ── SEO: Dominio de producción ── */
const SITE_URL = "https://agronegocioslacteos.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: "1ra Expo Agro Negocios Lácteos Venezuela 2026 | APROLAC",
  description:
    "El evento B2B más importante del sector lácteo venezolano. Negocios, innovación y networking de alto nivel organizado por APROLAC, Asociación de Productores Lácteos del Estado Bolívar.",
  keywords: [
    "expo agro negocios",
    "sector lácteo Venezuela",
    "APROLAC",
    "negocios lácteos",
    "agronegocios 2026",
    "eventos B2B Venezuela",
    "expo lácteos Bolívar",
    "cadena de frío Venezuela",
    "stands comerciales expo",
    "rondas de negocios agro",
  ],

  /* ── Canonical ── */
  alternates: {
    canonical: "/",
  },

  /* ── Open Graph (Facebook, LinkedIn, WhatsApp) ── */
  openGraph: {
    title: "1ra Expo Agro Negocios Lácteos Venezuela 2026 | APROLAC",
    description:
      "El evento B2B más importante del sector lácteo venezolano. Negocios, innovación y networking de alto nivel organizado por APROLAC.",
    type: "website",
    locale: "es_VE",
    url: "/",
    siteName: "APROLAC – Expo Agro Negocios Lácteos",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "1ra Expo Agro Negocios Lácteos Venezuela 2026 – APROLAC",
        type: "image/png",
      },
    ],
  },

  /* ── Twitter / X Card ── */
  twitter: {
    card: "summary_large_image",
    title: "1ra Expo Agro Negocios Lácteos Venezuela 2026 | APROLAC",
    description:
      "Negocios, innovación y networking de alto nivel. El evento B2B líder del sector lácteo venezolano.",
    images: ["/og-image.png"],
  },

  /* ── Robots ── */
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  /* ── Otros ── */
  category: "Eventos B2B",
};

/* ── JSON-LD Structured Data ── */
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "APROLAC",
  legalName: "Asociación de Productores Lácteos del Estado Bolívar",
  url: SITE_URL,
  logo: `${SITE_URL}/og-image.png`,
  description:
    "Asociación de Productores Lácteos del Estado Bolívar. Liderando el ecosistema agroindustrial y la cadena de frío a nivel nacional.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Ciudad Guayana",
    addressRegion: "Bolívar",
    addressCountry: "VE",
  },
  contactPoint: {
    "@type": "ContactPoint",
    email: "contacto@aprolac.org",
    contactType: "sales",
    availableLanguage: "es",
  },
  sameAs: ["https://www.instagram.com/aprolacbolivar/"],
  taxID: "J-50781399-1",
};

const eventJsonLd = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "1ra Expo Agro Negocios Lácteos Venezuela 2026",
  description:
    "El evento B2B más importante del sector lácteo venezolano. Negocios, innovación, tecnología y networking de alto nivel.",
  startDate: "2026-05-15T08:00:00-04:00",
  endDate: "2026-05-19T18:00:00-04:00",
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  location: {
    "@type": "Place",
    name: "Centro de Exposiciones Pariaguán",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Pariaguán",
      addressRegion: "Anzoátegui",
      addressCountry: "VE",
    },
  },
  organizer: {
    "@type": "Organization",
    name: "APROLAC",
    url: SITE_URL,
  },
  image: `${SITE_URL}/og-image.png`,
  url: SITE_URL,
  offers: {
    "@type": "Offer",
    url: `${SITE_URL}/#contacto`,
    availability: "https://schema.org/InStock",
    priceCurrency: "USD",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${lexend.variable} h-full`}
    >
      {gtmId && <GoogleTagManager gtmId={gtmId} />}
      <head>
        {/* JSON-LD: Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        {/* JSON-LD: Event */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(eventJsonLd),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}

