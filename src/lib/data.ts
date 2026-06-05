import {
  Stethoscope,
  Sparkles,
  ShieldCheck,
  HeartPulse,
  Smile,
  Syringe,
  MapPin,
  Phone,
  Mail,
  Clock,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const serviceImages: Record<string, { src: string; alt: string }> = {
  general: { src: "/images/servicios/odontologia-general.png", alt: "Ilustración de odontología general" },
  blanqueamiento: { src: "/images/servicios/blanqueamiento-dental.png", alt: "Ilustración de blanqueamiento dental" },
  ortodoncia: { src: "/images/servicios/ortodoncia.png", alt: "Ilustración de ortodoncia" },
  implantes: { src: "/images/servicios/implantes-dentales.png", alt: "Ilustración de implantes dentales" },
  estetica: { src: "/images/servicios/estetica-dental.png", alt: "Ilustración de estética dental" },
  endodoncia: { src: "/images/servicios/endodoncia.png", alt: "Ilustración de endodoncia" },
};

export const services = [
  { icon: Stethoscope, id: "general", title: "Odontología General", description: "Chequeos regulares, limpiezas profesionales y tratamientos preventivos para mantener tu boca sana.", },
  { icon: Sparkles, id: "blanqueamiento", title: "Blanqueamiento Dental", description: "Tratamientos de blanqueamiento con tecnología LED para una sonrisa radiante y duradera.", },
  { icon: ShieldCheck, id: "ortodoncia", title: "Ortodoncia", description: "Alineación dental con brackets tradicionales e invisalign para una sonrisa perfecta.", },
  { icon: HeartPulse, id: "implantes", title: "Implantes Dentales", description: "Reemplazo de piezas dentales con implantes de titanio de última generación.", },
  { icon: Smile, id: "estetica", title: "Estética Dental", description: "Carillas, resinas y diseños de sonrisa para transformar tu apariencia dental.", },
  { icon: Syringe, id: "endodoncia", title: "Endodoncia", description: "Tratamientos de conducto con técnicas avanzadas y mínimo dolor para salvar tus dientes.", },
];

export const contactInfo: {
  icon: LucideIcon;
  label: string;
  value: string;
}[] = [
  { icon: MapPin, label: "Dirección", value: "Cl. 6 #23-7, Valledupar, Cesar" },
  { icon: Phone, label: "WhatsApp", value: "310 628 9086" },
  { icon: Mail, label: "Email", value: "esauortiz014@gmail.com" },
  { icon: Clock, label: "Horario", value: "Lun-Vie: 7:00 AM - 12:00 PM y 2:00 PM - 5:00 PM\nSáb: 7:00 AM - 12:00 PM" },
];

export const siteConfig = {
  name: "Sonrisa Viva",
  tagline: "Odontología",
  initials: "SV",
  phone: "310 628 9086",
  email: "esauortiz014@gmail.com",
  address: "Cl. 6 #23-7, Valledupar, Cesar",
  schedule: "Lun-Vie: 7:00 AM - 12:00 PM y 2:00 PM - 5:00 PM | Sáb: 7:00 AM - 12:00 PM",
};
