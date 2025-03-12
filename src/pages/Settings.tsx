
import React from 'react';
import Layout from '@/components/Layout';
import { useTheme } from '@/components/ThemeProvider';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sun, Moon, Settings as SettingsIcon, Bell, Shield, User, Eye } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

const Settings = () => {
  const { theme, toggleTheme } = useTheme();
  const { toast } = useToast();

  const handleSaveSettings = () => {
    toast({
      title: "Settings saved",
      description: "Your settings have been saved successfully.",
    });
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto animate-fade-in">
        <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <SettingsIcon className="h-6 w-6" /> Settings
        </h1>

        <Tabs defaultValue="appearance" className="w-full">
          <TabsList className="mb-6 grid grid-cols-4 md:grid-cols-6 lg:w-3/4">
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
        </Tabs>
      </div>
    </Layout>
  );
};

export default Settings;
