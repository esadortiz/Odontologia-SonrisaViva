import type { Metadata } from "next";
import PrivacyContent from "./privacy-content";

export const metadata: Metadata = {
  title: "Política de Privacidad | Sonrisa Viva Odontología",
  description:
    "Política de privacidad de Sonrisa Viva Odontología. Información sobre el tratamiento de datos personales.",
};

export default function PoliticaPrivacidadPage() {
  return <PrivacyContent />;
}
