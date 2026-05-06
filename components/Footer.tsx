import { Icon } from '@iconify/react';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="bg-aprolac-dark text-white pt-20 pb-8">
      {/* Grid Superior */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-12 border-b border-white/10 pb-12">

        {/* Columna 1: Marca Institucional */}
        <div>
          <p className="font-display text-2xl text-aprolac-green font-bold tracking-widest uppercase">
            APROLAC
          </p>
          <p className="font-sans text-gray-400 text-sm mt-4 leading-relaxed">
            Asociación de Productores Lácteos del Estado Bolívar. Liderando el ecosistema agroindustrial y la cadena de frío a nivel nacional.
          </p>
          <p className="font-sans font-bold text-white mt-4">
            RIF: J-50781399-1
          </p>
        </div>

        {/* Columna 2: Navegación Rápida */}
        <div>
          <p className="font-display text-lg mb-6 text-white font-semibold">Enlaces Rápidos</p>
          <div className="flex flex-col gap-3 font-sans text-gray-400 text-sm">
            <a href="#inicio" className="flex items-center gap-2 hover:text-aprolac-green transition-colors w-fit group">
              <Icon icon="mdi:home-outline" className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Inicio
            </a>
            <a href="#quienes-somos" className="flex items-center gap-2 hover:text-aprolac-green transition-colors w-fit group">
              <Icon icon="mdi:account-group-outline" className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Quiénes Somos
            </a>
            <a href="#expo" className="flex items-center gap-2 hover:text-aprolac-green transition-colors w-fit group">
              <Icon icon="mdi:bullhorn-outline" className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Expo
            </a>
            <a href="#stands" className="flex items-center gap-2 hover:text-aprolac-green transition-colors w-fit group">
              <Icon icon="mdi:storefront-outline" className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Stands
            </a>
            <a href="#actividades" className="flex items-center gap-2 hover:text-aprolac-green transition-colors w-fit group">
              <Icon icon="mdi:calendar-text-outline" className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Actividades
            </a>
            <a href="#faq" className="flex items-center gap-2 hover:text-aprolac-green transition-colors w-fit group">
              <Icon icon="mdi:help-circle-outline" className="w-5 h-5 group-hover:scale-110 transition-transform" />
              FAQ
            </a>
          </div>
        </div>

        {/* Columna 3: Contacto Oficial */}
        <div>
          <p className="font-display text-lg mb-6 text-white font-semibold">Contacto B2B</p>
          <div className="flex flex-col gap-4 font-sans text-gray-400 text-sm">
            <div className="flex items-start gap-3">
              <Icon icon="mdi:map-marker" className="w-5 h-5 text-aprolac-green shrink-0 mt-0.5" />
              <span>Ciudad Guayana, Estado Bolívar, Venezuela</span>
            </div>
            <div className="flex items-center gap-3">
              <Icon icon="mdi:phone" className="w-5 h-5 text-aprolac-green shrink-0" />
              <span>+58 424 000 0000</span>
            </div>
            <div className="flex items-center gap-3">
              <Icon icon="mdi:email" className="w-5 h-5 text-aprolac-green shrink-0" />
              <a href="mailto:contacto@aprolac.org" className="hover:text-white transition-colors">
                contacto@aprolac.org
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Icon icon="mdi:instagram" className="w-5 h-5 text-aprolac-green shrink-0" />
              <a href="https://www.instagram.com/aprolacbolivar/?hl=es" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                @aprolacbolivar
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* Grid Inferior: Créditos */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-base text-gray-500 font-sans text-center md:text-left">
        <p>
          © 2026 APROLAC. Todos los derechos reservados.
        </p>
        <p className="flex items-center gap-1">
          Diseñado y desarrollado por{' '}
          <a
            href="https://netgenteam.com/"
            className="inline-flex items-center gap-1 font-bold hover:text-white cursor-pointer transition-colors"
            target="_blank"
          >
            <Image
              src="/image.png"
              alt="NetGen Logo"
              width={24}
              height={24}
              className="rounded-lg object-contain"
            />
            NetGen
          </a>.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
