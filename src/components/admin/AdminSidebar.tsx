
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Image, 
  ShoppingBag, 
  Users, 
  FileText, 
  Settings, 
  BarChart
} from 'lucide-react';

const AdminSidebar = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const menuItems = [
    { 
      path: '/admin/dashboard', 
      label: 'Dashboard', 
      icon: <LayoutDashboard className="w-5 h-5" /> 
    },
    { 
      path: '/admin/banners', 
      label: 'Banners', 
      icon: <Image className="w-5 h-5" /> 
    },
    { 
      path: '/admin/inventory', 
      label: 'Products', 
      icon: <ShoppingBag className="w-5 h-5" /> 
    },
    { 
      path: '/admin/customers', 
      label: 'Customers', 
      icon: <Users className="w-5 h-5" /> 
    },
    { 
      path: '/admin/orders', 
      label: 'Orders', 
      icon: <FileText className="w-5 h-5" /> 
    },
    { 
      path: '/admin/analytics', 
      label: 'Analytics', 
      icon: <BarChart className="w-5 h-5" /> 
    },
    { 
      path: '/admin/settings', 
      label: 'Settings', 
      icon: <Settings className="w-5 h-5" /> 
    },
  ];

  return (
    <aside className="bg-card w-full md:w-64 md:min-h-[calc(100vh-theme(spacing.16))] p-4 shadow-md">
      <h2 className="text-xl font-bold mb-6 text-center">Admin Panel</h2>
      <nav>
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link 
                to={item.path} 
                className={`flex items-center gap-3 p-3 rounded-lg transition-colors hover:bg-muted ${
                  isActive(item.path) ? 'bg-muted font-medium' : 'text-muted-foreground'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
