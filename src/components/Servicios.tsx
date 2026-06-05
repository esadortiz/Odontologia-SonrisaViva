"use client";

import Image from "next/image";
import { useScrollReveal } from "@/hooks/useAnimations";
import { services, serviceImages } from "@/lib/data";

export default function Servicios() {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <section id="servicios" className="py-12 sm:py-16 lg:py-28 bg-white">
      <div ref={ref} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center max-w-2xl mx-auto mb-10 sm:mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4">
            Nuestros Servicios
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground tracking-tight">
            Tratamientos que cuidan{" "}
            <span className="text-primary">tu sonrisa</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-base sm:text-lg">
            Ofrecemos una amplia gama de servicios odontológicos con la
            tecnología más avanzada y profesionales altamente capacitados.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {services.map((service, i) => {
            const img = serviceImages[service.id];
            return (
              <div
                key={service.id}
                className={`group rounded-2xl border border-gray-100 bg-white p-5 sm:p-6 shadow-sm hover:shadow-lg transition-all duration-500 hover:-translate-y-1 flex flex-col ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: isVisible ? `${i * 100}ms` : "0ms" }}
              >
                {img && (
                  <div className="relative flex items-center justify-center h-28 sm:h-32 lg:h-36 w-full mb-4 sm:mb-5 rounded-xl bg-primary/5 overflow-hidden group-hover:bg-primary/10 transition-colors duration-300">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      width={200}
                      height={200}
                      className="max-h-full w-auto object-contain p-2 sm:p-3 transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 80vw, (max-width: 1024px) 40vw, 30vw"
                    />
                  </div>
                )}
                <h3 className="text-lg sm:text-xl font-semibold text-foreground">
                  {service.title}
                </h3>
                <p className="mt-2 sm:mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
