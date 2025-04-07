
import { createContext, useState, useEffect, ReactNode } from "react";

type User = {
  id: string;
  email: string;
  username: string;
};

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, username: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  login: async () => {},
  signup: async () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user data exists in local storage
    const userData = localStorage.getItem("vidtube-user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // In a real app, this would make an API call to validate credentials
    // For now, we'll simulate a successful login with mock data
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        // Simple validation for demo purposes
        if (email && password.length >= 6) {
          const mockUser = {
            id: `user-${Date.now()}`,
            email,
            username: email.split('@')[0],
          };
          
          localStorage.setItem("vidtube-user", JSON.stringify(mockUser));
          setUser(mockUser);
          setIsAuthenticated(true);
          resolve();
        } else {
          reject(new Error("Invalid credentials"));
        }
      }, 1000);
    });
  };

  const signup = async (email: string, password: string, username: string) => {
    // In a real app, this would make an API call to create a user
    // For now, we'll simulate a successful registration
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        try {
          const newUser = {
            id: `user-${Date.now()}`,
            email,
            username,
          };
          
          localStorage.setItem("vidtube-user", JSON.stringify(newUser));
          setUser(newUser);
          setIsAuthenticated(true);
          resolve();
        } catch (error) {
          reject(error);
        }
      }, 1000);
    });
  };

  const logout = () => {
    localStorage.removeItem("vidtube-user");
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        signup,
        logout,
      }}
    >
      {!isLoading && children}
    </AuthContext.Provider>
  );
};
