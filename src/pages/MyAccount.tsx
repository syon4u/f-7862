
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';

const MyAccount: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="font-league-spartan text-3xl md:text-4xl font-bold mb-6">My Account</h1>
        
        <Tabs defaultValue="orders" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="orders">Orders & Tracking</TabsTrigger>
            <TabsTrigger value="rewards">Rewards & Offers</TabsTrigger>
          </TabsList>
          
          <TabsContent value="orders" className="space-y-4">
            <h2 className="font-montserrat text-xl font-medium">Order History</h2>
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <p className="text-muted-foreground">You have no orders yet.</p>
            </div>
          </TabsContent>
          
          <TabsContent value="rewards" className="space-y-4">
            <h2 className="font-montserrat text-xl font-medium">Your Rewards</h2>
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <p className="text-muted-foreground">You currently have no rewards.</p>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default MyAccount;
