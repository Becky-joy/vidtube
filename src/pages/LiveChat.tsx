
import Layout from "@/components/Layout";
import { Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { getRandomAvatar } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { Send, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

// Mock chat data
const initialMessages = [
  {
    id: 1,
    author: "TechGuru",
    avatar: getRandomAvatar("TechGuru"),
    content: "Hey everyone! Anyone here familiar with Node.js streams?",
    timestamp: "2 min ago"
  },
  {
    id: 2,
    author: "CodeMaster",
    avatar: getRandomAvatar("CodeMaster"),
    content: "Yes, I've worked with them. What do you need help with?",
    timestamp: "1 min ago"
  },
  {
    id: 3,
    author: "WebDev123",
    avatar: getRandomAvatar("WebDev123"),
    content: "Streams are great for handling large files without loading everything into memory.",
    timestamp: "Just now"
  }
];

const onlineUsers = [
  { id: 1, name: "TechGuru", avatar: getRandomAvatar("TechGuru") },
  { id: 2, name: "CodeMaster", avatar: getRandomAvatar("CodeMaster") },
  { id: 3, name: "WebDev123", avatar: getRandomAvatar("WebDev123") },
  { id: 4, name: "JSfanatic", avatar: getRandomAvatar("JSfanatic") },
  { id: 5, name: "NodeExpert", avatar: getRandomAvatar("NodeExpert") },
  { id: 6, name: "ReactDev", avatar: getRandomAvatar("ReactDev") },
  { id: 7, name: "DevOpsPro", avatar: getRandomAvatar("DevOpsPro") }
];

const LiveChat = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [messageInput, setMessageInput] = useState("");
  const { toast } = useToast();
  
  // Scroll to bottom when messages change
  useEffect(() => {
    const chatContainer = document.getElementById("chat-messages");
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!messageInput.trim()) {
      toast({
        title: "Empty message",
        description: "Please enter a message before sending",
        variant: "destructive"
      });
      return;
    }
    
    const newMessage = {
      id: messages.length + 1,
      author: "You",
      avatar: getRandomAvatar("You"),
      content: messageInput,
      timestamp: "Just now"
    };
    
    setMessages([...messages, newMessage]);
    setMessageInput("");
  };

  return (
    <Layout>
      <div className="animate-fade-in">
        <div className="flex items-center mb-6">
          <Link to="/forums" className="mr-4">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-1" /> Back to Forums
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Live Chat</h1>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Main chat area */}
          <div className="lg:col-span-3">
            <div className="bg-vidtube-darkgray rounded-lg p-4 h-[calc(100vh-200px)] flex flex-col">
              <div className="border-b border-vidtube-gray pb-2 mb-2">
                <h2 className="font-semibold">Web Development Live Chat</h2>
                <p className="text-xs text-vidtube-lightgray">Remember to follow our community guidelines</p>
              </div>
              
              <div 
                id="chat-messages" 
                className="flex-1 overflow-y-auto mb-4 pr-2 scrollbar-thin"
              >
                {messages.map((message) => (
                  <div key={message.id} className="mb-4 flex">
                    <Avatar className="h-8 w-8 mr-2 mt-1">
                      <img src={message.avatar} alt={message.author} />
                    </Avatar>
                    <div className="bg-vidtube-gray rounded-lg py-2 px-3 max-w-[80%]">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm">{message.author}</span>
                        <span className="text-xs text-vidtube-lightgray">{message.timestamp}</span>
                      </div>
                      <p className="text-sm">{message.content}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <Input 
                  placeholder="Type your message..." 
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  className="bg-vidtube-gray border-vidtube-gray"
                />
                <Button type="submit">
                  <Send className="h-4 w-4 mr-1" /> Send
                </Button>
              </form>
            </div>
          </div>
          
          {/* Online users sidebar */}
          <div className="hidden lg:block">
            <div className="bg-vidtube-darkgray rounded-lg p-4 h-[calc(100vh-200px)]">
              <h3 className="font-semibold mb-4">Online Users ({onlineUsers.length})</h3>
              <div className="space-y-3 overflow-y-auto max-h-[calc(100%-40px)] pr-2 scrollbar-thin">
                {onlineUsers.map((user) => (
                  <div key={user.id} className="flex items-center gap-2">
                    <div className="relative">
                      <Avatar className="h-8 w-8">
                        <img src={user.avatar} alt={user.name} />
                      </Avatar>
                      <div className="absolute bottom-0 right-0 h-2 w-2 bg-green-500 rounded-full"></div>
                    </div>
                    <span className="text-sm">{user.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LiveChat;
