"use client";

import Image from "next/image";
import { useScrollReveal, useCountUp } from "@/hooks/useAnimations";
import { CheckCircle2, Target, Eye } from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Nuestra Misión",
    text: "Brindar atención odontológica integral de la más alta calidad, combinando tecnología avanzada con un trato humano y cercano para mejorar la salud bucal y la autoestima de cada paciente.",
  },
  {
    icon: Eye,
    title: "Nuestra Visión",
    text: "Ser la clínica odontológica de referencia en la región, reconocida por la excelencia clínica, la innovación constante y el compromiso con el bienestar de nuestros pacientes.",
  },
  {
    icon: CheckCircle2,
    title: "Nuestros Valores",
    text: "Ética profesional, compromiso con la calidad, empatía con el paciente, trabajo en equipo e innovación continua son los pilares que guían cada una de nuestras acciones.",
  },
];

const stats = [
  { target: 15, suffix: "+", label: "Años de experiencia" },
  { target: 8, suffix: "", label: "Especialistas" },
  { target: 5000, suffix: "+", label: "Pacientes satisfechos" },
  { target: 12000, suffix: "+", label: "Tratamientos realizados" },
];

function StatCard({
  target,
  suffix,
  label,
  isVisible,
  delay,
}: {
  target: number;
  suffix: string;
  label: string;
  isVisible: boolean;
  delay: number;
}) {
  const display = useCountUp(target, isVisible, 2000, suffix);

  return (
      <div
          className={`text-center p-4 sm:p-6 rounded-2xl bg-muted/50 border border-gray-100 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: isVisible ? `${delay}ms` : "0ms" }}
        >
          <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary">{display}</p>
          <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-muted-foreground font-medium">
        {label}
      </p>
    </div>
  );
}

export default function Sobre() {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <section id="nosotros" className="py-12 sm:py-16 lg:py-28 bg-white">
      <div ref={ref} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center max-w-2xl mx-auto mb-10 sm:mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4">
            Sobre Nosotros
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground tracking-tight">
            Conoce la clínica{" "}
            <span className="text-primary">Sonrisa Viva</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-base sm:text-lg">
            Somos un equipo apasionado por la odontología, comprometidos con tu
            salud bucal y tu bienestar.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start mb-10 sm:mb-16">
          <div
            className={`relative transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
            }`}
          >
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl relative">
              <Image
                src="/images/clinica-odontologica.jpg"
                alt="Clínica Sonrisa Viva"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-secondary/20 rounded-full blur-xl" />
          </div>

          <div className="space-y-4 sm:space-y-6">
            {values.map((v, i) => (
              <div
                key={v.title}
                className={`flex gap-3 sm:gap-4 p-4 sm:p-5 rounded-xl bg-muted/50 hover:bg-muted transition-all duration-700 ${
                  isVisible
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-12"
                }`}
                style={{ transitionDelay: isVisible ? `${i * 150}ms` : "0ms" }}
              >
                <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <v.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-foreground">
                    {v.title}
                  </h3>
                  <p className="mt-1 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {v.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {stats.map((s, i) => (
            <StatCard
              key={s.label}
              target={s.target}
              suffix={s.suffix}
              label={s.label}
              isVisible={isVisible}
              delay={i * 150}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
