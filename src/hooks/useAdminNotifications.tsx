
import { useNotifications } from "@/contexts/NotificationContext";
import { NotificationAction, NotificationType } from "@/types/notification";

export const useAdminNotifications = () => {
  const { addNotification } = useNotifications();

  const notifyVideoAdded = (title: string) => {
    addNotification({
      title: "New Tutorial Added",
      message: `"${title}" has been added to the tutorial library.`,
      type: "info",
      action: "video_added",
      link: "/explore"
    });
  };

  const notifyVideoUpdated = (title: string) => {
    addNotification({
      title: "Tutorial Updated",
      message: `"${title}" has been updated.`,
      type: "info",
      action: "video_updated",
      link: "/explore"
    });
  };

  const notifyQuizAdded = (title: string, videoTitle: string) => {
    addNotification({
      title: "New Quiz Available",
      message: `A new quiz "${title}" is available for "${videoTitle}".`,
      type: "info",
      action: "quiz_added",
      link: "/quiz"
    });
  };

  const notifyQuizUpdated = (title: string) => {
    addNotification({
      title: "Quiz Updated",
      message: `The quiz "${title}" has been updated.`,
      type: "info",
      action: "quiz_updated",
      link: "/quiz"
    });
  };

  const notifyForumModerated = (topic: string) => {
    addNotification({
      title: "Forum Updated",
      message: `A topic about "${topic}" has been moderated.`,
      type: "info",
      action: "forum_moderated",
      link: "/forums"
    });
  };

  const notifySupportResponse = (ticketId: string) => {
    addNotification({
      title: "Support Response",
      message: `Your support ticket #${ticketId} has received a response.`,
      type: "info",
      action: "support_response",
      link: "/support"
    });
  };

  const notifyAnnouncement = (title: string, message: string) => {
    addNotification({
      title,
      message,
      type: "info",
      action: "announcement"
    });
  };
  
  // Generic notification function
  const notifyUser = (
    title: string, 
    message: string, 
    type: NotificationType = "info",
    action?: NotificationAction,
    link?: string
  ) => {
    addNotification({
      title,
      message,
      type,
      action,
      link
    });
  };

  return {
    notifyVideoAdded,
    notifyVideoUpdated,
    notifyQuizAdded,
    notifyQuizUpdated,
    notifyForumModerated,
    notifySupportResponse,
    notifyAnnouncement,
    notifyUser
  };
};
