
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Users, 
  FileVideo, 
  MessageSquare, 
  FileText, 
  BarChart, 
  Settings,
  Plus,
  Mail,
  Bell
} from 'lucide-react';
import { useNotifications } from '@/contexts/NotificationContext';

interface AdminSidebarProps {
  isOpen: boolean;
}

const AdminSidebar = ({ isOpen }: AdminSidebarProps) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const { unreadCount } = useNotifications();

  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: <LayoutDashboard className="h-5 w-5" /> },
    { name: "Users", path: "/users", icon: <Users className="h-5 w-5" /> },
    { name: "Videos", path: "/videos", icon: <FileVideo className="h-5 w-5" /> },
    { name: "Forum", path: "/forums/moderation", icon: <MessageSquare className="h-5 w-5" /> },
    { name: "Quizzes", path: "/quiz/management", icon: <FileText className="h-5 w-5" /> },
    { name: "Analytics", path: "/analytics", icon: <BarChart className="h-5 w-5" /> },
    { 
      name: "Support", 
      path: "/support", 
      icon: <Mail className="h-5 w-5" />,
      badge: unreadCount > 0 ? unreadCount : undefined
    },
    { name: "Settings", path: "/settings", icon: <Settings className="h-5 w-5" /> },
  ];

  const adminCategories = [
    { name: "Content", items: ["Dashboard", "Videos", "Quizzes"] },
    { name: "Community", items: ["Users", "Forum", "Support"] },
    { name: "System", items: ["Analytics", "Settings"] },
  ];

  return (
    <aside className={cn(
      "fixed left-0 top-14 h-[calc(100vh-3.5rem)] bg-sidebar border-r border-border transition-all duration-300 z-10",
      isOpen ? "w-64" : "w-16"
    )}>
      <div className="flex flex-col h-full">
        <div className="p-4">
          <Link 
            to="/videos"
            className={cn(
              "flex items-center w-full p-2 rounded-md bg-primary text-primary-foreground",
              !isOpen && "justify-center"
            )}
          >
            <Plus className="h-5 w-5" />
            {isOpen && <span className="ml-2">Create Video</span>}
          </Link>
        </div>
        
        <div className="px-3 py-2 flex-1 overflow-y-auto">
          {isOpen ? (
            // Show categories when sidebar is expanded
            <>
              {adminCategories.map((category) => (
                <div key={category.name} className="mb-4">
                  <h4 className="text-xs font-semibold text-muted-foreground uppercase px-2 mb-2">
                    {category.name}
                  </h4>
                  <ul className="space-y-1">
                    {menuItems
                      .filter(item => category.items.includes(item.name))
                      .map((item) => (
                        <li key={item.name}>
                          <Link
                            to={item.path}
                            className={cn(
                              "flex items-center w-full p-2 rounded-md hover:bg-accent text-sm",
                              currentPath === item.path ? "bg-accent text-accent-foreground font-medium" : "text-foreground"
                            )}
                          >
                            {item.icon}
                            <span className="ml-3">{item.name}</span>
                            {item.badge && (
                              <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                                {item.badge > 9 ? "9+" : item.badge}
                              </span>
                            )}
                          </Link>
                        </li>
                      ))}
                  </ul>
                </div>
              ))}
            </>
          ) : (
            // Show only icons when sidebar is collapsed
            <ul className="flex flex-col items-center space-y-4 py-2">
              {menuItems.map((item) => (
                <li key={item.name} className="w-full flex justify-center relative">
                  <Link
                    to={item.path}
                    className={cn(
                      "p-2 rounded-md hover:bg-accent",
                      currentPath === item.path ? "bg-accent text-accent-foreground" : "text-foreground"
                    )}
                    title={item.name}
                  >
                    {item.icon}
                    {item.badge && (
                      <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                        {item.badge > 9 ? "9+" : item.badge}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;
