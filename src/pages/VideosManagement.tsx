
import React, { useState, useRef } from "react";
import Layout from "@/components/Layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Upload, Edit, Trash2, Plus, X, FileVideo, Image } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from "@/components/ui/dialog";

// Mock data for tutorials/videos
const mockVideos = [
  { id: 1, title: "Introduction to React", category: "Frontend", duration: "10:30", views: 1245, author: "admin", createdAt: "2025-03-15", published: true, thumbnail: "/placeholder.svg" },
  { id: 2, title: "Advanced JavaScript Concepts", category: "JavaScript", duration: "18:45", views: 982, author: "admin", createdAt: "2025-03-20", published: true, thumbnail: "/placeholder.svg" },
  { id: 3, title: "CSS Grid Layout", category: "CSS", duration: "12:15", views: 756, author: "admin", createdAt: "2025-03-22", published: true, thumbnail: "/placeholder.svg" },
  { id: 4, title: "TypeScript Basics", category: "TypeScript", duration: "15:20", views: 543, author: "admin", createdAt: "2025-03-25", published: false, thumbnail: "/placeholder.svg" },
  { id: 5, title: "Node.js for Beginners", category: "Backend", duration: "20:10", views: 621, author: "admin", createdAt: "2025-04-01", published: true, thumbnail: "/placeholder.svg" },
  { id: 6, title: "State Management with Redux", category: "Frontend", duration: "16:40", views: 428, author: "admin", createdAt: "2025-04-05", published: false, thumbnail: "/placeholder.svg" },
];

// Mock categories
const categories = ["Frontend", "Backend", "JavaScript", "TypeScript", "CSS", "React", "Node.js"];

// Mock tags
const availableTags = ["Beginner", "Intermediate", "Advanced", "Tutorial", "Demo", "Series", "Guide", "Tips", "Performance", "Best Practices"];

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
    description: "",
    isPublished: true,
    selectedTags: [] as string[],
  });
  
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  
  // References for file inputs
  const videoInputRef = useRef<HTMLInputElement>(null);
  const thumbnailInputRef = useRef<HTMLInputElement>(null);

  // Edit video state
  const [editingVideo, setEditingVideo] = useState<null | number>(null);
  const [editForm, setEditForm] = useState({
    title: "",
    category: "",
    description: "",
    isPublished: true,
    selectedTags: [] as string[]
  });
  
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [videoToDelete, setVideoToDelete] = useState<number | null>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<any>(null);

  // Filter videos based on search and category
  const filteredVideos = videos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || video.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Handle video file selection
  const handleVideoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setVideoFile(files[0]);
    }
  };
  
  // Handle thumbnail file selection
  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setThumbnailFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle video upload (mock)
  const handleVideoUpload = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!videoFile) {
      toast({
        title: "Video file required",
        description: "Please select a video file to upload.",
        variant: "destructive",
      });
      return;
    }
    
    // Start upload simulation
    setIsUploading(true);
    let progress = 0;
    
    const interval = setInterval(() => {
      progress += Math.random() * 10;
      setUploadProgress(Math.min(progress, 100));
      
      if (progress >= 100) {
        clearInterval(interval);
        
        // Once "upload" is complete, add the new video
        const newId = videos.length > 0 ? Math.max(...videos.map(v => v.id)) + 1 : 1;
        
        const newVideoEntry = {
          id: newId,
          title: newVideo.title,
          category: newVideo.category,
          duration: calculateVideoDuration(videoFile),
          views: 0,
          author: "admin",
          createdAt: new Date().toISOString().split('T')[0],
          published: newVideo.isPublished,
          thumbnail: thumbnailPreview || "/placeholder.svg"
        };
        
        setVideos([...videos, newVideoEntry]);
        resetUploadForm();
        
        toast({
          title: "Video uploaded successfully",
          description: `"${newVideo.title}" has been added to your library.`,
        });
        
        setCurrentTab("all");
        setIsUploading(false);
      }
    }, 300);
  };

  // Reset upload form
  const resetUploadForm = () => {
    setNewVideo({
      title: "",
      category: "",
      description: "",
      isPublished: true,
      selectedTags: []
    });
    setVideoFile(null);
    setThumbnailFile(null);
    setThumbnailPreview(null);
    setUploadProgress(0);
    
    if (videoInputRef.current) videoInputRef.current.value = '';
    if (thumbnailInputRef.current) thumbnailInputRef.current.value = '';
  };

  // Calculate video duration (mock)
  const calculateVideoDuration = (file: File) => {
    // In a real app, you would analyze the video file
    // Here we'll just fake a duration based on file size
    const sizeInMB = file.size / (1024 * 1024);
    const minutes = Math.max(1, Math.floor(sizeInMB * 0.5));
    const seconds = Math.floor(Math.random() * 60);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  // Handle delete video confirmation
  const confirmDeleteVideo = () => {
    if (videoToDelete !== null) {
      setVideos(videos.filter(video => video.id !== videoToDelete));
      setShowDeleteDialog(false);
      setVideoToDelete(null);
      
      toast({
        title: "Video deleted",
        description: "The video has been permanently removed.",
      });
    }
  };

  // Start editing a video
  const handleEditStart = (video: any) => {
    setEditingVideo(video.id);
    setEditForm({
      title: video.title,
      category: video.category,
      description: video.description || "",
      isPublished: video.published,
      selectedTags: video.tags || []
    });
  };

  // Save edited video
  const handleSaveEdit = () => {
    setVideos(videos.map(video => 
      video.id === editingVideo 
        ? { 
            ...video, 
            title: editForm.title, 
            category: editForm.category,
            published: editForm.isPublished,
            tags: editForm.selectedTags
          } 
        : video
    ));
    
    setEditingVideo(null);
    toast({
      title: "Video updated",
      description: "The video details have been updated.",
    });
  };

  // Toggle tag selection
  const toggleTag = (tag: string) => {
    if (newVideo.selectedTags.includes(tag)) {
      setNewVideo({
        ...newVideo,
        selectedTags: newVideo.selectedTags.filter(t => t !== tag)
      });
    } else {
      setNewVideo({
        ...newVideo,
        selectedTags: [...newVideo.selectedTags, tag]
      });
    }
  };

  // Toggle edit tag selection
  const toggleEditTag = (tag: string) => {
    if (editForm.selectedTags.includes(tag)) {
      setEditForm({
        ...editForm,
        selectedTags: editForm.selectedTags.filter(t => t !== tag)
      });
    } else {
      setEditForm({
        ...editForm,
        selectedTags: [...editForm.selectedTags, tag]
      });
    }
  };

  // View video details
  const handleViewDetails = (video: any) => {
    setSelectedVideo(video);
    setShowDetailsDialog(true);
  };

  // Toggle video publish status
  const togglePublishStatus = (id: number, currentStatus: boolean) => {
    setVideos(videos.map(video => 
      video.id === id 
        ? { ...video, published: !currentStatus } 
        : video
    ));
    
    toast({
      title: currentStatus ? "Video unpublished" : "Video published",
      description: currentStatus 
        ? "The video is now hidden from users." 
        : "The video is now visible to users.",
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
              
              <Button onClick={() => setCurrentTab("upload")}>
                <Plus className="h-4 w-4 mr-2" /> New Video
              </Button>
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
                      <TableHead>Status</TableHead>
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
                            <div className="flex items-center">
                              <Button 
                                variant="ghost" 
                                className="p-0 h-auto mr-2"
                                onClick={() => handleViewDetails(video)}
                              >
                                {video.title}
                              </Button>
                            </div>
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
                            <Badge variant="outline">{video.category}</Badge>
                          )}
                        </TableCell>
                        <TableCell>{video.duration}</TableCell>
                        <TableCell>{video.views}</TableCell>
                        <TableCell>
                          {editingVideo === video.id ? (
                            <div className="flex items-center space-x-2">
                              <Switch 
                                checked={editForm.isPublished}
                                onCheckedChange={(checked) => setEditForm({...editForm, isPublished: checked})} 
                              />
                              <span>{editForm.isPublished ? "Published" : "Draft"}</span>
                            </div>
                          ) : (
                            <Badge variant={video.published ? "default" : "secondary"}>
                              {video.published ? "Published" : "Draft"}
                            </Badge>
                          )}
                        </TableCell>
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
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => togglePublishStatus(video.id, video.published)}
                              >
                                {video.published ? "Unpublish" : "Publish"}
                              </Button>
                              <Button variant="ghost" size="sm" onClick={() => handleEditStart(video)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => {
                                  setVideoToDelete(video.id);
                                  setShowDeleteDialog(true);
                                }}
                              >
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
                    <label className="text-sm font-medium">Tags</label>
                    <div className="flex flex-wrap gap-2">
                      {availableTags.map(tag => (
                        <Badge 
                          key={tag}
                          variant={newVideo.selectedTags.includes(tag) ? "default" : "outline"}
                          className="cursor-pointer"
                          onClick={() => toggleTag(tag)}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Click on tags to select or deselect them
                    </p>
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
                    <div className={`border border-dashed ${videoFile ? 'border-green-500' : 'border-input'} rounded-md p-6 flex flex-col items-center justify-center`}>
                      {videoFile ? (
                        <div className="text-center">
                          <FileVideo className="h-8 w-8 text-green-500 mb-2 mx-auto" />
                          <p className="text-sm font-medium">{videoFile.name}</p>
                          <p className="text-xs text-muted-foreground mb-2">
                            {(videoFile.size / (1024 * 1024)).toFixed(2)} MB
                          </p>
                          <Button 
                            type="button" 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              setVideoFile(null);
                              if (videoInputRef.current) videoInputRef.current.value = '';
                            }}
                          >
                            <X className="h-4 w-4 mr-1" /> Remove
                          </Button>
                        </div>
                      ) : (
                        <>
                          <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                          <p className="text-sm text-muted-foreground mb-2">Drag & drop your video file here</p>
                          <p className="text-xs text-muted-foreground mb-4">MP4, MOV, or WebM formats accepted. Max 500MB.</p>
                          <Button 
                            type="button" 
                            variant="outline"
                            onClick={() => videoInputRef.current?.click()}
                          >
                            Select Video
                          </Button>
                          <input 
                            ref={videoInputRef}
                            type="file" 
                            accept="video/*" 
                            className="hidden"
                            onChange={handleVideoFileChange}
                          />
                        </>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="thumbnail" className="text-sm font-medium">Thumbnail (Optional)</label>
                    <div className={`border border-dashed ${thumbnailPreview ? 'border-green-500' : 'border-input'} rounded-md p-6 flex flex-col items-center justify-center`}>
                      {thumbnailPreview ? (
                        <div className="text-center">
                          <img 
                            src={thumbnailPreview} 
                            alt="Thumbnail preview" 
                            className="h-32 object-contain mb-2"
                          />
                          <p className="text-sm font-medium">{thumbnailFile?.name}</p>
                          <Button 
                            type="button" 
                            variant="outline" 
                            size="sm"
                            className="mt-2"
                            onClick={() => {
                              setThumbnailFile(null);
                              setThumbnailPreview(null);
                              if (thumbnailInputRef.current) thumbnailInputRef.current.value = '';
                            }}
                          >
                            <X className="h-4 w-4 mr-1" /> Remove
                          </Button>
                        </div>
                      ) : (
                        <>
                          <Image className="h-8 w-8 text-muted-foreground mb-2" />
                          <p className="text-sm text-muted-foreground mb-2">Upload a thumbnail image</p>
                          <p className="text-xs text-muted-foreground mb-4">PNG or JPG. 16:9 ratio recommended.</p>
                          <Button 
                            type="button" 
                            variant="outline"
                            onClick={() => thumbnailInputRef.current?.click()}
                          >
                            Select Image
                          </Button>
                          <input 
                            ref={thumbnailInputRef}
                            type="file" 
                            accept="image/*" 
                            className="hidden"
                            onChange={handleThumbnailChange}
                          />
                        </>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="publish-video"
                      checked={newVideo.isPublished}
                      onCheckedChange={(checked) => 
                        setNewVideo({...newVideo, isPublished: checked})
                      }
                    />
                    <label htmlFor="publish-video" className="text-sm font-medium">
                      Publish immediately
                    </label>
                  </div>
                  
                  {isUploading && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Uploading...</span>
                        <span>{Math.round(uploadProgress)}%</span>
                      </div>
                      <Progress value={uploadProgress} />
                    </div>
                  )}
                  
                  <CardFooter className="px-0 pb-0 pt-6">
                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={isUploading || !videoFile || !newVideo.title || !newVideo.category}
                    >
                      {isUploading ? "Uploading..." : "Upload Video"}
                    </Button>
                  </CardFooter>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        {/* Delete confirmation dialog */}
        <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Deletion</DialogTitle>
            </DialogHeader>
            <p>Are you sure you want to delete this video? This action cannot be undone.</p>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>Cancel</Button>
              <Button variant="destructive" onClick={confirmDeleteVideo}>Delete</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        {/* Video details dialog */}
        <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Video Details</DialogTitle>
            </DialogHeader>
            
            {selectedVideo && (
              <div className="space-y-4">
                <div className="aspect-video bg-vidtube-gray/30 rounded-md overflow-hidden">
                  <img 
                    src={selectedVideo.thumbnail} 
                    alt={selectedVideo.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div>
                  <h2 className="text-xl font-bold">{selectedVideo.title}</h2>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Badge>{selectedVideo.category}</Badge>
                    <Badge variant="outline">{selectedVideo.duration}</Badge>
                    <Badge variant="secondary">{selectedVideo.views} views</Badge>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
                    <p>{selectedVideo.published ? "Published" : "Draft"}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Author</h3>
                    <p>{selectedVideo.author}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Date Added</h3>
                    <p>{selectedVideo.createdAt}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Video ID</h3>
                    <p>{selectedVideo.id}</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Description</h3>
                  <p className="mt-1">{selectedVideo.description || "No description provided."}</p>
                </div>
              </div>
            )}
            
            <DialogFooter className="gap-2">
              <Button 
                variant="outline" 
                onClick={() => {
                  if (selectedVideo) {
                    handleEditStart(selectedVideo);
                    setShowDetailsDialog(false);
                  }
                }}
              >
                <Edit className="h-4 w-4 mr-2" /> Edit
              </Button>
              <Button 
                variant="destructive"
                onClick={() => {
                  if (selectedVideo) {
                    setVideoToDelete(selectedVideo.id);
                    setShowDetailsDialog(false);
                    setShowDeleteDialog(true);
                  }
                }}
              >
                <Trash2 className="h-4 w-4 mr-2" /> Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default VideosManagement;
