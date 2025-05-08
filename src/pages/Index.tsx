
import Layout from '@/components/Layout';
import VideoGrid from '@/components/VideoGrid';
import { useState } from 'react';
import VideoPlayer from '@/components/VideoPlayer';
import { Dialog } from '@/components/ui/dialog';
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Activity, Clock, Star, TrendingUp, MessageSquare, Users, Bell } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const Index = () => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("dashboard");
  const { user } = useAuth();
  
  const handleVideoSelect = (videoId: string) => {
    setSelectedVideo(videoId);
  };
  
  const handleCloseVideo = () => {
    setSelectedVideo(null);
  };

  // Sample data for dashboard
  const userStats = {
    videosWatched: 24,
    hoursWatched: 8.5,
    points: 450,
    comments: 12
  };

  const recentActivities = [
    { id: 1, type: "video", content: "You watched 'React Hooks Explained'", time: "2 hours ago" },
    { id: 2, type: "comment", content: "You commented on 'Advanced CSS Techniques'", time: "Yesterday" },
    { id: 3, type: "points", content: "You earned 50 points for quiz completion", time: "2 days ago" },
    { id: 4, type: "video", content: "You watched 'Building APIs with Node.js'", time: "3 days ago" },
  ];

  return (
    <Layout>
      <div className="animate-fade-in">
        {activeTab === "dashboard" ? (
          <div className="mb-6">
            <div className="flex flex-wrap items-center justify-between mb-6">
              <h1 className="text-2xl font-bold">Welcome back, {user?.username || 'Learner'}!</h1>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
                <TabsList>
                  <TabsTrigger value="dashboard" className="flex items-center gap-1">
                    <Activity className="h-4 w-4" />
                    <span>Dashboard</span>
                  </TabsTrigger>
                  <TabsTrigger value="videos" className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>Videos</span>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
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
                        {activity.type === "points" && <Star className="h-4 w-4 text-yellow-400" />}
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
                <Button variant="outline" onClick={() => setActiveTab("videos")}>View All Videos</Button>
              </div>
            </div>
          </div>
        ) : (
          <section className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold">Recommended</h1>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
                <TabsList>
                  <TabsTrigger value="dashboard" className="flex items-center gap-1">
                    <Activity className="h-4 w-4" />
                    <span>Dashboard</span>
                  </TabsTrigger>
                  <TabsTrigger value="videos" className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>Videos</span>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <VideoGrid onVideoSelect={handleVideoSelect} />
          </section>
        )}

        {selectedVideo && (
          <Dialog open={!!selectedVideo} onOpenChange={handleCloseVideo}>
            <VideoPlayer videoId={selectedVideo} onClose={handleCloseVideo} />
          </Dialog>
        )}
      </div>
    </Layout>
  );
};

export default Index;
