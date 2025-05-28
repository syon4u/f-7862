
import React from 'react';
import { Product } from '@/types/product';
import { Label } from '@/components/ui/label';
import { X, ImageIcon } from 'lucide-react';
import ImageUploader from '@/components/ImageUploader';

interface ImageGalleryProps {
  product: Partial<Product>;
  onImageUploaded: (imageUrl: string) => void;
  onRemoveImage: (imageUrl: string) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  product,
  onImageUploaded,
  onRemoveImage
}) => {
  return (
    <div>
      <Label className="block mb-2">Product Images</Label>
      <ImageUploader onImageUploaded={onImageUploaded} />
      
      <div className="mt-4">
        <h4 className="text-sm font-medium mb-2">Current Images</h4>
        <div className="grid grid-cols-2 gap-2">
          {product.images && product.images.length > 0 ? (
            product.images.map((img, idx) => (
              <div key={idx} className="relative group border rounded-md overflow-hidden aspect-square">
                <img 
                  src={img} 
                  alt={`Product image ${idx + 1}`} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = '/placeholder.svg';
                  }}
                />
                <button
                  type="button"
                  onClick={() => onRemoveImage(img)}
                  className="absolute top-1 right-1 bg-white/80 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="h-4 w-4 text-red-600" />
                </button>
              </div>
            ))
          ) : (
            <div className="col-span-2 flex items-center justify-center h-24 bg-gray-50 border border-dashed rounded-md">
              <div className="text-center">
                <ImageIcon className="mx-auto h-8 w-8 text-gray-400" />
                <p className="mt-1 text-sm text-gray-500">No images added yet</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;
