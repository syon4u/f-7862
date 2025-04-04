
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ShoppingBag, Gift, Star, CreditCard, Heart, Settings, User, Clock, Package, Bell } from 'lucide-react';

const MyAccount: React.FC = () => {
  const rewardPoints = 125;
  const membershipTier = "Silver";
  
  const emptyStates = {
    orders: (
      <div className="text-center py-12">
        <div className="bg-muted w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
          <ShoppingBag className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="font-league-spartan text-xl font-medium mb-2">No orders yet</h3>
        <p className="text-muted-foreground max-w-md mx-auto mb-6">
          You haven't placed any orders yet. Explore our collection to find the perfect clothing for your kids.
        </p>
        <Button asChild>
          <a href="/shop-clothing">Start Shopping</a>
        </Button>
      </div>
    ),
    wishlist: (
      <div className="text-center py-12">
        <div className="bg-muted w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
          <Heart className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="font-league-spartan text-xl font-medium mb-2">Your wishlist is empty</h3>
        <p className="text-muted-foreground max-w-md mx-auto mb-6">
          Save your favorite items to your wishlist for easy access later.
        </p>
        <Button asChild>
          <a href="/shop-clothing">Explore Products</a>
        </Button>
      </div>
    ),
    donations: (
      <div className="text-center py-12">
        <div className="bg-muted w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
          <Gift className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="font-league-spartan text-xl font-medium mb-2">No donations yet</h3>
        <p className="text-muted-foreground max-w-md mx-auto mb-6">
          Make a difference by donating clothing boxes to children in need across Jamaica.
        </p>
        <Button asChild>
          <a href="/donation-program">Learn About Donations</a>
        </Button>
      </div>
    )
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-purple-50 via-pink-50 to-amber-50">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="font-league-spartan text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-tertiary bg-clip-text text-transparent">My Account</h1>
          <p className="text-muted-foreground">Manage your orders, rewards, and account settings</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src="/lovable-uploads/image(9).png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <h2 className="font-league-spartan text-xl font-bold mb-1">Caroline Nelson</h2>
                  <p className="text-muted-foreground text-sm mb-4">caroline@example.com</p>
                  
                  <div className="bg-primary/10 rounded-lg p-4 w-full mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm">Reward Points</span>
                      <Badge variant="secondary">{rewardPoints} points</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Membership</span>
                      <Badge variant="outline" className="bg-amber-100">
                        {membershipTier} Member
                      </Badge>
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-full mb-2">
                    Edit Profile
                  </Button>
                  <Button variant="ghost" className="w-full text-muted-foreground">
                    Sign Out
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="md:col-span-3">
            <Tabs defaultValue="orders" className="w-full">
              <TabsList className="grid grid-cols-3 md:grid-cols-5 mb-6">
                <TabsTrigger value="orders">Orders</TabsTrigger>
                <TabsTrigger value="rewards">Rewards</TabsTrigger>
                <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
                <TabsTrigger value="donations">Donations</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
              
              <TabsContent value="orders" className="space-y-4">
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle>Order History</CardTitle>
                      <Button variant="ghost" size="sm" className="text-primary">
                        <Clock className="mr-2 h-4 w-4" />
                        Filter
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {emptyStates.orders}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="rewards" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Rewards</CardTitle>
                    <CardDescription>
                      Earn points with every purchase and redeem them for discounts and special offers
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-primary/5 rounded-lg p-6 text-center mb-6">
                      <h3 className="text-4xl font-bold text-primary mb-2">{rewardPoints}</h3>
                      <p className="text-muted-foreground">Available Points</p>
                    </div>
                    
                    <h3 className="font-bold text-lg mb-4">How to Earn Points</h3>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="bg-primary/10 p-2 rounded-full mr-3">
                          <ShoppingBag className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium">Make a Purchase</h4>
                          <p className="text-sm text-muted-foreground">Earn 1 point for every $1 spent</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="bg-primary/10 p-2 rounded-full mr-3">
                          <Gift className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium">Refer a Friend</h4>
                          <p className="text-sm text-muted-foreground">Earn 50 points for each successful referral</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="bg-primary/10 p-2 rounded-full mr-3">
                          <Star className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium">Write a Review</h4>
                          <p className="text-sm text-muted-foreground">Earn 25 points for each product review</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">View Reward Options</Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Available Rewards</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border rounded-lg p-4 flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">$10 Off Your Next Order</h4>
                          <p className="text-sm text-muted-foreground">Required: 200 points</p>
                        </div>
                        <Button disabled={rewardPoints < 200}>Redeem</Button>
                      </div>
                      
                      <div className="border rounded-lg p-4 flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">Free Shipping Voucher</h4>
                          <p className="text-sm text-muted-foreground">Required: 100 points</p>
                        </div>
                        <Button disabled={rewardPoints < 100}>Redeem</Button>
                      </div>
                      
                      <div className="border rounded-lg p-4 flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">Exclusive Early Access</h4>
                          <p className="text-sm text-muted-foreground">Required: 150 points</p>
                        </div>
                        <Button disabled={rewardPoints < 150}>Redeem</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="wishlist">
                {emptyStates.wishlist}
              </TabsContent>
              
              <TabsContent value="donations">
                {emptyStates.donations}
              </TabsContent>
              
              <TabsContent value="settings" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Information</CardTitle>
                    <CardDescription>
                      Update your account details and preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">Full Name</label>
                        <Input id="name" value="Caroline Nelson" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">Email Address</label>
                        <Input id="email" type="email" value="caroline@example.com" />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="phone" className="text-sm font-medium">Phone Number</label>
                        <Input id="phone" value="+1 (876) 555-1234" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="birthday" className="text-sm font-medium">Birthday</label>
                        <Input id="birthday" type="date" value="1990-05-15" />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button>Save Changes</Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Preferences</CardTitle>
                    <CardDescription>
                      Manage how you receive updates and notifications
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <div className="font-medium">Order Updates</div>
                          <div className="text-sm text-muted-foreground">
                            Receive notifications about your orders
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          <Bell className="h-4 w-4 mr-2" />
                          Enabled
                        </Button>
                      </div>
                      
                      <Separator />
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <div className="font-medium">Promotions & Offers</div>
                          <div className="text-sm text-muted-foreground">
                            Receive emails about sales and special offers
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          <Bell className="h-4 w-4 mr-2" />
                          Enabled
                        </Button>
                      </div>
                      
                      <Separator />
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <div className="font-medium">Product Restocks</div>
                          <div className="text-sm text-muted-foreground">
                            Get notified when wished items are back in stock
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          <Bell className="h-4 w-4 mr-2" />
                          Disabled
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Payment Methods</CardTitle>
                    <CardDescription>
                      Manage your saved payment methods
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <div className="bg-muted w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                        <CreditCard className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <h3 className="font-league-spartan text-xl font-medium mb-2">No payment methods saved</h3>
                      <p className="text-muted-foreground max-w-md mx-auto mb-6">
                        Add a payment method to enable faster checkout.
                      </p>
                      <Button>Add Payment Method</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MyAccount;
