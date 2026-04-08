import type { Metadata } from "next";
import { Source_Serif_4, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-serif",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Ismael Medeiros",
    template: "%s — Ismael Medeiros",
  },
  description:
    "Senior backend engineer focused on blockchain infrastructure and smart contract security. Building high-throughput event pipelines and researching symbolic execution for EVM bytecode.",
  metadataBase: new URL("https://ismaelm.dev"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Ismael Medeiros",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Ismael Medeiros",
    url: "https://ismaelm.dev",
    email: "hello@ismaelm.dev",
    jobTitle: "Senior Full Stack Engineer",
    worksFor: {
      "@type": "Organization",
      name: "Blockparty",
    },
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "University of Brasília",
    },
    sameAs: [
      "https://github.com/medisco",
      "https://linkedin.com/in/ismaelm",
    ],
    knowsAbout: [
      "Blockchain Infrastructure",
      "Smart Contract Security",
      "Symbolic Execution",
      "Distributed Systems",
      "EVM",
      "TypeScript",
      "Go",
    ],
  };

  return (
    <html lang="en" className={`${sourceSerif.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body className="flex min-h-screen flex-col antialiased">
        <Navigation />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
