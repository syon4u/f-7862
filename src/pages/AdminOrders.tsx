
import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/admin/AdminLayout';
import { supabase } from '@/integrations/supabase/client';
import { Order } from '@/types/product';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Package, Calendar, DollarSign } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const AdminOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Map database response to match our Order interface
      const mappedOrders: Order[] = (data || []).map(order => ({
        id: order.id,
        customerId: order.customer_id,
        orderNumber: order.order_number,
        status: order.status,
        paymentMethod: order.payment_method,
        subtotal: order.subtotal,
        shippingCost: order.shipping_cost,
        taxAmount: order.tax_amount,
        totalAmount: order.total_amount,
        shippingAddressId: order.shipping_address_id,
        billingAddressId: order.billing_address_id,
        notes: order.notes,
        createdAt: order.created_at,
        updatedAt: order.updated_at
      }));
      
      setOrders(mappedOrders);
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast({
        title: "Error",
        description: "Failed to fetch orders",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <AdminLayout title="Order Management">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Order Management">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search by order number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex items-center gap-4">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Badge variant="secondary">
              {filteredOrders.length} orders
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredOrders.map((order) => (
            <Card key={order.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Package className="h-5 w-5" />
                    {order.orderNumber}
                  </CardTitle>
                  <Badge className={getStatusColor(order.status)}>
                    {order.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <DollarSign className="h-4 w-4" />
                  <span className="font-medium">${order.totalAmount.toFixed(2)}</span>
                  <span className="text-xs">
                    (Subtotal: ${order.subtotal.toFixed(2)})
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(order.createdAt || '').toLocaleDateString()}</span>
                </div>
                {order.paymentMethod && (
                  <div className="text-sm text-muted-foreground">
                    Payment: <span className="capitalize">{order.paymentMethod.replace('-', ' ')}</span>
                  </div>
                )}
                {order.notes && (
                  <div className="text-sm text-muted-foreground">
                    <span className="font-medium">Notes:</span> {order.notes}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-muted-foreground">No orders found</h3>
            <p className="text-muted-foreground">
              {searchTerm || statusFilter !== 'all' 
                ? 'Try adjusting your search criteria' 
                : 'No orders have been placed yet'
              }
            </p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminOrders;
