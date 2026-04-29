'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';
import Image from 'next/image';

type EventType = 'normal' | 'highlight' | 'break';

interface Event {
  id: string;
  time: string;
  title: string;
  description: string;
  speakerName?: string;
  speakerAvatar?: string;
  type: EventType;
}

const scheduleData: Record<string, Event[]> = {
  'Pre-congreso': [
    {
      id: 'pc1',
      time: '02:00 PM',
      title: 'Registro y Entrega de Acreditaciones',
      description: 'Recepción de participantes y entrega de kits institucionales.',
      type: 'normal'
    },
    {
      id: 'pc2',
      time: '04:00 PM',
      title: 'Taller de Bioseguridad Láctea',
      description: 'Capacitación técnica previa sobre normativas de higiene y seguridad.',
      speakerName: 'Ing. Carlos Méndez',
      type: 'highlight'
    }
  ],
  'Día 1': [
    {
      id: 'd1e1',
      time: '08:00 AM',
      title: 'Apertura Institucional',
      description: 'Bienvenida oficial y visión del sector para la próxima década.',
      speakerName: 'Comité Organizador',
      type: 'normal'
    },
    {
      id: 'd1e2',
      time: '10:30 AM',
      title: 'Innovación en Genética Lechera',
      description: 'Impacto de la selección genómica en la rentabilidad de las explotaciones.',
      speakerName: 'Dr. Elena Martínez',
      type: 'highlight'
    },
    {
      id: 'd1e3',
      time: '12:30 PM',
      title: 'Networking Lunch & Expo Tour',
      description: 'Espacio de integración y recorrido guiado por el área comercial.',
      type: 'break'
    },
    {
      id: 'd1e4',
      time: '02:30 PM',
      title: 'Logística de Cadena de Frío 4.0',
      description: 'Optimización de rutas y monitoreo IoT en tiempo real.',
      speakerName: 'Ing. Roberto Silva',
      type: 'normal'
    }
  ],
  'Día 2': [
    {
      id: 'd2e1',
      time: '09:00 AM',
      title: 'Sostenibilidad y Huella de Carbono',
      description: 'Estrategias para una industria láctea más verde y eficiente.',
      speakerName: 'Dra. Sofía Alarcón',
      type: 'highlight'
    },
    {
      id: 'd2e2',
      time: '11:00 AM',
      title: 'Panel: Mercados Internacionales',
      description: 'Oportunidades de exportación para el sector lácteo venezolano.',
      speakerName: 'Lic. Ricardo Gómez',
      type: 'normal'
    },
    {
      id: 'd2e3',
      time: '01:00 PM',
      title: 'Receso: Coffee Break',
      description: 'Sesión de networking y degustación de productos lácteos premium.',
      type: 'break'
    }
  ],
  'Día 3': [
    {
      id: 'd3e1',
      time: '09:00 AM',
      title: 'Transformación Digital en Plantas',
      description: 'Automatización y Big Data aplicado al procesamiento de leche.',
      speakerName: 'Ing. Marina Torres',
      type: 'normal'
    },
    {
      id: 'd3e2',
      time: '11:30 AM',
      title: 'Clausura y Entrega de Premios',
      description: 'Reconocimiento a la excelencia y palabras de cierre del evento.',
      type: 'highlight'
    }
  ],
  'Post-evento': [
    {
      id: 'pe1',
      time: '10:00 AM',
      title: 'Visitas Técnicas a Fincas Modelo',
      description: 'Recorrido por unidades de producción de alto rendimiento.',
      type: 'normal'
    }
  ]
};

const ScheduleTabs = () => {
  const [activeTab, setActiveTab] = useState('Día 1');
  const tabs = ['Pre-congreso', 'Día 1', 'Día 2', 'Día 3', 'Post-evento'];

  return (
    <div className="mt-16">
      <h3 className="font-display font-bold text-2xl text-aprolac-dark mb-8">Cronograma</h3>

      {/* Pestañas */}
      <div className="flex overflow-x-auto pb-4 gap-4 sm:gap-8 scrollbar-hide border-b border-aprolac-border">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`font-sans font-medium text-xs md:text-sm md:text-base whitespace-nowrap pb-4 transition-all relative ${activeTab === tab
              ? 'text-aprolac-green'
              : 'text-gray-500 hover:text-aprolac-text'
              }`}
          >
            {tab}
            {activeTab === tab && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-aprolac-green"
              />
            )}
          </button>
        ))}
      </div>

      {/* Lista de Eventos */}
      <div className="mt-8 relative min-h-[400px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            {scheduleData[activeTab]?.map((event) => (
              <div
                key={event.id}
                className={`flex flex-col md:flex-row md:items-center p-6 gap-6 transition-all rounded-2xl ${event.type === 'break'
                  ? 'bg-gray-100 italic'
                  : 'bg-white shadow-sm border border-aprolac-border hover:shadow-md'
                  } ${event.type === 'highlight' ? 'border-l-4 border-l-aprolac-green' : ''
                  }`}
              >
                {/* Hora */}
                <div className="flex items-center gap-3 md:w-32 flex-shrink-0">
                  <Icon
                    icon={event.type === 'break' ? 'mdi:coffee-outline' : 'mdi:clock-outline'}
                    className={`w-5 h-5 ${event.type === 'break' ? 'text-gray-400' : 'text-aprolac-green'}`}
                  />
                  <span className={`font-sans font-bold text-sm md:text-base ${event.type === 'break' ? 'text-gray-400' : 'text-aprolac-dark'}`}>
                    {event.time}
                  </span>
                </div>

                {/* Contenido */}
                <div className="flex-grow">
                  <h4 className="font-display font-bold text-lg text-aprolac-dark mb-1">
                    {event.title}
                  </h4>
                  <p className="font-sans text-sm text-aprolac-text">
                    {event.description}
                  </p>
                </div>

                {/* Speaker */}
                {event.speakerName && (
                  <div className="flex items-center gap-3 md:w-48 flex-shrink-0 md:justify-end">
                    <div className="text-right hidden md:block">
                      <p className="text-xs font-bold text-aprolac-dark leading-tight">
                        {event.speakerName}
                      </p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-aprolac-cream border border-aprolac-border flex items-center justify-center overflow-hidden">
                      {event.speakerAvatar ? (
                        <Image src={event.speakerAvatar} alt={event.speakerName} width={40} height={40} />
                      ) : (
                        <Icon icon="mdi:account-outline" className="w-6 h-6 text-gray-400" />
                      )}
                    </div>
                    <div className="md:hidden">
                      <p className="text-xs font-bold text-aprolac-dark leading-tight">
                        {event.speakerName}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ScheduleTabs;
