
import { Home, Compass, Library, MessageSquare, HelpCircle, BarChart3, Settings, BookOpen, Facebook, Instagram, Linkedin, Twitter, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar = ({ isOpen }: SidebarProps) => {
  return (
    <aside 
      className={cn(
        "fixed left-0 top-14 h-[calc(100vh-56px)] bg-vidtube-dark transition-all duration-300 z-20 overflow-y-auto overflow-x-hidden scrollbar-thin",
        isOpen ? "w-64" : "w-0 md:w-16"
      )}
    >
      <nav className={cn("flex flex-col py-2", !isOpen && "items-center")}>
        <div className="mb-2">
          <Link to="/" className={cn("sidebar-item", { "justify-center": !isOpen })}>
            <Home className="h-5 w-5 min-w-5" />
            {isOpen && <span>Home</span>}
          </Link>
          <Link to="/explore" className={cn("sidebar-item", { "justify-center": !isOpen })}>
            <Compass className="h-5 w-5 min-w-5" />
            {isOpen && <span>Explore</span>}
          </Link>
          <Link to="/library" className={cn("sidebar-item", { "justify-center": !isOpen })}>
            <Library className="h-5 w-5 min-w-5" />
            {isOpen && <span>Library</span>}
          </Link>
          <Link to="/settings" className={cn("sidebar-item", { "justify-center": !isOpen })}>
            <Settings className="h-5 w-5 min-w-5" />
            {isOpen && <span>Settings</span>}
          </Link>
        </div>

        {isOpen && (
          <>
            <div className="border-t border-vidtube-gray pt-4 mt-2">
              <h2 className="text-sm px-6 pb-2 font-semibold text-vidtube-lightgray">More from NerdHub</h2>
              <Link to="/forums" className="sidebar-item">
                <MessageSquare className="h-5 w-5" />
                <span>FORUMS</span>
              </Link>
              <Link to="/quiz" className="sidebar-item">
                <BookOpen className="h-5 w-5" />
                <span>Quiz</span>
              </Link>
              <Link to="/support" className="sidebar-item">
                <HelpCircle className="h-5 w-5" />
                <span>Contact & support</span>
              </Link>
              <Link to="/dashboard" className="sidebar-item">
                <BarChart3 className="h-5 w-5" />
                <span>Dashboard</span>
              </Link>
            </div>

            <div className="border-t border-vidtube-gray pt-4 mt-2">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="sidebar-item">
                <Facebook className="h-5 w-5" />
                <span>Facebook</span>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="sidebar-item">
                <Instagram className="h-5 w-5" />
                <span>Instagram</span>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="sidebar-item">
                <Linkedin className="h-5 w-5" />
                <span>LinkedIn</span>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="sidebar-item">
                <Twitter className="h-5 w-5" />
                <span>Twitter</span>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="sidebar-item">
                <Youtube className="h-5 w-5" />
                <span>YouTube</span>
              </a>
            </div>

            <div className="px-6 py-4 text-xs text-vidtube-lightgray">
              © 2025 Learning Platform
            </div>
          </>
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;
