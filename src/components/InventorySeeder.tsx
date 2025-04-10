
import React from 'react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { useProducts } from '@/contexts/ProductContext';
import { Sparkles } from 'lucide-react';

interface InventorySeederProps {
  className?: string;
}

const InventorySeeder: React.FC<InventorySeederProps> = ({ className }) => {
  const { seedInventory, products } = useProducts();

  const handleSeedInventory = () => {
    try {
      const addedCount = seedInventory();
      toast({
        title: "Inventory Seeded Successfully",
        description: `Added ${addedCount} new products to your inventory.`,
      });
    } catch (error) {
      console.error('Error seeding inventory:', error);
      toast({
        title: "Error Seeding Inventory",
        description: "There was a problem adding sample products.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className={className}>
      <Button 
        onClick={handleSeedInventory}
        className="flex items-center gap-2 bg-gradient-to-r from-kid-pink to-kid-purple hover:from-kid-purple hover:to-kid-pink"
      >
        <Sparkles size={16} />
        Add Sample Products
      </Button>
    </div>
  );
};

export default InventorySeeder;
