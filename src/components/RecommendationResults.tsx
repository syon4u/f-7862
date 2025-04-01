
import React from 'react';
import { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from 'react-router-dom';
import { Star } from 'lucide-react';

interface RecommendationResultsProps {
  recommendations: Product[];
}

const RecommendationResults: React.FC<RecommendationResultsProps> = ({ recommendations }) => {
  const navigate = useNavigate();
  
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="font-league-spartan text-3xl font-bold mb-2">Your Personalized Recommendations</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Based on your responses, we've curated these special selections just for your child!
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendations.map((product) => (
          <Card key={product.id} className="kid-card border-kid-blue hover:border-primary transition-all overflow-hidden bg-kid-gradient-1">
            <div className="aspect-square overflow-hidden">
              <img 
                src={product.images[0]} 
                alt={product.name} 
                className="w-full h-full object-cover transition-transform hover:scale-105"
              />
            </div>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl font-league-spartan">{product.name}</CardTitle>
                <Badge className="bg-primary hover:bg-primary">${product.price.toFixed(2)}</Badge>
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
                      className="w-6 h-6 rounded-full border-2 border-white" 
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
                className="w-full bg-secondary hover:bg-secondary/80 text-secondary-foreground kid-button"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                View Box Details
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <div className="text-center mt-8">
        <Button 
          variant="default" 
          size="lg" 
          className="kid-button bg-primary hover:bg-primary/90 px-8"
          onClick={() => navigate("/checkout")}
        >
          Continue to Checkout
        </Button>
      </div>
    </div>
  );
};

export default RecommendationResults;
