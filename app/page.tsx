import Header from '@/components/Header';
import Hero from '@/components/Hero';
import QuienesSomos from '@/components/QuienesSomos';
import CommitmentSection from '@/components/CommitmentSection';
import Stands from '@/components/Stand'; // <-- Importamos el componente Stands

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <Header />
      <Hero />
      
      <QuienesSomos />
      
      <CommitmentSection />

      <section id="Expo" className="h-screen bg-white flex items-center justify-center border-t border-aprolac-border">
        <h2 className="text-4xl font-display font-bold text-aprolac-dark">Expo</h2>
      </section>
      
      {/* Reemplazamos el placeholder por nuestro nuevo componente interactivo */}
      <Stands />
      
      <section id="actividades" className="h-screen bg-aprolac-cream flex items-center justify-center border-t border-aprolac-border">
        <h2 className="text-4xl font-display font-bold text-aprolac-dark">Actividades</h2>
      </section>
      
      <section id="faq" className="h-screen bg-white flex items-center justify-center border-t border-aprolac-border">
        <h2 className="text-4xl font-display font-bold text-aprolac-dark">FAQ</h2>
      </section>

      <section id="contacto" className="h-screen bg-aprolac-cream flex items-center justify-center border-t border-aprolac-border">
        <h2 className="text-4xl font-display font-bold text-aprolac-dark">Contacto</h2>
      </section>
    </main>
  );
}