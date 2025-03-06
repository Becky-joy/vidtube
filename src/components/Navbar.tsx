
import { useState, useRef, useEffect } from 'react';
import { Bell, Menu, Search, Upload, User, Mic } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface NavbarProps {
  toggleSidebar: () => void;
  sidebarOpen: boolean;
}

const Navbar = ({ toggleSidebar, sidebarOpen }: NavbarProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const navigate = useNavigate();
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    // Initialize speech recognition
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setSearchQuery(transcript);
        setIsListening(false);
        // Auto search after voice recognition
        setTimeout(() => {
          handleSearch(null, transcript);
        }, 500);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
        toast.error('Voice recognition failed. Please try again.');
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      toast.error('Speech recognition is not supported in your browser');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
        toast.info('Listening... Speak now');
      } catch (error) {
        console.error('Speech recognition error:', error);
        toast.error('Could not start voice recognition. Please try again.');
        setIsListening(false);
      }
    }
  };

  const handleSearch = (e: React.FormEvent | null, voiceQuery?: string) => {
    if (e) e.preventDefault();
    
    const query = voiceQuery || searchQuery;
    if (!query.trim()) return;
    
    // Navigate to explore page with search query
    navigate(`/explore?search=${encodeURIComponent(query.trim())}`);
    
    // If not called from voice recognition result
    if (!voiceQuery) {
      toast.success(`Searching for: ${query}`);
    }
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
        <div className="relative flex">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search"
            className="w-full bg-vidtube-dark border border-vidtube-gray rounded-l-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-vidtube-blue"
          />
          <div className="flex">
            <button 
              type="button" 
              onClick={toggleListening}
              className={cn(
                "px-3 bg-vidtube-darkgray border-y border-vidtube-gray",
                isListening ? "text-red-500 animate-pulse" : "hover:bg-vidtube-hover"
              )}
              aria-label="Search with voice"
            >
              <Mic className="h-5 w-5" />
            </button>
            <button 
              type="submit" 
              className="px-4 rounded-r-full bg-vidtube-gray hover:bg-vidtube-hover border border-vidtube-gray"
            >
              <Search className="h-5 w-5" />
            </button>
          </div>
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
