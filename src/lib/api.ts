
// Mock data
const programmingLanguages = [
  'JavaScript', 'Python', 'Java', 'C++', 'Ruby', 'Swift', 'PHP', 
  'TypeScript', 'Scala', 'Go', 'Perl', 'Kotlin', 'Rust', 'Bash'
];

// Generate random avatars
export const getRandomAvatar = (seed: string) => `https://api.dicebear.com/7.x/initials/svg?seed=${seed}`;

// Random video thumbnails related to programming
const codingThumbnails = [
  '/lovable-uploads/cab83dfd-f819-4d1e-be2c-db1580947a17.png',
  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=600&h=350',
  'https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&q=80&w=600&h=350',
  'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?auto=format&fit=crop&q=80&w=600&h=350',
  'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=600&h=350',
  'https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?auto=format&fit=crop&q=80&w=600&h=350'
];

// Generate a mock video
const generateMockVideo = (id: number) => {
  const lang1 = programmingLanguages[Math.floor(Math.random() * programmingLanguages.length)];
  const lang2 = programmingLanguages[Math.floor(Math.random() * programmingLanguages.length)];
  
  return {
    id: `video-${id}`,
    title: `Best channel to learn coding that will help you be a web developer using ${lang1} and ${lang2}`,
    thumbnail: codingThumbnails[id % codingThumbnails.length],
    views: '15k views',
    uploadTime: '2 days ago',
    channel: {
      name: 'Programming Expert',
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
