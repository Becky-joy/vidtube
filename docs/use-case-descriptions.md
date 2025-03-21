
# VidTube Learning Platform - Use Case Descriptions

This document provides detailed descriptions of the use cases identified in the Use Case Diagram.

## Regular User Use Cases

### 1. Browse Videos
**Actor**: Regular User  
**Description**: The user can browse through available videos on the platform's home page, trending section, and recommended videos.  
**Preconditions**: User has accessed the platform.  
**Main Flow**:
1. User navigates to the home page
2. System displays a list of videos based on popularity, relevance, or user preferences
3. User scrolls through the video list

### 2. Search Content
**Actor**: Regular User  
**Description**: The user can search for specific videos, topics, or creators.  
**Preconditions**: User has accessed the platform.  
**Main Flow**:
1. User enters keywords in the search bar
2. System returns relevant results
3. User can filter or sort the results

### 3. View Video Details
**Actor**: Regular User  
**Description**: The user can access detailed information about a specific video, including description, creator information, and statistics.  
**Preconditions**: User has selected a video.  
**Main Flow**:
1. User clicks on a video
2. System displays the video player with details
3. User can view video information, comments, and related videos

### 4. Like/Dislike Videos
**Actor**: Regular User  
**Description**: The user can express opinion on videos by liking or disliking them.  
**Preconditions**: User has accessed a video.  
**Main Flow**:
1. User watches a video
2. User clicks like or dislike button
3. System records the user's preference

### 5. Subscribe to Channels
**Actor**: Regular User  
**Description**: The user can follow content creators to receive updates on new content.  
**Preconditions**: User has accessed a creator's content.  
**Main Flow**:
1. User views a video or visits a channel page
2. User clicks the subscribe button
3. System adds the channel to the user's subscriptions

### 6. Comment on Videos
**Actor**: Regular User  
**Description**: The user can post comments on videos.  
**Preconditions**: User has accessed a video.  
**Main Flow**:
1. User types a comment in the comment section
2. User submits the comment
3. System displays the comment under the video

### 7. Create Playlists
**Actor**: Regular User  
**Description**: The user can organize videos into custom playlists.  
**Preconditions**: User has accessed a video.  
**Main Flow**:
1. User selects a video
2. User chooses to add to playlist
3. User selects an existing playlist or creates a new one
4. System adds the video to the selected playlist

### 8. Save to Watch Later
**Actor**: Regular User  
**Description**: The user can bookmark videos to watch at a later time.  
**Preconditions**: User has accessed a video.  
**Main Flow**:
1. User finds an interesting video
2. User selects "Save to Watch Later" option
3. System adds the video to the user's Watch Later list

### 9. View History
**Actor**: Regular User  
**Description**: The user can access a list of previously watched videos.  
**Preconditions**: User has watched videos on the platform.  
**Main Flow**:
1. User navigates to History section
2. System displays a chronological list of watched videos
3. User can interact with the videos in the history

### 10. Manage Profile
**Actor**: Regular User  
**Description**: The user can view and edit their profile information.  
**Preconditions**: User has an account on the platform.  
**Main Flow**:
1. User accesses profile settings
2. System displays current profile information
3. User makes changes to name, avatar, bio, etc.
4. System saves the updated information

### 11. Adjust Settings
**Actor**: Regular User  
**Description**: The user can customize their experience on the platform.  
**Preconditions**: User has an account on the platform.  
**Main Flow**:
1. User accesses settings page
2. System displays available settings (theme, notifications, privacy, etc.)
3. User modifies settings according to preferences
4. System applies and saves the new settings

### 12. Explore Categories
**Actor**: Regular User  
**Description**: The user can browse videos organized by categories or topics.  
**Preconditions**: User has accessed the platform.  
**Main Flow**:
1. User navigates to the Explore section
2. System displays available categories
3. User selects a category
4. System shows videos related to the selected category

### 13. Access Forums
**Actor**: Regular User  
**Description**: The user can participate in discussion forums related to videos or topics.  
**Preconditions**: User has an account on the platform.  
**Main Flow**:
1. User navigates to Forums section
2. System displays available forum topics
3. User can read existing discussions or create new threads
4. User can reply to other users' posts

## Content Creator Use Cases

### 14. Upload Videos
**Actor**: Content Creator  
**Description**: The creator can upload new video content to the platform.  
**Preconditions**: User has a creator account.  
**Main Flow**:
1. Creator selects upload option
2. Creator provides video file and details (title, description, thumbnail)
3. System processes and publishes the video

### 15. Edit Video Details
**Actor**: Content Creator  
**Description**: The creator can modify information about their uploaded videos.  
**Preconditions**: Creator has uploaded videos.  
**Main Flow**:
1. Creator selects a video to edit
2. System displays current video details
3. Creator makes desired changes
4. System saves the updated information

### 16. Delete Videos
**Actor**: Content Creator  
**Description**: The creator can remove their content from the platform.  
**Preconditions**: Creator has uploaded videos.  
**Main Flow**:
1. Creator selects a video
2. Creator chooses delete option
3. System asks for confirmation
4. System removes the video from the platform

### 17. View Analytics
**Actor**: Content Creator  
**Description**: The creator can access statistics about their content's performance.  
**Preconditions**: Creator has uploaded videos.  
**Main Flow**:
1. Creator navigates to analytics section
2. System displays performance metrics (views, watch time, demographics)
3. Creator can filter data by time period or specific videos

## Administrator Use Cases

### 18. Manage Users
**Actor**: Administrator  
**Description**: The admin can view, edit, or delete user accounts.  
**Preconditions**: Admin has administrative privileges.  
**Main Flow**:
1. Admin accesses user management section
2. System displays list of users
3. Admin can search for specific users
4. Admin can view details or take actions on user accounts

### 19. Moderate Content
**Actor**: Administrator  
**Description**: The admin can review and remove inappropriate content.  
**Preconditions**: Admin has administrative privileges.  
**Main Flow**:
1. Admin reviews flagged content
2. Admin decides whether content violates platform policies
3. Admin can remove content or issue warnings to users

### 20. Configure System
**Actor**: Administrator  
**Description**: The admin can modify system settings and configurations.  
**Preconditions**: Admin has administrative privileges.  
**Main Flow**:
1. Admin accesses system configuration
2. System displays available settings
3. Admin makes necessary changes
4. System applies the new configuration
