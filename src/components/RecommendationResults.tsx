
import React from 'react';
import { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from 'react-router-dom';
import { Star, ShoppingCart } from 'lucide-react';

interface RecommendationResultsProps {
  recommendations: Product[];
}

const RecommendationResults: React.FC<RecommendationResultsProps> = ({ recommendations }) => {
  const navigate = useNavigate();
  
  return (
    <div className="space-y-6">
      <div className="text-center mb-8 animate-fade-in">
        <h2 className="font-league-spartan text-3xl font-bold mb-3 colorful-heading">Your Personalized Recommendations</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Based on your responses, we've curated these special selections just for your child!
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendations.map((product, index) => (
          <Card 
            key={product.id} 
            className="kid-card border-kid-blue hover:border-primary transition-all overflow-hidden bg-gradient-to-br from-white to-kid-pink/15 hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 card-3d"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="relative aspect-square overflow-hidden product-image-shine">
              <img 
                src={product.images[0]} 
                alt={product.name} 
                className="w-full h-full object-cover transition-transform hover:scale-110 duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-4 w-full">
                  <Button 
                    className="w-full bg-white/90 hover:bg-white text-primary hover:text-primary font-bold backdrop-blur-sm rounded-full btn-shiny"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/product/${product.id}`);
                    }}
                  >
                    Quick View
                  </Button>
                </div>
              </div>
              {product.discountPrice && (
                <Badge className="absolute top-3 left-3 bg-kid-pink text-white shadow-lg glow">
                  SALE
                </Badge>
              )}
            </div>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl font-league-spartan bubble">{product.name}</CardTitle>
                <Badge className="bg-gradient-to-r from-primary to-tertiary hover:from-tertiary hover:to-primary text-white shadow-sm shimmer">${product.price.toFixed(2)}</Badge>
              </div>
              <div className="flex items-center gap-1 text-sm">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{product.rating}</span>
                <span className="text-muted-foreground">({product.reviewCount} reviews)</span>
              </div>
            </CardHeader>
            <CardContent className="pb-4">
              <CardDescription className="line-clamp-2">{product.description}</CardDescription>
              <div className="flex items-center gap-2 mt-3">
                <div className="flex -space-x-1">
                  {product.colors.map((color, i) => (
                    <div 
                      key={i} 
                      className="w-6 h-6 rounded-full border-2 border-white hover:scale-125 transition-transform hover:z-10" 
                      style={{ backgroundColor: color.value }}
                      title={color.name}
                    />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">
                  {product.colors.length} colors
                </span>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full bg-gradient-to-r from-secondary to-kid-purple text-white hover:opacity-90 kid-button transform transition-all duration-300 group confetti-burst"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <span className="group-hover:-translate-x-2 transition-transform inline-block">View Box Details</span>
                <ShoppingCart className="h-4 w-4 ml-2 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-2" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <div className="text-center mt-12">
        <div className="relative inline-block">
          <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-kid-pink via-kid-purple to-kid-blue opacity-75 blur"></div>
          <Button 
            variant="default" 
            size="lg" 
            className="relative kid-button bg-white text-primary hover:bg-white px-8 py-6 text-lg font-bold shadow-xl hover:shadow-2xl btn-shiny"
            onClick={() => navigate("/checkout")}
          >
            Continue to Checkout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RecommendationResults;
