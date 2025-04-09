
export type NotificationType = 
  | "info" 
  | "success" 
  | "warning" 
  | "error";

export type NotificationAction = 
  | "video_added" 
  | "video_updated" 
  | "quiz_added" 
  | "quiz_updated" 
  | "forum_moderated"
  | "announcement" 
  | "support_response";

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  action?: NotificationAction;
  createdAt: Date;
  read: boolean;
  link?: string; // Optional link to relevant content
  userId?: string; // Optional: target specific user
}
