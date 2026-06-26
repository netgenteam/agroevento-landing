'use client';
import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';

  // Bloquear el scroll del body cuando el menú móvil está abierto
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [menuOpen]);

  const navLinks = [
    { name: 'Quiénes Somos', href: '#quienes-somos', icon: 'mdi:account-group-outline' },
    { name: 'Expo', href: '#expo', icon: 'mdi:bullhorn-outline' },
    { name: 'Actividades', href: '#actividades', icon: 'mdi:calendar-text-outline' },
    { name: 'Solicitudes', href: '#stands', icon: 'mdi:clipboard-text-outline' },
    { name: 'FAQ', href: '#faq', icon: 'mdi:help-circle-outline' },
  ];

  return (
    <>
      <header className="fixed top-0 w-full z-50 bg-white shadow-sm py-4 lg:py-5">
        <nav className="max-w-7xl mx-auto px-4 lg:px-6 flex items-center justify-between gap-4">
          
          {/* IZQUIERDA — Logos juntos (Visible en todas las pantallas) */}
          <div className="relative z-[60] flex items-center gap-3 lg:gap-4 shrink-0">
            {/* Logo APROLAC */}
            <a href={isHome ? '#inicio' : '/#inicio'} className="flex items-center shrink-0">
              <Image
                src="/logo completo color.png"
                alt="APROLAC Logo"
                width={160}
                height={68}
                className="h-8 lg:h-10 w-auto object-contain rounded"
                priority
              />
            </a>

            {/* Línea divisoria */}
            <div className="w-[1px] h-7 lg:h-9 bg-gray-300"></div>

            {/* NUEVO LOGO EXPO */}
            <div className="flex items-center shrink-0">
              <Image
                src="/LOGO_EXPO.png"
                alt="Expo Logo"
                width={160}
                height={68}
                // Hacemos que tenga la misma altura que el de Aprolac (h-8 en móvil, h-10 en desktop)
                className="h-10 lg:h-12 w-auto object-contain"
                priority
              />
            </div>
          </div>

          {/* CENTRO — Nav links (desktop) */}
          <ul className="hidden xl:flex items-center gap-6 lg:gap-8 flex-grow justify-center">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={isHome ? link.href : `/${link.href}`}
                  className="group relative flex items-center gap-2 px-2 py-1 font-sans text-[11px] lg:text-xs font-bold tracking-widest uppercase text-aprolac-text hover:text-aprolac-green transition-colors duration-300"
                >
                  <Icon
                    icon={link.icon}
                    className="w-4 h-4 lg:w-5 lg:h-5 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:scale-110 group-hover:text-aprolac-green"
                  />
                  <span className="relative">
                    {link.name}
                    <span className="absolute -bottom-1.5 left-0 h-[2px] w-0 bg-aprolac-green transition-all duration-300 rounded-full group-hover:w-full"></span>
                  </span>
                </a>
              </li>
            ))}
          </ul>

          {/* DERECHA — CTA + Hamburguesa mobile (Ya sin logo) */}
          <div className="flex items-center gap-3 lg:gap-5 shrink-0">
            <a
              href={isHome ? '#contacto' : '/#contacto'}
              className="hidden lg:flex items-center gap-2 bg-aprolac-green text-white rounded-lg px-5 py-2 text-sm font-semibold hover:bg-[#0a5c3e] transition-all duration-300 hover:-translate-y-0.5"
            >
              <Icon icon="mdi:email-outline" className="w-5 h-5" />
              Contacto
            </a>
            
            <button
              className="xl:hidden text-aprolac-dark p-1 transition-colors hover:text-aprolac-green relative z-[60]"
              onClick={() => setMenuOpen(true)}
            >
              <Icon icon="mdi:menu" height="28" className="text-aprolac-dark" />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setMenuOpen(false);
              }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] cursor-pointer"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[280px] bg-white z-[70] p-8 shadow-2xl flex flex-col border-l border-gray-100"
            >
              <div className="flex justify-end mb-12">
                <button
                  onClick={() => setMenuOpen(false)}
                  className="text-aprolac-text hover:text-aprolac-green transition-colors"
                  aria-label="Cerrar menú"
                >
                  <Icon icon="mdi:close" className="w-8 h-8" />
                </button>
              </div>
              <nav className="flex flex-col gap-8">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={isHome ? link.href : `/${link.href}`}
                    onClick={() => setMenuOpen(false)}
                    className="group flex items-center gap-4 text-sm font-bold text-aprolac-text hover:text-aprolac-green tracking-widest uppercase transition-colors duration-300"
                  >
                    <Icon
                      icon={link.icon}
                      className="w-6 h-6 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:scale-110 group-hover:text-aprolac-green"
                    />
                    <span>{link.name}</span>
                  </a>
                ))}

                <div className="pt-8 border-t border-gray-100">
                  <a
                    href={isHome ? '#contacto' : '/#contacto'}
                    className="flex items-center justify-center gap-2 w-full text-center bg-aprolac-green text-white rounded-lg py-3 font-semibold uppercase tracking-widest text-sm transition-colors hover:bg-[#0a5c3e]"
                    onClick={() => setMenuOpen(false)}
                  >
                    <Icon icon="mdi:email-outline" className="w-5 h-5" />
                    Contacto
                  </a>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;