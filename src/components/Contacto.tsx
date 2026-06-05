"use client";

import { MessageCircle } from "lucide-react";
import { contactInfo } from "@/lib/data";
import { useScrollReveal } from "@/hooks/useAnimations";

export default function Contacto() {
  const { ref, isVisible } = useScrollReveal(0.1);

  function handleOpenChat() {
    window.dispatchEvent(new CustomEvent("open-chat-agent"));
  }

  return (
    <section id="contacto" className="py-12 sm:py-16 lg:py-28 bg-white">
      <div ref={ref} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center max-w-2xl mx-auto mb-10 sm:mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4">
            Contacto
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground tracking-tight">
            ¿Lista para tu{" "}
            <span className="text-primary">nueva sonrisa</span>?
          </h2>
          <p className="mt-4 text-muted-foreground text-base sm:text-lg">
            Contáctanos hoy y agenda tu cita. Estamos aquí para ayudarte.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <div
            className={`space-y-6 sm:space-y-8 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
            }`}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {contactInfo.map((item) => {
              const isWhatsApp = item.label === "WhatsApp";
              const isEmail = item.label === "Email";
              return (
              <div
                key={item.label}
                className="flex gap-3 sm:gap-4 p-4 sm:p-5 rounded-xl bg-muted/50"
              >
                <div className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <item.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">
                      {item.label}
                    </p>
                    {isWhatsApp ? (
                      <a
                        href="https://wa.me/573106289086?text=Hola%2C%20quiero%20m%C3%A1s%20informaci%C3%B3n%20sobre%20los%20servicios%20odontol%C3%B3gicos%20de%20Sonrisa%20Viva."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline mt-1 block"
                      >
                        {item.value}
                      </a>
                    ) : isEmail ? (
                      <a
                        href="mailto:esauortiz014@gmail.com"
                        className="text-sm text-primary hover:underline mt-1 block break-all"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-sm text-muted-foreground mt-1 whitespace-pre-line leading-relaxed">
                        {item.value}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
            </div>

            <div className="rounded-xl overflow-hidden h-auto bg-muted border border-gray-200">
              <iframe
                src="https://www.google.com/maps?q=Cl.%206%20%2323-7%2C%20Valledupar%2C%20Cesar&output=embed"
                width="100%"
                height="260"
                className="sm:h-[320px]"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación Sonrisa Viva Odontología"
              />
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 px-4 py-3 bg-white">
                <span className="text-xs sm:text-sm text-muted-foreground">{contactInfo[0].value}</span>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Cl.%206%20%2323-7%2C%20Valledupar%2C%20Cesar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-primary hover:underline"
                >
                  Abrir en Google Maps
                </a>
              </div>
            </div>
          </div>

          <div
            className={`transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
            }`}
          >
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-100 h-full flex flex-col items-center justify-center text-center">
              <div className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-primary/10 text-primary mb-4 sm:mb-5">
                <MessageCircle className="h-7 w-7 sm:h-8 sm:w-8" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2 sm:mb-3">
                Agenda tu cita con Sonri
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 max-w-sm">
                Nuestro asistente virtual puede ayudarte a consultar horarios,
                elegir el servicio y enviar tu solicitud de reserva
                directamente a la clínica.
              </p>
              <button
                onClick={handleOpenChat}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 sm:px-8 py-2.5 sm:py-3 text-sm font-semibold text-white shadow-md hover:bg-primary/90 transition-all hover:shadow-lg"
              >
                <MessageCircle className="h-4 w-4" />
                Abrir asistente virtual
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
