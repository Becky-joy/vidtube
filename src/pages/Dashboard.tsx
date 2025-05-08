import { useState } from "react";
import Layout from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Pie, PieChart, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import VideoGrid from "@/components/VideoGrid";
import { useAuth } from "@/hooks/useAuth";
import { 
  Activity, 
  Users, 
  Clock, 
  Star, 
  TrendingUp, 
  MessageSquare,
  Settings,
  FileText,
  Bell
} from "lucide-react";

const Dashboard = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [noteText, setNoteText] = useState("");
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const { user } = useAuth();
  const [notes, setNotes] = useState([
    { id: 1, text: "Complete the video editing tutorial", completed: false },
    { id: 2, text: "Join today's livestream at 5PM", completed: false },
  ]);

  // Sample data for charts
  const pieData = [
    { name: "Tutorial Videos", value: 45, color: "#8b5cf6" },
    { name: "Live Streams", value: 30, color: "#0ea5e9" },
    { name: "Discussions", value: 15, color: "#f97316" },
    { name: "Quizzes", value: 10, color: "#10b981" },
  ];

  const activityData = [
    { name: "Mon", videos: 4, comments: 12 },
    { name: "Tue", videos: 3, comments: 8 },
    { name: "Wed", videos: 2, comments: 15 },
    { name: "Thu", videos: 7, comments: 21 },
    { name: "Fri", videos: 5, comments: 18 },
    { name: "Sat", videos: 8, comments: 24 },
    { name: "Sun", videos: 6, comments: 14 },
  ];

  const recentActivities = [
    { id: 1, type: "comment", content: "Someone commented on your React tutorial", time: "10 minutes ago" },
    { id: 2, type: "like", content: "Your JavaScript basics video received 5 new likes", time: "30 minutes ago" },
    { id: 3, type: "forum", content: "New discussion in Web Development forum", time: "1 hour ago" },
    { id: 4, type: "video", content: "New recommended video: 'Advanced CSS Techniques'", time: "2 hours ago" },
  ];

  const userStats = {
    videosWatched: 87,
    completedCourses: 3,
    quizzesTaken: 12,
    forumPosts: 28,
    totalPoints: 2450,
    hoursWatched: 8.5,
    points: 450,
    comments: 12
  };
  
  const handleVideoSelect = (videoId: string) => {
    setSelectedVideo(videoId);
  };

  const addNote = () => {
    if (noteText.trim()) {
      const newNote = {
        id: Date.now(),
        text: noteText,
        completed: false,
      };
      setNotes([...notes, newNote]);
      setNoteText("");
      toast({
        title: "Note added",
        description: "Your note has been added successfully",
      });
    }
  };

  const toggleNote = (id: number) => {
    setNotes(
      notes.map((note) =>
        note.id === id ? { ...note, completed: !note.completed } : note
      )
    );
  };

  const deleteNote = (id: number) => {
    setNotes(notes.filter((note) => note.id !== id));
    toast({
      title: "Note deleted",
      description: "Your note has been deleted",
    });
  };

  return (
    <Layout>
      <div className="animate-fade-in">
        <div className="mb-6">
          <div className="flex flex-wrap items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Welcome back, {user?.username || 'Learner'}!</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card className="bg-vidtube-darkgray p-4 flex flex-col items-center justify-center">
              <Clock className="h-8 w-8 mb-2 text-blue-400" />
              <h3 className="text-xl font-semibold">{userStats.videosWatched}</h3>
              <p className="text-sm text-vidtube-lightgray">Videos Watched</p>
            </Card>
            <Card className="bg-vidtube-darkgray p-4 flex flex-col items-center justify-center">
              <Activity className="h-8 w-8 mb-2 text-green-500" />
              <h3 className="text-xl font-semibold">{userStats.hoursWatched}h</h3>
              <p className="text-sm text-vidtube-lightgray">Hours Watched</p>
            </Card>
            <Card className="bg-vidtube-darkgray p-4 flex flex-col items-center justify-center">
              <Star className="h-8 w-8 mb-2 text-yellow-500" />
              <h3 className="text-xl font-semibold">{userStats.points}</h3>
              <p className="text-sm text-vidtube-lightgray">Points Earned</p>
            </Card>
            <Card className="bg-vidtube-darkgray p-4 flex flex-col items-center justify-center">
              <MessageSquare className="h-8 w-8 mb-2 text-purple-500" />
              <h3 className="text-xl font-semibold">{userStats.comments}</h3>
              <p className="text-sm text-vidtube-lightgray">Comments</p>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card className="bg-vidtube-darkgray p-4 h-full">
                <h2 className="text-lg font-medium mb-3 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" /> 
                  Your Progress
                </h2>
                <Separator className="my-3" />
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">React Fundamentals</span>
                      <span className="text-xs text-vidtube-lightgray">75%</span>
                    </div>
                    <div className="w-full bg-vidtube-gray h-2 rounded-full">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">Node.js Basics</span>
                      <span className="text-xs text-vidtube-lightgray">40%</span>
                    </div>
                    <div className="w-full bg-vidtube-gray h-2 rounded-full">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '40%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">TypeScript Deep Dive</span>
                      <span className="text-xs text-vidtube-lightgray">20%</span>
                    </div>
                    <div className="w-full bg-vidtube-gray h-2 rounded-full">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '20%' }}></div>
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <Button variant="outline" size="sm" className="w-full">View All Courses</Button>
                  </div>
                </div>
              </Card>
            </div>
            
            <Card className="bg-vidtube-darkgray p-4">
              <h2 className="text-lg font-medium mb-3 flex items-center gap-2">
                <Bell className="h-5 w-5" /> 
                Recent Activity
              </h2>
              <Separator className="my-3" />
              
              <div className="space-y-3">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3 border-b border-vidtube-gray/20 pb-3 last:border-0">
                    <div className="bg-vidtube-gray/20 rounded-full p-2">
                      {activity.type === "comment" && <MessageSquare className="h-4 w-4 text-blue-400" />}
                      {activity.type === "video" && <Clock className="h-4 w-4 text-green-400" />}
                      {activity.type === "like" && <Star className="h-4 w-4 text-yellow-400" />} 
                      {activity.type === "forum" && <Users className="h-4 w-4 text-purple-400" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">{activity.content}</p>
                      <p className="text-xs text-vidtube-lightgray">{activity.time}</p>
                    </div>
                  </div>
                ))}
                <Button variant="ghost" size="sm" className="w-full mt-2">View All Activity</Button>
              </div>
            </Card>
          </div>
          
          <div className="mt-8">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Users className="h-5 w-5" /> 
              Recommended For You
            </h2>
            <VideoGrid onVideoSelect={handleVideoSelect} limit={4} />
            <div className="mt-4 text-center">
              <Button variant="outline">View All Videos</Button>
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mt-8">
          <TabsList className="mb-6 grid grid-cols-3 md:grid-cols-5 w-full">
            <TabsTrigger value="overview" className="flex items-center gap-1">
              <Activity className="h-4 w-4" />
              <span className="hidden md:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="stats" className="flex items-center gap-1">
              <TrendingUp className="h-4 w-4" />
              <span className="hidden md:inline">Statistics</span>
            </TabsTrigger>
            <TabsTrigger value="activities" className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span className="hidden md:inline">Activities</span>
            </TabsTrigger>
            <TabsTrigger value="notes" className="flex items-center gap-1">
              <FileText className="h-4 w-4" />
              <span className="hidden md:inline">Notes</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-1">
              <Settings className="h-4 w-4" />
              <span className="hidden md:inline">Settings</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Card className="bg-vidtube-darkgray p-4 flex flex-col items-center justify-center">
                <Users className="h-8 w-8 mb-2 text-vidtube-blue" />
                <h3 className="text-xl font-semibold">8,742</h3>
                <p className="text-sm text-vidtube-lightgray">Community Members</p>
              </Card>
              <Card className="bg-vidtube-darkgray p-4 flex flex-col items-center justify-center">
                <Clock className="h-8 w-8 mb-2 text-green-500" />
                <h3 className="text-xl font-semibold">342h</h3>
                <p className="text-sm text-vidtube-lightgray">Hours Watched</p>
              </Card>
              <Card className="bg-vidtube-darkgray p-4 flex flex-col items-center justify-center">
                <Star className="h-8 w-8 mb-2 text-yellow-500" />
                <h3 className="text-xl font-semibold">2,450</h3>
                <p className="text-sm text-vidtube-lightgray">Your Points</p>
              </Card>
              <Card className="bg-vidtube-darkgray p-4 flex flex-col items-center justify-center">
                <MessageSquare className="h-8 w-8 mb-2 text-purple-500" />
                <h3 className="text-xl font-semibold">87</h3>
                <p className="text-sm text-vidtube-lightgray">Forum Posts</p>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-vidtube-darkgray p-4">
                <h3 className="text-lg font-medium mb-3">Content Distribution</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              <Card className="bg-vidtube-darkgray p-4">
                <h3 className="text-lg font-medium mb-3">Weekly Activity</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={activityData}
                      margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="videos" fill="#8b5cf6" name="Videos Watched" />
                      <Bar dataKey="comments" fill="#0ea5e9" name="Comments Made" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>

            <Card className="bg-vidtube-darkgray p-4">
              <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
                <Bell className="h-5 w-5" /> 
                Recent Activities
              </h3>
              <div className="space-y-3">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3 border-b border-vidtube-gray/20 pb-3 last:border-0">
                    <div className="bg-vidtube-gray/20 rounded-full p-2">
                      {activity.type === "comment" && <MessageSquare className="h-4 w-4 text-blue-400" />}
                      {activity.type === "like" && <Star className="h-4 w-4 text-yellow-400" />}
                      {activity.type === "forum" && <Users className="h-4 w-4 text-green-400" />}
                      {activity.type === "video" && <Activity className="h-4 w-4 text-purple-400" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">{activity.content}</p>
                      <p className="text-xs text-vidtube-lightgray">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="stats" className="space-y-6">
            <Card className="bg-vidtube-darkgray p-6">
              <h2 className="text-xl font-medium mb-4">Your Learning Statistics</h2>
              <Separator className="my-4" />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-3">Activity Summary</h3>
                  <ul className="space-y-3">
                    <li className="flex justify-between items-center">
                      <span className="flex items-center gap-2">
                        <Activity className="h-4 w-4 text-blue-400" />
                        Videos Watched
                      </span>
                      <span className="font-semibold">{userStats.videosWatched}</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-yellow-400" />
                        Completed Courses
                      </span>
                      <span className="font-semibold">{userStats.completedCourses}</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-green-400" />
                        Quizzes Taken
                      </span>
                      <span className="font-semibold">{userStats.quizzesTaken}</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4 text-purple-400" />
                        Forum Posts
                      </span>
                      <span className="font-semibold">{userStats.forumPosts}</span>
                    </li>
                    <li className="flex justify-between items-center bg-vidtube-gray/20 p-2 rounded">
                      <span className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-vidtube-blue" />
                        Total Points
                      </span>
                      <span className="font-semibold">{userStats.totalPoints}</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-3">Progress Badges</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="flex flex-col items-center">
                      <div className="h-16 w-16 rounded-full bg-blue-500/20 flex items-center justify-center mb-1">
                        <Activity className="h-8 w-8 text-blue-500" />
                      </div>
                      <span className="text-xs text-center">Video Master</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="h-16 w-16 rounded-full bg-green-500/20 flex items-center justify-center mb-1">
                        <FileText className="h-8 w-8 text-green-500" />
                      </div>
                      <span className="text-xs text-center">Quiz Ace</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="h-16 w-16 rounded-full bg-amber-500/20 flex items-center justify-center mb-1">
                        <Users className="h-8 w-8 text-amber-500" />
                      </div>
                      <span className="text-xs text-center">Community Fan</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="h-16 w-16 rounded-full bg-purple-500/20 flex items-center justify-center mb-1">
                        <MessageSquare className="h-8 w-8 text-purple-500" />
                      </div>
                      <span className="text-xs text-center">Forum Helper</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="h-16 w-16 rounded-full bg-gray-500/20 flex items-center justify-center mb-1">
                        <Clock className="h-8 w-8 text-gray-500" />
                      </div>
                      <span className="text-xs text-center">Early Bird</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="h-16 w-16 rounded-full bg-vidtube-gray/20 flex items-center justify-center mb-1 border-2 border-dashed border-vidtube-gray">
                        <Star className="h-8 w-8 text-vidtube-gray" />
                      </div>
                      <span className="text-xs text-center">Locked</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="activities" className="space-y-6">
            <Card className="bg-vidtube-darkgray p-6">
              <h2 className="text-xl font-medium mb-4">Recent Activities</h2>
              <Separator className="my-4" />
              
              <div className="space-y-6">
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3 border-b border-vidtube-gray/20 pb-4 last:border-0">
                      <div className="bg-vidtube-gray/20 rounded-full p-3">
                        {activity.type === "comment" && <MessageSquare className="h-5 w-5 text-blue-400" />}
                        {activity.type === "like" && <Star className="h-5 w-5 text-yellow-400" />}
                        {activity.type === "forum" && <Users className="h-5 w-5 text-green-400" />}
                        {activity.type === "video" && <Activity className="h-5 w-5 text-purple-400" />}
                      </div>
                      <div className="flex-1">
                        <p>{activity.content}</p>
                        <p className="text-sm text-vidtube-lightgray">{activity.time}</p>
                      </div>
                      <Button variant="ghost" size="sm">View</Button>
                    </div>
                  ))}
                </div>
                
                <Button className="w-full">Load More Activities</Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="notes" className="space-y-6">
            <Card className="bg-vidtube-darkgray p-6">
              <h2 className="text-xl font-medium mb-4">Your Notes</h2>
              <Separator className="my-4" />
              
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a new note"
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                    className="flex-1"
                  />
                  <Button onClick={addNote}>Add</Button>
                </div>
                
                <div className="mt-4 space-y-2">
                  {notes.length === 0 ? (
                    <div className="text-center py-6 text-vidtube-lightgray">
                      <FileText className="h-12 w-12 mx-auto mb-2 opacity-50" />
                      <p>No notes yet. Add your first note above!</p>
                    </div>
                  ) : (
                    notes.map((note) => (
                      <div
                        key={note.id}
                        className="flex items-center gap-2 p-3 bg-vidtube-gray/20 rounded hover:bg-vidtube-gray/30 transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={note.completed}
                          onChange={() => toggleNote(note.id)}
                          className="h-4 w-4"
                        />
                        <span className={`flex-1 ${note.completed ? "line-through text-vidtube-lightgray" : ""}`}>
                          {note.text}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteNote(note.id)}
                          className="text-destructive hover:text-destructive/90 px-2"
                        >
                          Delete
                        </Button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card className="bg-vidtube-darkgray p-6">
              <h2 className="text-xl font-medium mb-4">Dashboard Settings</h2>
              <Separator className="my-4" />
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-lg">Widgets Display</h3>
                  <p className="text-sm text-vidtube-lightgray">Choose which widgets to show on your dashboard</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                    <div className="flex items-center justify-between bg-vidtube-gray/20 p-3 rounded">
                      <span>Statistics Overview</span>
                      <input type="checkbox" defaultChecked className="h-4 w-4" />
                    </div>
                    <div className="flex items-center justify-between bg-vidtube-gray/20 p-3 rounded">
                      <span>Content Distribution</span>
                      <input type="checkbox" defaultChecked className="h-4 w-4" />
                    </div>
                    <div className="flex items-center justify-between bg-vidtube-gray/20 p-3 rounded">
                      <span>Weekly Activity</span>
                      <input type="checkbox" defaultChecked className="h-4 w-4" />
                    </div>
                    <div className="flex items-center justify-between bg-vidtube-gray/20 p-3 rounded">
                      <span>Recent Activities</span>
                      <input type="checkbox" defaultChecked className="h-4 w-4" />
                    </div>
                    <div className="flex items-center justify-between bg-vidtube-gray/20 p-3 rounded">
                      <span>Notes</span>
                      <input type="checkbox" defaultChecked className="h-4 w-4" />
                    </div>
                    <div className="flex items-center justify-between bg-vidtube-gray/20 p-3 rounded">
                      <span>Progress Badges</span>
                      <input type="checkbox" defaultChecked className="h-4 w-4" />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-lg">Notifications</h3>
                  <p className="text-sm text-vidtube-lightgray">Manage your dashboard notifications</p>
                  
                  <div className="space-y-3 mt-3">
                    <div className="flex items-center justify-between">
                      <span>Dashboard activity summary (weekly)</span>
                      <input type="checkbox" defaultChecked className="h-4 w-4" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Achievement notifications</span>
                      <input type="checkbox" defaultChecked className="h-4 w-4" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Point milestone alerts</span>
                      <input type="checkbox" defaultChecked className="h-4 w-4" />
                    </div>
                  </div>
                </div>

                <Button>Save Settings</Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Dashboard;
