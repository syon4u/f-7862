
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductGalleryProps {
  images: string[];
}

const ProductGallery: React.FC<ProductGalleryProps> = ({ images }) => {
  const [currentImage, setCurrentImage] = useState(0);

  const handlePrev = () => {
    setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className="product-image-container rounded-lg overflow-hidden">
        <img 
          src={images[currentImage]} 
          alt="Product image" 
          className="w-full h-full object-cover transition-opacity duration-300 animate-fade-in"
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
            className={`rounded-md overflow-hidden aspect-square ${
              index === currentImage ? "thumbnail-active" : "thumbnail"
            }`}
          >
            <img src={img} alt={`Product thumbnail ${index + 1}`} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;
