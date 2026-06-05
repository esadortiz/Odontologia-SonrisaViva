"use client";

import { useState, type FormEvent } from "react";
import { Send, CheckCircle2, Loader2 } from "lucide-react";
import { contactInfo } from "@/lib/data";
import { useScrollReveal } from "@/hooks/useAnimations";

const serviceOptions = [
  "Valoración odontológica",
  "Limpieza dental",
  "Ortodoncia",
  "Blanqueamiento dental",
  "Diseño de sonrisa",
  "Implantes dentales",
  "Urgencias odontológicas",
  "Otro",
];

export default function Contacto() {
  const { ref, isVisible } = useScrollReveal(0.1);

  const [form, setForm] = useState({
    nombre: "",
    telefono: "",
    email: "",
    servicio: "",
    mensaje: "",
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setFormError(null);

    if (!form.nombre.trim() || !form.telefono.trim() || !form.email.trim() || !form.mensaje.trim()) {
      setFormError("Por favor completa todos los campos obligatorios.");
      return;
    }

    setSending(true);
    try {
      const res = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSent(true);
        setForm({ nombre: "", telefono: "", email: "", servicio: "", mensaje: "" });
      } else {
        setFormError(data.error || "Error al enviar el mensaje. Intenta de nuevo.");
      }
    } catch {
      setFormError("Error de conexión. Intenta de nuevo.");
    } finally {
      setSending(false);
    }
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
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-100">
              <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-1">
                Envíanos un mensaje
              </h3>
              <p className="text-sm text-muted-foreground mb-6">
                Completa el formulario y nos comunicaremos contigo lo antes posible.
              </p>

              {sent ? (
                <div className="flex flex-col items-center justify-center text-center py-8">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-600 mb-4">
                    <CheckCircle2 className="h-7 w-7" />
                  </div>
                  <p className="text-base font-semibold text-foreground mb-2">
                    ¡Mensaje enviado!
                  </p>
                  <p className="text-sm text-muted-foreground mb-6 max-w-sm">
                    Hemos recibido tu mensaje. Te contactaremos pronto para confirmar disponibilidad.
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-primary/90 transition-all"
                  >
                    Enviar otro mensaje
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="nombre" className="block text-sm font-medium text-foreground mb-1">
                      Nombre completo <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="nombre"
                      type="text"
                      required
                      value={form.nombre}
                      onChange={(e) => setForm((f) => ({ ...f, nombre: e.target.value }))}
                      className="w-full rounded-xl border border-gray-200 bg-muted/50 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      placeholder="Tu nombre"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="telefono" className="block text-sm font-medium text-foreground mb-1">
                        Teléfono <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="telefono"
                        type="tel"
                        required
                        value={form.telefono}
                        onChange={(e) => setForm((f) => ({ ...f, telefono: e.target.value }))}
                        className="w-full rounded-xl border border-gray-200 bg-muted/50 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        placeholder="300 123 4567"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">
                        Correo electrónico <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                        className="w-full rounded-xl border border-gray-200 bg-muted/50 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        placeholder="tu@correo.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="servicio" className="block text-sm font-medium text-foreground mb-1">
                      Servicio de interés
                    </label>
                    <select
                      id="servicio"
                      value={form.servicio}
                      onChange={(e) => setForm((f) => ({ ...f, servicio: e.target.value }))}
                      className="w-full rounded-xl border border-gray-200 bg-muted/50 px-4 py-2.5 text-sm text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    >
                      <option value="">Selecciona un servicio (opcional)</option>
                      {serviceOptions.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="mensaje" className="block text-sm font-medium text-foreground mb-1">
                      Mensaje <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="mensaje"
                      required
                      rows={4}
                      value={form.mensaje}
                      onChange={(e) => setForm((f) => ({ ...f, mensaje: e.target.value }))}
                      className="w-full rounded-xl border border-gray-200 bg-muted/50 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                      placeholder="Cuéntanos en qué podemos ayudarte..."
                    />
                  </div>

                  {formError && (
                    <p className="text-sm text-red-600">{formError}</p>
                  )}

                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-2.5 sm:py-3 text-sm font-semibold text-white shadow-md hover:bg-primary/90 transition-all hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {sending ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Enviar mensaje
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
