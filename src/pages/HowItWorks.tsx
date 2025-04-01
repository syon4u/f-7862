
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { Box, Palette, Package, Truck, Book, Gift, Calendar, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: <Box className="w-12 h-12 text-primary" />,
      title: "Choose Your Box",
      description: "Select from our range of subscription boxes based on your child's age, gender, and your budget. If you're not sure what to choose, complete our style quiz for personalized recommendations."
    },
    {
      icon: <Palette className="w-12 h-12 text-secondary" />,
      title: "Complete Style Quiz",
      description: "Tell us about your child's personality, preferences, and style to help us curate the perfect selection for their needs."
    },
    {
      icon: <Package className="w-12 h-12 text-tertiary" />,
      title: "We Curate Your Box",
      description: "Our expert stylists handpick quality brand clothes that match your child's style preferences and size requirements."
    },
    {
      icon: <Truck className="w-12 h-12 text-quaternary" />,
      title: "We Deliver To You",
      description: "Receive your carefully curated box right at your doorstep with no hassle. Every piece is yours to keep and enjoy!"
    }
  ];

  const valueProps = [
    {
      icon: <Book className="w-10 h-10 text-primary" />,
      title: "Convenient Experience",
      description: "Our end-to-end retail e-commerce platform makes discovering and purchasing quality brand clothing stress-free."
    },
    {
      icon: <Gift className="w-10 h-10 text-secondary" />,
      title: "Special Offerings",
      description: "Enjoy special sales, promotions, and seasonal deals designed specifically for Jamaican families."
    },
    {
      icon: <Calendar className="w-10 h-10 text-tertiary" />,
      title: "Growing With Your Child",
      description: "Our 10-year business strategy ensures we'll be here as your child grows, with expanding services and options."
    },
    {
      icon: <Users className="w-10 h-10 text-quaternary" />,
      title: "Community Focus",
      description: "We're building a community of Jamaican parents and guardians focused on children's wellbeing and development."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <section>
          <h1 className="font-league-spartan text-3xl md:text-4xl font-bold text-center mb-2">How Happy Kids Box Works</h1>
          <p className="text-center text-muted-foreground mb-8 max-w-3xl mx-auto">
            Our simple process makes it easy to keep your child stylishly dressed with quality clothing delivered right to your door.
          </p>
        </section>
        
        <Separator className="my-12" />
        
        <section className="mb-16">
          <h2 className="font-league-spartan text-2xl font-bold text-center mb-12">Simple 4-Step Process</h2>
          
          <div className="relative">
            <div className="hidden md:block absolute left-0 top-1/2 w-full h-1 bg-primary/20 -translate-y-1/2 z-0"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
              {steps.map((step, index) => (
                <Card key={index} className="bg-white border shadow-md relative">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-md z-20">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="font-bold text-primary">{index + 1}</span>
                    </div>
                  </div>
                  <CardContent className="pt-8 pb-6 px-4 text-center">
                    <div className="mb-4 flex justify-center">
                      {step.icon}
                    </div>
                    <h3 className="font-league-spartan text-xl font-bold mb-3">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                    
                    {index === 0 && (
                      <div className="mt-4 flex flex-col gap-2">
                        <Button asChild size="sm" className="w-full">
                          <Link to="/shop-now">Choose a Box</Link>
                        </Button>
                        <Button asChild size="sm" variant="outline" className="w-full">
                          <Link to="/style-quiz">Take Style Quiz</Link>
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        <section className="bg-primary/10 rounded-lg p-8 mb-16">
          <h2 className="font-league-spartan text-2xl font-bold text-center mb-8">What Makes Us Different</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {valueProps.map((prop, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <div className="mb-4 flex justify-center">
                  {prop.icon}
                </div>
                <h3 className="font-league-spartan text-lg font-bold mb-2 text-center">{prop.title}</h3>
                <p className="text-muted-foreground text-center">{prop.description}</p>
              </div>
            ))}
          </div>
        </section>
        
        <section className="bg-gray-50 rounded-lg p-8 mb-16">
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
                We curate quality, durable children's clothing from trusted brands that provide excellent value for Jamaican families.
              </p>
            </div>
            <div>
              <h3 className="font-montserrat text-lg font-semibold mb-2">Do you deliver outside of Jamaica?</h3>
              <p className="text-muted-foreground">
                Currently, we focus on serving Jamaican families, but we have plans to expand to the Caribbean in the future.
              </p>
            </div>
          </div>
        </section>
        
        <section className="text-center py-8">
          <h2 className="font-league-spartan text-2xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            Join our growing community of Jamaican parents who are discovering the convenience of Happy Kids Box.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90">
              <Link to="/shop-now">Shop Now</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/style-quiz">Take Our Style Quiz</Link>
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default HowItWorks;
