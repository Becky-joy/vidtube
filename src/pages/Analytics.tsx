
import React, { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart } from "@/components/charts/BarChart";
import { LineChart } from "@/components/charts/LineChart";
import { PieChart } from "@/components/charts/PieChart";
import { Download } from "lucide-react";

// Mock data
const mockUserData = [
  { name: "Jan", value: 300 },
  { name: "Feb", value: 450 },
  { name: "Mar", value: 520 },
  { name: "Apr", value: 690 },
  { name: "May", value: 820 },
  { name: "Jun", value: 950 },
];

const mockContentData = [
  { name: "Jan", videos: 8, quizzes: 5 },
  { name: "Feb", videos: 12, quizzes: 8 },
  { name: "Mar", videos: 15, quizzes: 10 },
  { name: "Apr", videos: 20, quizzes: 15 },
  { name: "May", videos: 24, quizzes: 18 },
  { name: "Jun", videos: 30, quizzes: 22 },
];

const mockEngagementData = [
  { name: "Jan", views: 1200, comments: 150, quizzes: 80 },
  { name: "Feb", views: 1800, comments: 220, quizzes: 120 },
  { name: "Mar", views: 2200, comments: 280, quizzes: 170 },
  { name: "Apr", views: 2800, comments: 350, quizzes: 210 },
  { name: "May", views: 3500, comments: 420, quizzes: 260 },
  { name: "Jun", views: 4200, comments: 480, quizzes: 310 },
];

const mockCategoryData = [
  { name: "Frontend", value: 45 },
  { name: "Backend", value: 20 },
  { name: "JavaScript", value: 15 },
  { name: "CSS", value: 10 },
  { name: "Other", value: 10 }
];

const mockPopularContentTable = [
  { id: 1, title: "Introduction to React", type: "Video", views: 4850, engagement: 92 },
  { id: 2, title: "JavaScript Basics", type: "Quiz", completions: 3240, avgScore: 78 },
  { id: 3, title: "Advanced JavaScript Concepts", type: "Video", views: 3100, engagement: 85 },
  { id: 4, title: "CSS Grid Layout", type: "Video", views: 2800, engagement: 79 },
  { id: 5, title: "TypeScript Quiz", type: "Quiz", completions: 1950, avgScore: 71 },
];

const Analytics = () => {
  const [dateRange, setDateRange] = useState("6m");
  const [exportFormat, setExportFormat] = useState("csv");

  // Mock function to handle data export
  const handleExportData = () => {
    alert(`Exporting data in ${exportFormat} format. In a real app, this would download the data.`);
  };

  return (
    <Layout>
      <div className="container mx-auto p-4 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-2xl font-bold">Analytics & Reports</h1>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="1m">Last month</SelectItem>
                <SelectItem value="3m">Last 3 months</SelectItem>
                <SelectItem value="6m">Last 6 months</SelectItem>
                <SelectItem value="1y">Last year</SelectItem>
              </SelectContent>
            </Select>
            
            <div className="flex gap-2">
              <Select value={exportFormat} onValueChange={setExportFormat}>
                <SelectTrigger className="w-[100px]">
                  <SelectValue placeholder="Format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="csv">CSV</SelectItem>
                  <SelectItem value="xlsx">Excel</SelectItem>
                  <SelectItem value="pdf">PDF</SelectItem>
                </SelectContent>
              </Select>
              
              <Button onClick={handleExportData}>
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>

        <Tabs defaultValue="overview">
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">User Analytics</TabsTrigger>
            <TabsTrigger value="content">Content Analytics</TabsTrigger>
            <TabsTrigger value="engagement">Engagement</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>User Growth</CardTitle>
                  <CardDescription>New user registrations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-60">
                    <LineChart
                      data={mockUserData}
                      index="name"
                      categories={["value"]}
                      colors={["blue"]}
                      showAnimation={true}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Content Distribution</CardTitle>
                  <CardDescription>By category</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-60">
                    <PieChart
                      data={mockCategoryData}
                      index="name"
                      categories={["value"]}
                      colors={["blue", "indigo", "violet", "sky"]}
                      showAnimation={true}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Content Growth</CardTitle>
                  <CardDescription>Videos and quizzes created</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-60">
                    <BarChart
                      data={mockContentData}
                      index="name"
                      categories={["videos", "quizzes"]}
                      colors={["blue", "indigo"]}
                      showAnimation={true}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Most Popular Content</CardTitle>
                <CardDescription>Top performing videos and quizzes</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead className="text-right">Views/Completions</TableHead>
                      <TableHead className="text-right">Engagement/Score</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockPopularContentTable.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.title}</TableCell>
                        <TableCell>{item.type}</TableCell>
                        <TableCell className="text-right">
                          {item.type === "Video" ? `${item.views} views` : `${item.completions} completions`}
                        </TableCell>
                        <TableCell className="text-right">
                          {item.type === "Video" ? `${item.engagement}%` : `${item.avgScore}%`}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>User Registration</CardTitle>
                  <CardDescription>New users over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <LineChart
                      data={mockUserData}
                      index="name"
                      categories={["value"]}
                      colors={["blue"]}
                      showAnimation={true}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Active Users</CardTitle>
                  <CardDescription>Daily and monthly active users</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <LineChart
                      data={[
                        { name: "Jan", daily: 120, monthly: 350 },
                        { name: "Feb", daily: 150, monthly: 420 },
                        { name: "Mar", daily: 180, monthly: 480 },
                        { name: "Apr", daily: 220, monthly: 550 },
                        { name: "May", daily: 270, monthly: 620 },
                        { name: "Jun", daily: 320, monthly: 780 },
                      ]}
                      index="name"
                      categories={["daily", "monthly"]}
                      colors={["blue", "indigo"]}
                      showAnimation={true}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>User Demographics</CardTitle>
                <CardDescription>User distribution by region</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="h-64">
                    <PieChart
                      data={[
                        { name: "North America", value: 45 },
                        { name: "Europe", value: 25 },
                        { name: "Asia", value: 20 },
                        { name: "Other", value: 10 }
                      ]}
                      index="name"
                      categories={["value"]}
                      colors={["blue", "indigo", "violet", "sky"]}
                      showAnimation={true}
                    />
                  </div>
                  <div>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Region</TableHead>
                          <TableHead className="text-right">Users</TableHead>
                          <TableHead className="text-right">Growth</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>North America</TableCell>
                          <TableCell className="text-right">687</TableCell>
                          <TableCell className="text-right">+12%</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Europe</TableCell>
                          <TableCell className="text-right">382</TableCell>
                          <TableCell className="text-right">+8%</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Asia</TableCell>
                          <TableCell className="text-right">305</TableCell>
                          <TableCell className="text-right">+15%</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Other</TableCell>
                          <TableCell className="text-right">152</TableCell>
                          <TableCell className="text-right">+7%</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Content Creation</CardTitle>
                  <CardDescription>Videos and quizzes added over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <BarChart
                      data={mockContentData}
                      index="name"
                      categories={["videos", "quizzes"]}
                      colors={["blue", "indigo"]}
                      showAnimation={true}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Content Distribution</CardTitle>
                  <CardDescription>By category</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <PieChart
                      data={mockCategoryData}
                      index="name"
                      categories={["value"]}
                      colors={["blue", "indigo", "violet", "sky"]}
                      showAnimation={true}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Content Performance</CardTitle>
                <CardDescription>Views and engagement by content type</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Category</TableHead>
                      <TableHead className="text-right">Videos</TableHead>
                      <TableHead className="text-right">Avg. Views</TableHead>
                      <TableHead className="text-right">Quizzes</TableHead>
                      <TableHead className="text-right">Avg. Completion Rate</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Frontend</TableCell>
                      <TableCell className="text-right">36</TableCell>
                      <TableCell className="text-right">1,240</TableCell>
                      <TableCell className="text-right">18</TableCell>
                      <TableCell className="text-right">72%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Backend</TableCell>
                      <TableCell className="text-right">24</TableCell>
                      <TableCell className="text-right">980</TableCell>
                      <TableCell className="text-right">12</TableCell>
                      <TableCell className="text-right">68%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>JavaScript</TableCell>
                      <TableCell className="text-right">18</TableCell>
                      <TableCell className="text-right">1,580</TableCell>
                      <TableCell className="text-right">15</TableCell>
                      <TableCell className="text-right">74%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>CSS</TableCell>
                      <TableCell className="text-right">15</TableCell>
                      <TableCell className="text-right">920</TableCell>
                      <TableCell className="text-right">8</TableCell>
                      <TableCell className="text-right">65%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Other</TableCell>
                      <TableCell className="text-right">12</TableCell>
                      <TableCell className="text-right">760</TableCell>
                      <TableCell className="text-right">7</TableCell>
                      <TableCell className="text-right">61%</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="engagement" className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Overall Engagement</CardTitle>
                  <CardDescription>Views, comments, and quiz completions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <LineChart
                      data={mockEngagementData}
                      index="name"
                      categories={["views", "comments", "quizzes"]}
                      colors={["blue", "indigo", "violet"]}
                      showAnimation={true}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Forum Activity</CardTitle>
                  <CardDescription>Posts and replies over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <BarChart
                      data={[
                        { name: "Jan", posts: 45, replies: 180 },
                        { name: "Feb", posts: 52, replies: 220 },
                        { name: "Mar", posts: 58, replies: 250 },
                        { name: "Apr", posts: 70, replies: 320 },
                        { name: "May", posts: 85, replies: 380 },
                        { name: "Jun", posts: 95, replies: 420 },
                      ]}
                      index="name"
                      categories={["posts", "replies"]}
                      colors={["blue", "indigo"]}
                      showAnimation={true}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quiz Engagement</CardTitle>
                  <CardDescription>Completion rates and average scores</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <LineChart
                      data={[
                        { name: "Jan", completionRate: 62, avgScore: 75 },
                        { name: "Feb", completionRate: 65, avgScore: 73 },
                        { name: "Mar", completionRate: 68, avgScore: 78 },
                        { name: "Apr", completionRate: 71, avgScore: 76 },
                        { name: "May", completionRate: 73, avgScore: 79 },
                        { name: "Jun", completionRate: 76, avgScore: 82 },
                      ]}
                      index="name"
                      categories={["completionRate", "avgScore"]}
                      colors={["blue", "indigo"]}
                      showAnimation={true}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Analytics;
