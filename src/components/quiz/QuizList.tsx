
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit, Trash2, BarChart } from "lucide-react";
import { CardContent } from "@/components/ui/card";

interface Video {
  id: number;
  title: string;
  category: string;
}

interface Quiz {
  id: number;
  title: string;
  videoTitle: string;
  questions: number;
  completions: number;
  avgScore: number;
  createdAt: string;
}

interface QuizListProps {
  quizzes: Quiz[];
  videos: Video[];
  onDelete: (id: number) => void;
  onUpdate: (quiz: { title: string; videoId: string }, id: number) => void;
}

const QuizList: React.FC<QuizListProps> = ({ quizzes, videos, onDelete, onUpdate }) => {
  const [editingQuiz, setEditingQuiz] = useState<null | number>(null);
  const [editForm, setEditForm] = useState({
    title: "",
    videoId: ""
  });

  // Start editing a quiz
  const handleEditStart = (quiz: Quiz) => {
    setEditingQuiz(quiz.id);
    const videoId = videos.find(v => v.title === quiz.videoTitle)?.id.toString() || "";
    setEditForm({
      title: quiz.title,
      videoId: videoId
    });
  };

  // Save edited quiz
  const handleSaveEdit = () => {
    if (editingQuiz !== null) {
      onUpdate(editForm, editingQuiz);
      setEditingQuiz(null);
    }
  };

  return (
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
          {quizzes.map((quiz) => (
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
                    {videos.map((video) => (
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
                    <Button variant="ghost" size="sm" onClick={() => onDelete(quiz.id)}>
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
  );
};

export default QuizList;
