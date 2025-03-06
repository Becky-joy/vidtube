
import Layout from '@/components/Layout';

const Explore = () => {
  return (
    <Layout>
      <div className="animate-fade-in">
        <h1 className="text-2xl font-bold mb-4">Explore</h1>
        <p className="text-vidtube-lightgray">Discover new coding tutorials and learning resources.</p>
        
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {['Web Development', 'Mobile Apps', 'Game Development', 'Data Science', 
            'Machine Learning', 'DevOps', 'Blockchain', 'Cybersecurity'].map((category) => (
            <div key={category} className="bg-vidtube-darkgray p-4 rounded-lg hover:bg-vidtube-hover transition-colors cursor-pointer animate-scale-in">
              <h3 className="font-medium">{category}</h3>
              <p className="text-sm text-vidtube-lightgray mt-1">Tutorials and courses</p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Explore;
