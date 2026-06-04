import Header from '@/components/Header';
import Hero from '@/components/Hero';
import QuienesSomos from '@/components/QuienesSomos';
import CommitmentSection from '@/components/CommitmentSection';
import ExpoSection from '@/components/ExpoSection';
import Stands from '@/components/Stand';
import ExperiencesSlider from "@/components/ExperiencesSlider"; 
import EventActivities from '@/components/EventActivities';// <-- Importación del Slider
import FAQ from '@/components/FAQ';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import FloatingButton from '@/components/FloatingButton';
import FormLinksSection from '@/components/FormLinksSection'; 


// <-- Importamos el botón

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-aprolac-cream relative">
      <Header />
      
      <main className="flex-grow">
        <Hero />
        <QuienesSomos />
        
        <CommitmentSection />
        
        <ExpoSection />

         {/* Separador y Slider de Experiencias */}
        <div className="mt-10 w-full">
          <div className="w-full h-px bg-gray-200 mb-16"></div> {/* Línea divisoria sutil */}
          <EventActivities />
        </div>

       
        
        {/* <Stands /> */}
        <FormLinksSection />

        
        
        
        <ExperiencesSlider />
        <FAQ />
        <Contact />
        
      </main>
      
      <Footer />

      {/* Botón Flotante agregado aquí, fuera del flujo normal para que sobreponga todo */}
      <FloatingButton />
    </div>
  );
}