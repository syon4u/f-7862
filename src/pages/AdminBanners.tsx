
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BannerManager from '../components/admin/BannerManager';

const AdminBanners = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Banner Management</h1>
        </div>
        
        <BannerManager />
      </div>
      
      <Footer />
    </div>
  );
};

export default AdminBanners;
