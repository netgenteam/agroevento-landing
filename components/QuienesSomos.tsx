'use client';

import { motion, Variants } from 'framer-motion';
import Image from 'next/image';
import { Icon } from '@iconify/react';

const QuienesSomos = () => {
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  return (
    <section id="quienes-somos" className="bg-white py-24 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Columna Izquierda: Texto */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="flex flex-col items-start"
          >
            {/* Tagline / Pastilla */}
            <span className="inline-block bg-aprolac-green/10 text-aprolac-green px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-6">
              Sobre APROLAC
            </span>

            <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-aprolac-dark leading-tight mb-8">
              APROLAC: Liderando el Despertar de <span className="text-aprolac-green">24.5 Millardos</span> de Litros
            </h2>

            <div className="space-y-6">
              <p className="font-sans text-base md:text-lg text-aprolac-text leading-relaxed">
                Con más de tres décadas consolidando el ecosistema agroindustrial, APROLAC se erige como la columna vertebral de la logística láctea moderna. Nuestro compromiso trasciende el volumen; estructuramos la trazabilidad absoluta desde el campo hasta la distribución corporativa.
              </p>
              <p className="font-sans text-base md:text-lg text-aprolac-text leading-relaxed">
                No solo gestionamos cadenas de suministro, orquestamos un motor industrial que garantiza la excelencia técnica y operativa para productores y corporaciones B2B a nivel nacional.
              </p>
            </div>
          </motion.div>

          {/* Columna Derecha: Imagen y Tarjeta Flotante */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            {/* Contenedor de Imagen */}
            <div className="relative aspect-[4/5] md:aspect-square lg:aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/imagen1.jpeg"
                alt="Maquinaria Agroindustrial APROLAC"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                priority
              />
            </div>

            {/* Tarjeta Flotante "Respaldo Oficial" */}
            <div className="absolute -bottom-6 -left-6 md:-left-12 z-10">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-aprolac-border p-5 md:p-6 flex items-center gap-4 md:gap-5 min-w-[280px]"
              >
                <div className="flex-shrink-0 bg-aprolac-green/10 p-3 rounded-xl">
                  <Icon icon="mdi:shield-check" className="w-8 h-8 text-aprolac-green" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-aprolac-dark text-lg md:text-xl">
                    Respaldo Oficial
                  </h4>
                  <div className="flex flex-col">
                    <span className="text-sm text-aprolac-text font-medium">
                      RIF J-50781399-1
                    </span>
                    <div className="w-8 h-0.5 bg-aprolac-green/30 mt-1 rounded-full"></div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Elemento decorativo sutil (opcional para elevar estética) */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-aprolac-green/5 rounded-full blur-3xl -z-10"></div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default QuienesSomos;
