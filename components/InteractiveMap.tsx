"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Check, Lock, Send, Info, Trash2, ArrowLeft, Building, Sun } from "lucide-react";
import Link from "next/link";

// 1. CONTROL MANUAL DE ESTADOS (Stands Ocupados/Vendidos)
const ESTADOS_MANUALES: Record<string, string> = {
  // Ej: "Q-12": "ocupado",
};

// 2. BASE DE DATOS UNIFICADA DE AMBOS MAPAS (INTERIOR Y EXTERIOR)
const STANDS_DATA = [
  // === PLANO INTERIOR (Salón Principal) ===
  { id: "Q-3", name: "Q-3", size: "4.8 M2", color: "bg-[#ed7d31]", mapType: "interior", mapLabel: "Salón" },
  { id: "Q-7", name: "Q-7", size: "4.5 M2", color: "bg-[#ed7d31]", mapType: "interior", mapLabel: "Salón" },
  { id: "Q-20", name: "Q-20", size: "4.5 M2", color: "bg-[#ed7d31]", mapType: "interior", mapLabel: "Salón" },
  { id: "Q-25", name: "Q-25", size: "5 M2", color: "bg-[#ed7d31]", mapType: "interior", mapLabel: "Salón" },
  { id: "Q-26", name: "Q-26", size: "5 M2", color: "bg-[#ed7d31]", mapType: "interior", mapLabel: "Salón" },

  { id: "Q-1", name: "Q-1", size: "7.5 M2", color: "bg-[#548235]", mapType: "interior", mapLabel: "Salón" },
  { id: "Q-2", name: "Q-2", size: "7.5 M2", color: "bg-[#548235]", mapType: "interior", mapLabel: "Salón" },
  { id: "Q-8", name: "Q-8", size: "6 M2", color: "bg-[#548235]", mapType: "interior", mapLabel: "Salón" },
  { id: "Q-9", name: "Q-9", size: "6 M2", color: "bg-[#548235]", mapType: "interior", mapLabel: "Salón" },
  { id: "Q-10", name: "Q-10", size: "6 M2", color: "bg-[#548235]", mapType: "interior", mapLabel: "Salón" },
  { id: "Q-11", name: "Q-11", size: "6 M2", color: "bg-[#548235]", mapType: "interior", mapLabel: "Salón" },
  { id: "Q-16", name: "Q-16", size: "6 M2", color: "bg-[#548235]", mapType: "interior", mapLabel: "Salón" },
  { id: "Q-17", name: "Q-17", size: "6 M2", color: "bg-[#548235]", mapType: "interior", mapLabel: "Salón" },
  { id: "Q-18", name: "Q-18", size: "6 M2", color: "bg-[#548235]", mapType: "interior", mapLabel: "Salón" },
  { id: "Q-19", name: "Q-19", size: "6 M2", color: "bg-[#548235]", mapType: "interior", mapLabel: "Salón" },
  { id: "P-08", name: "Patrocinante 08", size: "7 M2", color: "bg-[#548235]", mapType: "interior", mapLabel: "Salón" },

  { id: "Q-4", name: "Q-4", size: "10.2 M2", color: "bg-[#5b9bd5]", mapType: "interior", mapLabel: "Salón" },
  { id: "Q-5", name: "Q-5", size: "10.5 M2", color: "bg-[#5b9bd5]", mapType: "interior", mapLabel: "Salón" },
  { id: "Q-6", name: "Q-6", size: "10.5 M2", color: "bg-[#5b9bd5]", mapType: "interior", mapLabel: "Salón" },
  { id: "Q-12", name: "Q-12", size: "9 M2", color: "bg-[#5b9bd5]", mapType: "interior", mapLabel: "Salón" },
  { id: "Q-13", name: "Q-13", size: "9 M2", color: "bg-[#5b9bd5]", mapType: "interior", mapLabel: "Salón" },
  { id: "Q-14", name: "Q-14", size: "9 M2", color: "bg-[#5b9bd5]", mapType: "interior", mapLabel: "Salón" },
  { id: "Q-15", name: "Q-15", size: "9 M2", color: "bg-[#5b9bd5]", mapType: "interior", mapLabel: "Salón" },
  { id: "Q-21", name: "Q-21", size: "10.5 M2", color: "bg-[#5b9bd5]", mapType: "interior", mapLabel: "Salón" },
  { id: "Q-22", name: "Q-22", size: "10.5 M2", color: "bg-[#5b9bd5]", mapType: "interior", mapLabel: "Salón" },
  { id: "Q-23", name: "Q-23", size: "10.5 M2", color: "bg-[#5b9bd5]", mapType: "interior", mapLabel: "Salón" },
  { id: "Q-24", name: "Q-24", size: "10.2 M2", color: "bg-[#5b9bd5]", mapType: "interior", mapLabel: "Salón" },
  { id: "P-07", name: "Patrocinante 07", size: "8 M2", color: "bg-[#5b9bd5]", mapType: "interior", mapLabel: "Salón" },
  { id: "P-09", name: "Patrocinante 09", size: "8 M2", color: "bg-[#5b9bd5]", mapType: "interior", mapLabel: "Salón" },

  { id: "P-01", name: "Patrocinante 01", size: "12.5 M2", color: "bg-[#7030a0]", mapType: "interior", mapLabel: "Salón" },
  { id: "P-02", name: "Patrocinante 02", size: "18 M2", color: "bg-[#7030a0]", mapType: "interior", mapLabel: "Salón" },
  { id: "P-03", name: "Patrocinante 03", size: "12.5 M2", color: "bg-[#7030a0]", mapType: "interior", mapLabel: "Salón" },
  { id: "P-04", name: "Patrocinante 04", size: "12.5 M2", color: "bg-[#7030a0]", mapType: "interior", mapLabel: "Salón" },
  { id: "P-05", name: "Patrocinante 05", size: "18 M2", color: "bg-[#7030a0]", mapType: "interior", mapLabel: "Salón" },
  { id: "P-06", name: "Patrocinante 06", size: "12.5 M2", color: "bg-[#7030a0]", mapType: "interior", mapLabel: "Salón" },

  // === PLANO EXTERIOR (Zona Exterior - G-1 a G-32) ===
  { id: "G-1", name: "G-1", size: "3X3", color: "bg-[#5b9bd5]", mapType: "exterior", mapLabel: "Exterior" },
  { id: "G-2", name: "G-2", size: "3X3", color: "bg-[#5b9bd5]", mapType: "exterior", mapLabel: "Exterior" },
  { id: "G-3", name: "G-3", size: "3X3", color: "bg-[#5b9bd5]", mapType: "exterior", mapLabel: "Exterior" },
  { id: "G-4", name: "G-4", size: "3X3", color: "bg-[#5b9bd5]", mapType: "exterior", mapLabel: "Exterior" },
  { id: "G-5", name: "G-5", size: "3X3", color: "bg-[#5b9bd5]", mapType: "exterior", mapLabel: "Exterior" },
  { id: "G-6", name: "G-6", size: "3X3", color: "bg-[#5b9bd5]", mapType: "exterior", mapLabel: "Exterior" },
  { id: "G-7", name: "G-7", size: "3X3", color: "bg-[#5b9bd5]", mapType: "exterior", mapLabel: "Exterior" },
  { id: "G-8", name: "G-8", size: "3X3", color: "bg-[#5b9bd5]", mapType: "exterior", mapLabel: "Exterior" },

  { id: "G-9", name: "G-9", size: "2X3", color: "bg-[#548235]", mapType: "exterior", mapLabel: "Exterior" },
  { id: "G-10", name: "G-10", size: "2X3", color: "bg-[#548235]", mapType: "exterior", mapLabel: "Exterior" },
  { id: "G-11", name: "G-11", size: "2X3", color: "bg-[#548235]", mapType: "exterior", mapLabel: "Exterior" },
  { id: "G-12", name: "G-12", size: "2X3", color: "bg-[#548235]", mapType: "exterior", mapLabel: "Exterior" },
  { id: "G-13", name: "G-13", size: "2X3", color: "bg-[#548235]", mapType: "exterior", mapLabel: "Exterior" },
  { id: "G-14", name: "G-14", size: "2X3", color: "bg-[#548235]", mapType: "exterior", mapLabel: "Exterior" },
  { id: "G-15", name: "G-15", size: "2X3", color: "bg-[#548235]", mapType: "exterior", mapLabel: "Exterior" },
  { id: "G-16", name: "G-16", size: "2X3", color: "bg-[#548235]", mapType: "exterior", mapLabel: "Exterior" },
  { id: "G-17", name: "G-17", size: "2X3", color: "bg-[#548235]", mapType: "exterior", mapLabel: "Exterior" },
  { id: "G-18", name: "G-18", size: "2X3", color: "bg-[#548235]", mapType: "exterior", mapLabel: "Exterior" },
  { id: "G-19", name: "G-19", size: "2X3", color: "bg-[#548235]", mapType: "exterior", mapLabel: "Exterior" },
  { id: "G-20", name: "G-20", size: "2X3", color: "bg-[#548235]", mapType: "exterior", mapLabel: "Exterior" },
  { id: "G-21", name: "G-21", size: "2X3", color: "bg-[#548235]", mapType: "exterior", mapLabel: "Exterior" },
  { id: "G-22", name: "G-22", size: "2X3", color: "bg-[#548235]", mapType: "exterior", mapLabel: "Exterior" },
  { id: "G-23", name: "G-23", size: "2X3", color: "bg-[#548235]", mapType: "exterior", mapLabel: "Exterior" },
  { id: "G-24", name: "G-24", size: "2X3", color: "bg-[#548235]", mapType: "exterior", mapLabel: "Exterior" },
  { id: "G-25", name: "G-25", size: "2X3", color: "bg-[#548235]", mapType: "exterior", mapLabel: "Exterior" },
  { id: "G-26", name: "G-26", size: "2X3", color: "bg-[#548235]", mapType: "exterior", mapLabel: "Exterior" },
  { id: "G-27", name: "G-27", size: "2X3", color: "bg-[#548235]", mapType: "exterior", mapLabel: "Exterior" },
  { id: "G-28", name: "G-28", size: "2X3", color: "bg-[#548235]", mapType: "exterior", mapLabel: "Exterior" },
  { id: "G-29", name: "G-29", size: "2X3", color: "bg-[#548235]", mapType: "exterior", mapLabel: "Exterior" },
  { id: "G-30", name: "G-30", size: "2X3", color: "bg-[#548235]", mapType: "exterior", mapLabel: "Exterior" },
  { id: "G-31", name: "G-31", size: "2X3", color: "bg-[#548235]", mapType: "exterior", mapLabel: "Exterior" },
  { id: "G-32", name: "G-32", size: "2X3", color: "bg-[#548235]", mapType: "exterior", mapLabel: "Exterior" },
].map(stand => ({ ...stand, status: ESTADOS_MANUALES[stand.id] || "disponible" }));

export default function InteractiveFloorPlan() {
  const [selectedStands, setSelectedStands] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<"interior" | "exterior">("interior");

  const toggleStand = (id: string, status: string) => {
    if (status === "ocupado") return;
    setSelectedStands((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const clearCart = () => setSelectedStands([]);
  const cartItems = STANDS_DATA.filter((stand) => selectedStands.includes(stand.id));

  const handleWhatsAppRedirect = () => {
    const phoneNumber = "584148469666";
    let message = `Hola, estoy interesado en los siguientes stands:\n`;
    cartItems.forEach((item) => {
      message += `\n- ${item.name} (${item.size}) [${item.mapLabel}]`;
    });
    message += `\n\nPor favor, me indican la disponibilidad y los pasos a seguir.`;
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, "_blank");
  };

  const renderStand = (id: string, customStyles: string) => {
    const stand = STANDS_DATA.find((s) => s.id === id);
    if (!stand) return null;

    const isSelected = selectedStands.includes(stand.id);
    const isOccupied = stand.status === "ocupado";

    return (
      <motion.button
        key={stand.id}
        animate={{
          scale: isSelected ? 1.05 : 1,
          zIndex: isSelected ? 30 : 10
        }}
        whileHover={!isOccupied && !isSelected ? { scale: 1.05, zIndex: 20 } : {}}
        whileTap={!isOccupied ? { scale: 0.95 } : {}}
        onClick={() => toggleStand(stand.id, stand.status)}
        className={`relative flex flex-col items-center justify-center rounded-md border border-white/20 shadow-sm cursor-pointer overflow-hidden ${customStyles}
          ${isOccupied
            ? "bg-gray-200 border-gray-300 cursor-not-allowed text-gray-400"
            : `${stand.color} text-white hover:shadow-lg hover:border-white`
          }
          ${isSelected ? "!border-black ring-2 ring-black shadow-xl" : ""}
        `}
      >
        {isOccupied ? (
          <Lock className="w-4 h-4" />
        ) : (
          <>
            <span className="font-bold text-[9px] md:text-[10px] tracking-tight leading-none text-center px-0.5">
              {stand.name}
            </span>
            <span className="text-[7px] md:text-[8px] opacity-90 mt-0.5 leading-none px-0.5 text-center">
              {stand.size}
            </span>
            {isSelected && (
              <div className="absolute top-0.5 right-0.5 bg-black text-white rounded-full p-[2px] shadow-md">
                <Check className="w-2.5 h-2.5" />
              </div>
            )}
          </>
        )}
      </motion.button>
    );
  };

  return (
    <section className="py-2 md:py-4 bg-aprolac-cream relative">
      <div className="max-w-[1700px] mx-auto px-4 md:px-6 grid grid-cols-1 xl:grid-cols-4 gap-8 items-start">
        
        {/* COLUMNA IZQUIERDA: CONTENEDOR DE MAPAS (ALINEADO ARRIBA CON EL CARRITO EN LAPTOP) */}
        <div className="xl:col-span-3 bg-white p-6 rounded-[2rem] shadow-xl border border-aprolac-border/50 flex flex-col w-full overflow-hidden">
          
          {/* Header del Plano y Navegación entre Mapas */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4 border-b border-gray-100 pb-4">
            <div>
              <Link href="/" className="inline-flex items-center gap-2 text-aprolac-green hover:text-aprolac-dark font-bold mb-2 transition-colors font-sans text-xs md:text-sm tracking-wide">
                <ArrowLeft className="w-3.5 h-3.5 md:w-4 md:h-4" /> Volver al Inicio
              </Link>
              <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-aprolac-dark mb-1">
                Plano Interactivo Expo 2026
              </h2>
              <p className="text-gray-500 text-xs sm:text-sm flex items-center gap-1.5 md:gap-2">
                <Info className="w-3.5 h-3.5 md:w-4 md:h-4 text-aprolac-green shrink-0" /> Selecciona tus stands en el mapa.
              </p>
            </div>

            {/* PESTAÑAS (TABS) DE SELECCIÓN DE MAPA CON TEXTO COMPACTO EN MÓVIL Y NOMBRES SOLICITADOS */}
            <div className="flex items-center gap-1 sm:gap-2 bg-gray-100 p-1 sm:p-1.5 rounded-xl sm:rounded-2xl border border-gray-200 shadow-inner">
              <button
                onClick={() => setActiveTab("interior")}
                className={`px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl font-bold text-[10px] sm:text-xs md:text-sm transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
                  activeTab === "interior"
                    ? "bg-aprolac-green text-white shadow-md"
                    : "text-gray-600 hover:text-aprolac-dark hover:bg-white/60"
                }`}
              >
                <Building className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                Plano Interior
              </button>
              <button
                onClick={() => setActiveTab("exterior")}
                className={`px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl font-bold text-[10px] sm:text-xs md:text-sm transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
                  activeTab === "exterior"
                    ? "bg-aprolac-green text-white shadow-md"
                    : "text-gray-600 hover:text-aprolac-dark hover:bg-white/60"
                }`}
              >
                <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                Plano Exterior
              </button>
            </div>
          </div>

          {/* CONTENEDOR: SCROLL HORIZONTAL EN MÓVIL/TELÉFONO, AJUSTADO SIN SCROLL EN LAPTOP */}
          <div className="w-full overflow-x-auto xl:overflow-x-visible custom-scrollbar pb-4">
            
            {/* === MAPA 1: PLANO INTERIOR (AMPLIO EN TELÉFONO PARA SCROLL, SIN SCROLL EN LAPTOP) === */}
            {activeTab === "interior" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.985, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
                className="min-w-[1150px] xl:min-w-0 xl:w-full w-full min-h-[720px] xl:min-h-[640px] bg-white border-4 border-[#b4b8c5] p-4 xl:p-6 relative flex flex-col font-sans select-none text-[#7d8597] shadow-sm rounded-xl overflow-hidden"
              >
                {/* --- FILA SUPERIOR --- */}
                <div className="flex justify-between items-start border-b-2 border-[#e2e4e9] pb-4 relative">
                  <div className="flex gap-4 xl:gap-6 items-start">
                    <div className="flex flex-col">
                      <div className="w-[60px] xl:w-[70px] h-[30px] border-2 border-[#e2e4e9] bg-[repeating-linear-gradient(45deg,transparent,transparent_4px,#f3f4f6_4px,#f3f4f6_8px)] mb-1 rounded-sm"></div>
                      {renderStand("Q-7", "w-[60px] xl:w-[70px] h-[52px]")}
                    </div>
                    <div className="flex gap-3 xl:gap-4">
                      {renderStand("Q-6", "w-[85px] xl:w-[90px] h-[75px]")}
                      {renderStand("Q-5", "w-[85px] xl:w-[90px] h-[75px]")}
                      {renderStand("Q-4", "w-[85px] xl:w-[90px] h-[75px]")}
                    </div>
                  </div>

                  <div className="absolute top-[-15px] left-1/2 -translate-x-1/2 text-[10px] font-bold text-[#a0a5b1] tracking-widest bg-white px-3 ">
                    SALIDA EMERGENCIA
                  </div>

                  <div className="flex gap-3 items-end h-[75px] pt-4">
                    {renderStand("Q-3", "w-[50px] xl:w-[55px] h-[62px]")}
                    {renderStand("Q-2", "w-[75px] xl:w-[80px] h-[75px]")}
                    {renderStand("Q-1", "w-[75px] xl:w-[80px] h-[75px]")}
                  </div>

                  <div className="flex flex-col gap-2 border-l-2 border-[#e2e4e9] pl-4 xl:pl-6">
                    <div className="w-[140px] xl:w-[170px] h-[45px] border-2 border-[#e2e4e9] flex items-center justify-center font-bold tracking-widest text-xs text-[#a0a5b1] rounded-md">COCINA AUXILIAR</div>
                    <div className="flex gap-2">
                      <div className="w-[65px] xl:w-[80px] h-[60px] border-2 border-[#e2e4e9] flex items-center justify-center text-[10px] font-bold text-center text-[#a0a5b1] rounded-md">BAÑOS</div>
                      <div className="w-[65px] xl:w-[80px] h-[60px] border-2 border-[#e2e4e9] flex items-center justify-center text-[10px] font-bold text-center text-[#a0a5b1] rounded-md">BAÑOS</div>
                    </div>
                  </div>
                </div>

                {/* --- ZONA CENTRAL --- */}
                <div className="flex justify-between py-8 xl:py-10 relative">
                  {/* Tarima */}
                  <div className="flex flex-col justify-center items-center gap-6 w-[90px] xl:w-[100px] relative">
                    <div className="grid grid-cols-6 gap-1">
                      {Array(18).fill(0).map((_,i) => <div key={i} className="w-2.5 h-2 border border-[#cbd0d9] rounded-[2px]"></div>)}
                    </div>
                    <div className="w-[75px] xl:w-[80px] h-[120px] border-2 border-[#cbd0d9] flex items-center justify-center relative rounded-lg">
                      <span className="font-bold tracking-widest text-xs text-[#a0a5b1] -rotate-90 block">TARIMA</span>
                    </div>
                    <div className="grid grid-cols-6 gap-1">
                      {Array(18).fill(0).map((_,i) => <div key={`b${i}`} className="w-2.5 h-2 border border-[#cbd0d9] rounded-[2px]"></div>)}
                    </div>
                  </div>

                  {/* Islas Centrales */}
                  <div className="flex-1 flex flex-col justify-center gap-10 xl:gap-12 px-4 xl:px-6">
                    {/* Isla Superior */}
                    <div className="flex justify-center w-full gap-1.5">
                      {renderStand("P-03", "w-[68px] xl:w-[72px] h-[140px]")}
                      <div className="flex flex-col gap-1">
                        <div className="flex gap-1">
                          {renderStand("Q-8", "w-[68px] xl:w-[72px] h-[60px]")}
                          {renderStand("Q-9", "w-[68px] xl:w-[72px] h-[60px]")}
                          {renderStand("Q-10", "w-[68px] xl:w-[72px] h-[60px]")}
                          {renderStand("Q-11", "w-[68px] xl:w-[72px] h-[60px]")}
                        </div>
                        <div className="flex gap-1">
                          {renderStand("Q-13", "w-[68px] xl:w-[72px] h-[76px]")}
                          {renderStand("P-02", "w-[136px] xl:w-[144px] h-[76px]")}
                          {renderStand("Q-12", "w-[68px] xl:w-[72px] h-[76px]")}
                        </div>
                      </div>
                      {renderStand("P-01", "w-[68px] xl:w-[72px] h-[140px]")}
                    </div>

                    {/* Isla Inferior */}
                    <div className="flex justify-center w-full gap-1.5">
                      {renderStand("P-04", "w-[68px] xl:w-[72px] h-[140px]")}
                      <div className="flex flex-col gap-1">
                        <div className="flex gap-1">
                          {renderStand("Q-14", "w-[68px] xl:w-[72px] h-[76px]")}
                          {renderStand("P-05", "w-[136px] xl:w-[144px] h-[76px]")}
                          {renderStand("Q-15", "w-[68px] xl:w-[72px] h-[76px]")}
                        </div>
                        <div className="flex gap-1">
                          {renderStand("Q-16", "w-[68px] xl:w-[72px] h-[60px]")}
                          {renderStand("Q-17", "w-[68px] xl:w-[72px] h-[60px]")}
                          {renderStand("Q-18", "w-[68px] xl:w-[72px] h-[60px]")}
                          {renderStand("Q-19", "w-[68px] xl:w-[72px] h-[60px]")}
                        </div>
                      </div>
                      {renderStand("P-06", "w-[68px] xl:w-[72px] h-[140px]")}
                    </div>
                  </div>

                  {/* Entrada y Accesos Derecho */}
                  <div className="w-[140px] xl:w-[170px] flex flex-col items-center justify-between border-l-2 border-[#e2e4e9] pl-4 relative">
                    <div className="flex items-center gap-2 mt-8">
                      <div className="w-12 xl:w-16 h-1 bg-black relative">
                         <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 border-l-[3px] border-b-[3px] border-black rotate-45"></div>
                      </div>
                      <div className="font-bold tracking-widest text-xs text-[#868e9e]">ENTRADA</div>
                    </div>
                    
                    <div className="flex gap-2 items-end mb-4 pl-2 xl:pl-4">
                      {renderStand("P-07", "w-[58px] xl:w-[65px] h-[90px]")}
                      <div className="flex flex-col gap-2 pl-3 xl:pl-4">
                        {renderStand("P-08", "w-[58px] xl:w-[65px] h-[90px]")}
                        {renderStand("P-09", "w-[58px] xl:w-[65px] h-[90px]")}
                      </div>
                    </div>
                  </div>
                </div>

                {/* --- FILA INFERIOR --- */}
                <div className="flex justify-between items-end border-t-2 border-[#e2e4e9] pt-6 relative">
                  <div className="flex gap-4 xl:gap-6 items-end">
                    <div className="flex flex-col">
                      {renderStand("Q-20", "w-[60px] xl:w-[70px] h-[52px]")}
                      <div className="w-[60px] xl:w-[70px] h-[30px] border-2 border-[#e2e4e9] bg-[repeating-linear-gradient(45deg,transparent,transparent_4px,#f3f4f6_4px,#f3f4f6_8px)] mt-1 rounded-sm"></div>
                    </div>
                    
                    <div className="flex gap-3 xl:gap-4">
                      {renderStand("Q-21", "w-[85px] xl:w-[90px] h-[75px]")}
                      {renderStand("Q-22", "w-[85px] xl:w-[90px] h-[75px]")}
                      {renderStand("Q-23", "w-[85px] xl:w-[90px] h-[75px]")}
                      {renderStand("Q-24", "w-[85px] xl:w-[90px] h-[75px]")}
                    </div>
                  </div>

                  <div className="flex gap-2 xl:gap-3 pb-2">
                    {renderStand("Q-25", "w-[58px] xl:w-[65px] h-[65px]")}
                    {renderStand("Q-26", "w-[58px] xl:w-[65px] h-[65px]")}
                  </div>

                  <div className="w-[140px] xl:w-[170px] text-center text-xs font-bold tracking-widest text-[#a0a5b1] pb-2">
                    SALIDA<br/>PISCINA
                  </div>
                  
                  <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-white px-4 text-xs font-bold tracking-widest text-[#a0a5b1]">
                    SALIDA EMERGENCIA
                  </div>
                </div>
              </motion.div>
            )}

            {/* === MAPA 2: PLANO EXTERIOR (SCROLL EN MÓVIL, AJUSTADO EN LAPTOP) === */}
            {activeTab === "exterior" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.985, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
                className="min-w-[1250px] xl:min-w-0 xl:w-full w-full h-[550px] bg-[#e5e5e5] relative font-sans select-none shadow-inner rounded-lg overflow-hidden border-2 border-gray-300"
              >
                {/* LÍNEA PUNTEADA AMARILLA (Bordes) */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                  <line x1="0" y1="30" x2="1250" y2="30" stroke="yellow" strokeWidth="3" strokeDasharray="10,10" />
                  <path d="M 1200 30 C 1200 400, 1050 500, 750 500" fill="none" stroke="yellow" strokeWidth="3" strokeDasharray="10,10" />
                </svg>

                {/* ========================================== */}
                {/* 1. BLOQUE G14 (6 Columnas x 2 Filas) */}
                {/* ========================================== */}
                <div className="absolute top-[40px] left-[20px] z-10 flex flex-col items-center bg-[#eaeaea] border-[2px] border-[#00ff00] p-1.5 shadow-sm rounded-md">
                  <div className="grid grid-cols-6 gap-1">
                    {renderStand("G-14", "w-[38px] h-[45px]")}
                    {renderStand("G-13", "w-[38px] h-[45px]")}
                    {renderStand("G-12", "w-[38px] h-[45px]")}
                    {renderStand("G-11", "w-[38px] h-[45px]")}
                    {renderStand("G-10", "w-[38px] h-[45px]")}
                    {renderStand("G-9",  "w-[38px] h-[45px]")}
                  </div>
                  <div className="text-[10px] font-bold text-gray-800 bg-[#d4d4d4] w-full text-center py-1 my-1 tracking-widest border border-gray-300 rounded-sm">
                    EXPOSITORES 2X3
                  </div>
                  <div className="grid grid-cols-6 gap-1">
                    {renderStand("G-15", "w-[38px] h-[45px]")}
                    {renderStand("G-16", "w-[38px] h-[45px]")}
                    {renderStand("G-17", "w-[38px] h-[45px]")}
                    {renderStand("G-18", "w-[38px] h-[45px]")}
                    {renderStand("G-19", "w-[38px] h-[45px]")}
                    {renderStand("G-20", "w-[38px] h-[45px]")}
                  </div>
                  <div className="absolute -bottom-[20px] text-[11px] font-bold text-gray-700">TOLDO 12x8</div>
                </div>

                {/* ========================================== */}
                {/* 2. TOLDO 5X5 (Izquierda) */}
                {/* ========================================== */}
                <div className="absolute top-[80px] left-[300px] z-10 rotate-[-15deg] w-[65px] h-[85px] bg-[#eaeaea] border-[2px] border-[#00ff00] flex items-center justify-center shadow-sm rounded-md">
                  <span className="rotate-[-90deg] text-[10px] font-bold text-gray-700 whitespace-nowrap">TOLDO 5 x5</span>
                </div>

                {/* ========================================== */}
                {/* 3. ZONA GANADO (2 Bloques Juntos) */}
                {/* ========================================== */}
                <div className="absolute top-[40px] left-[380px] z-10 flex gap-0">
                  {/* Ganado Izquierdo */}
                  <div className="bg-[#eaeaea] border-[2px] border-[#00ff00] p-1 flex flex-col items-center w-[150px] rounded-l-md">
                    <div className="text-[11px] font-bold text-gray-800 border-b-2 border-[#00ff00] w-full text-center pb-1 mb-1 tracking-widest">GANADO</div>
                    <div className="grid grid-cols-5 w-full h-[60px]">
                      {Array(10).fill(0).map((_,i) => (
                        <div key={i} className="border border-yellow-400 bg-yellow-50/40"></div>
                      ))}
                    </div>
                  </div>
                  {/* Ganado Derecho */}
                  <div className="bg-[#eaeaea] border-[2px] border-[#00ff00] border-l-0 p-1 flex flex-col items-center w-[150px] relative rounded-r-md">
                    <div className="text-[11px] font-bold text-gray-800 border-b-2 border-[#00ff00] w-full text-center pb-1 mb-1 tracking-widest">GANADO</div>
                    <div className="grid grid-cols-5 w-full h-[60px]">
                      {Array(10).fill(0).map((_,i) => (
                        <div key={i} className="border border-yellow-400 bg-yellow-50/40"></div>
                      ))}
                    </div>
                    {/* Textos inferiores del Ganado */}
                    <div className="absolute top-full left-0 flex mt-1 gap-2">
                      <div className="border-[2px] border-[#00ff00] bg-[#eaeaea] p-1 text-[8px] font-bold text-gray-700 text-center leading-tight rounded-sm">
                        SERVICIO<br/>GANADO<br/><span className="font-normal mt-1 block">TOLDO 4X4</span>
                      </div>
                      <div className="text-[10px] font-bold text-gray-700 mt-1">TOLDO 12x8</div>
                    </div>
                  </div>
                </div>

                {/* ========================================== */}
                {/* 4. TOLDO 5X5 (Centro) */}
                {/* ========================================== */}
                <div className="absolute top-[60px] left-[690px] z-10 w-[70px] h-[70px] bg-[#eaeaea] border-[2px] border-[#00ff00] flex items-center justify-center shadow-sm rounded-md">
                  <span className="rotate-[-45deg] text-[10px] font-bold text-gray-700 whitespace-nowrap">TOLDO 5X5</span>
                </div>

                {/* ========================================== */}
                {/* 5. BLOQUE G4 (4 Columnas x 2 Filas) */}
                {/* ========================================== */}
                <div className="absolute top-[40px] left-[770px] z-10 flex flex-col items-center bg-[#eaeaea] border-[2px] border-[#00ff00] p-1.5 shadow-sm rounded-md">
                  <div className="grid grid-cols-4 gap-1">
                    {renderStand("G-4", "w-[42px] h-[45px]")}
                    {renderStand("G-3", "w-[42px] h-[45px]")}
                    {renderStand("G-2", "w-[42px] h-[45px]")}
                    {renderStand("G-1", "w-[42px] h-[45px]")}
                  </div>
                  <div className="text-[10px] font-bold text-gray-800 bg-[#d4d4d4] w-full text-center py-1 my-1 tracking-widest border border-gray-300 rounded-sm">
                    EXPOSITORES 3X3
                  </div>
                  <div className="grid grid-cols-4 gap-1">
                    {renderStand("G-5", "w-[42px] h-[45px]")}
                    {renderStand("G-6", "w-[42px] h-[45px]")}
                    {renderStand("G-7", "w-[42px] h-[45px]")}
                    {renderStand("G-8", "w-[42px] h-[45px]")}
                  </div>
                  <div className="absolute -bottom-[20px] text-[11px] font-bold text-gray-700">TOLDO 12x8</div>
                </div>

                {/* ========================================== */}
                {/* 6. TOLDO 5X5 (Derecha) */}
                {/* ========================================== */}
                <div className="absolute top-[65px] left-[965px] z-10 w-[70px] h-[70px] bg-[#eaeaea] border-[2px] border-[#00ff00] flex items-center justify-center shadow-sm rounded-md">
                  <span className="rotate-[-45deg] text-[10px] font-bold text-gray-700 whitespace-nowrap">TOLDO 5X5</span>
                </div>

                {/* ========================================== */}
                {/* 7. ZONA GANADO (Derecha Extrema) */}
                {/* ========================================== */}
                <div className="absolute top-[40px] left-[1045px] z-10 flex gap-2">
                  <div className="bg-[#eaeaea] border-[2px] border-[#00ff00] p-1 flex flex-col items-center w-[150px] rounded-md">
                    <div className="text-[11px] font-bold text-gray-800 border-b-2 border-[#00ff00] w-full text-center pb-1 mb-1 tracking-widest">GANADO</div>
                    <div className="grid grid-cols-5 w-full h-[60px]">
                      {Array(10).fill(0).map((_,i) => (
                        <div key={i} className="border border-yellow-400 bg-yellow-50/40"></div>
                      ))}
                    </div>
                    <div className="absolute -bottom-[20px] text-[11px] font-bold text-gray-700">TOLDO 12x8</div>
                  </div>
                  <div className="border-[2px] border-[#00ff00] bg-[#eaeaea] p-1 text-[8px] font-bold text-gray-700 text-center leading-tight flex flex-col justify-center mt-6 h-fit rounded-sm">
                    SERVICIO<br/>GANADO<br/><span className="font-normal mt-1 block text-[7px]">TOLDO 4X4</span>
                  </div>
                </div>

                {/* ========================================== */}
                {/* 8. BLOQUE G21 (Vertical: 2 Columnas x 6 Filas) */}
                {/* ========================================== */}
                <div className="absolute top-[170px] left-[200px] z-10 flex items-center bg-[#eaeaea] border-[2px] border-[#00ff00] p-1.5 shadow-sm rounded-md">
                  <div className="absolute -left-[20px] top-1/2 -translate-y-1/2 rotate-[-90deg] text-[11px] font-bold text-gray-700 whitespace-nowrap">
                    TOLDO 12x8
                  </div>
                  <div className="grid grid-cols-1 gap-1">
                    {renderStand("G-27", "w-[45px] h-[35px]")}
                    {renderStand("G-28", "w-[45px] h-[35px]")}
                    {renderStand("G-29", "w-[45px] h-[35px]")}
                    {renderStand("G-30", "w-[45px] h-[35px]")}
                    {renderStand("G-31", "w-[45px] h-[35px]")}
                    {renderStand("G-32", "w-[45px] h-[35px]")}
                  </div>
                  <div className="h-[230px] flex items-center justify-center bg-[#d4d4d4] mx-1 border border-gray-300 w-[24px] rounded-sm">
                    <span className="rotate-[90deg] text-[10px] font-bold text-gray-800 tracking-widest whitespace-nowrap">
                      EXPOSITORES 2X3
                    </span>
                  </div>
                  <div className="grid grid-cols-1 gap-1">
                    {renderStand("G-21", "w-[45px] h-[35px]")}
                    {renderStand("G-22", "w-[45px] h-[35px]")}
                    {renderStand("G-23", "w-[45px] h-[35px]")}
                    {renderStand("G-24", "w-[45px] h-[35px]")}
                    {renderStand("G-25", "w-[45px] h-[35px]")}
                    {renderStand("G-26", "w-[45px] h-[35px]")}
                  </div>
                </div>

                {/* ========================================== */}
                {/* DECORACIONES (Patrocinios, Pantalla, Queso) */}
                {/* ========================================== */}
                
                {/* Patrocinios Rojos (Izquierda) */}
                <div className="absolute top-[260px] left-[50px] rotate-[15deg] flex flex-col gap-1.5 z-10">
                  {Array(5).fill(0).map((_,i) => <div key={i} className="w-[18px] h-[30px] border-[2px] border-red-500 bg-[#e5e5e5] rounded-[2px]"></div>)}
                  <span className="rotate-90 text-[10px] font-bold text-gray-800 absolute right-[-35px] top-[60px]">PATROCINIO</span>
                </div>
                <div className="absolute top-[430px] left-[20px] rotate-[10deg] flex gap-1.5 z-10">
                  {Array(3).fill(0).map((_,i) => <div key={i} className="w-[30px] h-[18px] border-[2px] border-red-500 bg-[#e5e5e5] rounded-[2px]"></div>)}
                </div>
                <div className="absolute top-[350px] left-[350px] flex gap-1.5 z-10">
                  {Array(4).fill(0).map((_,i) => <div key={i} className="w-[30px] h-[18px] border-[2px] border-red-500 bg-[#e5e5e5] rounded-[2px]"></div>)}
                </div>

                {/* Patrocinios Centrales (Oficial 10 & 11) */}
                <div className="absolute top-[280px] left-[660px] rotate-[15deg] flex flex-col gap-2 z-10">
                   <div className="flex gap-2">
                      <div className="w-[70px] h-[100px] border-[2px] border-[#00ff00] bg-[#eaeaea] flex items-center justify-center text-center shadow-sm rounded-md">
                        <span className="rotate-[-25deg] text-[10px] font-bold text-gray-800">PATROCINIO<br/>OFICIAL 10</span>
                      </div>
                      <div className="w-[70px] h-[100px] border-[2px] border-[#00ff00] bg-[#eaeaea] flex items-center justify-center text-center shadow-sm rounded-md">
                        <span className="rotate-[-25deg] text-[10px] font-bold text-gray-800">PATROCINIO<br/>OFICIAL 11</span>
                      </div>
                   </div>
                   <div className="flex items-center gap-2 mt-2">
                     <span className="text-[10px] font-bold text-gray-700">TOLDO 5X5</span>
                     <span className="text-[10px] font-bold text-gray-700 ml-4">TOLDO 5X5</span>
                   </div>
                </div>
                <div className="absolute top-[280px] left-[700px] rotate-[15deg] z-0">
                   {/* La escalera de stands vacíos verdes */}
                   <div className="flex flex-col gap-0 border-l-[2px] border-r-[2px] border-[#00ff00] rounded-sm">
                      {Array(7).fill(0).map((_,i) => <div key={i} className="w-[35px] h-[35px] border-b-[2px] border-[#00ff00] bg-[#eaeaea]"></div>)}
                   </div>
                   <span className="text-[10px] font-bold text-gray-700 absolute -right-[80px] bottom-0 whitespace-nowrap">TOLDOS 3x3 (7)</span>
                </div>

                {/* Pantalla, Queso y Patrocinios Derechos */}
                <div className="absolute top-[180px] left-[930px] rotate-[20deg] z-10">
                  <div className="border-[2px] border-red-500 bg-[#eaeaea] text-[11px] font-bold text-gray-800 py-4 px-2 tracking-[0.3em] shadow-sm rounded-md">
                    P<br/>A<br/>N<br/>T<br/>A<br/>L<br/>L<br/>A
                  </div>
                </div>

                <div className="absolute top-[240px] left-[1010px] rotate-[15deg] z-10 flex flex-col items-center">
                  <div className="w-[110px] h-[160px] border-[2px] border-[#00ff00] bg-[#eaeaea] flex items-center justify-center shadow-sm rounded-lg">
                    <span className="rotate-[75deg] text-[14px] font-bold text-gray-800 tracking-widest">QUESO</span>
                  </div>
                  <span className="text-[11px] font-bold text-gray-700 mt-2 rotate-[75deg] absolute -right-[40px] top-1/2">TOLDO 10 X 5</span>
                </div>

                <div className="absolute top-[350px] left-[960px] rotate-[15deg] flex flex-col gap-1.5 z-10">
                  {Array(4).fill(0).map((_,i) => <div key={i} className="w-[20px] h-[35px] border-[2px] border-red-500 bg-[#e5e5e5] rounded-[2px]"></div>)}
                  <span className="rotate-90 text-[10px] font-bold text-gray-800 absolute right-[-40px] top-[60px]">PATROCINIO</span>
                </div>

              </motion.div>
            )}

          </div>
        </div>

        {/* COLUMNA DERECHA: PANEL DE SELECCIÓN DE STANDS */}
        <div className="xl:col-span-1 xl:sticky xl:top-24 h-fit">
          <div className="bg-white rounded-[2rem] shadow-2xl border border-aprolac-green/20 p-6 flex flex-col h-[600px] xl:h-[calc(100vh-150px)] min-h-[600px]">
            
            <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-4 flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="bg-aprolac-green/10 p-2 rounded-xl">
                  <ShoppingCart className="w-5 h-5 text-aprolac-green" />
                </div>
                <h3 className="text-xl font-display font-bold text-aprolac-dark">Stands</h3>
              </div>
              
              {cartItems.length > 0 && (
                <button 
                  onClick={clearCart}
                  className="flex items-center gap-1 text-xs cursor-pointer text-red-500 hover:text-red-700 font-bold uppercase tracking-wider transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Limpiar
                </button>
              )}
            </div>

            <div className="flex-grow overflow-y-auto pr-2 custom-scrollbar">
              <AnimatePresence mode="popLayout">
                {cartItems.length === 0 ? (
                  <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="h-full flex flex-col items-center justify-center text-center text-gray-400 gap-4"
                  >
                    <div className="p-4 border-2 border-dashed border-gray-200 rounded-full">
                      <ShoppingCart className="w-8 h-8 opacity-40" />
                    </div>
                    <p className="font-sans text-sm">Tu lista está vacía.<br/>Selecciona stands en el plano.</p>
                  </motion.div>
                ) : (
                  <div className="space-y-3">
                    {cartItems.map((item) => (
                      <motion.div
                        layout
                        initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                        key={item.id}
                        className="flex justify-between items-center bg-gray-50 p-3 rounded-xl border border-gray-100 group"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-bold text-aprolac-dark text-sm">{item.name}</p>
                            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-aprolac-green/10 text-aprolac-green border border-aprolac-green/20">
                              {item.mapLabel}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 mt-0.5">{item.size}</p>
                        </div>
                        <button 
                          onClick={() => toggleStand(item.id, item.status)}
                          className="text-[10px] text-red-400 cursor-pointer hover:text-red-600 uppercase tracking-wider font-bold"
                        >
                          Quitar
                        </button>
                      </motion.div>
                    ))}
                  </div>
                )}
              </AnimatePresence>
            </div>

            <div className="pt-4 mt-4 border-t border-gray-100 flex-shrink-0">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-500 text-sm font-medium">Stands Seleccionados</span>
                <span className="text-2xl font-display font-bold text-aprolac-dark">{cartItems.length}</span>
              </div>

              <button
                disabled={cartItems.length === 0}
                onClick={handleWhatsAppRedirect}
                className={`w-full py-4 rounded-xl font-bold flex justify-center items-center gap-2 transition-all duration-300
                  ${cartItems.length === 0 
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
                    : "bg-[#25D366] text-white hover:bg-[#1ebe57] cursor-pointer hover:shadow-lg hover:-translate-y-1"
                  }`}
              >
                <Send className="w-5 h-5" />
                Consultar Vía WhatsApp
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}