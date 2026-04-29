'use client';

import { useState, useEffect } from 'react';
import { useRef } from 'react';
import { motion, useInView, animate, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';
import Image from 'next/image';

const stats = [
  { id: 1, label: 'Asistentes Proyectados', value: 5000, suffix: '+', icon: 'mdi:account-group-outline' },
  { id: 2, label: 'Empresas y Marcas', value: 120, suffix: '+', icon: 'mdi:domain' },
  { id: 3, label: 'Universidades Aliadas', value: 15, suffix: '+', icon: 'mdi:school-outline' },
  { id: 4, label: 'Área de Exhibición', value: 10, suffix: 'k m²', icon: 'mdi:texture-box' },
];

const AnimatedCounter = ({ value, suffix }: { value: number; suffix: string }) => {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(nodeRef, { once: true });

  useEffect(() => {
    if (inView && nodeRef.current) {
      const controls = animate(0, value, {
        duration: 2,
        ease: 'easeOut',
        onUpdate(v) {
          if (nodeRef.current) {
            const formatted = Math.floor(v).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
            nodeRef.current.textContent = `${formatted}${suffix}`;
          }
        },
      });
      return controls.stop;
    }
  }, [inView, value, suffix]);

  return <span ref={nodeRef}>0{suffix}</span>;
};

/* ── Modal de Video con detección de orientación ── */
const VideoModal = ({ onClose }: { onClose: () => void }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPortrait, setIsPortrait] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detectar si es móvil (pantalla < 768px)
    const checkMobile = window.matchMedia('(max-width: 767px)');
    setIsMobile(checkMobile.matches);

    // Detectar orientación
    const orientationQuery = window.matchMedia('(orientation: portrait)');
    setIsPortrait(orientationQuery.matches);

    const handleOrientationChange = (e: MediaQueryListEvent) => {
      setIsPortrait(e.matches);
    };

    orientationQuery.addEventListener('change', handleOrientationChange);
    return () => orientationQuery.removeEventListener('change', handleOrientationChange);
  }, []);

  // Controlar reproducción según orientación
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isMobile && isPortrait) {
      video.pause();
    } else {
      video.play().catch(() => { });
    }
  }, [isPortrait, isMobile]);

  // Bloquear scroll del body cuando el modal está abierto
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-lg p-4 md:p-10"
      onClick={onClose}
    >
      {/* Botón Cerrar */}
      <button
        className="absolute top-6 right-6 z-50 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-3 backdrop-blur-sm transition-all cursor-pointer"
        onClick={onClose}
      >
        <Icon icon="mdi:close" className="w-6 h-6 md:w-8 md:h-8" />
      </button>

      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ delay: 0.1 }}
        className="relative w-full max-w-6xl aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-black"
        onClick={(e) => e.stopPropagation()}
      >
        <video
          ref={videoRef}
          src="/video-evento.mp4"
          controls
          playsInline
          className="w-full h-full object-contain"
        />

        {/* Overlay: Gira tu dispositivo (Solo en Mobile Portrait) */}
        {isMobile && isPortrait && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-10 flex items-center justify-center bg-black/85 backdrop-blur-md"
          >
            <div className="flex flex-col items-center justify-center gap-5 text-center px-8">
              <Icon icon="mdi:phone-rotate-landscape" className="w-20 h-20 text-aprolac-green animate-pulse" />
              <p className="font-display font-bold text-white text-2xl drop-shadow-md">
                Gira tu dispositivo
              </p>
              <p className="font-sans text-gray-300 text-sm max-w-[280px] leading-relaxed">
                Para una mejor experiencia visual, coloca tu teléfono en posición horizontal.
              </p>
            </div>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

const ExpoSection = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const videoContainerRef = useRef<HTMLDivElement>(null);

  const handleCloseVideoModal = () => {
    setIsVideoModalOpen(false);
    // Restaurar scroll al contenedor del video tras el cierre
    setTimeout(() => {
      videoContainerRef.current?.scrollIntoView({ behavior: 'instant', block: 'center' });
    }, 50);
  };
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    setIsMounted(true);
    // Fecha objetivo: 15 de Mayo de 2026, 08:00 AM
    const targetDate = new Date('2026-05-15T08:00:00').getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="expo" className="bg-white py-24 md:py-32 relative overflow-hidden border-t border-aprolac-border">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Cabecera y Contador */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-12 mb-20">
          <div className="lg:w-1/2">
            <h2 className="font-display font-bold text-4xl md:text-5xl text-aprolac-dark mb-4">
              La Gran Expo <span className="text-aprolac-green">2026</span>
            </h2>
            <p className="font-sans text-aprolac-text text-lg max-w-xl leading-relaxed">
              El punto de encuentro definitivo para la innovación agroindustrial. Prepárate para el evento B2B más importante del sector lácteo en Venezuela.
            </p>
          </div>

          <div className="lg:w-1/2 flex justify-center lg:justify-end w-full">
            <div className="bg-aprolac-cream border border-aprolac-border/50 rounded-3xl p-6 md:p-8 shadow-sm flex gap-4 md:gap-8 items-center w-full max-w-lg">
              {isMounted ? (
                <>
                  <div className="flex flex-col items-center flex-1">
                    <span className="font-display font-bold text-3xl md:text-5xl text-aprolac-dark">{timeLeft.days}</span>
                    <span className="font-sans text-xs md:text-sm text-aprolac-text uppercase tracking-widest mt-1">Días</span>
                  </div>
                  <div className="text-2xl text-aprolac-green/50 font-light">:</div>
                  <div className="flex flex-col items-center flex-1">
                    <span className="font-display font-bold text-3xl md:text-5xl text-aprolac-dark">{timeLeft.hours.toString().padStart(2, '0')}</span>
                    <span className="font-sans text-xs md:text-sm text-aprolac-text uppercase tracking-widest mt-1">Hrs</span>
                  </div>
                  <div className="text-2xl text-aprolac-green/50 font-light">:</div>
                  <div className="flex flex-col items-center flex-1">
                    <span className="font-display font-bold text-3xl md:text-5xl text-aprolac-green">{timeLeft.minutes.toString().padStart(2, '0')}</span>
                    <span className="font-sans text-xs md:text-sm text-aprolac-green uppercase tracking-widest mt-1">Min</span>
                  </div>
                </>
              ) : (
                <div className="h-[80px] w-full flex items-center justify-center">
                  <span className="text-aprolac-text">Calculando tiempo...</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Estadísticas de la Expo */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-20">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-aprolac-cream/30 border border-gray-100 rounded-2xl p-6 md:p-8 text-center flex flex-col items-center justify-center hover:shadow-lg transition-shadow duration-300"
            >
              <div className="bg-aprolac-green/10 p-4 rounded-full mb-4">
                <Icon icon={stat.icon} className="w-8 h-8 text-aprolac-green" />
              </div>
              <h4 className="font-display font-bold text-3xl md:text-4xl text-aprolac-dark mb-2">
                <AnimatedCounter value={stat.value as number} suffix={stat.suffix as string} />
              </h4>
              <p className="font-sans text-sm md:text-base text-aprolac-text">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Video Promocional del Evento */}
        <motion.div
          ref={videoContainerRef}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          onClick={() => setIsVideoModalOpen(true)}
          className="mb-20 relative w-full aspect-video rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white group cursor-pointer"
        >
          {/* Overlay Gradiente Oscuro */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 pointer-events-none" />

          <video
            src="/video-evento.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 z-0"
          />

          {/* Contenido Flotante sobre el video */}
          <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 right-8 z-20 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div>
              <span className="inline-flex items-center gap-2 bg-aprolac-green/90 backdrop-blur-sm text-white px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-4 shadow-lg border border-aprolac-green/50">
                <Icon icon="mdi:eye" className="w-4 h-4" />
                Experiencia APROLAC
              </span>
              <h3 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-white drop-shadow-md leading-tight max-w-2xl">
                Visualiza el futuro de la agroindustria láctea
              </h3>
            </div>

            {/* Decoración Visual (Play Icon estético) */}
            <div className="flex flex-shrink-0 w-14 h-14 md:w-20 md:h-20 bg-aprolac-green/80 backdrop-blur-md rounded-full border-2 border-white/50 items-center justify-center text-white group-hover:bg-aprolac-green group-hover:scale-110 transition-all duration-500 shadow-[0_0_40px_rgba(40,167,69,0.4)]">
              <Icon icon="mdi:play" className="w-8 h-8 md:w-10 md:h-10" />
            </div>
          </div>
        </motion.div>

        {/* Mapa de Distribución */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-aprolac-cream rounded-[2.5rem] p-8 md:p-12 border border-aprolac-border/50 relative overflow-hidden"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 md:mb-12 gap-6 relative z-10">
            <div>
              <h3 className="font-display font-bold text-2xl md:text-3xl text-aprolac-dark">
                Plano de Exhibición
              </h3>
              <p className="font-sans text-aprolac-text mt-2">
                Distribución estratégica de pabellones, zonas de networking y stands comerciales.
              </p>
            </div>
            <button className="bg-white border border-gray-200 text-aprolac-dark font-sans font-semibold py-3 px-6 rounded-xl hover:border-aprolac-green hover:text-aprolac-green transition-colors flex items-center gap-2 shadow-sm">
              <Icon icon="mdi:download" className="w-5 h-5" />
              Descargar Plano PDF
            </button>
          </div>

          {/* Imagen del Mapa Blueprint */}
          <div className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden shadow-inner border border-white">
            <div className="absolute inset-0 bg-gray-100 animate-pulse -z-10" />
            <Image
              src="/expo-map.png"
              alt="Plano de distribución de la Expo Agro Negocios Lácteos 2026 – Pabellones, stands y zonas de networking"
              fill
              sizes="(max-width: 768px) 100vw, 90vw"
              className="object-cover object-center hover:scale-105 transition-transform duration-1000"
            />
          </div>
        </motion.div>

        {/* Video Modal con Backdrop Blur */}
        <AnimatePresence>
          {isVideoModalOpen && (
            <VideoModal onClose={handleCloseVideoModal} />
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};

export default ExpoSection;
