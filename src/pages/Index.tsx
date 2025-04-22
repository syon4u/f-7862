
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from '@/components/ui/carousel';
import { useToast } from '@/components/ui/use-toast';

const Index: React.FC = () => {
  const { toast } = useToast();
  const [instagramImages, setInstagramImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const diverseImages = {
    boys: "https://fowdzmkxmvocegczvbua.supabase.co/storage/v1/object/public/hkbimages//image(17).png",
    girls: "https://fowdzmkxmvocegczvbua.supabase.co/storage/v1/object/public/hkbimages//image(33).png",
    baby: "https://fowdzmkxmvocegczvbua.supabase.co/storage/v1/object/public/hkbimages//Screenshot%202022-08-02%20232630.png",
    footwear: "https://fowdzmkxmvocegczvbua.supabase.co/storage/v1/object/public/hkbimages//istockphoto-520219029-612x612.jpg",
    hero: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?q=80&w=1000"
  };

  const categoryCards = [
    {
      title: "BOYS",
      image: diverseImages.boys,
      link: "/shop-clothing?category=boys"
    },
    {
      title: "GIRLS",
      image: diverseImages.girls,
      link: "/shop-clothing?category=girls"
    },
    {
      title: "BABY",
      image: diverseImages.baby,
      link: "/shop-clothing?category=baby"
    },
    {
      title: "FOOTWEAR",
      image: diverseImages.footwear,
      link: "/shop-clothing?category=footwear"
    }
  ];

  const quickLinks = [
    { title: "BEST SELLERS", link: "/shop-clothing?sort=best-sellers" },
    { title: "HOLIDAY SHOP", link: "/shop-clothing?category=holiday" },
    { title: "EID", link: "/shop-clothing?category=eid" },
    { title: "EASTER", link: "/shop-clothing?category=easter" },
    { title: "SPORTSWEAR", link: "/shop-clothing?category=sportswear" },
    { title: "MATCHING SETS", link: "/shop-clothing?category=matching-sets" },
    { title: "SIBLING STYLE", link: "/shop-clothing?category=sibling-style" },
    { title: "SCHOOLWEAR", link: "/shop-clothing?category=schoolwear" }
  ];

  useEffect(() => {
    fetchInstagramImages();
  }, []);

  const fetchInstagramImages = async () => {
    setIsLoading(true);
    try {
      const images = await mockFetchInstagramImages();
      setInstagramImages(images);
    } catch (error) {
      console.error("Error fetching Instagram images:", error);
      toast({
        title: "Couldn't load images from Instagram",
        description: "Using fallback images instead. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const mockFetchInstagramImages = async (): Promise<string[]> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return [
      "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?q=80&w=500",
      "https://images.unsplash.com/photo-1604652716188-77c0a9908e47?q=80&w=500",
      "https://images.unsplash.com/photo-1633966887768-64f9a867bdba?q=80&w=500",
      "https://images.unsplash.com/photo-1590013500472-2c2d7349dffb?q=80&w=500",
      "https://images.unsplash.com/photo-1471039497385-b6d6ba609f9c?q=80&w=500",
      "https://images.unsplash.com/photo-1611403570720-162d8829689a?q=80&w=500"
    ];
  };

  const carouselImages = instagramImages.length > 0 ? instagramImages : Array.from({ length: 6 }).map((_, i) => 
    `https://images.unsplash.com/photo-${1590000000 + i * 100000}?q=80&w=500`
  );

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      <main className="flex-grow">
        <section className="relative">
          <div className="w-full h-[500px] md:h-[600px] overflow-hidden">
            <img 
              src={diverseImages.hero} 
              alt="Spring children's clothing collection" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-league-spartan font-bold text-white drop-shadow-md mb-8">
                Spring Wardrobe Refresh!
              </h1>
              <Button asChild size="lg" className="bg-white text-black hover:bg-white/90 px-8 py-6 text-lg font-semibold">
                <Link to="/shop-now">SHOP NEW IN</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-4 border-b">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center flex-wrap gap-8">
              {quickLinks.map((link, index) => (
                <Link 
                  key={index} 
                  to={link.link} 
                  className="text-sm font-medium hover:text-primary transition-colors"
                >
                  {link.title}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {categoryCards.map((card, index) => (
                <Link key={index} to={card.link} className="group">
                  <div className="relative aspect-square overflow-hidden">
                    <img 
                      src={card.image} 
                      alt={`${card.title} category`} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 flex items-end justify-center pb-8 bg-gradient-to-t from-black/40 to-transparent">
                      <h3 className="text-2xl font-bold text-white">{card.title}</h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">New In This Season</h2>
            
            <Carousel className="max-w-5xl mx-auto">
              <CarouselContent>
                {isLoading ? (
                  Array.from({ length: 3 }).map((_, index) => (
                    <CarouselItem key={`loading-${index}`} className="md:basis-1/3 lg:basis-1/3">
                      <div className="p-2">
                        <div className="bg-white rounded-md overflow-hidden shadow-sm">
                          <div className="aspect-square bg-gray-200 animate-pulse"></div>
                          <div className="p-4 space-y-2">
                            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                            <div className="h-4 w-1/3 bg-gray-200 rounded animate-pulse"></div>
                          </div>
                        </div>
                      </div>
                    </CarouselItem>
                  ))
                ) : (
                  carouselImages.map((imageUrl, index) => (
                    <CarouselItem key={index} className="md:basis-1/3 lg:basis-1/3">
                      <Link to={`/shop-clothing/product-${index + 1}`}>
                        <div className="p-2">
                          <div className="bg-white rounded-md overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                            <div className="aspect-square overflow-hidden">
                              <img 
                                src={imageUrl} 
                                alt={`Product ${index + 1}`}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.src = diverseImages.baby;
                                }}
                              />
                            </div>
                            <div className="p-4">
                              <h3 className="font-medium">Kids Summer Collection</h3>
                              <p className="text-primary font-semibold mt-1">$29.99</p>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </CarouselItem>
                  ))
                )}
              </CarouselContent>
              <CarouselPrevious className="left-0" />
              <CarouselNext className="right-0" />
            </Carousel>
            
            <div className="text-center mt-10">
              <Button asChild size="lg" variant="outline" className="border-gray-800 text-gray-800 hover:bg-gray-100">
                <Link to="/shop-clothing">VIEW ALL</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="aspect-square md:aspect-auto md:h-[400px] overflow-hidden rounded-md">
                <img 
                  src="/lovable-uploads/f044c951-07c4-47c5-a201-ade478356f76.png" 
                  alt="Kids clothing subscription boxes with neatly folded clothes" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="max-w-md">
                <h2 className="text-3xl font-league-spartan font-bold mb-4">Try Our Subscription Boxes</h2>
                <p className="text-muted-foreground mb-6">
                  Discover our curated clothing subscription boxes for kids of all ages. 
                  New styles delivered to your door monthly, with free shipping and returns.
                </p>
                <div className="space-y-4">
                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary flex-shrink-0">1</div>
                    <div>
                      <h3 className="font-bold">Choose Your Box</h3>
                      <p className="text-sm text-muted-foreground">Select the perfect box for your child's age and needs.</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary flex-shrink-0">2</div>
                    <div>
                      <h3 className="font-bold">Take Style Quiz</h3>
                      <p className="text-sm text-muted-foreground">Tell us about your child's preferences and style.</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary flex-shrink-0">3</div>
                    <div>
                      <h3 className="font-bold">Enjoy Monthly Deliveries</h3>
                      <p className="text-sm text-muted-foreground">Fresh styles delivered each month with no commitment.</p>
                    </div>
                  </div>
                </div>
                <div className="mt-8">
                  <Button asChild size="lg">
                    <Link to="/shop-now">EXPLORE BOXES</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-secondary/10">
          <div className="container mx-auto px-4 text-center max-w-2xl">
            <h2 className="text-3xl font-league-spartan font-bold mb-4">Not Sure What to Buy?</h2>
            <p className="text-lg mb-8">
              Take our style quiz and get personalized recommendations for your child.
            </p>
            <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90">
              <Link to="/style-quiz">START STYLE QUIZ</Link>
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
