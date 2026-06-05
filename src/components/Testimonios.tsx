"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { useScrollReveal } from "@/hooks/useAnimations";

const testimonios = [
  {
    name: "María González",
    role: "Paciente desde 2020",
    quote:
      "Desde el primer momento me sentí cómoda. El equipo de Sonrisa Viva transformó mi sonrisa con un tratamiento de blanqueamiento increíble. ¡Los recomiendo al 100%!",
    rating: 5,
  },
  {
    name: "Carlos Ramírez",
    role: "Paciente desde 2019",
    quote:
      "Me realizaron un implante dental y el resultado fue perfecto. La atención fue impecable, el doctor explicó cada paso del procedimiento y el postoperatorio fue muy rápido.",
    rating: 5,
  },
  {
    name: "Ana Martínez",
    role: "Paciente desde 2021",
    quote:
      "Mi experiencia con la ortodoncia invisible fue excelente. El seguimiento fue constante y los resultados superaron mis expectativas. Mi sonrisa nunca se vio mejor.",
    rating: 5,
  },
  {
    name: "Roberto López",
    role: "Paciente desde 2018",
    quote:
      "Llevo años confiando en Sonrisa Viva para el cuidado dental de toda mi familia. La profesionalidad y calidez del equipo no tienen igual. Es la mejor clínica de la zona.",
    rating: 5,
  },
  {
    name: "Laura Fernández",
    role: "Paciente desde 2022",
    quote:
      "Tenía mucho miedo al dentista, pero en Sonrisa Viva me hicieron sentir tranquila. El tratamiento de conducto fue indoloro y la recuperación muy rápida.",
    rating: 5,
  },
];

export default function Testimonios() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const { ref, isVisible } = useScrollReveal(0.1);

  const handleNext = useCallback(() => {
    setCurrent((prev) => (prev + 1) % testimonios.length);
  }, []);

  const handlePrev = useCallback(() => {
    setCurrent(
      (prev) => (prev - 1 + testimonios.length) % testimonios.length
    );
  }, []);

  useEffect(() => {
    if (paused) return;
    const interval = setInterval(handleNext, 6000);
    return () => clearInterval(interval);
  }, [handleNext, paused]);

  const t = testimonios[current];

  return (
    <section id="testimonios" className="py-12 sm:py-16 lg:py-28 bg-muted">
      <div ref={ref} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center max-w-2xl mx-auto mb-10 sm:mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4">
            Testimonios
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground tracking-tight">
            Lo que dicen{" "}
            <span className="text-primary">nuestros pacientes</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-base sm:text-lg">
            Las experiencias reales de quienes confiaron en nosotros para
            transformar su sonrisa.
          </p>
        </div>

        <div
          className={`max-w-3xl mx-auto transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          <div
            className="relative bg-white rounded-2xl shadow-lg p-6 sm:p-8 lg:p-12 border border-gray-100"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <Quote className="absolute top-4 sm:top-6 left-4 sm:left-6 h-8 w-8 sm:h-10 sm:w-10 text-primary/10" />

            <div className="flex flex-col items-center text-center pt-4">
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < t.rating
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-200"
                    }`}
                  />
                ))}
              </div>

            <blockquote className="text-base sm:text-lg lg:text-xl text-foreground leading-relaxed mb-6 sm:mb-8 max-w-xl">
              &ldquo;{t.quote}&rdquo;
            </blockquote>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-primary text-white font-bold text-base sm:text-lg">
                {t.name.charAt(0)}
              </div>
                <div className="text-left">
                  <p className="font-semibold text-foreground">{t.name}</p>
                  <p className="text-sm text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 mt-8">
              <button
                onClick={handlePrev}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-muted hover:bg-primary/10 transition-colors"
                aria-label="Anterior"
              >
                <ChevronLeft className="h-5 w-5 text-foreground" />
              </button>
              <div className="flex gap-2">
                {testimonios.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === current
                        ? "w-6 bg-primary"
                        : "w-2 bg-gray-300 hover:bg-gray-400"
                    }`}
                    aria-label={`Testimonio ${i + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={handleNext}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-muted hover:bg-primary/10 transition-colors"
                aria-label="Siguiente"
              >
                <ChevronRight className="h-5 w-5 text-foreground" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
