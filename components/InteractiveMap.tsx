"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Check, Lock, Send, Info, Trash2, ArrowLeft } from "lucide-react";
import Link from "next/link";

// 1. CONTROL MANUAL DE ESTADOS
const ESTADOS_MANUALES: Record<string, string> = {
   //"S24": "ocupado",
};

// 2. BASE DE DATOS EXACTA DEL NUEVO PLANO (Captura de pantalla 2026-06-08 090131.png)
const STANDS_DATA = [
  // --- PEQUEÑOS (Naranjas) ---
  { id: "A1", size: "3 M2", price: 350, color: "bg-[#ed7d31]" },
  { id: "A2", size: "4 M2", price: 450, color: "bg-[#ed7d31]" },
  { id: "A3", size: "4 M2", price: 450, color: "bg-[#ed7d31]" },
  { id: "A4", size: "4 M2", price: 450, color: "bg-[#ed7d31]" },
  { id: "A5", size: "4 M2", price: 450, color: "bg-[#ed7d31]" },
  { id: "A6", size: "4 M2", price: 450, color: "bg-[#ed7d31]" },
  { id: "S36", size: "4.50 M2", price: 500, color: "bg-[#ed7d31]" },
  { id: "S8", size: "4.50 M2", price: 500, color: "bg-[#ed7d31]" },
  { id: "S32", size: "4.87 M2", price: 550, color: "bg-[#ed7d31]" },
  { id: "S2", size: "5 M2", price: 600, color: "bg-[#ed7d31]" },

  // --- MEDIANOS (Verdes) ---
  { id: "S26", size: "6 M2", price: 700, color: "bg-[#548235]" },
  { id: "S27", size: "6 M2", price: 700, color: "bg-[#548235]" },
  { id: "S28", size: "6 M2", price: 700, color: "bg-[#548235]" },
  { id: "S29", size: "6 M2", price: 700, color: "bg-[#548235]" },
  { id: "S14", size: "6 M2", price: 700, color: "bg-[#548235]" },
  { id: "S13", size: "6 M2", price: 700, color: "bg-[#548235]" },
  { id: "S12", size: "6 M2", price: 700, color: "bg-[#548235]" },
  { id: "S11", size: "6 M2", price: 700, color: "bg-[#548235]" },
  { id: "S1", size: "6.25 M2", price: 750, color: "bg-[#548235]" },
  { id: "S31", size: "7.50 M2", price: 850, color: "bg-[#548235]" },
  { id: "S30", size: "7.50 M2", price: 850, color: "bg-[#548235]" },

  // --- GRANDES (Azules) ---
  { id: "S24", size: "9 M2", price: 1000, color: "bg-[#5b9bd5]" },
  { id: "S23", size: "9 M2", price: 1000, color: "bg-[#5b9bd5]" },
  { id: "S22", size: "9 M2", price: 1000, color: "bg-[#5b9bd5]" },
  { id: "S21", size: "9 M2", price: 1000, color: "bg-[#5b9bd5]" },
  { id: "S16", size: "9 M2", price: 1000, color: "bg-[#5b9bd5]" },
  { id: "S17", size: "9 M2", price: 1000, color: "bg-[#5b9bd5]" },
  { id: "S18", size: "9 M2", price: 1000, color: "bg-[#5b9bd5]" },
  { id: "S19", size: "9 M2", price: 1000, color: "bg-[#5b9bd5]" },
  { id: "S35", size: "10.50 M2", price: 1200, color: "bg-[#5b9bd5]" },
  { id: "S34", size: "10.50 M2", price: 1200, color: "bg-[#5b9bd5]" },
  { id: "S33", size: "10.50 M2", price: 1200, color: "bg-[#5b9bd5]" },
  { id: "S7", size: "10.50 M2", price: 1200, color: "bg-[#5b9bd5]" },
  { id: "S6", size: "10.50 M2", price: 1200, color: "bg-[#5b9bd5]" },
  { id: "S5", size: "10.50 M2", price: 1200, color: "bg-[#5b9bd5]" },
  { id: "S4", size: "10.50 M2", price: 1200, color: "bg-[#5b9bd5]" },

  // --- VIP (Morados) ---
  { id: "S25", size: "12.50 M2", price: 1500, color: "bg-[#7030a0]" },
  { id: "S20", size: "12.50 M2", price: 1500, color: "bg-[#7030a0]" },
  { id: "S15", size: "12.50 M2", price: 1500, color: "bg-[#7030a0]" },
  { id: "S10", size: "12.50 M2", price: 1500, color: "bg-[#7030a0]" },
].map(stand => ({ ...stand, status: ESTADOS_MANUALES[stand.id] || "disponible" }));

export default function InteractiveFloorPlan() {
  const [selectedStands, setSelectedStands] = useState<string[]>([]);

  const toggleStand = (id: string, status: string) => {
    if (status === "ocupado") return;
    setSelectedStands((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const clearCart = () => setSelectedStands([]);
  const cartItems = STANDS_DATA.filter((stand) => selectedStands.includes(stand.id));
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

  const handleWhatsAppRedirect = () => {
    const phoneNumber = "584148469666";
    let message = `Hola, estoy interesado en reservar los siguientes stands en la Expo:\n`;
    cartItems.forEach((item) => {
      message += `\n- Stand ${item.id} (${item.size}): $${item.price}`;
    });
    message += `\n\nTotal estimado: $${totalPrice}\n\nPor favor, me indican los pasos a seguir.`;
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
        // 1. LA SOLUCIÓN: Controlamos el zIndex y el scale exclusivamente con Framer Motion.
        // Si está seleccionado, le forzamos un zIndex altísimo (50) para que nadie lo tape.
        animate={{ 
          scale: isSelected ? 1.05 : 1, 
          zIndex: isSelected ? 50 : 10 
        }}
        whileHover={!isOccupied && !isSelected ? { scale: 1.05, zIndex: 40 } : {}}
        whileTap={!isOccupied ? { scale: 0.95 } : {}}
        onClick={() => toggleStand(stand.id, stand.status)}
        // 2. Quitamos "transition-all" y el "scale-105" de Tailwind para que no peleen con la animación de arriba.
        className={`relative flex flex-col items-center justify-center rounded-sm border-2 shadow-sm cursor-pointer overflow-hidden ${customStyles}
          ${isOccupied 
            ? "bg-gray-200 border-gray-300 cursor-not-allowed text-gray-400" 
            : `${stand.color} border-white/20 text-white hover:shadow-lg hover:border-white`
          }
          ${isSelected ? "!border-black ring-2 ring-black shadow-xl" : ""}
        `}
      >
        {isOccupied ? (
          <Lock className="w-4 h-4" />
        ) : (
          <>
            <span className="font-bold text-[10px] md:text-xs lg:text-sm tracking-tight leading-none">{stand.id}</span>
            <span className="text-[7px] md:text-[9px] opacity-90 mt-0.5 leading-none px-0.5 text-center">{stand.size}</span>
            {isSelected && (
              <div className="absolute top-0.5 right-0.5 bg-black text-white rounded-full p-0.5 shadow-md">
                <Check className="w-2.5 h-2.5" />
              </div>
            )}
          </>
        )}
      </motion.button>
    );
  };

  return (
    <section className="py-12 md:py-24 bg-aprolac-cream relative">
      <div className="max-w-[1600px] mx-auto px-4 md:px-6 grid grid-cols-1 xl:grid-cols-4 gap-8 items-start">
        
        {/* COLUMNA IZQUIERDA: PLANO */}
        <div className="xl:col-span-3 bg-white p-4 md:p-6 rounded-[2rem] shadow-xl border border-aprolac-border/50 overflow-hidden flex flex-col">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
            <div>
              <Link href="/" className="inline-flex items-center gap-2 text-aprolac-green hover:text-aprolac-dark font-bold mb-4 transition-colors font-sans text-sm tracking-wide">
                <ArrowLeft className="w-4 h-4" /> Volver al Inicio
              </Link>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-aprolac-dark mb-1">Plano Interactivo</h2>
              <p className="text-gray-500 text-sm flex items-center gap-2">
                <Info className="w-4 h-4 text-aprolac-green" /> Selecciona tus stands en el mapa.
              </p>
            </div>
            {/* Leyenda de Colores */}
            <div className="flex flex-wrap gap-3 text-xs font-sans font-medium text-gray-600 bg-gray-50 px-4 py-3 rounded-xl border border-gray-100">
              <span className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-[#ed7d31]"></div> Pequeños</span>
              <span className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-[#548235]"></div> Medianos</span>
              <span className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-[#5b9bd5]"></div> Grandes</span>
              <span className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-[#7030a0]"></div> VIP</span>
            </div>
          </div>

          {/* CONTENEDOR DEL MAPA (SOLUCIÓN RESPONSIVE) */}
          {/* Se eliminó el "flex justify-center" que causaba el recorte en móvil. Se añadió pb-4 para dar espacio a la barra de scroll nativa. */}
          <div className="w-full overflow-x-auto custom-scrollbar pb-4">
            {/* Se mantiene el tamaño original rígido. Se añadió "mx-auto" para que se centre solo si hay espacio sobrante (Desktop). */}
            <div className="min-w-[1000px] w-full min-h-[720px] max-w-[1100px] mx-auto bg-white border-4 border-[#b4b8c5] p-6 relative flex flex-col font-sans select-none text-[#7d8597] shadow-sm rounded-lg">
              
              {/* --- FILA SUPERIOR --- */}
              <div className="flex justify-between items-start border-b-2 border-[#e2e4e9] pb-2 relative">
                
                {/* Stands Izquierda y Centro */}
                <div className="flex gap-4 items-start">
                  <div className="flex flex-col">
                    <div className="w-[80px] h-[18px] border-2 border-[#e2e4e9] bg-[repeating-linear-gradient(45deg,transparent,transparent_4px,#f3f4f6_4px,#f3f4f6_8px)] mb-1"></div>
                    {renderStand("S36", "w-[80px] h-[45px]")}
                  </div>
                  
                  <div className="flex gap-3 ml-2">
                    {renderStand("S35", "w-[100px] h-[65px]")}
                    {renderStand("S34", "w-[100px] h-[65px]")}
                    {renderStand("S33", "w-[100px] h-[65px]")}
                  </div>

                  <div className="flex gap-2 items-end ml-4">
                    {renderStand("S32", "w-[50px] h-[60px]")}
                    {renderStand("S31", "w-[75px] h-[75px]")}
                    {renderStand("S30", "w-[75px] h-[75px]")}
                  </div>
                </div>

                {/* Cocina y Baños */}
                <div className="flex flex-col gap-2 border-l-2 border-[#e2e4e9] pl-4">
                  <div className="w-[180px] h-[50px] border-2 border-[#e2e4e9] flex items-center justify-center font-bold tracking-widest text-sm text-[#a0a5b1]">COCINA</div>
                  <div className="flex gap-2">
                    <div className="w-[86px] h-[50px] border-2 border-[#e2e4e9] flex items-center justify-center text-[10px] font-bold text-center text-[#a0a5b1]">B.<br/>CABALLEROS</div>
                    <div className="w-[86px] h-[50px] border-2 border-[#e2e4e9] flex items-center justify-center text-[10px] font-bold text-center text-[#a0a5b1]">B. DAMAS</div>
                  </div>
                </div>

              </div>

              {/* --- ZONA CENTRAL --- */}
              <div className="flex justify-between py-10 relative">
                
                {/* Tarima Izquierda */}
                <div className="flex flex-col justify-center items-center gap-6 w-[100px] relative">
                  
                  {/* Sillas Arriba */}
                  <div className="grid grid-cols-6 gap-1">
                    {Array(24).fill(0).map((_,i) => <div key={i} className="w-3 h-2 border border-[#cbd0d9] rounded-[2px]"></div>)}
                  </div>
                  
                  <div className="w-full h-[100px] border-2 border-[#cbd0d9] flex items-center justify-center font-bold tracking-widest text-xs text-[#a0a5b1]">TARIMA</div>
                  
                  {/* Sillas Abajo */}
                  <div className="grid grid-cols-6 gap-1">
                    {Array(24).fill(0).map((_,i) => <div key={`b${i}`} className="w-3 h-2 border border-[#cbd0d9] rounded-[2px]"></div>)}
                  </div>
                </div>

                {/* Islas Centrales (El Corazón de la Expo) */}
                <div className="flex-1 flex flex-col justify-center gap-12 px-6 lg:px-6">
                  
                  {/* Isla Superior */}
                  <div className="flex justify-center w-full">
                    {renderStand("S25", "w-[60px] h-[130px]")}
                    <div className="flex flex-col">
                      <div className="flex">
                        {renderStand("S26", "w-[80px] h-[55px]")}
                        {renderStand("S27", "w-[80px] h-[55px]")}
                        {renderStand("S28", "w-[80px] h-[55px]")}
                        {renderStand("S29", "w-[80px] h-[55px]")}
                      </div>
                      <div className="flex">
                        {renderStand("S24", "w-[80px] h-[75px]")}
                        {renderStand("S23", "w-[80px] h-[75px]")}
                        {renderStand("S22", "w-[80px] h-[75px]")}
                        {renderStand("S21", "w-[80px] h-[75px]")}
                      </div>
                    </div>
                    {renderStand("S20", "w-[60px] h-[130px]")}
                  </div>

                  {/* Isla Inferior */}
                  <div className="flex justify-center w-full">
                    {renderStand("S15", "w-[60px] h-[130px]")}
                    <div className="flex flex-col">
                      <div className="flex">
                        {renderStand("S16", "w-[80px] h-[75px]")}
                        {renderStand("S17", "w-[80px] h-[75px]")}
                        {renderStand("S18", "w-[80px] h-[75px]")}
                        {renderStand("S19", "w-[80px] h-[75px]")}
                      </div>
                      <div className="flex">
                        {renderStand("S14", "w-[80px] h-[55px]")}
                        {renderStand("S13", "w-[80px] h-[55px]")}
                        {renderStand("S12", "w-[80px] h-[55px]")}
                        {renderStand("S11", "w-[80px] h-[55px]")}
                      </div>
                    </div>
                    {renderStand("S10", "w-[60px] h-[130px]")}
                  </div>

                </div>

                {/* Lobby y Accesos Derecho (Stands A) */}
                <div className="w-[180px] flex flex-col items-end border-l-2 border-[#e2e4e9] pl-2 relative">
                  <div className="text-xl font-bold pr-5 tracking-[0.3em] text-[#868e9e] mb-12">ACCESO</div>
                  
                  <div className="flex gap-2 items-end pt-10">
                    <div className="flex flex-col gap-2 pr-12">
                      {renderStand("A6", "w-[55px] h-[55px]")}
                      {renderStand("A5", "w-[55px] h-[55px]")}
                    </div>
                    <div className="flex flex-col gap-2">
                      {renderStand("A1", "w-[55px] h-[45px]")}
                      {renderStand("A2", "w-[55px] h-[55px]")}
                      {renderStand("A3", "w-[55px] h-[55px]")}
                      {renderStand("A4", "w-[55px] h-[55px]")}
                    </div>
                  </div>
                </div>

              </div>

              {/* --- FILA INFERIOR --- */}
              <div className="flex justify-between items-end border-t-2 border-[#e2e4e9] pt-6 relative">
                
                <div className="flex gap-4 items-end">
                  <div className="flex flex-col">
                    {renderStand("S8", "w-[80px] h-[45px]")}
                    <div className="w-[80px] h-[18px] border-2 border-[#e2e4e9] bg-[repeating-linear-gradient(45deg,transparent,transparent_4px,#f3f4f6_4px,#f3f4f6_8px)] mt-1"></div>
                  </div>
                  
                  <div className="flex gap-3 ml-2">
                    {renderStand("S7", "w-[100px] h-[65px]")}
                    {renderStand("S6", "w-[100px] h-[65px]")}
                    {renderStand("S5", "w-[100px] h-[65px]")}
                    {renderStand("S4", "w-[100px] h-[65px]")}
                  </div>

                  <div className="flex gap-2 ml-8">
                    {renderStand("S2", "w-[50px] h-[60px]")}
                    {renderStand("S1", "w-[70px] h-[60px]")}
                  </div>
                </div>

                <div className="w-[180px] text-center text-xs font-bold tracking-widest text-[#a0a5b1]">
                  SALIDA<br/>PISCINA
                </div>
                
                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-white px-4 text-xs font-bold tracking-widest text-[#a0a5b1]">
                  SALIDA EMERGENCIA
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* COLUMNA DERECHA: CARRITO DE COMPRAS */}
        <div className="xl:col-span-1 xl:sticky xl:top-24 h-fit">
          <div className="bg-white rounded-[2rem] shadow-2xl border border-aprolac-green/20 p-6 flex flex-col h-[600px] xl:h-[calc(100vh-150px)] min-h-[600px]">
            
            <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-4 flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="bg-aprolac-green/10 p-2 rounded-xl">
                  <ShoppingCart className="w-5 h-5 text-aprolac-green" />
                </div>
                <h3 className="text-xl font-display font-bold text-aprolac-dark">Cotización</h3>
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
                    <p className="font-sans text-sm">Tu carrito está vacío.<br/>Selecciona stands en el plano.</p>
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
                          <p className="font-bold text-aprolac-dark text-sm">Stand {item.id}</p>
                          <p className="text-xs text-gray-500">{item.size}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-aprolac-green text-sm">${item.price}</p>
                          <button 
                            onClick={() => toggleStand(item.id, item.status)}
                            className="text-[10px] text-red-400 cursor-pointer hover:text-red-600 uppercase tracking-wider font-bold"
                          >
                            Quitar
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </AnimatePresence>
            </div>

            <div className="pt-4 mt-4 border-t border-gray-100 flex-shrink-0">
              <div className="flex justify-between items-end mb-4">
                <span className="text-gray-500 text-sm font-medium">Total Estimado</span>
                <span className="text-3xl font-display font-bold text-aprolac-dark">${totalPrice}</span>
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
                Reservar Vía WhatsApp
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}