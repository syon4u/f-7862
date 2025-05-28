
import React from 'react';
import { Product } from '@/types/product';
import ImageGallery from './ImageGallery';
import ColorPicker from './ColorPicker';
import SizePicker from './SizePicker';

interface ImagesSectionProps {
  product: Partial<Product>;
  onImageUploaded: (imageUrl: string) => void;
  onRemoveImage: (imageUrl: string) => void;
  onAddColor: (e: React.FormEvent<HTMLFormElement>) => void;
  onAddSize: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const ImagesSection: React.FC<ImagesSectionProps> = ({
  product,
  onImageUploaded,
  onRemoveImage,
  onAddColor,
  onAddSize
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Images & Variants</h3>

      <ImageGallery
        product={product}
        onImageUploaded={onImageUploaded}
        onRemoveImage={onRemoveImage}
      />

      <ColorPicker
        product={product}
        onAddColor={onAddColor}
      />

      <SizePicker
        product={product}
        onAddSize={onAddSize}
      />
    </div>
  );
};

export default ImagesSection;
