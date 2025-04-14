
import React, { useState } from "react";
import Layout from "@/components/Layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Plus, Edit, Trash2, BarChart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { LineChart } from "@/components/charts/LineChart";

// Mock quizzes data
const mockQuizzes = [
  { id: 1, title: "React Fundamentals", videoTitle: "Introduction to React", questions: 10, completions: 156, avgScore: 82, createdAt: "2025-03-10" },
  { id: 2, title: "JavaScript Basics", videoTitle: "Advanced JavaScript Concepts", questions: 8, completions: 124, avgScore: 75, createdAt: "2025-03-15" },
  { id: 3, title: "CSS Layout Challenge", videoTitle: "CSS Grid Layout", questions: 5, completions: 98, avgScore: 88, createdAt: "2025-03-20" },
  { id: 4, title: "TypeScript Quiz", videoTitle: "TypeScript Basics", questions: 12, completions: 67, avgScore: 71, createdAt: "2025-03-28" }
];

// Mock videos for linking quizzes
const mockVideos = [
  { id: 1, title: "Introduction to React", category: "Frontend" },
  { id: 2, title: "Advanced JavaScript Concepts", category: "JavaScript" },
  { id: 3, title: "CSS Grid Layout", category: "CSS" },
  { id: 4, title: "TypeScript Basics", category: "TypeScript" },
  { id: 5, title: "Node.js for Beginners", category: "Backend" },
  { id: 6, title: "State Management with Redux", category: "Frontend" },
];

// Mock quiz analytics data
const quizAnalyticsData = [
  { name: "Week 1", completions: 45, avgScore: 72 },
  { name: "Week 2", completions: 58, avgScore: 75 },
  { name: "Week 3", completions: 67, avgScore: 79 },
  { name: "Week 4", completions: 89, avgScore: 82 },
  { name: "Week 5", completions: 104, avgScore: 80 },
  { name: "Week 6", completions: 121, avgScore: 85 },
];

const QuizManagement = () => {
  const [quizzes, setQuizzes] = useState(mockQuizzes);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentTab, setCurrentTab] = useState("all");
  const { toast } = useToast();

  // New quiz form state
  const [newQuiz, setNewQuiz] = useState({
    title: "",
    videoId: "",
    questions: [{ question: "", options: ["", "", "", ""], correctAnswer: 0 }]
  });

  // Edit quiz state
  const [editingQuiz, setEditingQuiz] = useState<null | number>(null);
  const [editForm, setEditForm] = useState({
    title: "",
    videoId: ""
  });

  // Filter quizzes based on search
  const filteredQuizzes = quizzes.filter(quiz => 
    quiz.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    quiz.videoTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle creating a new quiz
  const handleCreateQuiz = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, you would save the quiz to a database
    const newId = quizzes.length > 0 ? Math.max(...quizzes.map(q => q.id)) + 1 : 1;
    const selectedVideo = mockVideos.find(v => v.id.toString() === newQuiz.videoId);
    
    const newQuizEntry = {
      id: newId,
      title: newQuiz.title,
      videoTitle: selectedVideo?.title || "Unlinked",
      questions: newQuiz.questions.length,
      completions: 0,
      avgScore: 0,
      createdAt: new Date().toISOString().split('T')[0]
    };
    
    setQuizzes([...quizzes, newQuizEntry]);
    setNewQuiz({
      title: "",
      videoId: "",
      questions: [{ question: "", options: ["", "", "", ""], correctAnswer: 0 }]
    });
    
    toast({
      title: "Quiz created successfully",
      description: `"${newQuiz.title}" has been added to your quizzes.`,
    });
    
    setCurrentTab("all");
  };

  // Handle delete quiz
  const handleDeleteQuiz = (id: number) => {
    setQuizzes(quizzes.filter(quiz => quiz.id !== id));
    toast({
      title: "Quiz deleted",
      description: "The quiz has been removed.",
    });
  };

  // Start editing a quiz
  const handleEditStart = (quiz: any) => {
    setEditingQuiz(quiz.id);
    const videoId = mockVideos.find(v => v.title === quiz.videoTitle)?.id.toString() || "";
    setEditForm({
      title: quiz.title,
      videoId: videoId
    });
  };

  // Save edited quiz
  const handleSaveEdit = () => {
    const selectedVideo = mockVideos.find(v => v.id.toString() === editForm.videoId);
    
    setQuizzes(quizzes.map(quiz => 
      quiz.id === editingQuiz 
        ? { ...quiz, title: editForm.title, videoTitle: selectedVideo?.title || quiz.videoTitle } 
        : quiz
    ));
    
    setEditingQuiz(null);
    toast({
      title: "Quiz updated",
      description: "The quiz details have been updated.",
    });
  };

  // Add question to new quiz
  const handleAddQuestion = () => {
    setNewQuiz({
      ...newQuiz,
      questions: [
        ...newQuiz.questions,
        { question: "", options: ["", "", "", ""], correctAnswer: 0 }
      ]
    });
  };

  // Update question
  const handleUpdateQuestion = (index: number, field: string, value: string) => {
    const updatedQuestions = [...newQuiz.questions];
    if (field === "question") {
      updatedQuestions[index].question = value;
    }
    setNewQuiz({
      ...newQuiz,
      questions: updatedQuestions
    });
  };

  // Update option
  const handleUpdateOption = (questionIndex: number, optionIndex: number, value: string) => {
    const updatedQuestions = [...newQuiz.questions];
    updatedQuestions[questionIndex].options[optionIndex] = value;
    setNewQuiz({
      ...newQuiz,
      questions: updatedQuestions
    });
  };

  // Set correct answer
  const handleSetCorrectAnswer = (questionIndex: number, optionIndex: number) => {
    const updatedQuestions = [...newQuiz.questions];
    updatedQuestions[questionIndex].correctAnswer = optionIndex;
    setNewQuiz({
      ...newQuiz,
      questions: updatedQuestions
    });
  };

  return (
    <Layout>
      <div className="container mx-auto p-4 space-y-6">
        <h1 className="text-2xl font-bold">Quiz Management</h1>

        <Tabs value={currentTab} onValueChange={setCurrentTab}>
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="all">All Quizzes</TabsTrigger>
              <TabsTrigger value="create">Create Quiz</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="all" className="space-y-4">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search quizzes..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Linked Video</TableHead>
                      <TableHead>Questions</TableHead>
                      <TableHead>Completions</TableHead>
                      <TableHead>Avg. Score</TableHead>
                      <TableHead>Date Created</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredQuizzes.map((quiz) => (
                      <TableRow key={quiz.id}>
                        <TableCell className="font-medium">
                          {editingQuiz === quiz.id ? (
                            <Input
                              value={editForm.title}
                              onChange={(e) => setEditForm({...editForm, title: e.target.value})}
                            />
                          ) : (
                            quiz.title
                          )}
                        </TableCell>
                        <TableCell>
                          {editingQuiz === quiz.id ? (
                            <select
                              value={editForm.videoId}
                              onChange={(e) => setEditForm({...editForm, videoId: e.target.value})}
                              className="border border-input bg-background h-9 rounded-md px-3 w-full"
                            >
                              <option value="">Unlinked</option>
                              {mockVideos.map((video) => (
                                <option key={video.id} value={video.id}>{video.title}</option>
                              ))}
                            </select>
                          ) : (
                            quiz.videoTitle
                          )}
                        </TableCell>
                        <TableCell>{quiz.questions}</TableCell>
                        <TableCell>{quiz.completions}</TableCell>
                        <TableCell>{quiz.avgScore}%</TableCell>
                        <TableCell>{quiz.createdAt}</TableCell>
                        <TableCell>
                          {editingQuiz === quiz.id ? (
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm" onClick={() => setEditingQuiz(null)}>
                                Cancel
                              </Button>
                              <Button size="sm" onClick={handleSaveEdit}>
                                Save
                              </Button>
                            </div>
                          ) : (
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm" onClick={() => handleEditStart(quiz)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" onClick={() => handleDeleteQuiz(quiz.id)}>
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                              <Button variant="ghost" size="sm" asChild>
                                <a href={`#quiz-${quiz.id}-analytics`}>
                                  <BarChart className="h-4 w-4" />
                                </a>
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

          <TabsContent value="create">
            <Card>
              <CardHeader>
                <CardTitle>Create New Quiz</CardTitle>
                <CardDescription>
                  Build a quiz and associate it with a tutorial video.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCreateQuiz} className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="title" className="text-sm font-medium">Quiz Title</label>
                    <Input
                      id="title"
                      placeholder="Enter quiz title"
                      value={newQuiz.title}
                      onChange={(e) => setNewQuiz({...newQuiz, title: e.target.value})}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="videoId" className="text-sm font-medium">Link to Video</label>
                    <select
                      id="videoId"
                      className="border border-input bg-background h-10 rounded-md px-3 w-full"
                      value={newQuiz.videoId}
                      onChange={(e) => setNewQuiz({...newQuiz, videoId: e.target.value})}
                      required
                    >
                      <option value="" disabled>Select a video</option>
                      {mockVideos.map((video) => (
                        <option key={video.id} value={video.id}>{video.title}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-md font-medium">Questions</h3>
                      <Button type="button" variant="outline" size="sm" onClick={handleAddQuestion}>
                        <Plus className="h-4 w-4 mr-1" /> Add Question
                      </Button>
                    </div>

                    {newQuiz.questions.map((question, qIndex) => (
                      <div key={qIndex} className="border rounded-md p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">Question {qIndex + 1}</h4>
                          {newQuiz.questions.length > 1 && (
                            <Button 
                              type="button" 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => {
                                const updatedQuestions = [...newQuiz.questions];
                                updatedQuestions.splice(qIndex, 1);
                                setNewQuiz({...newQuiz, questions: updatedQuestions});
                              }}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          )}
                        </div>
                        
                        <div>
                          <Input
                            placeholder="Question text"
                            value={question.question}
                            onChange={(e) => handleUpdateQuestion(qIndex, "question", e.target.value)}
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          {question.options.map((option, oIndex) => (
                            <div key={oIndex} className="flex items-center gap-2">
                              <div className="flex-shrink-0">
                                <input 
                                  type="radio" 
                                  checked={question.correctAnswer === oIndex} 
                                  onChange={() => handleSetCorrectAnswer(qIndex, oIndex)}
                                  className="h-4 w-4"
                                />
                              </div>
                              <Input
                                placeholder={`Option ${oIndex + 1}`}
                                value={option}
                                onChange={(e) => handleUpdateOption(qIndex, oIndex, e.target.value)}
                                required
                                className="flex-grow"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <CardFooter className="px-0 pb-0 pt-6">
                    <Button type="submit" className="w-full">
                      Create Quiz
                    </Button>
                  </CardFooter>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quiz Completion Trends</CardTitle>
                <CardDescription>Completions and average scores over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <LineChart
                    data={quizAnalyticsData}
                    index="name"
                    categories={["completions", "avgScore"]}
                    colors={["blue", "indigo"]}
                    showAnimation={true}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quiz Performance</CardTitle>
                <CardDescription>Individual quiz analytics</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Quiz</TableHead>
                      <TableHead className="text-right">Completions</TableHead>
                      <TableHead className="text-right">Avg. Score</TableHead>
                      <TableHead className="text-right">Completion Rate</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {quizzes.map(quiz => (
                      <TableRow key={quiz.id} id={`quiz-${quiz.id}-analytics`}>
                        <TableCell className="font-medium">{quiz.title}</TableCell>
                        <TableCell className="text-right">{quiz.completions}</TableCell>
                        <TableCell className="text-right">{quiz.avgScore}%</TableCell>
                        <TableCell className="text-right">{Math.floor(Math.random() * 40) + 60}%</TableCell>
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

export default QuizManagement;
