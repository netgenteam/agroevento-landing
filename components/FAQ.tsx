'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "¿Quiénes pueden participar como expositores o patrocinadores?",
    answer: "Empresas del sector agroindustrial, proveedores de tecnología láctea, instituciones financieras y corporaciones B2B interesadas en el mercado venezolano. El perfil está orientado a tomadores de decisiones y líderes industriales."
  },
  {
    question: "¿Cuáles son los requisitos para adquirir un Stand Comercial?",
    answer: "Es necesario completar el formulario de preventa, presentar el RIF jurídico y cumplir con los estándares de montaje técnico de la Expo. Ofrecemos diferentes niveles (Bronce, Plata, Oro y Platino) según la ubicación y dimensiones."
  },
  {
    question: "¿El evento está abierto al público general o es netamente B2B?",
    answer: "La Expo tiene un enfoque primordialmente B2B y técnico-corporativo. Sin embargo, se permite el acceso a estudiantes de agronomía e ingeniería de alimentos con acreditación previa para fomentar el relevo generacional del sector."
  },
  {
    question: "¿Cómo gestionan el acceso a las Rondas de Negocios?",
    answer: "Contamos con una plataforma digital de agendamiento donde expositores y visitantes profesionales pueden solicitar citas previas. Las rondas se llevan a cabo en una zona VIP diseñada para la privacidad y el cierre de acuerdos."
  },
  {
    question: "¿Existen beneficios o tarifas especiales para los socios productores de APROLAC?",
    answer: "Sí, todos los socios solventes de APROLAC cuentan con un descuento del 15% en la adquisición de stands y prioridad en la reserva de espacios destacados dentro de la zona comercial principal."
  },
  {
    question: "¿Dónde puedo descargar el dossier corporativo detallado?",
    answer: "El dossier completo con planos, tarifas y beneficios de patrocinio está disponible en el botón de 'Contacto' o puede solicitarlo directamente a través de nuestro WhatsApp oficial para recibir atención personalizada."
  }
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
        text: faq.answer,
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
