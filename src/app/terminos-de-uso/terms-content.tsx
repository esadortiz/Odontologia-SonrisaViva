"use client";

import Link from "next/link";
import { ArrowLeft, Mail, Phone } from "lucide-react";

const sections = [
  {
    title: "Naturaleza del sitio web",
    content: `El sitio web de Sonrisa Viva Odontología tiene un carácter informativo y de apoyo para la solicitud de citas odontológicas. No constituye un servicio de telemedicina ni reemplaza la atención profesional presencial en la clínica.`,
  },
  {
    title: "Información no reemplaza valoración profesional",
    content: `La información publicada en este sitio web sobre servicios, tratamientos, horarios y condiciones es de carácter orientador y no sustituye una valoración profesional presencial. Los diagnósticos, planes de tratamiento y recomendaciones definitivas solo pueden ser emitidos por un profesional de la salud odontológica durante una consulta en la clínica.`,
  },
  {
    title: "Uso del asistente virtual (chatbot)",
    content: `Nuestro asistente virtual "Sonri" utiliza inteligencia artificial para orientar al usuario, responder consultas generales sobre servicios, horarios y ubicación, y derivar al usuario a WhatsApp o al formulario de contacto para solicitar una cita. Sin embargo:

• Las respuestas del chatbot son orientadoras y no constituyen un diagnóstico ni recomendación médica definitiva.
• El chatbot NO confirma citas ni realiza reservas. Toda solicitud de cita debe realizarse por WhatsApp o mediante el formulario de contacto de la página.
• La confirmación real de una cita depende de la verificación y aprobación por parte del personal de la clínica.
• El chatbot puede no estar actualizado con cambios recientes en disponibilidad, horarios o servicios.`,
  },
  {
    title: "Veracidad de los datos proporcionados",
    content: `Al utilizar los servicios de esta página, el usuario se compromete a proporcionar datos reales, correctos y actualizados. El uso de datos falsos, incorrectos o de terceros sin autorización es responsabilidad exclusiva del usuario y puede imposibilitar la gestión de la cita solicitada.`,
  },
  {
    title: "Disponibilidad de citas",
    content: `Las fechas y horarios mostrados como informativos a través del chatbot o la página web son orientadores y están sujetos a cambios. No se garantiza la disponibilidad definitiva de una cita hasta que sea confirmada directamente por el personal de la clínica Sonrisa Viva Odontología.`,
  },
  {
    title: "Uso prohibido",
    content: `Queda prohibido el uso de este sitio web y del chatbot para:

• Enviar contenido ofensivo, abusivo, fraudulento o ilegal
• Intentar saturar, interrumpir o dañar los servicios de la página
• Extraer información de otros usuarios sin autorización
• Cualquier uso que contravenga la ley colombiana

Sonrisa Viva Odontología se reserva el derecho de bloquear el acceso a usuarios que incumplan estas condiciones.`,
  },
  {
    title: "Modificaciones al contenido",
    content: `Sonrisa Viva Odontología puede actualizar en cualquier momento el contenido de esta página web, incluyendo pero no limitado a: servicios ofrecidos, horarios de atención, información de contacto y condiciones de uso. Los cambios serán efectivos desde su publicación en el sitio.`,
  },
  {
    title: "Limitación de responsabilidad",
    content: `Sonrisa Viva Odontología no se hace responsable por daños directos, indirectos, incidentales o consecuentes derivados del uso o la imposibilidad de uso de este sitio web. El contenido se proporciona "tal cual" sin garantías de ningún tipo.`,
  },
  {
    title: "Actualización de los términos",
    content: `Estos términos de uso pueden ser actualizados en cualquier momento. El uso continuado del sitio web después de la publicación de cambios constituye la aceptación de los nuevos términos.

Última actualización: junio de 2026.`,
  },
];

export default function TermsContent() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-muted">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline underline-offset-4 transition-all mb-10 sm:mb-14"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al inicio
        </Link>

        <div className="max-w-3xl">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground tracking-tight mb-3 sm:mb-4">
            Términos de{" "}
            <span className="text-primary">Uso</span>
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base mb-10 sm:mb-14">
            Sonrisa Viva Odontología — Valledupar, Cesar
          </p>

        <div className="space-y-8 sm:space-y-10">
          {sections.map((s) => (
            <section key={s.title}>
              <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-3">
                {s.title}
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed whitespace-pre-line">
                {s.content}
              </p>
            </section>
          ))}

          <section>
            <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-3">
              Contacto
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
              Para cualquier consulta sobre estos términos de uso, puede
              contactarnos:
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://wa.me/573106289086?text=Hola%2C%20quiero%20consultar%20sobre%20los%20t%C3%A9rminos%20de%20uso%20de%20Sonrisa%20Viva."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-[#20BD5A] transition-colors"
              >
                <Phone className="h-4 w-4" />
                WhatsApp: 310 628 9086
              </a>
              <a
                href="mailto:esauortiz014@gmail.com"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-primary/90 transition-colors"
              >
                <Mail className="h-4 w-4" />
                esauortiz014@gmail.com
              </a>
            </div>
          </section>
        </div>

        <div className="mt-12 sm:mt-16 pt-8 border-t border-gray-200">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline underline-offset-4 transition-all"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al inicio
          </Link>
        </div>
        </div>
      </div>
    </div>
  );
}
