
import { 
  LayoutDashboard, 
  Image, 
  ShoppingBag, 
  Users, 
  FileText, 
  Settings, 
  BarChart,
  LucideIcon
} from 'lucide-react';

export interface MenuItem {
  path: string;
  label: string;
  icon: LucideIcon;
}

export const adminMenuItems: MenuItem[] = [
  { 
    path: '/admin/dashboard', 
    label: 'Dashboard', 
    icon: LayoutDashboard
  },
  { 
    path: '/admin/banners', 
    label: 'Banners', 
    icon: Image
  },
  { 
    path: '/admin/inventory', 
    label: 'Products', 
    icon: ShoppingBag
  },
  { 
    path: '/admin/customers', 
    label: 'Customers', 
    icon: Users
  },
  { 
    path: '/admin/orders', 
    label: 'Orders', 
    icon: FileText
  },
  { 
    path: '/admin/analytics', 
    label: 'Analytics', 
    icon: BarChart
  },
  { 
    path: '/admin/settings', 
    label: 'Settings', 
    icon: Settings
  },
];
