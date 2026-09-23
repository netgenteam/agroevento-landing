'use client';

import React from 'react';
import Image from 'next/image';

interface AllyLogo {
  id: string;
  name: string;
  filename: string;
  link: string;
}

const ALLIES_DATA: AllyLogo[] = [
  { id: 'ucab', name: 'Universidad Católica Andrés Bello', filename: 'UCAB.png', link: 'https://www.ucab.edu.ve' },
  { id: 'Indenzo', name: 'Indenzo', filename: 'INDENZO.png', link: '' },
  { id: 'Leibinger', name: 'Leibinger', filename: 'Leibinger-Logo.jpg', link: '' },
  { id: 'uneg', name: 'Universidad Nacional Experimental de Guayana', filename: 'UNEG.png', link: 'http://www.uneg.edu.ve' },
  { id: 'luz', name: 'Universidad del Zulia', filename: 'LUZ.png', link: 'https://www.luz.edu.ve' },
  { id: 'eurobuilding', name: 'Hotel Eurobuilding', filename: 'EUROBUILDING.png', link: 'https://eurobuilding.com.ve' },
  { id: 'plaza-meru', name: 'Hotel Plaza Merú', filename: 'PLAZA MERÚ.png', link: 'https://www.hotelplazameru.com' },
  { id: 'mara-inn', name: 'Hotel Mara Inn', filename: 'MARA INN.png', link: 'https://www.hotelmarainn.com.ve' },
  { id: 'portofino', name: 'Hotel Portofino', filename: 'PORTOFINO.png', link: 'https://hotelportofino.com.ve' },
  { id: 'waipa', name: 'Hotel Waipa', filename: 'WAIPA.png', link: 'https://www.instagram.com/hotelwaipa/' },
  { id: 'inalvica', name: 'Inalvica', filename: 'INALVICA.png', link: 'https://www.inalvica.com' },
  { id: 'agrominerales', name: 'Agrominerales', filename: 'AGROMINERALES.png', link: 'https://www.instagram.com/agrominerales/' },
  { id: 'agrotributos', name: 'Agrotributos', filename: 'AGROTRIBUTOS.png', link: 'https://www.instagram.com/agrotributos/' },
  { id: 'consultagro', name: 'Consultagro', filename: 'CONSULTAGRO.png', link: 'https://www.instagram.com/consultagro/' },
  { id: 'nadbio', name: 'Nadbio', filename: 'NADBIO.png', link: 'https://nadbio.com' },
  { id: 'phk', name: 'PHK', filename: 'PHK.png', link: 'https://www.instagram.com/phk_agro/' },
  { id: 'tiburon-blanco', name: 'Tiburón Blanco', filename: 'TIBURON BLANCO.png', link: 'https://www.instagram.com/tiburonblancove/' },
  { id: 'zapoara', name: 'Zapoara', filename: 'ZAPOARA.png', link: 'https://www.instagram.com/zapoaralacteos/' },
  { id: '286', name: '286', filename: '286.png', link: 'https://www.instagram.com/286agro/' },
  { id: 'campo-alegre', name: 'Centro Genético Campo Alegre', filename: 'Campo_alegre.png', link: 'https://www.instagram.com/campoalegre/' },
];

// Fila única completa duplicada para móvil (loop continuo fluido con todos los logos)
const allLogosDuplicated = [...ALLIES_DATA, ...ALLIES_DATA];

// Dos filas para escritorio (bidireccional)
const row1 = ALLIES_DATA.slice(0, 9);
const row2 = ALLIES_DATA.slice(9);
const duplicatedRow1 = [...row1, ...row1];
const duplicatedRow2 = [...row2, ...row2];

// Control para activar o desactivar la redirección de los enlaces (actualmente desactivado hasta tener las URLs oficiales)
const ENABLE_LINKS = false;

interface LogoCardProps {
  ally: AllyLogo;
  isMobile?: boolean;
}

const LogoCard: React.FC<LogoCardProps> = ({ ally, isMobile }) => {
  const imageSrc = encodeURI(`/logos/${ally.filename}`);

  const cardClasses = `group relative flex-shrink-0 bg-white rounded-2xl sm:rounded-3xl border border-gray-100/90 shadow-xs hover:shadow-xl hover:border-aprolac-green/40 transition-all duration-300 flex items-center justify-center overflow-hidden ${
    ENABLE_LINKS ? 'cursor-pointer' : 'cursor-default'
  } ${
    isMobile
      ? 'w-44 h-26 xs:w-48 xs:h-28 sm:w-52 sm:h-30 p-1.5 xs:p-2'
      : 'w-58 h-35 md:w-58 md:h-35 lg:w-66 lg:h-37 xl:w-73 xl:h-40 p-3.5 sm:p-4'
  }`;

  const isCampoAlegre = ally.id === 'campo-alegre' || ally.id === 'Leibinger' || ally.id === 'Indenzo';

  const imageContent = (
    <div className="relative w-full h-full flex items-center justify-center">
      <Image
        src={imageSrc}
        alt={`Logo de ${ally.name} – Aliado oficial Expo Agro Negocios Lácteos 2026`}
        fill
        sizes="(max-width: 640px) 320px, (max-width: 1024px) 280px, 320px"
        className={`object-contain transition-transform duration-300 filter drop-shadow-xs ${
          isMobile
            ? isCampoAlegre
              ? 'scale-85'
              : 'scale-125'
            : 'group-hover:scale-105'
        }`}
      />
    </div>
  );

  if (ENABLE_LINKS && ally.link) {
    return (
      <a
        href={ally.link}
        target="_blank"
        rel="noopener noreferrer"
        className={cardClasses}
        title={`Visitar sitio de ${ally.name}`}
      >
        {imageContent}
      </a>
    );
  }

  return (
    <div className={cardClasses} title={ally.name}>
      {imageContent}
    </div>
  );
};

export default function AlliesSlider() {
  return (
    <section id="aliados" className="relative py-16 sm:py-20 bg-aprolac-cream overflow-hidden border-y border-aprolac-border/60">
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-10 sm:mb-14 text-center">
        {/* Pastilla llamativa superior */}
        <div className="inline-flex items-center gap-2 bg-white border border-aprolac-green/30 text-aprolac-green px-4 py-1.5 rounded-full text-xs font-extrabold tracking-widest uppercase mb-4 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-aprolac-green animate-pulse" />
          <span>Alianzas Estratégicas</span>
        </div>

        {/* Título Principal Llamativo */}
        <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-aprolac-dark tracking-tight leading-tight">
          Conoce a nuestros{' '}
          <span className="text-aprolac-green relative inline-block">
            aliados
            <svg
              className="absolute -bottom-2 left-0 w-full h-2 sm:h-2.5 text-aprolac-green/40"
              viewBox="0 0 100 10"
              preserveAspectRatio="none"
            >
              <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" />
            </svg>
          </span>
        </h2>

        {/* Subtítulo Breve */}
        <p className="font-sans text-aprolac-text text-sm sm:text-base md:text-lg max-w-2xl mx-auto mt-4 leading-relaxed font-medium">
          Organizaciones líderes del sector agroindustrial, comercial y académico que impulsan la competitividad láctea venezolana.
        </p>
      </div>

      {/* Contenedor del Slider con Sombras Degradadas Laterales */}
      <div className="relative w-full overflow-hidden">
        {/* Degradado lateral izquierdo */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-20 sm:w-36 md:w-52 bg-gradient-to-r from-aprolac-cream via-aprolac-cream/85 to-transparent z-10" />

        {/* Degradado lateral derecho */}
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-20 sm:w-36 md:w-52 bg-gradient-to-l from-aprolac-cream via-aprolac-cream/85 to-transparent z-10" />

        {/* --- VISTA MÓVIL: Una sola fila continua con logos proporcionados, redirección táctil al tocar y scroll vertical fluido --- */}
        <div className="flex md:hidden overflow-hidden py-3 touch-pan-y">
          <div className="animate-marquee flex items-center gap-4 py-1.5">
            {allLogosDuplicated.map((ally, idx) => (
              <LogoCard key={`mobile-${ally.id}-${idx}`} ally={ally} isMobile />
            ))}
          </div>
        </div>

        {/* --- VISTA TABLET / ESCRITORIO (md+): Dos filas bidireccionales con logos proporcionados --- */}
        <div className="hidden md:flex flex-col gap-6 py-2">
          {/* Fila 1: Desplazamiento hacia la izquierda */}
          <div className="relative flex overflow-hidden">
            <div className="animate-marquee flex items-center gap-5 lg:gap-6 py-1">
              {duplicatedRow1.map((ally, idx) => (
                <LogoCard key={`row1-${ally.id}-${idx}`} ally={ally} />
              ))}
            </div>
          </div>

          {/* Fila 2: Desplazamiento hacia la derecha */}
          <div className="relative flex overflow-hidden">
            <div className="animate-marquee-reverse flex items-center gap-5 lg:gap-6 py-1">
              {duplicatedRow2.map((ally, idx) => (
                <LogoCard key={`row2-${ally.id}-${idx}`} ally={ally} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
