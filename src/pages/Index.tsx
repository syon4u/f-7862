
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const Index: React.FC = () => {
  const features = [
    {
      title: "Curated Collections",
      description: "Handpicked quality clothing selected specifically for your child's style and needs."
    },
    {
      title: "Stress-Free Shopping",
      description: "No more mall trips or endless browsing online. We deliver right to your door."
    },
    {
      title: "Quality Brands",
      description: "Durable, comfortable clothing from trusted brands that kids love to wear."
    },
    {
      title: "Personalized Experience",
      description: "Our style quiz ensures your child receives clothes that match their personality."
    }
  ];

  const testimonials = [
    {
      quote: "Happy Kids Box has made shopping for my growing children so much easier. The clothes are always high quality and my kids love them!",
      author: "Lisa M., Mother of 2"
    },
    {
      quote: "I was skeptical at first, but now I'm hooked! The style quiz really works - my daughter loves everything in her box.",
      author: "Michelle T., Mother of 1"
    },
    {
      quote: "As a busy working mom, Happy Kids Box has been a lifesaver. Beautiful clothes delivered right to our door!",
      author: "Sarah K., Mother of 3"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/20 to-background pt-16 pb-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="font-league-spartan text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                  Kid's Clothing Made <span className="text-primary">Simple</span>
                </h1>
                <p className="text-lg mb-8">
                  Quality children's clothing delivered to your door, tailored to your child's style and personality. No shopping stress, just happy kids!
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90">
                    <Link to="/shop-now">Shop Now</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline">
                    <Link to="/how-it-works">How It Works</Link>
                  </Button>
                </div>
              </div>
              <div className="aspect-square relative rounded-lg overflow-hidden shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1607453998774-d533f65dac99?q=80&w=1000" 
                  alt="Happy kids wearing stylish clothes" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Subscription Boxes Preview */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="font-league-spartan text-3xl font-bold text-center mb-2">Our Subscription Boxes</h2>
            <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
              Choose the perfect box that fits your child's needs and your budget.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-muted rounded-lg shadow-md overflow-hidden">
                <div className="aspect-[4/3] overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1632163030629-a7b9a21b6094?q=80&w=1000" 
                    alt="Baby Box" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-league-spartan text-xl font-bold mb-2">HK Baby Box</h3>
                  <p className="text-muted-foreground mb-4">Perfect for newborns to 24 months, 6 adorable pieces.</p>
                  <p className="font-bold text-lg mb-4">US$85</p>
                  <Button asChild className="w-full bg-primary hover:bg-primary/90">
                    <Link to="/shop-now">Select Box</Link>
                  </Button>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md overflow-hidden transform scale-105 border-2 border-secondary">
                <div className="bg-secondary text-white py-1 px-4 text-center text-sm font-medium">
                  Most Popular
                </div>
                <div className="aspect-[4/3] overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1519403744128-5eed654514c5?q=80&w=1000" 
                    alt="Classic Box" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-league-spartan text-xl font-bold mb-2">HK Classic Box</h3>
                  <p className="text-muted-foreground mb-4">For ages 2-14 years, 4 stylish, mix-and-match pieces.</p>
                  <p className="font-bold text-lg mb-4">US$85</p>
                  <Button asChild className="w-full bg-secondary hover:bg-secondary/90">
                    <Link to="/shop-now">Select Box</Link>
                  </Button>
                </div>
              </div>
              
              <div className="bg-muted rounded-lg shadow-md overflow-hidden">
                <div className="aspect-[4/3] overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?q=80&w=1000" 
                    alt="Deluxe Box" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-league-spartan text-xl font-bold mb-2">HK Deluxe Box</h3>
                  <p className="text-muted-foreground mb-4">For ages 2-14 years, 6 premium pieces for any occasion.</p>
                  <p className="font-bold text-lg mb-4">US$124</p>
                  <Button asChild className="w-full bg-primary hover:bg-primary/90">
                    <Link to="/shop-now">Select Box</Link>
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-10">
              <Button asChild size="lg" variant="outline">
                <Link to="/shop-now">View All Box Options</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="font-league-spartan text-3xl font-bold text-center mb-2">How It Works</h2>
            <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
              Getting started with Happy Kids Box is simple and stress-free.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">1</div>
                <h3 className="font-league-spartan text-xl font-bold mb-2">Choose Your Box</h3>
                <p className="text-muted-foreground">Select the subscription box that fits your needs and budget.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">2</div>
                <h3 className="font-league-spartan text-xl font-bold mb-2">Take Style Quiz</h3>
                <p className="text-muted-foreground">Tell us about your child's personality and preferences.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-tertiary flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">3</div>
                <h3 className="font-league-spartan text-xl font-bold mb-2">Receive Your Box</h3>
                <p className="text-muted-foreground">We deliver handpicked clothing items right to your door.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-quaternary flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">4</div>
                <h3 className="font-league-spartan text-xl font-bold mb-2">Keep Everything</h3>
                <p className="text-muted-foreground">No returns needed! Everything in your box is yours to keep.</p>
              </div>
            </div>
            
            <div className="text-center mt-10">
              <Button asChild size="lg" className="bg-tertiary hover:bg-tertiary/90">
                <Link to="/how-it-works">Learn More</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <h2 className="font-league-spartan text-3xl font-bold mb-6">Why Choose Happy Kids Box?</h2>
                
                <div className="space-y-6">
                  {features.map((feature, index) => (
                    <div key={index} className="flex">
                      <div className="mr-4 mt-1">
                        <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm">✓</div>
                      </div>
                      <div>
                        <h3 className="font-montserrat text-lg font-semibold mb-1">{feature.title}</h3>
                        <p className="text-muted-foreground">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8">
                  <Button asChild size="lg" className="bg-quinary hover:bg-quinary/90">
                    <Link to="/social-purpose">Learn About Our Mission</Link>
                  </Button>
                </div>
              </div>
              
              <div className="order-1 lg:order-2">
                <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-xl">
                  <img 
                    src="https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?q=80&w=1000" 
                    alt="Child opening Happy Kids Box" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 bg-primary/10">
          <div className="container mx-auto px-4">
            <h2 className="font-league-spartan text-3xl font-bold text-center mb-2">What Parents Say</h2>
            <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
              Don't just take our word for it. Here's what our happy customers have to say.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                  <div className="text-4xl text-primary mb-4">"</div>
                  <p className="italic mb-4">{testimonial.quote}</p>
                  <Separator className="mb-4" />
                  <p className="font-medium">{testimonial.author}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-secondary/20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-league-spartan text-3xl md:text-4xl font-bold mb-4">
              Ready to simplify your child's wardrobe?
            </h2>
            <p className="text-lg mb-8 max-w-3xl mx-auto">
              Join thousands of happy parents who trust Happy Kids Box for their children's clothing needs. 
              Get started today!
            </p>
            <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90">
              <Link to="/shop-now">Get Started Now</Link>
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
