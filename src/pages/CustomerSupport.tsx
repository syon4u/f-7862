
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Mail, Phone, MessageSquare, Clock, HelpCircle } from 'lucide-react';

const CustomerSupport: React.FC = () => {
  const faqs = [
    {
      question: "How do I track my order?",
      answer: "You can track your order by logging into your account and navigating to the 'Order History' section. There, you'll find all your orders and their current status. Alternatively, you can use the tracking number provided in your shipping confirmation email."
    },
    {
      question: "What is your return policy?",
      answer: "We accept returns within 30 days of purchase for items in their original condition with tags attached. To initiate a return, log into your account and select the order you wish to return, or contact our customer support team."
    },
    {
      question: "How does the membership program work?",
      answer: "Our membership program offers exclusive benefits including discounts, early access to new releases, and special resources. Members can choose between monthly or annual subscriptions, with the latter offering additional savings."
    },
    {
      question: "Can I change or cancel my subscription?",
      answer: "Yes, you can modify or cancel your subscription at any time through your account settings. Changes will be effective from your next billing cycle."
    },
    {
      question: "What sizes do you offer for children's clothing?",
      answer: "We offer sizes ranging from newborn (0-3 months) up to age 12 years. Each product listing includes a detailed size chart to help you select the right fit for your child."
    },
    {
      question: "How does the donation program work?",
      answer: "Through our donation program, you can purchase clothing boxes that will be delivered to children's homes across Jamaica. You can choose from various donation options and track the impact of your contributions."
    },
    {
      question: "Do you ship internationally?",
      answer: "Currently, we ship throughout Jamaica with plans to expand to other Caribbean countries soon. Follow our newsletter for updates on international shipping options."
    },
    {
      question: "How can I participate in your community events?",
      answer: "Information about upcoming events can be found on our Events page. You can register for events directly through our website, and subscribers to our newsletter receive early notifications about all community activities."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 via-purple-50 to-pink-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="font-league-spartan text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-tertiary bg-clip-text text-transparent mb-4">
            Customer Support
          </h1>
          <p className="text-lg text-gray-700">
            We're here to help with any questions or concerns about your Happy Kids Box experience.
          </p>
        </div>
        
        <div className="mb-16">
          <Tabs defaultValue="contact" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="contact">Contact Us</TabsTrigger>
              <TabsTrigger value="faq">FAQs</TabsTrigger>
              <TabsTrigger value="orders">Order Issues</TabsTrigger>
            </TabsList>
            
            <TabsContent value="contact">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card>
                  <CardHeader className="text-center">
                    <div className="mx-auto w-12 h-12 flex items-center justify-center bg-primary/10 rounded-full mb-4">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>Email Support</CardTitle>
                    <CardDescription>Response within 24 hours</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <a href="mailto:support@happykidsbox.com" className="text-primary hover:underline">
                      support@happykidsbox.com
                    </a>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="text-center">
                    <div className="mx-auto w-12 h-12 flex items-center justify-center bg-primary/10 rounded-full mb-4">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>Phone Support</CardTitle>
                    <CardDescription>Available 9am-5pm (Mon-Fri)</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <a href="tel:+18765551234" className="text-primary hover:underline">
                      +1 (876) 555-1234
                    </a>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="text-center">
                    <div className="mx-auto w-12 h-12 flex items-center justify-center bg-primary/10 rounded-full mb-4">
                      <MessageSquare className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>Live Chat</CardTitle>
                    <CardDescription>Available 9am-7pm (Mon-Sat)</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <Button variant="outline">Start Chat</Button>
                  </CardContent>
                </Card>
              </div>
              
              <Card className="mt-8">
                <CardHeader>
                  <CardTitle>Send Us a Message</CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll get back to you as soon as possible.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">Name</label>
                        <Input id="name" placeholder="Your full name" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">Email</label>
                        <Input id="email" type="email" placeholder="Your email address" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                      <Input id="subject" placeholder="What is your message about?" />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">Message</label>
                      <Textarea id="message" placeholder="Please provide as much detail as possible" rows={5} />
                    </div>
                  </form>
                </CardContent>
                <CardFooter>
                  <Button className="w-full md:w-auto">Send Message</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="faq">
              <Card>
                <CardHeader>
                  <CardTitle>Frequently Asked Questions</CardTitle>
                  <CardDescription>
                    Find quick answers to common questions about our products and services.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq, index) => (
                      <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger>{faq.question}</AccordionTrigger>
                        <AccordionContent>
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <p className="text-sm text-muted-foreground">
                    Can't find what you're looking for?
                  </p>
                  <Button variant="outline">Contact Support</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="orders">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Order Tracking</CardTitle>
                    <CardDescription>
                      Check the status of your recent orders.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label htmlFor="order-number" className="text-sm font-medium">Order Number</label>
                        <Input id="order-number" placeholder="Enter your order number" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email-for-order" className="text-sm font-medium">Email Address</label>
                        <Input id="email-for-order" type="email" placeholder="Email used for the order" />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Track Order</Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Order Issues</CardTitle>
                    <CardDescription>
                      Report problems with your order or request returns.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-col space-y-2 p-4 rounded-lg border">
                      <div className="flex items-center">
                        <Clock className="h-5 w-5 text-muted-foreground mr-2" />
                        <h4 className="font-medium">Returns & Exchanges</h4>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Start a return or exchange request for items purchased within the last
                        30 days.
                      </p>
                      <Button variant="outline" size="sm" className="mt-2 self-start">
                        Start Return
                      </Button>
                    </div>
                    
                    <div className="flex flex-col space-y-2 p-4 rounded-lg border">
                      <div className="flex items-center">
                        <HelpCircle className="h-5 w-5 text-muted-foreground mr-2" />
                        <h4 className="font-medium">Missing or Damaged Items</h4>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Report any issues with missing or damaged items from your order.
                      </p>
                      <Button variant="outline" size="sm" className="mt-2 self-start">
                        Report Issue
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="font-bold text-lg mb-3">Business Hours</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Monday - Friday</span>
                <span>9:00 AM - 5:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Saturday</span>
                <span>10:00 AM - 4:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday</span>
                <span>Closed</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="font-bold text-lg mb-3">Shipping Information</h3>
            <ul className="space-y-2 list-disc pl-5">
              <li>Free shipping on orders over $50</li>
              <li>Standard delivery: 2-5 business days</li>
              <li>Express delivery: 1-2 business days</li>
              <li>Currently shipping throughout Jamaica</li>
            </ul>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="font-bold text-lg mb-3">Location</h3>
            <p className="mb-4">
              Happy Kids Box<br />
              123 Shopping Avenue<br />
              Kingston, Jamaica
            </p>
            <Button variant="outline" size="sm">View on Map</Button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default CustomerSupport;
