"use client";

import React from "react";
import { motion, Variants } from "framer-motion";

// 1. Tipado de datos (TypeScript)
interface Feature {
  id: string;
  number: string;
  title: string;
  description: string;
  imageUrl: string;
}

// 2. Datos extraídos de la presentación oficial (Ajustado a 3 Ejes)
const featuresData: Feature[] = [
  {
    id: "tradicion-innovacion",
    number: "01",
    title: "Tradición + Innovación",
    description:
      "Respetar el saber ancestral incorporando trazabilidad y tecnología. Innovar no es romper la tradición, sino fortalecerla para el futuro.",
    imageUrl: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "visibilidad-cadena",
    number: "02",
    title: "Visibilidad de Cadena",
    description:
      "Articular desde el campo hasta el consumidor final. Transparencia total, procesos auditables y trazabilidad en cada eslabón productivo.",
    imageUrl: "https://images.unsplash.com/photo-1516253593875-bd7ba052fbc5?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "proyeccion-global",
    number: "03",
    title: "Proyección y Expansión",
    description:
      "Elevar el estándar de nuestros productos lácteos para conquistar mercados de agro-exportación, creando un modelo replicable en todo el país.",
    imageUrl: "/asian-woman.jpeg",
  },
];

// 3. Variantes de Animación (Framer Motion) con tipado estricto
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const headerVariants: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

export default function CommitmentSection() {
  return (
    <section id="compromiso" className="relative w-full bg-[#f8fbf9] py-20 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Cabecera de la sección */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-10 lg:mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={headerVariants}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0F4A32] mb-6 tracking-tight">
            Ejes Estratégicos para <br className="hidden md:block" />
            Transformar el Sector
          </h2>
          <p className="text-base md:text-lg text-gray-500 leading-relaxed">
            Nuestra visión se sostiene en pilares fundamentales para llevar el Queso Guayanés y la producción nacional al siguiente nivel de competitividad.
          </p>
        </motion.div>

        {/* Grid de Tarjetas */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {featuresData.map((feature) => (
            <motion.div
              key={feature.id}
              variants={cardVariants}
              className="relative group flex flex-col"
            >
              <div className="relative w-full aspect-[4/4] rounded-3xl overflow-hidden mb-8 shadow-sm group-hover:shadow-xl transition-shadow duration-500">
                <img
                  src={feature.imageUrl}
                  alt={feature.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>

              {/* Contenido de texto y número de fondo */}
              <div className="relative flex-1 z-10">
                {/* Número decorativo gigante */}
                <div className="absolute -top-14 -right-2 text-8xl md:text-9xl font-bold text-[#0F4A32] opacity-[0.04] group-hover:opacity-[0.08] transition-opacity duration-500 pointer-events-none select-none">
                  {feature.number}
                </div>

                <h3 className="text-xl md:text-2xl font-bold text-[#0F4A32] mb-3 relative z-10">
                  {feature.title}
                </h3>
                <p className="text-sm md:text-base text-gray-500 leading-relaxed relative z-10">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}