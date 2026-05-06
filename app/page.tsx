import Header from '@/components/Header';
import Hero from '@/components/Hero';
import QuienesSomos from '@/components/QuienesSomos';
import CommitmentSection from '@/components/CommitmentSection';
import ExpoSection from '@/components/ExpoSection';
import Stands from '@/components/Stand';
import EventActivities from '@/components/EventActivities';
import FAQ from '@/components/FAQ';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import FloatingButton from '@/components/FloatingButton'; 
import InteractiveMap from "@/components/InteractiveMap"
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
        
        <Stands />
        
        <EventActivities />
        <FAQ />
        <Contact />
        <InteractiveMap/>
      </main>
      
      <Footer />

      {/* Botón Flotante agregado aquí, fuera del flujo normal para que sobreponga todo */}
      <FloatingButton />
    </div>
  );
}