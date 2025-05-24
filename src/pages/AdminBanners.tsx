
import React from 'react';
import BannerManager from '../components/admin/BannerManager';
import AdminLayout from '../components/admin/AdminLayout';
import { BannerProvider } from '../contexts/BannerContext';

const AdminBanners = () => {
  return (
    <BannerProvider>
      <AdminLayout title="Banner Management">
        <div className="bg-white rounded-xl shadow-md p-6">
          <BannerManager />
        </div>
      </AdminLayout>
    </BannerProvider>
  );
};

export default AdminBanners;
