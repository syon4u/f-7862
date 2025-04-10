
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useProducts } from '@/contexts/ProductContext';
import { Product } from '@/types/product';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { RefreshCcw, Plus } from 'lucide-react';
import InventorySeeder from '@/components/InventorySeeder';
import ProductsList from '@/components/inventory/ProductsList';
import InventoryAnalytics from '@/components/inventory/InventoryAnalytics';
import AddProductDialog from '@/components/inventory/AddProductDialog';
import EditProductDialog from '@/components/inventory/EditProductDialog';

const AdminInventory = () => {
  const { products, addProduct, updateProduct, deleteProduct, fetchProducts } = useProducts();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
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

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Inventory Management</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={handleRefresh} className="flex items-center gap-2">
              <RefreshCcw size={16} /> Refresh
            </Button>
            <InventorySeeder />
            <Button onClick={() => setIsAddDialogOpen(true)} className="flex items-center gap-2">
              <Plus size={16} /> Add Product
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="products">
          <TabsList className="mb-6">
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="products">
            <ProductsList 
              products={products} 
              onEdit={openEditDialog} 
              onDelete={handleDeleteProduct}
              onAddClick={() => setIsAddDialogOpen(true)}
            />
          </TabsContent>
          
          <TabsContent value="analytics">
            <InventoryAnalytics products={products} />
          </TabsContent>
        </Tabs>
      </div>

      <AddProductDialog 
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onAddProduct={handleAddProduct}
      />

      <EditProductDialog 
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        currentProduct={currentProduct}
        onUpdateProduct={handleEditProduct}
        setCurrentProduct={setCurrentProduct}
      />
      
      <Footer />
    </div>
  );
};

export default AdminInventory;
