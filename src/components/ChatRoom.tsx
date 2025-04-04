
import React, { useState, useEffect, useRef } from 'react';
import { Avatar } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Send, Users, MessageCircle, ExternalLink, HelpCircle, Mail, Phone, Check, Clock, Copy, Globe } from 'lucide-react';
import { getRandomAvatar } from '@/lib/api';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

// Mock data for online users
const onlineUsers = [
  { id: 1, name: 'CodeMaster', avatar: getRandomAvatar('CodeMaster') },
  { id: 2, name: 'WebDevPro', avatar: getRandomAvatar('WebDevPro') },
  { id: 3, name: 'ReactFanatic', avatar: getRandomAvatar('ReactFanatic') },
  { id: 4, name: 'TypeNewbie', avatar: getRandomAvatar('TypeNewbie') },
  { id: 5, name: 'CSSWhiz', avatar: getRandomAvatar('CSSWhiz') },
];

// Mock data for initial messages
const initialMessages = [
  { id: 1, user: 'CodeMaster', avatar: getRandomAvatar('CodeMaster'), text: 'Hey everyone! Anyone working on React projects?', timestamp: new Date(Date.now() - 35 * 60000).toISOString() },
  { id: 2, user: 'WebDevPro', avatar: getRandomAvatar('WebDevPro'), text: 'Yes, I\'m currently building a dashboard with React and Tailwind.', timestamp: new Date(Date.now() - 32 * 60000).toISOString() },
  { id: 3, user: 'ReactFanatic', avatar: getRandomAvatar('ReactFanatic'), text: 'I\'m struggling with React Query. Anyone has experience with it?', timestamp: new Date(Date.now() - 28 * 60000).toISOString() },
  { id: 4, user: 'TypeNewbie', avatar: getRandomAvatar('TypeNewbie'), text: 'Hey all, new to the chat. I\'m learning TypeScript right now!', timestamp: new Date(Date.now() - 15 * 60000).toISOString() },
  { id: 5, user: 'WebDevPro', avatar: getRandomAvatar('WebDevPro'), text: '@ReactFanatic what issues are you having with React Query?', timestamp: new Date(Date.now() - 10 * 60000).toISOString() },
];

// Mock user (in a real app this would come from auth)
const currentUser = {
  name: 'Guest' + Math.floor(Math.random() * 1000),
  avatar: getRandomAvatar('Guest' + Math.floor(Math.random() * 1000)),
};

// FAQ data
const faqItems = [
  {
    question: "How do I reset my password?",
    answer: "Go to the login page and click on 'Forgot Password'. Follow the instructions sent to your email to reset your password."
  },
  {
    question: "Can I download videos for offline viewing?",
    answer: "Yes, premium users can download videos for offline viewing on mobile devices. Look for the download button below each video while browsing with a premium account."
  },
  {
    question: "How do I report inappropriate content?",
    answer: "Click the 'Report' button below any video and fill out the form explaining the issue. Our moderation team will review your report within 24-48 hours."
  },
  {
    question: "Can I change my username?",
    answer: "You can change your username once every 30 days. Go to Settings > Account > Username to make this change."
  },
  {
    question: "How do I cancel my subscription?",
    answer: "To cancel your subscription, go to Settings > Billing > Subscription Management and click on 'Cancel Subscription'. You'll have access until the end of your billing period."
  }
];

interface Message {
  id: number;
  user: string;
  avatar: string;
  text: string;
  timestamp: string;
}

const ChatRoom = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<string>('chat');
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSubject, setContactSubject] = useState('');
  const [supportCategory, setSupportCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedContact, setCopiedContact] = useState<string | null>(null);
  const { toast } = useToast();

  // Social media links
  const socialLinks = [
    { name: 'WhatsApp', url: 'https://wa.me/1234567890', icon: <MessageCircle className="h-4 w-4" /> },
    { name: 'Telegram', url: 'https://t.me/yourusername', icon: <Send className="h-4 w-4" /> },
    { name: 'Twitter', url: 'https://twitter.com/yourusername', icon: <Globe className="h-4 w-4" /> },
  ];

  // Support options
  const supportOptions = [
    { 
      title: 'Email Support',
      description: 'Get help via email within 24 hours',
      icon: <Mail className="h-5 w-5" />,
      contact: 'support@example.com',
      hours: 'Responses within 24 hours'
    },
    { 
      title: 'Phone Support',
      description: 'Speak directly with our support team',
      icon: <Phone className="h-5 w-5" />,
      contact: '+1 (555) 123-4567',
      hours: 'Monday-Friday, 9AM-5PM EST'
    },
    { 
      title: 'Live Chat',
      description: 'Chat with our support agents in real-time',
      icon: <MessageCircle className="h-5 w-5" />,
      action: 'Start Chat',
      hours: 'Available 24/7'
    }
  ];

  // Support categories
  const categories = [
    { id: 'technical', name: 'Technical Issues' },
    { id: 'account', name: 'Account & Billing' },
    { id: 'content', name: 'Content Issues' },
    { id: 'feedback', name: 'Feedback & Suggestions' },
    { id: 'other', name: 'Other' }
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 24 * 60) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / (60 * 24))}d ago`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    
    const newMessage: Message = {
      id: messages.length + 1,
      user: currentUser.name,
      avatar: currentUser.avatar,
      text: inputValue.trim(),
      timestamp: new Date().toISOString(),
    };
    
    setMessages([...messages, newMessage]);
    setInputValue('');
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMessage || !contactSubject) {
      toast({
        title: "Error",
        description: "Please fill out all fields",
        variant: "destructive",
      });
      return;
    }

    // Simulate sending contact form
    toast({
      title: "Message Sent",
      description: "Thank you for your message. We'll get back to you soon.",
    });

    // Clear form
    setContactName('');
    setContactEmail('');
    setContactMessage('');
    setContactSubject('');
    setSupportCategory('');
  };
  
  const handleSupportAction = (action: string, contact?: string) => {
    if (action === 'Start Chat') {
      setActiveTab('chat');
      toast({
        title: "Live Chat",
        description: "Starting a chat with our support team.",
      });
    } else if (contact) {
      // For email or phone, we just show a toast with the contact info
      toast({
        title: "Contact Information",
        description: contact,
      });
    }
  };

  const handleCopyContact = (contact: string) => {
    navigator.clipboard.writeText(contact);
    setCopiedContact(contact);
    
    toast({
      title: "Copied to clipboard",
      description: "Contact information copied to clipboard",
    });
    
    setTimeout(() => {
      setCopiedContact(null);
    }, 3000);
  };

  const filteredFaq = searchQuery.trim() === '' 
    ? faqItems 
    : faqItems.filter(item => 
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.answer.toLowerCase().includes(searchQuery.toLowerCase())
      );

  return (
    <div className="bg-vidtube-darkgray rounded-lg overflow-hidden">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="flex items-center justify-between p-3 border-b border-vidtube-gray">
          <h2 className="font-semibold text-lg">Live Chat</h2>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-green-600 text-white">
              <div className="h-2 w-2 rounded-full bg-green-300 mr-1.5"></div>
              {onlineUsers.length} Online
            </Badge>
            <TabsList className="bg-vidtube-gray">
              <TabsTrigger value="chat" className="h-8 px-3 data-[state=active]:bg-vidtube-blue data-[state=active]:text-white">
                Chat
              </TabsTrigger>
              <TabsTrigger value="users" className="h-8 px-3 data-[state=active]:bg-vidtube-blue data-[state=active]:text-white">
                <Users className="h-4 w-4 mr-1" />
                Users
              </TabsTrigger>
              <TabsTrigger value="support" className="h-8 px-3 data-[state=active]:bg-vidtube-blue data-[state=active]:text-white">
                <HelpCircle className="h-4 w-4 mr-1" />
                Support
              </TabsTrigger>
              <TabsTrigger value="contact" className="h-8 px-3 data-[state=active]:bg-vidtube-blue data-[state=active]:text-white">
                <Mail className="h-4 w-4 mr-1" />
                Contact
              </TabsTrigger>
            </TabsList>
          </div>
        </div>

        <TabsContent value="chat" className="m-0">
          <div className="flex flex-col h-[400px]">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex items-start gap-3 ${message.user === currentUser.name ? 'justify-end' : ''}`}>
                  {message.user !== currentUser.name && (
                    <Avatar className="h-8 w-8 flex-shrink-0">
                      <img src={message.avatar} alt={message.user} />
                    </Avatar>
                  )}
                  <div className={`max-w-[75%] ${message.user === currentUser.name ? 'bg-vidtube-blue text-white' : 'bg-vidtube-gray'} rounded-lg px-3 py-2`}>
                    {message.user !== currentUser.name && (
                      <div className="font-semibold text-xs mb-1">{message.user}</div>
                    )}
                    <div className="text-sm">{message.text}</div>
                    <div className="text-xs opacity-70 mt-1 text-right">
                      {formatTimestamp(message.timestamp)}
                    </div>
                  </div>
                  {message.user === currentUser.name && (
                    <Avatar className="h-8 w-8 flex-shrink-0">
                      <img src={message.avatar} alt={message.user} />
                    </Avatar>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSubmit} className="p-3 border-t border-vidtube-gray flex gap-2">
              <Input 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type a message..."
                className="bg-vidtube-gray border-vidtube-gray"
              />
              <Button type="submit" size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </TabsContent>

        <TabsContent value="users" className="m-0">
          <div className="h-[400px] overflow-y-auto p-4">
            <h3 className="text-sm font-medium mb-3 text-vidtube-lightgray">ONLINE USERS</h3>
            <div className="space-y-2">
              {onlineUsers.map((user) => (
                <div key={user.id} className="flex items-center gap-2 p-2 hover:bg-vidtube-gray rounded-md">
                  <div className="relative">
                    <Avatar className="h-8 w-8">
                      <img src={user.avatar} alt={user.name} />
                    </Avatar>
                    <div className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-green-500 ring-1 ring-vidtube-darkgray"></div>
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">{user.name}</div>
                  </div>
                  <Button variant="ghost" size="sm" className="h-7 px-2">
                    Message
                  </Button>
                </div>
              ))}
              <div className="relative py-1">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-vidtube-gray"></span>
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-vidtube-darkgray px-2 text-xs text-vidtube-lightgray">You</span>
                </div>
              </div>
              <div className="flex items-center gap-2 p-2 hover:bg-vidtube-gray rounded-md">
                <div className="relative">
                  <Avatar className="h-8 w-8">
                    <img src={currentUser.avatar} alt={currentUser.name} />
                  </Avatar>
                  <div className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-green-500 ring-1 ring-vidtube-darkgray"></div>
                </div>
                <div className="flex-1">
                  <div className="font-medium text-sm">{currentUser.name}</div>
                  <div className="text-xs text-vidtube-lightgray">You</div>
                </div>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="mt-6">
              <h3 className="text-sm font-medium mb-3 text-vidtube-lightgray">CONNECT WITH ME</h3>
              <div className="space-y-2">
                {socialLinks.map((link, index) => (
                  <a 
                    key={index} 
                    href={link.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-2 hover:bg-vidtube-gray rounded-md text-sm group"
                  >
                    {link.icon}
                    <span className="flex-1">{link.name}</span>
                    <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="support" className="m-0">
          <div className="h-[400px] overflow-y-auto p-4">
            <h3 className="text-sm font-medium mb-3 text-white">How can we help you?</h3>
            <p className="text-sm text-vidtube-lightgray mb-4">Select one of the support options below:</p>
            
            <div className="mb-4">
              <Input
                placeholder="Search our help center..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-vidtube-gray border-vidtube-gray"
              />
            </div>
            
            {searchQuery.trim() !== '' && (
              <div className="mb-4">
                <h4 className="text-sm font-medium mb-2">Search Results</h4>
                {filteredFaq.length > 0 ? (
                  <Accordion type="single" collapsible className="mb-4">
                    {filteredFaq.map((item, index) => (
                      <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="hover:no-underline">
                          <span className="text-sm">{item.question}</span>
                        </AccordionTrigger>
                        <AccordionContent>
                          <p className="text-sm text-vidtube-lightgray">{item.answer}</p>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                ) : (
                  <p className="text-sm text-vidtube-lightgray bg-vidtube-gray/20 p-3 rounded-md">
                    No results found. Please try another search term or contact us directly.
                  </p>
                )}
              </div>
            )}
            
            <div className="space-y-3">
              {supportOptions.map((option, index) => (
                <div key={index} className="bg-vidtube-gray/30 p-4 rounded-lg hover:bg-vidtube-gray/40 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-vidtube-blue rounded-lg text-white">
                      {option.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{option.title}</h4>
                      <p className="text-sm text-vidtube-lightgray mt-1">{option.description}</p>
                      
                      <div className="flex items-center mt-2 text-xs text-vidtube-lightgray">
                        <Clock className="h-3.5 w-3.5 mr-1" />
                        <span>{option.hours}</span>
                      </div>
                      
                      {option.contact && (
                        <div className="mt-2 flex items-center gap-2">
                          <span className="text-sm font-medium">{option.contact}</span>
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            className="h-7 w-7 p-0"
                            onClick={() => handleCopyContact(option.contact)}
                          >
                            {copiedContact === option.contact ? (
                              <Check className="h-3.5 w-3.5 text-green-500" />
                            ) : (
                              <Copy className="h-3.5 w-3.5" />
                            )}
                          </Button>
                        </div>
                      )}
                      
                      {option.action && (
                        <Button
                          onClick={() => handleSupportAction(option.action, option.contact)}
                          className="mt-2" 
                          size="sm"
                        >
                          {option.action}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6">
              <h4 className="text-sm font-medium mb-3">Frequently Asked Questions</h4>
              <Accordion type="single" collapsible className="mb-4">
                {faqItems.slice(0, 3).map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="hover:no-underline">
                      <span className="text-sm">{item.question}</span>
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm text-vidtube-lightgray">{item.answer}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
            
            <div className="mt-4 text-center text-vidtube-lightgray text-xs">
              <p>Our support team is available Monday to Friday, 9AM-5PM EST</p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="contact" className="m-0">
          <div className="h-[400px] overflow-y-auto p-4">
            <h3 className="text-sm font-medium mb-3 text-white">Contact Us</h3>
            <p className="text-sm text-vidtube-lightgray mb-4">Fill out the form below and we'll get back to you as soon as possible.</p>
            
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm">Name</label>
                  <Input
                    id="name"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="Your name"
                    className="bg-vidtube-gray border-vidtube-gray"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm">Email</label>
                  <Input
                    id="email"
                    type="email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="Your email address"
                    className="bg-vidtube-gray border-vidtube-gray"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="category" className="text-sm">Support Category</label>
                <Select value={supportCategory} onValueChange={setSupportCategory}>
                  <SelectTrigger className="bg-vidtube-gray border-vidtube-gray">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm">Subject</label>
                <Input
                  id="subject"
                  value={contactSubject}
                  onChange={(e) => setContactSubject(e.target.value)}
                  placeholder="Briefly describe your issue"
                  className="bg-vidtube-gray border-vidtube-gray"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm">Message</label>
                <Textarea
                  id="message"
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  placeholder="How can we help you?"
                  className="bg-vidtube-gray border-vidtube-gray min-h-[120px]"
                  required
                />
              </div>
              
              <Button type="submit" className="w-full">
                Send Message
              </Button>
              
              <div className="pt-4 text-center text-xs text-vidtube-lightgray border-t border-vidtube-gray/20">
                <p>By submitting this form, you agree to our <a href="#" className="text-vidtube-blue hover:underline">Privacy Policy</a> and <a href="#" className="text-vidtube-blue hover:underline">Terms of Service</a>.</p>
              </div>
            </form>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ChatRoom;
