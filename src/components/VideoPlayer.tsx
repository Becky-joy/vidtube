
import { 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { useQuery } from '@tanstack/react-query';
import { getVideoById } from '@/lib/api';
import { ThumbsUp, ThumbsDown, Share2, MessageSquare, Send, X } from 'lucide-react';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface VideoPlayerProps {
  videoId: string;
  onClose: () => void;
}

interface Comment {
  id: string;
  username: string;
  avatar: string;
  text: string;
  timestamp: string;
}

const VideoPlayer = ({ videoId, onClose }: VideoPlayerProps) => {
  const { toast } = useToast();
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      username: 'CodeMaster',
      avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=CM',
      text: 'Great tutorial! Really helped me understand the concept.',
      timestamp: '2 days ago'
    },
    {
      id: '2',
      username: 'DevLearner',
      avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=DL',
      text: 'Could you make a follow-up on advanced topics?',
      timestamp: '1 day ago'
    }
  ]);

  const { data: video, isLoading } = useQuery({
    queryKey: ['video', videoId],
    queryFn: () => getVideoById(videoId),
  });

  const handleLike = () => {
    if (disliked) setDisliked(false);
    setLiked(!liked);
    
    if (!liked) {
      toast({
        title: "Video liked!",
        description: "Thanks for your feedback",
      });
    }
  };

  const handleDislike = () => {
    if (liked) setLiked(false);
    setDisliked(!disliked);
    
    if (!disliked) {
      toast({
        title: "Video disliked",
        description: "Thanks for your feedback",
      });
    }
  };

  const handleShare = () => {
    toast({
      title: "Share link copied!",
      description: "Video link copied to clipboard",
    });
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    
    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      username: 'Current User',
      avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=CU',
      text: commentText,
      timestamp: 'Just now'
    };
    
    setComments([newComment, ...comments]);
    setCommentText('');
    
    toast({
      title: "Comment added!",
      description: "Your comment has been posted",
    });
  };

  if (isLoading || !video) {
    return (
      <DialogContent className="sm:max-w-[900px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Loading video...</DialogTitle>
        </DialogHeader>
        <div className="animate-pulse bg-vidtube-gray aspect-video rounded-lg"></div>
      </DialogContent>
    );
  }

  return (
    <DialogContent className="sm:max-w-[900px] max-h-[80vh] overflow-y-auto">
      <button 
        onClick={onClose} 
        className="absolute right-4 top-4 z-10 rounded-full bg-black/40 p-1 text-white hover:bg-black/60"
      >
        <X size={18} />
      </button>
      
      <div className="mb-4">
        <AspectRatio ratio={16 / 9}>
          <div className="bg-black w-full h-full flex items-center justify-center rounded-lg overflow-hidden">
            {/* In a real application, this would be an actual video player */}
            <img 
              src={video.thumbnail} 
              alt={video.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white/90 p-4 rounded-lg shadow-lg text-center">
                <p className="font-medium">Video Player Simulation</p>
                <p className="text-sm text-gray-600 mt-1">In a real app, a video would play here</p>
              </div>
            </div>
          </div>
        </AspectRatio>
      </div>

      <div className="px-1">
        <h1 className="text-xl font-bold">{video.title}</h1>
        <div className="flex items-center justify-between my-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <img 
                src={video.channel.avatar} 
                alt={video.channel.name}
                className="w-full h-full object-cover" 
              />
            </div>
            <div>
              <p className="font-medium">{video.channel.name}</p>
              <p className="text-vidtube-lightgray text-xs">250K subscribers</p>
            </div>
          </div>
          <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded-full text-sm font-medium">
            Subscribe
          </button>
        </div>

        {/* Video interactions section */}
        <div className="flex items-center gap-3 my-4 pb-4 border-b border-vidtube-darkgray">
          <button 
            onClick={handleLike}
            className={`flex items-center gap-2 px-4 py-2 rounded-full ${
              liked ? 'bg-blue-100 text-blue-600' : 'bg-vidtube-darkgray hover:bg-vidtube-hover'
            }`}
          >
            <ThumbsUp size={18} className={liked ? 'fill-blue-600' : ''} /> 
            <span>Like</span>
          </button>
          
          <button 
            onClick={handleDislike}
            className={`flex items-center gap-2 px-4 py-2 rounded-full ${
              disliked ? 'bg-blue-100 text-blue-600' : 'bg-vidtube-darkgray hover:bg-vidtube-hover'
            }`}
          >
            <ThumbsDown size={18} className={disliked ? 'fill-blue-600' : ''} /> 
            <span>Dislike</span>
          </button>
          
          <button 
            onClick={handleShare}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-vidtube-darkgray hover:bg-vidtube-hover"
          >
            <Share2 size={18} /> 
            <span>Share</span>
          </button>
        </div>

        <div className="bg-vidtube-darkgray p-3 rounded-lg mt-4">
          <div className="flex gap-3 mb-2">
            <span className="text-sm">{video.views}</span>
            <span className="text-sm">{video.uploadTime}</span>
          </div>
          <p className="text-sm">
            Welcome to this coding tutorial video! Hope you enjoy learning these programming concepts.
            Don't forget to like and subscribe for more content.
          </p>
        </div>
        
        {/* Comments section */}
        <div className="mt-6">
          <div className="flex items-center gap-2 mb-4">
            <MessageSquare size={20} />
            <h2 className="font-medium">{comments.length} Comments</h2>
          </div>
          
          {/* Comment form */}
          <form onSubmit={handleCommentSubmit} className="flex gap-2 mb-6">
            <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
              <img 
                src="https://api.dicebear.com/7.x/initials/svg?seed=CU" 
                alt="Your avatar"
                className="w-full h-full object-cover" 
              />
            </div>
            <div className="flex-1 flex items-center gap-2">
              <Input
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Add a comment..."
                className="flex-1"
              />
              <Button 
                type="submit" 
                size="sm" 
                disabled={!commentText.trim()}
                className="flex-shrink-0"
              >
                <Send size={16} />
              </Button>
            </div>
          </form>
          
          {/* Comments list */}
          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="flex gap-2">
                <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                  <img 
                    src={comment.avatar} 
                    alt={comment.username}
                    className="w-full h-full object-cover" 
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium text-sm">{comment.username}</h4>
                    <span className="text-vidtube-lightgray text-xs">{comment.timestamp}</span>
                  </div>
                  <p className="text-sm mt-1">{comment.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DialogContent>
  );
};

export default VideoPlayer;
