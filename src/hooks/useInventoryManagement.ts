
import { useState } from 'react';
import { Product } from '@/types/product';
import { useProducts } from '@/contexts/ProductContext';
import { toast } from '@/hooks/use-toast';

export const useInventoryManagement = () => {
  const { products, addProduct, updateProduct, deleteProduct, fetchProducts } = useProducts();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isBulkUploadDialogOpen, setIsBulkUploadDialogOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);

  const handleRefresh = async () => {
    await fetchProducts();
    toast({
      title: "Inventory refreshed",
      description: "The product inventory has been refreshed from Supabase",
    });
  };

  const handleAddProduct = (product: Product) => {
    addProduct(product);
    toast({
      title: "Product added",
      description: "Product has been added to inventory",
    });
  };

  const handleEditProduct = (product: Product) => {
    updateProduct(product.id, product);
    toast({
      title: "Product updated",
      description: "Product has been updated in inventory",
    });
  };

  const handleDeleteProduct = (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(id);
      toast({
        title: "Product deleted",
        description: "Product has been removed from inventory",
      });
    }
  };

  const openEditDialog = (product: Product) => {
    setCurrentProduct(product);
    setIsEditDialogOpen(true);
  };

  const handleBulkProductUpload = (products: Product[]) => {
    products.forEach(product => {
      addProduct(product);
    });
    
    toast({
      title: "Bulk upload complete",
      description: `Successfully added ${products.length} products to inventory`,
    });
  };

  return {
    products,
    isAddDialogOpen,
    setIsAddDialogOpen,
    isEditDialogOpen,
    setIsEditDialogOpen,
    isBulkUploadDialogOpen,
    setIsBulkUploadDialogOpen,
    currentProduct,
    setCurrentProduct,
    handleRefresh,
    handleAddProduct,
    handleEditProduct,
    handleDeleteProduct,
    openEditDialog,
    handleBulkProductUpload
  };
};
