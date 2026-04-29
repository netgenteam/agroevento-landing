'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import ScheduleTabs from './ScheduleTabs';

const activities = [
  {
    title: 'Conferencias Magistrales',
    description: 'Líderes globales compartiendo la vanguardia en sostenibilidad y tecnología láctea.',
    image: '/bento1.png',
    badge: 'Destacado'
  },
  {
    title: 'Área Comercial',
    description: 'Conecte con proveedores premium y descubra soluciones logísticas.',
    image: '/bento2.png'
  },
  {
    title: 'Encuentro Estudiantil',
    description: 'Fomentando el talento emergente y la investigación aplicada.',
    image: '/bento3.png'
  },
  {
    title: 'Rueda de Negocios',
    description: 'Espacio exclusivo para alianzas estratégicas B2B.',
    image: '/bento1.png'
  }
];

const EventActivities = () => {
  return (
    <section id="actividades" className="bg-aprolac-cream py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Título de Sección */}
        <div className="mb-12">
          <h2 className="font-display font-bold text-4xl md:text-5xl text-aprolac-dark">
            Actividades
          </h2>
        </div>

        {/* Bento Grid Dinámico */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activities.map((activity, index) => (
            <motion.div
              key={activity.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`group relative overflow-hidden rounded-3xl shadow-sm hover:shadow-xl transition-all duration-500 bg-white min-h-[300px] ${
                index === 0 ? 'md:col-span-2 md:row-span-2' : 'col-span-1'
              }`}
            >
              {/* Imagen de Fondo */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={activity.image}
                  alt={`${activity.title} – Expo Agro Negocios Lácteos 2026`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Overlay Oscuro */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80" />
              </div>

              {/* Contenido */}
              <div className="relative z-10 h-full flex flex-col justify-end p-8 md:p-10">
                {activity.badge && (
                  <span className="absolute top-6 left-6 inline-block bg-aprolac-green text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg">
                    {activity.badge}
                  </span>
                )}
                
                <h3 className={`font-display font-bold text-white mb-3 ${
                  index === 0 ? 'text-2xl md:text-4xl' : 'text-xl'
                }`}>
                  {activity.title}
                </h3>
                <p className={`font-sans text-gray-200 leading-relaxed max-w-lg ${
                  index === 0 ? 'text-base md:text-lg' : 'text-sm'
                }`}>
                  {activity.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Separador Sutil */}
        <div className="mt-24 h-px bg-aprolac-border w-full" />

        {/* Cronograma Interactivo */}
        <ScheduleTabs />
      </div>
    </section>
  );
};

export default EventActivities;
