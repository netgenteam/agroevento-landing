import type { Metadata } from "next";
import { Inter, Lexend } from "next/font/google";
import "./globals.css";

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

export const metadata: Metadata = {
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
  ],
  openGraph: {
    title: "1ra Expo Agro Negocios Lácteos Venezuela 2026 | APROLAC",
    description:
      "El evento B2B más importante del sector lácteo venezolano. Organizado por APROLAC.",
    type: "website",
    locale: "es_VE",
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
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
