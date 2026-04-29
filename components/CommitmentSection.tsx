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

// 2. Datos extraídos para escalabilidad
const featuresData: Feature[] = [
  {
    id: "sostenibilidad",
    number: "01",
    title: "Sostenibilidad",
    description:
      "Prácticas agrícolas que regeneran la tierra, asegurando que los recursos naturales se preserven para las generaciones venideras, manteniendo un equilibrio ecológico vital.",
    imageUrl: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?q=80&w=800&auto=format&fit=crop", 
  },
  {
    id: "innovacion",
    number: "02",
    title: "Innovación Agro-Tech",
    description:
      "Integración de sistemas avanzados de monitoreo y logística para optimizar el rendimiento lechero, garantizando eficiencia y trazabilidad desde el campo hasta la industria.",
    imageUrl: "https://images.unsplash.com/photo-1516253593875-bd7ba052fbc5?q=80&w=800&auto=format&fit=crop", 
  },
  {
    id: "comunidad",
    number: "03",
    title: "Desarrollo Comunitario",
    description:
      "Empoderamiento de las economías locales a través de alianzas justas con productores, fomentando el crecimiento económico y fortaleciendo el tejido social rural.",
    imageUrl: "https://images.unsplash.com/photo-1595841696650-6f03d6e5a6a4?q=80&w=800&auto=format&fit=crop", 
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
    <section className="relative w-full bg-[#f8fbf9] py-20 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabecera de la sección */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16 lg:mb-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={headerVariants}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0F4A32] mb-6 tracking-tight">
            Nuestro Compromiso con la <br className="hidden md:block" />
            Tierra y el Futuro
          </h2>
          <p className="text-base md:text-lg text-gray-500 leading-relaxed">
            Transformando el potencial lechero en una realidad industrial
            sostenible, respetando nuestra herencia agrícola.
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
              {/* COMPONENTE MODIFICADO: Cambiamos aspect-[4/3] por aspect-[4/5] para hacerlas más altas */}
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