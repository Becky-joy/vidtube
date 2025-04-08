
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from "@/components/LoginForm";
import SignupForm from "@/components/SignupForm";
import { useAuth } from "@/hooks/useAuth";
import { Tabs as AdminTabs, TabsContent as AdminTabsContent, TabsList as AdminTabsList, TabsTrigger as AdminTabsTrigger } from "@/components/ui/tabs";

const Auth = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
  const [accountType, setAccountType] = useState<"user" | "admin">("user");

  // If user is already authenticated, redirect to appropriate page
  if (isAuthenticated) {
    if (isAdmin) {
      return <Navigate to="/users" replace />;
    }
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-primary flex items-center justify-center">
            <span className="font-bold text-white text-lg">VT</span>
          </div>
          <CardTitle className="text-2xl">Welcome to VidTube</CardTitle>
          <CardDescription>
            Sign in to your account or create a new one
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <AdminTabs
              value={accountType}
              onValueChange={(value) => setAccountType(value as "user" | "admin")}
              className="w-full"
            >
              <AdminTabsList className="grid w-full grid-cols-2 mb-4">
                <AdminTabsTrigger value="user">User Account</AdminTabsTrigger>
                <AdminTabsTrigger value="admin">Admin Account</AdminTabsTrigger>
              </AdminTabsList>
            </AdminTabs>
          </div>

          {accountType === "user" ? (
            <Tabs
              defaultValue={activeTab}
              onValueChange={(value) => setActiveTab(value as "login" | "signup")}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
              <TabsContent value="login">
                <LoginForm isAdmin={false} />
              </TabsContent>
              <TabsContent value="signup">
                <SignupForm />
              </TabsContent>
            </Tabs>
          ) : (
            <div>
              <h3 className="text-lg font-medium mb-4 text-center">Admin Login</h3>
              <LoginForm isAdmin={true} />
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <div className="text-center text-sm text-muted-foreground">
            By continuing, you agree to VidTube's Terms of Service and Privacy Policy.
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Auth;
