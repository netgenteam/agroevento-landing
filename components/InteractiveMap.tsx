"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Check, Lock, Send, Info, Trash2 } from "lucide-react";

// 1. BASE DE DATOS EXACTA: 44 Stands (Hoja 1) + 3 Stands (Hoja 2)
const STANDS_DATA = [
  // 3 m2 (Naranjas) - 4 junto a Tarima, 3 abajo
  ...Array.from({ length: 7 }).map((_, i) => ({ id: `O${i + 1}`, size: "3.0 m2", price: 600, status: "disponible", color: "bg-[#ed7d31]" })),
  // 3.75 m2 (Verdes Oscuros) - 1 izq, 2 der
  ...Array.from({ length: 3 }).map((_, i) => ({ id: `G${i + 1}`, size: "3.75 m2", price: 750, status: "disponible", color: "bg-[#548235]" })),
  // 4.0 m2 (Morados) - 14 en pasillos
  ...Array.from({ length: 14 }).map((_, i) => ({ id: `M${i + 1}`, size: "4.0 m2", price: 800, status: "disponible", color: "bg-[#7030a0]" })),
  // 5.0 m2 (Lila) - 1 en borde izquierdo (Encima de V1)
  { id: "P1", size: "5.0 m2", price: 1000, status: "disponible", color: "bg-[#b482d6]" },
  // 6.8 m2 (Amarillos) - 6 a los lados
  ...Array.from({ length: 6 }).map((_, i) => ({ id: `Y${i + 1}`, size: "6.8 m2", price: 1300, status: i === 4 ? "ocupado" : "disponible", color: "bg-[#ffc000]" })),
  // 7.5 m2 (Azules) - 10 en bloque central + 2 en esquinas superiores (12 en total)
  ...Array.from({ length: 12 }).map((_, i) => ({ id: `A${i + 1}`, size: "7.5 m2", price: 1500, status: i === 2 ? "ocupado" : "disponible", color: "bg-[#5b9bd5]" })),
  // 9.0 m2 (Verde Brillante) - 1 abajo izq (Debajo de P1)
  { id: "V1", size: "9.0 m2", price: 2000, status: "disponible", color: "bg-[#00b050]" },
  // 8.0 m2 (Grises) - 3 en Hoja 2 (Área Piscina)
  ...Array.from({ length: 3 }).map((_, i) => ({ id: `S${i + 1}`, size: "8.0 m2", price: 1800, status: "disponible", color: "bg-[#a6a6a6]" })),
];

export default function InteractiveFloorPlan() {
  const [selectedStands, setSelectedStands] = useState<string[]>([]);

  const toggleStand = (id: string, status: string) => {
    if (status === "ocupado") return;
    setSelectedStands((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const clearCart = () => {
    setSelectedStands([]);
  };

  const cartItems = STANDS_DATA.filter((stand) => selectedStands.includes(stand.id));
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

  const handleWhatsAppRedirect = () => {
    const phoneNumber = "584240000000"; // Tu número de ventas
    let message = `Hola, estoy muy interesado en reservar los siguientes stands en la Expo 2026:\n`;
    
    cartItems.forEach((item) => {
      message += `\n- Stand ${item.id} (${item.size}): $${item.price}`;
    });
    
    message += `\n\nTotal estimado: $${totalPrice}\n\nPor favor, me indican los pasos a seguir para concretar la reserva.`;
    
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, "_blank");
  };

  const renderStand = (id: string, customStyles: string = "w-full h-16") => {
    const stand = STANDS_DATA.find((s) => s.id === id);
    if (!stand) return null;

    const isSelected = selectedStands.includes(stand.id);
    const isOccupied = stand.status === "ocupado";

    return (
      <motion.button
        key={stand.id}
        whileHover={!isOccupied ? { scale: 1.05, zIndex: 10 } : {}}
        whileTap={!isOccupied ? { scale: 0.95 } : {}}
        onClick={() => toggleStand(stand.id, stand.status)}
        className={`relative flex flex-col items-center justify-center rounded-md border-2 transition-all shadow-sm cursor-pointer overflow-hidden ${customStyles}
          ${isOccupied ? "bg-gray-200 border-gray-300 cursor-not-allowed" : `${stand.color} border-white/50 text-white hover:shadow-lg hover:border-white`}
          ${isSelected ? "!border-black ring-2 ring-black scale-105 z-10 shadow-xl" : ""}
        `}
      >
        {isOccupied ? (
          <Lock className="w-4 h-4 text-gray-400" />
        ) : (
          <>
            <span className="font-bold text-sm tracking-tight">{stand.id}</span>
            <span className="text-[10px] opacity-90">{stand.size}</span>
            {isSelected && (
              <div className="absolute top-1 right-1 bg-black text-white rounded-full p-0.5">
                <Check className="w-2.5 h-2.5" />
              </div>
            )}
          </>
        )}
      </motion.button>
    );
  };

  return (
    <section className="py-24 bg-aprolac-cream relative">
      <div className="max-w-[1600px] mx-auto px-4 md:px-6 grid grid-cols-1 xl:grid-cols-4 gap-8 items-start">
        
        {/* COLUMNA IZQUIERDA: EL PLANO ARQUITECTÓNICO */}
        <div className="xl:col-span-3 bg-white p-6 rounded-[2rem] shadow-xl border border-aprolac-border/50 overflow-hidden">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-aprolac-dark mb-1">Plano Interactivo</h2>
              <p className="text-aprolac-text text-sm flex items-center gap-2">
                <Info className="w-4 h-4 text-aprolac-green" /> Selecciona tus stands directamente en el mapa.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 text-xs font-sans font-medium text-gray-600 bg-gray-50 px-4 py-2 rounded-xl">
              <span className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-[#5b9bd5]"></div> Disponible</span>
              <span className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-gray-200 border border-gray-300"></div> Ocupado</span>
              <span className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm border-2 border-black bg-white"></div> Tu Selección</span>
            </div>
          </div>

          <div className="w-full overflow-x-auto custom-scrollbar pb-6">
            <div className="min-w-[1000px] bg-[#f8f9fa] border border-gray-200 rounded-2xl p-8 relative flex flex-col">
              
              {/* === HOJA 1: ÁREA DE BANQUETE === */}
              {/* ZONA SUPERIOR */}
              <div className="flex justify-between items-start mb-8 w-full px-2">
                <div className="w-24">{renderStand("A11", "w-full h-24")}</div>
                
                <div className="flex items-start gap-4">
                  <div className="flex gap-2">
                    {renderStand("O1", "w-16 h-16")}
                    {renderStand("O2", "w-16 h-16")}
                  </div>
                  <div className="w-[350px] h-24 bg-white border-2 border-dashed border-gray-400 rounded-xl flex items-center justify-center shadow-inner">
                    <span className="font-display font-bold text-gray-400 tracking-[0.3em] text-xl">TARIMA</span>
                  </div>
                  <div className="flex gap-2">
                    {renderStand("O3", "w-16 h-16")}
                    {renderStand("O4", "w-16 h-16")}
                  </div>
                </div>

                <div className="w-24">{renderStand("A12", "w-full h-24")}</div>
              </div>

              {/* ZONA CENTRAL */}
              <div className="flex justify-between w-full px-2">
                
                {/* Columna 1 */}
                <div className="flex flex-col gap-2 w-24">
                  {renderStand("Y1", "w-full h-24")}
                  {renderStand("Y2", "w-full h-24")}
                  {renderStand("Y3", "w-full h-24")}
                  <div className="h-24 flex items-center justify-center border-l-2 border-gray-300">
                    <div className="-rotate-90 text-center">
                      <p className="text-[9px] text-gray-400 tracking-widest font-bold leading-tight whitespace-nowrap">SALIDA DE</p>
                      <p className="text-[9px] text-gray-400 tracking-widest font-bold leading-tight whitespace-nowrap">EMERGENCIA</p>
                    </div>
                  </div>
                </div>

                {/* Columna 2 */}
                <div className="flex flex-col gap-2 w-20 pt-10">
                  {["M1", "M2", "M3", "M4", "M5", "M6", "M7"].map((id) => renderStand(id, "w-full h-16"))}
                </div>

                {/* Pasillo Izquierdo */}
                <div className="w-12 flex items-center justify-center relative">
                  <span className="text-gray-400 text-xs tracking-[0.2em] -rotate-90 whitespace-nowrap absolute">PASILLO 2 M ANCHO</span>
                </div>

                {/* Columna 3 (Central) */}
                <div className="grid grid-cols-2 gap-2 w-64 pt-6">
                  {["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "A10"].map((id) => renderStand(id, "w-full h-20"))}
                </div>

                {/* Pasillo Derecho */}
                <div className="w-12 flex items-center justify-center relative">
                  <span className="text-gray-400 text-xs tracking-[0.2em] -rotate-90 whitespace-nowrap absolute">PASILLO 2 M ANCHO</span>
                </div>

                {/* Columna 4 */}
                <div className="flex flex-col gap-2 w-20 pt-10">
                  {["M8", "M9", "M10", "M11", "M12", "M13", "M14"].map((id) => renderStand(id, "w-full h-16"))}
                </div>

                {/* Columna 5 */}
                <div className="flex flex-col gap-2 w-24">
                  {renderStand("Y4", "w-full h-24")}
                  {renderStand("Y5", "w-full h-24")}
                  {renderStand("Y6", "w-full h-24")}
                  <div className="h-24 flex items-center justify-center border-r-2 border-gray-300">
                    <div className="-rotate-90 text-center">
                      <p className="text-[9px] text-gray-400 tracking-widest font-bold leading-tight whitespace-nowrap">SALIDA DE</p>
                      <p className="text-[9px] text-gray-400 tracking-widest font-bold leading-tight whitespace-nowrap">EMERGENCIA</p>
                    </div>
                  </div>
                  {renderStand("G2", "w-full h-20")}
                  {renderStand("G3", "w-full h-20")}
                </div>
              </div>

              {/* ZONA INFERIOR: Subimos TODO el bloque con margen negativo para alinear P1 con G2 */}
              <div className="-mt-[7rem] flex items-end justify-start relative w-[95%] z-10">
                
                {/* Esquina Inferior Izquierda */}
                <div className="flex items-end gap-2 pr-4 border-b-4 border-gray-400 pb-1 mb-[-2px] z-10">
                  <div className="flex flex-col gap-2 items-start">
                    {renderStand("P1", "w-24 h-20")}
                    {renderStand("V1", "w-32 h-28")}
                  </div>
                  {renderStand("G1", "w-24 h-20")}
                </div>

                {/* Puertas Principales */}
                <div className="flex gap-6 px-2 text-gray-500 font-bold tracking-widest text-sm z-20 bg-[#f8f9fa] mb-[-12px]">
                  <div className="flex flex-col items-center">
                    <span className="text-2xl mb-0.5">↓</span> SALIDA
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-2xl mb-0.5">↑</span> ENTRADA
                  </div>
                </div>

                {/* Pasillo Principal Derecho y Stands Naranjas */}
                <div className="flex flex-col items-start gap-1 pl-2 border-b-4 border-gray-400 pb-1 mb-[-2px] flex-grow">
                  <span className="text-gray-400 text-[10px] tracking-widest uppercase ml-1">Pasillo Principal</span>
                  <div className="flex gap-2">
                    {renderStand("O5", "w-20 h-16")}
                    {renderStand("O6", "w-20 h-16")}
                    {renderStand("O7", "w-20 h-16")}
                  </div>
                </div>

              </div>

              {/* === HOJA 2: ÁREA DE PISCINA === */}
              <div className="mt-10 flex flex-col w-full pl-2">
                <div className="flex items-center gap-16">
                  
                  {/* Izquierda: 2 Stands + Salida a Piscina */}
                  <div className="flex flex-col gap-6 relative">
                    <div className="absolute -right-8 top-0 bottom-0 w-1 bg-gray-200"></div>
                    
                    {renderStand("S1", "w-48 h-24")}
                    
                    <div className="flex items-center justify-start text-gray-400 font-bold tracking-widest text-sm py-1">
                      <span className="text-xl mr-3">←</span> PISCINA SALIDA
                    </div>
                    
                    {renderStand("S2", "w-48 h-24")}
                  </div>
                  
                  {/* Derecha: 1 Stand Vertical */}
                  <div className="pt-2">
                    {renderStand("S3", "w-24 h-[240px]")}
                  </div>

                </div>
              </div>

            </div>
          </div>
        </div>

        {/* COLUMNA DERECHA: CARRITO DE COMPRAS */}
        <div className="xl:col-span-1 xl:sticky xl:top-24 h-fit">
          <div className="bg-white rounded-[2rem] shadow-2xl border border-aprolac-green/20 p-6 flex flex-col h-[600px] xl:h-[calc(100vh-150px)] min-h-[600px]">
            
            {/* Cabecera del carrito con botón de limpiar */}
            <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-4 flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="bg-aprolac-green/10 p-2 rounded-xl">
                  <ShoppingCart className="w-5 h-5 text-aprolac-green" />
                </div>
                <h3 className="text-xl font-display font-bold text-aprolac-dark">Cotización</h3>
              </div>
              
              {/* Botón Limpiar */}
              {cartItems.length > 0 && (
                <button 
                  onClick={clearCart}
                  className="flex items-center gap-1 text-xs text-red-500 hover:text-red-700 font-bold uppercase tracking-wider transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Limpiar
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
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
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
                            className="text-[10px] text-red-400 hover:text-red-600 uppercase tracking-wider font-bold"
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

            {/* Total Area */}
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
                    : "bg-[#25D366] text-white hover:bg-[#1ebe57] hover:shadow-lg hover:-translate-y-1"
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