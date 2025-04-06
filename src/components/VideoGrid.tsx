
import { useState, useEffect } from 'react';
import VideoCard from './VideoCard';
import { getVideos } from '@/lib/api';

interface VideoGridProps {
  onVideoSelect?: (videoId: string) => void;
}

const VideoGrid = ({ onVideoSelect }: VideoGridProps) => {
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        const data = await getVideos();
        setVideos(data);
      } catch (error) {
        console.error('Error fetching videos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 animate-pulse">
        {[...Array(10)].map((_, index) => (
          <div key={index} className="video-card">
            <div className="video-thumbnail bg-vidtube-gray"></div>
            <div className="p-3 flex">
              <div className="mr-3">
                <div className="w-9 h-9 rounded-full bg-vidtube-gray"></div>
              </div>
              <div className="flex-1">
                <div className="h-4 bg-vidtube-gray rounded mb-2 w-5/6"></div>
                <div className="h-3 bg-vidtube-gray rounded w-4/6 mb-1"></div>
                <div className="h-3 bg-vidtube-gray rounded w-3/6"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {videos.map((video, index) => (
        <VideoCard 
          key={video.id}
          id={video.id}
          thumbnail={video.thumbnail}
          title={video.title}
          views={video.views}
          uploadTime={video.uploadTime}
          channel={video.channel}
          index={index}
          onClick={onVideoSelect}
        />
      ))}
    </div>
  );
};

export default VideoGrid;
