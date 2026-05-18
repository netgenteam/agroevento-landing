'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastProps {
  message: string;
  type: ToastType;
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

const toastStyles = {
  success: {
    bg: 'bg-[#156D49]',
    bar: 'bg-[#0E4A32]',
    icon: 'mdi:check-circle-outline',
  },
  error: {
    bg: 'bg-[#C52233]',
    bar: 'bg-[#8B1824]',
    icon: 'mdi:close-circle-outline',
  },
  warning: {
    bg: 'bg-[#9E5400]',
    bar: 'bg-[#6D3A00]',
    icon: 'mdi:alert-outline',
  },
  info: {
    bg: 'bg-[#0056B3]',
    bar: 'bg-[#003D80]',
    icon: 'mdi:information-outline',
  },
};

export default function Toast({ message, type, isVisible, onClose, duration = 3000 }: ToastProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose, duration]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
          // Desktop: Top Right, Mobile: Top Center
          className="fixed top-6 right-6 left-6 md:left-auto md:w-auto z-[200] flex justify-center md:justify-end pointer-events-none"
        >
          <div 
            className={`
              ${toastStyles[type].bg} 
              pointer-events-auto
              relative
              flex items-center gap-4 
              px-6 py-4 
              rounded-xl 
              shadow-2xl 
              min-w-[280px] md:min-w-[340px]
              max-w-md
              overflow-hidden
              text-white
            `}
          >
            {/* Icono Principal */}
            <div className="flex-shrink-0">
              <Icon icon={toastStyles[type].icon} className="w-6 h-6" />
            </div>

            {/* Mensaje */}
            <p className="flex-grow font-sans font-medium text-sm md:text-base leading-tight">
              {message}
            </p>

            {/* Botón Cerrar */}
            <button 
              onClick={onClose}
              className="flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity p-1"
            >
              <Icon icon="mdi:close" className="w-5 h-5" />
            </button>

            {/* Barra Inferior (Diseño de la imagen) */}
            <div className={`absolute bottom-0 left-0 h-1.5 w-full flex`}>
              <div className={`h-full w-1/2 opacity-30 ${toastStyles[type].bar}`} />
              <div className={`h-full w-1/2 ${toastStyles[type].bar}`} />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
