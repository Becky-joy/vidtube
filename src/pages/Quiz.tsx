
import { useState } from "react";
import Layout from "@/components/Layout";
import { Award, BookOpen, Check, Flag, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface QuizCategory {
  id: string;
  title: string;
  description: string;
  questions: number;
  timeInMinutes: number;
  difficulty: "beginner" | "intermediate" | "advanced";
  icon: React.ReactNode;
}

const Quiz = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const quizCategories: QuizCategory[] = [
    {
      id: "javascript",
      title: "JavaScript Fundamentals",
      description: "Test your knowledge of JavaScript basics including variables, functions, objects, and modern ES6+ features.",
      questions: 10,
      timeInMinutes: 15,
      difficulty: "beginner",
      icon: <BookOpen className="h-5 w-5" />
    },
    {
      id: "html-css",
      title: "HTML & CSS",
      description: "Test your frontend development skills with questions on HTML5 semantic elements, CSS selectors, Flexbox, and Grid.",
      questions: 15,
      timeInMinutes: 20,
      difficulty: "beginner",
      icon: <Flag className="h-5 w-5" />
    },
    {
      id: "react",
      title: "React Basics",
      description: "Test your understanding of React components, hooks, state management, and virtual DOM concepts.",
      questions: 12,
      timeInMinutes: 18,
      difficulty: "intermediate",
      icon: <BookOpen className="h-5 w-5" />
    },
    {
      id: "typescript",
      title: "TypeScript",
      description: "Challenge yourself with questions about TypeScript types, interfaces, generics, and best practices.",
      questions: 15,
      timeInMinutes: 25,
      difficulty: "intermediate",
      icon: <BookOpen className="h-5 w-5" />
    },
    {
      id: "backend",
      title: "Backend Development",
      description: "Test your knowledge of server-side concepts, RESTful APIs, databases, and authentication.",
      questions: 20,
      timeInMinutes: 30,
      difficulty: "advanced",
      icon: <Flag className="h-5 w-5" />
    },
    {
      id: "algorithms",
      title: "Data Structures & Algorithms",
      description: "Challenge yourself with common algorithm problems, time complexity analysis, and data structures.",
      questions: 10,
      timeInMinutes: 40,
      difficulty: "advanced",
      icon: <Award className="h-5 w-5" />
    }
  ];
  
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "intermediate":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "advanced":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };
  
  const handleStartQuiz = (quizId: string) => {
    setSelectedCategory(quizId);
    // In a real app, this would navigate to the actual quiz page or show quiz questions
    console.log(`Starting quiz: ${quizId}`);
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Quiz Section</h1>
            <p className="text-muted-foreground mt-2">Test your knowledge and skills with our interactive quizzes</p>
          </div>
          <Badge variant="outline" className="px-3 py-1">
            <Check className="mr-1 h-4 w-4" /> 
            {quizCategories.length} Quizzes Available
          </Badge>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizCategories.map((quiz) => (
            <Card key={quiz.id} className="hover:shadow-lg transition-shadow border-t-4 border-t-vidtube-blue">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center gap-2">
                    {quiz.icon}
                    {quiz.title}
                  </CardTitle>
                  <Badge className={cn("font-normal", getDifficultyColor(quiz.difficulty))}>
                    {quiz.difficulty}
                  </Badge>
                </div>
                <CardDescription>{quiz.description}</CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Award className="h-4 w-4 mr-1" />
                    <span>{quiz.questions} questions</span>
                  </div>
                  <div className="flex items-center">
                    <Timer className="h-4 w-4 mr-1" />
                    <span>{quiz.timeInMinutes} minutes</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full bg-vidtube-blue hover:bg-blue-600 transition-colors" 
                  onClick={() => handleStartQuiz(quiz.id)}
                >
                  Start Quiz
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        {/* Recent achievements section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Your Quiz Journey</h2>
          <div className="bg-card p-6 rounded-lg border">
            <div className="text-center py-8">
              <Award className="h-12 w-12 mx-auto mb-4 text-vidtube-blue" />
              <h3 className="text-xl font-medium">No Quizzes Completed Yet</h3>
              <p className="text-muted-foreground mt-2">Take your first quiz to start tracking your progress!</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Quiz;
