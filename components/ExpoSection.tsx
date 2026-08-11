'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useInView, animate, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';
import Image from 'next/image';
import Link from 'next/link'; // <-- NUEVA IMPORTACIÓN
import Toast, { ToastType } from './Toast';


const stats = [
  { id: 1, label: 'Visitantes a la Expo', value: 3000, suffix: '+', icon: 'mdi:account-group-outline' },
  { id: 2, label: 'Empresas Expositoras', value: 50, suffix: '+', icon: 'mdi:domain' },
  { id: 3, label: 'Universidades Aliadas', value: 10, suffix: '+', icon: 'mdi:school-outline' },
  { id: 5, label: 'Congresistas', value: 1000, suffix: '+', icon: 'mdi:domain' },
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

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch(() => { });
    }
  }, []);

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
        className="relative w-full max-w-7xl aspect-[4/3] md:aspect-video rounded-2xl shadow-2xl border border-white/10 bg-black"
        onClick={(e) => e.stopPropagation()}
      >
        <video
          ref={videoRef}
          src="/video-evento.mp4"
          controls
          playsInline
          className="w-full h-full object-contain rounded-2xl"
        />

        <div className="absolute -bottom-14 md:hidden left-0 right-0 z-10 portrait:flex landscape:hidden justify-center pointer-events-none">
          <div className="bg-black/70 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 flex items-center gap-2 shadow-lg animate-pulse">
            <Icon icon="mdi:phone-rotate-landscape" className="w-5 h-5 text-aprolac-green" />
            <span className="text-white text-xs font-sans font-medium tracking-wide">
              Gira tu dispositivo para pantalla completa
            </span>
          </div>
        </div>
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

  const [toast, setToast] = useState({
    isVisible: false,
    message: '',
    type: 'success' as ToastType,
  });

  const [currentPdfSlide, setCurrentPdfSlide] = useState<0 | 1>(0);

  const pdfPlans = [
    {
      id: 'interior',
      title: 'Plano Interior',
      description: 'Distribución oficial de los stands comerciales y patrocinantes VIP dentro del Salón Principal.',
      image: '/imagen-interior.png',
      pdf: '/Pdf-interior.pdf',
      downloadName: 'Plano_Interior_Expo_2026.pdf',
    },
    {
      id: 'exterior',
      title: 'Plano Exterior',
      description: 'Ubicación de expositores, áreas de ganado, toldos institucionales y pabellón del queso.',
      image: '/imagen-exterior.png',
      pdf: '/Pdf-exterior.pdf',
      downloadName: 'Plano_Exterior_Expo_2026.pdf',
    },
  ];

  const currentPlan = pdfPlans[currentPdfSlide];

  const showToast = (message: string, type: ToastType = 'success') => {
    setToast({ isVisible: true, message, type });
  };

  // ✅ FIX: useCallback para referencia estable — evita que el timer del Toast se reinicie en cada render
  const handleCloseToast = useCallback(() => {
    setToast(prev => ({ ...prev, isVisible: false }));
  }, []);

  useEffect(() => {
    setIsMounted(true);
    const targetDate = new Date('2026-10-14T08:00:00').getTime();

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
    <section id="expo" className="bg-white py-5 md:py-10 relative overflow-hidden border-t border-aprolac-border">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Cabecera y Contador */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-12 mb-20">
          <div className="lg:w-1/2">
            <h2 className="font-display font-bold text-4xl md:text-5xl text-aprolac-dark mb-4">
              Expo Agro Negocios Lácteos Venezuela <span className="text-aprolac-green">2026</span>
            </h2>
            <p className="font-sans text-aprolac-text text-lg max-w-xl leading-relaxed">
              El primer gran hito nacional diseñado para articular la cadena de valor, transformar el arraigo rural en competitividad global y convertir nuestra tradición quesera en un activo económico diferenciado.
            </p>
          </div>

          <div className="lg:w-1/2 flex flex-col items-center lg:items-end w-full">
            {/* Badge discreto con la fecha exacta del evento (POR ENCIMA DEL CUADRO) */}
            <div className="flex items-center gap-2 mb-3 text-xs md:text-sm font-bold text-aprolac-green uppercase tracking-wider bg-white px-4 py-1.5 rounded-full border border-aprolac-green/30 shadow-xs">
              <Icon icon="mdi:calendar-month-outline" className="w-4 h-4 text-aprolac-green" />
              <span>Del 14 al 17 de Octubre de 2026</span>
            </div>

            <div className="bg-aprolac-cream border border-aprolac-border/50 rounded-3xl p-6 md:p-8 shadow-sm flex gap-4 md:gap-8 items-center justify-center w-full max-w-lg">
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
          className="relative w-full aspect-[4/3] sm:aspect-video rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white group"
        >
          {/* Capa 1: Gradiente Oscuro */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent z-10 pointer-events-none" />

          {/* Capa 2: Video de fondo */}
          <video
            src="/video-evento.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 z-0 pointer-events-none"
          />

          {/* Capa 3: Textos */}
          <div className="absolute bottom-5 left-5 sm:bottom-8 sm:left-8 md:bottom-12 md:left-12 z-20 pointer-events-none pr-[80px] sm:pr-[100px] md:pr-[120px]">
            <span className="inline-flex items-center gap-2 bg-aprolac-green/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-[10px] sm:text-xs font-bold tracking-widest uppercase mb-3 sm:mb-4 shadow-lg border border-aprolac-green/50">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              Experiencia APROLAC
            </span>
            <h3 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white drop-shadow-lg leading-tight max-w-2xl">
              El renacer del agronegocio venezolano.
            </h3>
          </div>

          {/* Capa 4: Botón Play */}
          <button
            onClick={() => setIsVideoModalOpen(true)}
            aria-label="Reproducir video"
            className="absolute bottom-5 right-5 sm:bottom-8 sm:right-8 md:bottom-12 md:right-12 z-30 w-16 h-16 sm:w-20 sm:h-20 bg-aprolac-green/80 backdrop-blur-md rounded-full border-2 border-white/50 flex items-center justify-center text-white hover:bg-aprolac-green hover:border-white hover:scale-110 transition-all duration-300 shadow-[0_0_30px_rgba(40,167,69,0.5)] cursor-pointer"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 sm:w-10 sm:h-10 ml-1">
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>

          {/* Capa 5: Hitbox Transparente para Móviles */}
          <button
            type="button"
            className="absolute inset-0 w-full h-full z-40 cursor-pointer bg-transparent appearance-none focus:outline-none [-webkit-tap-highlight-color:transparent]"
            onClick={() => setIsVideoModalOpen(true)}
            aria-label="Reproducir video promocional"
          />
        </motion.div>

        {/* Recomendación de orientación */}
        <div className="mb-10 md:hidden portrait:flex landscape:hidden justify-center mt-3 pointer-events-none">
          <div className="bg-gray-100 border border-gray-200 px-4 py-2 rounded-full flex items-center gap-2 shadow-sm">
            <Icon icon="mdi:phone-rotate-landscape" className="w-4 h-4 text-aprolac-green flex-shrink-0" />
            <span className="text-aprolac-text text-xs font-sans">
              Gira tu dispositivo para mejor experiencia
            </span>
          </div>
        </div>

        <div className="mb-20 md:hidden portrait:hidden landscape:flex" />
        <div className="mb-20 hidden md:block" />
 
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-aprolac-cream rounded-[2.5rem] p-6 md:p-12 border border-aprolac-border/50 relative overflow-hidden"
        >
          {/* Header del Visor con Título, Botones de Deslizamiento (Tabs) y Descarga */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-6 relative z-10">
            <div>
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                <h3 className="font-display font-bold text-2xl md:text-3xl text-aprolac-dark">
                  Plano de Exhibición
                </h3>
                <span className="text-xs font-bold bg-aprolac-green/10 text-aprolac-green px-3 py-1 rounded-full border border-aprolac-green/20">
                  {currentPlan.title}
                </span>
              </div>
              <p className="font-sans text-aprolac-text text-sm md:text-base">
                {currentPlan.description}
              </p>
            </div>

            <div className="flex items-center gap-3 w-full lg:w-auto justify-between lg:justify-end flex-wrap">
              {/* Botones de Selección / Pestañas Deslizantes */}
              <div className="flex items-center gap-1.5 bg-white p-1.5 rounded-xl border border-gray-200 shadow-xs">
                {pdfPlans.map((plan, index) => (
                  <button
                    key={plan.id}
                    onClick={() => setCurrentPdfSlide(index as 0 | 1)}
                    className={`px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-lg text-[10px] sm:text-xs md:text-sm font-bold transition-all flex items-center gap-1 sm:gap-1.5 cursor-pointer ${
                      currentPdfSlide === index
                        ? 'bg-aprolac-green text-white shadow-xs'
                        : 'text-gray-600 hover:text-aprolac-dark hover:bg-gray-50'
                    }`}
                  >
                    <Icon icon={index === 0 ? 'mdi:building' : 'mdi:sun-wireless'} className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    {index === 0 ? 'Plano Interior' : 'Plano Exterior'}
                  </button>
                ))}
              </div>

              {/* Botón de Descarga del PDF Actual */}
              <a
                href={currentPlan.pdf}
                download={currentPlan.downloadName}
                onClick={() => showToast(`¡Descarga iniciada! El ${currentPlan.title} se guardará en tu dispositivo.`)}
                className="bg-white border border-gray-200 text-aprolac-dark font-sans font-semibold py-2.5 px-5 rounded-xl hover:border-aprolac-green hover:text-aprolac-green transition-colors flex items-center gap-2 shadow-xs focus:outline-none text-xs md:text-sm"
              >
                <Icon icon="mdi:download" className="w-4 h-4" />
                Descargar Plano PDF
              </a>
            </div>
          </div>

          {/* Contenedor del Visor con Flechas de Navegación Lateral (Solo en Escritorio/Laptop) y Animación */}
          <div className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden shadow-inner border border-white bg-gray-100 group">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPlan.id}
                initial={{ opacity: 0, scale: 0.985, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.985, y: -8 }}
                transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
                className="relative w-full h-full"
              >
                <Image
                  src={currentPlan.image}
                  alt={`Distribución de ${currentPlan.title}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 90vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-1000"
                  priority
                />

                <a
                  href={currentPlan.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => showToast(`Abriendo ${currentPlan.title} en una nueva pestaña...`, 'info')}
                  className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100"
                >
                  <span className="bg-white text-aprolac-dark px-5 py-2.5 rounded-xl shadow-lg font-semibold flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 text-sm">
                    <Icon icon="mdi:eye" className="w-5 h-5 text-aprolac-green" />
                    Ver {currentPlan.title} en PDF
                  </span>
                </a>
              </motion.div>
            </AnimatePresence>

            {/* Flecha Izquierda para Deslizar (Oculta en móvil) */}
            <button
              onClick={() => setCurrentPdfSlide(currentPdfSlide === 0 ? 1 : 0)}
              aria-label="Plano anterior"
              className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/90 hover:bg-white text-aprolac-dark rounded-full shadow-lg items-center justify-center transition-all hover:scale-110 cursor-pointer z-20"
            >
              <Icon icon="mdi:chevron-left" className="w-7 h-7" />
            </button>

            {/* Flecha Derecha para Deslizar (Oculta en móvil) */}
            <button
              onClick={() => setCurrentPdfSlide(currentPdfSlide === 0 ? 1 : 0)}
              aria-label="Plano siguiente"
              className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/90 hover:bg-white text-aprolac-dark rounded-full shadow-lg items-center justify-center transition-all hover:scale-110 cursor-pointer z-20"
            >
              <Icon icon="mdi:chevron-right" className="w-7 h-7" />
            </button>

            {/* Indicadores de Puntos en la parte inferior */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full z-20">
              {pdfPlans.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPdfSlide(index as 0 | 1)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    currentPdfSlide === index ? 'w-6 bg-aprolac-green' : 'w-2 bg-white/60 hover:bg-white'
                  }`}
                  aria-label={`Ir al plano ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </motion.div>
        <div className="w-full h-px bg-gray-200 mb-16 mt-16"></div>
 
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-10 bg-white rounded-[2.5rem] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl border border-gray-100 relative overflow-hidden"
        >

          
          <div className="absolute top-0 right-0 -mt-10 -mr-10 opacity-[0.03] pointer-events-none">
            <Icon icon="mdi:texture-box" className="w-64 h-64 text-aprolac-dark" />
          </div>

          <div className="text-center md:text-left relative z-10">
            <div className="inline-flex items-center gap-2 bg-aprolac-green/10 px-3 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-4 border border-aprolac-green/20 text-aprolac-green">
              <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse"></span>
              Stands Disponibles
            </div>
            <h3 className="font-display text-aprolac-dark font-bold text-2xl md:text-4xl lg:text-5xl mb-4 leading-tight">
              ¿Listo para ser parte del nuevo<br className="hidden md:block" />modelo productivo?
            </h3>
            <p className="font-sans text-aprolac-text max-w-xl text-sm md:text-base leading-relaxed">
              Asegura tu lugar en el evento que activará la transformación del sector lácteo. Conéctate con proveedores certificados, talento calificado y oportunidades de financiamiento.
            </p>
          </div>

          <div className="relative z-10 shrink-0">
            <Link
              href="/Map"
              className="bg-aprolac-green text-sm  text-white border-2 border-transparent font-bold font-sans px-8 py-5 rounded-2xl flex items-center gap-3 hover:bg-[#0a5c3e] hover:scale-105 hover:shadow-[0_10px_25px_rgba(40,167,69,0.3)] transition-all duration-300 sm:text-lg group"
            >
              Ir al Plano Interactivo
              <Icon icon="mdi:arrow-right" className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>
      

        {/* Video Modal */}
        <AnimatePresence>
          {isVideoModalOpen && (
            <VideoModal onClose={handleCloseVideoModal} />
          )}
        </AnimatePresence>

        {/* ✅ FIX: onClose usa handleCloseToast con useCallback para referencia estable */}
        <Toast
          isVisible={toast.isVisible}
          message={toast.message}
          type={toast.type}
          onClose={handleCloseToast}
        />

      </div>
    </section>
  );
};

export default ExpoSection;