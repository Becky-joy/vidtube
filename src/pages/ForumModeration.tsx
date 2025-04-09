
import React, { useState } from "react";
import Layout from "@/components/Layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, AlertCircle, Check, Trash2, Ban } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock forum posts data
const mockForumPosts = [
  { 
    id: 1, 
    title: "How to use React Context effectively?", 
    author: "jane_doe", 
    content: "I'm trying to understand when to use React Context vs Redux...", 
    createdAt: "2025-04-01", 
    replies: 5,
    reported: false 
  },
  { 
    id: 2, 
    title: "Best practices for CSS in large projects", 
    author: "john_smith", 
    content: "I'm working on a large project and want to maintain clean CSS...", 
    createdAt: "2025-04-03", 
    replies: 12,
    reported: false 
  },
  { 
    id: 3, 
    title: "Help with JavaScript promises", 
    author: "new_coder123", 
    content: "I'm struggling to understand how promises work in JavaScript...", 
    createdAt: "2025-04-05", 
    replies: 8,
    reported: false 
  },
  { 
    id: 4, 
    title: "Check out this free coding course", 
    author: "spammer99", 
    content: "Hey everyone! Check out this amazing FREE coding course at www.suspicious-link.com...", 
    createdAt: "2025-04-07", 
    replies: 0,
    reported: true 
  },
  { 
    id: 5, 
    title: "Inappropriate content in this post", 
    author: "troubleUser", 
    content: "This post contains inappropriate language and offensive content that needs moderation...", 
    createdAt: "2025-04-08", 
    replies: 3,
    reported: true 
  }
];

// Mock reported users
const mockReportedUsers = [
  { 
    id: 101, 
    username: "spammer99", 
    reportCount: 5, 
    reason: "Posting spam links", 
    lastReported: "2025-04-07",
    status: "active" 
  },
  { 
    id: 102, 
    username: "troubleUser", 
    reportCount: 3, 
    reason: "Offensive language", 
    lastReported: "2025-04-08",
    status: "warned" 
  }
];

const ForumModeration = () => {
  const [posts, setPosts] = useState(mockForumPosts);
  const [reportedUsers, setReportedUsers] = useState(mockReportedUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentTab, setCurrentTab] = useState("all");
  const { toast } = useToast();

  // Filter posts based on search and current tab
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        post.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = currentTab === "all" || (currentTab === "reported" && post.reported);
    return matchesSearch && matchesTab;
  });

  // Delete post
  const handleDeletePost = (id: number) => {
    setPosts(posts.filter(post => post.id !== id));
    toast({
      title: "Post deleted",
      description: "The forum post has been removed.",
    });
  };

  // Approve post (remove reported flag)
  const handleApprovePost = (id: number) => {
    setPosts(posts.map(post => 
      post.id === id ? {...post, reported: false} : post
    ));
    toast({
      title: "Post approved",
      description: "The post has been marked as appropriate.",
    });
  };

  // Ban user
  const handleBanUser = (id: number) => {
    setReportedUsers(reportedUsers.map(user => 
      user.id === id ? {...user, status: "banned"} : user
    ));
    toast({
      title: "User banned",
      description: "The user has been banned from the platform.",
      variant: "destructive"
    });
  };

  // Warn user
  const handleWarnUser = (id: number) => {
    setReportedUsers(reportedUsers.map(user => 
      user.id === id ? {...user, status: "warned"} : user
    ));
    toast({
      title: "User warned",
      description: "A warning has been issued to the user.",
    });
  };

  return (
    <Layout>
      <div className="container mx-auto p-4 space-y-6">
        <h1 className="text-2xl font-bold">Forum Moderation</h1>

        <Tabs value={currentTab} onValueChange={setCurrentTab}>
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="all">All Posts</TabsTrigger>
              <TabsTrigger value="reported">Reported Posts</TabsTrigger>
              <TabsTrigger value="users">Reported Users</TabsTrigger>
            </TabsList>
          </div>

          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search posts or users..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <TabsContent value="all" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>All Forum Posts</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Author</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Replies</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPosts.map((post) => (
                      <TableRow key={post.id}>
                        <TableCell className="font-medium">{post.title}</TableCell>
                        <TableCell>{post.author}</TableCell>
                        <TableCell>{post.createdAt}</TableCell>
                        <TableCell>{post.replies}</TableCell>
                        <TableCell>
                          {post.reported ? (
                            <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-red-100 text-red-800">
                              Reported
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-green-100 text-green-800">
                              Active
                            </span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            {post.reported && (
                              <Button variant="ghost" size="sm" onClick={() => handleApprovePost(post.id)}>
                                <Check className="h-4 w-4 text-green-500" />
                              </Button>
                            )}
                            <Button variant="ghost" size="sm" onClick={() => handleDeletePost(post.id)}>
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reported" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Reported Posts</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Author</TableHead>
                      <TableHead>Content Preview</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPosts.filter(post => post.reported).map((post) => (
                      <TableRow key={post.id}>
                        <TableCell className="font-medium">{post.title}</TableCell>
                        <TableCell>{post.author}</TableCell>
                        <TableCell>
                          <div className="max-w-xs truncate">{post.content}</div>
                        </TableCell>
                        <TableCell>{post.createdAt}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm" onClick={() => handleApprovePost(post.id)}>
                              <Check className="h-4 w-4 text-green-500" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleDeletePost(post.id)}>
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                    {filteredPosts.filter(post => post.reported).length === 0 && (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-4">
                          <AlertCircle className="mx-auto h-6 w-6 text-muted-foreground mb-2" />
                          No reported posts found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Reported Users</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Username</TableHead>
                      <TableHead>Report Count</TableHead>
                      <TableHead>Reason</TableHead>
                      <TableHead>Last Reported</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reportedUsers.filter(user => user.username.toLowerCase().includes(searchQuery.toLowerCase())).map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.username}</TableCell>
                        <TableCell>{user.reportCount}</TableCell>
                        <TableCell>{user.reason}</TableCell>
                        <TableCell>{user.lastReported}</TableCell>
                        <TableCell>
                          {user.status === "banned" ? (
                            <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-red-100 text-red-800">
                              Banned
                            </span>
                          ) : user.status === "warned" ? (
                            <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-yellow-100 text-yellow-800">
                              Warned
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-green-100 text-green-800">
                              Active
                            </span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            {user.status !== "warned" && (
                              <Button variant="ghost" size="sm" onClick={() => handleWarnUser(user.id)}>
                                <AlertCircle className="h-4 w-4 text-yellow-500" />
                              </Button>
                            )}
                            {user.status !== "banned" && (
                              <Button variant="ghost" size="sm" onClick={() => handleBanUser(user.id)}>
                                <Ban className="h-4 w-4 text-destructive" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default ForumModeration;
