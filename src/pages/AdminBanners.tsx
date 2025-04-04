
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BannerManager from '../components/admin/BannerManager';

const AdminBanners = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 via-purple-50 to-pink-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-tertiary bg-clip-text text-transparent">Banner Management</h1>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6">
          <BannerManager />
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AdminBanners;
