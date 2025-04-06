
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
import { Mail, Phone, HelpCircle, MessageCircle, Search, Check, Clock, Copy } from 'lucide-react';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ChatRoom from '@/components/ChatRoom';

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

const Support = () => {
  const [activeTab, setActiveTab] = useState('contact');
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [copiedContact, setCopiedContact] = useState<string | null>(null);
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

  const filteredFaq = searchQuery.trim() === '' 
    ? faqItems 
    : faqItems.filter(item => 
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.answer.toLowerCase().includes(searchQuery.toLowerCase())
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

  const handleSupportAction = (action: string) => {
    if (action === 'Start Chat') {
      setActiveTab('chat');
      toast({
        title: "Live Chat",
        description: "Starting a chat with our support team.",
      });
    }
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
        <h1 className="text-3xl font-bold mb-6">Contact & Support</h1>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6 grid grid-cols-3 w-full md:w-1/2">
            <TabsTrigger value="contact" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span>Contact</span>
            </TabsTrigger>
            <TabsTrigger value="faq" className="flex items-center gap-2">
              <HelpCircle className="h-4 w-4" />
              <span>FAQ</span>
            </TabsTrigger>
            <TabsTrigger value="chat" className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              <span>Live Chat</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="contact" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-2 p-6 bg-vidtube-darkgray">
                <h2 className="text-xl font-bold mb-4">Get in Touch</h2>
                <p className="text-vidtube-lightgray mb-6">
                  Fill out the form below and our support team will get back to you as soon as possible.
                </p>

                <Form {...contactForm}>
                  <form onSubmit={contactForm.handleSubmit(onContactSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={contactForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Your Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={contactForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input placeholder="john@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={contactForm.control}
                        name="category"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Support Category</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {categories.map(category => (
                                  <SelectItem key={category.id} value={category.id}>
                                    {category.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={contactForm.control}
                        name="subject"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Subject</FormLabel>
                            <FormControl>
                              <Input placeholder="Briefly describe your issue" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={contactForm.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Please provide details about your inquiry..." 
                              className="min-h-[150px]" 
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription>
                            Please provide as much detail as possible to help us assist you better.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button type="submit" className="w-full">
                      Submit Message
                    </Button>
                  </form>
                </Form>
              </Card>

              <div className="space-y-6">
                <Card className="p-6 bg-vidtube-darkgray">
                  <h2 className="text-xl font-bold mb-4">Support Options</h2>
                  <div className="space-y-4">
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
                                onClick={() => handleSupportAction(option.action)}
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
                </Card>
                
                <Card className="p-6 bg-vidtube-darkgray">
                  <h2 className="text-xl font-bold mb-4">Support Team</h2>
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
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="faq" className="space-y-6">
            <Card className="p-6 bg-vidtube-darkgray">
              <div className="flex items-center space-x-2 mb-6">
                <Search className="h-5 w-5 text-vidtube-lightgray" />
                <Input 
                  placeholder="Search our help center..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1"
                />
              </div>

              {searchQuery.trim() !== '' && (
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-4">Search Results</h3>
                  {filteredFaq.length > 0 ? (
                    <div className="space-y-3">
                      {filteredFaq.map((item, index) => (
                        <Accordion type="single" collapsible key={index}>
                          <AccordionItem value={`item-${index}`}>
                            <AccordionTrigger className="hover:no-underline text-left">
                              <span className="text-sm">{item.question}</span>
                            </AccordionTrigger>
                            <AccordionContent>
                              <p className="text-sm text-vidtube-lightgray">{item.answer}</p>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 rounded-lg bg-vidtube-gray/30 text-center">
                      <p className="text-vidtube-lightgray">No results found for "{searchQuery}"</p>
                      <p className="text-sm mt-2">Try a different search term or browse our FAQs below.</p>
                    </div>
                  )}
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Frequently Asked Questions</h3>
                  <div className="space-y-3">
                    {faqItems.map((item, index) => (
                      <Accordion type="single" collapsible key={index}>
                        <AccordionItem value={`item-${index}`}>
                          <AccordionTrigger className="hover:no-underline text-left">
                            <span className="text-sm">{item.question}</span>
                          </AccordionTrigger>
                          <AccordionContent>
                            <p className="text-sm text-vidtube-lightgray">{item.answer}</p>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Still Need Help?</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Button onClick={() => setActiveTab('contact')} className="w-full">
                      <Mail className="h-4 w-4 mr-2" />
                      Contact Us
                    </Button>
                    <Button onClick={() => setActiveTab('chat')} variant="outline" className="w-full">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Live Chat
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="chat">
            <ChatRoom />
          </TabsContent>
        </Tabs>

        {/* Success Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Support Request Submitted</DialogTitle>
              <DialogDescription>
                Thank you for contacting our support team. We've received your message and will respond to your inquiry within 24-48 hours.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button onClick={() => setIsDialogOpen(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default Support;
