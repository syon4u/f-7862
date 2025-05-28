
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { adminMenuItems } from '@/config/adminMenuConfig';

const AdminSidebar = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <aside className="bg-card w-full md:w-64 md:min-h-[calc(100vh-theme(spacing.16))] p-4 shadow-md">
      <h2 className="text-xl font-bold mb-6 text-center">Admin Panel</h2>
      <nav>
        <ul className="space-y-2">
          {adminMenuItems.map((item) => (
            <li key={item.path}>
              <Link 
                to={item.path} 
                className={`flex items-center gap-3 p-3 rounded-lg transition-colors hover:bg-muted ${
                  isActive(item.path) ? 'bg-muted font-medium' : 'text-muted-foreground'
                }`}
              >
                <item.icon className="w-5 h-5" />
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
