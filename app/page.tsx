import Header from '@/components/Header';
import Hero from '@/components/Hero';
import QuienesSomos from '@/components/QuienesSomos';

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <Header />
      <Hero />
      
      <QuienesSomos />
      
      <section id="stands" className="h-screen bg-white flex items-center justify-center border-t border-aprolac-border">
        <h2 className="text-4xl font-display font-bold text-aprolac-dark">Stands</h2>
      </section>
      
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
