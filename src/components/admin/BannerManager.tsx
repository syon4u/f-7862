
import React, { useState } from 'react';
import UpdateBannerImage from './banner/UpdateBannerImage';
import AddNewBanner from './banner/AddNewBanner';
import BannerList from './banner/BannerList';

const BannerManager: React.FC = () => {
  const [selectedBannerId, setSelectedBannerId] = useState<string>('');

  return (
    <div className="space-y-8">
      <UpdateBannerImage 
        selectedBannerId={selectedBannerId} 
        setSelectedBannerId={setSelectedBannerId} 
      />
      <AddNewBanner />
      <BannerList />
    </div>
  );
};

export default BannerManager;
