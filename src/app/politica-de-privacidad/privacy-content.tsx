"use client";

import Link from "next/link";
import { ArrowLeft, Mail, Phone } from "lucide-react";

const sections = [
  {
    title: "Responsable del tratamiento",
    content: `El responsable del tratamiento de los datos personales recopilados a través de este sitio web es Sonrisa Viva Odontología, con dirección en Cl. 6 #23-7, Valledupar, Cesar, Colombia.`,
  },
  {
    title: "Datos que se recopilan",
    content: `A través del asistente virtual y los formularios de la página, podemos recopilar los siguientes datos personales:

• Nombre completo
• Número de teléfono
• Correo electrónico
• Servicio odontológico solicitado
• Día y hora preferidos para la cita

Estos datos se proporcionan de forma voluntaria por el usuario al interactuar con el chatbot o solicitar una reserva.`,
  },
  {
    title: "Finalidad del tratamiento",
    content: `Los datos personales que recopilamos se utilizan exclusivamente para:

• Gestionar solicitudes de reserva de citas odontológicas
• Contactar al usuario para confirmar, modificar o cancelar citas
• Responder consultas sobre servicios, horarios y disponibilidad
• Prestar información relevante sobre los servicios odontológicos de la clínica

No utilizamos los datos para fines distintos a los aquí descritos.`,
  },
  {
    title: "Uso de tecnologías de terceros",
    content: `Para prestar nuestros servicios, utilizamos las siguientes tecnologías de terceros:

• **Gemini (Google AI):** Nuestro asistente virtual "Sonri" utiliza la inteligencia artificial de Gemini para procesar las consultas del usuario, interpretar solicitudes de reserva y generar respuestas orientadoras. Las conversaciones se envían a los servidores de Google para su procesamiento, sujetos a la política de privacidad de Google.

• **Resend:** Las solicitudes de reserva confirmadas se envían por correo electrónico al encargado de la clínica mediante el servicio Resend. Los datos de la reserva (nombre, teléfono, correo, servicio, día y hora) se incluyen en dicho correo para que la clínica pueda gestionar la cita.`,
  },
  {
    title: "No venta de datos personales",
    content: `Sonrisa Viva Odontología no vende, alquila, comparte ni comercializa los datos personales de los usuarios con terceros para fines publicitarios o de marketing. Los datos solo se usan para las finalidades descritas en esta política.`,
  },
  {
    title: "Derechos del titular",
    content: `De acuerdo con la normativa colombiana de protección de datos personales, usted tiene derecho a:

• Conocer, actualizar y corregir sus datos personales
• Solicitar la eliminación de sus datos de nuestros registros
• Revocar la autorización para el tratamiento de sus datos
• Presentar quejas ante la autoridad competente

Para ejercer cualquiera de estos derechos, puede contactarnos a través de los canales indicados al final de esta política.`,
  },
  {
    title: "Seguridad de la información",
    content: `Adoptamos medidas técnicas y organizativas razonables para proteger los datos personales contra accesos no autorizados, pérdida o alteración. Sin embargo, ningún sistema de transmisión de datos por internet es completamente infalible, por lo que no podemos garantizar la seguridad absoluta de la información transmitida.`,
  },
  {
    title: "Actualización de esta política",
    content: `Esta política de privacidad es una versión básica y puede ser actualizada en cualquier momento para reflejar cambios en nuestras prácticas o en la normativa aplicable. Cualquier cambio significativo será informado a través de esta página.

Última actualización: junio de 2026.`,
  },
];

export default function PrivacyContent() {
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
            Política de{" "}
            <span className="text-primary">Privacidad</span>
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
              Para cualquier consulta relacionada con esta política de
              privacidad o el tratamiento de sus datos personales, puede
              contactarnos:
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://wa.me/573106289086?text=Hola%2C%20quiero%20m%C3%A1s%20informaci%C3%B3n%20sobre%20la%20pol%C3%ADtica%20de%20privacidad%20de%20Sonrisa%20Viva."
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
