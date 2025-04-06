
import Layout from '@/components/Layout';
import VideoGrid from '@/components/VideoGrid';
import { useState } from 'react';
import VideoPlayer from '@/components/VideoPlayer';
import { Dialog } from '@/components/ui/dialog';

const Index = () => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  
  const handleVideoSelect = (videoId: string) => {
    setSelectedVideo(videoId);
  };
  
  const handleCloseVideo = () => {
    setSelectedVideo(null);
  };

  return (
    <Layout>
      <section className="mb-8 animate-fade-in">
        <h1 className="text-2xl font-bold mb-4">Recommended</h1>
        <VideoGrid onVideoSelect={handleVideoSelect} />
      </section>

      {selectedVideo && (
        <Dialog open={!!selectedVideo} onOpenChange={handleCloseVideo}>
          <VideoPlayer videoId={selectedVideo} onClose={handleCloseVideo} />
        </Dialog>
      )}
    </Layout>
  );
};

export default Index;
