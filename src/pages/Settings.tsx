
import React from 'react';
import Layout from '@/components/Layout';
import { useTheme } from '@/components/ThemeProvider';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sun, Moon, Settings as SettingsIcon, Bell, Shield, User, Eye, LogOut, HelpCircle } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

const Settings = () => {
  const { theme, toggleTheme } = useTheme();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const contactForm = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const handleSaveSettings = () => {
    toast({
      title: "Settings saved",
      description: "Your settings have been saved successfully.",
    });
  };

  const handleLogout = () => {
    // In a real app, this would clear auth tokens, user state, etc.
    localStorage.removeItem('vidtube-user');
    
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    
    // Redirect to home page after logout
    navigate('/');
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
      <div className="max-w-4xl mx-auto animate-fade-in">
        <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <SettingsIcon className="h-6 w-6" /> Settings
        </h1>

        <Tabs defaultValue="appearance" className="w-full">
          <TabsList className="mb-6 grid grid-cols-5 md:grid-cols-6 lg:w-3/4">
            <TabsTrigger value="appearance" className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              <span className="hidden md:inline">Appearance</span>
            </TabsTrigger>
            <TabsTrigger value="account" className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span className="hidden md:inline">Account</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-1">
              <Bell className="h-4 w-4" />
              <span className="hidden md:inline">Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="privacy" className="flex items-center gap-1">
              <Shield className="h-4 w-4" />
              <span className="hidden md:inline">Privacy</span>
            </TabsTrigger>
            <TabsTrigger value="support" className="flex items-center gap-1">
              <HelpCircle className="h-4 w-4" />
              <span className="hidden md:inline">Support</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="appearance" className="space-y-6">
            <Card className="bg-vidtube-darkgray p-6">
              <h2 className="text-xl font-medium mb-4">Theme Settings</h2>
              <Separator className="my-4" />
              
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                  {theme === 'dark' ? (
                    <Moon className="h-5 w-5 text-vidtube-lightgray" />
                  ) : (
                    <Sun className="h-5 w-5 text-yellow-500" />
                  )}
                  <div>
                    <p className="font-medium">Theme Mode</p>
                    <p className="text-sm text-vidtube-lightgray">Switch between dark and light mode</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Moon className="h-4 w-4 text-vidtube-lightgray" />
                  <Switch 
                    checked={theme === 'light'}
                    onCheckedChange={toggleTheme}
                    id="theme-mode" 
                  />
                  <Sun className="h-4 w-4 text-yellow-500" />
                </div>
              </div>

              <h3 className="text-lg font-medium mb-3">Interface Density</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <label className={`border ${theme === 'dark' ? 'border-vidtube-gray' : 'border-gray-300'} rounded-lg p-4 cursor-pointer hover:border-vidtube-blue ${theme === 'dark' ? 'bg-vidtube-gray/20' : 'bg-gray-100'}`}>
                  <input type="radio" name="density" value="compact" className="sr-only" defaultChecked />
                  <div className="flex justify-between items-center">
                    <span>Compact</span>
                    <div className="w-16 h-8 bg-vidtube-darkgray rounded">
                      <div className="w-full h-1 bg-vidtube-gray my-1.5 mx-auto"></div>
                      <div className="w-full h-1 bg-vidtube-gray my-1.5 mx-auto"></div>
                      <div className="w-full h-1 bg-vidtube-gray my-1.5 mx-auto"></div>
                    </div>
                  </div>
                </label>
                <label className={`border ${theme === 'dark' ? 'border-vidtube-gray' : 'border-gray-300'} rounded-lg p-4 cursor-pointer hover:border-vidtube-blue ${theme === 'dark' ? 'bg-vidtube-gray/20' : 'bg-gray-100'}`}>
                  <input type="radio" name="density" value="comfortable" className="sr-only" />
                  <div className="flex justify-between items-center">
                    <span>Comfortable</span>
                    <div className="w-16 h-8 bg-vidtube-darkgray rounded">
                      <div className="w-full h-1.5 bg-vidtube-gray my-2 mx-auto"></div>
                      <div className="w-full h-1.5 bg-vidtube-gray my-2 mx-auto"></div>
                    </div>
                  </div>
                </label>
              </div>

              <Button onClick={handleSaveSettings} className="mt-4">Save Settings</Button>
            </Card>
          </TabsContent>

          <TabsContent value="account">
            <Card className="bg-vidtube-darkgray p-6">
              <h2 className="text-xl font-medium mb-4">Account Settings</h2>
              <p className="text-vidtube-lightgray">Manage your account information and preferences.</p>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card className="bg-vidtube-darkgray p-6">
              <h2 className="text-xl font-medium mb-4">Notification Settings</h2>
              <p className="text-vidtube-lightgray">Manage how and when you receive notifications.</p>
            </Card>
          </TabsContent>

          <TabsContent value="privacy">
            <Card className="bg-vidtube-darkgray p-6">
              <h2 className="text-xl font-medium mb-4">Privacy Settings</h2>
              <p className="text-vidtube-lightgray">Control your privacy and security preferences.</p>
            </Card>
          </TabsContent>

          <TabsContent value="support" className="space-y-6">
            <Card className="bg-vidtube-darkgray p-6">
              <h2 className="text-xl font-medium mb-4">Contact Support</h2>
              <Separator className="my-4" />
              
              <div className="space-y-6">
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-2">Get Help</h3>
                  <p className="text-vidtube-lightgray mb-4">
                    Have a question or need assistance? Fill out the form below and our support team will get back to you as soon as possible.
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
                      
                      <FormField
                        control={contactForm.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Message</FormLabel>
                            <FormControl>
                              <textarea 
                                className="w-full min-h-[120px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" 
                                placeholder="Describe your issue in detail" 
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
                      
                      <Button type="submit" className="w-full md:w-auto">
                        Submit Request
                      </Button>
                    </form>
                  </Form>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Frequently Asked Questions</h3>
                  <div className="space-y-4 mt-4">
                    <div className="bg-vidtube-gray/20 p-4 rounded-lg">
                      <h4 className="font-medium mb-1">How do I reset my password?</h4>
                      <p className="text-sm text-vidtube-lightgray">
                        Go to the login page and click on "Forgot Password". Follow the instructions sent to your email.
                      </p>
                    </div>
                    <div className="bg-vidtube-gray/20 p-4 rounded-lg">
                      <h4 className="font-medium mb-1">Can I download videos for offline viewing?</h4>
                      <p className="text-sm text-vidtube-lightgray">
                        Yes, premium users can download videos for offline viewing on mobile devices.
                      </p>
                    </div>
                    <div className="bg-vidtube-gray/20 p-4 rounded-lg">
                      <h4 className="font-medium mb-1">How do I report inappropriate content?</h4>
                      <p className="text-sm text-vidtube-lightgray">
                        Click the "Report" button below any video and fill out the form explaining the issue.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
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

        {/* Logout Section */}
        <Card className="bg-vidtube-darkgray p-6 mt-6">
          <h2 className="text-xl font-medium mb-4 text-destructive flex items-center gap-2">
            <LogOut className="h-5 w-5" /> Logout
          </h2>
          <Separator className="my-4" />
          <p className="text-vidtube-lightgray mb-4">
            Logging out will end your current session. You'll need to sign in again to access your account.
          </p>
          <Button 
            variant="destructive" 
            onClick={handleLogout}
            className="flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" /> Logout
          </Button>
        </Card>
      </div>
    </Layout>
  );
};

export default Settings;
