import { useState } from 'react';
import Layout from '@/components/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ThumbsUp, ThumbsDown, MessageSquare, Flag, Share } from 'lucide-react';
import { getRandomAvatar } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import LiveChatButton from '@/components/LiveChatButton';

// Mock forum data
const forumTopics = [
  {
    id: 1,
    title: 'Best way to learn JavaScript in 2024?',
    author: 'CodeMaster',
    authorAvatar: getRandomAvatar('CodeMaster'),
    datePosted: '2 days ago',
    replies: 24,
    views: 156,
    category: 'javascript',
    content: 'I\'ve been trying to learn JavaScript for a while now but I\'m feeling overwhelmed with all the resources available. What\'s the best approach to master JavaScript in 2024? Are there any specific courses, books, or practice methods you recommend?',
    tags: ['javascript', 'learning', 'web-development']
  },
  {
    id: 2,
    title: 'React vs Angular for large-scale enterprise applications',
    author: 'EnterpriseDev',
    authorAvatar: getRandomAvatar('EnterpriseDev'),
    datePosted: '1 week ago',
    replies: 42,
    views: 312,
    category: 'frameworks',
    content: 'Our team is planning to start a new large-scale enterprise application and we\'re trying to decide between React and Angular. We need good state management, routing, forms handling, and a robust ecosystem. Any experience or advice would be greatly appreciated.',
    tags: ['react', 'angular', 'enterprise']
  },
  {
    id: 3,
    title: 'Python vs JavaScript for backend development in 2024',
    author: 'BackendGuru',
    authorAvatar: getRandomAvatar('BackendGuru'),
    datePosted: '3 days ago',
    replies: 18,
    views: 203,
    category: 'backend',
    content: 'I\'m starting a new project and I\'m trying to decide between Python (with FastAPI/Django) and JavaScript (with Node.js/Express) for the backend. What are the pros and cons of each in the current landscape? Performance, scalability, and developer experience are my main concerns.',
    tags: ['python', 'javascript', 'backend']
  },
  {
    id: 4,
    title: 'Getting started with TypeScript - Resources and tips',
    author: 'TypeNewbie',
    authorAvatar: getRandomAvatar('TypeNewbie'),
    datePosted: '4 days ago',
    replies: 15,
    views: 178,
    category: 'typescript',
    content: 'I\'m a JavaScript developer looking to dive into TypeScript. What resources would you recommend for someone with my background? Any specific courses, books, or projects that helped you understand TypeScript concepts better?',
    tags: ['typescript', 'javascript', 'learning']
  },
  {
    id: 5,
    title: 'CSS Grid vs Flexbox - When to use which?',
    author: 'CSSWhiz',
    authorAvatar: getRandomAvatar('CSSWhiz'),
    datePosted: '1 day ago',
    replies: 27,
    views: 210,
    category: 'css',
    content: 'I\'ve been using both CSS Grid and Flexbox for my projects, but I\'m still confused about when to use which. Could someone explain the appropriate use cases for both? When is Grid a better choice, and when should I stick with Flexbox?',
    tags: ['css', 'grid', 'flexbox']
  },
];

// Mock replies for forum topics
const forumReplies = {
  1: [
    {
      id: 101,
      author: 'WebDevPro',
      authorAvatar: getRandomAvatar('WebDevPro'),
      datePosted: '1 day ago',
      content: 'I would strongly recommend starting with the basics on MDN documentation, then moving on to practical projects. FreeCodeCamp has an excellent JavaScript curriculum too!',
      likes: 12,
      dislikes: 0
    },
    {
      id: 102,
      author: 'JSEnthusiast',
      authorAvatar: getRandomAvatar('JSEnthusiast'),
      datePosted: '1 day ago',
      content: 'In my experience, the JavaScript30 course by Wes Bos is fantastic for practical learning. After that, try building some real projects like a todo app, weather app, etc.',
      likes: 8,
      dislikes: 1
    }
  ],
  2: [
    {
      id: 201,
      author: 'AngularDeveloper',
      authorAvatar: getRandomAvatar('AngularDeveloper'),
      datePosted: '6 days ago',
      content: 'Angular provides a more complete solution out of the box with strong typing (TypeScript), dependency injection, and a comprehensive toolset. It\'s great for large teams where standardization is important.',
      likes: 15,
      dislikes: 3
    },
    {
      id: 202,
      author: 'ReactFanatic',
      authorAvatar: getRandomAvatar('ReactFanatic'),
      datePosted: '5 days ago',
      content: 'React with Redux or Context API offers more flexibility and a gentler learning curve. It\'s easier to integrate with other libraries and has a huge ecosystem. We use it for our enterprise apps with great success.',
      likes: 18,
      dislikes: 2
    }
  ]
};

type CategoryType = 'all' | 'javascript' | 'frameworks' | 'backend' | 'typescript' | 'css';

const Forums = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryType>('all');
  const [selectedTopic, setSelectedTopic] = useState<number | null>(null);
  const [replyText, setReplyText] = useState('');
  const { toast } = useToast();

  const filteredTopics = activeCategory === 'all' 
    ? forumTopics 
    : forumTopics.filter(topic => topic.category === activeCategory);

  const handleReplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) {
      toast({
        title: "Empty reply",
        description: "Please write something before submitting",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Reply submitted",
      description: "Your reply has been posted successfully",
    });
    
    setReplyText('');
  };

  return (
    <Layout>
      <div className="animate-fade-in">
        <h1 className="text-2xl font-bold mb-4">FORUMS</h1>
        
        <Tabs defaultValue="topics" className="w-full">
          <TabsList className="mb-6 bg-vidtube-darkgray border-b border-vidtube-gray">
            <TabsTrigger value="topics" className="data-[state=active]:text-vidtube-blue">Topics</TabsTrigger>
            <TabsTrigger value="popular" className="data-[state=active]:text-vidtube-blue">Popular</TabsTrigger>
            <TabsTrigger value="recent" className="data-[state=active]:text-vidtube-blue">Recent Activity</TabsTrigger>
            <TabsTrigger value="my-posts" className="data-[state=active]:text-vidtube-blue">My Posts</TabsTrigger>
          </TabsList>
          
          <div className="flex gap-4 flex-col md:flex-row">
            <div className="md:w-1/4">
              <div className="bg-vidtube-darkgray p-4 rounded-lg mb-4">
                <h3 className="text-lg font-medium mb-2">Categories</h3>
                <ul className="space-y-1">
                  <li>
                    <Button 
                      variant={activeCategory === 'all' ? 'default' : 'ghost'} 
                      className="w-full justify-start" 
                      onClick={() => setActiveCategory('all')}
                    >
                      All Topics
                    </Button>
                  </li>
                  <li>
                    <Button 
                      variant={activeCategory === 'javascript' ? 'default' : 'ghost'} 
                      className="w-full justify-start" 
                      onClick={() => setActiveCategory('javascript')}
                    >
                      JavaScript
                    </Button>
                  </li>
                  <li>
                    <Button 
                      variant={activeCategory === 'frameworks' ? 'default' : 'ghost'} 
                      className="w-full justify-start" 
                      onClick={() => setActiveCategory('frameworks')}
                    >
                      Frameworks
                    </Button>
                  </li>
                  <li>
                    <Button 
                      variant={activeCategory === 'backend' ? 'default' : 'ghost'} 
                      className="w-full justify-start" 
                      onClick={() => setActiveCategory('backend')}
                    >
                      Backend Development
                    </Button>
                  </li>
                  <li>
                    <Button 
                      variant={activeCategory === 'typescript' ? 'default' : 'ghost'} 
                      className="w-full justify-start" 
                      onClick={() => setActiveCategory('typescript')}
                    >
                      TypeScript
                    </Button>
                  </li>
                  <li>
                    <Button 
                      variant={activeCategory === 'css' ? 'default' : 'ghost'} 
                      className="w-full justify-start" 
                      onClick={() => setActiveCategory('css')}
                    >
                      CSS
                    </Button>
                  </li>
                </ul>
              </div>
              
              <div className="bg-vidtube-darkgray p-4 rounded-lg mb-4">
                <h3 className="text-lg font-medium mb-2">Stats</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Topics:</span>
                    <span className="font-semibold">1,245</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Posts:</span>
                    <span className="font-semibold">8,721</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Members:</span>
                    <span className="font-semibold">3,456</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Online:</span>
                    <span className="font-semibold text-green-500">127</span>
                  </div>
                </div>
              </div>
              
              <LiveChatButton />
            </div>
            
            <div className="md:w-3/4">
              {selectedTopic === null ? (
                <TabsContent value="topics">
                  <div className="mb-4 flex justify-between items-center">
                    <h2 className="text-lg font-semibold">{activeCategory === 'all' ? 'All Topics' : activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)}</h2>
                    <Button>Create New Topic</Button>
                  </div>
                  
                  <div className="space-y-4">
                    {filteredTopics.map(topic => (
                      <Card key={topic.id} className="bg-vidtube-darkgray border-vidtube-gray hover:bg-vidtube-hover transition-colors cursor-pointer" onClick={() => setSelectedTopic(topic.id)}>
                        <CardHeader className="p-4 pb-0">
                          <div className="flex justify-between items-start">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-10 w-10">
                                <img src={topic.authorAvatar} alt={topic.author} />
                              </Avatar>
                              <div>
                                <h3 className="font-semibold text-base md:text-lg">{topic.title}</h3>
                                <div className="flex items-center text-xs text-vidtube-lightgray">
                                  <span>By {topic.author}</span>
                                  <span className="mx-2">•</span>
                                  <span>{topic.datePosted}</span>
                                </div>
                              </div>
                            </div>
                            <div className="text-right text-sm">
                              <div><span className="font-semibold">{topic.replies}</span> replies</div>
                              <div><span className="font-semibold">{topic.views}</span> views</div>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="p-4 pt-3">
                          <p className="text-sm text-vidtube-lightgray line-clamp-2">{topic.content}</p>
                        </CardContent>
                        <CardFooter className="p-4 pt-0 flex flex-wrap gap-2">
                          {topic.tags.map(tag => (
                            <span key={tag} className="bg-vidtube-gray text-xs px-2 py-1 rounded-full">{tag}</span>
                          ))}
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              ) : (
                <div className="bg-vidtube-darkgray rounded-lg p-4">
                  <div className="mb-4 flex justify-between items-center">
                    <Button variant="outline" onClick={() => setSelectedTopic(null)}>
                      Back to Topics
                    </Button>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Share className="h-4 w-4 mr-1" /> Share
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Flag className="h-4 w-4 mr-1" /> Report
                      </Button>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    {forumTopics.filter(topic => topic.id === selectedTopic).map(topic => (
                      <Card key={topic.id} className="bg-vidtube-dark border-vidtube-gray mb-4">
                        <CardHeader className="p-4 pb-2">
                          <div className="flex justify-between items-start">
                            <div className="flex items-start gap-3">
                              <Avatar className="h-10 w-10">
                                <img src={topic.authorAvatar} alt={topic.author} />
                              </Avatar>
                              <div>
                                <h3 className="font-semibold text-lg">{topic.title}</h3>
                                <div className="flex items-center text-xs text-vidtube-lightgray">
                                  <span>{topic.author}</span>
                                  <span className="mx-2">•</span>
                                  <span>{topic.datePosted}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="p-4 pt-2">
                          <p className="text-sm mb-4">{topic.content}</p>
                          <div className="flex flex-wrap gap-2">
                            {topic.tags.map(tag => (
                              <span key={tag} className="bg-vidtube-gray text-xs px-2 py-1 rounded-full">{tag}</span>
                            ))}
                          </div>
                        </CardContent>
                        <CardFooter className="p-4 pt-0 flex justify-between">
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">
                              <ThumbsUp className="h-4 w-4 mr-1" /> {reply.likes}
                            </Button>
                            <Button variant="ghost" size="sm">
                              <ThumbsDown className="h-4 w-4 mr-1" /> {reply.dislikes}
                            </Button>
                          </div>
                          <div className="text-sm text-vidtube-lightgray">
                            {topic.views} views
                          </div>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-4">Replies</h3>
                    <div className="space-y-4">
                      {forumReplies[selectedTopic as keyof typeof forumReplies]?.map(reply => (
                        <Card key={reply.id} className="bg-vidtube-gray border-vidtube-gray">
                          <CardHeader className="p-4 pb-2">
                            <div className="flex items-start gap-3">
                              <Avatar className="h-8 w-8">
                                <img src={reply.authorAvatar} alt={reply.author} />
                              </Avatar>
                              <div>
                                <div className="flex items-center text-sm">
                                  <span className="font-medium">{reply.author}</span>
                                  <span className="mx-2 text-xs text-vidtube-lightgray">•</span>
                                  <span className="text-xs text-vidtube-lightgray">{reply.datePosted}</span>
                                </div>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className="p-4 pt-2">
                            <p className="text-sm">{reply.content}</p>
                          </CardContent>
                          <CardFooter className="p-4 pt-2 flex items-center justify-between">
                            <div className="flex gap-4">
                              <Button variant="ghost" size="sm">
                                <ThumbsUp className="h-4 w-4 mr-1" /> {reply.likes}
                              </Button>
                              <Button variant="ghost" size="sm">
                                <ThumbsDown className="h-4 w-4 mr-1" /> {reply.dislikes}
                              </Button>
                            </div>
                            <Button variant="ghost" size="sm">
                              <MessageSquare className="h-4 w-4 mr-1" /> Reply
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Post a Reply</h3>
                    <form onSubmit={handleReplySubmit}>
                      <Textarea 
                        placeholder="Write your reply here..."
                        className="mb-4 bg-vidtube-gray border-vidtube-gray"
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        rows={5}
                      />
                      <div className="flex justify-end">
                        <Button type="submit">Post Reply</Button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
              
              <TabsContent value="popular">
                <div className="bg-vidtube-darkgray p-4 rounded-lg">
                  <h2 className="text-lg font-semibold mb-4">Popular Discussions</h2>
                  <p className="text-center text-vidtube-lightgray py-8">Popular discussions will be shown here</p>
                </div>
              </TabsContent>
              
              <TabsContent value="recent">
                <div className="bg-vidtube-darkgray p-4 rounded-lg">
                  <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
                  <p className="text-center text-vidtube-lightgray py-8">Recent activity will be shown here</p>
                </div>
              </TabsContent>
              
              <TabsContent value="my-posts">
                <div className="bg-vidtube-darkgray p-4 rounded-lg">
                  <h2 className="text-lg font-semibold mb-4">My Posts</h2>
                  <p className="text-center text-vidtube-lightgray py-8">Your posts will be shown here after you login</p>
                </div>
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Forums;
