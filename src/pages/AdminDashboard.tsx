
import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, LineChart, PieChart } from "@/components/ui/chart";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  FileVideo, 
  MessageSquare, 
  FileText, 
  Clock, 
  AlertCircle, 
  CheckCircle2,
  TrendingUp
} from "lucide-react";

// Mock data for dashboard
const mockStats = {
  totalUsers: 1526,
  activeUsers: 847,
  totalVideos: 248,
  forumPosts: 3142,
  quizAttempts: 8926
};

const mockRecentActivity = [
  { id: 1, type: "user", action: "New user registered", user: "emma87", time: "5 minutes ago" },
  { id: 2, type: "video", action: "New video uploaded", title: "Advanced React Hooks", user: "admin", time: "1 hour ago" },
  { id: 3, type: "forum", action: "Forum post reported", post: "How to implement...", user: "moderator", time: "2 hours ago" },
  { id: 4, type: "quiz", action: "Quiz created", title: "JavaScript Fundamentals", user: "admin", time: "5 hours ago" },
  { id: 5, type: "user", action: "User account suspended", user: "troublemaker22", time: "1 day ago" }
];

const mockNotifications = [
  { id: 1, type: "warning", message: "3 users reported a forum post", time: "10 minutes ago" },
  { id: 2, type: "info", message: "System update scheduled for tomorrow", time: "2 hours ago" },
  { id: 3, type: "success", message: "Backup completed successfully", time: "5 hours ago" },
  { id: 4, type: "warning", message: "Unusual login activity detected", time: "1 day ago" }
];

// Chart data
const userActivityData = [
  { name: "Mon", value: 120 },
  { name: "Tue", value: 132 },
  { name: "Wed", value: 101 },
  { name: "Thu", value: 134 },
  { name: "Fri", value: 190 },
  { name: "Sat", value: 230 },
  { name: "Sun", value: 210 },
];

const contentTypeData = [
  { name: "Tutorial Videos", value: 65 },
  { name: "Live Sessions", value: 15 },
  { name: "Webinars", value: 10 },
  { name: "Podcast", value: 10 }
];

const AdminDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
          <div className="animate-pulse space-y-4">
            <div className="h-40 bg-gray-200 rounded"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto p-4 space-y-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-6">
              <div className="bg-primary/10 p-3 rounded-full mb-2">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold">{mockStats.totalUsers}</h3>
              <p className="text-sm text-muted-foreground">Total Users</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-6">
              <div className="bg-green-500/10 p-3 rounded-full mb-2">
                <TrendingUp className="h-6 w-6 text-green-500" />
              </div>
              <h3 className="text-2xl font-bold">{mockStats.activeUsers}</h3>
              <p className="text-sm text-muted-foreground">Active Users</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-6">
              <div className="bg-blue-500/10 p-3 rounded-full mb-2">
                <FileVideo className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="text-2xl font-bold">{mockStats.totalVideos}</h3>
              <p className="text-sm text-muted-foreground">Total Videos</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-6">
              <div className="bg-orange-500/10 p-3 rounded-full mb-2">
                <MessageSquare className="h-6 w-6 text-orange-500" />
              </div>
              <h3 className="text-2xl font-bold">{mockStats.forumPosts}</h3>
              <p className="text-sm text-muted-foreground">Forum Posts</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-6">
              <div className="bg-purple-500/10 p-3 rounded-full mb-2">
                <FileText className="h-6 w-6 text-purple-500" />
              </div>
              <h3 className="text-2xl font-bold">{mockStats.quizAttempts}</h3>
              <p className="text-sm text-muted-foreground">Quiz Attempts</p>
            </CardContent>
          </Card>
        </div>
        
        {/* Charts */}
        <Tabs defaultValue="activity">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Analytics Overview</h2>
            <TabsList>
              <TabsTrigger value="activity">User Activity</TabsTrigger>
              <TabsTrigger value="content">Content</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="activity" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Weekly User Activity</CardTitle>
                <CardDescription>User logins over the past 7 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <BarChart 
                    data={userActivityData}
                    index="name"
                    categories={["value"]}
                    colors={["blue"]}
                    yAxisWidth={40}
                    showAnimation={true}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="content" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Content Distribution</CardTitle>
                <CardDescription>Breakdown of content types on the platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <PieChart
                    data={contentTypeData}
                    index="name"
                    categories={["value"]}
                    colors={["blue", "sky", "indigo", "violet"]}
                    showAnimation={true}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        {/* Activity and Notifications */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest actions across the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockRecentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-4 pb-4 border-b last:border-0">
                    <div className="bg-muted rounded-full p-2">
                      {activity.type === "user" && <Users className="h-4 w-4" />}
                      {activity.type === "video" && <FileVideo className="h-4 w-4" />}
                      {activity.type === "forum" && <MessageSquare className="h-4 w-4" />}
                      {activity.type === "quiz" && <FileText className="h-4 w-4" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">
                        by {activity.user} • {activity.time}
                      </p>
                    </div>
                    <Button variant="ghost" size="sm" className="text-xs">
                      View
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Notifications */}
          <Card>
            <CardHeader>
              <CardTitle>Admin Notifications</CardTitle>
              <CardDescription>System alerts and important messages</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockNotifications.map((notification) => (
                  <div key={notification.id} className="flex items-start gap-4 pb-4 border-b last:border-0">
                    <div className={`rounded-full p-2 ${
                      notification.type === "warning" ? "bg-yellow-100 text-yellow-600" :
                      notification.type === "info" ? "bg-blue-100 text-blue-600" :
                      notification.type === "success" ? "bg-green-100 text-green-600" :
                      "bg-red-100 text-red-600"
                    }`}>
                      {notification.type === "warning" && <AlertCircle className="h-4 w-4" />}
                      {notification.type === "info" && <Clock className="h-4 w-4" />}
                      {notification.type === "success" && <CheckCircle2 className="h-4 w-4" />}
                      {notification.type === "error" && <AlertCircle className="h-4 w-4" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{notification.message}</p>
                      <p className="text-xs text-muted-foreground">{notification.time}</p>
                    </div>
                    <Button variant="ghost" size="sm" className="text-xs">
                      Resolve
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
