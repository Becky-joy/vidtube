
// Mock data
const programmingLanguages = [
  'JavaScript', 'Python', 'Java', 'C++', 'Ruby', 'Swift', 'PHP', 
  'TypeScript', 'Scala', 'Go', 'Perl', 'Kotlin', 'Rust', 'Bash'
];

// Departments and their topics
const departmentTopics = {
  'Software Engineering': [
    'Web Development', 'Mobile Development', 'API Design', 'Database Management',
    'UI/UX Design', 'Testing Strategies', 'Cloud Computing', 'DevOps'
  ],
  'Business': [
    'Financial Analysis', 'Marketing Strategy', 'Business Ethics', 'Entrepreneurship',
    'Leadership Skills', 'Project Management', 'Data Analytics', 'Corporate Finance'
  ],
  'Medical': [
    'Patient Care', 'Clinical Procedures', 'Medical Ethics', 'Anatomy',
    'Pharmacology', 'Diagnostic Techniques', 'Healthcare Management', 'Medical Research'
  ],
  'Agricultural': [
    'Crop Production', 'Sustainable Farming', 'Soil Management', 'Irrigation Systems',
    'Livestock Management', 'Agricultural Economics', 'Pest Control', 'Farm Technology'
  ],
  'Logistics & Transport': [
    'Supply Chain Optimization', 'Warehouse Management', 'Transport Networks', 'Inventory Control',
    'Shipping Logistics', 'Fleet Management', 'Distribution Planning', 'Last Mile Delivery'
  ]
};

// Department titles for videos
const departmentTitles = {
  'Software Engineering': [
    'Essential guide to {topic} with {language}',
    'Master {topic} techniques using {language}',
    'Advanced {topic} patterns in {language}',
    'Building robust {topic} systems with {language}'
  ],
  'Business': [
    'Understanding {topic} for modern businesses',
    'Strategic approach to {topic} in today\'s market',
    '{topic}: Best practices for business growth',
    'Implementing effective {topic} frameworks'
  ],
  'Medical': [
    'Comprehensive guide to {topic} in healthcare',
    'Essential {topic} skills for medical professionals',
    'Modern approaches to {topic} in clinical settings',
    '{topic}: Evidence-based practices and procedures'
  ],
  'Agricultural': [
    'Improving {topic} for sustainable agriculture',
    'Modern techniques in {topic} for increased yield',
    '{topic}: From theory to practice for farmers',
    'Advanced {topic} strategies in agricultural science'
  ],
  'Logistics & Transport': [
    'Optimizing {topic} in modern logistics',
    'Effective {topic} strategies for supply chain efficiency',
    'Implementing {topic} solutions in transport networks',
    'Advanced {topic} management for logistics professionals'
  ]
};

// Generate random avatars
export const getRandomAvatar = (seed: string) => `https://api.dicebear.com/7.x/initials/svg?seed=${seed}`;

// Random video thumbnails related to different departments
const departmentThumbnails = {
  'Software Engineering': [
    '/lovable-uploads/cab83dfd-f819-4d1e-be2c-db1580947a17.png',
    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=600&h=350',
    'https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&q=80&w=600&h=350'
  ],
  'Business': [
    'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=600&h=350',
    'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=600&h=350',
    'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=600&h=350'
  ],
  'Medical': [
    'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=600&h=350',
    'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&q=80&w=600&h=350',
    'https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&q=80&w=600&h=350'
  ],
  'Agricultural': [
    'https://images.unsplash.com/photo-1592982537447-5f189eee1ce9?auto=format&fit=crop&q=80&w=600&h=350',
    'https://images.unsplash.com/photo-1594756202469-9ff9799b2e4e?auto=format&fit=crop&q=80&w=600&h=350',
    'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&q=80&w=600&h=350'
  ],
  'Logistics & Transport': [
    'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=600&h=350',
    'https://images.unsplash.com/photo-1494412574745-b2b181c5c9eb?auto=format&fit=crop&q=80&w=600&h=350',
    'https://images.unsplash.com/photo-1565017228812-8c3f485b0d15?auto=format&fit=crop&q=80&w=600&h=350'
  ]
};

// Channel names by department
const channelNames = {
  'Software Engineering': [
    'CodeMasters', 'DevPro Academy', 'TechTutorials', 'Programming Experts', 'ByteCrafters'
  ],
  'Business': [
    'Business Insights', 'MBA Knowledge Hub', 'Finance Mastery', 'Marketing Genius', 'Leadership Academy'
  ],
  'Medical': [
    'MedEd Pro', 'Healthcare Training', 'Clinical Skills Hub', 'Nursing Academy', 'Medical Sciences'
  ],
  'Agricultural': [
    'Modern Farming', 'AgriTech Solutions', 'Sustainable Agriculture', 'Farm Management', 'Crop Science Hub'
  ],
  'Logistics & Transport': [
    'Supply Chain Pro', 'Logistics Academy', 'Transport Solutions', 'Shipping Expertise', 'Warehouse Management'
  ]
};

// Generate a mock video
const generateMockVideo = (id: number) => {
  // Randomly select department
  const departments = Object.keys(departmentTopics);
  const department = departments[Math.floor(Math.random() * departments.length)];
  
  // Select topic from that department
  const topics = departmentTopics[department as keyof typeof departmentTopics];
  const topic = topics[Math.floor(Math.random() * topics.length)];
  
  // For software engineering, include a programming language
  let title = '';
  if (department === 'Software Engineering') {
    const lang = programmingLanguages[Math.floor(Math.random() * programmingLanguages.length)];
    const titleTemplates = departmentTitles[department as keyof typeof departmentTitles];
    const template = titleTemplates[Math.floor(Math.random() * titleTemplates.length)];
    title = template.replace('{topic}', topic).replace('{language}', lang);
  } else {
    const titleTemplates = departmentTitles[department as keyof typeof departmentTitles];
    const template = titleTemplates[Math.floor(Math.random() * titleTemplates.length)];
    title = template.replace('{topic}', topic);
  }
  
  // Get department-specific thumbnails and channel names
  const thumbnails = departmentThumbnails[department as keyof typeof departmentThumbnails];
  const channels = channelNames[department as keyof typeof channelNames];
  
  return {
    id: `video-${id}`,
    title: title,
    thumbnail: thumbnails[id % thumbnails.length],
    views: `${Math.floor(Math.random() * 500) + 5}k views`,
    uploadTime: `${Math.floor(Math.random() * 14) + 1} days ago`,
    department: department,
    topic: topic,
    channel: {
      name: channels[Math.floor(Math.random() * channels.length)],
      avatar: getRandomAvatar(`channel-${id}`),
    },
  };
};

// Mock API function to get videos
export const getVideos = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Generate 20 mock videos
  return Array.from({ length: 20 }, (_, i) => generateMockVideo(i));
};

// Mock API function to get video by ID
export const getVideoById = async (id: string) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const videoId = parseInt(id.replace('video-', ''), 10);
  return generateMockVideo(videoId);
};
