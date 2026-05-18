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

// 2. Datos actualizados con los 4 Ejes Estratégicos exactos
const featuresData: Feature[] = [
  {
    id: "tradicion-innovacion",
    number: "01",
    title: "Tradición + Innovación",
    description:
      "Respetar el saber ancestral de los productores incorporando herramientas modernas como la trazabilidad y la tecnología.",
    imageUrl: "/eje1.jpg",
  },
  {
    id: "visibilidad-cadena",
    number: "02",
    title: "Visibilidad de la Cadena",
    description:
      "Lograr transparencia total en todo el proceso productivo, desde el trabajo inicial en el campo hasta que el producto llega al consumidor final.",
    imageUrl: "/eje2.jpg",
  },
  {
    id: "proyeccion-global",
    number: "03",
    title: "Proyección Global",
    description:
      "Elevar los estándares locales a niveles internacionales, preparando el terreno para la agroexportación y posicionando los productos lácteos venezolanos en mercados extranjeros.",
    imageUrl: "/eje3.jpg",
  },
  {
    id: "modelo-replicable",
    number: "04",
    title: "Modelo Replicable",
    description:
      "Establecer una hoja de ruta estandarizada que no solo beneficie al estado Bolívar, sino que pueda ser aplicada en otras regiones productivas del país, como los Andes, Zulia y el Centro-Occidente.",
    imageUrl: "/eje4.jpg",
  },
];

// 3. Variantes de Animación (Framer Motion)
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
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Cabecera de la sección */}
        <motion.div
          className="text-center max-w-4xl mx-auto mb-16 lg:mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={headerVariants}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0F4A32] mb-6 tracking-tight">
            Ejes Estratégicos para <br className="hidden md:block" />
            Transformar el Sector
          </h2>
          <p className="text-base md:text-lg text-gray-500 leading-relaxed max-w-3xl mx-auto">
            Nuestra visión es consolidar al sector como un clúster de alto valor que promueva la competitividad de los productores y la certificación de origen de productos autóctonos.
          </p>
        </motion.div>

        {/* Grid de Tarjetas (1 col móvil, 2 cols tablet, 4 cols desktop) */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10"
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
              <div className="relative w-full aspect-square rounded-3xl overflow-hidden mb-6 shadow-sm group-hover:shadow-xl transition-shadow duration-500 bg-gray-100">
                <img
                  src={feature.imageUrl}
                  alt={feature.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>

              {/* Contenido de texto y número de fondo */}
              <div className="relative flex-1 z-10 px-2">
                {/* Número decorativo gigante */}
                <div className="absolute -top-12 -right-2 text-7xl md:text-8xl font-bold text-[#0F4A32] opacity-[0.04] group-hover:opacity-[0.08] transition-opacity duration-500 pointer-events-none select-none">
                  {feature.number}
                </div>

                <h3 className="text-xl font-bold text-[#0F4A32] mb-3 relative z-10 pr-6">
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