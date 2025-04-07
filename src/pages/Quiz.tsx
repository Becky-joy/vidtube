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
  department: string;
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
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const { toast } = useToast();
  
  const quizCategories: QuizCategory[] = [
    {
      id: "javascript",
      title: "JavaScript Fundamentals",
      description: "Test your knowledge of JavaScript basics including variables, functions, objects, and modern ES6+ features.",
      questions: 5,
      timeInMinutes: 15,
      difficulty: "beginner",
      icon: <BookOpen className="h-5 w-5" />,
      department: "Software Engineering"
    },
    {
      id: "html-css",
      title: "HTML & CSS",
      description: "Test your frontend development skills with questions on HTML5 semantic elements, CSS selectors, Flexbox, and Grid.",
      questions: 5,
      timeInMinutes: 20,
      difficulty: "beginner",
      icon: <Flag className="h-5 w-5" />,
      department: "Software Engineering"
    },
    {
      id: "react",
      title: "React Basics",
      description: "Test your understanding of React components, hooks, state management, and virtual DOM concepts.",
      questions: 5,
      timeInMinutes: 18,
      difficulty: "intermediate",
      icon: <BookOpen className="h-5 w-5" />,
      department: "Software Engineering"
    },
    {
      id: "typescript",
      title: "TypeScript",
      description: "Challenge yourself with questions about TypeScript types, interfaces, generics, and best practices.",
      questions: 5,
      timeInMinutes: 25,
      difficulty: "intermediate",
      icon: <BookOpen className="h-5 w-5" />,
      department: "Software Engineering"
    },
    {
      id: "backend",
      title: "Backend Development",
      description: "Test your knowledge of server-side concepts, RESTful APIs, databases, and authentication.",
      questions: 5,
      timeInMinutes: 30,
      difficulty: "advanced",
      icon: <Flag className="h-5 w-5" />,
      department: "Software Engineering"
    },
    {
      id: "algorithms",
      title: "Data Structures & Algorithms",
      description: "Challenge yourself with common algorithm problems, time complexity analysis, and data structures.",
      questions: 5,
      timeInMinutes: 40,
      difficulty: "advanced",
      icon: <Award className="h-5 w-5" />,
      department: "Software Engineering"
    },
    {
      id: "finance",
      title: "Financial Analysis",
      description: "Test your knowledge of financial statements, ratios, and business valuation techniques.",
      questions: 5,
      timeInMinutes: 20,
      difficulty: "intermediate",
      icon: <BookOpen className="h-5 w-5" />,
      department: "Business"
    },
    {
      id: "marketing",
      title: "Marketing Strategies",
      description: "Challenge yourself with questions about marketing channels, consumer behavior, and brand positioning.",
      questions: 5,
      timeInMinutes: 15,
      difficulty: "beginner",
      icon: <Flag className="h-5 w-5" />,
      department: "Business"
    },
    {
      id: "leadership",
      title: "Leadership Skills",
      description: "Evaluate your understanding of team management, conflict resolution, and organizational behavior.",
      questions: 5,
      timeInMinutes: 25,
      difficulty: "advanced",
      icon: <Award className="h-5 w-5" />,
      department: "Business"
    },
    {
      id: "anatomy",
      title: "Human Anatomy",
      description: "Test your knowledge of human body systems, organs, and their functions.",
      questions: 5,
      timeInMinutes: 30,
      difficulty: "intermediate",
      icon: <BookOpen className="h-5 w-5" />,
      department: "Medical"
    },
    {
      id: "pharmacology",
      title: "Basic Pharmacology",
      description: "Challenge yourself with questions about drug classifications, mechanisms, and clinical applications.",
      questions: 5,
      timeInMinutes: 35,
      difficulty: "advanced",
      icon: <Flag className="h-5 w-5" />,
      department: "Medical"
    },
    {
      id: "patient-care",
      title: "Patient Care Essentials",
      description: "Test your understanding of basic patient assessment, vital signs, and care procedures.",
      questions: 5,
      timeInMinutes: 20,
      difficulty: "beginner",
      icon: <Award className="h-5 w-5" />,
      department: "Medical"
    },
    {
      id: "crop-science",
      title: "Crop Production",
      description: "Test your knowledge of crop varieties, growth cycles, and cultivation techniques.",
      questions: 5,
      timeInMinutes: 20,
      difficulty: "intermediate",
      icon: <BookOpen className="h-5 w-5" />,
      department: "Agricultural"
    },
    {
      id: "soil-management",
      title: "Soil Sciences",
      description: "Challenge yourself with questions about soil composition, fertility, and conservation practices.",
      questions: 5,
      timeInMinutes: 25,
      difficulty: "intermediate",
      icon: <Flag className="h-5 w-5" />,
      department: "Agricultural"
    },
    {
      id: "supply-chain",
      title: "Supply Chain Management",
      description: "Test your knowledge of supply chain processes, optimization techniques, and logistics planning.",
      questions: 5,
      timeInMinutes: 30,
      difficulty: "advanced",
      icon: <BookOpen className="h-5 w-5" />,
      department: "Logistics & Transport"
    },
    {
      id: "warehouse",
      title: "Warehouse Operations",
      description: "Challenge yourself with questions about inventory management, warehouse layout, and material handling.",
      questions: 5,
      timeInMinutes: 20,
      difficulty: "beginner",
      icon: <Flag className="h-5 w-5" />,
      department: "Logistics & Transport"
    }
  ];
  
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
    ],
    "finance": [
      {
        id: "fin1",
        question: "Which financial statement shows the company's revenues and expenses?",
        options: ["Balance Sheet", "Income Statement", "Cash Flow Statement", "Statement of Owner's Equity"],
        correctAnswer: 1
      },
      {
        id: "fin2",
        question: "What is the formula for calculating Return on Investment (ROI)?",
        options: [
          "Revenue - Expenses", 
          "(Net Profit / Cost of Investment) × 100", 
          "Assets - Liabilities", 
          "Gross Profit / Revenue × 100"
        ],
        correctAnswer: 1
      },
      {
        id: "fin3",
        question: "Which ratio measures a company's ability to pay short-term obligations?",
        options: ["Debt-to-Equity Ratio", "Price-to-Earnings Ratio", "Current Ratio", "Gross Profit Margin"],
        correctAnswer: 2
      },
      {
        id: "fin4",
        question: "What does EBITDA stand for?",
        options: [
          "Earnings Before Interest, Taxes, Depreciation, and Amortization", 
          "Equity Before Interest, Taxes, Dividends, and Assets", 
          "Earnings Based In Total Deductable Assets", 
          "Expected Business Income Through Direct Assets"
        ],
        correctAnswer: 0
      },
      {
        id: "fin5",
        question: "Which valuation method uses discounted expected future cash flows?",
        options: ["Book Value Method", "Market Capitalization", "Discounted Cash Flow (DCF)", "Comparable Company Analysis"],
        correctAnswer: 2
      }
    ],
    "marketing": [
      {
        id: "mkt1",
        question: "What are the 4 Ps of Marketing?",
        options: [
          "Product, Price, Place, Promotion", 
          "People, Process, Product, Performance", 
          "Plan, Prepare, Publish, Promote", 
          "Performance, Profit, Potential, Position"
        ],
        correctAnswer: 0
      },
      {
        id: "mkt2",
        question: "Which marketing concept focuses on satisfying customer needs better than competitors?",
        options: ["Production Concept", "Product Concept", "Selling Concept", "Marketing Concept"],
        correctAnswer: 3
      },
      {
        id: "mkt3",
        question: "What is market segmentation?",
        options: [
          "Dividing the market into distinct groups with similar needs", 
          "Analyzing competitors in the market", 
          "Setting prices according to market demand", 
          "Distributing products to different markets"
        ],
        correctAnswer: 0
      },
      {
        id: "mkt4",
        question: "Which digital marketing metric measures the percentage of visitors who take a desired action?",
        options: ["Click-through Rate (CTR)", "Bounce Rate", "Conversion Rate", "Cost Per Click (CPC)"],
        correctAnswer: 2
      },
      {
        id: "mkt5",
        question: "What is a USP in marketing?",
        options: [
          "Unified Sales Process", 
          "Unique Selling Proposition", 
          "Universal Standard Pricing", 
          "Ultimate Strategic Plan"
        ],
        correctAnswer: 1
      }
    ],
    "leadership": [
      {
        id: "lead1",
        question: "Which leadership style involves making decisions with team input?",
        options: ["Autocratic", "Laissez-faire", "Democratic", "Transactional"],
        correctAnswer: 2
      },
      {
        id: "lead2",
        question: "What theory suggests that leaders are born, not made?",
        options: ["Trait Theory", "Situational Theory", "Behavioral Theory", "Transformational Theory"],
        correctAnswer: 0
      },
      {
        id: "lead3",
        question: "Which conflict resolution strategy aims to find a solution that fully satisfies all parties?",
        options: ["Avoiding", "Competing", "Compromising", "Collaborating"],
        correctAnswer: 3
      },
      {
        id: "lead4",
        question: "What does emotional intelligence in leadership primarily involve?",
        options: [
          "Technical expertise", 
          "Understanding and managing emotions", 
          "IQ and logical reasoning", 
          "Formal authority and position power"
        ],
        correctAnswer: 1
      },
      {
        id: "lead5",
        question: "Which leadership approach focuses on inspiring followers through vision and charisma?",
        options: ["Bureaucratic Leadership", "Servant Leadership", "Transformational Leadership", "Transactional Leadership"],
        correctAnswer: 2
      }
    ],
    "anatomy": [
      {
        id: "anat1",
        question: "Which organ is part of both the digestive and respiratory systems?",
        options: ["Liver", "Lungs", "Pharynx", "Stomach"],
        correctAnswer: 2
      },
      {
        id: "anat2",
        question: "What is the largest organ in the human body?",
        options: ["Heart", "Liver", "Skin", "Brain"],
        correctAnswer: 2
      },
      {
        id: "anat3",
        question: "Which chamber of the heart pumps oxygenated blood to the body?",
        options: ["Right Atrium", "Right Ventricle", "Left Atrium", "Left Ventricle"],
        correctAnswer: 3
      },
      {
        id: "anat4",
        question: "Which of the following is NOT part of the central nervous system?",
        options: ["Brain", "Spinal Cord", "Peripheral Nerves", "Cerebrospinal Fluid"],
        correctAnswer: 2
      },
      {
        id: "anat5",
        question: "Which gland regulates metabolism, growth, and development?",
        options: ["Pituitary", "Adrenal", "Thyroid", "Pancreas"],
        correctAnswer: 2
      }
    ],
    "pharmacology": [
      {
        id: "pharm1",
        question: "Which class of medications is primarily used to reduce fever and pain?",
        options: ["Antibiotics", "Antihistamines", "Analgesics", "Antidepressants"],
        correctAnswer: 2
      },
      {
        id: "pharm2",
        question: "What is the mechanism of action for beta-blocker medications?",
        options: [
          "Block calcium channels", 
          "Block beta-adrenergic receptors", 
          "Inhibit ACE enzyme", 
          "Block histamine receptors"
        ],
        correctAnswer: 1
      },
      {
        id: "pharm3",
        question: "Which route of administration provides the fastest systemic effect?",
        options: ["Oral", "Topical", "Intravenous", "Intramuscular"],
        correctAnswer: 2
      },
      {
        id: "pharm4",
        question: "What does the term 'half-life' refer to in pharmacology?",
        options: [
          "Time for drug to reach maximum concentration", 
          "Time for drug to be absorbed", 
          "Time for drug concentration to decrease by 50%", 
          "Time for drug to be completely eliminated"
        ],
        correctAnswer: 2
      },
      {
        id: "pharm5",
        question: "Which of the following is a common side effect of opioid analgesics?",
        options: ["Hypertension", "Respiratory depression", "Increased alertness", "Diarrhea"],
        correctAnswer: 1
      }
    ],
    "patient-care": [
      {
        id: "pc1",
        question: "What is the normal resting heart rate for adults?",
        options: ["40-60 bpm", "60-100 bpm", "100-120 bpm", "120-140 bpm"],
        correctAnswer: 1
      },
      {
        id: "pc2",
        question: "Which position is typically used for patients with respiratory distress?",
        options: ["Supine", "Prone", "Fowler's", "Trendelenburg"],
        correctAnswer: 2
      },
      {
        id: "pc3",
        question: "What is the purpose of the Glasgow Coma Scale?",
        options: [
          "Assess pain levels", 
          "Measure neurological status", 
          "Evaluate respiratory function", 
          "Screen for depression"
        ],
        correctAnswer: 1
      },
      {
        id: "pc4",
        question: "Which vital sign is often called the 'fifth vital sign'?",
        options: ["Blood Pressure", "Pain", "Oxygen Saturation", "Body Mass Index"],
        correctAnswer: 1
      },
      {
        id: "pc5",
        question: "What does the abbreviation 'NPO' mean in patient care?",
        options: ["Normal Procedure Ordered", "No Procedures Ordered", "Nothing By Mouth", "New Patient Orientation"],
        correctAnswer: 2
      }
    ],
    "crop-science": [
      {
        id: "crop1",
        question: "Which of these is NOT a cereal crop?",
        options: ["Wheat", "Barley", "Soybean", "Rice"],
        correctAnswer: 2
      },
      {
        id: "crop2",
        question: "What is crop rotation primarily used for?",
        options: [
          "To increase soil fertility", 
          "To reduce pests and diseases", 
          "To maximize water usage", 
          "Both A and B"
        ],
        correctAnswer: 3
      },
      {
        id: "crop3",
        question: "Which nutrient is primarily responsible for leaf growth in plants?",
        options: ["Nitrogen", "Phosphorus", "Potassium", "Calcium"],
        correctAnswer: 0
      },
      {
        id: "crop4",
        question: "What is the process by which plants make their own food called?",
        options: ["Respiration", "Transpiration", "Photosynthesis", "Germination"],
        correctAnswer: 2
      },
      {
        id: "crop5",
        question: "Which farming method involves growing plants in nutrient solutions rather than soil?",
        options: ["Organic farming", "Hydroponics", "Permaculture", "Crop rotation"],
        correctAnswer: 1
      }
    ],
    "soil-management": [
      {
        id: "soil1",
        question: "What is the ideal pH range for most crops?",
        options: ["3.0-4.0", "5.5-7.0", "8.0-9.0", "10.0-12.0"],
        correctAnswer: 1
      },
      {
        id: "soil2",
        question: "Which of the following is NOT a major component of soil?",
        options: ["Minerals", "Organic matter", "Air", "Chlorophyll"],
        correctAnswer: 3
      },
      {
        id: "soil3",
        question: "What is soil erosion?",
        options: [
          "Addition of nutrients to soil", 
          "Removal of topsoil by wind or water", 
          "Compaction of soil", 
          "Conversion of soil to desert"
        ],
        correctAnswer: 1
      },
      {
        id: "soil4",
        question: "Which practice helps prevent soil erosion?",
        options: ["Deep tilling", "Contour farming", "Monocropping", "Removal of vegetation"],
        correctAnswer: 1
      },
      {
        id: "soil5",
        question: "What does soil texture refer to?",
        options: [
          "The color of soil", 
          "The temperature of soil", 
          "The proportion of sand, silt, and clay", 
          "The amount of organic matter"
        ],
        correctAnswer: 2
      }
    ],
    "supply-chain": [
      {
        id: "sc1",
        question: "What does JIT stand for in logistics?",
        options: ["Job In Transit", "Just In Time", "Join Internal Transport", "Junction Inventory Tracking"],
        correctAnswer: 1
      },
      {
        id: "sc2",
        question: "Which of the following is NOT a key component of supply chain management?",
        options: ["Planning", "Sourcing", "Marketing", "Delivery"],
        correctAnswer: 2
      },
      {
        id: "sc3",
        question: "What is the bullwhip effect in supply chain management?",
        options: [
          "A rapid delivery system", 
          "Increasing swings in inventory in response to demand changes", 
          "A method of inventory control", 
          "A transport scheduling technique"
        ],
        correctAnswer: 1
      },
      {
        id: "sc4",
        question: "What does FIFO stand for in inventory management?",
        options: ["Fast In, Fast Out", "First In, First Out", "Final Inventory For Output", "Fixed Input, Flexible Output"],
        correctAnswer: 1
      },
      {
        id: "sc5",
        question: "Which of the following is a benefit of cross-docking?",
        options: [
          "Increased inventory storage", 
          "Reduced handling and storage time", 
          "Simplified supplier relationships", 
          "Decreased transportation needs"
        ],
        correctAnswer: 1
      }
    ],
    "warehouse": [
      {
        id: "wh1",
        question: "What is an SKU in warehouse management?",
        options: ["Stored Kinetic Unit", "Stock Keeping Unit", "Supply Knowledge Update", "Standard Kit Utility"],
        correctAnswer: 1
      },
      {
        id: "wh2",
        question: "Which warehouse layout typically allows for the most efficient use of space?",
        options: ["U-shaped flow", "Straight-line flow", "L-shaped flow", "Random flow"],
        correctAnswer: 0
      },
      {
        id: "wh3",
        question: "What is the purpose of a WMS in logistics?",
        options: [
          "Worker Management System for staff scheduling", 
          "Warehouse Maintenance System for equipment upkeep", 
          "Warehouse Management System for inventory control", 
          "Waste Minimization Strategy for reducing waste"
        ],
        correctAnswer: 2
      },
      {
        id: "wh4",
        question: "Which picking method involves retrieving items for multiple orders in a single trip?",
        options: ["Piece picking", "Zone picking", "Batch picking", "Wave picking"],
        correctAnswer: 2
      },
      {
        id: "wh5",
        question: "What is the primary purpose of pallet racking in a warehouse?",
        options: [
          "To organize administrative documents", 
          "To maximize vertical storage space", 
          "To separate different shipping zones", 
          "To provide workspace for employees"
        ],
        correctAnswer: 1
      }
    ]
  };
  
  const departments = [...new Set(quizCategories.map(quiz => quiz.department))];
  
  const filteredQuizzes = selectedDepartment 
    ? quizCategories.filter(quiz => quiz.department === selectedDepartment)
    : quizCategories;
  
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
    
    const newUserAnswers = [...userAnswers];
    newUserAnswers[currentQuestionIndex] = selectedOption;
    setUserAnswers(newUserAnswers);
    
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
    
    const questions = quizQuestions[selectedCategory];
    let correctCount = 0;
    
    finalAnswers.forEach((answer, index) => {
      if (answer === questions[index].correctAnswer) {
        correctCount++;
      }
    });
    
    const endTime = new Date();
    const timeTaken = Math.floor((endTime.getTime() - quizStartTime.getTime()) / 1000);
    
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
            
            <div className="mb-6 overflow-x-auto">
              <div className="flex space-x-2 pb-2 min-w-max">
                <Button 
                  variant={selectedDepartment === null ? "default" : "outline"}
                  className="rounded-full"
                  onClick={() => setSelectedDepartment(null)}
                >
                  All Departments
                </Button>
                {departments.map((department) => (
                  <Button 
                    key={department} 
                    variant={selectedDepartment === department ? "default" : "outline"}
                    className="rounded-full"
                    onClick={() => setSelectedDepartment(department)}
                  >
                    {department}
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredQuizzes.map((quiz) => (
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
                    <div className="flex flex-col space-y-2">
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
                      <Badge variant="outline" className="w-fit">
                        {quiz.department}
                      </Badge>
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
                            <Badge variant="outline" className="mt-1">{category?.department}</Badge>
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
