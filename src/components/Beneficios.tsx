"use client";

import { useScrollReveal } from "@/hooks/useAnimations";
import {
  Award,
  Users,
  BadgeCheck,
  Zap,
  HeartHandshake,
  Microscope,
} from "lucide-react";

const beneficios = [
  {
    icon: Award,
    title: "+15 Años de Experiencia",
    description:
      "Más de una década cuidando sonrisas con excelencia y dedicación profesional.",
  },
  {
    icon: Microscope,
    title: "Tecnología de Punta",
    description:
      "Equipos de diagnóstico y tratamiento con la tecnología más avanzada del sector.",
  },
  {
    icon: Users,
    title: "Equipo Multidisciplinario",
    description:
      "Especialistas en cada área de la odontología trabajando juntos por tu salud.",
  },
  {
    icon: BadgeCheck,
    title: "Certificaciones Internacionales",
    description:
      "Nuestros profesionales cuentan con certificaciones respaldadas a nivel mundial.",
  },
  {
    icon: Zap,
    title: "Resultados Rápidos",
    description:
      "Tratamientos eficientes que optimizan tu tiempo sin comprometer la calidad.",
  },
  {
    icon: HeartHandshake,
    title: "Atención Personalizada",
    description:
      "Cada paciente recibe un plan de tratamiento adaptado a sus necesidades únicas.",
  },
];

export default function Beneficios() {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <section id="beneficios" className="py-12 sm:py-16 lg:py-28 bg-muted">
      <div ref={ref} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center max-w-2xl mx-auto mb-10 sm:mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-block rounded-full bg-secondary/10 px-4 py-1.5 text-sm font-medium text-secondary mb-4">
            ¿Por qué elegirnos?
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground tracking-tight">
            Beneficios que nos hacen{" "}
            <span className="text-secondary">diferentes</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-base sm:text-lg">
            En Sonrisa Viva nos comprometemos con tu bienestar y la calidad de
            cada tratamiento.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {beneficios.map((b, i) => (
            <div
              key={b.title}
              className={`group rounded-2xl bg-white p-6 sm:p-8 shadow-sm hover:shadow-lg transition-all duration-500 hover:-translate-y-1 border border-gray-100 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: isVisible ? `${i * 100}ms` : "0ms" }}
            >
              <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl bg-secondary/10 text-secondary group-hover:bg-secondary group-hover:text-white transition-colors duration-300">
                <b.icon className="h-6 w-6 sm:h-7 sm:w-7" />
              </div>
              <h3 className="mt-4 sm:mt-5 text-lg sm:text-xl font-semibold text-foreground">
                {b.title}
              </h3>
              <p className="mt-2 sm:mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
                {b.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
