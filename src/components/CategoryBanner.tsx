
import React from 'react';

interface CategoryBannerProps {
  category: string;
  image?: string;
  description?: string;
}

const CategoryBanner: React.FC<CategoryBannerProps> = ({ 
  category,
  image,
  description
}) => {
  // Default background patterns based on category
  const getBgPattern = () => {
    switch(category.toLowerCase()) {
      case 'boys':
        return 'bg-blue-50 squares-pattern';
      case 'girls':
        return 'bg-pink-50 dots-pattern';
      case 'baby':
        return 'bg-yellow-50 waves-pattern';
      case 'shoes':
        return 'bg-purple-50 dots-pattern';
      case 'new in':
        return 'bg-green-50 squares-pattern';
      case 'designers':
        return 'bg-orange-50 waves-pattern';
      default:
        return 'bg-gray-50';
    }
  };

  // Get category-specific colors
  const getCategoryColors = () => {
    switch(category.toLowerCase()) {
      case 'boys':
        return 'from-blue-500 to-cyan-400';
      case 'girls':
        return 'from-pink-500 to-purple-400';
      case 'baby':
        return 'from-yellow-400 to-amber-300';
      case 'shoes':
        return 'from-purple-500 to-fuchsia-400';
      case 'new in':
        return 'from-green-500 to-emerald-400';
      case 'designers':
        return 'from-orange-500 to-amber-400';
      default:
        return 'from-gray-500 to-slate-400';
    }
  };

  // Get category-specific background images
  const getCategoryImage = () => {
    if (image) return image;
    
    switch(category.toLowerCase()) {
      case 'boys':
        return 'public/lovable-uploads/image(17).png';
      case 'girls':
        return 'public/lovable-uploads/image(6).png';
      case 'baby':
        return 'public/lovable-uploads/image(12).png';
      case 'shoes':
        return 'public/lovable-uploads/image(29).png';
      case 'new in':
        return 'public/lovable-uploads/image(15).png';
      case 'designers':
        return 'public/lovable-uploads/image(18).png';
      default:
        return '';
    }
  };

  return (
    <div className={`relative overflow-hidden rounded-xl mb-6 ${getBgPattern()}`}>
      <div className="absolute inset-0 opacity-20 bg-pattern"></div>
      <div className={`relative w-full h-40 md:h-48 flex items-center justify-center p-6 overflow-hidden`}>
        <img 
          src={getCategoryImage()} 
          alt={`${category} category`}
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="relative z-10 text-center">
          <h2 className={`text-3xl font-bold mb-2 bg-gradient-to-r ${getCategoryColors()} bg-clip-text text-transparent`}>
            {category.toUpperCase()}
          </h2>
          {description && (
            <p className="text-gray-700 max-w-md mx-auto">
              {description}
            </p>
          )}
          <div className={`h-1 w-24 mx-auto mt-4 rounded-full bg-gradient-to-r ${getCategoryColors()}`}></div>
        </div>
      </div>
    </div>
  );
};

export default CategoryBanner;
