import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeProvider";
import { AuthProvider } from "./contexts/AuthContext";
import { NotificationProvider } from "./contexts/NotificationContext";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import Auth from "./pages/Auth";
import Index from "./pages/Index";
import Explore from "./pages/Explore";
import Library from "./pages/Library";
import VideoDetails from "./pages/VideoDetails";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Forums from "./pages/Forums";
import Quiz from "./pages/Quiz";
import LiveChat from "./pages/LiveChat";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Support from "./pages/Support";
import Users from "./pages/Users";
import VideosManagement from "./pages/VideosManagement";
import ForumModeration from "./pages/ForumModeration";
import QuizManagement from "./pages/quiz/QuizManagement";
import Analytics from "./pages/Analytics";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <NotificationProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                {/* Public route */}
                <Route path="/auth" element={<Auth />} />
                
                {/* Admin routes */}
                <Route path="/dashboard" element={
                  <AdminRoute>
                    <AdminDashboard />
                  </AdminRoute>
                } />
                <Route path="/users" element={
                  <AdminRoute>
                    <Users />
                  </AdminRoute>
                } />
                <Route path="/videos" element={
                  <AdminRoute>
                    <VideosManagement />
                  </AdminRoute>
                } />
                <Route path="/forums/moderation" element={
                  <AdminRoute>
                    <ForumModeration />
                  </AdminRoute>
                } />
                <Route path="/quiz/management" element={
                  <AdminRoute>
                    <QuizManagement />
                  </AdminRoute>
                } />
                <Route path="/analytics" element={
                  <AdminRoute>
                    <Analytics />
                  </AdminRoute>
                } />
                <Route path="/support" element={
                  <AdminRoute>
                    <Support />
                  </AdminRoute>
                } />
                
                {/* Protected routes */}
                <Route path="/" element={
                  <ProtectedRoute>
                    <Index />
                  </ProtectedRoute>
                } />
                <Route path="/explore" element={
                  <ProtectedRoute>
                    <Explore />
                  </ProtectedRoute>
                } />
                <Route path="/library" element={
                  <ProtectedRoute>
                    <Library />
                  </ProtectedRoute>
                } />
                <Route path="/video/:id" element={
                  <ProtectedRoute>
                    <VideoDetails />
                  </ProtectedRoute>
                } />
                <Route path="/profile" element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } />
                <Route path="/settings" element={
                  <ProtectedRoute>
                    <Settings />
                  </ProtectedRoute>
                } />
                <Route path="/forums" element={
                  <ProtectedRoute>
                    <Forums />
                  </ProtectedRoute>
                } />
                <Route path="/quiz" element={
                  <ProtectedRoute>
                    <Quiz />
                  </ProtectedRoute>
                } />
                <Route path="/live-chat" element={
                  <ProtectedRoute>
                    <LiveChat />
                  </ProtectedRoute>
                } />
                
                {/* Catch-all route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </NotificationProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
