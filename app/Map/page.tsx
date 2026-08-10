import Header from "@/components/Header";
import Footer from "@/components/Footer";
import InteractiveFloorPlan from "@/components/InteractiveMap";

// Metadata para SEO de esta página específica
export const metadata = {
  title: "Plano Interactivo de Stands | Expo Agro Negocios Lácteos 2026",
  description: "Explora el plano interactivo de la Expo Agro Negocios Lácteos 2026 y reserva tu stand ideal directamente en línea.",
};

export default function PlanoPage() {
  return (
    <div className="min-h-screen flex flex-col bg-aprolac-cream relative">
      {/* Header en la parte superior */}
      <Header />
      
      {/* Contenedor principal con padding superior ajustado para la cabecera fija */}
      <main className="flex-grow pt-24 md:pt-28 lg:pt-28 pb-12"> 
        {/* Renderizamos el componente del mapa */}
        <InteractiveFloorPlan />
      </main>
      
      {/* Footer al final de la página */}
      <Footer />
    </div>
  );
}