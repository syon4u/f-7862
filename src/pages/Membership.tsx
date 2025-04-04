
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Star } from 'lucide-react';

const Membership: React.FC = () => {
  const benefits = [
    {
      title: "Financial Support",
      items: [
        "Exclusive discounts on all products",
        "Early access to sales and promotions",
        "Monthly budgeting resources and workshops",
        "Family finance planning guides",
        "Partner discounts on essential services"
      ]
    },
    {
      title: "Health & Wellness",
      items: [
        "Monthly wellness articles and resources",
        "Discounted access to family health services",
        "Children's nutrition guides",
        "Mental health resources for parents",
        "Virtual wellness workshops"
      ]
    },
    {
      title: "Community",
      items: [
        "Access to private community board",
        "Monthly virtual meetups with experts",
        "Networking opportunities with other parents",
        "Priority access to local events",
        "Exclusive member-only content"
      ]
    }
  ];

  const plans = [
    {
      name: "Monthly",
      price: 19.99,
      description: "Perfect for trying out our club benefits",
      features: [
        "Full access to all membership features",
        "Cancel anytime",
        "Community board access",
        "Monthly members-only newsletter"
      ]
    },
    {
      name: "Annual",
      price: 179.99,
      saved: "$60/year savings",
      description: "Our most popular and best value option",
      features: [
        "Everything in Monthly plan",
        "Two months free",
        "Exclusive annual member gift box",
        "Priority customer support"
      ],
      recommended: true
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-purple-50 via-pink-50 to-amber-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="font-league-spartan text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-tertiary bg-clip-text text-transparent mb-4">
            Membership Partnership Club
          </h1>
          <p className="text-lg text-gray-700">
            Join our exclusive club for parents and guardians to access premium benefits, resources, and a supportive community to help you and your family thrive.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-xl shadow-md p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-bl-full -z-10"></div>
            <h2 className="font-league-spartan text-2xl font-bold mb-6">Why Join Our Club?</h2>
            <p className="mb-6 text-gray-700">
              Our Membership Partnership Club is designed to provide holistic support to parents and guardians beyond just clothing. We offer resources and benefits across three key areas:
            </p>
            
            <Tabs defaultValue="financial">
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="financial">Financial</TabsTrigger>
                <TabsTrigger value="health">Health</TabsTrigger>
                <TabsTrigger value="community">Community</TabsTrigger>
              </TabsList>
              
              {benefits.map((benefit, index) => (
                <TabsContent key={index} value={benefit.title.toLowerCase().split(' ')[0]}>
                  <h3 className="font-medium text-xl mb-4">{benefit.title} Benefits</h3>
                  <ul className="space-y-3">
                    {benefit.items.map((item, idx) => (
                      <li key={idx} className="flex items-start">
                        <Check className="h-5 w-5 text-primary shrink-0 mr-2" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </TabsContent>
              ))}
            </Tabs>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-8 flex flex-col justify-center">
            <div className="relative mb-8">
              <img 
                src="/lovable-uploads/image(15).png" 
                alt="Happy family" 
                className="w-full h-48 object-cover rounded-lg" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-lg flex items-end">
                <div className="p-4 text-white">
                  <h3 className="text-xl font-bold">Join Our Community</h3>
                  <p>Connect with other parents and share experiences</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-primary/10 p-2 rounded-full mr-3">
                  <Star className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Exclusive Resources</h3>
                  <p className="text-sm text-gray-600">Access to premium parenting and financial resources</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary/10 p-2 rounded-full mr-3">
                  <Star className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Special Discounts</h3>
                  <p className="text-sm text-gray-600">Save on clothing boxes and partner services</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary/10 p-2 rounded-full mr-3">
                  <Star className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Community Support</h3>
                  <p className="text-sm text-gray-600">Connect with other parents in a supportive environment</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mb-12">
          <h2 className="font-league-spartan text-3xl font-bold text-center mb-8">Choose Your Membership Plan</h2>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {plans.map((plan, index) => (
              <Card key={index} className={`relative overflow-hidden ${plan.recommended ? 'border-primary shadow-lg' : 'border-gray-200'}`}>
                {plan.recommended && (
                  <div className="absolute top-4 right-4 bg-primary text-white text-xs font-bold py-1 px-3 rounded-full">
                    BEST VALUE
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="flex items-end mt-2">
                    <span className="text-3xl font-bold">${plan.price}</span>
                    {plan.name === "Monthly" ? (
                      <span className="text-gray-500 ml-1">/month</span>
                    ) : (
                      <span className="text-gray-500 ml-1">/year</span>
                    )}
                  </div>
                  {plan.saved && (
                    <div className="mt-1 text-sm text-primary font-medium">{plan.saved}</div>
                  )}
                  <CardDescription className="mt-2">{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <Check className="h-5 w-5 text-primary shrink-0 mr-2" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className={`w-full ${plan.recommended ? 'bg-primary hover:bg-primary/90' : ''}`}>
                    Join Now
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
        
        <div className="bg-primary/10 rounded-xl p-8 text-center max-w-3xl mx-auto">
          <h2 className="font-league-spartan text-2xl font-bold mb-4">Ready to Join Our Community?</h2>
          <p className="mb-6">
            Join Happy Kids Box Membership Club today and gain access to exclusive benefits, resources, and a supportive community.
          </p>
          <Button size="lg" className="bg-primary hover:bg-primary/90">
            Sign Up Now
          </Button>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Membership;
