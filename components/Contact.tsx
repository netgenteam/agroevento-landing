'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';

const Contact = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedReason, setSelectedReason] = useState('');

  const reasons = [
    "Adquisición de Stand",
    "Patrocinio Corporativo",
    "Dudas sobre el Cronograma",
    "Otro"
  ];

  return (
    <section id="contacto" className="bg-aprolac-cream py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Cabecera de Sección */}
        <div className="mb-12">
          <h2 className="font-display font-bold text-4xl md:text-5xl text-aprolac-dark mb-4">
            Reserva tu Espacio
          </h2>
          <p className="font-sans text-aprolac-text text-lg max-w-2xl leading-relaxed">
            Comunícate con nuestro equipo comercial para asegurar tu Stand, gestionar patrocinios o resolver cualquier duda logística sobre la Expo 2026.
          </p>
        </div>

        {/* Layout Grid - items-stretch para alturas iguales */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">

          {/* Columna Izquierda: Formulario */}
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl shadow-xl p-4 md:p-10 border border-aprolac-border/50 flex flex-col justify-center relative z-20"
          >
            <form className="space-y-6 flex-grow" onSubmit={(e) => e.preventDefault()}>
              
              {/* Contenedor Grid para Nombre y Empresa (Alineados en desktop) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                {/* Nombre */}
                <div className="space-y-2">
                  <label htmlFor="nombre" className="font-sans text-sm font-bold text-aprolac-dark uppercase tracking-wider">
                    Nombre Completo
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Icon icon="mdi:account-outline" className="text-gray-400 w-5 h-5" />
                    </div>
                    <input
                      id="nombre"
                      name="nombre"
                      type="text"
                      placeholder="Ej. Juan Pérez"
                      className="bg-aprolac-cream/50 border placeholder:text-sm border-gray-200 rounded-xl pl-12 pr-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-aprolac-green/50 focus:border-aprolac-green transition-all font-sans"
                    />
                  </div>
                </div>

                {/* Empresa */}
                <div className="space-y-2">
                  <label htmlFor="empresa" className="font-sans mb-1 text-sm font-bold text-aprolac-dark uppercase tracking-wider flex items-center gap-2">
                    Empresa / Org.
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Icon icon="mdi:domain" className="text-gray-400 w-5 h-5" />
                    </div>
                    <input
                      id="empresa"
                      name="empresa"
                      type="text"
                      placeholder="Empresa"
                      className="bg-aprolac-cream/50 border placeholder:text-sm border-gray-200 rounded-xl pl-12 pr-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-aprolac-green/50 focus:border-aprolac-green transition-all font-sans"
                    />
                  </div>
                  {/* Este texto lo mantengo, pero alinea bien con el grid */}
                  <div className="">
                    <span className="text-[10px] text-gray-400 font-normal normal-case">(Opcional)</span>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label htmlFor="email" className="font-sans text-sm font-bold text-aprolac-dark uppercase tracking-wider">
                  Correo Corporativo
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Icon icon="mdi:email-outline" className="text-gray-400 w-5 h-5" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="email@empresa.com"
                    className="bg-aprolac-cream/50 border placeholder:text-sm border-gray-200 rounded-xl pl-12 pr-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-aprolac-green/50 focus:border-aprolac-green transition-all font-sans"
                  />
                </div>
              </div>

              {/* Motivo - Custom Dropdown */}
              <div className="space-y-2 relative z-30">
                <label htmlFor="motivo" className="font-sans text-sm font-bold text-aprolac-dark uppercase tracking-wider">
                  Motivo de Contacto
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                    <Icon icon="mdi:format-list-bulleted" className="text-gray-400 w-5 h-5" />
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="bg-aprolac-cream/50 border placeholder:text-sm border-gray-200 rounded-xl pl-12 pr-4 py-3 w-full flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-aprolac-green/50 focus:border-aprolac-green transition-all font-sans text-left relative z-0"
                  >
                    <span className={selectedReason ? 'text-aprolac-dark' : 'text-gray-400'}>
                      {selectedReason || 'Seleccione un motivo'}
                    </span>
                    <Icon
                      icon="mdi:chevron-down"
                      className={`text-gray-400 w-5 h-5 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`}
                    />
                  </button>

                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.ul
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-2xl overflow-hidden z-[100]"
                      >
                        {reasons.map((reason) => (
                          <li key={reason}>
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedReason(reason);
                                setIsDropdownOpen(false);
                              }}
                              className="w-full text-left px-2 py-3 font-sans text-sm md:text-base text-aprolac-dark hover:bg-aprolac-cream hover:text-aprolac-green transition-colors"
                            >
                              {reason}
                            </button>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Mensaje */}
              <div className="space-y-2 relative z-10">
                <label htmlFor="mensaje" className="font-sans text-sm font-bold text-aprolac-dark uppercase tracking-wider">
                  Mensaje
                </label>
                <div className="relative">
                  <div className="absolute top-3 left-0 pl-4 flex items-start pointer-events-none">
                    <Icon icon="mdi:message-text-outline" className="text-gray-400 w-5 h-5" />
                  </div>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    rows={4}
                    placeholder="¿En qué podemos ayudarte?"
                    className="bg-aprolac-cream/50 border placeholder:text-sm border-gray-200 rounded-xl pl-12 pr-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-aprolac-green/50 focus:border-aprolac-green transition-all font-sans resize-none"
                  />
                </div>
              </div>

              {/* Botón */}
              <button
                type="submit"
                className="w-full flex justify-center items-center gap-2 bg-aprolac-guinda text-white font-bold py-4 rounded-xl hover:bg-[#5a0c28] hover:shadow-lg hover:shadow-aprolac-guinda/30 transition-all transform hover:-translate-y-0.5"
              >
                <Icon icon="mdi:send" className="w-5 h-5" />
                Enviar Solicitud
              </button>
            </form>
          </motion.div>

          {/* Columna Derecha: Mapa y Info */}
          <motion.div
            initial={{ x: 30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative w-full h-full z-10 flex flex-col lg:block"
          >
            {/* Contenedor del Mapa - Apuntando a Eurobuilding Puerto Ordaz */}
            <div className="relative w-full h-[350px] md:h-[450px] lg:h-full rounded-3xl overflow-hidden shadow-xl border border-gray-200 group">
              <iframe
                title="Ubicación del evento Expo Agro Negocios Lácteos 2026 - Eurobuilding Hotel & Suites Guayana, Puerto Ordaz"
                
               
                src="https://maps.google.com/maps?q=Eurobuilding%20Hotel%20%26%20Suites%20Guayana,%20Puerto%20Ordaz&t=&z=16&ie=UTF8&iwloc=&output=embed"
                
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 w-full h-full contrast-125  transition-all duration-700"
              />
            </div>

            {/* Tarjeta Flotante de Contacto */}
            <div className="mt-6 lg:mt-0 lg:absolute lg:bottom-6 lg:left-6 lg:right-auto lg:w-80 bg-white lg:bg-white/95 lg:backdrop-blur-sm p-6 rounded-3xl lg:rounded-2xl shadow-xl lg:shadow-2xl border border-gray-200 lg:border-white/20 z-10 pointer-events-none">
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-aprolac-green/10 p-2 rounded-lg">
                    <Icon icon="mdi:map-marker" className="w-6 h-6 text-aprolac-green" />
                  </div>
                  <div>
                    <p className="font-display font-bold text-aprolac-dark text-sm">Sede del Evento</p>
                    <p className="font-sans text-aprolac-text text-xs leading-relaxed">Eurobuilding Hotel & Suites Guayana, Puerto Ordaz</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="bg-aprolac-green/10 p-2 rounded-lg">
                    <Icon icon="mdi:email" className="w-6 h-6 text-aprolac-green" />
                  </div>
                  <div>
                    <p className="font-display font-bold text-aprolac-dark text-sm">Correo Oficial</p>
                    <p className="font-sans text-aprolac-text text-xs">contacto@aprolac.org</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="bg-aprolac-green/10 p-2 rounded-lg">
                    <Icon icon="mdi:phone" className="w-6 h-6 text-aprolac-green" />
                  </div>
                  <div>
                    <p className="font-display font-bold text-aprolac-dark text-sm">Teléfono Corporativo</p>
                    <p className="font-sans text-aprolac-text text-xs">+58 424 000 0000</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Contact;