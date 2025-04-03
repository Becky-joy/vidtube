
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Quiz = () => {
  return (
    <Layout>
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-6">Quiz Section</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>JavaScript Fundamentals</CardTitle>
              <CardDescription>Test your knowledge of JavaScript basics</CardDescription>
            </CardHeader>
            <CardContent>
              <p>10 questions • 15 minutes</p>
              <button className="mt-4 w-full bg-vidtube-blue text-white py-2 rounded-md hover:bg-blue-600 transition-colors">
                Start Quiz
              </button>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>HTML & CSS</CardTitle>
              <CardDescription>Test your frontend development skills</CardDescription>
            </CardHeader>
            <CardContent>
              <p>15 questions • 20 minutes</p>
              <button className="mt-4 w-full bg-vidtube-blue text-white py-2 rounded-md hover:bg-blue-600 transition-colors">
                Start Quiz
              </button>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>React Basics</CardTitle>
              <CardDescription>Test your understanding of React</CardDescription>
            </CardHeader>
            <CardContent>
              <p>12 questions • 18 minutes</p>
              <button className="mt-4 w-full bg-vidtube-blue text-white py-2 rounded-md hover:bg-blue-600 transition-colors">
                Start Quiz
              </button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Quiz;
