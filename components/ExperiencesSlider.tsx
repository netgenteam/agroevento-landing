"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";

// 1. Tipos de Datos
interface SlideData {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}

// 2. Datos del Slider (Escalable)
const slides: SlideData[] = [
  {
    id: 1,
    title: "Networking Ejecutivo C-Level",
    description: "Conectando a los principales tomadores de decisiones de la cadena de suministro global.",
    imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2000&auto=format&fit=crop", // Imagen tipo tech/mundo
  },
  {
    id: 2,
    title: "Exhibición de Innovación",
    description: "Las últimas tecnologías aplicadas a la industria láctea presentadas en tiempo real.",
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Alianzas Estratégicas",
    description: "Fomentando acuerdos comerciales que impulsan el crecimiento del sector a nivel internacional.",
    imageUrl: "https://images.unsplash.com/photo-1556761175-5973dc0f32d7?q=80&w=2000&auto=format&fit=crop",
  },
];

// 3. Variantes de Animación para el Slider
const slideVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
  }),
};

// Íconos SVG reutilizables
const ChevronLeft = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m15 18-6-6 6-6" />
  </svg>
);

const ChevronRight = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m9 18 6-6-6-6" />
  </svg>
);

export default function ExperiencesSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Funciones de control
  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    let nextIndex = currentIndex + newDirection;
    if (nextIndex < 0) nextIndex = slides.length - 1;
    if (nextIndex >= slides.length) nextIndex = 0;
    setCurrentIndex(nextIndex);
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

      {/* Cabecera del Slider: Textos a la izquierda, Controles a la derecha */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
        <div className="max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0F4A32] mb-3">
           Nuestros Eventos
          </h2>
          <p className="text-base text-gray-500 leading-relaxed">
            Descubra el nivel de excelencia y las oportunidades de negocio forjadas en nuestros eventos pasados.
          </p>
        </div>

        {/* Controles de Navegación */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => paginate(-1)}
            className="w-12 h-12 rounded-full  cursor-pointer border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-[#0F4A32] hover:text-white hover:border-[#0F4A32] transition-colors duration-300 bg-white shadow-sm"
            aria-label="Anterior"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={() => paginate(1)}
            className="w-12 h-12 rounded-full cursor-pointer border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-[#0F4A32] hover:text-white hover:border-[#0F4A32] transition-colors duration-300 bg-white shadow-sm"
            aria-label="Siguiente"
          >
            <ChevronRight />
          </button>
        </div>
      </div>

      {/* Contenedor Principal de la Imagen (Animado) */}
      <div className="relative w-full aspect-[4/5] md:aspect-[21/9] rounded-3xl overflow-hidden bg-gray-900 shadow-xl">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
            className="absolute inset-0 w-full h-full"
          >
            {/* Imagen de fondo */}
            <img
              src={slides[currentIndex].imageUrl}
              alt={slides[currentIndex].title}
              className="w-full h-full object-cover"
            />

            {/* Gradiente oscuro inferior para legibilidad del texto */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

            {/* Textos sobre la imagen */}
            <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full max-w-4xl">
              <motion.h3
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-2xl md:text-4xl font-bold text-white mb-3"
              >
                {slides[currentIndex].title}
              </motion.h3>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-sm md:text-lg text-gray-200"
              >
                {slides[currentIndex].description}
              </motion.p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Paginación (Puntitos abajo) */}
      <div className="flex justify-center items-center gap-2 mt-8">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all duration-500 ${index === currentIndex ? "w-8 bg-[#0F4A32]" : "w-2 bg-gray-300 hover:bg-gray-400"
              }`}
            aria-label={`Ir a diapositiva ${index + 1}`}
          />
        ))}
      </div>

    </div>
  );
}