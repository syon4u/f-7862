
import { Product } from "@/types/product";

// Define types for quiz responses
export interface QuizResponse {
  childName?: string;
  gender?: "girl" | "boy" | "both";
  age?: number;
  size?: string;
  stylePreferences?: string[];
  colorPreferences?: string[];
  patternPreferences?: string[];
  clothingNeeds?: string[];
  avoidItems?: string;
  personality?: string[];
  activities?: string[];
  interests?: string;
  allergies?: string;
  notes?: string;
}

// Mock products data to simulate recommendations
const mockRecommendations: Product[] = [
  {
    id: "box-1",
    name: "Sunshine Adventure Box",
    description: "Perfect for active kids who love bright colors and outdoor play",
    price: 49.99,
    rating: 4.7,
    reviewCount: 32,
    images: [
      "https://images.unsplash.com/photo-1519278409-1f56fdda7fe5?q=80&w=1000", 
      "https://images.unsplash.com/photo-1543954616-22e1818e44f7?q=80&w=1000"
    ],
    colors: [
      { name: "Yellow", value: "#FDFD96" },
      { name: "Teal", value: "#9ED8DB" }
    ],
    sizes: ["2T", "3T", "4T", "5", "6"],
    features: ["5 coordinated items", "Activity book included", "Eco-friendly packaging"],
    inStock: true,
    gender: "unisex",
    ageRange: "2-6 years",
    tags: ["outdoor", "active", "colorful"],
    isBox: true
  },
  {
    id: "box-2",
    name: "Creative Play Box",
    description: "Designed for artistic kids who love crafts and creative activities",
    price: 49.99,
    rating: 4.5,
    reviewCount: 28,
    images: [
      "https://images.unsplash.com/photo-1515041219749-89347f83291a?q=80&w=1000", 
      "https://images.unsplash.com/photo-1596464716127-f2a82984de30?q=80&w=1000"
    ],
    colors: [
      { name: "Purple", value: "#C7CEEA" },
      { name: "Pink", value: "#FFB6C1" }
    ],
    sizes: ["2T", "3T", "4T", "5", "6"],
    features: ["4 mix-and-match outfits", "Craft supplies included", "Washable fabric markers"],
    inStock: true,
    gender: "unisex",
    ageRange: "3-7 years",
    tags: ["creative", "artistic", "craft"],
    isBox: true
  },
  {
    id: "box-3",
    name: "Cozy Comfort Box",
    description: "Soft, comfortable clothing for kids who prefer quiet playtime",
    price: 44.99,
    rating: 4.8,
    reviewCount: 45,
    images: [
      "https://images.unsplash.com/photo-1518831959646-28f9c5408d5c?q=80&w=1000", 
      "https://images.unsplash.com/photo-1602407294553-6ac9170b3ed3?q=80&w=1000"
    ],
    colors: [
      { name: "Soft Blue", value: "#D3E4FD" },
      { name: "Soft Green", value: "#B5EAD7" }
    ],
    sizes: ["2T", "3T", "4T", "5", "6"],
    features: ["Ultra-soft fabrics", "Sensory-friendly designs", "No tags or scratchy materials"],
    inStock: true,
    gender: "unisex",
    ageRange: "2-6 years",
    tags: ["cozy", "quiet", "sensory-friendly"],
    isBox: true
  }
];

// The main recommendation algorithm
export const getRecommendations = (quizResponses: QuizResponse): Product[] => {
  // In a real implementation, this would be a sophisticated algorithm
  // matching user preferences to products in your database
  
  // For this example, we'll use simple matching based on personality and activities
  let recommendations = [...mockRecommendations];
  
  // Filter by gender if specified
  if (quizResponses.gender && quizResponses.gender !== "both") {
    recommendations = recommendations.filter(
      product => product.gender === quizResponses.gender || product.gender === "unisex"
    );
  }
  
  // In a real implementation, we'd score each product based on how well
  // it matches the quiz responses across multiple dimensions
  
  // Simple scoring example (would be much more sophisticated in production):
  const scoredRecommendations = recommendations.map(product => {
    let score = 0;
    
    // Match by activities
    if (quizResponses.activities?.includes("Sports") || 
        quizResponses.activities?.includes("Outdoor play")) {
      if (product.tags?.includes("active") || product.tags?.includes("outdoor")) {
        score += 2;
      }
    }
    
    // Match by personality
    if (quizResponses.personality?.includes("Creative") || 
        quizResponses.activities?.includes("Arts & Crafts")) {
      if (product.tags?.includes("creative") || product.tags?.includes("artistic")) {
        score += 2;
      }
    }
    
    if (quizResponses.personality?.includes("Quiet/Calm") || 
        quizResponses.personality?.includes("Shy")) {
      if (product.tags?.includes("cozy") || product.tags?.includes("quiet")) {
        score += 2;
      }
    }
    
    return { product, score };
  });
  
  // Sort by score (highest first) and return just the products
  return scoredRecommendations
    .sort((a, b) => b.score - a.score)
    .map(item => item.product);
};
