'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';

interface FAQItem {
  question: string;
  answer: React.ReactNode;
  answerText?: string;
}

const faqs: FAQItem[] = [
  {
    question: "¿Quiénes pueden participar como expositores o patrocinadores?",
    answer: "Pueden participar empresas y productores del sector lácteo (ganaderos, procesadoras, marcas de quesos, etc.), proveedores de insumos químicos, maquinaria, genética animal, servicios financieros, y consultoras agroindustriales, además de empresas de servicios, alimentos y bebidas, entre otros."
  },
  {
    question: "¿Cuáles son los requisitos para adquirir un Stand Comercial?",
    answer: "Los interesados pueden completar el formulario de preventa, consultar a uno de nuestros asesores en el departamento de Comercialización, y realizar la reserva según el dossier de ventas."
  },
  {
    question: "¿La Expo es abierta al público general o es netamente B2B?",
    answer: "Es un evento híbrido. Cuenta con áreas de exhibición comercial y exposición ganadera abiertas al público interesado y zonas exclusivas de rondas de negocios, foros y conferencias,  diseñadas para perfiles B2B / B2C."
  },
  {
    question: "¿Dónde puedo descargar el dossier corporativo detallado?",
    answer: (
      <span>
        El dossier está disponible en la sección de descargas del sitio web oficial o puede solicitarse directamente a través del botón de <strong className="font-bold text-[#0F4A32]">Contacto</strong> en la plataforma.
      </span>
    ),
    answerText: "El dossier está disponible en la sección de descargas del sitio web oficial o puede solicitarse directamente a través del botón de Contacto en la plataforma."
  },
  {
    question: "¿Pueden asistir niños?",
    answer: "La familia completa puede asistir. El acceso a la exhibición comercial es totalmente gratuito, y pueden venir niños acompañados de sus representantes. Además, la Expo tendrá áreas dedicadas para los más pequeños de la familia."
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  /* JSON-LD FAQPage Schema */
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: typeof faq.answer === 'string' ? faq.answer : faq.answerText || '',
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <section id="faq" className="bg-aprolac-cream py-12 md:py-18">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        {/* Cabecera */}
        <div className="text-center mb-16">
          <h2 className="font-display font-bold text-4xl text-aprolac-green mb-4 ">
            Preguntas Frecuentes
          </h2>
          <p className="font-sans text-aprolac-text max-w-2xl mx-auto">
            Respuestas a las consultas más comunes sobre el evento, patrocinios y procesos logísticos para asegurar su participación exitosa.
          </p>
        </div>

        {/* Acordeón */}
        <div className="border-t border-aprolac-border">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-aprolac-border">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full cursor-pointer text-left flex justify-between items-center py-6 focus:outline-none group"
              >
                <span className={`font-display font-semibold text-lg transition-colors duration-300 ${openIndex === index ? 'text-aprolac-green' : 'text-aprolac-dark group-hover:text-aprolac-green'
                  }`}>
                  {faq.question}
                </span>
                <Icon
                  icon="mdi:chevron-down"
                  className={`w-6 h-6 transition-all duration-300 ${openIndex === index ? 'rotate-180 text-aprolac-green' : 'text-aprolac-dark'
                    }`}
                />
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <p className="font-sans text-aprolac-text leading-relaxed pb-6 pr-12">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
    </>
  );
};

export default FAQ;
