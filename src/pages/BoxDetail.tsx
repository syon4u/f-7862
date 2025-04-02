
import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface BoxOption {
  id: string;
  name: string;
  sizes: string;
  items: string;
  description: string;
  price: string;
  image: string;
}

const BoxDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // Box data (in a real app, this would come from an API or context)
  const boxOptions: BoxOption[] = [
    {
      id: '1',
      name: 'Baby Boy Box',
      sizes: 'Newborn - 24 months',
      items: '6 items',
      description: 'A style mix of bottoms, tops and one-pieces. Perfect for your growing baby boy with comfortable, durable clothing that can withstand all their adventures.',
      price: 'US$85',
      image: '/lovable-uploads/7f1ef772-a46e-4a42-b089-8cb4abddcb34.png'
    },
    {
      id: '2',
      name: 'Baby Girl Box',
      sizes: 'Newborn - 24 months',
      items: '6 items',
      description: 'A style mix of bottoms, tops and one-pieces. Adorable outfits for your little girl with soft fabrics and cute designs that will make her stand out.',
      price: 'US$85',
      image: '/lovable-uploads/1603b4f5-d462-4411-a7a8-c5001b061886.png'
    },
    {
      id: '3',
      name: 'Classic Boy Box',
      sizes: '2T - 14 years',
      items: '4 items',
      description: 'A style mix of tops and bottoms. Quality clothing for active boys with durable fabrics that can handle playground adventures.',
      price: 'US$85',
      image: '/lovable-uploads/bc2db481-37c2-450f-a229-e25e3021907f.png'
    },
    {
      id: '4',
      name: 'Deluxe Boy Box',
      sizes: '2T - 14 years',
      items: '6 items',
      description: 'A style mix of tops and bottoms. Our premium selection for boys includes more items and higher-end brands for style-conscious families.',
      price: 'US$124',
      image: '/lovable-uploads/c22fa864-deb4-47b1-8d7f-3f2652269156.png'
    },
    {
      id: '5',
      name: 'Classic Girl Box',
      sizes: '2T - 14 years',
      items: '4 items',
      description: 'A style mix of tops, bottoms and one-pieces. Stylish options for girls who love to express themselves through fashion.',
      price: 'US$85',
      image: '/lovable-uploads/b29bd98b-c3d6-46b2-8679-220e3564a7cd.png'
    },
    {
      id: '6',
      name: 'Deluxe Girl Box',
      sizes: '2T - 14 years',
      items: '6 items',
      description: 'A style mix of tops, bottoms and one-pieces. Our premium collection for girls features more items and exclusive styles.',
      price: 'US$124',
      image: '/lovable-uploads/6f94432e-74b3-4770-a3ff-86d48982be97.png'
    }
  ];
  
  const box = boxOptions.find(box => box.id === id);
  
  if (!box) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <h1 className="font-league-spartan text-3xl md:text-4xl font-bold mb-4">Box Not Found</h1>
            <p className="mb-6">Sorry, the box you're looking for doesn't exist.</p>
            <Button asChild>
              <Link to="/shop-now">Back to Shop</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          className="mb-6" 
          onClick={() => navigate('/shop-now')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to All Boxes
        </Button>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Box Image */}
          <div className="rounded-lg overflow-hidden">
            <img 
              src={box.image} 
              alt={box.name}
              className="w-full h-auto object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = "/placeholder.svg";
              }}
            />
          </div>
          
          {/* Box Details */}
          <div>
            <h1 className="font-league-spartan text-3xl md:text-4xl font-bold mb-2">{box.name}</h1>
            <p className="text-2xl font-bold mb-4">{box.price}</p>
            <div className="bg-muted/30 p-4 rounded-lg mb-6">
              <p className="flex justify-between border-b pb-2 mb-2">
                <span className="font-medium">Size Range:</span>
                <span>{box.sizes}</span>
              </p>
              <p className="flex justify-between">
                <span className="font-medium">Items Included:</span>
                <span>{box.items}</span>
              </p>
            </div>
            <p className="mb-8">{box.description}</p>
            
            <div className="space-y-6">
              <Button className="w-full" size="lg" asChild>
                <Link to="/style-quiz">Customize This Box</Link>
              </Button>
              
              <div className="bg-muted/20 p-4 rounded-lg">
                <h3 className="font-bold mb-2">What's included:</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Curated selection of quality children's clothing</li>
                  <li>Free shipping and returns</li>
                  <li>Personalized styling based on your quiz results</li>
                  <li>Size exchange guarantee</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BoxDetail;
