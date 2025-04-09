
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { useAuth } from "@/hooks/useAuth";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, UserPlus, UserMinus, Ban } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock users data - in a real app, this would come from an API
const mockUsers = [
  { id: "user-1", username: "johndoe", email: "john@example.com", department: "Software Engineering", lastActive: "2023-04-05", status: "active" },
  { id: "user-2", username: "janedoe", email: "jane@example.com", department: "Business", lastActive: "2023-04-06", status: "active" },
  { id: "user-3", username: "bobsmith", email: "bob@example.com", department: "Medical", lastActive: "2023-04-03", status: "inactive" },
  { id: "user-4", username: "alicegreen", email: "alice@example.com", department: "Agricultural", lastActive: "2023-04-04", status: "suspended" },
  { id: "user-5", username: "mikebrown", email: "mike@example.com", department: "Logistics & Transport", lastActive: "2023-04-07", status: "active" },
  { id: "user-6", username: "sarahconnor", email: "sarah@example.com", department: "Legal", lastActive: "2023-04-01", status: "active" },
  { id: "user-7", username: "davidlee", email: "david@example.com", department: "Marketing", lastActive: "2023-04-02", status: "active" },
  { id: "user-8", username: "emmawilson", email: "emma@example.com", department: "Human Resources", lastActive: "2023-04-08", status: "inactive" },
];

const Users = () => {
  const { isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [users, setUsers] = useState(mockUsers);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [departmentFilter, setDepartmentFilter] = useState("all");

  useEffect(() => {
    // Redirect if not authenticated or not admin
    if (!isAuthenticated || !isAdmin) {
      navigate("/auth");
      toast({
        title: "Access Denied",
        description: "You need admin privileges to access this page.",
        variant: "destructive",
      });
    }
    
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [isAuthenticated, isAdmin, navigate, toast]);

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter(user => user.id !== userId));
    toast({
      title: "User deleted",
      description: "The user has been successfully removed.",
    });
  };

  const handleSuspendUser = (userId: string) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === "suspended" ? "active" : "suspended" } 
        : user
    ));
    
    const user = users.find(u => u.id === userId);
    const newStatus = user?.status === "suspended" ? "active" : "suspended";
    
    toast({
      title: `User ${newStatus === "suspended" ? "suspended" : "reactivated"}`,
      description: `The user account has been ${newStatus === "suspended" ? "suspended" : "reactivated"}.`,
    });
  };

  // Apply filters to users
  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      searchQuery === "" || 
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = 
      statusFilter === "all" || 
      user.status === statusFilter;
    
    const matchesDepartment = 
      departmentFilter === "all" || 
      user.department === departmentFilter;
    
    return matchesSearch && matchesStatus && matchesDepartment;
  });

  // Get unique departments for filter
  const departments = [...new Set(users.map(user => user.department))];

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-6">User Management</h1>
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">User Management</h1>
          <Button variant="default" className="flex items-center gap-2">
            <UserPlus className="h-4 w-4" /> Add New User
          </Button>
        </div>

        {/* Filters */}
        <div className="bg-card rounded-lg shadow p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative w-full md:w-1/3">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search users..." 
                className="pl-10" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="w-full md:w-1/4">
              <Select 
                value={statusFilter} 
                onValueChange={setStatusFilter}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="w-full md:w-1/4">
              <Select 
                value={departmentFilter} 
                onValueChange={setDepartmentFilter}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filter by department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {departments.map(dept => (
                    <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-lg shadow">
          <Table>
            <TableCaption>
              {filteredUsers.length === 0 
                ? "No users found matching your filters" 
                : `Showing ${filteredUsers.length} of ${users.length} users`}
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Username</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{user.department}</Badge>
                  </TableCell>
                  <TableCell>{user.lastActive}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={
                        user.status === "active" ? "secondary" : 
                        user.status === "suspended" ? "destructive" : 
                        "outline"
                      }
                    >
                      {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleSuspendUser(user.id)}
                      className="inline-flex items-center gap-1"
                    >
                      {user.status === "suspended" ? "Reactivate" : (
                        <>
                          <Ban className="h-3.5 w-3.5" />
                          <span>Suspend</span>
                        </>
                      )}
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm" 
                      onClick={() => handleDeleteUser(user.id)}
                      className="inline-flex items-center gap-1"
                    >
                      <UserMinus className="h-3.5 w-3.5" />
                      <span>Delete</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </Layout>
  );
};

export default Users;
