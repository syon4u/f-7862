
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Search, Calendar, Clock, User } from 'lucide-react';

const Blog: React.FC = () => {
  const featuredPosts = [
    {
      title: "Essential Guide to Children's Clothing Sizes",
      excerpt: "Navigate the sometimes confusing world of children's clothing sizes with our comprehensive guide.",
      image: "/lovable-uploads/image(4).png",
      author: "Maria Johnson",
      date: "March 28, 2025",
      readTime: "8 min read",
      category: "Fashion Tips"
    },
    {
      title: "Budget-Friendly Ways to Keep Up with Kids' Fashion",
      excerpt: "Learn how to keep your children stylish without breaking the bank with these practical tips.",
      image: "/lovable-uploads/image(5).png",
      author: "David Williams",
      date: "March 25, 2025",
      readTime: "6 min read",
      category: "Budgeting"
    },
    {
      title: "Supporting Children's Development Through Fashion Choices",
      excerpt: "Discover how clothing choices can positively impact your child's development and self-expression.",
      image: "/lovable-uploads/image(7).png",
      author: "Samantha Peters",
      date: "March 21, 2025",
      readTime: "10 min read",
      category: "Child Development"
    }
  ];
  
  const recentPosts = [
    {
      title: "Sustainable Children's Fashion: What You Need to Know",
      excerpt: "Learn about eco-friendly brands and how to make more sustainable choices for your kids' wardrobes.",
      image: "/lovable-uploads/image(13).png",
      author: "James Roberts",
      date: "March 18, 2025",
      readTime: "7 min read",
      category: "Sustainability"
    },
    {
      title: "Creating a Capsule Wardrobe for Growing Children",
      excerpt: "Tips for building versatile, mix-and-match wardrobes that grow with your children.",
      image: "/lovable-uploads/image(19).png",
      author: "Emma Thompson",
      date: "March 15, 2025",
      readTime: "9 min read",
      category: "Fashion Tips"
    },
    {
      title: "How to Talk to Children About Fashion and Self-Image",
      excerpt: "Guidelines for healthy conversations with kids about clothing, style, and body image.",
      image: "/lovable-uploads/image(27).png",
      author: "Dr. Michelle Carter",
      date: "March 12, 2025",
      readTime: "12 min read",
      category: "Parenting"
    },
    {
      title: "Jamaican Children's Fashion: Cultural Influences and Trends",
      excerpt: "Explore the rich cultural heritage that shapes children's fashion in Jamaica.",
      image: "/lovable-uploads/image(25).png",
      author: "Robert Brown",
      date: "March 10, 2025",
      readTime: "8 min read",
      category: "Culture"
    },
    {
      title: "Seasonal Clothing Guide for Caribbean Children",
      excerpt: "Navigate dressing your kids appropriately for Jamaica's climate throughout the year.",
      image: "/lovable-uploads/image(30).png",
      author: "Lisa Campbell",
      date: "March 7, 2025",
      readTime: "6 min read",
      category: "Seasonal Tips"
    },
    {
      title: "Financial Planning for Family Clothing Expenses",
      excerpt: "Practical financial planning advice for managing your family's clothing budget effectively.",
      image: "/lovable-uploads/image(23).png",
      author: "Thomas Grant",
      date: "March 4, 2025",
      readTime: "9 min read",
      category: "Budgeting"
    }
  ];
  
  const categories = [
    "Fashion Tips", "Parenting", "Child Development", "Budgeting", 
    "Sustainability", "Culture", "Seasonal Tips", "Health & Wellness"
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 via-purple-50 to-pink-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div>
            <h1 className="font-league-spartan text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-tertiary bg-clip-text text-transparent mb-2">
              Our Blog
            </h1>
            <p className="text-lg text-gray-700">
              Resources, tips, and inspiration for parents and guardians
            </p>
          </div>
          
          <div className="relative mt-4 md:mt-0 w-full md:w-auto md:min-w-[320px]">
            <Input 
              placeholder="Search articles..." 
              className="pr-10"
            />
            <Search className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
          </div>
        </div>
        
        <div className="mb-16">
          <h2 className="font-league-spartan text-2xl font-bold mb-6">Featured Articles</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredPosts.map((post, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                  />
                </div>
                <CardHeader className="pb-2">
                  <div className="mb-2">
                    <Badge variant="secondary">{post.category}</Badge>
                  </div>
                  <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="line-clamp-3 text-muted-foreground text-sm">
                    {post.excerpt}
                  </p>
                </CardContent>
                <CardFooter className="flex justify-between text-xs text-gray-500 pt-2 border-t">
                  <div className="flex items-center">
                    <User className="h-3 w-3 mr-1" />
                    {post.author}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    {post.date}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {post.readTime}
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
        
        <div className="mb-16">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <h2 className="font-league-spartan text-2xl font-bold">Browse By Category</h2>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((category, index) => (
              <Badge 
                key={index} 
                variant="outline" 
                className="hover:bg-primary/10 cursor-pointer transition-colors text-sm py-1 px-3"
              >
                {category}
              </Badge>
            ))}
          </div>
          
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="all">All Posts</TabsTrigger>
              <TabsTrigger value="fashion">Fashion</TabsTrigger>
              <TabsTrigger value="parenting">Parenting</TabsTrigger>
              <TabsTrigger value="budgeting">Budgeting</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="space-y-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {recentPosts.map((post, index) => (
                  <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={post.image} 
                        alt={post.title} 
                        className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                      />
                    </div>
                    <CardHeader className="pb-2">
                      <div className="mb-2">
                        <Badge variant="secondary">{post.category}</Badge>
                      </div>
                      <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="line-clamp-3 text-muted-foreground text-sm">
                        {post.excerpt}
                      </p>
                    </CardContent>
                    <CardFooter className="flex justify-between text-xs text-gray-500 pt-2 border-t">
                      <div className="flex items-center">
                        <User className="h-3 w-3 mr-1" />
                        {post.author}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {post.date}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {post.readTime}
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="fashion">
              <div className="bg-muted p-8 text-center rounded-lg">
                <h3 className="text-xl font-medium mb-2">Fashion Articles</h3>
                <p className="text-muted-foreground">Filtered articles about children's fashion will appear here.</p>
              </div>
            </TabsContent>
            
            <TabsContent value="parenting">
              <div className="bg-muted p-8 text-center rounded-lg">
                <h3 className="text-xl font-medium mb-2">Parenting Articles</h3>
                <p className="text-muted-foreground">Filtered articles about parenting will appear here.</p>
              </div>
            </TabsContent>
            
            <TabsContent value="budgeting">
              <div className="bg-muted p-8 text-center rounded-lg">
                <h3 className="text-xl font-medium mb-2">Budgeting Articles</h3>
                <p className="text-muted-foreground">Filtered articles about budgeting will appear here.</p>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="mt-8 text-center">
            <Button variant="outline">Load More Articles</Button>
          </div>
        </div>
        
        <div className="bg-primary/10 rounded-xl p-8 text-center max-w-3xl mx-auto">
          <h2 className="font-league-spartan text-2xl font-bold mb-4">Subscribe to Our Newsletter</h2>
          <p className="mb-6">
            Get the latest articles, resources, and special offers delivered directly to your inbox.
          </p>
          <div className="flex gap-2 max-w-md mx-auto">
            <Input placeholder="Your email address" />
            <Button>Subscribe</Button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Blog;
