
import React, { useState, useRef } from 'react';
import Layout from '@/components/Layout';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getRandomAvatar } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { Clock, Settings, Video, Heart, User, Upload, Image } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const Profile = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [profileData, setProfileData] = useState({
    username: user?.username || 'codelearner42',
    fullName: user?.username || 'Alex Johnson',
    email: user?.email || 'alex.johnson@example.com',
    bio: 'Passionate developer learning new coding technologies. I love to create web applications and share my knowledge with others.',
    location: 'San Francisco, CA',
    website: 'https://alexjohnson.dev'
  });
  
  const [tempData, setTempData] = useState({ ...profileData });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTempData({ ...tempData, [name]: value });
  };

  const handleSave = () => {
    setProfileData(tempData);
    setEditMode(false);
    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully!",
    });
  };

  const handleCancel = () => {
    setTempData({ ...profileData });
    setEditMode(false);
  };

  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setProfilePicture(reader.result as string);
        toast({
          title: "Profile picture updated",
          description: "Your profile picture has been updated successfully!",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // Mock data for the statistics and video lists
  const stats = {
    subscribers: 523,
    videos: 12,
    likes: 1489,
    views: 24365
  };

  const userVideos = Array(6).fill(null).map((_, i) => ({
    id: `video-${i}`,
    title: `How to master ${i % 2 === 0 ? 'JavaScript' : 'React'} in 30 days - Part ${i + 1}`,
    views: `${(i + 1) * 3}k views`,
    uploadTime: `${i + 1} weeks ago`,
    thumbnail: `https://images.unsplash.com/photo-${1550000000 + i * 100000}?auto=format&fit=crop&q=80&w=600&h=350`
  }));

  return (
    <Layout>
      <div className="animate-fade-in max-w-4xl mx-auto">
        <div className="bg-vidtube-darkgray rounded-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="relative group">
              <Avatar className="h-24 w-24 border-2 border-vidtube-blue cursor-pointer">
                {profilePicture ? (
                  <img src={profilePicture} alt={profileData.username} className="h-full w-full object-cover" />
                ) : (
                  <img src={getRandomAvatar(profileData.username)} alt={profileData.username} />
                )}
              </Avatar>
              
              <div 
                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 cursor-pointer rounded-full transition-opacity"
                onClick={triggerFileInput}
              >
                <Upload className="h-8 w-8 text-white" />
              </div>
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*" 
                onChange={handleProfilePictureChange} 
              />
            </div>
            
            <div className="flex-1">
              {editMode ? (
                <div className="space-y-3">
                  <Input 
                    name="fullName" 
                    value={tempData.fullName} 
                    onChange={handleInputChange} 
                    placeholder="Full Name"
                  />
                  <Input 
                    name="username" 
                    value={tempData.username} 
                    onChange={handleInputChange} 
                    placeholder="Username"
                  />
                  <Input 
                    name="email" 
                    value={tempData.email} 
                    onChange={handleInputChange} 
                    type="email" 
                    placeholder="Email"
                  />
                  <Input 
                    name="bio" 
                    value={tempData.bio} 
                    onChange={handleInputChange} 
                    placeholder="Bio"
                  />
                  <Input 
                    name="location" 
                    value={tempData.location} 
                    onChange={handleInputChange} 
                    placeholder="Location"
                  />
                  <Input 
                    name="website" 
                    value={tempData.website} 
                    onChange={handleInputChange} 
                    placeholder="Website"
                  />
                  <div className="flex gap-2">
                    <Button onClick={handleSave}>Save</Button>
                    <Button variant="outline" onClick={handleCancel}>Cancel</Button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex justify-between">
                    <div>
                      <h1 className="text-2xl font-bold">{profileData.fullName}</h1>
                      <p className="text-vidtube-lightgray">@{profileData.username}</p>
                    </div>
                    <Button 
                      onClick={() => setEditMode(true)} 
                      variant="outline" 
                      size="sm"
                      className="flex items-center gap-1"
                    >
                      <Settings className="h-4 w-4" />
                      Edit Profile
                    </Button>
                  </div>
                  
                  <p className="mt-2">{profileData.bio}</p>
                  
                  <div className="mt-3 text-sm text-vidtube-lightgray">
                    <div className="flex flex-wrap gap-x-4 gap-y-1">
                      <span>{profileData.location}</span>
                      {profileData.website && (
                        <a 
                          href={profileData.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-vidtube-blue hover:underline"
                        >
                          {profileData.website.replace(/(^\w+:|^)\/\//, '')}
                        </a>
                      )}
                      <span>{profileData.email}</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="flex flex-wrap justify-around mt-6 gap-4 border-t border-vidtube-gray pt-4">
            <div className="text-center">
              <p className="text-xl font-bold">{stats.subscribers}</p>
              <p className="text-sm text-vidtube-lightgray">Subscribers</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold">{stats.videos}</p>
              <p className="text-sm text-vidtube-lightgray">Videos</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold">{stats.likes}</p>
              <p className="text-sm text-vidtube-lightgray">Likes</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold">{stats.views}</p>
              <p className="text-sm text-vidtube-lightgray">Views</p>
            </div>
          </div>
        </div>

        <Tabs defaultValue="videos" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="videos" className="flex items-center gap-1">
              <Video className="h-4 w-4" />
              Videos
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              Watch History
            </TabsTrigger>
            <TabsTrigger value="liked" className="flex items-center gap-1">
              <Heart className="h-4 w-4" />
              Liked Videos
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="videos">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {userVideos.map((video) => (
                <div key={video.id} className="bg-vidtube-darkgray rounded-lg overflow-hidden hover:bg-vidtube-hover transition-colors">
                  <div className="aspect-video bg-vidtube-gray">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=600&h=350';
                      }}
                    />
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium line-clamp-2">{video.title}</h3>
                    <div className="text-sm text-vidtube-lightgray mt-1 flex justify-between">
                      <span>{video.views}</span>
                      <span>{video.uploadTime}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="history">
            <div className="bg-vidtube-darkgray rounded-lg p-4 text-center">
              <p>Your watch history will appear here.</p>
            </div>
          </TabsContent>
          
          <TabsContent value="liked">
            <div className="bg-vidtube-darkgray rounded-lg p-4 text-center">
              <p>Your liked videos will appear here.</p>
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Profile Picture Upload Dialog */}
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="fixed bottom-4 right-4 flex items-center gap-2">
              <Image className="h-4 w-4" />
              Change Profile Picture
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Upload Profile Picture</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex justify-center">
                <Avatar className="h-32 w-32 border-2 border-vidtube-blue">
                  {profilePicture ? (
                    <img src={profilePicture} alt={profileData.username} className="h-full w-full object-cover" />
                  ) : (
                    <img src={getRandomAvatar(profileData.username)} alt={profileData.username} />
                  )}
                </Avatar>
              </div>
              <div className="flex justify-center">
                <Button 
                  variant="outline" 
                  onClick={triggerFileInput} 
                  className="flex items-center gap-2"
                >
                  <Upload className="h-4 w-4" />
                  Upload Image
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default Profile;
