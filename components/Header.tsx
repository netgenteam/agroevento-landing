'use client';
import { useState } from 'react';
import { Icon } from '@iconify/react';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Quiénes Somos', href: '#quienes-somos', icon: 'mdi:account-group-outline' },
    { name: 'Stands', href: '#stands', icon: 'mdi:storefront-outline' },
    { name: 'Actividades', href: '#actividades', icon: 'mdi:calendar-text-outline' },
    { name: 'FAQ', href: '#faq', icon: 'mdi:help-circle-outline' },
  ];

  return (
    <header 
      className="fixed top-0 w-full z-50 bg-white shadow-sm py-5"
    >
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* IZQUIERDA — Logo */}
        <a href="/" className="font-display font-bold text-xl tracking-[0.25em] text-aprolac-green">
          APROLAC
        </a>

        {/* CENTRO — Nav links (desktop) */}
        <ul className="hidden md:flex items-center gap-6 lg:gap-8">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a 
                href={link.href}
                className="group relative flex items-center gap-2 px-2 py-1 font-sans text-xs font-bold tracking-widest uppercase text-aprolac-text hover:text-aprolac-green transition-colors duration-300"
              >
                <Icon
                  icon={link.icon}
                  className="w-5 h-5 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:scale-110 group-hover:text-aprolac-green"
                />
                <span className="relative">
                  {link.name}
                  <span className="absolute -bottom-1.5 left-0 h-[2px] w-0 bg-aprolac-green transition-all duration-300 rounded-full group-hover:w-full"></span>
                </span>
              </a>
            </li>
          ))}
        </ul>

        {/* DERECHA — CTA + Hamburguesa mobile */}
        <div className="flex items-center gap-4">
          <a 
            href="#contacto"
            className="hidden md:flex items-center gap-2 bg-aprolac-green text-white rounded-lg px-6 py-2 text-sm font-semibold hover:bg-[#0a5c3e] transition-all duration-300 hover:-translate-y-0.5"
          >
            <Icon icon="mdi:email-outline" className="w-5 h-5" />
            Contacto
          </a>
          <button 
            className="md:hidden text-aprolac-dark p-1 transition-colors hover:text-aprolac-green"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {/* Llamada corregida a los íconos de Iconify */}
            {menuOpen ? (
              <Icon icon="mdi:close" height="28" />
            ) : (
              <Icon icon="mdi:menu" height="28" className="text-aprolac-dark" />
            )}
          </button>
        </div>
      </nav>

      {/* MOBILE MENU — dropdown */}
      <div 
        className={`md:hidden absolute top-full left-0 w-full bg-white shadow-xl transition-all duration-300 overflow-hidden ${
          menuOpen ? 'max-h-80 border-t border-gray-100' : 'max-h-0'
        }`}
      >
        <ul className="flex flex-col p-6 gap-6">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a 
                href={link.href}
                className="group flex items-center gap-4 font-sans text-sm font-bold tracking-widest uppercase text-aprolac-text hover:text-aprolac-green transition-colors duration-300"
                onClick={() => setMenuOpen(false)}
              >
                <Icon
                  icon={link.icon}
                  className="w-6 h-6 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:scale-110 group-hover:text-aprolac-green"
                />
                {link.name}
              </a>
            </li>
          ))}
          <li className="pt-2">
            <a 
              href="#contacto"
              className="flex items-center justify-center gap-2 w-full text-center bg-aprolac-green text-white rounded-lg py-3 font-semibold uppercase tracking-widest text-sm transition-colors hover:bg-[#0a5c3e]"
              onClick={() => setMenuOpen(false)}
            >
              <Icon icon="mdi:email-outline" className="w-5 h-5" />
              Contacto
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
