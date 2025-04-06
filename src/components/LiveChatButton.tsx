
import { Button } from "@/components/ui/button";
import { MessageSquare, Activity, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";

const LiveChatButton = () => {
  return (
    <div className="bg-vidtube-darkgray p-4 rounded-lg mb-4 space-y-4">
      <div>
        <h3 className="text-lg font-medium mb-2">Live Chat</h3>
        <p className="text-sm text-vidtube-lightgray mb-3">
          Join our live chat to connect with other community members in real-time!
        </p>
        <Link to="/live-chat">
          <Button className="w-full">
            <MessageSquare className="h-4 w-4 mr-2" />
            Join Live Chat
          </Button>
        </Link>
      </div>
      
      <div className="pt-4 border-t border-vidtube-gray/20">
        <h3 className="text-lg font-medium mb-2">Dashboard</h3>
        <p className="text-sm text-vidtube-lightgray mb-3">
          View your learning progress, statistics, and personalized dashboard.
        </p>
        <Link to="/dashboard">
          <Button className="w-full" variant="outline">
            <Activity className="h-4 w-4 mr-2" />
            Go to Dashboard
          </Button>
        </Link>
      </div>
      
      <div className="pt-4 border-t border-vidtube-gray/20">
        <h3 className="text-lg font-medium mb-2">Support</h3>
        <p className="text-sm text-vidtube-lightgray mb-3">
          Need help? Visit our support center for assistance.
        </p>
        <Link to="/support">
          <Button className="w-full" variant="secondary">
            <HelpCircle className="h-4 w-4 mr-2" />
            Get Support
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default LiveChatButton;
