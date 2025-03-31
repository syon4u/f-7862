
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { ArrowDownCircle, PackageCheck, Palette, ShoppingBag, Book, Gift, Calendar, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: <ShoppingBag className="w-12 h-12 text-primary" />,
      title: "Choose Your Box",
      description: "Select from our range of subscription boxes based on your child's age and your budget - from our Baby Box to our Grand Box options."
    },
    {
      icon: <Palette className="w-12 h-12 text-secondary" />,
      title: "Complete Style Quiz",
      description: "Tell us about your child's personality, preferences, and style to help us curate the perfect selection for their needs."
    },
    {
      icon: <PackageCheck className="w-12 h-12 text-tertiary" />,
      title: "Receive Your Box",
      description: "We'll handpick and deliver quality brand clothes that match your child's style right to your door in Jamaica."
    },
    {
      icon: <ArrowDownCircle className="w-12 h-12 text-quaternary" />,
      title: "Keep Everything",
      description: "No returns needed! Every piece is yours to keep and enjoy with your child. It's that simple!"
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
            "To partner with Jamaican parents and guardians in fulfilling the social, physiological and physical needs 
            of their young children; through accessibility, affordability and affinity based value creation."
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="flex flex-col justify-center">
              <h2 className="font-league-spartan text-2xl font-bold mb-4">Our Mission</h2>
              <p className="mb-4">
                At Happy Kids Box, we believe that every child's wellbeing is our business. We've created an 
                end-to-end retail e-commerce platform that allows busy parents and guardians to 
                conveniently discover and purchase quality brand clothing for children between the ages of 0-12 years.
              </p>
              <p className="mb-6">
                Our service is designed specifically for Jamaican families who value accessibility, affordability, 
                and quality when shopping for their children's clothing needs.
              </p>
              <div>
                <Button asChild className="bg-secondary hover:bg-secondary/90">
                  <Link to="/style-quiz">Take Our Style Quiz</Link>
                </Button>
              </div>
            </div>
            <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1535572290543-960a8046f5af?q=80&w=1000" 
                alt="Happy children wearing our clothes" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>
        
        <Separator className="my-12" />
        
        <section>
          <h2 className="font-league-spartan text-2xl font-bold text-center mb-8">Simple 4-Step Process</h2>
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
        
        <section className="mb-16">
          <h2 className="font-league-spartan text-2xl font-bold text-center mb-8">Our Growth Journey</h2>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary/30"></div>
            <div className="grid grid-cols-1 gap-8">
              <TimelineItem 
                year="2024-2026" 
                title="Business Launch" 
                description="Launching our e-commerce store with special deliveries and introducing our first subscription boxes."
                align="left"
              />
              <TimelineItem 
                year="2026-2028" 
                title="Expanded Space & Loyalty" 
                description="Moving to an expanded space, introducing box package deals, and launching our loyalty program with brand partnerships."
                align="right"
              />
              <TimelineItem 
                year="2028-2030" 
                title="Fulfillment Center" 
                description="Opening our own fulfillment center with convenient pick-up locations throughout Kingston."
                align="left"
              />
              <TimelineItem 
                year="2030-2032" 
                title="Service Diversification" 
                description="Expanding our fulfillment center and diversifying services to include Kids Spa and Birthday Zone."
                align="right"
              />
              <TimelineItem 
                year="2032-2034" 
                title="Nationwide Expansion" 
                description="Expanding to Western Jamaica with more fulfillment centers and introducing our mobile boutique."
                align="left"
              />
            </div>
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

const TimelineItem: React.FC<{
  year: string;
  title: string;
  description: string;
  align: 'left' | 'right';
}> = ({ year, title, description, align }) => {
  return (
    <div className={`flex ${align === 'left' ? 'justify-end md:pr-12' : 'justify-start md:pl-12'} relative`}>
      <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-primary"></div>
      <div className={`w-full md:w-1/2 bg-white rounded-lg shadow-md p-6 ${align === 'left' ? 'text-right' : 'text-left'}`}>
        <span className="font-montserrat text-sm font-medium text-primary">{year}</span>
        <h3 className="font-league-spartan text-lg font-bold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

export default HowItWorks;
