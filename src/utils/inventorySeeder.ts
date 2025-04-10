
import { v4 as uuidv4 } from 'uuid';
import { Product } from '@/types/product';

// Sample product data generator for the uploaded images
export const generateProductsFromImages = (): Product[] => {
  return [
    {
      id: uuidv4(),
      name: "Girls' Classic Denim Jeggings",
      description: "Comfortable classic jeggings with rear pocket design. These stylish pants feature the signature rear pocket stitching in a deep blue wash that pairs well with any top. Perfect for everyday wear with a soft elastic waistband for all-day comfort.",
      price: 29.99,
      discountPrice: 24.99,
      rating: 4.7,
      reviewCount: 124,
      images: [
        "public/lovable-uploads/ce0c7b27-59ab-4111-942f-de4b8dfd1e83.png"
      ],
      colors: [
        {
          name: "Deep Blue",
          value: "#0a3d91"
        }
      ],
      sizes: ["5", "6", "7", "8", "10", "12", "14"],
      features: [
        "Signature back pocket design",
        "Soft elastic waistband",
        "Premium cotton blend",
        "Machine washable",
        "Pull-on style"
      ],
      inStock: true,
      gender: "girl",
      ageRange: "5-7",
      brand: "Levi's Kids",
      material: "92% Cotton, 7% Polyester, 1% Elastane",
      category: "bottoms",
      tags: ["denim", "jeggings", "everyday", "classic", "stretch"]
    },
    {
      id: uuidv4(),
      name: "Girls' Pull-On Slim Fit Jeans",
      description: "These slim-fit pull-on jeans offer the perfect combination of style and comfort. Featuring an elastic waistband with no buttons or zippers, they're easy for kids to manage independently. The medium wash denim is versatile and pairs with everything in their wardrobe.",
      price: 32.99,
      discountPrice: 27.99,
      rating: 4.8,
      reviewCount: 156,
      images: [
        "public/lovable-uploads/68f20162-eb6a-48eb-a1bd-e7e65ef67650.png"
      ],
      colors: [
        {
          name: "Medium Blue",
          value: "#0e4f8b"
        }
      ],
      sizes: ["4", "5", "6", "7", "8", "10", "12", "14"],
      features: [
        "Pull-on elastic waistband",
        "No buttons or zippers",
        "Slim fit silhouette",
        "Machine washable",
        "Soft, flexible denim"
      ],
      inStock: true,
      gender: "girl",
      ageRange: "5-7",
      brand: "Levi's Kids",
      material: "87% Cotton, 11% Polyester, 2% Elastane",
      category: "bottoms",
      tags: ["denim", "pull-on", "elastic waist", "slim fit", "everyday"]
    },
    {
      id: uuidv4(),
      name: "Girls' Light Wash Pull-On Jeggings",
      description: "Ultra-comfortable light wash jeggings with the classic back pocket design. These pull-on pants look like jeans but feel like leggings, making them perfect for active kids. The light wash denim brings a fresh, versatile look to any outfit.",
      price: 28.99,
      discountPrice: 22.99,
      rating: 4.6,
      reviewCount: 89,
      images: [
        "public/lovable-uploads/020696c3-296c-490d-b734-72aebd5b7b5a.png",
        "public/lovable-uploads/d8509b88-5b24-402e-acca-64c4ee56ac29.png"
      ],
      colors: [
        {
          name: "Light Blue",
          value: "#a8c5e0"
        }
      ],
      sizes: ["4", "5", "6", "7", "8", "10", "12", "14"],
      features: [
        "Signature pocket stitching",
        "Pull-on elastic waistband",
        "Super soft light wash denim",
        "Stretchy comfort fit",
        "No zippers or buttons"
      ],
      inStock: true,
      gender: "girl",
      ageRange: "5-7",
      brand: "Levi's Kids",
      material: "85% Cotton, 13% Polyester, 2% Elastane",
      category: "bottoms",
      tags: ["light wash", "jeggings", "elastic waist", "casual", "comfortable"]
    },
    {
      id: uuidv4(),
      name: "Girls' Classic Denim Jacket - Dark Wash",
      description: "This timeless dark wash denim jacket is a wardrobe essential. Featuring classic metal button closures, functional chest pockets, and side pockets. Made with premium denim that's durable yet comfortable, it's perfect for layering in all seasons.",
      price: 44.99,
      discountPrice: 39.99,
      rating: 4.9,
      reviewCount: 201,
      images: [
        "public/lovable-uploads/157ae854-89f2-47c6-863f-683fc20b3844.png"
      ],
      colors: [
        {
          name: "Dark Indigo",
          value: "#1d2951"
        }
      ],
      sizes: ["XS", "S", "M", "L", "XL"],
      features: [
        "Classic button front closure",
        "Functional chest and side pockets",
        "Adjustable button waistband",
        "Premium denim construction",
        "Iconic red tab detail"
      ],
      inStock: true,
      gender: "girl",
      ageRange: "8-10",
      brand: "Levi's Kids",
      material: "99% Cotton, 1% Elastane",
      category: "outerwear",
      tags: ["denim jacket", "layering", "classic", "dark wash", "essential"]
    },
    {
      id: uuidv4(),
      name: "Girls' Light Wash Denim Jacket",
      description: "A light wash version of our bestselling denim jacket, perfect for adding a touch of casual style to any outfit. Features the same quality construction with front button closure, functional pockets, and signature stitching. The lighter color makes it ideal for spring and summer.",
      price: 44.99,
      discountPrice: 36.99,
      rating: 4.8,
      reviewCount: 178,
      images: [
        "public/lovable-uploads/d8ddd0f2-7997-4712-a493-9bec696412e3.png"
      ],
      colors: [
        {
          name: "Light Blue",
          value: "#a8c5e0"
        }
      ],
      sizes: ["XS", "S", "M", "L", "XL"],
      features: [
        "Front button closure",
        "Functional chest pockets",
        "Side hand pockets",
        "Adjustable waistband",
        "Signature red tab detail"
      ],
      inStock: true,
      gender: "girl",
      ageRange: "8-10",
      brand: "Levi's Kids",
      material: "99% Cotton, 1% Elastane",
      category: "outerwear",
      tags: ["denim jacket", "light wash", "spring", "summer", "casual"]
    },
    {
      id: uuidv4(),
      name: "Girls' Floral Print Romper",
      description: "This adorable floral print romper features an off-shoulder design with adjustable straps and an elastic waistband for the perfect fit. The vibrant floral pattern adds a pop of color to any summer day. Includes convenient side pockets and an easy pull-on design.",
      price: 34.99,
      discountPrice: 29.99,
      rating: 4.7,
      reviewCount: 112,
      images: [
        "public/lovable-uploads/fc833c4e-5e86-4e39-b555-a427541f2339.png"
      ],
      colors: [
        {
          name: "Multicolor Floral",
          value: "#FF9AA2"
        }
      ],
      sizes: ["4", "5", "6", "7", "8", "10", "12"],
      features: [
        "Off-shoulder design",
        "Adjustable straps",
        "Elastic waistband",
        "Side pockets",
        "All-over floral print"
      ],
      inStock: true,
      gender: "girl",
      ageRange: "5-7",
      brand: "Island Collection",
      material: "100% Cotton",
      category: "dresses",
      tags: ["romper", "floral", "summer", "colorful", "playful"]
    }
  ];
};

export const seedInventoryWithProducts = (addProduct: (product: Product) => void) => {
  const products = generateProductsFromImages();
  products.forEach(product => {
    addProduct(product);
  });
  return products.length;
};
