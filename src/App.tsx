import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";

import { TooltipProvider } from "@/components/ui/tooltip";

import Index from "./pages/Index";
import About from "./pages/About";
import ProductDetails from "./pages/ProductDetails";
import Blog from "./pages/Blog";
import NavBar from "./components/Navbar";
import ListingsPage from "./pages/propertypage";
import Contact from "./pages/Contact";

const queryClient = new QueryClient();

const AppLayout = ({ children }: { children: React.ReactNode }) => {


  return (
    <>
    <NavBar />
      {children}
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
          <HashRouter>
            <AppLayout>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<About />} />
                <Route path="/property" element={<ListingsPage />} />
                <Route path="/property/:id" element={<ProductDetails />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </AppLayout>
          </HashRouter>
      </TooltipProvider>
  </QueryClientProvider>
);

export default App;