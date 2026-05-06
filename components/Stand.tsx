"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import ExperiencesSlider from "./ExperiencesSlider"; // <-- Importación del Slider

// 1. Tipos de Datos
interface Feature {
  text: string;
}

interface StandPlan {
  id: string;
  title: string;
  description: string;
  features: Feature[];
  buttonText: string;
  isVip: boolean;
}

// 2. Datos del Componente
const standsData: StandPlan[] = [
  {
    id: "comercial",
    title: "Stand Comercial",
    description: "Presencia esencial para proveedores y servicios especializados.",
    features: [
      { text: "Espacio de exhibición de 9m²" },
      { text: "Mención en el directorio oficial" },
      { text: "2 Pases de acceso general" },
    ],
    buttonText: "Consultar Beneficios",
    isVip: false,
  },
  {
    id: "vip",
    title: "Stand VIP",
    description: "Máxima visibilidad y networking de alto nivel para líderes del sector.",
    features: [
      { text: "Espacio premium de 18m² en zona central" },
      { text: "Acceso al salón privado de networking" },
      { text: "Logotipo destacado en materiales del evento" },
      { text: "5 Pases All-Access B2B" },
    ],
    buttonText: "Solicitar Disponibilidad",
    isVip: true,
  },
  {
    id: "aliado",
    title: "Stand Aliado",
    description: "Oportunidad estratégica para asociaciones y entidades colaboradoras.",
    features: [
      { text: "Espacio colaborativo de 12m²" },
      { text: "Participación en panel de discusión" },
      { text: "3 Pases corporativos" },
    ],
    buttonText: "Consultar Beneficios",
    isVip: false,
  },
];

// 3. Variantes de Animación
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
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

// Ícono SVG de Check reutilizable
const CheckIcon = ({ color }: { color: string }) => (
  <svg
    className="w-5 h-5 flex-shrink-0 mt-0.5"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="24" height="24" rx="12" fill={color} />
    <path
      d="M7.5 12L10.5 15L16.5 9"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function Stands() {
  return (
    <section id="stands" className="relative w-full bg-[#f8fbf9] py-20 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header de los Planes */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16 lg:mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={headerVariants}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0F4A32] mb-6 tracking-tight">
            Visualización de Autoridad
          </h2>
          <p className="text-base md:text-lg text-gray-500 leading-relaxed">
            Posicione su marca en la cumbre de la logística láctea global con
            nuestros niveles de participación exclusivos.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6 items-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {standsData.map((plan) => (
            <motion.div
              key={plan.id}
              variants={cardVariants}
              className={`relative flex flex-col bg-white rounded-3xl overflow-hidden shadow-lg transition-transform duration-300 hover:shadow-xl ${
                plan.isVip
                  ? "border-t-[6px] border-[#7B1938] lg:scale-105 z-10 shadow-2xl py-10"
                  : "py-8"
              }`}
            >
              {/* Badge VIP */}
              {plan.isVip && (
                <div className="absolute top-0 right-0 bg-[#7B1938] text-white text-[10px] sm:text-xs font-bold px-4 py-1.5 rounded-bl-xl uppercase tracking-wider">
                  Recomendado
                </div>
              )}

              <div className="px-6 sm:px-8 flex-grow">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {plan.title}
                </h3>
                <p className="text-sm text-gray-500 mb-8 min-h-[40px]">
                  {plan.description}
                </p>

                {/* Lista de beneficios */}
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckIcon color={plan.isVip ? "#7B1938" : "#0F4A32"} />
                      <span className="text-sm text-gray-600 leading-relaxed">
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Botón */}
              <div className="px-6 sm:px-8 mt-auto pt-4">
                <a
                  href="#contacto"
                  className={`w-full py-3 px-6 rounded-full font-semibold text-sm transition-all duration-300 flex items-center justify-center ${
                    plan.isVip
                      ? "bg-[#7B1938] text-white hover:bg-[#5f132b] hover:shadow-lg"
                      : "bg-transparent text-[#0F4A32] border border-[#0F4A32] hover:bg-[#0F4A32] hover:text-white"
                  }`}
                >
                  {plan.buttonText}
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Separador y Slider de Experiencias */}
        <div className="mt-20 w-full">
          <div className="w-full h-px bg-gray-200 mb-16"></div> {/* Línea divisoria sutil */}
          <ExperiencesSlider />
        </div>

      </div>
    </section>
  );
}