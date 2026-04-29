'use client';
import { useState, useEffect } from 'react';
import ScrollFloat from './ScrollFloat';
import { Icon } from "@iconify/react";

const Hero = () => {
  // Estado para la opacidad controlada nativamente
  const [overlayOpacity, setOverlayOpacity] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Posición actual del scroll
      const scrollY = window.scrollY;

      // ¿A cuántos píxeles de scroll queremos que llegue al negro máximo?
      // window.innerHeight * 0.8 significa que al scrollear el 80% de una pantalla, ya estará en negro casi total.
      const targetScroll = window.innerHeight * 0.60;

      // Calculamos la proporción (de 0 a 1)
      let currentOpacity = scrollY / targetScroll;

      // Topamos el máximo en 0.98 para que nunca pase de ahí
      if (currentOpacity > 0.98) currentOpacity = 0.96;

      setOverlayOpacity(currentOpacity);
    };

    // Escuchamos el scroll
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Ejecutamos una vez al montar por si el usuario recarga a mitad de la página
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative w-full h-[200vh]">
      {/* Fondo de Video (Sticky) */}
      <div className="sticky top-0 w-full h-screen overflow-hidden z-0">
        <video
          src="/video Hero.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Overlay Oscuro con opacidad inyectada directamente */}
        <div
          style={{ opacity: overlayOpacity }}
          className="absolute inset-0 bg-black z-10"
        />
      </div>

      {/* Capa de Texto (Flujo Normal para GSAP) */}
      <div className="absolute top-[100vh] left-0 w-full flex flex-col items-center justify-center z-20 px-6">
        <div className="flex flex-col items-center text-center">
          <ScrollFloat
            scrollStart="top bottom"
            scrollEnd="center center"
            textClassName="font-lexend font-extrabold text-5xl md:text-8xl text-white uppercase tracking-tight"
            containerClassName="mb-0"
          >
            EL RENACIMIENTO
          </ScrollFloat>

          <ScrollFloat
            scrollStart="top bottom"
            scrollEnd="center center"
            textClassName="font-lexend font-extrabold text-5xl md:text-8xl text-aprolac-green uppercase tracking-tight"
            containerClassName="mt-[-0.3rem] md:mt-[-0.5rem]"
          >
            DE UNA INDUSTRIA
          </ScrollFloat>

          {/* Subtítulo y Botones */}
          <div className="mt-8 flex flex-col items-center max-w-2xl">
            <p className="font-sans text-gray-300 text-lg md:text-xl leading-relaxed">
              Expo Agro Negocios Lácteos Venezuela 2026. Liderando el futuro del sector
              a través del desarrollo sostenible y la tecnología corporativa.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-10 w-full sm:w-auto">
              <a
                href="#contacto"
                className="bg-aprolac-green text-white rounded-lg px-10 py-4 font-bold text-lg hover:bg-[#0a5c3e] transition-all transform hover:scale-105 shadow-lg shadow-aprolac-green/20 text-center"
              >
                Contactar Asesor
              </a>
              <a
                href="https://wa.me/+58424000000"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 border-2 border-white text-white rounded-lg px-8 py-4 font-bold text-lg hover:bg-white hover:text-aprolac-dark transition-all transform hover:scale-105"
              >
                <Icon icon="mdi:whatsapp" height="24" />
                WhatsApp Oficial
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;