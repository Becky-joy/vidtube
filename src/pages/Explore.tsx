
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Book, BookOpen, Play, Search, ArrowRight, Clock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  department: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  lessons: number;
  image: string;
}

const Explore = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const departments = [
    'Software Engineering', 
    'Business', 
    'Medical', 
    'Agricultural', 
    'Logistics & Transport'
  ];
  
  const departmentCategories: { [key: string]: string[] } = {
    'Software Engineering': ['Web Development', 'Mobile Apps', 'Game Development', 'Data Science', 'Machine Learning', 'DevOps', 'Blockchain', 'Cybersecurity'],
    'Business': ['Accounting', 'Marketing', 'Finance', 'Management'],
    'Medical': ['Clinical Skills', 'Anatomy', 'Pharmacology', 'Patient Care'],
    'Agricultural': ['Crop Science', 'Livestock Management', 'Soil Science', 'Sustainable Farming'],
    'Logistics & Transport': ['Supply Chain', 'Transportation', 'Inventory Management', 'Logistics Planning']
  };
  
  const allCategories = Object.values(departmentCategories).flat();
  
  // Get categories based on selected department
  const getAvailableCategories = () => {
    if (selectedDepartment) {
      return departmentCategories[selectedDepartment] || [];
    }
    return allCategories;
  };

  const handleStartLearning = (course: Course) => {
    toast({
      title: "Starting Course",
      description: `Enrolling in "${course.title}"`,
    });
    // Navigate to course notes page
    navigate(`/course/${course.id}`);
  };

  const handleReadTutorial = (tutorialTitle: string, courseId: string) => {
    toast({
      title: "Opening Tutorial",
      description: `Loading "${tutorialTitle}"`,
    });
    // Navigate to course notes page
    navigate(`/course/${courseId}`);
  };

  const handleDepartmentSelect = (department: string | null) => {
    setSelectedDepartment(department);
    // Reset category selection when department changes
    setSelectedCategory(null);
  };
  
  const courses: Course[] = [
    // Software Engineering Department
    {
      id: 'web-dev-1',
      title: 'Modern JavaScript from Zero to Hero',
      description: 'Master JavaScript fundamentals, ES6+, async programming, and more!',
      category: 'Web Development',
      department: 'Software Engineering',
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
      department: 'Software Engineering',
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
      department: 'Software Engineering',
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
      department: 'Software Engineering',
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
      department: 'Software Engineering',
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
      department: 'Software Engineering',
      level: 'Intermediate',
      duration: '28 hours',
      lessons: 40,
      image: 'https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?auto=format&fit=crop&q=80&w=300&h=200',
    },
    
    // Business Department
    {
      id: 'business-1',
      title: 'Financial Accounting Fundamentals',
      description: 'Master the basics of financial accounting and financial statements.',
      category: 'Accounting',
      department: 'Business',
      level: 'Beginner',
      duration: '20 hours',
      lessons: 32,
      image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=300&h=200',
    },
    {
      id: 'business-2',
      title: 'Digital Marketing Strategy',
      description: 'Learn to create comprehensive digital marketing campaigns across platforms.',
      category: 'Marketing',
      department: 'Business',
      level: 'Intermediate',
      duration: '25 hours',
      lessons: 38,
      image: 'https://images.unsplash.com/photo-1533750516457-a7f992034fec?auto=format&fit=crop&q=80&w=300&h=200',
    },
    {
      id: 'business-3',
      title: 'Investment Management',
      description: 'Understand portfolio theory, asset allocation, and investment strategies.',
      category: 'Finance',
      department: 'Business',
      level: 'Advanced',
      duration: '30 hours',
      lessons: 45,
      image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=300&h=200',
    },
    {
      id: 'business-4',
      title: 'Leadership and Team Management',
      description: 'Develop skills to effectively lead teams and manage organizational change.',
      category: 'Management',
      department: 'Business',
      level: 'Intermediate',
      duration: '22 hours',
      lessons: 36,
      image: 'https://images.unsplash.com/photo-1521791055366-0d553872125f?auto=format&fit=crop&q=80&w=300&h=200',
    },
    
    // Medical Department
    {
      id: 'medical-1',
      title: 'Clinical Assessment Skills',
      description: 'Learn essential clinical assessment techniques and patient evaluation.',
      category: 'Clinical Skills',
      department: 'Medical',
      level: 'Intermediate',
      duration: '28 hours',
      lessons: 42,
      image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=300&h=200',
    },
    {
      id: 'medical-2',
      title: 'Human Anatomy and Physiology',
      description: 'Comprehensive guide to human body structures and functions.',
      category: 'Anatomy',
      department: 'Medical',
      level: 'Beginner',
      duration: '35 hours',
      lessons: 50,
      image: 'https://images.unsplash.com/photo-1564732005956-20420ebdcfe4?auto=format&fit=crop&q=80&w=300&h=200',
    },
    {
      id: 'medical-3',
      title: 'Principles of Pharmacology',
      description: 'Understand drug actions, interactions, and therapeutic applications.',
      category: 'Pharmacology',
      department: 'Medical',
      level: 'Advanced',
      duration: '32 hours',
      lessons: 48,
      image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&q=80&w=300&h=200',
    },
    {
      id: 'medical-4',
      title: 'Patient Care and Communication',
      description: 'Develop effective patient communication and care strategies.',
      category: 'Patient Care',
      department: 'Medical',
      level: 'Intermediate',
      duration: '18 hours',
      lessons: 30,
      image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=300&h=200',
    },
    
    // Agricultural Department
    {
      id: 'agri-1',
      title: 'Modern Crop Production Techniques',
      description: 'Learn advanced methods for sustainable and efficient crop production.',
      category: 'Crop Science',
      department: 'Agricultural',
      level: 'Intermediate',
      duration: '26 hours',
      lessons: 40,
      image: 'https://images.unsplash.com/photo-1592982537447-5f189eee1ce9?auto=format&fit=crop&q=80&w=300&h=200',
    },
    {
      id: 'agri-2',
      title: 'Livestock Health and Management',
      description: 'Comprehensive guide to maintaining healthy livestock and preventing diseases.',
      category: 'Livestock Management',
      department: 'Agricultural',
      level: 'Intermediate',
      duration: '24 hours',
      lessons: 38,
      image: 'https://images.unsplash.com/photo-1594756202469-9ff9799b2e4e?auto=format&fit=crop&q=80&w=300&h=200',
    },
    {
      id: 'agri-3',
      title: 'Soil Science and Management',
      description: 'Understand soil properties, fertility management, and conservation.',
      category: 'Soil Science',
      department: 'Agricultural',
      level: 'Beginner',
      duration: '20 hours',
      lessons: 32,
      image: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&q=80&w=300&h=200',
    },
    {
      id: 'agri-4',
      title: 'Sustainable Agriculture Practices',
      description: 'Learn environmentally friendly farming methods for long-term sustainability.',
      category: 'Sustainable Farming',
      department: 'Agricultural',
      level: 'Advanced',
      duration: '22 hours',
      lessons: 36,
      image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&q=80&w=300&h=200',
    },
    
    // Logistics & Transport Department
    {
      id: 'logistics-1',
      title: 'Supply Chain Management Fundamentals',
      description: 'Master the essentials of modern supply chain management and optimization.',
      category: 'Supply Chain',
      department: 'Logistics & Transport',
      level: 'Beginner',
      duration: '22 hours',
      lessons: 35,
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=300&h=200',
    },
    {
      id: 'logistics-2',
      title: 'Transportation Systems and Networks',
      description: 'Understand the design and management of efficient transportation networks.',
      category: 'Transportation',
      department: 'Logistics & Transport',
      level: 'Intermediate',
      duration: '26 hours',
      lessons: 40,
      image: 'https://images.unsplash.com/photo-1577909659949-5abb1315e832?auto=format&fit=crop&q=80&w=300&h=200',
    },
    {
      id: 'logistics-3',
      title: 'Inventory and Warehouse Management',
      description: 'Learn strategies for optimal inventory control and warehouse operations.',
      category: 'Inventory Management',
      department: 'Logistics & Transport',
      level: 'Intermediate',
      duration: '20 hours',
      lessons: 32,
      image: 'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&q=80&w=300&h=200',
    },
    {
      id: 'logistics-4',
      title: 'Logistics Planning and Strategy',
      description: 'Develop comprehensive logistics strategies for business operations.',
      category: 'Logistics Planning',
      department: 'Logistics & Transport',
      level: 'Advanced',
      duration: '24 hours',
      lessons: 38,
      image: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&q=80&w=300&h=200',
    }
  ];

  // Filter courses based on search, category and department
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory ? course.category === selectedCategory : true;
    const matchesDepartment = selectedDepartment ? course.department === selectedDepartment : true;
    return matchesSearch && matchesCategory && matchesDepartment;
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
            <p className="text-muted-foreground mt-2">Discover courses and tutorials from all departments.</p>
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
        
        {/* Departments */}
        <div className="mb-4 overflow-x-auto">
          <h2 className="text-lg font-semibold mb-2">Departments</h2>
          <div className="flex space-x-2 pb-2 min-w-max">
            <Button 
              variant={selectedDepartment === null ? "default" : "outline"}
              className="rounded-full"
              onClick={() => handleDepartmentSelect(null)}
            >
              All Departments
            </Button>
            {departments.map((department) => (
              <Button 
                key={department} 
                variant={selectedDepartment === department ? "default" : "outline"}
                className="rounded-full"
                onClick={() => handleDepartmentSelect(department)}
              >
                {department}
              </Button>
            ))}
          </div>
        </div>
        
        {/* Categories */}
        <div className="mb-8 overflow-x-auto">
          <h2 className="text-lg font-semibold mb-2">Categories</h2>
          <div className="flex space-x-2 pb-2 min-w-max">
            <Button 
              variant={selectedCategory === null ? "default" : "outline"}
              className="rounded-full"
              onClick={() => setSelectedCategory(null)}
            >
              All Categories
            </Button>
            {getAvailableCategories().map((category) => (
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
                  <div className="mb-2">
                    <Badge variant="secondary">{course.department}</Badge>
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
                  <Button 
                    className="w-full" 
                    variant="outline"
                    onClick={() => handleStartLearning(course)}
                  >
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
              <Badge variant="secondary" className="mb-2 ml-2">Software Engineering</Badge>
              <h3 className="font-medium mb-1">Building a REST API with Node.js and Express</h3>
              <p className="text-sm text-muted-foreground mb-3">Learn how to build a scalable REST API using Node.js and Express.</p>
              <Button 
                variant="link" 
                className="p-0 h-auto text-vidtube-blue"
                onClick={() => handleReadTutorial("Building a REST API with Node.js and Express", "se-1")}
              >
                Read Tutorial →
              </Button>
            </div>
            <div className="border rounded-lg p-4 hover:bg-accent/20 transition-colors">
              <Badge variant="outline" className="mb-2">Tutorial</Badge>
              <Badge variant="secondary" className="mb-2 ml-2">Business</Badge>
              <h3 className="font-medium mb-1">Financial Statement Analysis for Beginners</h3>
              <p className="text-sm text-muted-foreground mb-3">Learn how to analyze and interpret financial statements for business decisions.</p>
              <Button 
                variant="link" 
                className="p-0 h-auto text-vidtube-blue"
                onClick={() => handleReadTutorial("Financial Statement Analysis for Beginners", "business-1")}
              >
                Read Tutorial →
              </Button>
            </div>
            <div className="border rounded-lg p-4 hover:bg-accent/20 transition-colors">
              <Badge variant="outline" className="mb-2">Tutorial</Badge>
              <Badge variant="secondary" className="mb-2 ml-2">Medical</Badge>
              <h3 className="font-medium mb-1">Basic Vital Signs Assessment</h3>
              <p className="text-sm text-muted-foreground mb-3">A step-by-step guide to accurately measuring and interpreting vital signs.</p>
              <Button 
                variant="link" 
                className="p-0 h-auto text-vidtube-blue"
                onClick={() => handleReadTutorial("Basic Vital Signs Assessment", "medical-1")}
              >
                Read Tutorial →
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Explore;
