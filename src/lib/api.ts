// Mock data
const programmingLanguages = [
  'JavaScript', 'Python', 'Java', 'C++', 'Ruby', 'Swift', 'PHP', 
  'TypeScript', 'Scala', 'Go', 'Perl', 'Kotlin', 'Rust', 'Bash'
];

// Generate random avatars
const getRandomAvatar = (seed: string) => `https://api.dicebear.com/7.x/initials/svg?seed=${seed}`;

// Random video thumbnails related to programming
const codingThumbnails = [
  '/lovable-uploads/cab83dfd-f819-4d1e-be2c-db1580947a17.png',
  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=600&h=350',
  'https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&q=80&w=600&h=350',
  'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?auto=format&fit=crop&q=80&w=600&h=350',
  'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=600&h=350',
  'https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?auto=format&fit=crop&q=80&w=600&h=350'
];

// YouTube video IDs for programming tutorials
const youtubeVideoIds = [
  'W6NZfCO5SIk', // JavaScript Tutorial for Beginners
  'rfscVS0vtbw', // Python Tutorial for Beginners
  'eIrMbAQSU34', // Java Tutorial for Beginners
  'vLnPwxZdW4Y', // C++ Tutorial for Beginners
  'fR9jY_vAA64', // Ruby Tutorial for Beginners
  'comQ1-x2a1Q', // Swift Tutorial for Beginners
  '1SnPKhCdlsU', // PHP Tutorial for Beginners
  '30LWjhZzg50', // TypeScript Tutorial for Beginners
  'pMYg2k-V3_M', // Scala Tutorial for Beginners
  'YS4e4q9oBaU', // Go Tutorial for Beginners
  'WBupia9oidU', // Perl Tutorial for Beginners
  'F9UC9DY-vIU', // Kotlin Tutorial for Beginners
  'zF34dRivLOw', // Rust Tutorial for Beginners
  'oxuRxZBK9QA'  // Bash Tutorial for Beginners
];

// Generate a mock video
const generateMockVideo = (id: number) => {
  const lang1 = programmingLanguages[Math.floor(Math.random() * programmingLanguages.length)];
  const lang2 = programmingLanguages[Math.floor(Math.random() * programmingLanguages.length)];
  const youtubeId = youtubeVideoIds[id % youtubeVideoIds.length];
  
  return {
    id: `video-${id}`,
    title: `Best channel to learn coding that will help you be a web developer using ${lang1} and ${lang2}`,
    thumbnail: codingThumbnails[id % codingThumbnails.length],
    youtubeId: youtubeId,
    youtubeUrl: `https://www.youtube.com/watch?v=${youtubeId}`,
    views: '15k views',
    uploadTime: '2 days ago',
    channel: {
      name: 'Programming Expert',
      avatar: getRandomAvatar(`channel-${id}`),
      subscribers: '250K'
    },
    likes: Math.floor(Math.random() * 15000),
    dislikes: Math.floor(Math.random() * 500),
    comments: [],
    duration: '15:36'
  };
};

// Storage for comments and likes - this will reset on page refresh since it's not persistent
const videoStorage = new Map();

// Mock API function to get videos
export const getVideos = async (searchQuery?: string) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Generate 20 mock videos
  const videos = Array.from({ length: 20 }, (_, i) => {
    // Get video from storage or generate a new one
    const videoId = `video-${i}`;
    if (!videoStorage.has(videoId)) {
      videoStorage.set(videoId, generateMockVideo(i));
    }
    return videoStorage.get(videoId);
  });

  // If search query is provided, filter videos
  if (searchQuery && searchQuery.trim() !== '') {
    const query = searchQuery.toLowerCase();
    return videos.filter(video => 
      video.title.toLowerCase().includes(query) || 
      video.channel.name.toLowerCase().includes(query)
    );
  }
  
  return videos;
};

// Mock API function to get video by ID
export const getVideoById = async (id: string) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // If video exists in storage, return it
  if (videoStorage.has(id)) {
    return videoStorage.get(id);
  }
  
  // Otherwise, generate a new one
  const videoId = parseInt(id.replace('video-', ''), 10);
  const video = generateMockVideo(videoId);
  videoStorage.set(id, video);
  return video;
};

// Add a comment to a video
export const addComment = async (videoId: string, comment: { text: string, username: string }) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const video = await getVideoById(videoId);
  if (!video.comments) {
    video.comments = [];
  }
  
  const newComment = {
    id: `comment-${Date.now()}`,
    text: comment.text,
    username: comment.username,
    avatar: getRandomAvatar(comment.username),
    timestamp: new Date().toISOString(),
    likes: 0
  };
  
  video.comments.unshift(newComment);
  videoStorage.set(videoId, video);
  
  return newComment;
};

// Like or dislike a video
export const likeVideo = async (videoId: string, isLike: boolean) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200));
  
  const video = await getVideoById(videoId);
  
  if (isLike) {
    video.likes += 1;
  } else {
    video.dislikes += 1;
  }
  
  videoStorage.set(videoId, video);
  return { likes: video.likes, dislikes: video.dislikes };
};

// Search videos by query
export const searchVideos = async (query: string) => {
  return getVideos(query);
};
