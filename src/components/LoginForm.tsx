
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  passcode: z.string().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

interface LoginFormProps {
  isAdmin?: boolean;
}

const LoginForm = ({ isAdmin = false }: LoginFormProps) => {
  const { login, adminLogin } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      passcode: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    try {
      if (isAdmin) {
        // Ensure passcode exists for admin login
        if (!data.passcode) {
          throw new Error("Admin passcode is required");
        }
        
        await adminLogin(data.email, data.password, data.passcode);
        toast({
          title: "Admin login successful",
          description: "Welcome back, Administrator!",
        });
        navigate("/users");
      } else {
        await login(data.email, data.password);
        toast({
          title: "Login successful",
          description: "Welcome back to VidTube!",
        });
        navigate("/");
      }
    } catch (error) {
      toast({
        title: isAdmin ? "Admin login failed" : "Login failed",
        description: "Incorrect credentials. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input 
                  placeholder="email@example.com" 
                  type="email" 
                  {...field}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input 
                  placeholder="******" 
                  type="password" 
                  {...field}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {isAdmin && (
          <FormField
            control={form.control}
            name="passcode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Admin Passcode</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Enter admin passcode" 
                    type="password" 
                    {...field}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (isAdmin ? "Logging in as Admin..." : "Logging in...") : (isAdmin ? "Login as Admin" : "Login")}
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
