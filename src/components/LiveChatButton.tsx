
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";

const LiveChatButton = () => {
  return (
    <div className="bg-vidtube-darkgray p-4 rounded-lg mb-4">
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
  );
};

export default LiveChatButton;
