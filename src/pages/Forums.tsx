
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Search, MessageSquare, TrendingUp, Clock, User, Filter, BookmarkPlus } from 'lucide-react';

// Mock data for forums
const categories = [
  { id: 1, name: 'General Discussion', count: 245, color: 'bg-blue-500' },
  { id: 2, name: 'Learning Resources', count: 156, color: 'bg-green-500' },
  { id: 3, name: 'Technical Support', count: 89, color: 'bg-amber-500' },
  { id: 4, name: 'Career Advice', count: 112, color: 'bg-purple-500' },
  { id: 5, name: 'Project Showcase', count: 78, color: 'bg-pink-500' },
];

const topics = [
  { 
    id: 1, 
    title: 'Best resources to learn React in 2025?', 
    author: 'Sarah Johnson', 
    authorAvatar: 'https://i.pravatar.cc/150?u=sarah',
    replies: 42, 
    views: 1205, 
    category: 'Learning Resources',
    categoryColor: 'bg-green-500',
    lastActivity: '2 hours ago',
    isPinned: true,
    isHot: true 
  },
  { 
    id: 2, 
    title: 'Struggling with TypeScript generics - need help!', 
    author: 'Mike Chen', 
    authorAvatar: 'https://i.pravatar.cc/150?u=mike',
    replies: 18, 
    views: 342, 
    category: 'Technical Support',
    categoryColor: 'bg-amber-500',
    lastActivity: '4 hours ago',
    isPinned: false,
    isHot: false 
  },
  { 
    id: 3, 
    title: 'What certifications are worth getting in 2025?', 
    author: 'Emma Williams', 
    authorAvatar: 'https://i.pravatar.cc/150?u=emma',
    replies: 35, 
    views: 890, 
    category: 'Career Advice',
    categoryColor: 'bg-purple-500',
    lastActivity: '1 day ago',
    isPinned: false,
    isHot: true 
  },
  { 
    id: 4, 
    title: 'Introduction thread: Share your current projects!', 
    author: 'Moderator', 
    authorAvatar: 'https://i.pravatar.cc/150?u=mod',
    replies: 87, 
    views: 1450, 
    category: 'General Discussion',
    categoryColor: 'bg-blue-500',
    lastActivity: '3 hours ago',
    isPinned: true,
    isHot: false 
  },
  { 
    id: 5, 
    title: 'My AI-powered learning assistant project', 
    author: 'Alex Rodriguez', 
    authorAvatar: 'https://i.pravatar.cc/150?u=alex',
    replies: 24, 
    views: 732, 
    category: 'Project Showcase',
    categoryColor: 'bg-pink-500',
    lastActivity: '5 hours ago',
    isPinned: false,
    isHot: false 
  },
];

const Forums = () => {
  const [activeTab, setActiveTab] = useState('topics');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Layout>
      <div className="container mx-auto py-8 animate-fade-in">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Community Forums</h1>
            <p className="text-vidtube-lightgray mt-2">Connect, learn, and share with fellow learners</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button>
              <MessageSquare className="mr-2 h-4 w-4" />
              New Topic
            </Button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-3/4">
            <Card className="mb-6">
              <CardContent className="p-4">
                <div className="flex items-center">
                  <div className="relative flex-grow">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-vidtube-lightgray" />
                    <Input
                      placeholder="Search forums..."
                      className="pl-9"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Button variant="ghost" size="icon" className="ml-2">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="topics" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-6">
                <TabsTrigger value="topics">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Topics
                </TabsTrigger>
                <TabsTrigger value="trending">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Trending
                </TabsTrigger>
                <TabsTrigger value="latest">
                  <Clock className="mr-2 h-4 w-4" />
                  Latest
                </TabsTrigger>
              </TabsList>

              <TabsContent value="topics" className="space-y-4">
                {topics.map((topic) => (
                  <Card key={topic.id} className={`hover:bg-accent/50 transition-colors ${topic.isPinned ? 'border-l-4 border-l-blue-500' : ''}`}>
                    <CardContent className="p-4">
                      <div className="flex items-start">
                        <Avatar className="h-10 w-10 mr-4">
                          <img src={topic.authorAvatar} alt={topic.author} className="object-cover" />
                        </Avatar>
                        <div className="flex-grow">
                          <div className="flex items-center mb-1">
                            <h3 className="font-medium hover:text-vidtube-blue">
                              {topic.title}
                            </h3>
                            {topic.isPinned && (
                              <Badge variant="secondary" className="ml-2 text-xs">Pinned</Badge>
                            )}
                            {topic.isHot && (
                              <Badge variant="destructive" className="ml-2 text-xs">Hot</Badge>
                            )}
                          </div>
                          <div className="flex items-center text-sm text-vidtube-lightgray">
                            <span>by {topic.author}</span>
                            <Separator orientation="vertical" className="mx-2 h-3" />
                            <Badge variant="outline" className={`${topic.categoryColor} bg-opacity-20 text-xs`}>
                              {topic.category}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-right text-sm">
                          <div>{topic.replies} replies</div>
                          <div className="text-vidtube-lightgray">{topic.views} views</div>
                          <div className="text-xs text-vidtube-lightgray mt-1">{topic.lastActivity}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="trending" className="space-y-4">
                {topics.filter(topic => topic.isHot).map((topic) => (
                  <Card key={topic.id} className={`hover:bg-accent/50 transition-colors ${topic.isPinned ? 'border-l-4 border-l-blue-500' : ''}`}>
                    <CardContent className="p-4">
                      <div className="flex items-start">
                        <Avatar className="h-10 w-10 mr-4">
                          <img src={topic.authorAvatar} alt={topic.author} className="object-cover" />
                        </Avatar>
                        <div className="flex-grow">
                          <div className="flex items-center mb-1">
                            <h3 className="font-medium hover:text-vidtube-blue">
                              {topic.title}
                            </h3>
                            {topic.isPinned && (
                              <Badge variant="secondary" className="ml-2 text-xs">Pinned</Badge>
                            )}
                            {topic.isHot && (
                              <Badge variant="destructive" className="ml-2 text-xs">Hot</Badge>
                            )}
                          </div>
                          <div className="flex items-center text-sm text-vidtube-lightgray">
                            <span>by {topic.author}</span>
                            <Separator orientation="vertical" className="mx-2 h-3" />
                            <Badge variant="outline" className={`${topic.categoryColor} bg-opacity-20 text-xs`}>
                              {topic.category}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-right text-sm">
                          <div>{topic.replies} replies</div>
                          <div className="text-vidtube-lightgray">{topic.views} views</div>
                          <div className="text-xs text-vidtube-lightgray mt-1">{topic.lastActivity}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="latest" className="space-y-4">
                {/* Sort topics by last activity */}
                {[...topics].sort((a, b) => {
                  if (a.lastActivity < b.lastActivity) return -1;
                  if (a.lastActivity > b.lastActivity) return 1;
                  return 0;
                }).map((topic) => (
                  <Card key={topic.id} className={`hover:bg-accent/50 transition-colors ${topic.isPinned ? 'border-l-4 border-l-blue-500' : ''}`}>
                    <CardContent className="p-4">
                      <div className="flex items-start">
                        <Avatar className="h-10 w-10 mr-4">
                          <img src={topic.authorAvatar} alt={topic.author} className="object-cover" />
                        </Avatar>
                        <div className="flex-grow">
                          <div className="flex items-center mb-1">
                            <h3 className="font-medium hover:text-vidtube-blue">
                              {topic.title}
                            </h3>
                            {topic.isPinned && (
                              <Badge variant="secondary" className="ml-2 text-xs">Pinned</Badge>
                            )}
                            {topic.isHot && (
                              <Badge variant="destructive" className="ml-2 text-xs">Hot</Badge>
                            )}
                          </div>
                          <div className="flex items-center text-sm text-vidtube-lightgray">
                            <span>by {topic.author}</span>
                            <Separator orientation="vertical" className="mx-2 h-3" />
                            <Badge variant="outline" className={`${topic.categoryColor} bg-opacity-20 text-xs`}>
                              {topic.category}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-right text-sm">
                          <div>{topic.replies} replies</div>
                          <div className="text-vidtube-lightgray">{topic.views} views</div>
                          <div className="text-xs text-vidtube-lightgray mt-1">{topic.lastActivity}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </div>

          <div className="w-full md:w-1/4 space-y-6">
            <Card>
              <CardContent className="p-4">
                <h3 className="font-medium mb-4">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category.id} className="flex items-center justify-between group cursor-pointer">
                      <div className="flex items-center">
                        <div className={`w-2 h-2 rounded-full ${category.color} mr-2`}></div>
                        <span className="group-hover:text-vidtube-blue">{category.name}</span>
                      </div>
                      <Badge variant="outline" className="text-xs">{category.count}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h3 className="font-medium mb-2">Top Contributors</h3>
                <div className="space-y-3 mt-4">
                  <div className="flex items-center">
                    <Avatar className="h-8 w-8 mr-2">
                      <img src="https://i.pravatar.cc/150?u=user1" alt="User" />
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Sarah Johnson</p>
                      <p className="text-xs text-vidtube-lightgray">245 posts</p>
                    </div>
                    <Badge className="ml-2">MVP</Badge>
                  </div>
                  <div className="flex items-center">
                    <Avatar className="h-8 w-8 mr-2">
                      <img src="https://i.pravatar.cc/150?u=user2" alt="User" />
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Mike Chen</p>
                      <p className="text-xs text-vidtube-lightgray">189 posts</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Avatar className="h-8 w-8 mr-2">
                      <img src="https://i.pravatar.cc/150?u=user3" alt="User" />
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Emma Williams</p>
                      <p className="text-xs text-vidtube-lightgray">156 posts</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h3 className="font-medium mb-4">Forum Stats</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-vidtube-lightgray">Topics:</span>
                    <span>1,245</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-vidtube-lightgray">Posts:</span>
                    <span>8,721</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-vidtube-lightgray">Members:</span>
                    <span>3,502</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-vidtube-lightgray">Latest Member:</span>
                    <span>JohnDoe</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium">Online Now</h3>
                  <Badge variant="secondary">24</Badge>
                </div>
                <div className="flex flex-wrap gap-1">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <Avatar key={i} className="h-7 w-7">
                      <User className="h-4 w-4" />
                    </Avatar>
                  ))}
                  <div className="flex items-center justify-center h-7 w-7 rounded-full bg-vidtube-gray/30 text-xs">
                    +12
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Forums;
