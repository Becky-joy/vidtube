
import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/hooks/useAuth';
import AdminSidebar from './AdminSidebar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const isMobile = useIsMobile();
  const { isAdmin } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

  useEffect(() => {
    // Close sidebar on mobile by default
    if (isMobile) {
      setSidebarOpen(false);
    } else {
      setSidebarOpen(true);
    }
  }, [isMobile]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
      <div className="flex flex-1">
        {isAdmin ? (
          <AdminSidebar isOpen={sidebarOpen} />
        ) : (
          <Sidebar isOpen={sidebarOpen} />
        )}
        <main 
          className="flex-1 pt-4 px-4 pb-8 transition-all duration-300"
          style={{ 
            marginLeft: sidebarOpen ? (isMobile ? '0' : '16rem') : (isMobile ? '0' : '4rem')
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
