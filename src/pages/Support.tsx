import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '@/hooks/use-toast';
import { Mail, Phone, HelpCircle, MessageCircle, Search, Check, Clock, Copy, Trash2, Send } from 'lucide-react';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ChatRoom from '@/components/ChatRoom';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
  category: z.string().optional(),
});

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
  },
  {
    question: "How can I improve video quality?",
    answer: "You can adjust video quality in the settings icon on the video player. Higher quality requires better internet connection."
  },
  {
    question: "Is there a mobile app available?",
    answer: "Yes, we have mobile apps available for iOS and Android. You can download them from the respective app stores."
  },
  {
    question: "Can I share videos with my friends?",
    answer: "Yes, you can share videos by clicking the share button below any video and selecting your preferred sharing method."
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

// Support options
const supportOptions = [
  { 
    title: 'Email Support',
    description: 'Get help via email within 24 hours',
    icon: <Mail className="h-5 w-5" />,
    contact: 'support@vidtube.com',
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

// Support agents
const supportAgents = [
  { name: 'Sarah Johnson', role: 'Customer Support', avatar: 'https://i.pravatar.cc/150?u=sarah', status: 'online' },
  { name: 'Michael Chen', role: 'Technical Support', avatar: 'https://i.pravatar.cc/150?u=michael', status: 'online' },
  { name: 'Emma Williams', role: 'Billing Specialist', avatar: 'https://i.pravatar.cc/150?u=emma', status: 'away' },
];

// Mock received messages for admin
const initialMessages = [
  {
    id: 1, 
    name: "John Doe", 
    email: "john@example.com", 
    subject: "Unable to access my account", 
    message: "I've been trying to log in for the past two days but keep getting an error. Can you help?", 
    category: "technical",
    date: "2025-04-05",
    status: "unread"
  },
  {
    id: 2, 
    name: "Sarah Miller", 
    email: "sarah@example.com", 
    subject: "Billing issue with premium account", 
    message: "I was charged twice for my subscription this month. Could you please look into this and issue a refund?", 
    category: "account",
    date: "2025-04-06",
    status: "unread"
  },
  {
    id: 3, 
    name: "David Wilson", 
    email: "david@example.com", 
    subject: "Video quality problem", 
    message: "The tutorial videos are stuttering even though my internet connection is good. Is there a way to fix this?", 
    category: "content",
    date: "2025-04-07",
    status: "read"
  },
  {
    id: 4, 
    name: "Lisa Johnson", 
    email: "lisa@example.com", 
    subject: "Feature request", 
    message: "It would be great if you could add a dark mode to the application. Would make late night studying much easier!", 
    category: "feedback",
    date: "2025-04-08",
    status: "responded"
  }
];

// Mock chat messages for admin live chat
const initialChatMessages = [
  {
    id: 1,
    author: "TechGuru",
    avatar: "https://i.pravatar.cc/150?u=TechGuru",
    content: "Hey admin, I'm having trouble uploading my assignment video. Can you help?",
    timestamp: "2 min ago"
  },
  {
    id: 2,
    author: "Admin",
    avatar: "https://i.pravatar.cc/150?u=admin",
    content: "Hi TechGuru, what error message are you seeing when trying to upload?",
    timestamp: "1 min ago"
  },
  {
    id: 3,
    author: "TechGuru",
    avatar: "https://i.pravatar.cc/150?u=TechGuru",
    content: "It says 'file size too large' but my video is only 50MB.",
    timestamp: "Just now"
  }
];

// FAQ editing schema
const faqSchema = z.object({
  question: z.string().min(5, { message: "Question must be at least 5 characters." }),
  answer: z.string().min(10, { message: "Answer must be at least 10 characters." }),
});

const Support = () => {
  const [activeTab, setActiveTab] = useState('messages');
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [copiedContact, setCopiedContact] = useState<string | null>(null);
  const [receivedMessages, setReceivedMessages] = useState(initialMessages);
  const [selectedMessage, setSelectedMessage] = useState<typeof initialMessages[0] | null>(null);
  const [responseText, setResponseText] = useState('');
  const [isReplyDialogOpen, setIsReplyDialogOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState(initialChatMessages);
  const [chatInput, setChatInput] = useState('');
  const [editingFAQ, setEditingFAQ] = useState<{id: number, question: string, answer: string} | null>(null);
  const [faqs, setFaqs] = useState(faqItems);
  const [isAddFAQOpen, setIsAddFAQOpen] = useState(false);
  
  const { toast } = useToast();

  const contactForm = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
      category: "",
    },
  });

  const faqForm = useForm<z.infer<typeof faqSchema>>({
    resolver: zodResolver(faqSchema),
    defaultValues: {
      question: "",
      answer: "",
    },
  });

  const filteredFAQ = searchQuery.trim() === '' 
    ? faqs
    : faqs.filter(item => 
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.answer.toLowerCase().includes(searchQuery.toLowerCase())
      );
  
  const filteredMessages = searchQuery.trim() === ''
    ? receivedMessages
    : receivedMessages.filter(msg => 
        msg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        msg.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        msg.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
        msg.email.toLowerCase().includes(searchQuery.toLowerCase())
      );

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

  const handleSendChatMessage = (e: React.FormEvent) => {
    e.preventDefault();

    if (!chatInput.trim()) {
      toast({
        title: "Empty message",
        description: "Please enter a message before sending",
        variant: "destructive"
      });
      return;
    }
    
    const newMessage = {
      id: chatMessages.length + 1,
      author: "Admin",
      avatar: "https://i.pravatar.cc/150?u=admin",
      content: chatInput,
      timestamp: "Just now"
    };
    
    setChatMessages([...chatMessages, newMessage]);
    setChatInput("");
  };

  const handleDeleteChatMessage = (id: number) => {
    setChatMessages(chatMessages.filter(message => message.id !== id));
    toast({
      title: "Message deleted",
      description: "The message has been removed from the chat."
    });
  };

  const handleViewMessage = (message: typeof initialMessages[0]) => {
    setSelectedMessage(message);
    setIsReplyDialogOpen(true);
  };

  const handleReplyToMessage = () => {
    if (!selectedMessage) return;
    
    // Update message status
    setReceivedMessages(prevMessages => 
      prevMessages.map(msg => 
        msg.id === selectedMessage.id ? { ...msg, status: "responded" } : msg
      )
    );
    
    toast({
      title: "Reply sent",
      description: `Your reply to ${selectedMessage.name} has been sent.`
    });
    
    setResponseText("");
    setIsReplyDialogOpen(false);
  };

  const handleDeleteMessage = (id: number) => {
    setReceivedMessages(receivedMessages.filter(message => message.id !== id));
    toast({
      title: "Message deleted",
      description: "The message has been removed from your inbox."
    });
  };

  const handleEditFAQ = (index: number) => {
    setEditingFAQ({
      id: index,
      question: faqs[index].question,
      answer: faqs[index].answer
    });
    
    faqForm.setValue("question", faqs[index].question);
    faqForm.setValue("answer", faqs[index].answer);
  };

  const handleSaveFAQ = (values: z.infer<typeof faqSchema>) => {
    if (editingFAQ) {
      // Update existing FAQ
      setFaqs(faqs.map((item, index) => 
        index === editingFAQ.id ? { question: values.question, answer: values.answer } : item
      ));
      
      toast({
        title: "FAQ updated",
        description: "The FAQ has been successfully updated."
      });
    } else {
      // Add new FAQ
      setFaqs([...faqs, { question: values.question, answer: values.answer }]);
      
      toast({
        title: "FAQ added",
        description: "The new FAQ has been successfully added."
      });
    }
    
    setEditingFAQ(null);
    setIsAddFAQOpen(false);
    faqForm.reset();
  };

  const handleDeleteFAQ = (index: number) => {
    setFaqs(faqs.filter((_, i) => i !== index));
    
    toast({
      title: "FAQ deleted",
      description: "The FAQ has been removed."
    });
  };

  const onContactSubmit = (values: z.infer<typeof contactFormSchema>) => {
    console.log("Contact form submitted:", values);
    
    // In a real app, this would send the message to a server
    toast({
      title: "Message sent",
      description: "Your message has been sent to our support team. We'll get back to you soon.",
    });
    
    // Reset the form
    contactForm.reset();
    
    // Show success dialog
    setIsDialogOpen(true);
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto py-8 px-4 animate-fade-in">
        <h1 className="text-3xl font-bold mb-6">Support Management</h1>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6 grid grid-cols-4 w-full md:w-3/4">
            <TabsTrigger value="messages" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span>Messages</span>
            </TabsTrigger>
            <TabsTrigger value="faq" className="flex items-center gap-2">
              <HelpCircle className="h-4 w-4" />
              <span>Manage FAQs</span>
            </TabsTrigger>
            <TabsTrigger value="chat" className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              <span>Live Chat</span>
            </TabsTrigger>
            <TabsTrigger value="contact" className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span>Contact Info</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="messages" className="space-y-6">
            <Card className="p-6 bg-vidtube-darkgray">
              <div className="flex items-center mb-6 justify-between">
                <h2 className="text-xl font-bold">User Messages</h2>
                <div className="relative w-1/3">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search messages..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Status</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMessages.map((message) => (
                    <TableRow key={message.id}>
                      <TableCell>
                        <Badge variant={
                          message.status === "unread" ? "destructive" : 
                          message.status === "read" ? "outline" : "default"
                        }>
                          {message.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{message.name}</TableCell>
                      <TableCell>{message.subject}</TableCell>
                      <TableCell>{message.category}</TableCell>
                      <TableCell>{message.date}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleViewMessage(message)}
                          >
                            View & Reply
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleDeleteMessage(message.id)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          <TabsContent value="faq" className="space-y-6">
            <Card className="p-6 bg-vidtube-darkgray">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Manage FAQs</h2>
                <div className="flex gap-4">
                  <div className="relative w-72">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search FAQs..."
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Button onClick={() => {
                    faqForm.reset();
                    setEditingFAQ(null);
                    setIsAddFAQOpen(true);
                  }}>
                    Add FAQ
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                {filteredFAQ.map((item, index) => (
                  <div key={index} className="border border-vidtube-gray rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div className="w-full">
                        <h3 className="font-semibold text-lg">{item.question}</h3>
                        <p className="mt-2 text-vidtube-lightgray">{item.answer}</p>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Button variant="outline" size="sm" onClick={() => handleEditFAQ(index)}>
                          Edit
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDeleteFAQ(index)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}

                {filteredFAQ.length === 0 && (
                  <div className="text-center py-8">
                    <HelpCircle className="mx-auto h-10 w-10 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">No FAQs Found</h3>
                    <p className="text-muted-foreground mt-2">
                      {searchQuery ? "No FAQs match your search criteria." : "Start by adding your first FAQ."}
                    </p>
                  </div>
                )}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="chat" className="space-y-6">
            <Card className="p-6 bg-vidtube-darkgray">
              <h2 className="text-xl font-bold mb-6">Live Chat Support</h2>
              
              <div className="bg-vidtube-gray/30 rounded-lg p-4 h-[500px] flex flex-col">
                <div className="border-b border-vidtube-gray pb-2 mb-2">
                  <p className="text-xs text-vidtube-lightgray">You're chatting as Admin</p>
                </div>
                
                <div className="flex-1 overflow-y-auto mb-4 pr-2 scrollbar-thin">
                  {chatMessages.map((message) => (
                    <div key={message.id} className="mb-4 group">
                      <div className="flex">
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
                        
                        {message.author !== "Admin" && (
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => handleDeleteChatMessage(message.id)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                
                <form onSubmit={handleSendChatMessage} className="flex gap-2">
                  <Input 
                    placeholder="Type your message..." 
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    className="bg-vidtube-gray border-vidtube-gray"
                  />
                  <Button type="submit">
                    <Send className="h-4 w-4 mr-1" /> Send
                  </Button>
                </form>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="contact" className="space-y-6">
            <Card className="p-6 bg-vidtube-darkgray">
              <h2 className="text-xl font-bold mb-6">Contact Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-medium text-lg">Support Contact Details</h3>
                  <div className="space-y-4">
                    {supportOptions.map((option, index) => (
                      <div key={index} className="bg-vidtube-gray/30 p-4 rounded-lg">
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
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-medium text-lg">Support Team</h3>
                  <div className="space-y-4">
                    {supportAgents.map((agent, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-vidtube-gray/30 transition-all">
                        <div className="relative">
                          <Avatar>
                            <img src={agent.avatar} alt={agent.name} className="object-cover" />
                          </Avatar>
                          <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-vidtube-darkgray ${
                            agent.status === 'online' ? 'bg-green-500' : 'bg-yellow-500'
                          }`}></span>
                        </div>
                        <div>
                          <h4 className="font-medium text-sm">{agent.name}</h4>
                          <p className="text-xs text-vidtube-lightgray">{agent.role}</p>
                        </div>
                        <Badge variant="outline" className="ml-auto">
                          {agent.status === 'online' ? 'Online' : 'Away'}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Message Reply Dialog */}
        <Dialog open={isReplyDialogOpen} onOpenChange={setIsReplyDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Reply to Message</DialogTitle>
            </DialogHeader>
            
            {selectedMessage && (
              <>
                <div className="border-l-4 border-primary p-4 bg-vidtube-gray/30 rounded">
                  <div className="flex justify-between">
                    <h3 className="font-semibold">{selectedMessage.subject}</h3>
                    <Badge variant="outline">{selectedMessage.category}</Badge>
                  </div>
                  <div className="text-sm text-vidtube-lightgray mt-1">
                    From: {selectedMessage.name} ({selectedMessage.email})
                  </div>
                  <p className="mt-3">{selectedMessage.message}</p>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-medium">Your Response</h4>
                  <Textarea 
                    value={responseText}
                    onChange={(e) => setResponseText(e.target.value)}
                    placeholder="Type your reply here..."
                    className="min-h-[150px]"
                  />
                </div>
                
                <DialogFooter className="gap-2">
                  <Button variant="outline" onClick={() => setIsReplyDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleReplyToMessage} disabled={!responseText.trim()}>
                    Send Reply
                  </Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* Add/Edit FAQ Dialog */}
        <Dialog open={isAddFAQOpen} onOpenChange={setIsAddFAQOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingFAQ ? "Edit FAQ" : "Add New FAQ"}</DialogTitle>
            </DialogHeader>
            
            <Form {...faqForm}>
              <form onSubmit={faqForm.handleSubmit(handleSaveFAQ)} className="space-y-4">
                <FormField
                  control={faqForm.control}
                  name="question"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Question</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter the question" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={faqForm.control}
                  name="answer"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Answer</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Enter the answer" 
                          className="min-h-[100px]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <DialogFooter>
                  <Button type="submit">
                    {editingFAQ ? "Update FAQ" : "Add FAQ"}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default Support;
