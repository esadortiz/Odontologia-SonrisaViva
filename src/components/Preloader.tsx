"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function Preloader({
  onFinished,
}: {
  onFinished: () => void;
}) {
  const [fadeOut, setFadeOut] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFadeOut(true), 1800);
    const goneTimer = setTimeout(() => {
      setGone(true);
      onFinished();
    }, 2300);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(goneTimer);
    };
  }, [onFinished]);

  if (gone) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden transition-opacity duration-500 ease-in-out ${
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{
        background:
          "linear-gradient(135deg, #ffffff 0%, #CAF0F8 30%, #90E0EF 60%, #2EC4B6 100%)",
      }}
      aria-hidden="true"
    >
      <div
        className={`flex flex-col items-center justify-center px-6 sm:px-8 md:px-10 lg:px-12 transition-all duration-700 ease-out ${
          fadeOut ? "opacity-0 scale-95" : "opacity-100 scale-100"
        }`}
      >
        <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 xl:w-64 xl:h-64 mb-6 sm:mb-8">
          <Image
            src="/images/sonrisa-viva-logo.png"
            alt="Sonrisa Viva"
            fill
            sizes="(max-width: 640px) 128px, (max-width: 768px) 160px, (max-width: 1024px) 192px, (max-width: 1280px) 224px, 256px"
            className="object-contain"
            priority
          />
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-center leading-tight mb-2 sm:mb-3 max-w-[260px] sm:max-w-md md:max-w-xl lg:max-w-2xl">
          Bienvenido a{" "}
          <span className="text-primary">Sonrisa Viva</span>
        </h1>

        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground text-center max-w-[260px] sm:max-w-md md:max-w-xl lg:max-w-2xl mb-8 sm:mb-10 md:mb-12">
          Cuidamos tu sonrisa con atención profesional
        </p>

        <div className="w-44 sm:w-52 md:w-60 lg:w-72 flex flex-col items-center gap-4">
          <div className="w-full h-2 sm:h-2.5 rounded-full bg-white/50 overflow-hidden">
            <div className="h-full rounded-full bg-gradient-to-r from-primary via-primary-light to-secondary animate-load-bar" />
          </div>

          <div className="flex items-center gap-2">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="block h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-primary animate-load-dot"
                style={{ animationDelay: `${i * 0.25}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
