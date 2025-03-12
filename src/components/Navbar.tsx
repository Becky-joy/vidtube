
import { useState } from 'react';
import { Bell, Menu, Search, Upload, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

interface NavbarProps {
  toggleSidebar: () => void;
  sidebarOpen: boolean;
}

const Navbar = ({ toggleSidebar, sidebarOpen }: NavbarProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    // Here you would typically handle the search functionality
  };

  return (
    <header className="flex items-center justify-between px-4 py-2 bg-vidtube-dark border-b border-vidtube-gray sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleSidebar} 
          className="p-2 rounded-full hover:bg-vidtube-hover"
          aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
        >
          <Menu className="h-5 w-5" />
        </button>
        <Link to="/" className="flex items-center gap-1">
          <div className="h-8 w-8 rounded-full bg-vidtube-blue flex items-center justify-center overflow-hidden">
            <span className="font-bold text-white text-sm">VT</span>
          </div>
          <span className="font-bold hidden md:block">VIDTUBE</span>
        </Link>
      </div>

      <form onSubmit={handleSearch} className="flex-1 max-w-xl mx-4">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search"
            className="w-full bg-vidtube-dark border border-vidtube-gray rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-vidtube-blue"
          />
          <button type="submit" className="absolute right-0 top-0 h-full px-4 rounded-r-full bg-vidtube-gray hover:bg-vidtube-hover">
            <Search className="h-5 w-5" />
          </button>
        </div>
      </form>

      <div className="flex items-center gap-2">
        <button className="p-2 rounded-full hover:bg-vidtube-hover hidden sm:flex">
          <Upload className="h-5 w-5" />
        </button>
        <button className="p-2 rounded-full hover:bg-vidtube-hover hidden sm:flex">
          <Bell className="h-5 w-5" />
        </button>
        <button className="p-2 rounded-full hover:bg-vidtube-hover">
          <User className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
};

export default Navbar;
