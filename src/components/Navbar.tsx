"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X, MessageCircle } from "lucide-react";

const navLinks = [
  { label: "Inicio", href: "#inicio" },
  { label: "Servicios", href: "#servicios" },
  { label: "Beneficios", href: "#beneficios" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Testimonios", href: "#testimonios" },
  { label: "Contacto", href: "#contacto" },
];

const sectionIds = navLinks.map((l) => l.href.replace("#", ""));

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: "-80px 0px -50% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
    <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
      <div className="flex h-16 sm:h-18 items-center justify-between">
        <a href="#inicio" className="flex items-center shrink-0">
          <Image
            src="/images/sonrisa-viva-logo.png"
            alt="Sonrisa Viva"
            width={180}
            height={52}
            className="w-28 sm:w-40 lg:w-44 h-auto object-contain"
            priority
          />
        </a>

        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const sectionId = link.href.replace("#", "");
            const isActive = activeSection === sectionId;
            return (
              <a
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "text-primary"
                    : "text-foreground/70 hover:text-primary"
                }`}
              >
                {link.label}
                <span
                  className={`absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full transition-all duration-300 ${
                    isActive
                      ? "opacity-100 scale-x-100"
                      : "opacity-0 scale-x-0"
                  }`}
                />
              </a>
            );
          })}
          <a
            href="https://wa.me/573106289086?text=Hola%2C%20quiero%20m%C3%A1s%20informaci%C3%B3n%20sobre%20los%20servicios%20odontol%C3%B3gicos%20de%20Sonrisa%20Viva."
            target="_blank"
            rel="noopener noreferrer"
            className="ml-4 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-[#20BD5A] transition-all hover:shadow-lg"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </a>
        </div>

        <button
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
        >
          {isOpen ? (
            <X className="h-6 w-6 text-foreground" />
          ) : (
            <Menu className="h-6 w-6 text-foreground" />
          )}
        </button>
      </div>
    </div>

      <div
        className={`lg:hidden border-t border-gray-100 bg-white overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-screen" : "max-h-0"
        }`}
        aria-hidden={!isOpen}
      >
        <div className="px-4 py-4 space-y-1">
          {navLinks.map((link) => {
            const sectionId = link.href.replace("#", "");
            const isActive = activeSection === sectionId;
            return (
              <a
                key={link.href}
                href={link.href}
                className={`block text-base font-medium py-2.5 px-3 rounded-lg transition-colors ${
                  isActive
                    ? "text-primary bg-primary/5 border-l-2 border-primary"
                    : "text-foreground/70 hover:text-primary hover:bg-gray-50"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            );
          })}
            <a
              href="https://wa.me/573106289086?text=Hola%2C%20quiero%20m%C3%A1s%20informaci%C3%B3n%20sobre%20los%20servicios%20odontol%C3%B3gicos%20de%20Sonrisa%20Viva."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold text-white shadow-md hover:bg-[#20BD5A] transition-all mt-2"
              onClick={() => setIsOpen(false)}
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
        </div>
      </div>
    </nav>
  );
}
