
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, MapPin, Phone } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="font-league-spartan text-3xl md:text-4xl font-bold text-center mb-2">Contact Us</h1>
        <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
          We'd love to hear from you! Whether you have a question about our subscription boxes, 
          need help with an order, or want to share feedback, our team is here to help.
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="font-league-spartan text-2xl font-bold mb-6">Send Us a Message</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">
                    Your Name
                  </label>
                  <Input id="name" type="text" placeholder="John Doe" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email Address
                  </label>
                  <Input id="email" type="email" placeholder="john@example.com" />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-1">
                  Subject
                </label>
                <Input id="subject" type="text" placeholder="How can we help you?" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1">
                  Message
                </label>
                <Textarea
                  id="message"
                  placeholder="Write your message here..."
                  rows={6}
                />
              </div>
              <Button type="submit" className="w-full md:w-auto bg-primary hover:bg-primary/90">
                Send Message
              </Button>
            </form>
          </div>
          
          <div>
            <h2 className="font-league-spartan text-2xl font-bold mb-6">Contact Information</h2>
            <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
              <div className="flex items-start">
                <MapPin className="w-5 h-5 text-primary mr-3 mt-1" />
                <div>
                  <h3 className="font-medium">Our Address</h3>
                  <p className="text-muted-foreground">
                    123 Main Street, Kingston,<br />
                    Jamaica
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Phone className="w-5 h-5 text-primary mr-3 mt-1" />
                <div>
                  <h3 className="font-medium">Phone Number</h3>
                  <p className="text-muted-foreground">
                    +1 (876) 123-4567
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Mail className="w-5 h-5 text-primary mr-3 mt-1" />
                <div>
                  <h3 className="font-medium">Email Address</h3>
                  <p className="text-muted-foreground">
                    contact@happykidsbox.com
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <h3 className="font-montserrat text-lg font-semibold mb-3">Business Hours</h3>
              <table className="w-full">
                <tbody>
                  <tr className="border-b">
                    <td className="py-2 font-medium">Monday - Friday</td>
                    <td className="py-2 text-right">9:00 AM - 5:00 PM</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 font-medium">Saturday</td>
                    <td className="py-2 text-right">10:00 AM - 2:00 PM</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-medium">Sunday</td>
                    <td className="py-2 text-right">Closed</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
