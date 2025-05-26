
import React, { useEffect, useState } from 'react';
import AdminLayout from '../components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer } from '@/components/ui/chart';
import * as RechartsPrimitive from 'recharts';
import { TrendingUp, TrendingDown, Users, ShoppingCart, DollarSign, Package } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface AnalyticsData {
  totalRevenue: number;
  totalOrders: number;
  activeCustomers: number;
  productsSold: number;
  salesTrend: Array<{
    month: string;
    sales: number;
    orders: number;
    customers: number;
  }>;
  topProducts: Array<{
    name: string;
    sales: number;
    revenue: number;
  }>;
}

const AdminAnalytics = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalyticsData();
  }, []);

  const fetchAnalyticsData = async () => {
    try {
      // Fetch orders data
      const { data: orders, error: ordersError } = await supabase
        .from('orders')
        .select('*');

      if (ordersError) throw ordersError;

      // Fetch customers data
      const { data: customers, error: customersError } = await supabase
        .from('customers')
        .select('*');

      if (customersError) throw customersError;

      // Fetch order items data
      const { data: orderItems, error: orderItemsError } = await supabase
        .from('order_items')
        .select('*, product:products(name), order:orders(*)');

      if (orderItemsError) throw orderItemsError;

      // Calculate analytics
      const totalRevenue = orders?.reduce((sum, order) => sum + Number(order.total_amount), 0) || 0;
      const totalOrders = orders?.length || 0;
      const activeCustomers = customers?.length || 0;
      const productsSold = orderItems?.reduce((sum, item) => sum + item.quantity, 0) || 0;

      // Generate mock sales trend data (in a real app, you'd query by date ranges)
      const salesTrend = [
        { month: 'Jan', sales: totalRevenue * 0.12, orders: Math.floor(totalOrders * 0.15), customers: Math.floor(activeCustomers * 0.18) },
        { month: 'Feb', sales: totalRevenue * 0.14, orders: Math.floor(totalOrders * 0.18), customers: Math.floor(activeCustomers * 0.22) },
        { month: 'Mar', sales: totalRevenue * 0.16, orders: Math.floor(totalOrders * 0.20), customers: Math.floor(activeCustomers * 0.28) },
        { month: 'Apr', sales: totalRevenue * 0.18, orders: Math.floor(totalOrders * 0.22), customers: Math.floor(activeCustomers * 0.35) },
        { month: 'May', sales: totalRevenue * 0.20, orders: Math.floor(totalOrders * 0.25), customers: Math.floor(activeCustomers * 0.42) },
        { month: 'Jun', sales: totalRevenue * 0.20, orders: Math.floor(totalOrders * 0.20), customers: Math.floor(activeCustomers * 0.48) },
      ];

      // Calculate top products
      const productSales = new Map();
      orderItems?.forEach(item => {
        if (item.product) {
          const productName = item.product.name;
          const existing = productSales.get(productName) || { sales: 0, revenue: 0 };
          productSales.set(productName, {
            sales: existing.sales + item.quantity,
            revenue: existing.revenue + Number(item.total_price)
          });
        }
      });

      const topProducts = Array.from(productSales.entries())
        .map(([name, data]) => ({ name, ...data }))
        .sort((a, b) => b.sales - a.sales)
        .slice(0, 5);

      setAnalyticsData({
        totalRevenue,
        totalOrders,
        activeCustomers,
        productsSold,
        salesTrend,
        topProducts
      });
    } catch (error) {
      console.error('Error fetching analytics data:', error);
      toast.error('Failed to load analytics data');
    } finally {
      setLoading(false);
    }
  };

  // Fallback mock data for better demonstration
  const mockData = {
    totalRevenue: 128450,
    totalOrders: 2847,
    activeCustomers: 1892,
    productsSold: 5234,
    salesTrend: [
      { month: 'Jan', sales: 12000, orders: 240, customers: 180 },
      { month: 'Feb', sales: 15000, orders: 300, customers: 220 },
      { month: 'Mar', sales: 18000, orders: 360, customers: 280 },
      { month: 'Apr', sales: 22000, orders: 440, customers: 350 },
      { month: 'May', sales: 25000, orders: 500, customers: 420 },
      { month: 'Jun', sales: 28000, orders: 560, customers: 480 },
    ],
    topProducts: [
      { name: 'Caribbean Print Dress', sales: 145, revenue: 7250 },
      { name: 'Island Boys Shirt', sales: 132, revenue: 5280 },
      { name: 'Tropical Shorts', sales: 98, revenue: 3920 },
      { name: 'Beach Sandals', sales: 87, revenue: 2610 },
      { name: 'Sun Hat', sales: 76, revenue: 1520 },
    ]
  };

  const displayData = analyticsData || mockData;

  // Static data for other charts
  const categoryPerformanceData = [
    { category: 'Boys', revenue: 35000, percentage: 35, growth: 12 },
    { category: 'Girls', revenue: 45000, percentage: 45, growth: 18 },
    { category: 'Baby', revenue: 15000, percentage: 15, growth: -5 },
    { category: 'Shoes', revenue: 8000, percentage: 8, growth: 25 },
    { category: 'Accessories', revenue: 5000, percentage: 5, growth: 8 },
  ];

  const customerSegmentData = [
    { segment: 'New Customers', count: 1250, value: 45, fill: '#5D4EBD' },
    { segment: 'Returning Customers', count: 2100, value: 55, fill: '#FF4D6D' },
  ];

  const conversionFunnelData = [
    { stage: 'Website Visits', count: 10000, percentage: 100 },
    { stage: 'Product Views', count: 4500, percentage: 45 },
    { stage: 'Add to Cart', count: 1800, percentage: 18 },
    { stage: 'Checkout Started', count: 900, percentage: 9 },
    { stage: 'Orders Completed', count: 540, percentage: 5.4 },
  ];

  const kpiMetrics = [
    {
      title: 'Total Revenue',
      value: `$${displayData.totalRevenue.toLocaleString()}`,
      change: '+23.1%',
      trend: 'up',
      icon: DollarSign,
    },
    {
      title: 'Total Orders',
      value: displayData.totalOrders.toLocaleString(),
      change: '+12.5%',
      trend: 'up',
      icon: ShoppingCart,
    },
    {
      title: 'Active Customers',
      value: displayData.activeCustomers.toLocaleString(),
      change: '+8.3%',
      trend: 'up',
      icon: Users,
    },
    {
      title: 'Products Sold',
      value: displayData.productsSold.toLocaleString(),
      change: '-2.1%',
      trend: 'down',
      icon: Package,
    },
  ];

  if (loading) {
    return (
      <AdminLayout title="Analytics Dashboard">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading analytics data...</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Analytics Dashboard">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {kpiMetrics.map((metric, idx) => {
          const Icon = metric.icon;
          return (
            <Card key={idx}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <p className={`text-xs flex items-center gap-1 ${
                  metric.trend === 'up' ? 'text-green-500' : 'text-red-500'
                }`}>
                  {metric.trend === 'up' ? (
                    <TrendingUp className="h-3 w-3" />
                  ) : (
                    <TrendingDown className="h-3 w-3" />
                  )}
                  {metric.change} from last month
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Sales Trend Chart */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Sales Trend</CardTitle>
            <CardDescription>Monthly sales performance over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="aspect-[4/3] w-full">
              <RechartsPrimitive.LineChart data={displayData.salesTrend}>
                <RechartsPrimitive.XAxis dataKey="month" />
                <RechartsPrimitive.YAxis />
                <RechartsPrimitive.CartesianGrid strokeDasharray="3 3" />
                <RechartsPrimitive.Tooltip />
                <RechartsPrimitive.Legend />
                <RechartsPrimitive.Line 
                  type="monotone" 
                  dataKey="sales" 
                  stroke="#5D4EBD" 
                  strokeWidth={2}
                  activeDot={{ r: 6 }}
                />
              </RechartsPrimitive.LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Customer Segments */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Customer Segments</CardTitle>
            <CardDescription>New vs returning customers</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="aspect-square max-w-xs mx-auto">
              <RechartsPrimitive.PieChart>
                <RechartsPrimitive.Pie 
                  data={customerSegmentData} 
                  cx="50%" 
                  cy="50%" 
                  outerRadius={80} 
                  dataKey="value"
                  label={({segment, value}) => `${segment}: ${value}%`}
                >
                  {customerSegmentData.map((entry, index) => (
                    <RechartsPrimitive.Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </RechartsPrimitive.Pie>
                <RechartsPrimitive.Tooltip />
              </RechartsPrimitive.PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Category Performance & Conversion Funnel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Category Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Category Performance</CardTitle>
            <CardDescription>Revenue and growth by product category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {categoryPerformanceData.map((category, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">{category.category}</span>
                      <span className="text-sm text-muted-foreground">
                        ${category.revenue.toLocaleString()}
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full" 
                        style={{width: `${category.percentage}%`}}
                      />
                    </div>
                  </div>
                  <div className={`ml-4 text-sm flex items-center gap-1 ${
                    category.growth >= 0 ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {category.growth >= 0 ? (
                      <TrendingUp className="h-3 w-3" />
                    ) : (
                      <TrendingDown className="h-3 w-3" />
                    )}
                    {category.growth}%
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Conversion Funnel */}
        <Card>
          <CardHeader>
            <CardTitle>Conversion Funnel</CardTitle>
            <CardDescription>Customer journey through purchase process</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {conversionFunnelData.map((stage, idx) => (
                <div key={idx} className="relative">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">{stage.stage}</span>
                    <span className="text-sm text-muted-foreground">
                      {stage.count.toLocaleString()} ({stage.percentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-primary to-tertiary h-3 rounded-full transition-all duration-300" 
                      style={{width: `${stage.percentage}%`}}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Products & Orders Table */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle>Top Selling Products</CardTitle>
            <CardDescription>Best performing products this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {displayData.topProducts.map((product, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-lg border">
                  <div>
                    <p className="font-medium text-sm">{product.name}</p>
                    <p className="text-xs text-muted-foreground">{product.sales} units sold</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${product.revenue.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">Revenue</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Orders & Customers Combined Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Orders & Customer Growth</CardTitle>
            <CardDescription>Monthly orders and new customers</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="aspect-[4/3] w-full">
              <RechartsPrimitive.BarChart data={displayData.salesTrend}>
                <RechartsPrimitive.XAxis dataKey="month" />
                <RechartsPrimitive.YAxis />
                <RechartsPrimitive.CartesianGrid strokeDasharray="3 3" />
                <RechartsPrimitive.Tooltip />
                <RechartsPrimitive.Legend />
                <RechartsPrimitive.Bar dataKey="orders" fill="#5D4EBD" name="Orders" />
                <RechartsPrimitive.Bar dataKey="customers" fill="#FF4D6D" name="New Customers" />
              </RechartsPrimitive.BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminAnalytics;
