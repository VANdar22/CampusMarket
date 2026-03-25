import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";

import Index from "./pages/Index";
import Auth from "./pages/Auth";
import ProductDetails from "./pages/ProductDetails";
import Post from "./pages/PostProduct";
import Messages from "./pages/Messages";
import Chat from "./pages/Chat";
import Profile from "./pages/Profile";
import MyListings from "./pages/MyListings";
import EditProduct from "./pages/EditProduct";
import NotFound from "./pages/NotFound";

import NavBar from "./components/Navbar"; // full-featured
import GuestNavBar from "./components/GuestNavbar"; // simpler NavBar for signed-out users

const hideGuestNav = location.pathname === "/auth";

const queryClient = new QueryClient();

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();

  return (
    <>
    {user && <NavBar />}
    {!user && !hideGuestNav && <GuestNavBar />}
    {children}
  </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <HashRouter>
          <AppLayout>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/post-product" element={<Post />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/chat/:id" element={<Chat />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/my-listings" element={<MyListings />} />
              <Route path="/edit-product/:id" element={<EditProduct />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AppLayout>
        </HashRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;