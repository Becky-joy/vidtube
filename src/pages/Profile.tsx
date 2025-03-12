
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getRandomAvatar } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { Clock, Settings, Video, Heart } from 'lucide-react';

const Profile = () => {
  const { toast } = useToast();
  const [editMode, setEditMode] = useState(false);
  const [profileData, setProfileData] = useState({
    username: 'codelearner42',
    fullName: 'Alex Johnson',
    email: 'alex.johnson@example.com',
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
            <Avatar className="h-24 w-24 border-2 border-vidtube-blue">
              <img src={getRandomAvatar(profileData.username)} alt={profileData.username} />
            </Avatar>
            
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
      </div>
    </Layout>
  );
};

export default Profile;
