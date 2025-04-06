
import { useState } from 'react';
import Layout from '@/components/Layout';
import { Book, BookOpen, Play, Search, ArrowRight, Clock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  lessons: number;
  image: string;
}

const Explore = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [
    'Web Development', 'Mobile Apps', 'Game Development', 'Data Science', 
    'Machine Learning', 'DevOps', 'Blockchain', 'Cybersecurity'
  ];
  
  const courses: Course[] = [
    {
      id: 'web-dev-1',
      title: 'Modern JavaScript from Zero to Hero',
      description: 'Master JavaScript fundamentals, ES6+, async programming, and more!',
      category: 'Web Development',
      level: 'Beginner',
      duration: '24 hours',
      lessons: 42,
      image: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?auto=format&fit=crop&q=80&w=300&h=200',
    },
    {
      id: 'web-dev-2',
      title: 'HTML & CSS: Complete Guide',
      description: 'Learn to build responsive, beautiful websites with HTML5 and CSS3.',
      category: 'Web Development',
      level: 'Beginner',
      duration: '18 hours',
      lessons: 36,
      image: 'https://images.unsplash.com/photo-1621839673705-6617adf9e890?auto=format&fit=crop&q=80&w=300&h=200',
    },
    {
      id: 'web-dev-3',
      title: 'React: Build Modern Web Applications',
      description: 'Learn React from scratch, including hooks, context, and state management.',
      category: 'Web Development',
      level: 'Intermediate',
      duration: '30 hours',
      lessons: 48,
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=300&h=200',
    },
    {
      id: 'web-dev-4',
      title: 'TypeScript Essential Training',
      description: 'Add static typing to your JavaScript projects with TypeScript.',
      category: 'Web Development',
      level: 'Intermediate',
      duration: '15 hours',
      lessons: 28,
      image: 'https://images.unsplash.com/photo-1616469829591-ca6523a649ae?auto=format&fit=crop&q=80&w=300&h=200',
    },
    {
      id: 'mobile-1',
      title: 'iOS App Development with Swift',
      description: 'Learn to build native iOS apps using Swift and SwiftUI.',
      category: 'Mobile Apps',
      level: 'Intermediate',
      duration: '32 hours',
      lessons: 45,
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=300&h=200',
    },
    {
      id: 'mobile-2',
      title: 'Android Development with Kotlin',
      description: 'Build Android apps using modern Kotlin programming language.',
      category: 'Mobile Apps',
      level: 'Intermediate',
      duration: '28 hours',
      lessons: 40,
      image: 'https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?auto=format&fit=crop&q=80&w=300&h=200',
    },
    {
      id: 'mobile-3',
      title: 'React Native for Beginners',
      description: 'Build cross-platform mobile apps with React Native.',
      category: 'Mobile Apps',
      level: 'Beginner',
      duration: '20 hours',
      lessons: 32,
      image: 'https://images.unsplash.com/photo-1563203369-26f2e4a5ccf7?auto=format&fit=crop&q=80&w=300&h=200',
    },
    {
      id: 'game-1',
      title: 'Unity Game Development',
      description: 'Create 2D and 3D games with the Unity game engine.',
      category: 'Game Development',
      level: 'Beginner',
      duration: '36 hours',
      lessons: 55,
      image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&q=80&w=300&h=200',
    },
    {
      id: 'game-2',
      title: 'Unreal Engine: Beginner to Advanced',
      description: 'Master Unreal Engine 5 for game development and 3D visualization.',
      category: 'Game Development',
      level: 'Advanced',
      duration: '42 hours',
      lessons: 60,
      image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=300&h=200',
    },
    {
      id: 'data-1',
      title: 'Data Science with Python',
      description: 'Learn data analysis, visualization, and machine learning with Python.',
      category: 'Data Science',
      level: 'Intermediate',
      duration: '32 hours',
      lessons: 48,
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=300&h=200',
    },
    {
      id: 'data-2',
      title: 'SQL Database Design',
      description: 'Master database design, normalization, and SQL queries.',
      category: 'Data Science',
      level: 'Beginner',
      duration: '16 hours',
      lessons: 30,
      image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&q=80&w=300&h=200',
    },
    {
      id: 'ml-1',
      title: 'Machine Learning A-Z',
      description: 'Comprehensive machine learning course covering supervised and unsupervised learning.',
      category: 'Machine Learning',
      level: 'Advanced',
      duration: '44 hours',
      lessons: 65,
      image: 'https://images.unsplash.com/photo-1527430253228-e93688616381?auto=format&fit=crop&q=80&w=300&h=200',
    },
    {
      id: 'ml-2',
      title: 'Deep Learning with TensorFlow',
      description: 'Build neural networks and deep learning models with TensorFlow.',
      category: 'Machine Learning',
      level: 'Advanced',
      duration: '36 hours',
      lessons: 52,
      image: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&q=80&w=300&h=200',
    },
    {
      id: 'devops-1',
      title: 'Docker & Kubernetes: The Complete Guide',
      description: 'Learn containerization and orchestration for modern applications.',
      category: 'DevOps',
      level: 'Intermediate',
      duration: '28 hours',
      lessons: 45,
      image: 'https://images.unsplash.com/photo-1605379399642-870262d3d051?auto=format&fit=crop&q=80&w=300&h=200',
    },
    {
      id: 'devops-2',
      title: 'CI/CD Pipeline Implementation',
      description: 'Set up continuous integration and delivery pipelines for your projects.',
      category: 'DevOps',
      level: 'Advanced',
      duration: '18 hours',
      lessons: 32,
      image: 'https://images.unsplash.com/photo-1620266757065-5814239881fd?auto=format&fit=crop&q=80&w=300&h=200',
    },
    {
      id: 'blockchain-1',
      title: 'Blockchain Development Fundamentals',
      description: 'Learn the basics of blockchain technology and smart contract development.',
      category: 'Blockchain',
      level: 'Beginner',
      duration: '22 hours',
      lessons: 38,
      image: 'https://images.unsplash.com/photo-1639762681057-408e52192e55?auto=format&fit=crop&q=80&w=300&h=200',
    },
    {
      id: 'blockchain-2',
      title: 'Ethereum & Smart Contract Development',
      description: 'Build decentralized applications on the Ethereum blockchain.',
      category: 'Blockchain',
      level: 'Intermediate',
      duration: '26 hours',
      lessons: 42,
      image: 'https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?auto=format&fit=crop&q=80&w=300&h=200',
    },
    {
      id: 'security-1',
      title: 'Ethical Hacking: From Zero to Hero',
      description: 'Learn cybersecurity fundamentals and ethical hacking techniques.',
      category: 'Cybersecurity',
      level: 'Intermediate',
      duration: '30 hours',
      lessons: 48,
      image: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&q=80&w=300&h=200',
    },
    {
      id: 'security-2',
      title: 'Web Application Security',
      description: 'Learn how to secure web applications against common vulnerabilities.',
      category: 'Cybersecurity',
      level: 'Advanced',
      duration: '24 hours',
      lessons: 40,
      image: 'https://images.unsplash.com/photo-1563206767-5b18f218e8de?auto=format&fit=crop&q=80&w=300&h=200',
    }
  ];

  // Filter courses based on search and category
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory ? course.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Intermediate':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'Advanced':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 animate-fade-in">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold">Explore Learning Resources</h1>
            <p className="text-muted-foreground mt-2">Discover new coding tutorials and learning resources.</p>
          </div>
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search courses..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>
        
        {/* Categories */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex space-x-2 pb-2 min-w-max">
            <Button 
              variant={selectedCategory === null ? "default" : "outline"}
              className="rounded-full"
              onClick={() => setSelectedCategory(null)}
            >
              All Categories
            </Button>
            {categories.map((category) => (
              <Button 
                key={category} 
                variant={selectedCategory === category ? "default" : "outline"}
                className="rounded-full"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
        
        {/* Course Grid */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <div key={course.id} className="bg-card rounded-lg overflow-hidden border hover:shadow-md transition-shadow">
                <div className="aspect-video relative overflow-hidden">
                  <img 
                    src={course.image} 
                    alt={course.title} 
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <Button size="sm" variant="secondary" className="flex items-center gap-2">
                      <Play className="h-4 w-4" /> Preview Course
                    </Button>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="outline">{course.category}</Badge>
                    <Badge className={getLevelColor(course.level)}>{course.level}</Badge>
                  </div>
                  <h3 className="font-semibold text-lg mb-1">{course.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{course.description}</p>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <BookOpen className="h-4 w-4 mr-1" />
                      <span>{course.lessons} lessons</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{course.duration}</span>
                    </div>
                  </div>
                </div>
                <div className="px-4 pb-4">
                  <Button className="w-full" variant="outline">
                    Start Learning <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 border rounded-lg">
            <Book className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-medium">No courses found</h3>
            <p className="text-muted-foreground mt-2">Try adjusting your search or filter criteria</p>
          </div>
        )}
        
        {/* Featured Tutorials */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Featured Tutorials</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="border rounded-lg p-4 hover:bg-accent/20 transition-colors">
              <Badge variant="outline" className="mb-2">Tutorial</Badge>
              <h3 className="font-medium mb-1">Building a REST API with Node.js and Express</h3>
              <p className="text-sm text-muted-foreground mb-3">Learn how to build a scalable REST API using Node.js and Express.</p>
              <Button variant="link" className="p-0 h-auto text-vidtube-blue">Read Tutorial →</Button>
            </div>
            <div className="border rounded-lg p-4 hover:bg-accent/20 transition-colors">
              <Badge variant="outline" className="mb-2">Tutorial</Badge>
              <h3 className="font-medium mb-1">Authentication with JWT in React Applications</h3>
              <p className="text-sm text-muted-foreground mb-3">Implement secure authentication using JSON Web Tokens in React.</p>
              <Button variant="link" className="p-0 h-auto text-vidtube-blue">Read Tutorial →</Button>
            </div>
            <div className="border rounded-lg p-4 hover:bg-accent/20 transition-colors">
              <Badge variant="outline" className="mb-2">Tutorial</Badge>
              <h3 className="font-medium mb-1">Introduction to CSS Grid Layout</h3>
              <p className="text-sm text-muted-foreground mb-3">Master CSS Grid for modern responsive web layouts.</p>
              <Button variant="link" className="p-0 h-auto text-vidtube-blue">Read Tutorial →</Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Explore;
