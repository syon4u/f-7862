
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface BoxOption {
  id: string;
  name: string;
  sizes: string;
  items: string;
  description: string;
  price: string;
  image: string;
}

const ShopNow: React.FC = () => {
  const boxOptions: BoxOption[] = [
    {
      id: '1',
      name: 'Baby Boy Box',
      sizes: 'Newborn - 24 months',
      items: '6 items',
      description: 'A style mix of bottoms, tops and one-pieces',
      price: 'US$85',
      image: '/lovable-uploads/7f1ef772-a46e-4a42-b089-8cb4abddcb34.png'
    },
    {
      id: '2',
      name: 'Baby Girl Box',
      sizes: 'Newborn - 24 months',
      items: '6 items',
      description: 'A style mix of bottoms, tops and one-pieces',
      price: 'US$85',
      image: '/lovable-uploads/1603b4f5-d462-4411-a7a8-c5001b061886.png'
    },
    {
      id: '3',
      name: 'Classic Boy Box',
      sizes: '2T - 14 years',
      items: '4 items',
      description: 'A style mix of tops and bottoms',
      price: 'US$85',
      image: '/lovable-uploads/bc2db481-37c2-450f-a229-e25e3021907f.png'
    },
    {
      id: '4',
      name: 'Deluxe Boy Box',
      sizes: '2T - 14 years',
      items: '6 items',
      description: 'A style mix of tops and bottoms',
      price: 'US$124',
      image: '/lovable-uploads/c22fa864-deb4-47b1-8d7f-3f2652269156.png'
    },
    {
      id: '5',
      name: 'Classic Girl Box',
      sizes: '2T - 14 years',
      items: '4 items',
      description: 'A style mix of tops, bottoms and one-pieces',
      price: 'US$85',
      image: '/lovable-uploads/b29bd98b-c3d6-46b2-8679-220e3564a7cd.png'
    },
    {
      id: '6',
      name: 'Deluxe Girl Box',
      sizes: '2T - 14 years',
      items: '6 items',
      description: 'A style mix of tops, bottoms and one-pieces',
      price: 'US$124',
      image: '/lovable-uploads/6f94432e-74b3-4770-a3ff-86d48982be97.png'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="font-league-spartan text-3xl md:text-4xl font-bold text-center mb-2">Select Your Happy Kids Box</h1>
        <p className="text-center text-muted-foreground mb-12">Choose the perfect clothing subscription box for your little one</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {boxOptions.map((box) => (
            <div key={box.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <Link to={`/box/${box.id}`} className="block">
                <div className="relative">
                  <AspectRatio ratio={1/1} className="bg-muted">
                    <img 
                      src={box.image} 
                      alt={box.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = "/placeholder.svg";
                        target.classList.remove("hover:scale-105");
                      }}
                    />
                  </AspectRatio>
                </div>
              </Link>
              <div className="p-6">
                <Link to={`/box/${box.id}`}>
                  <h3 className="font-league-spartan text-xl font-bold mb-2 hover:text-primary transition-colors">{box.name}</h3>
                </Link>
                <p className="text-sm mb-1"><span className="font-medium">Size:</span> {box.sizes}</p>
                <p className="text-sm mb-1"><span className="font-medium">{box.items}</span></p>
                <p className="text-sm text-muted-foreground mb-4">{box.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold">{box.price}</span>
                  <span className="text-sm text-muted-foreground">Includes shipping</span>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 mt-4">
                  <Button 
                    className="flex-1 bg-primary hover:bg-primary/90"
                    asChild
                  >
                    <Link to={`/box/${box.id}`}>View Details</Link>
                  </Button>
                  <Button 
                    className="flex-1 bg-secondary hover:bg-secondary/90"
                    asChild
                  >
                    <Link to="/style-quiz">Style Quiz</Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <h2 className="font-league-spartan text-2xl font-bold mb-4">Ready to Style Your Box?</h2>
          <p className="mb-6">Complete our style quiz to help us curate the perfect selection for your child</p>
          <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90">
            <Link to="/style-quiz">Take Style Quiz</Link>
          </Button>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ShopNow;
