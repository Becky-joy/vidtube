
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LineChart } from "@/components/charts/LineChart";
import { quizAnalyticsData } from "@/data/quizData";

interface Quiz {
  id: number;
  title: string;
  videoTitle: string;
  questions: number;
  completions: number;
  avgScore: number;
  createdAt: string;
}

interface QuizAnalyticsProps {
  quizzes: Quiz[];
}

const QuizAnalytics: React.FC<QuizAnalyticsProps> = ({ quizzes }) => {
  return (
    <>
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
    </>
  );
};

export default QuizAnalytics;
