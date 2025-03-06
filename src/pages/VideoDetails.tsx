
import { useState, FormEvent } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getVideoById, addComment, likeVideo } from '@/lib/api';
import Layout from '@/components/Layout';
import { Skeleton } from '@/components/ui/skeleton';
import { formatDistanceToNow } from 'date-fns';
import { ThumbsUp, ThumbsDown, Share, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';

const VideoDetails = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [commentText, setCommentText] = useState('');
  const [username, setUsername] = useState('Guest User');

  const { data: video, isLoading } = useQuery({
    queryKey: ['video', id],
    queryFn: () => getVideoById(id as string),
    enabled: !!id,
  });

  const addCommentMutation = useMutation({
    mutationFn: ({ videoId, comment }: { videoId: string, comment: { text: string, username: string } }) => 
      addComment(videoId, comment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['video', id] });
      toast.success('Comment added successfully!');
      setCommentText('');
    }
  });

  const likeMutation = useMutation({
    mutationFn: ({ videoId, isLike }: { videoId: string, isLike: boolean }) => 
      likeVideo(videoId, isLike),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['video', id] });
    }
  });

  const handleSubmitComment = (e: FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) {
      toast.error('Comment cannot be empty');
      return;
    }
    
    addCommentMutation.mutate({
      videoId: id as string,
      comment: { text: commentText, username }
    });
  };

  const handleLike = (isLike: boolean) => {
    likeMutation.mutate({ videoId: id as string, isLike });
    toast.success(isLike ? 'Liked!' : 'Disliked!');
  };

  const handleShare = () => {
    if (navigator.share && video) {
      navigator.share({
        title: video.title,
        url: video.youtubeUrl
      }).then(() => {
        toast.success('Shared successfully!');
      }).catch((error) => {
        console.error('Error sharing:', error);
        // Fallback for browsers that don't support navigator.share
        navigator.clipboard.writeText(video.youtubeUrl);
        toast.success('Link copied to clipboard!');
      });
    } else if (video) {
      navigator.clipboard.writeText(video.youtubeUrl);
      toast.success('Link copied to clipboard!');
    }
  };

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
          <div className="aspect-video">
            <iframe 
              src={`https://www.youtube.com/embed/${video.youtubeId}`}
              className="w-full h-full"
              title={video.title}
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            ></iframe>
          </div>
        </div>
        
        <div className="mt-4">
          <h1 className="text-xl font-bold mb-2">{video.title}</h1>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
            <p className="text-vidtube-lightgray text-sm">{video.views} • {video.uploadTime}</p>
            <div className="flex gap-2 flex-wrap">
              <button 
                onClick={() => handleLike(true)} 
                className="flex items-center gap-1 text-sm px-3 py-1 rounded-full bg-vidtube-darkgray hover:bg-vidtube-hover transition-colors"
              >
                <ThumbsUp className="h-4 w-4" /> {video.likes}
              </button>
              <button 
                onClick={() => handleLike(false)} 
                className="flex items-center gap-1 text-sm px-3 py-1 rounded-full bg-vidtube-darkgray hover:bg-vidtube-hover transition-colors"
              >
                <ThumbsDown className="h-4 w-4" /> {video.dislikes}
              </button>
              <button 
                onClick={handleShare} 
                className="flex items-center gap-1 text-sm px-3 py-1 rounded-full bg-vidtube-darkgray hover:bg-vidtube-hover transition-colors"
              >
                <Share className="h-4 w-4" /> Share
              </button>
              <a 
                href={video.youtubeUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-1 text-sm px-3 py-1 rounded-full bg-red-600 hover:bg-red-700 text-white transition-colors"
              >
                Watch on YouTube
              </a>
            </div>
          </div>
        </div>
        
        <div className="p-3 bg-vidtube-darkgray rounded-lg flex flex-col sm:flex-row items-start mt-2 gap-3">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <img 
                src={video.channel.avatar} 
                alt={video.channel.name} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="flex-1">
            <h3 className="font-medium">{video.channel.name}</h3>
            <p className="text-vidtube-lightgray text-sm mt-1">{video.channel.subscribers} subscribers</p>
            <p className="text-sm mt-3">
              Welcome to this coding tutorial video! Hope you enjoy learning these programming concepts.
              Don't forget to like and subscribe for more content.
            </p>
          </div>
          <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors">
            Subscribe
          </button>
        </div>
        
        <div className="mt-6">
          <h2 className="font-medium mb-3 flex items-center">
            <MessageSquare className="h-5 w-5 mr-2" /> 
            Comments {video.comments?.length > 0 ? `(${video.comments.length})` : ''}
          </h2>
          
          <form onSubmit={handleSubmitComment} className="mb-6">
            <div className="flex gap-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full overflow-hidden">
                  <img 
                    src={getRandomAvatar(username)} 
                    alt="Your avatar" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Your name"
                  className="w-full bg-transparent border-b border-vidtube-gray mb-2 pb-1 text-sm focus:outline-none focus:border-vidtube-blue"
                />
                <textarea
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Add a comment..."
                  className="w-full bg-transparent border-b border-vidtube-gray pb-1 text-sm focus:outline-none focus:border-vidtube-blue"
                  rows={2}
                />
                <div className="flex justify-end mt-2">
                  <button 
                    type="submit" 
                    className="bg-vidtube-blue text-white px-4 py-1 rounded-full text-sm hover:bg-blue-600 transition-colors"
                    disabled={addCommentMutation.isPending}
                  >
                    {addCommentMutation.isPending ? 'Posting...' : 'Comment'}
                  </button>
                </div>
              </div>
            </div>
          </form>
          
          <div className="space-y-4">
            {video.comments && video.comments.length > 0 ? (
              video.comments.map((comment: any) => (
                <div key={comment.id} className="flex animate-fade-in">
                  <div className="mr-3 flex-shrink-0">
                    <div className="w-8 h-8 rounded-full overflow-hidden">
                      <img 
                        src={comment.avatar} 
                        alt={comment.username} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium text-sm">{comment.username}</h4>
                      <span className="text-vidtube-lightgray text-xs">
                        {formatDistanceToNow(new Date(comment.timestamp), { addSuffix: true })}
                      </span>
                    </div>
                    <p className="text-sm mt-1">{comment.text}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-vidtube-lightgray text-sm py-4">No comments yet. Be the first to comment!</p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default VideoDetails;
