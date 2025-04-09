
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useAuth } from '@/hooks/useAuth';
import NotificationBell from '@/components/NotificationBell';

interface NavbarProps {
  toggleSidebar?: () => void;
  sidebarOpen?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ toggleSidebar, sidebarOpen }) => {
  const { user, logout } = useAuth();
  
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link to="/" className="flex items-center space-x-2">
            <span className="font-bold">EdPlatform</span>
          </Link>
        </div>
        
        <div className="flex-1">
          {/* Navigation links */}
          <div className="flex items-center justify-end space-x-4">
            {user && <NotificationBell />}
            <ThemeToggle />
            {user ? (
              <Button variant="ghost" onClick={logout}>
                Logout
              </Button>
            ) : (
              <Button asChild variant="default">
                <Link to="/auth">Login</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
