
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

const Checkout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="font-league-spartan text-3xl md:text-4xl font-bold text-center mb-2">Checkout</h1>
        <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
          You're almost there! Complete your order details below.
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="font-league-spartan text-xl font-bold mb-4">Contact Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium mb-1">
                    First Name
                  </label>
                  <Input id="firstName" type="text" />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium mb-1">
                    Last Name
                  </label>
                  <Input id="lastName" type="text" />
                </div>
              </div>
              <div className="mt-4">
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email Address
                </label>
                <Input id="email" type="email" />
              </div>
              <div className="mt-4">
                <label htmlFor="phone" className="block text-sm font-medium mb-1">
                  Phone Number
                </label>
                <Input id="phone" type="tel" />
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="font-league-spartan text-xl font-bold mb-4">Shipping Address</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="address" className="block text-sm font-medium mb-1">
                    Street Address
                  </label>
                  <Input id="address" type="text" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium mb-1">
                      City
                    </label>
                    <Input id="city" type="text" />
                  </div>
                  <div>
                    <label htmlFor="parish" className="block text-sm font-medium mb-1">
                      Parish
                    </label>
                    <Input id="parish" type="text" />
                  </div>
                </div>
                <div>
                  <label htmlFor="postalCode" className="block text-sm font-medium mb-1">
                    Postal Code
                  </label>
                  <Input id="postalCode" type="text" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="font-league-spartan text-xl font-bold mb-4">Payment Method</h2>
              <RadioGroup defaultValue="credit-card">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 bg-gray-50 p-4 rounded-md">
                    <RadioGroupItem value="credit-card" id="credit-card" />
                    <Label htmlFor="credit-card" className="flex-grow">Credit Card</Label>
                    <div className="flex space-x-2">
                      <div className="w-8 h-8 bg-gray-200 rounded"></div>
                      <div className="w-8 h-8 bg-gray-200 rounded"></div>
                      <div className="w-8 h-8 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 bg-gray-50 p-4 rounded-md">
                    <RadioGroupItem value="paypal" id="paypal" />
                    <Label htmlFor="paypal" className="flex-grow">PayPal</Label>
                    <div className="w-8 h-8 bg-gray-200 rounded"></div>
                  </div>
                  <div className="flex items-center space-x-2 bg-gray-50 p-4 rounded-md">
                    <RadioGroupItem value="bank-transfer" id="bank-transfer" />
                    <Label htmlFor="bank-transfer" className="flex-grow">Bank Transfer</Label>
                    <div className="w-8 h-8 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </RadioGroup>
            </div>
          </div>
          
          <div>
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="font-league-spartan text-xl font-bold mb-4">Order Summary</h2>
              
              <div className="mb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-md flex-shrink-0"></div>
                  <div>
                    <h3 className="font-medium">HK Classic Box</h3>
                    <p className="text-sm text-muted-foreground">Size: 4T</p>
                  </div>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>$85.00</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>$0.00</span>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>$85.00</span>
              </div>
              
              <div className="mt-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Checkbox id="terms" />
                  <Label htmlFor="terms" className="text-sm">
                    I agree to the <Link to="/terms" className="text-blue-600 hover:underline">terms and conditions</Link>
                  </Label>
                </div>
                <Button className="w-full bg-secondary hover:bg-secondary/90">
                  Complete Order
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Checkout;
