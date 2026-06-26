'use client';
import { Icon } from "@iconify/react";

const Hero = () => {
  return (
    <section id="inicio" className="relative w-full h-screen min-h-160 overflow-hidden">
      {/* Fondo de Video */}
      <video
        src="/hero-video.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Overlay Oscuro Fijo */}
      <div
        className="absolute inset-0 bg-black z-10"
        style={{ opacity: 0.7 }}
      />

      {/* Capa de Texto Fija en el Centro */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-20 px-6 pt-16">
        <div className="flex flex-col items-center text-center">
          <span className="text-gray-300 font-sans text-[10px] lg:text-xl tracking-[0.3em] uppercase mb-4 block">
            "Seguid el ejemplo que Guayana dio"
          </span>
         <h1 className="font-lexend font-extrabold text-4xl lg:text-6xl xl:text-8xl uppercase tracking-tight leading-none">
            <span className="text-white">EXPO AGRO NEGOCIOS </span>
            <br />
            <span className="text-aprolac-green block mt-2">LÁCTEOS 2026</span>
          </h1>

          {/* Subtítulo y Botones */}
          <div className="mt-6 lg:mt-8 flex flex-col items-center max-w-2xl">
            <p className="font-sans text-gray-300 text-base lg:text-xl leading-relaxed">
              Un hito fundacional para articular al sector, impulsar la Indicación Geográfica Protegida del Queso Guayanés y proyectar a Venezuela como la cuenca lechera de Latinoamérica, para la agroexportación.</p>
            <div className="flex flex-col sm:flex-row gap-4 mt-8 lg:mt-10 w-full sm:w-auto px-4 sm:px-0">
              <a
                href="#contacto"
                className="flex items-center justify-center gap-3 bg-aprolac-green text-white rounded-xl px-6 py-3 lg:px-10 lg:py-4 font-bold text-base lg:text-lg hover:bg-[#0a5c3e] transition-all transform hover:scale-105 shadow-lg shadow-aprolac-green/20"
              >
                <Icon icon="mdi:account-tie" height="24" />
                Contactar Asesor
              </a>
              <a
                href="https://wa.me/584148469666?text=Hola,%20quisiera%20obtener%20informaci%C3%B3n%20sobre%20la%20Expo%202026."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 border-2 border-white text-white rounded-xl px-6 py-3 lg:px-8 lg:py-4 font-bold text-base lg:text-lg hover:bg-white hover:text-aprolac-dark transition-all transform hover:scale-105"
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