
import { useState, useEffect } from 'react';
import VideoCard from './VideoCard';
import { getVideos } from '@/lib/api';
import { Button } from '@/components/ui/button';

interface VideoGridProps {
  onVideoSelect?: (videoId: string) => void;
  limit?: number;
}

const VideoGrid = ({ onVideoSelect, limit }: VideoGridProps) => {
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);

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

  // Extract unique departments from videos
  const departments = [...new Set(videos.map(video => video.department))].filter(Boolean);

  // Filter videos by selected department
  const filteredVideos = selectedDepartment 
    ? videos.filter(video => video.department === selectedDepartment)
    : videos;

  // Apply limit if provided
  const displayedVideos = limit 
    ? filteredVideos.slice(0, limit) 
    : filteredVideos;

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 animate-pulse">
        {[...Array(limit || 10)].map((_, index) => (
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
    <div>
      {/* Department filter buttons */}
      {departments.length > 0 && (
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
                onClick={() => setSelectedDepartment(department as string)}
              >
                {department}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Videos grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {displayedVideos.map((video, index) => (
          <VideoCard 
            key={video.id}
            id={video.id}
            thumbnail={video.thumbnail}
            title={video.title}
            views={video.views}
            uploadTime={video.uploadTime}
            department={video.department}
            topic={video.topic}
            channel={video.channel}
            index={index}
            onClick={onVideoSelect}
          />
        ))}
      </div>
    </div>
  );
};

export default VideoGrid;
