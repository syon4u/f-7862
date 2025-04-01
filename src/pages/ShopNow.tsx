
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';

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
      image: '/lovable-uploads/494ece28-9057-4d3a-85ad-73b8c5e59d8c.png'
    },
    {
      id: '2',
      name: 'Baby Girl Box',
      sizes: 'Newborn - 24 months',
      items: '6 items',
      description: 'A style mix of bottoms, tops and one-pieces',
      price: 'US$85',
      image: '/lovable-uploads/3abf5482-391c-402e-ba1f-2ef92ae703ec.png'
    },
    {
      id: '3',
      name: 'Classic Boy Box',
      sizes: '2T - 14 years',
      items: '4 items',
      description: 'A style mix of tops and bottoms',
      price: 'US$85',
      image: '/lovable-uploads/f9c911a0-93ee-488f-b585-0a8f590f189d.png'
    },
    {
      id: '4',
      name: 'Deluxe Boy Box',
      sizes: '2T - 14 years',
      items: '6 items',
      description: 'A style mix of tops and bottoms',
      price: 'US$124',
      image: '/lovable-uploads/bf084176-f391-479e-9596-fc7c6075a4e6.png'
    },
    {
      id: '5',
      name: 'Classic Girl Box',
      sizes: '2T - 14 years',
      items: '4 items',
      description: 'A style mix of tops, bottoms and one-pieces',
      price: 'US$85',
      image: '/lovable-uploads/9ba91523-8974-43d9-8cd7-284caed511a8.png'
    },
    {
      id: '6',
      name: 'Deluxe Girl Box',
      sizes: '2T - 14 years',
      items: '6 items',
      description: 'A style mix of tops, bottoms and one-pieces',
      price: 'US$124',
      image: '/lovable-uploads/a168f316-8f5a-400d-9c72-632a270f6f98.png'
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
              <div className="aspect-square overflow-hidden">
                <img 
                  src={box.image} 
                  alt={box.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="font-league-spartan text-xl font-bold mb-2">{box.name}</h3>
                <p className="text-sm mb-1"><span className="font-medium">Size:</span> {box.sizes}</p>
                <p className="text-sm mb-1"><span className="font-medium">{box.items}</span></p>
                <p className="text-sm text-muted-foreground mb-4">{box.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold">{box.price}</span>
                  <span className="text-sm text-muted-foreground">Includes shipping</span>
                </div>
                <Button className="w-full mt-4 bg-primary hover:bg-primary/90">Select Box</Button>
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
