
import React from 'react';
import BannerManager from '../components/admin/BannerManager';
import AdminLayout from '../components/admin/AdminLayout';

const AdminBanners = () => {
  return (
    <AdminLayout title="Banner Management">
      <div className="bg-white rounded-xl shadow-md p-6">
        <BannerManager />
      </div>
    </AdminLayout>
  );
};

export default AdminBanners;
