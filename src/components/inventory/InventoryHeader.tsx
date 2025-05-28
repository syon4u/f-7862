
import React from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCcw, Plus, Upload } from 'lucide-react';
import InventorySeeder from '@/components/InventorySeeder';

interface InventoryHeaderProps {
  onRefresh: () => void;
  onAddProduct: () => void;
  onBulkUpload: () => void;
}

const InventoryHeader: React.FC<InventoryHeaderProps> = ({
  onRefresh,
  onAddProduct,
  onBulkUpload
}) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <Button variant="outline" onClick={onRefresh} className="flex items-center gap-2">
          <RefreshCcw size={16} /> Refresh
        </Button>
        <InventorySeeder />
        <Button 
          variant="outline" 
          onClick={onBulkUpload} 
          className="flex items-center gap-2"
        >
          <Upload size={16} /> Bulk Upload
        </Button>
        <Button onClick={onAddProduct} className="flex items-center gap-2">
          <Plus size={16} /> Add Product
        </Button>
      </div>
    </div>
  );
};

export default InventoryHeader;
