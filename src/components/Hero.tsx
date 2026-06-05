"use client";

import Image from "next/image";
import { useScrollReveal } from "@/hooks/useAnimations";
import { ArrowRight, MessageCircle, Shield, Clock, Star } from "lucide-react";

export default function Hero() {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <section
      id="inicio"
      className="relative pt-24 pb-12 sm:pt-28 sm:pb-16 lg:pt-36 lg:pb-24 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-accent/60 via-white to-primary-light/20" />
      <div className="absolute top-20 right-0 w-96 h-96 bg-primary-light/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-secondary/10 rounded-full blur-3xl" />

      <div ref={ref} className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col gap-4 sm:gap-6">
          <div
            className={`inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-medium text-primary w-fit transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <Shield className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            Tu salud bucal en las mejores manos
          </div>

          <h1
            className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-tight transition-all duration-700 delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            Tu sonrisa,{" "}
            <span className="text-primary">nuestra pasión</span>
          </h1>

          <p
            className={`text-base sm:text-lg text-muted-foreground leading-relaxed max-w-lg transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
              En Sonrisa Viva Odontología combinamos tecnología de vanguardia
              con un equipo de especialistas dedicados a brindarte la mejor
              atención dental. Tu bienestar es nuestra prioridad.
            </p>

          <div
            className={`flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 transition-all duration-700 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <a
              href="#contacto"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 sm:px-8 py-3 sm:py-3.5 text-sm sm:text-base font-semibold text-white shadow-lg hover:bg-primary/90 transition-all hover:shadow-xl hover:-translate-y-0.5"
            >
              Agendar Cita
              <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
            </a>
            <a
              href="https://wa.me/573106289086?text=Hola%2C%20quiero%20m%C3%A1s%20informaci%C3%B3n%20sobre%20los%20servicios%20odontol%C3%B3gicos%20de%20Sonrisa%20Viva."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 sm:px-8 py-3 sm:py-3.5 text-sm sm:text-base font-semibold text-white shadow-lg hover:bg-[#20BD5A] transition-all hover:shadow-xl hover:-translate-y-0.5"
            >
              <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5" />
              WhatsApp
            </a>
          </div>

          <div
            className={`flex items-center gap-4 sm:gap-8 pt-4 border-t border-gray-200/60 mt-2 transition-all duration-700 delay-500 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-secondary" />
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      Lun - Vie
                    </p>
                    <p className="text-xs text-muted-foreground">
                      7:00 AM - 5:00 PM
                    </p>
                  </div>
                </div>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    4.9/5
                  </p>
                  <p className="text-xs text-muted-foreground">
                    +500 reseñas
                  </p>
                </div>
              </div>
            </div>
          </div>

        <div
          className={`relative transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
          }`}
        >
          <div className="relative w-full aspect-square max-w-lg mx-auto">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl rotate-6" />
            <div className="absolute inset-0 bg-gradient-to-tr from-primary-light/30 to-accent rounded-3xl -rotate-3" />
            <div className="relative h-full w-full rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/images/sonrisa-odontologia.jpg"
                alt="Sonrisa Viva Odontología"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
