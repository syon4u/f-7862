
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
  // Default background patterns based on category - enhanced with richer patterns
  const getBgPattern = () => {
    switch(category.toLowerCase()) {
      case 'boys':
        return 'bg-blue-100 squares-pattern';
      case 'girls':
        return 'bg-pink-100 dots-pattern';
      case 'baby':
        return 'bg-amber-100 waves-pattern';
      case 'shoes':
        return 'bg-purple-100 dots-pattern';
      case 'new in':
        return 'bg-emerald-100 squares-pattern';
      case 'designers':
        return 'bg-orange-100 waves-pattern';
      default:
        return 'bg-gray-100';
    }
  };

  // Get category-specific colors - enhanced with richer gradients
  const getCategoryColors = () => {
    switch(category.toLowerCase()) {
      case 'boys':
        return 'from-blue-600 to-cyan-500';
      case 'girls':
        return 'from-pink-600 to-purple-500';
      case 'baby':
        return 'from-amber-500 to-yellow-400';
      case 'shoes':
        return 'from-purple-600 to-fuchsia-500';
      case 'new in':
        return 'from-emerald-600 to-green-500';
      case 'designers':
        return 'from-orange-600 to-amber-500';
      default:
        return 'from-gray-600 to-slate-500';
    }
  };

  // Get category-specific background images
  const getCategoryImage = () => {
    if (image) return image;
    
    switch(category.toLowerCase()) {
      case 'boys':
        return '/lovable-uploads/image(17).png';
      case 'girls':
        return '/lovable-uploads/image(6).png';
      case 'baby':
        return '/lovable-uploads/image(12).png';
      case 'shoes':
        return '/lovable-uploads/image(29).png';
      case 'new in':
        return '/lovable-uploads/image(15).png';
      case 'designers':
        return '/lovable-uploads/image(18).png';
      default:
        return '';
    }
  };

  return (
    <div className={`relative overflow-hidden rounded-xl mb-6 ${getBgPattern()}`}>
      <div className="absolute inset-0 opacity-25 bg-pattern"></div>
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
            <p className="text-gray-800 max-w-md mx-auto font-medium">
              {description}
            </p>
          )}
          <div className={`h-1.5 w-24 mx-auto mt-4 rounded-full bg-gradient-to-r ${getCategoryColors()}`}></div>
        </div>
      </div>
    </div>
  );
};

export default CategoryBanner;
