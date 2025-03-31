
import React from 'react';
import { Separator } from '@/components/ui/separator';
import Navbar from '../components/Navbar';
import ProductGallery from '../components/ProductGallery';
import ProductInfo from '../components/ProductInfo';
import ProductReviews from '../components/ProductReviews';
import RelatedProducts from '../components/RelatedProducts';
import Footer from '../components/Footer';
import { product, reviews, ratingDistribution, relatedProducts } from '../data/mockData';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <div className="text-sm text-muted-foreground mb-6">
          <a href="#" className="hover:text-primary">Home</a>
          <span className="mx-2">/</span>
          <a href="#" className="hover:text-primary">Audio</a>
          <span className="mx-2">/</span>
          <a href="#" className="hover:text-primary">Headphones</a>
          <span className="mx-2">/</span>
          <span>{product.name}</span>
        </div>
        
        {/* Product Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
          <ProductGallery images={product.images} />
          <ProductInfo product={product} />
        </div>
        
        <Separator className="my-8" />
        
        {/* Product Reviews */}
        <ProductReviews 
          reviews={reviews} 
          ratingDistribution={ratingDistribution}
          averageRating={product.rating}
          reviewCount={product.reviewCount}
        />
        
        <Separator className="my-8" />
        
        {/* Related Products */}
        <RelatedProducts products={relatedProducts} />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
