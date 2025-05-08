
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requireAdmin = true 
}) => {
  const { isAuthenticated, isAdmin, loading } = useAuth();

  if (loading) {
    // Loading state while checking authentication
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/admin/login" replace />;
  }

  if (requireAdmin && !isAdmin) {
    // Redirect to login if admin access is required but user is not admin
    return <Navigate to="/admin/login" replace />;
  }

  // Render children if authenticated and has appropriate permissions
  return <>{children}</>;
};

export default ProtectedRoute;
