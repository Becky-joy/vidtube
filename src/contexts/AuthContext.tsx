
import { createContext, useState, useEffect, ReactNode } from "react";

type User = {
  id: string;
  email: string;
  username: string;
  isAdmin?: boolean;
};

interface AuthContextType {
  isAuthenticated: boolean;
  isAdmin: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  adminLogin: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, username: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isAdmin: false,
  user: null,
  login: async () => {},
  adminLogin: async () => {},
  signup: async () => {},
  logout: () => {},
});

// Admin credentials - in a real app, these would be stored securely in a database
const ADMIN_EMAILS = ["admin@vidtube.com", "admin2@vidtube.com"];
const ADMIN_PASSWORD = "admin123"; // In a real app, use proper password hashing

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user data exists in local storage
    const userData = localStorage.getItem("vidtube-user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      setIsAuthenticated(true);
      setIsAdmin(!!parsedUser.isAdmin);
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
            isAdmin: false,
          };
          
          localStorage.setItem("vidtube-user", JSON.stringify(mockUser));
          setUser(mockUser);
          setIsAuthenticated(true);
          setIsAdmin(false);
          resolve();
        } else {
          reject(new Error("Invalid credentials"));
        }
      }, 1000);
    });
  };

  const adminLogin = async (email: string, password: string) => {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        // Check if email is in the admin list and password matches
        if (ADMIN_EMAILS.includes(email) && password === ADMIN_PASSWORD) {
          const adminUser = {
            id: `admin-${Date.now()}`,
            email,
            username: `Admin-${email.split('@')[0]}`,
            isAdmin: true,
          };
          
          localStorage.setItem("vidtube-user", JSON.stringify(adminUser));
          setUser(adminUser);
          setIsAuthenticated(true);
          setIsAdmin(true);
          resolve();
        } else {
          reject(new Error("Invalid admin credentials"));
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
            isAdmin: false,
          };
          
          localStorage.setItem("vidtube-user", JSON.stringify(newUser));
          setUser(newUser);
          setIsAuthenticated(true);
          setIsAdmin(false);
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
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isAdmin,
        user,
        login,
        adminLogin,
        signup,
        logout,
      }}
    >
      {!isLoading && children}
    </AuthContext.Provider>
  );
};
