
import React from 'react';
import { Star, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Review, RatingDistribution } from '../types/product';

interface ProductReviewsProps {
  reviews: Review[];
  ratingDistribution: RatingDistribution[];
  averageRating: number;
  reviewCount: number;
}

const ProductReviews: React.FC<ProductReviewsProps> = ({
  reviews,
  ratingDistribution,
  averageRating,
  reviewCount,
}) => {
  return (
    <section className="py-12">
      <h2 className="text-2xl font-serif font-semibold mb-6">Customer Reviews</h2>
      
      <Tabs defaultValue="reviews">
        <TabsList className="mb-6">
          <TabsTrigger value="reviews">Reviews ({reviewCount})</TabsTrigger>
          <TabsTrigger value="rating">Rating Summary</TabsTrigger>
        </TabsList>
        
        <TabsContent value="reviews" className="space-y-8">
          {reviews.map((review) => (
            <div key={review.id} className="border-b pb-6">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-medium">{review.title}</h3>
                  <div className="flex items-center mt-1">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-muted-foreground">
                      {new Date(review.date).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                </div>
                <span className="text-sm font-medium">By {review.author}</span>
              </div>
              
              <p className="my-4 text-gray-700">{review.content}</p>
              
              <div className="flex items-center space-x-4 text-sm">
                <span>Was this review helpful?</span>
                <button className="flex items-center text-gray-600 hover:text-primary">
                  <ThumbsUp className="h-4 w-4 mr-1" />
                  <span>Yes ({review.helpful})</span>
                </button>
                <button className="flex items-center text-gray-600 hover:text-primary">
                  <ThumbsDown className="h-4 w-4 mr-1" />
                  <span>No ({review.notHelpful})</span>
                </button>
              </div>
            </div>
          ))}
          
          <Button variant="outline" className="w-full">Load More Reviews</Button>
        </TabsContent>
        
        <TabsContent value="rating">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/3 flex flex-col items-center justify-center">
              <div className="text-5xl font-bold">{averageRating.toFixed(1)}</div>
              <div className="flex my-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(averageRating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <div className="text-sm text-muted-foreground">Based on {reviewCount} reviews</div>
            </div>
            
            <div className="w-full md:w-2/3">
              {ratingDistribution.map((item) => (
                <div key={item.rating} className="flex items-center mb-3">
                  <div className="w-20 text-sm flex items-center">
                    <span className="mr-1">{item.rating}</span>
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  </div>
                  <div className="flex-1 mx-2">
                    <div className="review-progress">
                      <div
                        className="review-progress-bar"
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="w-16 text-sm text-right">{item.count}</div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default ProductReviews;
