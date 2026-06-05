import type { Metadata } from "next";
import TermsContent from "./terms-content";

export const metadata: Metadata = {
  title: "Términos de Uso | Sonrisa Viva Odontología",
  description:
    "Términos de uso del sitio web de Sonrisa Viva Odontología. Condiciones generales de uso y servicios.",
};

export default function TerminosUsoPage() {
  return <TermsContent />;
}
