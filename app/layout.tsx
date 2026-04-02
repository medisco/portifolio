import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Ismael M. — Senior Backend Engineer",
    template: "%s | Ismael M.",
  },
  description:
    "Senior backend engineer specializing in distributed systems, PostgreSQL, and high-throughput APIs.",
  metadataBase: new URL("https://ismaelm.dev"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Ismael M. Portfolio",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
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
