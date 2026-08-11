"use client";

import React, { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

// 1. Tipos de Datos
interface Feature {
  text: string;
}

interface StandPlan {
  id: string;
  title: string;
  subtitle?: string;
  features: Feature[];
  moreFeatures?: boolean;
  buttonText: string;
  isVip: boolean;
}

// 2. Datos del Componente
const standsData: StandPlan[] = [
  {
    id: "vehiculos",
    subtitle: "48 M² TECHADOS",
    title: "Empresas de Vehículos",
    features: [
      { text: "1 desayuno y 1 almuerzo por día" },
      { text: "Mesón 1,8 x 0,6 m + alfombra de 16 m² + 4 sillas" },
      { text: "Punto de luz 110V, máximo 10 amp" },
      { text: "10 min de exposición en tarima principal" },
      { text: "Presencia de marca en pantallas digitales" },
    ],
    moreFeatures: true,
    buttonText: "Consultar Beneficios",
    isVip: false,
  },
  {
    id: "emprendedor",
    subtitle: "IMPULSO A NUEVOS NEGOCIOS",
    title: "Comercial Emprendedor",
    features: [
      { text: "1 desayuno y 1 almuerzo por día" },
      { text: "Mesa cuadrada 0,8 x 0,8 m + 2 sillas" },
      { text: "Presencia de marca en backing" },
      { text: "Punto de luz 110V, máximo 10 amp" },
      { text: "Espacio ideal para emprendedores y marcas emergentes del sector" },
    ],
    moreFeatures: true,
    buttonText: "Consultar Beneficios",
    isVip: false,
  },
  {
    id: "premium",
    subtitle: "ZONA CLIMATIZADA • ALTA AFLUENCIA",
    title: "Comercial Premium",
    features: [
      { text: "1 desayuno y 1 almuerzo por día" },
      { text: "Mesa cuadrada 0,8 x 0,8 m + 2 sillas" },
      { text: "Punto de luz 110V, máximo 10 amp" },
      { text: "10 min de exposición en tarima principal" },
      { text: "1 entrada a conferencia + descuento en rueda de negocios" },
    ],
    moreFeatures: true,
    buttonText: "Solicitar Disponibilidad",
    isVip: true,
  },
  {
    id: "patrocinante",
    subtitle: "MÁXIMA EXPOSICIÓN",
    title: "Patrocinante Oficial",
    features: [
      { text: " Inversión a convenir" },
      { text: " Máximo nivel de visibilidad de marca" },
      { text: " 2 desayunos y 2 almuerzos por día." },
      { text: " Logo en backings, pantallas y medios digitales." },
      { text: " Presencia en salones de conferencias." },
    ],
    moreFeatures: true,
    buttonText: "Solicitar Patrocinio",
    isVip: false,
  },
  {
    id: "externo",
    subtitle: "AMPLIA VISIBILIDAD EXTERNA",
    title: "Comercial Externo",
    features: [
      { text: "1 desayuno y 1 almuerzo por día" },
      { text: "Mesa cuadrada 0,8 x 0,8 m + 2 sillas" },
      { text: "Punto de luz 110V, máximo 10 amp" },
      { text: " 10 min de exposición en tarima principal y pantalla" },
    ],
    moreFeatures: true,
    buttonText: "Consultar Beneficios",
    isVip: false,
  },
];

// Ícono SVG de Check
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

export default function StandsSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Funciones de navegación
  const nextSlide = () => setActiveIndex((prev) => (prev + 1) % standsData.length);
  const prevSlide = () => setActiveIndex((prev) => (prev - 1 + standsData.length) % standsData.length);

  // Auto-play del slider (se frena si el mouse está encima)
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(nextSlide, 4000); 
    return () => clearInterval(interval);
  }, [isHovered]);

  // Cálculo de posiciones para el efecto infinito
  const getPosition = (index: number) => {
    const diff = (index - activeIndex + standsData.length) % standsData.length;
    if (diff === 0) return "center";
    if (diff === 1) return "right1";
    if (diff === 2) return "right2";
    if (diff === standsData.length - 2) return "left2";
    if (diff === standsData.length - 1) return "left1";
    return "center";
  };

  const sliderVariants: Variants = {
    center: { x: "0%", scale: 1, zIndex: 10, opacity: 1 },
    left1: { x: "-105%", scale: 0.85, zIndex: 5, opacity: 0.75 },
    right1: { x: "105%", scale: 0.85, zIndex: 5, opacity: 0.75 },
    left2: { x: "-200%", scale: 0.7, zIndex: 0, opacity: 0 },
    right2: { x: "200%", scale: 0.7, zIndex: 0, opacity: 0 },
  };

  return (
    <section className="relative w-full bg-[#f5f5f5] py-20 lg:py-24 overflow-hidden">
      <div className="max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-10 lg:mb-10"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0F4A32] mb-4 tracking-tight">
            Nuestros Stands
          </h2>
          <p className="text-base md:text-lg text-gray-500 leading-relaxed">
            Descubra las opciones de participación diseñadas para maximizar la visibilidad y el impacto de su marca en el evento.
          </p>
        </motion.div>



        {/* Contenedor Principal (Pausa al pasar el mouse) */}
        <div 
          className="relative flex justify-center items-center h-[540px] w-full mx-auto"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Flecha Izquierda (Visibles solo en pantallas medianas y grandes) */}
          <button 
            onClick={prevSlide}
            aria-label="Stand anterior"
            className="hidden sm:flex absolute left-2 lg:left-8 cursor-pointer z-30 w-12 h-12 items-center justify-center bg-white rounded-full shadow-lg text-[#0F4A32] border border-gray-100 hover:bg-[#0F4A32] hover:text-white transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Wrapper del Slider */}
          <div className="relative flex justify-center items-center h-full w-full max-w-[1280px] overflow-visible">
            {standsData.map((plan, index) => {
              const position = getPosition(index);
              const isCenter = position === "center";

              return (
                <motion.div
                  key={plan.id}
                  variants={sliderVariants}
                  initial={false}
                  animate={position}
                  transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                  className={`absolute w-[90%] sm:w-[430px] lg:w-[440px] h-[510px] flex flex-col bg-white rounded-3xl overflow-hidden transition-shadow duration-300 ${
                    isCenter ? "shadow-2xl cursor-default" : "shadow-md cursor-pointer"
                  } ${
                    plan.isVip
                      ? "border-t-[6px] border-[#7B1938]"
                      : "border-t-[6px] border-[#0F4A32]"
                  }`}
                  onClick={() => !isCenter && setActiveIndex(index)}
                >
                  <div className="flex flex-col h-full bg-white relative">
                    
                    {/* Badge Recomendado (VIP) */}
                    {plan.isVip && (
                      <div className="absolute top-0 right-0 bg-[#7B1938] text-white text-[10px] font-bold px-4 py-1.5 rounded-bl-xl uppercase tracking-wider z-10 shadow-sm">
                        Recomendado
                      </div>
                    )}

                    <div className="px-6 sm:px-8 pt-7 flex-grow flex flex-col">
                      {plan.subtitle && (
                        <p className={`text-[10px] font-bold uppercase tracking-widest mb-2 ${plan.isVip ? "text-[#7B1938]" : "text-[#0F4A32]"}`}>
                          {plan.subtitle}
                        </p>
                      )}
                      <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 pr-4 leading-tight">
                        {plan.title}
                      </h3>

                      {/* Lista de beneficios */}
                      <ul className="space-y-3 mb-2 flex-grow">
                        {plan.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2.5">
                            <CheckIcon color={plan.isVip ? "#7B1938" : "#0F4A32"} />
                            <span className="text-[14px] sm:text-[15px] text-gray-700 leading-relaxed">
                              {feature.text}
                            </span>
                          </li>
                        ))}
                      </ul>
                      
                      {/* Indicador de más beneficios */}
                      {plan.moreFeatures && (
                        <p className="text-xs text-gray-400 italic mb-3 ml-7 font-medium">
                          + y más beneficios exclusivos...
                        </p>
                      )}
                    </div>

                    {/* Botón */}
                    <div className="px-6 sm:px-8 pb-6 mt-auto">
                      <a
                        href="#contacto"
                        className={`w-full py-3.5 px-6 rounded-full font-semibold text-sm sm:text-base transition-all duration-300 flex items-center justify-center border-2 ${
                          plan.isVip
                            ? "bg-[#7B1938] text-white border-[#7B1938] hover:bg-transparent hover:text-[#7B1938]"
                            : "bg-transparent text-[#0F4A32] border-[#0F4A32] hover:bg-[#0F4A32] hover:text-white"
                        }`}
                      >
                        {plan.buttonText}
                      </a>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Flecha Derecha (Visibles solo en pantallas medianas y grandes) */}
          <button 
            onClick={nextSlide}
            aria-label="Stand siguiente"
            className="hidden sm:flex absolute right-2 lg:right-8 cursor-pointer z-30 w-12 h-12 items-center justify-center bg-white rounded-full shadow-lg text-[#0F4A32] border border-gray-100 hover:bg-[#0F4A32] hover:text-white transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
        
        {/* Paginación Inferior: Puntos en Escritorio, Flechas + Número en Móvil */}
        <div className="hidden sm:flex justify-center gap-3 mt-8">
          {standsData.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`w-3 h-3 rounded-full transition-colors duration-300 cursor-pointer ${
                activeIndex === idx ? "bg-[#0F4A32]" : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Ir al slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Versión Móvil: Flechas de Navegación con Indicador de Números Abajo (Sin Puntos) */}
        <div className="flex sm:hidden justify-center items-center gap-4 mt-8">
          <button 
            onClick={prevSlide}
            aria-label="Stand anterior"
            className="w-11 h-11 flex items-center justify-center bg-white rounded-full shadow-md text-[#0F4A32] border border-gray-200 active:scale-95 transition-all cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <span className="text-xs font-bold text-[#0F4A32] uppercase tracking-widest px-3.5 py-1.5 bg-white rounded-full border border-gray-200 shadow-xs">
            {activeIndex + 1} / {standsData.length}
          </span>
          <button 
            onClick={nextSlide}
            aria-label="Stand siguiente"
            className="w-11 h-11 flex items-center justify-center bg-white rounded-full shadow-md text-[#0F4A32] border border-gray-200 active:scale-95 transition-all cursor-pointer"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

      </div>
    </section>
  );
}