
import Layout from '@/components/Layout';
import VideoGrid from '@/components/VideoGrid';

const Index = () => {
  return (
    <Layout>
      <section className="mb-8 animate-fade-in">
        <h1 className="text-2xl font-bold mb-4">Recommended</h1>
        <VideoGrid />
      </section>
    </Layout>
  );
};

export default Index;
