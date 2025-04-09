
import React, { useState } from "react";
import Layout from "@/components/Layout";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

import QuizList from "@/components/quiz/QuizList";
import QuizForm from "@/components/quiz/QuizForm";
import QuizAnalytics from "@/components/quiz/QuizAnalytics";
import { mockQuizzes, mockVideos } from "@/data/quizData";
import { useAdminNotifications } from "@/hooks/useAdminNotifications";

const QuizManagement = () => {
  const [quizzes, setQuizzes] = useState(mockQuizzes);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentTab, setCurrentTab] = useState("all");
  const { toast } = useToast();
  const { notifyQuizAdded, notifyQuizUpdated } = useAdminNotifications();

  // Filter quizzes based on search
  const filteredQuizzes = quizzes.filter(quiz => 
    quiz.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    quiz.videoTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle creating a new quiz
  const handleCreateQuiz = (newQuiz) => {
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
    toast({
      title: "Quiz created successfully",
      description: `"${newQuiz.title}" has been added to your quizzes.`,
    });
    
    // Send notification
    if (selectedVideo) {
      notifyQuizAdded(newQuiz.title, selectedVideo.title);
    }
    
    setCurrentTab("all");
  };

  // Handle quiz updates
  const handleQuizUpdate = (updatedQuiz, originalId) => {
    const selectedVideo = mockVideos.find(v => v.id.toString() === updatedQuiz.videoId);
    
    setQuizzes(quizzes.map(quiz => 
      quiz.id === originalId 
        ? { ...quiz, title: updatedQuiz.title, videoTitle: selectedVideo?.title || quiz.videoTitle } 
        : quiz
    ));
    
    toast({
      title: "Quiz updated",
      description: "The quiz details have been updated.",
    });
    
    // Send notification for quiz update
    notifyQuizUpdated(updatedQuiz.title);
  };

  // Handle delete quiz
  const handleDeleteQuiz = (id) => {
    setQuizzes(quizzes.filter(quiz => quiz.id !== id));
    toast({
      title: "Quiz deleted",
      description: "The quiz has been removed.",
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
              <QuizList 
                quizzes={filteredQuizzes} 
                onDelete={handleDeleteQuiz} 
                onUpdate={handleQuizUpdate} 
                videos={mockVideos}
              />
            </Card>
          </TabsContent>

          <TabsContent value="create">
            <QuizForm 
              videos={mockVideos}
              onSubmit={handleCreateQuiz} 
            />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <QuizAnalytics quizzes={quizzes} />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default QuizManagement;
