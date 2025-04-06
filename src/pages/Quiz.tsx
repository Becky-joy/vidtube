
import { useState } from "react";
import Layout from "@/components/Layout";
import { Award, BookOpen, Check, Flag, Timer, ArrowLeft, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface QuizCategory {
  id: string;
  title: string;
  description: string;
  questions: number;
  timeInMinutes: number;
  difficulty: "beginner" | "intermediate" | "advanced";
  icon: React.ReactNode;
}

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface QuizResult {
  categoryId: string;
  score: number;
  totalQuestions: number;
  timeTaken: number;
  date: Date;
}

const Quiz = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [quizStartTime, setQuizStartTime] = useState<Date | null>(null);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizResults, setQuizResults] = useState<QuizResult[]>([]);
  const { toast } = useToast();
  
  const quizCategories: QuizCategory[] = [
    {
      id: "javascript",
      title: "JavaScript Fundamentals",
      description: "Test your knowledge of JavaScript basics including variables, functions, objects, and modern ES6+ features.",
      questions: 5,
      timeInMinutes: 15,
      difficulty: "beginner",
      icon: <BookOpen className="h-5 w-5" />
    },
    {
      id: "html-css",
      title: "HTML & CSS",
      description: "Test your frontend development skills with questions on HTML5 semantic elements, CSS selectors, Flexbox, and Grid.",
      questions: 5,
      timeInMinutes: 20,
      difficulty: "beginner",
      icon: <Flag className="h-5 w-5" />
    },
    {
      id: "react",
      title: "React Basics",
      description: "Test your understanding of React components, hooks, state management, and virtual DOM concepts.",
      questions: 5,
      timeInMinutes: 18,
      difficulty: "intermediate",
      icon: <BookOpen className="h-5 w-5" />
    },
    {
      id: "typescript",
      title: "TypeScript",
      description: "Challenge yourself with questions about TypeScript types, interfaces, generics, and best practices.",
      questions: 5,
      timeInMinutes: 25,
      difficulty: "intermediate",
      icon: <BookOpen className="h-5 w-5" />
    },
    {
      id: "backend",
      title: "Backend Development",
      description: "Test your knowledge of server-side concepts, RESTful APIs, databases, and authentication.",
      questions: 5,
      timeInMinutes: 30,
      difficulty: "advanced",
      icon: <Flag className="h-5 w-5" />
    },
    {
      id: "algorithms",
      title: "Data Structures & Algorithms",
      description: "Challenge yourself with common algorithm problems, time complexity analysis, and data structures.",
      questions: 5,
      timeInMinutes: 40,
      difficulty: "advanced",
      icon: <Award className="h-5 w-5" />
    }
  ];
  
  // Quiz questions for each category
  const quizQuestions: Record<string, QuizQuestion[]> = {
    "javascript": [
      {
        id: "js1",
        question: "Which of the following is not a JavaScript data type?",
        options: ["String", "Boolean", "Float", "Object"],
        correctAnswer: 2
      },
      {
        id: "js2",
        question: "What does the '===' operator do?",
        options: ["Checks value only", "Checks type only", "Checks both value and type", "None of the above"],
        correctAnswer: 2
      },
      {
        id: "js3",
        question: "Which method adds an element to the end of an array?",
        options: ["push()", "pop()", "unshift()", "shift()"],
        correctAnswer: 0
      },
      {
        id: "js4",
        question: "What does 'hoisting' refer to in JavaScript?",
        options: [
          "Moving elements up in the DOM tree", 
          "Moving declarations to the top of the scope", 
          "Increasing performance", 
          "Creating copies of variables"
        ],
        correctAnswer: 1
      },
      {
        id: "js5",
        question: "Which is not an ES6 feature?",
        options: ["Let and Const", "Arrow Functions", "Template Literals", "jQuery"],
        correctAnswer: 3
      }
    ],
    "html-css": [
      {
        id: "html1",
        question: "Which HTML tag is used to define an internal style sheet?",
        options: ["<script>", "<css>", "<style>", "<link>"],
        correctAnswer: 2
      },
      {
        id: "html2",
        question: "Which CSS property controls the text size?",
        options: ["font-size", "text-size", "font-style", "text-style"],
        correctAnswer: 0
      },
      {
        id: "html3",
        question: "What does CSS stand for?",
        options: ["Cascading Style Sheets", "Creative Style Sheets", "Computer Style Sheets", "Colorful Style Sheets"],
        correctAnswer: 0
      },
      {
        id: "html4",
        question: "Which HTML element defines the title of a document?",
        options: ["<meta>", "<head>", "<title>", "<header>"],
        correctAnswer: 2
      },
      {
        id: "html5",
        question: "Which CSS property is used to create space between elements?",
        options: ["spacing", "margin", "padding", "border"],
        correctAnswer: 1
      }
    ],
    "react": [
      {
        id: "react1",
        question: "What function allows you to update state in a React functional component?",
        options: ["this.setState()", "useState()", "updateState()", "this.state()"],
        correctAnswer: 1
      },
      {
        id: "react2",
        question: "What is the correct way to pass a prop called 'name' to a React component?",
        options: ["<Component name='John' />", "<Component prop.name='John' />", "<Component={name: 'John'} />", "<Component 'name'='John' />"],
        correctAnswer: 0
      },
      {
        id: "react3",
        question: "Which hook would you use to run code after render?",
        options: ["useEffect", "useRef", "useCallback", "useMemo"],
        correctAnswer: 0
      },
      {
        id: "react4",
        question: "What is the React Virtual DOM?",
        options: [
          "A virtual representation of the real DOM", 
          "A browser-specific feature for React", 
          "A DOM that runs on a virtual machine",
          "A special type of web worker"
        ],
        correctAnswer: 0
      },
      {
        id: "react5",
        question: "Which method is NOT part of the React component lifecycle?",
        options: ["componentDidMount", "componentWillUpdate", "componentForceUpdate", "componentWillUnmount"],
        correctAnswer: 2
      }
    ],
    "typescript": [
      {
        id: "ts1",
        question: "Which of these is not a TypeScript primitive type?",
        options: ["string", "boolean", "object", "character"],
        correctAnswer: 3
      },
      {
        id: "ts2",
        question: "What does the 'interface' keyword do in TypeScript?",
        options: [
          "Creates a new instance of a class", 
          "Defines a contract for object structure", 
          "Implements inheritance", 
          "Creates a function template"
        ],
        correctAnswer: 1
      },
      {
        id: "ts3",
        question: "What symbol is used for optional properties in TypeScript interfaces?",
        options: ["?", "!", "*", "#"],
        correctAnswer: 0
      },
      {
        id: "ts4",
        question: "Which is the correct way to define a generic function in TypeScript?",
        options: [
          "function func<T>(arg: T): T { return arg; }",
          "function func(arg: <T>): T { return arg; }",
          "function func<T>(arg): T { return arg; }",
          "function<T> func(arg: T): T { return arg; }"
        ],
        correctAnswer: 0
      },
      {
        id: "ts5",
        question: "What is the 'any' type used for in TypeScript?",
        options: [
          "To strictly type check all values", 
          "To bypass type checking", 
          "To define a union type", 
          "To create intersection types"
        ],
        correctAnswer: 1
      }
    ],
    "backend": [
      {
        id: "be1",
        question: "Which of these is NOT a common backend language?",
        options: ["Node.js", "PHP", "CSS", "Python"],
        correctAnswer: 2
      },
      {
        id: "be2",
        question: "What does REST stand for in the context of API design?",
        options: [
          "Remote Enforcement Security Transfer", 
          "Representational State Transfer", 
          "Request Entity Status Testing", 
          "Response Evaluation System Transfer"
        ],
        correctAnswer: 1
      },
      {
        id: "be3",
        question: "Which HTTP method is typically used to update a resource?",
        options: ["GET", "POST", "PUT", "DELETE"],
        correctAnswer: 2
      },
      {
        id: "be4",
        question: "What is a JWT commonly used for?",
        options: ["Data encryption", "Authentication", "Database queries", "Server-side rendering"],
        correctAnswer: 1
      },
      {
        id: "be5",
        question: "Which database is NOT a NoSQL database?",
        options: ["MongoDB", "PostgreSQL", "Cassandra", "CouchDB"],
        correctAnswer: 1
      }
    ],
    "algorithms": [
      {
        id: "algo1",
        question: "What is the time complexity of binary search?",
        options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
        correctAnswer: 1
      },
      {
        id: "algo2",
        question: "Which data structure operates on a FIFO principle?",
        options: ["Stack", "Queue", "Tree", "Heap"],
        correctAnswer: 1
      },
      {
        id: "algo3",
        question: "Which sorting algorithm has the best average-case time complexity?",
        options: ["Bubble Sort", "Selection Sort", "Quick Sort", "Insertion Sort"],
        correctAnswer: 2
      },
      {
        id: "algo4",
        question: "What is the space complexity of depth-first search?",
        options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
        correctAnswer: 2
      },
      {
        id: "algo5",
        question: "Which data structure is best for implementing a priority queue?",
        options: ["Array", "Linked List", "Heap", "Hash Table"],
        correctAnswer: 2
      }
    ]
  };
  
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
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setSelectedOption(null);
    setQuizStartTime(new Date());
    setQuizCompleted(false);
    console.log(`Starting quiz: ${quizId}`);
  };
  
  const handleSelectOption = (optionIndex: number) => {
    setSelectedOption(optionIndex);
  };
  
  const handleNextQuestion = () => {
    if (selectedOption === null) {
      toast({
        title: "No option selected",
        description: "Please select an answer to continue",
        variant: "destructive"
      });
      return;
    }
    
    // Save the answer
    const newUserAnswers = [...userAnswers];
    newUserAnswers[currentQuestionIndex] = selectedOption;
    setUserAnswers(newUserAnswers);
    
    // Move to next question or complete the quiz
    if (currentQuestionIndex < quizCategories.find(q => q.id === selectedCategory)!.questions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
    } else {
      completeQuiz(newUserAnswers);
    }
  };
  
  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedOption(userAnswers[currentQuestionIndex - 1] ?? null);
    }
  };
  
  const completeQuiz = (finalAnswers: number[]) => {
    if (!selectedCategory || !quizStartTime) return;
    
    // Calculate score
    const questions = quizQuestions[selectedCategory];
    let correctCount = 0;
    
    finalAnswers.forEach((answer, index) => {
      if (answer === questions[index].correctAnswer) {
        correctCount++;
      }
    });
    
    // Calculate time taken
    const endTime = new Date();
    const timeTaken = Math.floor((endTime.getTime() - quizStartTime.getTime()) / 1000);
    
    // Save result
    const result: QuizResult = {
      categoryId: selectedCategory,
      score: correctCount,
      totalQuestions: questions.length,
      timeTaken,
      date: new Date()
    };
    
    setQuizResults([...quizResults, result]);
    setQuizCompleted(true);
    
    toast({
      title: "Quiz Completed!",
      description: `You scored ${correctCount} out of ${questions.length}`,
      variant: "default"
    });
  };
  
  const resetQuiz = () => {
    setSelectedCategory(null);
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setSelectedOption(null);
    setQuizStartTime(null);
    setQuizCompleted(false);
  };
  
  // Render quiz questions and answers
  const renderQuizContent = () => {
    if (!selectedCategory) return null;
    
    const questions = quizQuestions[selectedCategory];
    const currentQuestion = questions[currentQuestionIndex];
    const category = quizCategories.find(cat => cat.id === selectedCategory);
    
    if (quizCompleted) {
      const latestResult = quizResults[quizResults.length - 1];
      return (
        <div className="animate-fade-in">
          <div className="mb-8 flex items-center justify-between">
            <Button variant="outline" onClick={resetQuiz}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Quizzes
            </Button>
            
            <Badge variant="outline" className={getDifficultyColor(category?.difficulty || "")}>
              {category?.difficulty}
            </Badge>
          </div>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-2xl">Quiz Completed: {category?.title}</CardTitle>
              <CardDescription>
                {new Date().toLocaleDateString()} • {Math.floor(latestResult.timeTaken / 60)}m {latestResult.timeTaken % 60}s
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-6">
              <div className="flex flex-col items-center justify-center py-6">
                <div className="relative mb-4">
                  <svg className="w-32 h-32">
                    <circle
                      className="text-gray-200"
                      strokeWidth="8"
                      stroke="currentColor"
                      fill="transparent"
                      r="56"
                      cx="64"
                      cy="64"
                    />
                    <circle
                      className="text-vidtube-blue"
                      strokeWidth="8"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="transparent"
                      r="56"
                      cx="64"
                      cy="64"
                      strokeDasharray={`${(latestResult.score / latestResult.totalQuestions) * 351.8} 351.8`}
                      strokeDashoffset="0"
                      transform="rotate(-90 64 64)"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-3xl font-bold">
                      {Math.round((latestResult.score / latestResult.totalQuestions) * 100)}%
                    </p>
                  </div>
                </div>
                
                <h3 className="text-xl font-medium mt-4">
                  {latestResult.score} / {latestResult.totalQuestions} Correct
                </h3>
                
                {latestResult.score === latestResult.totalQuestions ? (
                  <p className="text-green-500 font-medium mt-2">Perfect Score! Great job!</p>
                ) : latestResult.score >= latestResult.totalQuestions * 0.7 ? (
                  <p className="text-blue-500 font-medium mt-2">Well done!</p>
                ) : (
                  <p className="text-amber-500 font-medium mt-2">Keep practicing!</p>
                )}
              </div>
              
              <div className="mt-6 space-y-4">
                <h4 className="font-medium">Review your answers:</h4>
                {questions.map((q, index) => (
                  <div key={q.id} className="border rounded-md p-4">
                    <div className="flex justify-between">
                      <p className="font-medium">{index + 1}. {q.question}</p>
                      {userAnswers[index] === q.correctAnswer ? (
                        <Check className="h-5 w-5 text-green-500" />
                      ) : (
                        <X className="h-5 w-5 text-red-500" />
                      )}
                    </div>
                    <p className="mt-2 text-sm">
                      Your answer: <span className={userAnswers[index] === q.correctAnswer ? "text-green-500" : "text-red-500"}>
                        {q.options[userAnswers[index]]}
                      </span>
                    </p>
                    {userAnswers[index] !== q.correctAnswer && (
                      <p className="mt-1 text-sm text-green-500">
                        Correct answer: {q.options[q.correctAnswer]}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-vidtube-blue hover:bg-blue-600 transition-colors" onClick={resetQuiz}>
                Try Another Quiz
              </Button>
            </CardFooter>
          </Card>
        </div>
      );
    }
    
    return (
      <div className="animate-fade-in">
        <div className="mb-8 flex items-center justify-between">
          <Button variant="outline" onClick={resetQuiz}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Quizzes
          </Button>
          
          <Badge variant="outline" className="flex items-center gap-1 px-3 py-1">
            <Timer className="h-4 w-4" />
            Question {currentQuestionIndex + 1} of {questions.length}
          </Badge>
        </div>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>{category?.title}</CardTitle>
            <CardDescription>
              {category?.description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <h3 className="text-xl font-medium mb-4">{currentQuestion.question}</h3>
              
              <RadioGroup value={selectedOption?.toString()} className="space-y-3"
                onValueChange={(value) => handleSelectOption(parseInt(value))}>
                {currentQuestion.options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                    <Label htmlFor={`option-${index}`} className="text-base cursor-pointer">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
            >
              Previous
            </Button>
            <Button 
              className="bg-vidtube-blue hover:bg-blue-600 transition-colors" 
              onClick={handleNextQuestion}
            >
              {currentQuestionIndex < questions.length - 1 ? "Next Question" : "Complete Quiz"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {selectedCategory ? (
          renderQuizContent()
        ) : (
          <>
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
                {quizResults.length > 0 ? (
                  <div className="space-y-4">
                    {quizResults.slice().reverse().map((result, index) => {
                      const category = quizCategories.find(c => c.id === result.categoryId);
                      return (
                        <div key={index} className="flex items-center justify-between border-b pb-4 last:border-0">
                          <div>
                            <h4 className="font-medium">{category?.title}</h4>
                            <p className="text-sm text-muted-foreground">
                              {new Date(result.date).toLocaleDateString()} • {formatTime(result.timeTaken)}
                            </p>
                          </div>
                          <div className="flex items-center">
                            <Badge className={cn(
                              "mr-2",
                              result.score === result.totalQuestions 
                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" 
                                : result.score >= result.totalQuestions * 0.7
                                ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                                : "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200"
                            )}>
                              {result.score}/{result.totalQuestions}
                            </Badge>
                            <span className="text-sm font-medium">
                              {Math.round((result.score / result.totalQuestions) * 100)}%
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Award className="h-12 w-12 mx-auto mb-4 text-vidtube-blue" />
                    <h3 className="text-xl font-medium">No Quizzes Completed Yet</h3>
                    <p className="text-muted-foreground mt-2">Take your first quiz to start tracking your progress!</p>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Quiz;
