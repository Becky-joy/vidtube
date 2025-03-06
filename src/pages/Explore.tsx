
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { searchVideos } from '@/lib/api';
import Layout from '@/components/Layout';
import VideoCard from '@/components/VideoCard';
import { Skeleton } from '@/components/ui/skeleton';

const Explore = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  const { data: videos, isLoading, isError } = useQuery({
    queryKey: ['videos', 'search', searchQuery],
    queryFn: () => searchVideos(searchQuery),
    enabled: true,
  });

  if (isLoading) {
    return (
      <Layout>
        <div className="p-6 animate-fade-in">
          <h1 className="text-2xl font-bold mb-6">
            {searchQuery ? `Search results for: "${searchQuery}"` : 'Explore Videos'}
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 animate-pulse">
            {Array(8).fill(0).map((_, idx) => (
              <div key={idx} className="video-card">
                <Skeleton className="aspect-video w-full rounded-lg" />
                <div className="p-3 flex">
                  <Skeleton className="h-9 w-9 rounded-full mr-3" />
                  <div className="flex-1">
                    <Skeleton className="h-4 w-5/6 mb-2" />
                    <Skeleton className="h-3 w-4/6 mb-1" />
                    <Skeleton className="h-3 w-3/6" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Layout>
    );
  }

  if (isError) {
    return (
      <Layout>
        <div className="p-6 text-center animate-fade-in">
          <h1 className="text-2xl font-bold mb-4">Error loading videos</h1>
          <p className="text-gray-400 mb-4">Something went wrong while fetching videos.</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-vidtube-blue text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </Layout>
    );
  }

  if (videos && videos.length === 0 && searchQuery) {
    return (
      <Layout>
        <div className="p-6 text-center animate-fade-in">
          <h1 className="text-2xl font-bold mb-4">No results found</h1>
          <p className="text-gray-400 mb-4">We couldn't find any videos matching "{searchQuery}"</p>
          <button 
            onClick={() => window.history.back()} 
            className="bg-vidtube-blue text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Go Back
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-6 animate-fade-in">
        <h1 className="text-2xl font-bold mb-6">
          {searchQuery ? `Search results for: "${searchQuery}"` : 'Explore Videos'}
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {videos && videos.map((video: any, index: number) => (
            <VideoCard 
              key={video.id}
              id={video.id}
              thumbnail={video.thumbnail}
              title={video.title}
              views={video.views}
              uploadTime={video.uploadTime}
              channel={video.channel}
              index={index}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Explore;
