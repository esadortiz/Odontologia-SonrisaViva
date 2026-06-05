"use client";

import { useState, useCallback } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Servicios from "@/components/Servicios";
import Beneficios from "@/components/Beneficios";
import Sobre from "@/components/Sobre";
import Testimonios from "@/components/Testimonios";
import Contacto from "@/components/Contacto";
import Footer from "@/components/Footer";
import ReservationAgent from "@/components/ReservationAgent";
import Preloader from "@/components/Preloader";

export default function Home() {
  const [loading, setLoading] = useState(true);

  const handlePreloaderFinished = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <>
      {loading && <Preloader onFinished={handlePreloaderFinished} />}
      <div
        className={`transition-opacity duration-700 ease-out ${
          loading ? "opacity-0" : "opacity-100"
        }`}
      >
        <Navbar />
        <main>
          <Hero />
          <Servicios />
          <Beneficios />
          <Sobre />
          <Testimonios />
          <Contacto />
        </main>
        <Footer />
      </div>
      {!loading && <ReservationAgent />}
    </>
  );
}
