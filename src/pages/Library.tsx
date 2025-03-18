
import Layout from '@/components/Layout';
import { Clock, ThumbsUp, History, Film } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar } from '@/components/ui/avatar';
import { getRandomAvatar } from '@/lib/api';

const Library = () => {
  // Playlist data with images
  const playlists = {
    all: [
      {
        id: 1,
        title: 'JavaScript Basics',
        videos: Math.floor(Math.random() * 30) + 5,
        thumbnail: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=600&h=350'
      },
      {
        id: 2,
        title: 'React Tutorials',
        videos: Math.floor(Math.random() * 30) + 5,
        thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=600&h=350'
      },
      {
        id: 3,
        title: 'CSS Tricks',
        videos: Math.floor(Math.random() * 30) + 5,
        thumbnail: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?auto=format&fit=crop&q=80&w=600&h=350'
      },
      {
        id: 4,
        title: 'Python for Beginners',
        videos: Math.floor(Math.random() * 30) + 5,
        thumbnail: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&q=80&w=600&h=350'
      }
    ],
    recent: [
      {
        id: 5,
        title: 'Recently Added Videos',
        videos: Math.floor(Math.random() * 15) + 3,
        thumbnail: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&q=80&w=600&h=350'
      },
      {
        id: 6,
        title: 'Latest Uploads',
        videos: Math.floor(Math.random() * 10) + 2,
        thumbnail: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=600&h=350'
      }
    ],
    created: [
      {
        id: 7,
        title: 'My Coding Journey',
        videos: Math.floor(Math.random() * 40) + 10,
        thumbnail: 'https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?auto=format&fit=crop&q=80&w=600&h=350'
      },
      {
        id: 8,
        title: 'Web Development Tips',
        videos: Math.floor(Math.random() * 25) + 8,
        thumbnail: '/lovable-uploads/cab83dfd-f819-4d1e-be2c-db1580947a17.png'
      }
    ]
  };

  return (
    <Layout>
      <div className="animate-fade-in">
        <h1 className="text-2xl font-bold mb-4">Library</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-vidtube-darkgray rounded-lg p-4 animate-scale-in" style={{ animationDelay: '100ms' }}>
            <div className="flex items-center mb-4">
              <History className="w-5 h-5 mr-2" />
              <h2 className="text-lg font-medium">History</h2>
            </div>
            <p className="text-vidtube-lightgray text-sm">Browse your watch history</p>
            <button className="mt-4 text-vidtube-blue hover:underline text-sm">View all</button>
          </div>
          
          <div className="bg-vidtube-darkgray rounded-lg p-4 animate-scale-in" style={{ animationDelay: '200ms' }}>
            <div className="flex items-center mb-4">
              <Clock className="w-5 h-5 mr-2" />
              <h2 className="text-lg font-medium">Watch Later</h2>
            </div>
            <p className="text-vidtube-lightgray text-sm">Videos you've saved for later</p>
            <button className="mt-4 text-vidtube-blue hover:underline text-sm">View all</button>
          </div>
          
          <div className="bg-vidtube-darkgray rounded-lg p-4 animate-scale-in" style={{ animationDelay: '300ms' }}>
            <div className="flex items-center mb-4">
              <ThumbsUp className="w-5 h-5 mr-2" />
              <h2 className="text-lg font-medium">Liked Videos</h2>
            </div>
            <p className="text-vidtube-lightgray text-sm">Videos you've liked</p>
            <button className="mt-4 text-vidtube-blue hover:underline text-sm">View all</button>
          </div>
        </div>
        
        <div className="mt-8">
          <h2 className="text-lg font-medium mb-4">Playlists</h2>
          
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-6 bg-vidtube-darkgray border-b border-vidtube-gray">
              <TabsTrigger value="all" className="data-[state=active]:text-vidtube-blue">All Playlists</TabsTrigger>
              <TabsTrigger value="recent" className="data-[state=active]:text-vidtube-blue">Recently Added</TabsTrigger>
              <TabsTrigger value="created" className="data-[state=active]:text-vidtube-blue">Created by you</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {playlists.all.map((playlist) => (
                  <div 
                    key={playlist.id} 
                    className="bg-vidtube-darkgray rounded-lg overflow-hidden hover:bg-vidtube-hover transition-colors cursor-pointer animate-scale-in"
                  >
                    <div className="h-36 bg-vidtube-gray relative">
                      <img 
                        src={playlist.thumbnail} 
                        alt={playlist.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                        {playlist.videos} videos
                      </div>
                    </div>
                    <div className="p-3">
                      <h3 className="font-medium">{playlist.title}</h3>
                      <div className="flex items-center mt-2">
                        <Avatar className="h-6 w-6 mr-2">
                          <img src={getRandomAvatar(`playlist-${playlist.id}`)} alt="Creator" />
                        </Avatar>
                        <p className="text-xs text-vidtube-lightgray">Your playlist</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="recent" className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {playlists.recent.map((playlist) => (
                  <div 
                    key={playlist.id} 
                    className="bg-vidtube-darkgray rounded-lg overflow-hidden hover:bg-vidtube-hover transition-colors cursor-pointer animate-scale-in"
                  >
                    <div className="h-36 bg-vidtube-gray relative">
                      <img 
                        src={playlist.thumbnail} 
                        alt={playlist.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                        {playlist.videos} videos
                      </div>
                    </div>
                    <div className="p-3">
                      <h3 className="font-medium">{playlist.title}</h3>
                      <div className="flex items-center mt-2">
                        <Avatar className="h-6 w-6 mr-2">
                          <img src={getRandomAvatar(`playlist-${playlist.id}`)} alt="Creator" />
                        </Avatar>
                        <p className="text-xs text-vidtube-lightgray">Updated recently</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="created" className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {playlists.created.map((playlist) => (
                  <div 
                    key={playlist.id} 
                    className="bg-vidtube-darkgray rounded-lg overflow-hidden hover:bg-vidtube-hover transition-colors cursor-pointer animate-scale-in"
                  >
                    <div className="h-36 bg-vidtube-gray relative">
                      <img 
                        src={playlist.thumbnail} 
                        alt={playlist.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2 bg-vidtube-blue text-white text-xs px-2 py-1 rounded-full flex items-center">
                        <Film className="w-3 h-3 mr-1" />
                        {playlist.videos}
                      </div>
                    </div>
                    <div className="p-3">
                      <h3 className="font-medium">{playlist.title}</h3>
                      <div className="flex items-center mt-2">
                        <Avatar className="h-6 w-6 mr-2">
                          <img src={getRandomAvatar(`playlist-${playlist.id}`)} alt="Creator" />
                        </Avatar>
                        <p className="text-xs text-vidtube-lightgray">Created by you</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Library;
