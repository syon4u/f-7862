
import React from 'react';
import AdminLayout from '../components/admin/AdminLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductsList from '@/components/inventory/ProductsList';
import InventoryAnalytics from '@/components/inventory/InventoryAnalytics';
import InventoryHeader from '@/components/inventory/InventoryHeader';
import InventoryDialogs from '@/components/inventory/InventoryDialogs';
import { useInventoryManagement } from '@/hooks/useInventoryManagement';
import { useInventoryFilters } from '@/hooks/useInventoryFilters';

const AdminInventory = () => {
  const {
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
  } = useInventoryManagement();

  const {
    filteredProducts,
    categories,
    genders,
    handleFilter
  } = useInventoryFilters(products);

  return (
    <AdminLayout title="Inventory Management">
      <div className="space-y-6">
        <InventoryHeader
          onRefresh={handleRefresh}
          onAddProduct={() => setIsAddDialogOpen(true)}
          onBulkUpload={() => setIsBulkUploadDialogOpen(true)}
        />
        
        <Tabs defaultValue="products">
          <TabsList className="mb-6">
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="products">
            <ProductsList 
              products={products} 
              filteredProducts={filteredProducts}
              onEdit={openEditDialog} 
              onDelete={handleDeleteProduct}
              onAddClick={() => setIsAddDialogOpen(true)}
              onFilter={handleFilter}
              categories={categories}
              genders={genders}
            />
          </TabsContent>
          
          <TabsContent value="analytics">
            <InventoryAnalytics products={products} />
          </TabsContent>
        </Tabs>
      </div>

      <InventoryDialogs
        isAddDialogOpen={isAddDialogOpen}
        isEditDialogOpen={isEditDialogOpen}
        isBulkUploadDialogOpen={isBulkUploadDialogOpen}
        currentProduct={currentProduct}
        onCloseAddDialog={() => setIsAddDialogOpen(false)}
        onCloseEditDialog={() => setIsEditDialogOpen(false)}
        onCloseBulkUploadDialog={() => setIsBulkUploadDialogOpen(false)}
        onAddProduct={handleAddProduct}
        onUpdateProduct={handleEditProduct}
        onBulkProductUpload={handleBulkProductUpload}
        setCurrentProduct={setCurrentProduct}
      />
    </AdminLayout>
  );
};

export default AdminInventory;
