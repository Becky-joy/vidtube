
import React, { useState } from "react";
import Layout from "@/components/Layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Upload, Edit, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data for tutorials/videos
const mockVideos = [
  { id: 1, title: "Introduction to React", category: "Frontend", duration: "10:30", views: 1245, author: "admin", createdAt: "2025-03-15" },
  { id: 2, title: "Advanced JavaScript Concepts", category: "JavaScript", duration: "18:45", views: 982, author: "admin", createdAt: "2025-03-20" },
  { id: 3, title: "CSS Grid Layout", category: "CSS", duration: "12:15", views: 756, author: "admin", createdAt: "2025-03-22" },
  { id: 4, title: "TypeScript Basics", category: "TypeScript", duration: "15:20", views: 543, author: "admin", createdAt: "2025-03-25" },
  { id: 5, title: "Node.js for Beginners", category: "Backend", duration: "20:10", views: 621, author: "admin", createdAt: "2025-04-01" },
  { id: 6, title: "State Management with Redux", category: "Frontend", duration: "16:40", views: 428, author: "admin", createdAt: "2025-04-05" },
];

// Mock categories
const categories = ["Frontend", "Backend", "JavaScript", "TypeScript", "CSS", "React", "Node.js"];

const VideosManagement = () => {
  const [videos, setVideos] = useState(mockVideos);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentTab, setCurrentTab] = useState("all");
  const { toast } = useToast();

  // New video form state
  const [newVideo, setNewVideo] = useState({
    title: "",
    category: "",
    videoFile: null,
    thumbnail: null,
    description: ""
  });

  // Edit video state
  const [editingVideo, setEditingVideo] = useState<null | number>(null);
  const [editForm, setEditForm] = useState({
    title: "",
    category: "",
    description: ""
  });

  // Filter videos based on search and category
  const filteredVideos = videos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || video.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Handle video upload (mock)
  const handleVideoUpload = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, you would upload the file to storage here
    const newId = videos.length > 0 ? Math.max(...videos.map(v => v.id)) + 1 : 1;
    
    const newVideoEntry = {
      id: newId,
      title: newVideo.title,
      category: newVideo.category,
      duration: "00:00", // Would be extracted from actual video
      views: 0,
      author: "admin",
      createdAt: new Date().toISOString().split('T')[0]
    };
    
    setVideos([...videos, newVideoEntry]);
    setNewVideo({
      title: "",
      category: "",
      videoFile: null,
      thumbnail: null,
      description: ""
    });
    
    toast({
      title: "Video uploaded successfully",
      description: `"${newVideo.title}" has been added to your library.`,
    });
    
    setCurrentTab("all");
  };

  // Handle delete video
  const handleDeleteVideo = (id: number) => {
    setVideos(videos.filter(video => video.id !== id));
    toast({
      title: "Video deleted",
      description: "The video has been removed from your library.",
    });
  };

  // Start editing a video
  const handleEditStart = (video: any) => {
    setEditingVideo(video.id);
    setEditForm({
      title: video.title,
      category: video.category,
      description: ""
    });
  };

  // Save edited video
  const handleSaveEdit = () => {
    setVideos(videos.map(video => 
      video.id === editingVideo 
        ? { ...video, title: editForm.title, category: editForm.category } 
        : video
    ));
    
    setEditingVideo(null);
    toast({
      title: "Video updated",
      description: "The video details have been updated.",
    });
  };

  return (
    <Layout>
      <div className="container mx-auto p-4 space-y-6">
        <h1 className="text-2xl font-bold">Video Management</h1>

        <Tabs value={currentTab} onValueChange={setCurrentTab}>
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="all">All Videos</TabsTrigger>
              <TabsTrigger value="upload">Upload New Video</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="all" className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search videos..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <select 
                className="border border-input bg-background h-10 rounded-md px-3"
                onChange={(e) => setSelectedCategory(e.target.value || null)}
                defaultValue=""
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Views</TableHead>
                      <TableHead>Date Added</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredVideos.map((video) => (
                      <TableRow key={video.id}>
                        <TableCell className="font-medium">
                          {editingVideo === video.id ? (
                            <Input
                              value={editForm.title}
                              onChange={(e) => setEditForm({...editForm, title: e.target.value})}
                            />
                          ) : (
                            video.title
                          )}
                        </TableCell>
                        <TableCell>
                          {editingVideo === video.id ? (
                            <select
                              value={editForm.category}
                              onChange={(e) => setEditForm({...editForm, category: e.target.value})}
                              className="border border-input bg-background h-9 rounded-md px-3 w-full"
                            >
                              {categories.map((category) => (
                                <option key={category} value={category}>{category}</option>
                              ))}
                            </select>
                          ) : (
                            video.category
                          )}
                        </TableCell>
                        <TableCell>{video.duration}</TableCell>
                        <TableCell>{video.views}</TableCell>
                        <TableCell>{video.createdAt}</TableCell>
                        <TableCell>
                          {editingVideo === video.id ? (
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm" onClick={() => setEditingVideo(null)}>
                                Cancel
                              </Button>
                              <Button size="sm" onClick={handleSaveEdit}>
                                Save
                              </Button>
                            </div>
                          ) : (
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm" onClick={() => handleEditStart(video)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" onClick={() => handleDeleteVideo(video.id)}>
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </div>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="upload">
            <Card>
              <CardHeader>
                <CardTitle>Upload New Video</CardTitle>
                <CardDescription>
                  Add a new tutorial or educational video to your platform.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleVideoUpload} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="title" className="text-sm font-medium">Video Title</label>
                    <Input
                      id="title"
                      placeholder="Enter video title"
                      value={newVideo.title}
                      onChange={(e) => setNewVideo({...newVideo, title: e.target.value})}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="category" className="text-sm font-medium">Category</label>
                    <select
                      id="category"
                      className="border border-input bg-background h-10 rounded-md px-3 w-full"
                      value={newVideo.category}
                      onChange={(e) => setNewVideo({...newVideo, category: e.target.value})}
                      required
                    >
                      <option value="" disabled>Select category</option>
                      {categories.map((category) => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="description" className="text-sm font-medium">Description</label>
                    <textarea 
                      id="description"
                      className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2"
                      placeholder="Enter video description"
                      value={newVideo.description}
                      onChange={(e) => setNewVideo({...newVideo, description: e.target.value})}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="video" className="text-sm font-medium">Video File</label>
                    <div className="border border-dashed border-input rounded-md p-6 flex flex-col items-center justify-center">
                      <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground mb-2">Drag & drop your video file here</p>
                      <p className="text-xs text-muted-foreground mb-4">MP4, MOV, or WebM formats accepted. Max 500MB.</p>
                      <Button type="button" variant="outline">
                        Select Video
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="thumbnail" className="text-sm font-medium">Thumbnail (Optional)</label>
                    <div className="border border-dashed border-input rounded-md p-6 flex flex-col items-center justify-center">
                      <p className="text-sm text-muted-foreground mb-2">Upload a thumbnail image</p>
                      <p className="text-xs text-muted-foreground mb-4">PNG or JPG. 16:9 ratio recommended.</p>
                      <Button type="button" variant="outline">
                        Select Image
                      </Button>
                    </div>
                  </div>
                  
                  <CardFooter className="px-0 pb-0 pt-6">
                    <Button type="submit" className="w-full">
                      Upload Video
                    </Button>
                  </CardFooter>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default VideosManagement;
