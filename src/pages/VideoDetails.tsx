
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getVideoById } from '@/lib/api';
import Layout from '@/components/Layout';
import { Skeleton } from '@/components/ui/skeleton';
import { formatDistanceToNow } from 'date-fns';

const VideoDetails = () => {
  const { id } = useParams();
  
  const { data: video, isLoading } = useQuery({
    queryKey: ['video', id],
    queryFn: () => getVideoById(id as string),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <Layout>
        <div className="animate-fade-in max-w-5xl mx-auto">
          <Skeleton className="w-full aspect-video rounded-lg" />
          <div className="mt-4 flex">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="ml-3 flex-1">
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!video) {
    return (
      <Layout>
        <div className="animate-fade-in max-w-5xl mx-auto text-center py-12">
          <h1 className="text-2xl font-bold mb-4">Video not found</h1>
          <p className="text-gray-500">The video you're looking for doesn't exist or has been removed.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="animate-fade-in max-w-5xl mx-auto">
        <div className="rounded-lg overflow-hidden bg-black">
          <div className="aspect-video flex items-center justify-center bg-vidtube-darkgray">
            <img 
              src={video.thumbnail} 
              alt={video.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        <div className="mt-4">
          <h1 className="text-xl font-bold mb-2">{video.title}</h1>
          <div className="flex items-center justify-between mb-4">
            <p className="text-vidtube-lightgray text-sm">{video.views} • {video.uploadTime}</p>
            <div className="flex gap-2">
              <button className="flex items-center gap-1 text-sm px-3 py-1 rounded-full bg-vidtube-darkgray hover:bg-vidtube-hover transition-colors">
                <span>👍</span> Like
              </button>
              <button className="flex items-center gap-1 text-sm px-3 py-1 rounded-full bg-vidtube-darkgray hover:bg-vidtube-hover transition-colors">
                <span>👎</span> Dislike
              </button>
              <button className="flex items-center gap-1 text-sm px-3 py-1 rounded-full bg-vidtube-darkgray hover:bg-vidtube-hover transition-colors">
                <span>📋</span> Share
              </button>
            </div>
          </div>
        </div>
        
        <div className="p-3 bg-vidtube-darkgray rounded-lg flex items-start mt-2">
          <div className="mr-3 flex-shrink-0">
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <img 
                src={video.channel.avatar} 
                alt={video.channel.name} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div>
            <h3 className="font-medium">{video.channel.name}</h3>
            <p className="text-vidtube-lightgray text-sm mt-1">250K subscribers</p>
            <p className="text-sm mt-3">
              Welcome to this coding tutorial video! Hope you enjoy learning these programming concepts.
              Don't forget to like and subscribe for more content.
            </p>
          </div>
          <button className="ml-auto bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors">
            Subscribe
          </button>
        </div>
        
        <div className="mt-6">
          <h2 className="font-medium mb-3">Comments</h2>
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="flex">
                <div className="mr-3 flex-shrink-0">
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-vidtube-gray">
                    <img 
                      src={`https://api.dicebear.com/7.x/initials/svg?seed=comment-${index}`}
                      alt="User avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium text-sm">Code Enthusiast {index + 1}</h4>
                    <span className="text-vidtube-lightgray text-xs">
                      {formatDistanceToNow(new Date(Date.now() - 1000 * 60 * 60 * 24 * index), { addSuffix: true })}
                    </span>
                  </div>
                  <p className="text-sm mt-1">
                    {index === 0 && "This tutorial was extremely helpful! Thank you for explaining the concepts so clearly."}
                    {index === 1 && "Great content as always. I've been following your channel for a while and learned so much."}
                    {index === 2 && "Could you please make a follow-up video going deeper into these topics?"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default VideoDetails;
