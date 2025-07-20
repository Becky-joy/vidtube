import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { ArrowLeft, BookOpen, Clock, FileText, ChevronRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface Note {
  id: string;
  title: string;
  content: string;
  duration: string;
  completed: boolean;
}

interface CourseContent {
  id: string;
  title: string;
  description: string;
  department: string;
  level: string;
  totalDuration: string;
  notes: Note[];
}

const CourseNotes = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [selectedNote, setSelectedNote] = useState<string | null>(null);

  // Mock course content - in a real app, this would come from an API
  const courseData: { [key: string]: CourseContent } = {
    'se-1': {
      id: 'se-1',
      title: 'React Development Fundamentals',
      description: 'Master the basics of React development including components, hooks, and state management.',
      department: 'Software Engineering',
      level: 'Beginner',
      totalDuration: '25 hours',
      notes: [
        {
          id: 'note-1',
          title: 'Introduction to React',
          content: `# Introduction to React

React is a powerful JavaScript library for building user interfaces, particularly web applications. It was created by Facebook and has become one of the most popular front-end technologies.

## What is React?

React is a declarative, efficient, and flexible JavaScript library for building user interfaces. It lets you compose complex UIs from small and isolated pieces of code called "components."

## Key Concepts

### 1. Components
Components are the building blocks of any React application. They are like JavaScript functions that return HTML elements.

### 2. JSX
JSX is a syntax extension to JavaScript that looks similar to HTML. It makes writing React components more intuitive.

### 3. Virtual DOM
React uses a virtual representation of the DOM to optimize performance and provide a smooth user experience.

## Getting Started

To create a new React application, you can use Create React App:

\`\`\`bash
npx create-react-app my-app
cd my-app
npm start
\`\`\`

This will set up a new React project with all the necessary dependencies and configurations.`,
          duration: '45 min',
          completed: false,
        },
        {
          id: 'note-2',
          title: 'Components and Props',
          content: `# Components and Props

Components are the heart of React applications. They allow you to split the UI into independent, reusable pieces.

## Function Components

The simplest way to define a component is to write a JavaScript function:

\`\`\`jsx
function Welcome(props) {
  return <h1>Hello, {props.name}!</h1>;
}
\`\`\`

## Props

Props (short for "properties") are a way of passing data from parent to child components. They are read-only and help make components reusable.

### Example:

\`\`\`jsx
function UserCard(props) {
  return (
    <div className="user-card">
      <h2>{props.name}</h2>
      <p>{props.email}</p>
      <span>{props.role}</span>
    </div>
  );
}

// Usage
<UserCard name="John Doe" email="john@example.com" role="Developer" />
\`\`\`

## Best Practices

1. Always start component names with a capital letter
2. Keep components small and focused
3. Use descriptive prop names
4. Validate props with PropTypes (optional but recommended)`,
          duration: '60 min',
          completed: false,
        },
        {
          id: 'note-3',
          title: 'State and Hooks',
          content: `# State and Hooks

State allows components to create and manage their own data. Hooks are functions that let you use state and other React features in function components.

## useState Hook

The \`useState\` hook allows you to add state to function components:

\`\`\`jsx
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
\`\`\`

## useEffect Hook

The \`useEffect\` hook lets you perform side effects in function components:

\`\`\`jsx
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = \`You clicked \${count} times\`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
\`\`\`

## Rules of Hooks

1. Only call hooks at the top level
2. Only call hooks from React functions
3. Use the ESLint plugin to enforce these rules`,
          duration: '75 min',
          completed: false,
        },
      ],
    },
    // Add more course content as needed
    default: {
      id: 'default',
      title: 'Course Content',
      description: 'This course contains comprehensive learning materials and notes.',
      department: 'General',
      level: 'All Levels',
      totalDuration: '20 hours',
      notes: [
        {
          id: 'note-default-1',
          title: 'Course Introduction',
          content: `# Welcome to the Course

This course will provide you with comprehensive knowledge and practical skills in your chosen field.

## What You'll Learn

- Core concepts and fundamentals
- Practical applications and examples
- Best practices and industry standards
- Hands-on exercises and projects

## Course Structure

Each lesson is designed to build upon the previous one, ensuring a smooth learning progression.

Take your time with each section and practice the concepts as you go.`,
          duration: '30 min',
          completed: false,
        },
        {
          id: 'note-default-2',
          title: 'Key Concepts',
          content: `# Key Concepts

Understanding the fundamental concepts is crucial for success in this field.

## Important Points

1. **Foundation Knowledge**: Build a strong foundation before moving to advanced topics
2. **Practical Application**: Apply what you learn through exercises
3. **Continuous Learning**: Stay updated with industry trends and best practices

## Next Steps

Continue to the next lesson to dive deeper into specific topics and practical applications.`,
          duration: '45 min',
          completed: false,
        },
      ],
    },
  };

  const course = courseData[courseId || 'default'] || courseData.default;
  const completedNotes = course.notes.filter(note => note.completed).length;
  const progressPercentage = (completedNotes / course.notes.length) * 100;

  const handleNoteClick = (noteId: string) => {
    setSelectedNote(selectedNote === noteId ? null : noteId);
  };

  const toggleNoteCompletion = (noteId: string) => {
    // In a real app, this would update the backend
    const noteIndex = course.notes.findIndex(note => note.id === noteId);
    if (noteIndex !== -1) {
      course.notes[noteIndex].completed = !course.notes[noteIndex].completed;
      setSelectedNote(null); // Refresh the view
      setTimeout(() => setSelectedNote(noteId), 0);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/explore')}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Explore
          </Button>
          
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
              <p className="text-muted-foreground mb-4">{course.description}</p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">{course.department}</Badge>
                <Badge variant="outline">{course.level}</Badge>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="mr-1 h-4 w-4" />
                  {course.totalDuration}
                </div>
              </div>
            </div>
            
            <div className="lg:text-right">
              <div className="text-sm text-muted-foreground mb-2">
                Progress: {completedNotes} of {course.notes.length} completed
              </div>
              <Progress value={progressPercentage} className="w-full lg:w-48" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Notes List */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Course Notes
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-1">
                  {course.notes.map((note, index) => (
                    <button
                      key={note.id}
                      onClick={() => handleNoteClick(note.id)}
                      className={`w-full text-left p-4 hover:bg-accent/50 transition-colors border-b last:border-b-0 ${
                        selectedNote === note.id ? 'bg-accent' : ''
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-medium">
                              {index + 1}. {note.title}
                            </span>
                            {note.completed && (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            )}
                          </div>
                          <div className="text-xs text-muted-foreground flex items-center">
                            <Clock className="mr-1 h-3 w-3" />
                            {note.duration}
                          </div>
                        </div>
                        <ChevronRight className={`h-4 w-4 transition-transform ${
                          selectedNote === note.id ? 'rotate-90' : ''
                        }`} />
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Note Content */}
          <div className="lg:col-span-2">
            {selectedNote ? (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center">
                      <FileText className="mr-2 h-5 w-5" />
                      {course.notes.find(note => note.id === selectedNote)?.title}
                    </CardTitle>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleNoteCompletion(selectedNote)}
                    >
                      {course.notes.find(note => note.id === selectedNote)?.completed 
                        ? 'Mark Incomplete' 
                        : 'Mark Complete'
                      }
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-slate max-w-none dark:prose-invert">
                    <div 
                      dangerouslySetInnerHTML={{
                        __html: course.notes.find(note => note.id === selectedNote)?.content
                          .replace(/^# /gm, '<h1>')
                          .replace(/\n/g, '<br>')
                          .replace(/## /g, '<h2>')
                          .replace(/### /g, '<h3>')
                          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                          .replace(/`([^`]+)`/g, '<code>$1</code>')
                          .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>')
                          || ''
                      }}
                    />
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="flex items-center justify-center h-64">
                  <div className="text-center">
                    <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">Select a Note</h3>
                    <p className="text-muted-foreground">
                      Choose a note from the list to start learning
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CourseNotes;