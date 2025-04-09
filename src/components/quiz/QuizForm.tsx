
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface Video {
  id: number;
  title: string;
  category: string;
}

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
}

interface QuizFormProps {
  videos: Video[];
  onSubmit: (quiz: { title: string; videoId: string; questions: Question[] }) => void;
}

const QuizForm: React.FC<QuizFormProps> = ({ videos, onSubmit }) => {
  const [newQuiz, setNewQuiz] = useState<{
    title: string;
    videoId: string;
    questions: Question[];
  }>({
    title: "",
    videoId: "",
    questions: [{ question: "", options: ["", "", "", ""], correctAnswer: 0 }]
  });

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

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(newQuiz);
    
    // Reset form
    setNewQuiz({
      title: "",
      videoId: "",
      questions: [{ question: "", options: ["", "", "", ""], correctAnswer: 0 }]
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Quiz</CardTitle>
        <CardDescription>
          Build a quiz and associate it with a tutorial video.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
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
              {videos.map((video) => (
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
  );
};

export default QuizForm;
