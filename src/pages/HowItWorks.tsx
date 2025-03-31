
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ArrowDownCircle, PackageCheck, Palette, ShoppingBag } from 'lucide-react';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: <ShoppingBag className="w-12 h-12 text-primary" />,
      title: "Choose Your Box",
      description: "Select from our range of subscription boxes based on your child's age and your budget."
    },
    {
      icon: <Palette className="w-12 h-12 text-secondary" />,
      title: "Complete Style Quiz",
      description: "Tell us about your child's personality, preferences, and style to help us curate the perfect selection."
    },
    {
      icon: <PackageCheck className="w-12 h-12 text-tertiary" />,
      title: "Receive Your Box",
      description: "We'll handpick and deliver quality brand clothes that match your child's style and needs."
    },
    {
      icon: <ArrowDownCircle className="w-12 h-12 text-quaternary" />,
      title: "Keep Everything",
      description: "No returns needed! Every piece is yours to keep and enjoy with your little one."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="font-league-spartan text-3xl md:text-4xl font-bold text-center mb-2">How It Works</h1>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Happy Kids Box makes shopping for children's clothing simple, convenient, and fun. 
          Here's how our subscription service works.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {steps.map((step, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="mb-4 flex justify-center">
                {step.icon}
              </div>
              <h3 className="font-league-spartan text-xl font-bold mb-2">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
        
        <div className="bg-gray-50 rounded-lg p-8 mb-16">
          <h2 className="font-league-spartan text-2xl font-bold text-center mb-6">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-montserrat text-lg font-semibold mb-2">How often will I receive a box?</h3>
              <p className="text-muted-foreground">
                You can choose your delivery frequency - monthly, bi-monthly, or quarterly depending on your needs.
              </p>
            </div>
            <div>
              <h3 className="font-montserrat text-lg font-semibold mb-2">Can I change box sizes as my child grows?</h3>
              <p className="text-muted-foreground">
                Absolutely! You can easily update your child's size information in your account settings.
              </p>
            </div>
            <div>
              <h3 className="font-montserrat text-lg font-semibold mb-2">What brands do you carry?</h3>
              <p className="text-muted-foreground">
                We curate quality, durable children's clothing from trusted brands that provide excellent value.
              </p>
            </div>
            <div>
              <h3 className="font-montserrat text-lg font-semibold mb-2">Can I skip a delivery?</h3>
              <p className="text-muted-foreground">
                Yes, you can easily skip a delivery or pause your subscription from your account dashboard.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default HowItWorks;
