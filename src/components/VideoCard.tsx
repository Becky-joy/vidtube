
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface VideoCardProps {
  id: string;
  thumbnail: string;
  title: string;
  views: string;
  uploadTime: string;
  channel: {
    name: string;
    avatar: string;
  };
  index: number;
}

const VideoCard = ({ id, thumbnail, title, views, uploadTime, channel, index }: VideoCardProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  // Staggered animation delay based on index
  const animationDelay = `${100 * (index % 8)}ms`;

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div 
      className={cn(
        "video-card animate-fade-in",
        !isLoaded && "animate-pulse-gentle"
      )}
      style={{ animationDelay }}
    >
      <div className="relative">
        <img 
          src={thumbnail} 
          alt={title}
          className="video-thumbnail"
          onLoad={handleImageLoad}
          loading="lazy"
        />
        <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1 rounded">
          15:36
        </div>
      </div>

      <div className="p-3 flex">
        <div className="mr-3 flex-shrink-0">
          <div className="w-9 h-9 rounded-full overflow-hidden bg-vidtube-gray">
            <img 
              src={channel.avatar} 
              alt={channel.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div>
          <h3 className="font-medium text-sm line-clamp-2 mb-1">{title}</h3>
          <p className="text-vidtube-lightgray text-xs">{channel.name}</p>
          <p className="text-vidtube-lightgray text-xs">{views} • {uploadTime}</p>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
