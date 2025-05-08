
import React from 'react';
import AdminLayout from '../components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer } from '@/components/ui/chart';
import * as RechartsPrimitive from 'recharts';

const AdminDashboard = () => {
  // Sample data for charts
  const salesData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Sales',
        data: [1200, 1900, 3000, 5000, 2000, 3000],
        backgroundColor: 'rgba(93, 78, 189, 0.5)',
        borderColor: 'rgb(93, 78, 189)',
      }
    ],
  };

  const userEngagementData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Visits',
        data: [423, 389, 503, 607, 589, 664, 521],
        borderColor: 'rgb(255, 77, 109)',
        backgroundColor: 'rgba(255, 77, 109, 0.1)',
        tension: 0.3,
      }
    ],
  };

  const categoryData = {
    labels: ['Boys', 'Girls', 'Accessories', 'Shoes', 'Seasonal'],
    datasets: [
      {
        label: 'Sales by Category',
        data: [35, 45, 10, 5, 5],
        backgroundColor: [
          'rgba(93, 78, 189, 0.7)',
          'rgba(255, 77, 109, 0.7)',
          'rgba(255, 184, 0, 0.7)',
          'rgba(68, 190, 199, 0.7)',
          'rgba(111, 207, 151, 0.7)',
        ],
      }
    ],
  };

  // Convert the data for Recharts
  const salesChartData = salesData.labels.map((month, index) => ({
    name: month,
    Sales: salesData.datasets[0].data[index],
  }));

  const userEngagementChartData = userEngagementData.labels.map((day, index) => ({
    name: day,
    Visits: userEngagementData.datasets[0].data[index],
  }));

  const categoryChartData = categoryData.labels.map((category, index) => ({
    name: category,
    value: categoryData.datasets[0].data[index],
    fill: categoryData.datasets[0].backgroundColor[index],
  }));

  const metrics = [
    { title: 'Total Sales', value: '$24,325', change: '+15%', up: true },
    { title: 'New Customers', value: '145', change: '+22%', up: true },
    { title: 'Orders', value: '521', change: '+18%', up: true },
    { title: 'Avg. Order Value', value: '$48.55', change: '-3%', up: false },
  ];

  return (
    <AdminLayout title="Dashboard">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {metrics.map((metric, idx) => (
          <Card key={idx}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{metric.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className={`text-xs mt-1 ${metric.up ? 'text-green-500' : 'text-red-500'}`}>
                {metric.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Sales Overview</CardTitle>
            <CardDescription>Monthly sales performance</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="aspect-[4/3] w-full">
              <RechartsPrimitive.BarChart data={salesChartData} barSize={30}>
                <RechartsPrimitive.XAxis dataKey="name" />
                <RechartsPrimitive.YAxis />
                <RechartsPrimitive.CartesianGrid strokeDasharray="3 3" />
                <RechartsPrimitive.Tooltip />
                <RechartsPrimitive.Legend />
                <RechartsPrimitive.Bar dataKey="Sales" fill="rgba(93, 78, 189, 0.7)" />
              </RechartsPrimitive.BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Website Traffic</CardTitle>
            <CardDescription>Daily visits</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="aspect-[4/3] w-full">
              <RechartsPrimitive.LineChart data={userEngagementChartData}>
                <RechartsPrimitive.XAxis dataKey="name" />
                <RechartsPrimitive.YAxis />
                <RechartsPrimitive.CartesianGrid strokeDasharray="3 3" />
                <RechartsPrimitive.Tooltip />
                <RechartsPrimitive.Legend />
                <RechartsPrimitive.Line 
                  type="monotone" 
                  dataKey="Visits" 
                  stroke="rgb(255, 77, 109)" 
                  activeDot={{ r: 8 }}
                />
              </RechartsPrimitive.LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Sales by Category</CardTitle>
            <CardDescription>Product category distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="aspect-square max-w-xs mx-auto">
              <RechartsPrimitive.PieChart>
                <RechartsPrimitive.Pie 
                  data={categoryChartData} 
                  cx="50%" 
                  cy="50%" 
                  outerRadius={80} 
                  dataKey="value"
                  label={({name, value}) => `${name}: ${value}%`}
                >
                  {
                    categoryChartData.map((entry, index) => (
                      <RechartsPrimitive.Cell key={`cell-${index}`} fill={entry.fill} />
                    ))
                  }
                </RechartsPrimitive.Pie>
              </RechartsPrimitive.PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Latest customer purchases</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="py-2 px-4 text-left">Order ID</th>
                    <th className="py-2 px-4 text-left">Customer</th>
                    <th className="py-2 px-4 text-left">Date</th>
                    <th className="py-2 px-4 text-right">Amount</th>
                    <th className="py-2 px-4 text-right">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { id: '#4532', customer: 'Jane Smith', date: '2025-05-07', amount: '$125.00', status: 'Completed' },
                    { id: '#4531', customer: 'John Doe', date: '2025-05-07', amount: '$85.50', status: 'Processing' },
                    { id: '#4530', customer: 'Emily Johnson', date: '2025-05-06', amount: '$210.25', status: 'Completed' },
                    { id: '#4529', customer: 'Michael Brown', date: '2025-05-06', amount: '$45.00', status: 'Shipped' },
                  ].map((order, idx) => (
                    <tr key={idx} className="border-b hover:bg-muted/50">
                      <td className="py-2 px-4">{order.id}</td>
                      <td className="py-2 px-4">{order.customer}</td>
                      <td className="py-2 px-4">{order.date}</td>
                      <td className="py-2 px-4 text-right">{order.amount}</td>
                      <td className="py-2 px-4 text-right">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          order.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                          order.status === 'Processing' ? 'bg-blue-100 text-blue-800' : 
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
