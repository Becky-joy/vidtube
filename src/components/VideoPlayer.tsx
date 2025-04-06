
import { 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { useQuery } from '@tanstack/react-query';
import { getVideoById } from '@/lib/api';
import { X } from 'lucide-react';

interface VideoPlayerProps {
  videoId: string;
  onClose: () => void;
}

const VideoPlayer = ({ videoId, onClose }: VideoPlayerProps) => {
  const { data: video, isLoading } = useQuery({
    queryKey: ['video', videoId],
    queryFn: () => getVideoById(videoId),
  });

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
      </div>
    </DialogContent>
  );
};

export default VideoPlayer;
