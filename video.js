
document.addEventListener('DOMContentLoaded', async () => {
  // Initialize Lucide icons
  lucide.createIcons();
  
  // UI Elements
  const sidebarToggle = document.getElementById('sidebar-toggle');
  const sidebar = document.getElementById('sidebar');
  const mainContent = document.querySelector('.main-content');
  const searchForm = document.getElementById('search-form');
  const searchInput = document.getElementById('search-input');
  const voiceSearchBtn = document.getElementById('voice-search-btn');
  const videoDetails = document.getElementById('video-details');
  const videoActionsContainer = document.getElementById('video-actions-container');
  const channelInfo = document.getElementById('channel-info');
  const commentsContainer = document.getElementById('comments-container');
  const commentsCount = document.getElementById('comments-count');
  const noCommentsMessage = document.getElementById('no-comments-message');
  const commentForm = document.getElementById('comment-form');
  const usernameInput = document.getElementById('username-input');
  const commentInput = document.getElementById('comment-input');
  const userAvatar = document.getElementById('user-avatar');
  
  // Toggle sidebar
  sidebarToggle.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
    mainContent.classList.toggle('sidebar-collapsed');
  });
  
  // Handle search
  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = searchInput.value.trim();
    if (query) {
      window.location.href = `explore.html?search=${encodeURIComponent(query)}`;
    }
  });
  
  // Initialize voice search
  initVoiceSearch(voiceSearchBtn, searchInput, (transcript) => {
    searchInput.value = transcript;
    searchForm.dispatchEvent(new Event('submit'));
  });
  
  // Get video ID from URL
  const urlParams = new URLSearchParams(window.location.search);
  const videoId = urlParams.get('id');
  
  if (!videoId) {
    showToast('error', 'Video ID is missing');
    return;
  }
  
  // Update user avatar when username changes
  usernameInput.addEventListener('input', () => {
    const username = usernameInput.value.trim() || 'Guest';
    userAvatar.src = getRandomAvatar(username);
  });
  
  // Load video
  try {
    const video = await getVideoById(videoId);
    
    // Set page title
    document.title = `${video.title} - VidTube`;
    
    // Load YouTube embed
    loadYouTubeEmbed(video.youtubeId);
    
    // Render video details
    renderVideoDetails(video);
    
    // Render video actions
    renderVideoActions(video);
    
    // Render channel info
    renderChannelInfo(video.channel);
    
    // Render comments
    renderComments(video.comments || []);
    
    // Handle comment form submission
    commentForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const username = usernameInput.value.trim() || 'Guest User';
      const text = commentInput.value.trim();
      
      if (!text) {
        showToast('error', 'Comment cannot be empty');
        return;
      }
      
      try {
        const newComment = await addComment(videoId, { text, username });
        
        // Clear comment input
        commentInput.value = '';
        
        // Add new comment to the top of the list
        renderNewComment(newComment);
        
        // Update comments count
        const video = await getVideoById(videoId);
        updateCommentsCount(video.comments.length);
        
        showToast('success', 'Comment added successfully!');
      } catch (error) {
        console.error('Error adding comment:', error);
        showToast('error', 'Failed to add comment. Please try again.');
      }
    });
    
  } catch (error) {
    console.error('Error loading video:', error);
    videoDetails.innerHTML = `
      <div class="error-container">
        <h2>Video not found</h2>
        <p>The video you're looking for doesn't exist or has been removed.</p>
        <button class="btn-primary" onclick="window.location.href='index.html'">Go to Home</button>
      </div>
    `;
    showToast('error', 'Failed to load video. Please try again later.');
  }
});

// Load YouTube embed
function loadYouTubeEmbed(youtubeId) {
  const youtubePlayer = document.getElementById('youtube-player');
  youtubePlayer.innerHTML = `
    <iframe 
      src="https://www.youtube.com/embed/${youtubeId}"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
      class="w-full h-full"
    ></iframe>
  `;
}

// Render video details
function renderVideoDetails(video) {
  const videoDetails = document.getElementById('video-details');
  
  videoDetails.innerHTML = `
    <h1 class="video-title">${video.title}</h1>
    <div class="video-stats-bar">
      <div>${video.views} • ${video.uploadTime}</div>
      <div id="video-likes-container">
        <span id="likes-count">${video.likes}</span> likes • 
        <span id="dislikes-count">${video.dislikes}</span> dislikes
      </div>
    </div>
  `;
}

// Render video actions
function renderVideoActions(video) {
  const videoActionsContainer = document.getElementById('video-actions-container');
  
  videoActionsContainer.innerHTML = `
    <button id="like-btn" class="action-btn">
      <i data-lucide="thumbs-up"></i>
      <span>Like</span>
    </button>
    <button id="dislike-btn" class="action-btn">
      <i data-lucide="thumbs-down"></i>
      <span>Dislike</span>
    </button>
    <button id="share-btn" class="action-btn">
      <i data-lucide="share"></i>
      <span>Share</span>
    </button>
    <a href="${video.youtubeUrl}" target="_blank" class="action-btn yt-btn">
      <i data-lucide="youtube"></i>
      <span>Watch on YouTube</span>
    </a>
  `;
  
  // Reinitialize Lucide icons for the newly added buttons
  lucide.createIcons();
  
  // Add event listeners to action buttons
  document.getElementById('like-btn').addEventListener('click', async () => {
    try {
      const result = await likeVideo(video.id, true);
      document.getElementById('likes-count').textContent = result.likes;
      showToast('success', 'Liked!');
    } catch (error) {
      console.error('Error liking video:', error);
      showToast('error', 'Failed to like video. Please try again.');
    }
  });
  
  document.getElementById('dislike-btn').addEventListener('click', async () => {
    try {
      const result = await likeVideo(video.id, false);
      document.getElementById('dislikes-count').textContent = result.dislikes;
      showToast('success', 'Disliked!');
    } catch (error) {
      console.error('Error disliking video:', error);
      showToast('error', 'Failed to dislike video. Please try again.');
    }
  });
  
  document.getElementById('share-btn').addEventListener('click', () => {
    if (navigator.share) {
      navigator.share({
        title: video.title,
        url: video.youtubeUrl
      }).then(() => {
        showToast('success', 'Shared successfully!');
      }).catch((error) => {
        console.error('Error sharing:', error);
        // Fallback for browsers that support navigator.share but encounter an error
        navigator.clipboard.writeText(video.youtubeUrl);
        showToast('success', 'Link copied to clipboard!');
      });
    } else {
      // Fallback for browsers that don't support navigator.share
      navigator.clipboard.writeText(video.youtubeUrl);
      showToast('success', 'Link copied to clipboard!');
    }
  });
}

// Render channel info
function renderChannelInfo(channel) {
  const channelInfo = document.getElementById('channel-info');
  
  channelInfo.innerHTML = `
    <div class="channel-avatar-lg">
      <img src="${channel.avatar}" alt="${channel.name}">
    </div>
    <div class="channel-text">
      <h3 class="channel-name-lg">${channel.name}</h3>
      <p class="channel-subscribers">${channel.subscribers} subscribers</p>
      <p class="channel-description">
        Welcome to this coding tutorial video! Hope you enjoy learning these programming concepts.
        Don't forget to like and subscribe for more content.
      </p>
    </div>
    <button class="subscribe-btn">Subscribe</button>
  `;
  
  // Add event listener to subscribe button
  channelInfo.querySelector('.subscribe-btn').addEventListener('click', () => {
    showToast('success', `Subscribed to ${channel.name}!`);
  });
}

// Render comments
function renderComments(comments) {
  const commentsContainer = document.getElementById('comments-container');
  const noCommentsMessage = document.getElementById('no-comments-message');
  
  // Update comments count
  updateCommentsCount(comments.length);
  
  // Show message if no comments
  if (comments.length === 0) {
    commentsContainer.innerHTML = '';
    noCommentsMessage.style.display = 'block';
    return;
  }
  
  noCommentsMessage.style.display = 'none';
  commentsContainer.innerHTML = '';
  
  // Render each comment
  comments.forEach(comment => {
    const commentElement = createCommentElement(comment);
    commentsContainer.appendChild(commentElement);
  });
}

// Update comments count
function updateCommentsCount(count) {
  const commentsCount = document.getElementById('comments-count');
  commentsCount.textContent = count > 0 ? `(${count})` : '';
}

// Create comment element
function createCommentElement(comment) {
  const commentElement = document.createElement('div');
  commentElement.className = 'comment-item';
  
  // Format timestamp
  const timestamp = formatTimestamp(new Date(comment.timestamp));
  
  commentElement.innerHTML = `
    <div class="comment-avatar">
      <img src="${comment.avatar}" alt="${comment.username}">
    </div>
    <div class="comment-content">
      <div class="comment-header">
        <h4 class="comment-username">${comment.username}</h4>
        <span class="comment-time">${timestamp}</span>
      </div>
      <p class="comment-text">${comment.text}</p>
    </div>
  `;
  
  return commentElement;
}

// Render a new comment (for when user adds a comment)
function renderNewComment(comment) {
  const commentsContainer = document.getElementById('comments-container');
  const noCommentsMessage = document.getElementById('no-comments-message');
  
  // Hide no comments message
  noCommentsMessage.style.display = 'none';
  
  // Create comment element
  const commentElement = createCommentElement(comment);
  
  // Add to top of list
  commentsContainer.insertBefore(commentElement, commentsContainer.firstChild);
}

// Format timestamp
function formatTimestamp(date) {
  const now = new Date();
  const diffMs = now - date;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);
  
  if (diffSec < 60) {
    return 'just now';
  } else if (diffMin < 60) {
    return `${diffMin} minute${diffMin > 1 ? 's' : ''} ago`;
  } else if (diffHour < 24) {
    return `${diffHour} hour${diffHour > 1 ? 's' : ''} ago`;
  } else if (diffDay < 30) {
    return `${diffDay} day${diffDay > 1 ? 's' : ''} ago`;
  } else {
    const month = date.toLocaleString('default', { month: 'short' });
    const day = date.getDate();
    return `${month} ${day}`;
  }
}

// Voice search functionality
function initVoiceSearch(button, inputElement, callback) {
  let recognition = null;
  
  // Check if browser supports speech recognition
  if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';
    
    // Set up event listeners
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      inputElement.value = transcript;
      button.classList.remove('listening');
      if (callback) callback(transcript);
    };
    
    recognition.onerror = (event) => {
      console.error('Speech recognition error', event.error);
      button.classList.remove('listening');
      showToast('error', 'Voice recognition failed. Please try again.');
    };
    
    recognition.onend = () => {
      button.classList.remove('listening');
    };
    
    // Add click handler to button
    button.addEventListener('click', () => {
      if (button.classList.contains('listening')) {
        recognition.stop();
        button.classList.remove('listening');
      } else {
        try {
          recognition.start();
          button.classList.add('listening');
          showToast('info', 'Listening... Speak now');
        } catch (error) {
          console.error('Speech recognition error:', error);
          showToast('error', 'Could not start voice recognition. Please try again.');
        }
      }
    });
  } else {
    // Hide button if speech recognition is not supported
    button.addEventListener('click', () => {
      showToast('error', 'Speech recognition is not supported in your browser');
    });
  }
}

// Toast notification system
function showToast(type, message, duration = 3000) {
  const toastContainer = document.getElementById('toast-container');
  
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  
  toastContainer.appendChild(toast);
  
  // Make the toast visible (needed for animation to work properly)
  setTimeout(() => {
    toast.style.opacity = '1';
  }, 10);
  
  // Remove the toast after duration
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, duration);
}
