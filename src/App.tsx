
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as SonnerToaster } from 'sonner';
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import ShopNow from './pages/ShopNow';
import Contact from './pages/Contact';
import SocialPurpose from './pages/SocialPurpose';
import BoxDetail from './pages/BoxDetail';
import Checkout from './pages/Checkout';
import MyAccount from './pages/MyAccount';
import ShopClothing from './pages/ShopClothing';
import Events from './pages/Events';
import CustomerSupport from './pages/CustomerSupport';
import Blog from './pages/Blog';
import DonationProgram from './pages/DonationProgram';
import Membership from './pages/Membership';
import StyleQuiz from './pages/StyleQuiz';
import HowItWorks from './pages/HowItWorks';
import Auth from './pages/Auth';
import AdminInventory from './pages/AdminInventory';
import AdminBanners from './pages/AdminBanners';
import AdminDashboard from './pages/AdminDashboard';
import AdminAnalytics from './pages/AdminAnalytics';
import AdminLogin from './pages/AdminLogin';
import AdminCustomers from './pages/AdminCustomers';
import AdminOrders from './pages/AdminOrders';
import AdminSettings from './pages/AdminSettings';
import { AuthProvider } from './contexts/AuthContext';
import { ProductProvider } from './contexts/ProductContext';
import { CartProvider } from './contexts/CartContext';
import ProtectedRoute from './components/admin/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <ProductProvider>
          <Router>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/shop-now" element={<ShopNow />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/shop-clothing" element={<ShopClothing />} />
            <Route path="/social-purpose" element={<SocialPurpose />} />
            <Route path="/box/:id" element={<BoxDetail />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/my-account" element={<MyAccount />} />
            <Route path="/events" element={<Events />} />
            <Route path="/customer-support" element={<CustomerSupport />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/donation-program" element={<DonationProgram />} />
            <Route path="/membership" element={<Membership />} />
            <Route path="/style-quiz" element={<StyleQuiz />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin/inventory" element={
              <ProtectedRoute>
                <AdminInventory />
              </ProtectedRoute>
            } />
            <Route path="/admin/banners" element={
              <ProtectedRoute>
                <AdminBanners />
              </ProtectedRoute>
            } />
            <Route path="/admin/analytics" element={
              <ProtectedRoute>
                <AdminAnalytics />
              </ProtectedRoute>
            } />
            <Route path="/admin/customers" element={
              <ProtectedRoute>
                <AdminCustomers />
              </ProtectedRoute>
            } />
            <Route path="/admin/orders" element={
              <ProtectedRoute>
                <AdminOrders />
              </ProtectedRoute>
            } />
            <Route path="/admin/settings" element={
              <ProtectedRoute>
                <AdminSettings />
              </ProtectedRoute>
            } />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
          
          <Toaster />
          <SonnerToaster position="top-right" />
        </Router>
        </ProductProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
