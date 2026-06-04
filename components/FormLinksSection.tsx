"use client";

import { motion, Variants } from "framer-motion";
import { 
  CalendarDays, 
  Store, 
  Handshake, 
  Ticket, 
  MicVocal, 
  Utensils, 
  ChefHat, 
  Briefcase,
  Users,
  ArrowRight,
  ChevronRight
} from "lucide-react";
import Link from "next/link";

// 1. Enlace VIP (Destacado)
const MEETING_LINK = {
  title: "Agendar Reunión Comercial",
  description: "Reserva un espacio de 45 minutos con nuestro equipo para discutir oportunidades de negocio y alianzas estratégicas.",
  icon: CalendarDays,
  link: "https://calendly.com/info-agronegocioslacteos/45min",
};

// 2. Directorio de Formularios (Grid Compacto)
const REGISTRATION_LINKS = [
  {
    id: "stand",
    title: "Quiero tener un Stand",
    icon: Store,
    link: "https://docs.google.com/forms/d/e/1FAIpQLSdEO379-5tyCe6zMwAjyNurs-JevV8aWUZAYN6HY60z7ItUrQ/viewform?usp=publish-editor",
  },
  {
    id: "patrocinante",
    title: "Quiero ser Patrocinante",
    icon: Handshake,
    link: "https://docs.google.com/forms/d/e/1FAIpQLSc74tyjdDJCWNQwg7SMp55NuopC5fKZ9IfUkFg9Yocqzt4jtA/viewform?usp=publish-editor",
  },
  {
    id: "visitante",
    title: "Registro de Visitante",
    icon: Ticket,
    link: "https://docs.google.com/forms/d/e/1FAIpQLSdeDrutQgBnNWdQvs9A1tnxJGJbgttHjFBQH74QuaUntfC0GA/viewform?usp=publish-editor",
  },
  {
    id: "ruedas-negocio",
    title: "Participar en Ruedas de Negocio",
    icon: Briefcase,
    link: "https://docs.google.com/forms/d/e/1FAIpQLSdknxghRw0XKfaGqotQLUQBxT0voGDDwCcKY5JUopNqRqfsdg/viewform?usp=publish-editor",
  },
  {
    id: "conferencias",
    title: "Asistir a las Conferencias",
    icon: Users,
    link: "https://docs.google.com/forms/d/e/1FAIpQLSeblzmTbnM4AkLqUZEP3Hmz3TYj8s2JGF8EkctzArjQt6nOXA/viewform?usp=header",
  },
  {
    id: "conferencista",
    title: "Postularse como Conferencista",
    icon: MicVocal,
    link: "https://docs.google.com/forms/d/e/1FAIpQLSeM9zq_jEscWVskaPASTdKccmEItidk6UgM8Amz9ClnjRjgag/viewform?usp=publish-editor",
  },
  {
    id: "cata",
    title: "Participar en la Cata",
    icon: Utensils,
    link: "https://docs.google.com/forms/d/e/1FAIpQLSc_pV1WVB6rmAcBIuNgCVez1-GbyN54hugXkgxhQ_XxpombzQ/viewform?usp=publish-editor",
  },
  {
    id: "aprender",
    title: "Cursos de Lácteos y Quesos",
    icon: ChefHat,
    link: "https://docs.google.com/forms/d/e/1FAIpQLScOdObwstZcXeL0fRmXhuAXVpXYC45Gx8mQHGFpYRf9uy5xQQ/viewform?usp=publish-editor",
  },
];

// --- Variantes de animación para la entrada en cascada ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 300, damping: 24 } 
  }
};

export default function FormLinksSection() {
  return (
    <section id="stands" className="py-24 bg-[#f8f9fa] overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        
        {/* Encabezado */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
              Gestión y Solicitudes
            </h2>
            <p className="text-gray-500 text-lg">
              Selecciona el área de tu interés para acceder a los registros oficiales del evento.
            </p>
          </motion.div>
        </div>

        {/* 1. Banner Destacado (Calendly) VIP - Totalmente Responsive */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          whileHover={{ y: -4 }}
          whileTap={{ scale: 0.98 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-8"
        >
          <Link href={MEETING_LINK.link} target="_blank" rel="noopener noreferrer" className="block outline-none group">
            {/* Fondo y estructura general adaptada para móvil (flex-col) y escritorio (lg:flex-row) */}
            <div className="bg-gradient-to-br from-aprolac-green to-[#0a3a25] rounded-3xl p-6 sm:p-8 md:p-10 flex flex-col lg:flex-row items-center justify-between text-center lg:text-left gap-6 lg:gap-8 shadow-2xl shadow-aprolac-green/20 relative overflow-hidden border border-white/10">
              
              {/* Efectos de luz "Glow" de fondo */}
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 lg:group-hover:bg-white/10 transition-colors duration-700 pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-black/10 rounded-full blur-[60px] translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>
              
              {/* Contenido Izquierdo (Ícono + Textos) centrados en móvil */}
              <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-6 relative z-10 w-full lg:w-auto">
                <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 lg:group-hover:scale-110 lg:group-hover:rotate-3 lg:group-hover:bg-white/20 transition-all duration-500 shrink-0 shadow-inner">
                  <MEETING_LINK.icon className="w-8 h-8 text-white" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-2">
                    {MEETING_LINK.title}
                  </h3>
                  <p className="text-white/80 max-w-md mx-auto lg:mx-0 text-sm md:text-base leading-relaxed">
                    {MEETING_LINK.description}
                  </p>
                </div>
              </div>
              
              {/* Botón Derecho: 100% de ancho en móvil, se ajusta en escritorio */}
              <div className="relative z-10 w-full lg:w-auto flex mt-2 lg:mt-0">
                <div className="w-full lg:w-auto flex items-center justify-center gap-3 bg-white text-aprolac-green px-8 py-4 rounded-xl font-bold text-sm uppercase tracking-widest shadow-lg lg:group-hover:shadow-white/20 lg:group-hover:bg-gray-50 transition-all duration-300">
                  Agendar ahora
                  <ArrowRight className="w-5 h-5 lg:group-hover:translate-x-2 transition-transform duration-300" />
                </div>
              </div>

            </div>
          </Link>
        </motion.div>

        {/* 2. Grid de Formularios Compactos - Coloreados en móvil/tablet */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
        >
          {REGISTRATION_LINKS.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div key={item.id} variants={itemVariants} whileTap={{ scale: 0.98 }}>
                <Link href={item.link} target="_blank" rel="noopener noreferrer" className="block outline-none group h-full">
                  
                  {/* Tarjeta: Borde verde en móvil/tablet, borde gris en escritorio (hasta el hover) */}
                  <div className="relative bg-aprolac-green/[0.02] lg:bg-white p-5 rounded-2xl border border-aprolac-green/30 lg:border-gray-100 flex items-center justify-between gap-4 lg:hover:border-aprolac-green/40 shadow-sm lg:shadow-none lg:hover:shadow-xl lg:hover:shadow-aprolac-green/5 transition-all duration-500 overflow-hidden">
                    
                    {/* Contenedor Izquierdo (Ícono + Texto) */}
                    <div className="flex items-center gap-5 relative z-10">
                      
                      {/* Ícono: Fondo verde sólido en móvil. Gris en escritorio (hasta el hover) */}
                      <div className="bg-aprolac-green text-white lg:bg-gray-50 lg:text-gray-400 p-3.5 rounded-xl lg:group-hover:bg-aprolac-green lg:group-hover:text-white transition-all duration-500 lg:group-hover:scale-110 lg:group-hover:-rotate-3 shrink-0 shadow-md lg:shadow-sm lg:group-hover:shadow-md">
                        <Icon className="w-5 h-5" strokeWidth={2} />
                      </div>
                      
                      {/* Texto: Oscuro en móvil, gris en escritorio (hasta el hover) */}
                      <h3 className="font-bold text-gray-900 lg:text-gray-600 lg:group-hover:text-gray-900 lg:group-hover:translate-x-1 transition-all duration-300 text-sm sm:text-base">
                        {item.title}
                      </h3>
                    </div>

                    {/* Flecha Derecha: Verde y desplazada en móvil. Gris en escritorio (hasta el hover) */}
                    <div className="relative z-10 text-aprolac-green translate-x-1 lg:text-gray-300 lg:translate-x-0 lg:group-hover:text-aprolac-green lg:group-hover:translate-x-1 transition-all duration-300 shrink-0">
                      <ChevronRight className="w-6 h-6" strokeWidth={2} />
                    </div>

                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}