import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sonrisa Viva Odontología | Tu sonrisa, nuestra pasión",
  description:
    "Clínica odontológica profesional en Valledupar, Cesar. Especialistas en ortodoncia, implantes, blanqueamiento y más. ¡Agenda tu cita hoy!",
  keywords: [
    "odontología",
    "dentista",
    "Valledupar",
    "clínica dental",
    "ortodoncia",
    "implantes",
    "blanqueamiento",
    "Sonrisa Viva",
  ],
  authors: [{ name: "Sonrisa Viva Odontología" }],
  openGraph: {
    title: "Sonrisa Viva Odontología | Tu sonrisa, nuestra pasión",
    description:
      "Clínica odontológica profesional en Valledupar, Cesar. Especialistas en ortodoncia, implantes, blanqueamiento y más.",
    url: "https://sonrisaviva.com",
    siteName: "Sonrisa Viva Odontología",
    locale: "es_CO",
    type: "website",
  },
  icons: {
    icon: "/images/sonrisa-viva-logo-2.png",
    shortcut: "/images/sonrisa-viva-logo-2.png",
    apple: "/images/sonrisa-viva-logo-2.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
