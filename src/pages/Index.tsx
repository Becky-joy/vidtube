
import Layout from '@/components/Layout';
import VideoGrid from '@/components/VideoGrid';
import { useState } from 'react';
import VideoPlayer from '@/components/VideoPlayer';
import { Dialog } from '@/components/ui/dialog';
import { useLocation } from '@/hooks/useLocation';
import { MapPin } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const Index = () => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const { location, loading: locationLoading } = useLocation();
  
  const handleVideoSelect = (videoId: string) => {
    setSelectedVideo(videoId);
  };
  
  const handleCloseVideo = () => {
    setSelectedVideo(null);
  };

  return (
    <Layout>
      <div className="animate-fade-in">
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold">Recommended</h1>
              {locationLoading ? (
                <div className="flex items-center gap-2 mt-1">
                  <Skeleton className="h-3 w-3 rounded-full" />
                  <Skeleton className="h-3 w-32" />
                </div>
              ) : location ? (
                <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                  <MapPin className="h-3 w-3" />
                  Showing content for {location.city}, {location.country}
                </p>
              ) : null}
            </div>
          </div>
          <VideoGrid onVideoSelect={handleVideoSelect} />
        </section>

        {selectedVideo && (
          <Dialog open={!!selectedVideo} onOpenChange={handleCloseVideo}>
            <VideoPlayer videoId={selectedVideo} onClose={handleCloseVideo} />
          </Dialog>
        )}
      </div>
    </Layout>
  );
};

export default Index;
