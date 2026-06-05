"use client";

import Image from "next/image";
import Link from "next/link";
import { services, siteConfig, contactInfo } from "@/lib/data";
import { useScrollReveal } from "@/hooks/useAnimations";

export default function Footer() {
  const { ref, isVisible } = useScrollReveal(0.05);

  return (
    <footer className="bg-foreground text-white">
      <div ref={ref} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="sm:col-span-2 lg:col-span-1">
        <div className="flex items-center gap-2 mb-4">
        <div className="relative w-10 h-10 shrink-0">
          <Image
            src="/images/sonrisa-viva-logo.png"
            alt="Sonrisa Viva"
            fill
            sizes="40px"
            className="object-contain rounded-xl"
          />
        </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold text-white leading-tight">
              {siteConfig.name}
            </span>
            <span className="text-xs text-white/60 leading-tight">
              {siteConfig.tagline}
            </span>
          </div>
        </div>
            <p className="text-sm text-white/70 leading-relaxed max-w-xs">
              Tu clínica odontológica de confianza. Más de 15 años cuidando
              sonrisas con tecnología de vanguardia y un equipo excepcional.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Servicios</h4>
            <ul className="space-y-2.5">
              {services.map((s) => (
                <li key={s.id}>
                  <a
                    href="#servicios"
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Empresa</h4>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="#nosotros"
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  Sobre Nosotros
                </a>
              </li>
              <li>
                <a
                  href="#testimonios"
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  Testimonios
                </a>
              </li>
              <li>
                <a
                  href="#contacto"
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Contacto</h4>
          <ul className="space-y-3">
            {contactInfo.map((item) => (
              <li key={item.label} className="flex items-center gap-3">
                <item.icon className="h-4 w-4 text-primary-light shrink-0" />
                {item.label === "WhatsApp" ? (
                  <a
                    href="https://wa.me/573106289086?text=Hola%2C%20quiero%20m%C3%A1s%20informaci%C3%B3n%20sobre%20los%20servicios%20odontol%C3%B3gicos%20de%20Sonrisa%20Viva."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white/60 hover:text-primary-light transition-colors"
                  >
                    {item.value}
                  </a>
                ) : item.label === "Email" ? (
                  <a
                    href="mailto:esauortiz014@gmail.com"
                    className="text-sm text-white/60 hover:text-primary-light transition-colors break-all"
                  >
                    {item.value}
                  </a>
                ) : (
                  <span className="text-sm text-white/60">{item.value}</span>
                )}
              </li>
            ))}
            </ul>
          </div>
        </div>
      </div>

  <div className="border-t border-white/10 py-6 text-center space-y-3">
    <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
      <Link
        href="/politica-de-privacidad"
        className="text-[11px] sm:text-xs text-white/40 tracking-wider uppercase hover:text-primary-light transition-colors"
      >
        Política de Privacidad
      </Link>
      <span className="text-white/20 text-[11px] sm:text-xs">·</span>
      <Link
        href="/terminos-de-uso"
        className="text-[11px] sm:text-xs text-white/40 tracking-wider uppercase hover:text-primary-light transition-colors"
      >
        Términos de Uso
      </Link>
    </div>

    <p className="text-[11px] sm:text-xs text-white/40 tracking-widest uppercase leading-relaxed">
      Copyright © {new Date().getFullYear()} Sonrisa Viva Odontología
    </p>
    <p className="text-[11px] sm:text-xs text-white/40 tracking-widest uppercase">
      Powered by{" "}
      <a
        href="https://www.david-ortiz.dev"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white/50 hover:text-primary-light transition-colors"
      >
        www.david-ortiz.dev
      </a>
    </p>
  </div>
    </footer>
  );
}
