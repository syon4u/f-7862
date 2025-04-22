
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Product } from '@/types/product';
import { toast } from '@/hooks/use-toast';
import { v4 as uuidv4 } from 'uuid';
import { Upload, FileText } from 'lucide-react';

interface BulkProductUploadDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onProductsUploaded: (products: Product[]) => void;
}

const BulkProductUploadDialog: React.FC<BulkProductUploadDialogProps> = ({
  isOpen,
  onClose,
  onProductsUploaded
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [previewData, setPreviewData] = useState<any[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    
    if (selectedFile) {
      readFile(selectedFile);
    } else {
      setPreviewData([]);
    }
  };

  const readFile = (file: File) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const rows = parseCSV(text);
        
        // Take just first 5 rows for preview
        setPreviewData(rows.slice(0, 5));
      } catch (error) {
        console.error("Error parsing file:", error);
        toast({
          title: "Error parsing file",
          description: "Please ensure your file is in CSV format with proper headers.",
          variant: "destructive"
        });
      }
    };
    
    reader.readAsText(file);
  };

  const parseCSV = (text: string): any[] => {
    // Simple CSV parser
    const lines = text.split('\n');
    const headers = lines[0].split(',').map(header => header.trim());
    
    return lines.slice(1)
      .filter(line => line.trim() !== '')
      .map(line => {
        const values = line.split(',').map(value => value.trim());
        const row: Record<string, string> = {};
        
        headers.forEach((header, i) => {
          row[header] = values[i] || '';
        });
        
        return row;
      });
  };

  const handleUpload = async () => {
    if (!file) return;
    
    setProcessing(true);
    
    try {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          const text = e.target?.result as string;
          const rows = parseCSV(text);
          
          // Convert rows to Product objects
          const products: Product[] = rows.map(row => {
            const product: Product = {
              id: uuidv4(),
              name: row.name || 'Unnamed Product',
              description: row.description || '',
              price: parseFloat(row.price) || 0,
              discountPrice: row.discountPrice ? parseFloat(row.discountPrice) : undefined,
              rating: parseFloat(row.rating) || 4.5,
              reviewCount: parseInt(row.reviewCount) || 0,
              images: row.images ? row.images.split(';').map(img => img.trim()) : ['/placeholder.svg'],
              colors: row.colors ? parseColorsFromString(row.colors) : [],
              sizes: row.sizes ? row.sizes.split(';').map(size => size.trim()) : [],
              features: row.features ? row.features.split(';').map(feature => feature.trim()) : [],
              inStock: row.inStock === 'true' || row.inStock === 'yes' || row.inStock === '1',
              gender: (row.gender as "boy" | "girl" | "unisex") || 'unisex',
              ageRange: row.ageRange || '',
              brand: row.brand || '',
              material: row.material || '',
              category: row.category || '',
              tags: row.tags ? row.tags.split(';').map(tag => tag.trim()) : [],
              isBox: row.isBox === 'true' || row.isBox === 'yes' || row.isBox === '1',
            };
            
            return product;
          });
          
          onProductsUploaded(products);
          
          toast({
            title: "Products uploaded",
            description: `Successfully processed ${products.length} products`,
          });
          
          onClose();
        } catch (error) {
          console.error("Error processing file:", error);
          toast({
            title: "Error processing file",
            description: "There was an error processing your file. Please check the format.",
            variant: "destructive"
          });
        } finally {
          setProcessing(false);
        }
      };
      
      reader.readAsText(file);
    } catch (error) {
      console.error("Upload error:", error);
      toast({
        title: "Upload failed",
        description: "There was an error uploading your file.",
        variant: "destructive"
      });
      setProcessing(false);
    }
  };

  const parseColorsFromString = (colorsStr: string): { name: string; value: string }[] => {
    // Format expected: "Red:#FF0000;Blue:#0000FF"
    return colorsStr.split(';').map(colorPair => {
      const [name, value] = colorPair.split(':').map(part => part.trim());
      return { name, value };
    });
  };

  const downloadTemplate = () => {
    const headers = [
      'name',
      'description',
      'price',
      'discountPrice',
      'rating',
      'reviewCount',
      'images',
      'colors',
      'sizes',
      'features',
      'inStock',
      'gender',
      'ageRange',
      'brand',
      'material',
      'category',
      'tags',
      'isBox'
    ].join(',');
    
    const exampleRow = [
      'Kids T-Shirt',
      'Comfortable cotton t-shirt for kids',
      '24.99',
      '19.99',
      '4.5',
      '10',
      'image1.jpg;image2.jpg',
      'Red:#FF0000;Blue:#0000FF',
      'S;M;L',
      'Cotton;Machine washable;Comfortable',
      'true',
      'unisex',
      '2-4',
      'KidsBrand',
      'Cotton',
      'tops',
      'summer;tshirt;cotton',
      'false'
    ].join(',');
    
    const csvContent = `${headers}\n${exampleRow}`;
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'product_template.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Bulk Upload Products</DialogTitle>
          <DialogDescription>
            Upload a CSV file with product information to add multiple products at once.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="productFile">Upload CSV File</Label>
            <div className="mt-2 flex items-center gap-2">
              <Input
                id="productFile"
                type="file"
                accept=".csv,.txt"
                onChange={handleFileChange}
                className="flex-1"
              />
              <Button variant="outline" onClick={downloadTemplate} type="button">
                <FileText className="h-4 w-4 mr-2" />
                Template
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Upload a CSV file with product data. You can download a template to get started.
            </p>
          </div>
          
          {previewData.length > 0 && (
            <div>
              <h3 className="text-sm font-medium mb-2">Preview (first 5 rows):</h3>
              <div className="border rounded-md overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      {Object.keys(previewData[0]).slice(0, 5).map((header, i) => (
                        <th key={i} className="px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {previewData.map((row, rowIdx) => (
                      <tr key={rowIdx}>
                        {Object.keys(row).slice(0, 5).map((key, cellIdx) => (
                          <td key={cellIdx} className="px-3 py-2 text-xs">
                            {row[key]}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Preview shows first 5 columns and rows only.
              </p>
            </div>
          )}
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={processing}>
            Cancel
          </Button>
          <Button 
            onClick={handleUpload} 
            disabled={!file || processing}
            className="flex items-center gap-2"
          >
            <Upload className="h-4 w-4" />
            {processing ? 'Processing...' : 'Upload Products'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BulkProductUploadDialog;
