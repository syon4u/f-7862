
import React, { useState } from 'react';
import { Star, ShoppingCart, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { Product } from '../types/product';

interface ProductInfoProps {
  product: Product;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    toast({
      title: "Added to cart",
      description: `${quantity} × ${product.name} (${selectedColor.name}, ${selectedSize}) added to your cart.`,
      action: (
        <div className="flex items-center space-x-1">
          <Check className="h-4 w-4" />
          <span>Success</span>
        </div>
      ),
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-serif font-medium mb-2">{product.name}</h1>
        <div className="flex items-center">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${
                  i < Math.floor(product.rating)
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="ml-2 text-sm text-muted-foreground">
            {product.rating} ({product.reviewCount} reviews)
          </span>
        </div>
      </div>

      <div className="flex items-end gap-2">
        {product.discountPrice ? (
          <>
            <span className="text-2xl font-semibold">${product.discountPrice.toFixed(2)}</span>
            <span className="text-lg text-muted-foreground line-through">${product.price.toFixed(2)}</span>
            <span className="text-sm px-2 py-1 bg-red-100 text-red-700 rounded-md ml-2">
              Save ${(product.price - product.discountPrice).toFixed(2)}
            </span>
          </>
        ) : (
          <span className="text-2xl font-semibold">${product.price.toFixed(2)}</span>
        )}
      </div>

      <p className="text-muted-foreground">{product.description}</p>

      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold mb-2">Color: {selectedColor.name}</h3>
          <div className="flex gap-3">
            {product.colors.map((color) => (
              <button
                key={color.name}
                className={`color-option ${
                  color.name === selectedColor.name ? "color-active" : ""
                }`}
                style={{ backgroundColor: color.value }}
                onClick={() => setSelectedColor(color)}
                aria-label={`Select color: ${color.name}`}
                title={color.name}
              />
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold mb-2">Size: {selectedSize}</h3>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((size) => (
              <button
                key={size}
                className={`size-option ${
                  size === selectedSize ? "size-active" : ""
                }`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold mb-2">Quantity</h3>
          <div className="flex items-center border rounded-md w-fit">
            <button
              className="px-3 py-2 border-r hover:bg-secondary transition-colors"
              onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : prev))}
              aria-label="Decrease quantity"
            >
              -
            </button>
            <span className="px-6 py-2">{quantity}</span>
            <button
              className="px-3 py-2 border-l hover:bg-secondary transition-colors"
              onClick={() => setQuantity((prev) => prev + 1)}
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
        </div>
      </div>

      <div className="pt-4">
        <Button
          onClick={handleAddToCart}
          className="w-full py-6 text-lg"
          disabled={!product.inStock}
        >
          <ShoppingCart className="h-5 w-5 mr-2" />
          {product.inStock ? "Add to Cart" : "Out of Stock"}
        </Button>
      </div>

      <div className="space-y-4 pt-4">
        <h3 className="text-lg font-serif font-semibold">Features</h3>
        <ul className="space-y-2">
          {product.features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check className="h-5 w-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductInfo;
