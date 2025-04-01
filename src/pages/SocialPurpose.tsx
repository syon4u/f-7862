
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const SocialPurpose: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="font-league-spartan text-3xl md:text-4xl font-bold text-center mb-2">Our Social Purpose</h1>
        <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
          At Happy Kids Box, we believe in making a positive impact on children's lives while 
          providing quality clothing for families.
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="font-league-spartan text-2xl font-bold mb-4">Our Story</h2>
            <p className="mb-4">
              Happy Kids Box was born from a desire to solve two common problems faced by parents: 
              the time-consuming nature of shopping for constantly growing children and the environmental 
              impact of fast fashion.
            </p>
            <p className="mb-4">
              We started in Jamaica with a mission to provide convenient access to quality children's 
              clothing while supporting local communities and sustainable practices.
            </p>
            <p>
              Today, we're proud to offer a service that saves parents time and stress while ensuring 
              children receive clothes that are durable, comfortable, and stylish.
            </p>
          </div>
          <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1617347454181-1ba3b25bbf5d?q=80&w=1000" 
              alt="Happy children wearing our clothes" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        <Separator className="my-12" />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1535572290543-960a8046f5af?q=80&w=1000" 
              alt="Happy children wearing our clothes" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="font-league-spartan text-2xl font-bold mb-4">Our Mission</h2>
            <p className="mb-4">
              At Happy Kids Box, we believe that every child's wellbeing is our business. We've created an 
              end-to-end retail e-commerce platform that allows busy parents and guardians to 
              conveniently discover and purchase quality brand clothing for children between the ages of 0-12 years.
            </p>
            <p className="mb-6">
              "To partner with Jamaican parents and guardians in fulfilling the social, physiological and physical needs 
              of their young children; through accessibility, affordability and affinity based value creation."
            </p>
            <div>
              <Button asChild className="bg-secondary hover:bg-secondary/90">
                <Link to="/how-it-works">See How It Works</Link>
              </Button>
            </div>
          </div>
        </div>
        
        <Separator className="my-12" />
        
        <div className="mb-16">
          <h2 className="font-league-spartan text-2xl font-bold text-center mb-8">Our Commitments</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-montserrat text-lg font-semibold mb-2 text-primary">Community Support</h3>
              <p className="text-muted-foreground">
                For every 10 boxes sold, we donate a box of clothing to children in need through our 
                partnerships with local charities and community organizations.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-montserrat text-lg font-semibold mb-2 text-secondary">Sustainability</h3>
              <p className="text-muted-foreground">
                We prioritize brands that use sustainable materials and ethical manufacturing processes. 
                Our packaging is also made from recycled materials and is fully recyclable.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-montserrat text-lg font-semibold mb-2 text-tertiary">Local Employment</h3>
              <p className="text-muted-foreground">
                We're proud to create jobs within our local community, from our warehouse staff to our 
                stylists who carefully select each item for your child.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-primary/10 rounded-lg p-8 mb-16 text-center">
          <h2 className="font-league-spartan text-2xl font-bold mb-6">Join Us In Making A Difference</h2>
          <p className="mb-6 max-w-2xl mx-auto">
            When you choose Happy Kids Box, you're not just simplifying your shopping experience – you're supporting
            a business that cares about community impact, sustainability, and creating local jobs.
          </p>
          <Button asChild className="bg-primary hover:bg-primary/90">
            <Link to="/shop-now">Shop Now</Link>
          </Button>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SocialPurpose;
