
import React from 'react';
import { Product } from '@/types/product';
import AddProductDialog from './AddProductDialog';
import EditProductDialog from './EditProductDialog';
import BulkProductUploadDialog from './BulkProductUploadDialog';

interface InventoryDialogsProps {
  isAddDialogOpen: boolean;
  isEditDialogOpen: boolean;
  isBulkUploadDialogOpen: boolean;
  currentProduct: Product | null;
  onCloseAddDialog: () => void;
  onCloseEditDialog: () => void;
  onCloseBulkUploadDialog: () => void;
  onAddProduct: (product: Product) => void;
  onUpdateProduct: (product: Product) => void;
  onBulkProductUpload: (products: Product[]) => void;
  setCurrentProduct: (product: Product | null) => void;
}

const InventoryDialogs: React.FC<InventoryDialogsProps> = ({
  isAddDialogOpen,
  isEditDialogOpen,
  isBulkUploadDialogOpen,
  currentProduct,
  onCloseAddDialog,
  onCloseEditDialog,
  onCloseBulkUploadDialog,
  onAddProduct,
  onUpdateProduct,
  onBulkProductUpload,
  setCurrentProduct
}) => {
  return (
    <>
      <AddProductDialog 
        isOpen={isAddDialogOpen}
        onClose={onCloseAddDialog}
        onAddProduct={onAddProduct}
      />

      <EditProductDialog 
        isOpen={isEditDialogOpen}
        onClose={onCloseEditDialog}
        currentProduct={currentProduct}
        onUpdateProduct={onUpdateProduct}
        setCurrentProduct={setCurrentProduct}
      />
      
      <BulkProductUploadDialog
        isOpen={isBulkUploadDialogOpen}
        onClose={onCloseBulkUploadDialog}
        onProductsUploaded={onBulkProductUpload}
      />
    </>
  );
};

export default InventoryDialogs;
