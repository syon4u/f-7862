
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import MyAccount from "./pages/MyAccount";
import ShopNow from "./pages/ShopNow";
import BoxDetail from "./pages/BoxDetail";
import ShopClothing from "./pages/ShopClothing";
import HowItWorks from "./pages/HowItWorks";
import SocialPurpose from "./pages/SocialPurpose";
import Contact from "./pages/Contact";
import StyleQuiz from "./pages/StyleQuiz";
import Checkout from "./pages/Checkout";
import NotFound from "./pages/NotFound";
import AdminInventory from "./pages/AdminInventory";
import AdminBanners from "./pages/AdminBanners";
import { ProductProvider } from "./contexts/ProductContext";
import { BannerProvider } from "./contexts/BannerContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ProductProvider>
        <BannerProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/my-account" element={<MyAccount />} />
              <Route path="/shop-now" element={<ShopNow />} />
              <Route path="/box/:id" element={<BoxDetail />} />
              <Route path="/shop-clothing" element={<ShopClothing />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/social-purpose" element={<SocialPurpose />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/style-quiz" element={<StyleQuiz />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/admin/inventory" element={<AdminInventory />} />
              <Route path="/admin/banners" element={<AdminBanners />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </BannerProvider>
      </ProductProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
