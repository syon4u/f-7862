
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductGalleryProps {
  images: string[];
  altPrefix?: string;
}

const ProductGallery: React.FC<ProductGalleryProps> = ({ 
  images, 
  altPrefix = "Product" 
}) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean[]>(images.map(() => true));

  const handlePrev = () => {
    setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleImageLoad = (index: number) => {
    setIsLoading(prev => {
      const newLoading = [...prev];
      newLoading[index] = false;
      return newLoading;
    });
  };

  // Fallback image if the original fails to load
  const fallbackImage = "https://images.unsplash.com/photo-1590013500472-2c2d7349dffb?q=80&w=1000";

  return (
    <div className="flex flex-col space-y-4">
      <div className="product-image-container rounded-lg overflow-hidden relative">
        {isLoading[currentImage] && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        <img 
          src={images[currentImage]} 
          alt={`${altPrefix} image ${currentImage + 1}`} 
          className={`w-full h-full object-cover transition-opacity duration-300 ${isLoading[currentImage] ? 'opacity-0' : 'opacity-100'}`}
          onLoad={() => handleImageLoad(currentImage)}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = fallbackImage;
          }}
        />
        
        <div className="absolute inset-0 flex items-center justify-between p-4">
          <button 
            onClick={handlePrev} 
            className="bg-white/80 hover:bg-white rounded-full p-2 text-gray-800 shadow-md transition-all"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button 
            onClick={handleNext} 
            className="bg-white/80 hover:bg-white rounded-full p-2 text-gray-800 shadow-md transition-all"
            aria-label="Next image"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-4 gap-2">
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`rounded-md overflow-hidden aspect-square relative ${
              index === currentImage ? "ring-2 ring-primary" : "hover:opacity-80"
            }`}
          >
            {isLoading[index] && (
              <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
            <img 
              src={img} 
              alt={`${altPrefix} thumbnail ${index + 1}`} 
              className="w-full h-full object-cover"
              onLoad={() => handleImageLoad(index)}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = fallbackImage;
              }}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;
