
import React from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import AdminSidebar from './AdminSidebar';

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, title }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex flex-col md:flex-row">
        <AdminSidebar />
        <div className="flex-1 p-4">
          <div className="container mx-auto">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-tertiary bg-clip-text text-transparent mb-6">
              {title}
            </h1>
            {children}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AdminLayout;
