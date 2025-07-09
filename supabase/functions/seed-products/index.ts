import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const sampleProducts = [
  {
    name: "Caribbean Vibes Set",
    description: "Bright and colorful outfit perfect for tropical adventures",
    price: 45.99,
    discount_price: 35.99,
    gender: "unisex",
    age_range: "2-6 years",
    brand: "Island Kids",
    material: "100% Cotton",
    tags: ["casual", "tropical", "comfortable"],
    sizes: ["2T", "3T", "4T", "5T", "6T"],
    colors: [
      { "name": "Sunset Orange", "value": "#FF6B35" },
      { "name": "Ocean Blue", "value": "#4ECDC4" },
      { "name": "Palm Green", "value": "#45B7D1" }
    ],
    features: [
      "Made with organic cotton",
      "Vibrant tropical prints",
      "Comfortable fit for active play",
      "Machine washable"
    ],
    in_stock: true,
    stock_quantity: 25,
    inventory_count: 25,
    rating: 4.8,
    review_count: 42,
    images: [
      "/lovable-uploads/d8509b88-5b24-402e-acca-64c4ee56ac29.png",
      "/lovable-uploads/de2a3b1d-d4d3-4fc3-b978-d8912e563d38.png"
    ],
    is_featured: true
  },
  {
    name: "Little Explorer Outfit",
    description: "Perfect for young adventurers ready to explore the world",
    price: 38.99,
    gender: "boy",
    age_range: "3-8 years",
    brand: "Adventure Kids",
    material: "Cotton Blend",
    tags: ["adventure", "outdoor", "durable"],
    sizes: ["3T", "4T", "5T", "6T", "7", "8"],
    colors: [
      { "name": "Forest Green", "value": "#228B22" },
      { "name": "Earth Brown", "value": "#8B4513" }
    ],
    features: [
      "Durable outdoor fabric",
      "Multiple pockets for treasures",
      "Reinforced knees",
      "Adventure-themed patches"
    ],
    in_stock: true,
    stock_quantity: 18,
    inventory_count: 18,
    rating: 4.6,
    review_count: 28,
    images: [
      "/lovable-uploads/fc833c4e-5e86-4e39-b555-a427541f2339.png"
    ]
  },
  {
    name: "Princess Garden Dress",
    description: "Elegant dress with beautiful floral patterns",
    price: 52.99,
    discount_price: 42.99,
    gender: "girl",
    age_range: "2-7 years",
    brand: "Little Princess",
    material: "Organic Cotton",
    tags: ["dress", "formal", "floral"],
    sizes: ["2T", "3T", "4T", "5T", "6", "7"],
    colors: [
      { "name": "Rose Pink", "value": "#FFB6C1" },
      { "name": "Lavender", "value": "#E6E6FA" },
      { "name": "Mint Green", "value": "#98FB98" }
    ],
    features: [
      "Beautiful floral embroidery",
      "Comfortable cotton lining",
      "Twirl-worthy skirt",
      "Special occasion ready"
    ],
    in_stock: true,
    stock_quantity: 20,
    inventory_count: 20,
    rating: 4.9,
    review_count: 55,
    images: [
      "/lovable-uploads/85e5cba9-699f-4c04-b837-ae63a2d20237.png"
    ],
    is_featured: true
  },
  {
    name: "Cozy Cuddle Pajamas",
    description: "Super soft pajamas for the sweetest dreams",
    price: 28.99,
    gender: "unisex",
    age_range: "6 months - 3 years",
    brand: "Sweet Dreams",
    material: "Bamboo Fiber",
    tags: ["sleepwear", "soft", "comfort"],
    sizes: ["6M", "12M", "18M", "2T", "3T"],
    colors: [
      { "name": "Cloud White", "value": "#F8F8FF" },
      { "name": "Baby Blue", "value": "#87CEEB" },
      { "name": "Soft Yellow", "value": "#FFFFE0" }
    ],
    features: [
      "Ultra-soft bamboo fabric",
      "Temperature regulating",
      "Hypoallergenic",
      "Easy snap buttons"
    ],
    in_stock: true,
    stock_quantity: 30,
    inventory_count: 30,
    rating: 4.7,
    review_count: 38,
    images: [
      "/lovable-uploads/af77dcd8-39d9-4916-9ac0-cf012692472e.png"
    ]
  }
];

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    console.log("Starting to seed products...");

    // Clear existing products (optional)
    const { error: deleteError } = await supabaseClient
      .from("products")
      .delete()
      .neq("id", "00000000-0000-0000-0000-000000000000"); // Delete all

    if (deleteError) {
      console.log("No existing products to delete or error:", deleteError);
    }

    // Insert sample products
    const { data, error } = await supabaseClient
      .from("products")
      .insert(sampleProducts)
      .select();

    if (error) {
      console.error("Error inserting products:", error);
      throw error;
    }

    console.log(`Successfully seeded ${data?.length} products`);

    return new Response(
      JSON.stringify({
        success: true,
        message: `Successfully seeded ${data?.length} products`,
        products: data
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error in seed-products function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});