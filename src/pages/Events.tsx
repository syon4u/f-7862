
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';

const Events: React.FC = () => {
  const upcomingEvents = [
    {
      title: "Kids Fashion Pop-Up Shop",
      date: "April 15, 2025",
      time: "10:00 AM - 4:00 PM",
      location: "Kingston Shopping Center",
      description: "Visit our pop-up shop for special discounts, styling sessions, and exclusive items not available online.",
      image: "/lovable-uploads/image(18).png",
      category: "Shopping",
      attendees: 43
    },
    {
      title: "Parents' Financial Workshop",
      date: "April 22, 2025",
      time: "6:30 PM - 8:30 PM",
      location: "Community Center, Montego Bay",
      description: "Learn practical strategies for managing family expenses, creating a budget, and saving for your children's future.",
      image: "/lovable-uploads/image(33).png",
      category: "Workshop",
      attendees: 28
    },
    {
      title: "Children's Health & Wellness Fair",
      date: "May 8, 2025",
      time: "9:00 AM - 3:00 PM",
      location: "Emancipation Park, Kingston",
      description: "A day focused on children's health with free check-ups, nutritional advice, and fun activities for the whole family.",
      image: "/lovable-uploads/image(9).png",
      category: "Health",
      attendees: 120
    }
  ];
  
  const pastEvents = [
    {
      title: "Back to School Fashion Show",
      date: "March 12, 2025",
      location: "Kingston Convention Center",
      description: "Featured our latest school uniform collections and casual wear for the new school term.",
      image: "/lovable-uploads/image(31).png",
      category: "Fashion",
      attendees: 85
    },
    {
      title: "Parenting Support Group",
      date: "February 28, 2025",
      location: "Happy Kids Box HQ, New Kingston",
      description: "Monthly meeting for parents to connect, share experiences, and support each other.",
      image: "/lovable-uploads/image(21).png",
      category: "Community",
      attendees: 32
    },
    {
      title: "Children's Clothing Donation Drive",
      date: "February 15, 2025",
      location: "Multiple Locations Across Jamaica",
      description: "Annual event where we collected gently used children's clothing for donation to local children's homes.",
      image: "/lovable-uploads/image(14).png",
      category: "Charity",
      attendees: 150
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-green-50 via-amber-50 to-blue-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="font-league-spartan text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-tertiary bg-clip-text text-transparent mb-4">
            Upcoming Events
          </h1>
          <p className="text-lg text-gray-700">
            Join us for workshops, pop-up shops, and community gatherings to connect with other parents and learn more about Happy Kids Box.
          </p>
        </div>
        
        <div className="mb-16">
          <div className="relative mb-12 overflow-hidden rounded-xl">
            <img 
              src="/lovable-uploads/image(18).png" 
              alt="Featured Event" 
              className="w-full h-64 md:h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex flex-col justify-end p-6 md:p-8">
              <Badge className="mb-2 self-start">Featured Event</Badge>
              <h2 className="text-2xl md:text-4xl font-bold text-white mb-2">Spring Kids Fashion Showcase</h2>
              <div className="flex flex-wrap gap-4 text-white">
                <div className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5" />
                  <span>May 20, 2025</span>
                </div>
                <div className="flex items-center">
                  <Clock className="mr-2 h-5 w-5" />
                  <span>11:00 AM - 5:00 PM</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="mr-2 h-5 w-5" />
                  <span>Devon House, Kingston</span>
                </div>
              </div>
              <Button className="mt-4 self-start">Learn More</Button>
            </div>
          </div>
          
          <Tabs defaultValue="upcoming" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
              <TabsTrigger value="past">Past Events</TabsTrigger>
            </TabsList>
            
            <TabsContent value="upcoming" className="space-y-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {upcomingEvents.map((event, index) => (
                  <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={event.image} 
                        alt={event.title} 
                        className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                      />
                    </div>
                    <CardHeader className="pb-2">
                      <div className="mb-2">
                        <Badge variant="secondary">{event.category}</Badge>
                      </div>
                      <CardTitle>{event.title}</CardTitle>
                      <CardDescription className="flex flex-col gap-1">
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="mr-2 h-4 w-4" />
                          {event.date}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="mr-2 h-4 w-4" />
                          {event.time}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <MapPin className="mr-2 h-4 w-4" />
                          {event.location}
                        </div>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 line-clamp-3">
                        {event.description}
                      </p>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center pt-2 border-t">
                      <div className="flex items-center text-sm text-gray-500">
                        <Users className="mr-1 h-4 w-4" />
                        {event.attendees} attending
                      </div>
                      <Button size="sm">Register</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="past">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {pastEvents.map((event, index) => (
                  <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="h-48 overflow-hidden grayscale">
                      <img 
                        src={event.image} 
                        alt={event.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardHeader className="pb-2">
                      <div className="mb-2">
                        <Badge variant="outline">{event.category}</Badge>
                      </div>
                      <CardTitle>{event.title}</CardTitle>
                      <CardDescription className="flex flex-col gap-1">
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="mr-2 h-4 w-4" />
                          {event.date}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <MapPin className="mr-2 h-4 w-4" />
                          {event.location}
                        </div>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600">
                        {event.description}
                      </p>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center pt-2 border-t">
                      <div className="flex items-center text-sm text-gray-500">
                        <Users className="mr-1 h-4 w-4" />
                        {event.attendees} attended
                      </div>
                      <Button size="sm" variant="outline">View Recap</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="bg-primary/10 rounded-xl p-8 text-center max-w-3xl mx-auto">
          <h2 className="font-league-spartan text-2xl font-bold mb-4">Stay Updated on Events</h2>
          <p className="mb-6">
            Join our mailing list to receive notifications about upcoming events, workshops, and promotions.
          </p>
          <Button size="lg" className="bg-primary hover:bg-primary/90">
            Subscribe to Updates
          </Button>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Events;
