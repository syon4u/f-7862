import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Heart, Gift, Users, MapPin } from 'lucide-react';

const DonationProgram: React.FC = () => {
  const donationOptions = [
    {
      title: "Single Donation",
      description: "Donate a one-time clothing box to a child in need",
      price: 49.99,
      image: "/lovable-uploads/image(10).png",
      impact: "Provides essential clothing for one child"
    },
    {
      title: "Bundle Donation",
      description: "Donate three clothing boxes at a discounted rate",
      price: 129.99,
      image: "/lovable-uploads/image(8).png",
      impact: "Helps three children with quality clothing",
      discount: "Save $20"
    },
    {
      title: "Monthly Donation",
      description: "Set up a recurring monthly donation",
      price: 39.99,
      image: "/lovable-uploads/image(12).png",
      impact: "Provides consistent support to children in need",
      recurring: true
    }
  ];

  const impactStats = [
    { label: "Boxes Donated", value: 1247, icon: Gift },
    { label: "Children Supported", value: 842, icon: Users },
    { label: "Partner Homes", value: 12, icon: MapPin },
  ];

  const partnerHomes = [
    {
      name: "Sunshine Children's Home",
      location: "Kingston",
      childrenHelped: 126,
      progress: 78,
      image: "/lovable-uploads/image(3).png"
    },
    {
      name: "Hope Harbor Children's Home",
      location: "Montego Bay",
      childrenHelped: 97,
      progress: 62,
      image: "/lovable-uploads/image(6).png"
    },
    {
      name: "New Beginnings Shelter",
      location: "Spanish Town",
      childrenHelped: 84,
      progress: 45,
      image: "/lovable-uploads/image(15).png"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-amber-50 via-blue-50 to-green-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-block p-2 bg-primary/10 rounded-full mb-4">
            <Heart className="h-6 w-6 text-primary" />
          </div>
          <h1 className="font-league-spartan text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-tertiary bg-clip-text text-transparent mb-4">
            Make a Difference
          </h1>
          <p className="text-lg text-gray-700">
            Help us provide quality clothing to underprivileged children across Jamaica through our donation program.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {impactStats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md p-6 text-center">
              <div className="mx-auto w-12 h-12 flex items-center justify-center bg-primary/10 rounded-full mb-4">
                <stat.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-primary to-tertiary bg-clip-text text-transparent mb-1">
                {stat.value.toLocaleString()}
              </h3>
              <p className="text-gray-700">{stat.label}</p>
            </div>
          ))}
        </div>
        
        <div className="mb-16">
          <h2 className="font-league-spartan text-3xl font-bold text-center mb-8">How It Works</h2>
          
          <div className="relative">
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-primary/20 -translate-y-1/2 z-0"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
              <div className="bg-white rounded-xl shadow-md p-6 text-center">
                <div className="mx-auto w-12 h-12 flex items-center justify-center bg-primary text-white rounded-full mb-6">1</div>
                <h3 className="font-bold text-xl mb-3">Choose a Donation</h3>
                <p className="text-gray-700">
                  Select from our various donation options based on your budget and preference.
                </p>
              </div>
              
              <div className="bg-white rounded-xl shadow-md p-6 text-center">
                <div className="mx-auto w-12 h-12 flex items-center justify-center bg-primary text-white rounded-full mb-6">2</div>
                <h3 className="font-bold text-xl mb-3">We Deliver</h3>
                <p className="text-gray-700">
                  We deliver high-quality clothing boxes to our partner children's homes across Jamaica.
                </p>
              </div>
              
              <div className="bg-white rounded-xl shadow-md p-6 text-center">
                <div className="mx-auto w-12 h-12 flex items-center justify-center bg-primary text-white rounded-full mb-6">3</div>
                <h3 className="font-bold text-xl mb-3">Track Your Impact</h3>
                <p className="text-gray-700">
                  Receive updates on your donation's impact and the children you've helped support.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mb-16">
          <h2 className="font-league-spartan text-3xl font-bold text-center mb-8">Donation Options</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {donationOptions.map((option, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={option.image} 
                    alt={option.title} 
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                  />
                </div>
                <CardHeader>
                  <CardTitle>{option.title}</CardTitle>
                  <CardDescription>{option.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-baseline mb-4">
                    <span className="text-2xl font-bold">${option.price}</span>
                    {option.recurring && <span className="text-gray-500 ml-1">/month</span>}
                  </div>
                  <p className="text-sm mb-2">
                    <strong>Impact:</strong> {option.impact}
                  </p>
                  {option.discount && (
                    <div className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                      {option.discount}
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-primary hover:bg-primary/90">
                    Donate Now
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
        
        <div className="mb-16">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <h2 className="font-league-spartan text-3xl font-bold">Our Partner Homes</h2>
            <Button variant="outline" className="mt-4 md:mt-0">
              View All Partners
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {partnerHomes.map((home, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={home.image} 
                    alt={home.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-1">{home.name}</h3>
                  <p className="text-gray-500 mb-4 flex items-center">
                    <MapPin className="h-4 w-4 mr-1" /> {home.location}
                  </p>
                  
                  <div className="mb-4">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Current Goal Progress</span>
                      <span className="text-sm font-medium">{home.progress}%</span>
                    </div>
                    <Progress value={home.progress} className="h-2" />
                  </div>
                  
                  <p className="text-sm text-gray-700">
                    <strong>{home.childrenHelped}</strong> children helped so far
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-primary/10 rounded-xl p-8 text-center max-w-3xl mx-auto">
          <h2 className="font-league-spartan text-2xl font-bold mb-4">Ready to Make a Difference?</h2>
          <p className="mb-6">
            Your donation can provide essential clothing to children in need across Jamaica.
          </p>
          <Button size="lg" className="bg-primary hover:bg-primary/90">
            Donate Now
          </Button>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default DonationProgram;
