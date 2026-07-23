import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Properties from "./pages/Properties";
import PropertyDetail from "./pages/PropertyDetail";
import PropertyListings from "./pages/PropertyListings";
import SolicitaInmueble from "./pages/SolicitaInmueble";
import Desarrollos from "./pages/Desarrollos";
import VenderPropiedad from "./pages/VenderPropiedad";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/desarrollos" element={<Desarrollos />} />
          <Route path="/vender-propiedad" element={<VenderPropiedad />} />
          <Route path="/propiedades" element={<Properties />} />
          <Route path="/propiedad/:id" element={<PropertyDetail />} />
          <Route path="/listings" element={<PropertyListings />} />
          <Route path="/solicita-inmueble" element={<SolicitaInmueble />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
