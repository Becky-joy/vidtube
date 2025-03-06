
import Layout from '@/components/Layout';
import { Clock, ThumbsUp, History } from 'lucide-react';

const Library = () => {
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {['JavaScript Basics', 'React Tutorials', 'CSS Tricks', 'Python for Beginners'].map((playlist, index) => (
              <div 
                key={playlist} 
                className="bg-vidtube-darkgray rounded-lg overflow-hidden hover:bg-vidtube-hover transition-colors cursor-pointer animate-scale-in"
                style={{ animationDelay: `${400 + index * 100}ms` }}
              >
                <div className="h-24 bg-vidtube-gray"></div>
                <div className="p-3">
                  <h3 className="font-medium">{playlist}</h3>
                  <p className="text-sm text-vidtube-lightgray">{Math.floor(Math.random() * 30) + 5} videos</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Library;
