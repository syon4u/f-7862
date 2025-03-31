
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
      name: 'HK Baby Box',
      sizes: 'Newborn - 24 months',
      items: '6 items',
      description: '(style mix of brand bottoms, tops and one-piece outfits)',
      price: 'US$85',
      image: 'https://images.unsplash.com/photo-1544413164-5f1b361f5n69?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmFieSUyMGNsb3RoZXN8ZW58MHx8MHx8fDA%3D'
    },
    {
      id: '2',
      name: 'HK Mini Box',
      sizes: '2T- 14 years',
      items: '2 items',
      description: '(styled brand outfit)',
      price: 'US$62',
      image: 'https://images.unsplash.com/photo-1543266793-7d7a2c640fb6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGtpZHMlMjBjbG90aGVzfGVufDB8fDB8fHww'
    },
    {
      id: '3',
      name: 'HK Classic Box',
      sizes: '2T- 14 years',
      items: '4 items',
      description: '(style mix of brand bottoms, tops and one-piece outfits)',
      price: 'US$85',
      image: 'https://images.unsplash.com/photo-1519392933350-e5b0672e5b34?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGtpZHMlMjBjbG90aGVzfGVufDB8fDB8fHww'
    },
    {
      id: '4',
      name: 'HK Deluxe Box',
      sizes: '2T- 14 years',
      items: '6 items',
      description: '(style mix of brand bottoms, tops and one-piece outfits)',
      price: 'US$124',
      image: 'https://images.unsplash.com/photo-1519241047957-be31d7379a5d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fGtpZHMlMjBjbG90aGVzfGVufDB8fDB8fHww'
    },
    {
      id: '5',
      name: 'HK Grand Box',
      sizes: '2T- 14 years',
      items: '8 items',
      description: '(style mix of brand bottoms, tops and one-piece outfits)',
      price: 'US$155',
      image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDF8fGtpZHMlMjBjbG90aGVzfGVufDB8fDB8fHww'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="font-league-spartan text-3xl md:text-4xl font-bold text-center mb-2">Select Your Box Option</h1>
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
